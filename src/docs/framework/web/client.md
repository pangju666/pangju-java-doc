---
layout: doc
---

# 客户端

## RestClient辅助器
`io.github.pangju666.framework.web.client.RestClientHelper`

提供流式API风格的HTTP请求构建器，简化RestClient的使用。

支持以下功能：
- URI构建：支持路径、查询参数、URI变量的设置
- 请求头管理：支持单个或批量添加请求头
- 请求体处理：支持JSON、表单数据、文本、二进制、资源格式
- 响应处理：支持多种响应类型的转换（JSON、资源、二进制、文本）

| 方法名                  | 静态        | 返回值                        |             用途              |
|----------------------|:----------|:---------------------------|:---------------------------:|
| fromUriString        | 是         | RestClientHelper           | 从URI字符串创建RestClientHelper实例 |
| fromUri              | 是         | RestClientHelper           | 从URI对象创建RestClientHelper实例  |
| method               | 否         | RestClientHelper           |         设置HTTP请求方法          |
| path                 | 否         | RestClientHelper           |           添加请求路径            |
| queryParam           | 否         | RestClientHelper           |          添加单个查询参数           |
| queryParams          | 否         | RestClientHelper           |          批量添加查询参数           |
| query                | 否         | RestClientHelper           |          设置原始查询字符串          |
| uriVariable          | 否         | RestClientHelper           |          添加单个URI变量          |
| uriVariables         | 否         | RestClientHelper           |          批量添加URI变量          |
| header               | 否         | RestClientHelper           |           添加单个请求头           |
| headers              | 否         | RestClientHelper           |           批量添加请求头           |
| formPart             | 否         | RestClientHelper           |         添加资源类型的表单字段         |
| formData             | 否         | RestClientHelper           |           添加表单字段            |
| jsonBody             | 否         | RestClientHelper           |          设置JSON请求体          |
| textBody             | 否         | RestClientHelper           |           设置文本请求体           |
| bytesBody            | 否         | RestClientHelper           |          设置二进制请求体           |
| resourceBody         | 否         | RestClientHelper           |           设置资源请求体           |
| body                 | 否         | RestClientHelper           |        设置请求体，指定媒体类型         |
| toResourceEntity     | 否         | ResponseEntity\<Resource>  |    将请求结果转换为Resource响应实体     |
| toBytesEntity        | 否         | ResponseEntity\<byte[]>    |      将请求结果转换为字节数组响应实体       |
| toStringEntity       | 否         | ResponseEntity\<String>    |       将请求结果转换为字符串响应实体       |
| toJsonEntity         | 否         | ResponseEntity\<T>         |    将请求结果转换为指定类型的JSON响应实体    |
| toEntity             | 否         | ResponseEntity\<T>         |      将请求结果转换为指定类型的响应实体      |
| toBodilessEntity     | 否         | ResponseEntity\<Void>      |      将请求结果转换为无响应体的响应实体      |
| buildRequestBodySpec | 否         | RestClient.RequestBodySpec |            构建请求             |

### 从URI构建请求
```java
RestClient restClient = RestClient.builder().build();

// 使用URI字符串构建
ResponseEntity<Void> response1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1/xxxx")
		.method(HttpMethod.GET)
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();

// 使用URI对象构建
ResponseEntity<Void> response2 = RestClientHelper.fromUri(restClient, "http://xxxxx/api/v1/xxxx")
		.method(HttpMethod.GET)
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();		
```

### 动态增加请求路径
```java
RestClient restClient = RestClient.builder().build();

// http://xxxxx/api/v1/user
ResponseEntity<Void> response1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();		
		
// http://xxxxx/api/v1/user/info
ResponseEntity<Void> response2 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.path("/info")
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();		
```

### 添加查询参数
```java
RestClient restClient = RestClient.builder().build();

// http://xxxxx/api/v1/user?name=Tom&age=2
ResponseEntity<Void> response1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.queryParam("name", "Tom")
		.queryParam("age", 2)
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();		
		
// http://xxxxx/api/v1/user?name=Tom&age=2
ResponseEntity<Void> response2 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.queryParams(MultiValueMap.of("name", "test", "age", 2))
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
		
// http://xxxxx/api/v1/user?name=Tom&age=2
ResponseEntity<Void> response3 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.queryParams(Map.of("name", "test", "age", 2))
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
		
// http://xxxxx/api/v1/user?name=Tom&age=2
ResponseEntity<Void> response4 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.query("name=Tom&age=2")
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();	
```

### 添加路径参数
```java
RestClient restClient = RestClient.builder().build();

// http://xxxxx/api/v1/user/1
ResponseEntity<Void> response1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.path("/{id}")
		.uriVariable("id", 1)
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
		
// http://xxxxx/api/v1/user/1/Tom
ResponseEntity<Void> response2 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.path("/{id}")
		.path("/{name}")
		.uriVariables(Map.of("id", 1, "name", "Tom"))
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
```

### 添加请求头
```java
RestClient restClient = RestClient.builder().build();

// http://xxxxx/api/v1/user
ResponseEntity<Void> response1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.header(HttpHeaders.AUTHORIZATION, "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
		.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
		
// http://xxxxx/api/v1/user
ResponseEntity<Void> response2 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.headers(Map.of(HttpHeaders.AUTHORIZATION, "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", 
				HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE))
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();

// http://xxxxx/api/v1/user
ResponseEntity<Void> response3 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.headers(MultiValueMap.of(HttpHeaders.AUTHORIZATION, "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", 
				HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE))
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
		
// http://xxxxx/api/v1/user
ResponseEntity<Void> response4 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.header(HttpHeaders.AUTHORIZATION, List.of("Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"))
		.header(HttpHeaders.CONTENT_TYPE, List.of(MediaType.APPLICATION_JSON_VALUE))
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();			
```

### 设置请求体
> [!TIP]
> 只有`POST`和`PUT`请求支持请求体

#### multipart/form-data
依赖于`org.springframework.http.converter.FormHttpMessageConverter`Http消息处理器

```java
RestClient restClient = RestClient.builder().build();

// 上传文件
ResponseEntity<Void> response1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.formPart("file", new FileSystemResource(new File("example.txt")))
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
		
// 构建form参数
ResponseEntity<Void> response2 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.formData("name", "Tom")
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();

ResponseEntity<Void> response3 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.formData(MultiValueMap.of("name", "Tom", "file", new FileSystemResource(new File("example.txt"))))
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
```

#### application/json
依赖于`org.springframework.http.converter.json.MappingJackson2HttpMessageConverter`和`org.springframework.http.converter.json.GsonHttpMessageConverter`Http消息处理器

```java
RestClient restClient = RestClient.builder().build();

// 直接使用Java对象
class TestDTO {
    String name;
    Integer age;
}
TestDTO testDTO = new TestDTO();
testDTO.setName("Tom");
testDTO.setAge(2);

ResponseEntity<Void> response1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.jsonBody(testDTO)
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
		
// 将null请求体转换为空json字符串（{}）
TestDTO testDTO = null;

ResponseEntity<Void> response3 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.jsonBody(testDTO, true)
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
		
// 使用Gson库的JsonElement
ResponseEntity<Void> response2 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.jsonBody(JsonUtils.parseString("{ \"name\": \"Tom\", \"age\": 2 }"))
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();

// 使用Jackson库的JsonNode
ObjectMapper objectMapper = new ObjectMapper();
ObjectNode body = objectMapper.createObjectNode();
result.put("name", "Tom");
result.put("age", 2);

ResponseEntity<Void> response3 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.jsonBody(body)
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
```

#### text/plain
依赖于`org.springframework.http.converter.StringHttpMessageConverter`Http消息处理器

```java
RestClient restClient = RestClient.builder().build();

ResponseEntity<Void> response1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.textBody("Hello World")
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
		
// 将null请求体转换为空字符串（""）
String body = null;
ResponseEntity<Void> response2 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.textBody(body, true)
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
```

#### application/octet-stream

##### 字节数组
依赖于`org.springframework.http.converter.ByteArrayHttpMessageConverter`Http消息处理器

> [!TIP]
> 一般写接口不会直接用字节数组作为请求参数，基本上是用不上的，知道有这个方法就行

```java
RestClient restClient = RestClient.builder().build();

byte[] bytes = new byte[1024];
Arrays.fill(bytes, (byte) 0x00);

ResponseEntity<Void> response1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.bytesBody(bytes)
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
		
// 将null请求体转换为空字节数组
byte[] bytes = null;

ResponseEntity<Void> response2 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.bytesBody(bytes, true)
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
```

##### 资源
依赖于`org.springframework.http.converter.ResourceHttpMessageConverter`Http消息处理器

> [!TIP]
> 一般写接口不会直接`org.springframework.core.io.Resource`对象作为请求参数，基本上是用不上的，知道有这个方法就行

```java
RestClient restClient = RestClient.builder().build();

Resource body = new FileSystemResource(new File("example.txt"));

ResponseEntity<Void> response1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.resourceBody(body)
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
		
// 自定义资源类型
ResponseEntity<Void> response2 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.resourceBody(body, MediaType.TEXT_MARKDOWN)
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
```

#### 自定义
依赖于`org.springframework.http.converter.HttpMessageConverter`Http消息处理器

可以自由定义请求体和请求体类型

```java
RestClient restClient = RestClient.builder().build();

// json请求体
ResponseEntity<Void> response1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.body(JsonUtils.parseString("{ \"name\": \"Tom\", \"age\": 2 }"), MediaType.APPLICATION_JSON)
		.buildRequestBodySpec()
		.retrieve()
		.toBodilessEntity();
```

### 返回响应值

#### 无响应值
```java
RestClient restClient = RestClient.builder().build();

RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toBodilessEntity();
```

#### 返回资源
依赖于`org.springframework.http.converter.ResourceHttpMessageConverter`Http消息处理器

类似于返回字节数组，只是用`Resource`包装过

```java
RestClient restClient = RestClient.builder().build();

Resource resource1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toResourceEntity();
		
// 设置可接受响应类型
Resource resource2 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toResourceEntity(MediaType.APPLICATION_OCTET_STREAM, MediaType.TEXT_MARKDOWN);	
```

#### 返回字节数组
依赖于`org.springframework.http.converter.ByteArrayHttpMessageConverter`Http消息处理器

```java
RestClient restClient = RestClient.builder().build();

byte[] bytes1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toBytesEntity();
		
// 设置可接受响应类型
byte[] bytes2 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toBytesEntity(MediaType.APPLICATION_OCTET_STREAM, MediaType.TEXT_MARKDOWN);
```

#### 返回字符串
依赖于`org.springframework.http.converter.StringHttpMessageConverter`Http消息处理器

```java
RestClient restClient = RestClient.builder().build();

String str1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toStringEntity();
		
// 设置可接受响应类型
String str2 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toStringEntity(MediaType.APPLICATION_OCTET_STREAM, MediaType.TEXT_MARKDOWN);
```

#### 返回Java对象
依赖于`org.springframework.http.converter.json.MappingJackson2HttpMessageConverter`和`org.springframework.http.converter.json.GsonHttpMessageConverter`Http消息处理器

```java
RestClient restClient = RestClient.builder().build();

class TestVO {
    String name;
    Integer age;
}

TestVO testVO1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toJsonEntity(TestVO.class);

// 如果响应类型为泛型，建议使用ParameterizedTypeReference定义返回类型
TestVO testVO2 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toJsonEntity(new ParameterizedTypeReference<List<TestVO>>() {});
```

#### 返回自定义类型
依赖于`org.springframework.http.converter.HttpMessageConverter`Http消息处理器

```java
RestClient restClient = RestClient.builder().build();

class TestVO {
    String name;
    Integer age;
}

TestVO testVO1 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toJsonEntity(TestVO.class, MediaType.APPLICATION_JSON);
		
// 如果响应类型为泛型，建议使用ParameterizedTypeReference定义返回类型
TestVO testVO2 = RestClientHelper.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toEntity(new ParameterizedTypeReference<List<TestVO>>() {}, MediaType.APPLICATION_JSON);
```
