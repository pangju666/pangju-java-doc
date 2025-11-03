---
layout: doc
---

# Http请求工具类
`io.github.pangju666.framework.web.utils.HttpRequestUtils`

| 方法名                  | 返回值                            |       说明        |
|----------------------|:-------------------------------|:---------------:|
| isFormMobile         | boolean                        |  判断请求是否来自移动设备   |
| isFromAjax           | boolean                        |  判断请求是否为Ajax请求  |
| getIpAddress         | String                         |   获取请求的来源IP地址   |
| getParameters        | MultiValueMap\<String, String> |    获取所有的请求参数    |
| getHeaders           | HttpHeaders                    |   获取所有的请求头信息    |
| getParts             | Map\<String, Part>             |  获取请求参数中的文件信息   |
| getRawRequestBody    | byte[]                         |     获取原始请求体     |
| getStringRequestBody | String                         |   获取请求体的字符串表示   |
| getJsonRequestBody   | JsonElement或泛型                 | 获取JSON格式的请求体并解析 |
| isJsonRequestBody    | boolean                        | 判断请求体是否为JSON类型  |

## 判断请求

### 是否来自移动设备
根据[RuoYi Common ServletUtils](https://github.com/yangzongzhuan/RuoYi/blob/master/ruoyi-common/src/main/java/com/ruoyi/common/utils/ServletUtils.java)修改

判断请求是否来自移动设备，通过分析`User-Agent`请求头判断请求是否来自移动设备，规则如下：
- 排除 Windows 桌面系统（除了IE9）
- 排除 Mac 桌面系统
- 包含 MOBILE_AGENTS 中定义的移动设备标识

```java
HttpServletRequest request; // 请求信息
HttpRequestUtils.isFormMobile(request); // 如果请求来自移动设备则返回true，否则返回false
```

### 是否为Ajax请求
根据[RuoYi Common ServletUtils](https://github.com/yangzongzhuan/RuoYi/blob/master/ruoyi-common/src/main/java/com/ruoyi/common/utils/ServletUtils.java)修改

判断请求是否为Ajax请求，通过以下方式判断是否为Ajax请求：
- 检查`Accept`头是否包含`application/json`
- 检查`X-Requested-With`头是否包含`XMLHttpRequest`
- 检查`请求URI`是否包含`.json`或`.xml`后缀
- 检查请求参数`__ajax`是否包含`json`或`xml`值

```java
HttpServletRequest request; // 请求信息
HttpRequestUtils.isFromAjax(request); // 如果是Ajax请求则返回true，否则返回false
```

### 请求体是否为JSON
通过检查Content-Type头部值，确定请求体是否为JSON格式。

> [!NOTE]
> 此方法支持带字符集参数的JSON类型，如`application/json;charset=UTF-8`。

```java
HttpServletRequest request; // 请求信息
HttpRequestUtils.isJsonRequestBody(request); // 如果是Ajax请求则返回true，否则返回false
```

## 获取客户端请求IP地址
根据[RuoYi Common ServletUtils](https://github.com/yangzongzhuan/RuoYi/blob/master/ruoyi-common/src/main/java/com/ruoyi/common/utils/ServletUtils.java)修改

获取请求的来源IP地址，依次从以下请求头中获取IP地址：
1. x-forwarded-for
2. Proxy-Client-IP
3. X-Forwarded-For
4. WL-Proxy-Client-IP
5. X-Real-IP
6. 最后使用`request.getRemoteAddr()`;

> [!NOTE]
> 如果获取到的IP是本地IP，则返回标准IPv4本地地址(127.0.0.1)。 
> 
> 如果IP包含多个地址（多级代理），则使用`IpUtils.getMultistageReverseProxyIp`获取第一个非`unknown`地址。

```java
HttpServletRequest request; // 请求信息
String clientIp = HttpRequestUtils.getIpAddress(request); // 客户端请求IP地址
```

## 获取所有的请求参数
将请求参数转换为Spring的`MultiValueMap`结构，保持参数值的顺序。

> [!NOTE]
> 对于单值请求参数直接存储；对于多值请求参数保留为`List`。
>
> 返回的`MultiValueMap`是不可修改的。

```java
HttpServletRequest request; // 请求信息
MultiValueMap<String, String> requestParams = HttpRequestUtils.getParameters(request);
```

## 获取所有的请求头信息
将所有请求头信息转换为Spring的`HttpHeaders`结构。

> [!NOTE]
> 对于单值请求头直接存储；对于多值请求头保留为`List`。
>
> 返回的HttpHeaders是只读的。

```java
HttpServletRequest request; // 请求信息
HttpHeaders requestHeaders = HttpRequestUtils.getHeaders(request);
```

## 获取请求参数中的文件信息
从`form-data`请求参数中提取所有包含文件的部分。

该方法只返回那些具有提交文件名的部分（即实际上传的文件），过滤掉表单字段等不包含文件的部分。

> [!NOTE]
> 返回的`Map`是不可修改的，以防止意外修改。

```java
HttpServletRequest request; // 请求信息
Map<String, Part> fileParts = HttpRequestUtils.getParts(request);
for (Part part : fileParts.values()) {
    String filename = part.getSubmittedFileName();
    // 处理文件
}
```

## 获取原始请求体

> [!TIP]
> 如果请求体是JSON，请使用`HttpRequestUtils.getJsonRequestBody`。

### 字节数组表示
从HTTP请求中读取完整的请求体内容，并以字节数组形式返回。

```java
HttpServletRequest request; // 请求信息
byte[] requestBody = HttpRequestUtils.getRawRequestBody(request);
```

### 字符串表示
将请求体内容读取并转换为字符串，字符集判断逻辑如下：
1. 尝试从`Content-Type`请求头提取字符集信息
2. 如提取失败或字符集名称无效，则使用`UTF-8`作为默认字符集
    
```java
HttpServletRequest request; // 请求信息
String requestBody = HttpRequestUtils.getStringRequestBody(request);
```

### 获取JSON请求体

### 原始JSON
读取请求体内容并将其解析为`JsonElement`，处理逻辑如下：
1. 验证请求头`Content-Type`是否为JSON格式
2. 非JSON请求则返回`JsonNull`实例
3. 读取请求体并解析为`JsonElement`

```java
HttpServletRequest request; // 请求信息
JsonElement requestBody = HttpRequestUtils.getJsonRequestBody(request);
```

### Java Bean
读取请求体并将其反序列化为指定Java对象，处理逻辑如下：
1. 验证请求头`Content-Type`是否为JSON格式
2. 非JSON请求则直接返回`null`
3. 解析请求体并转换为目标类型的对象实例

```java
HttpServletRequest request; // 请求信息
User user = RequestUtils.getJsonRequestBody(request, User.class);
// 转换为泛型集合
List<User> users = RequestUtils.getJsonRequestBody(request, new TypeToken<List<User>>(){});
```
