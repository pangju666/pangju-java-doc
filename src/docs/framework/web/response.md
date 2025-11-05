---
layout: doc
---

# Http响应构建器
`io.github.pangju666.framework.web.servlet.HttpResponseBuilder`

这个类我本来是写成工具类的，但是实在是重载方法太多了，显得特别繁琐，我就改成链式调用了。

> [!NOTE]
> 默认启用缓冲模式以提高性能。

| 方法名                | 返回值                 |               说明                |
|--------------------|:--------------------|:-------------------------------:|
| contentType        | HttpResponseBuilder |            设置响应内容类型             |
| status             | HttpResponseBuilder |             设置响应状态码             |
| buffer             | HttpResponseBuilder |           设置是否启用缓冲模式            |
| contentDisposition | HttpResponseBuilder |  设置文件下载的Content-Disposition响应头  |
| write              | void                |           将内容写入响应输出流            |
| writeFile          | void                |          将文件内容写入响应输出流           |
| writeResult        | void                |     将Result对象以JSON格式写入响应输出流     |
| writeBean          | void                | 将Java对象包装为Result并以JSON格式写入响应输出流 |
| writeHttpException | void                |  处理HTTP异常并将错误信息以JSON格式写入响应输出流   |


## 设置响应内容类型
如果传入的contentType为null或空白字符串，则不执行任何操作。

```java
HttpResponseBuilder.from(response).contentType("application/octet-stream");
```

## 设置响应状态码
如果传入的status为null或小于100，则不执行任何操作。

> [!TIP]
> 建议使用`HttpStatus`设置响应状态码，而不是直接用数字。

```java
HttpResponseBuilder.from(response).status(HttpStatus.OK);

HttpResponseBuilder.from(response).status(200);
```

## 设置文件下载响应头
通过添加`Content-Disposition`响应头，将响应设置为文件下载模式。

文件名会使用URL编码处理，确保在不同浏览器中正确显示。

如果传入的文件名为`null`或空白字符串，则不执行任何操作。

```java
HttpResponseBuilder.from(response).contentDisposition("test.txt");
// 指定字符集
HttpResponseBuilder.from(response).contentDisposition("test.txt", StandardCharsets.UTF_8);
```

## 将内容写入响应输出流

### 字节数组
会根据字节数组大小自动设置`Content-Length`响应头。

```java
// 写入字节数组
HttpResponseBuilder.from(response)
    .write(bytes);

// 一般情况下，类型、状态码和缓冲区请保持默认设置
HttpResponseBuilder.from(response)
    // 设置响应内容类型
    .contentType("image/jpeg")
    // 不使用缓冲区
    .buffer(false)
    // 设置响应状态码
    .status(HttpStatus.FOUND)
    .write(bytes);
```

### 输入流
> [!TIP]
> 如果选择开启缓冲区的话，会将非`BufferedInputStream`、`UnsynchronizedByteArrayInputStream`、`UnsynchronizedBufferedInputStream`、
> `BufferedFileChannelInputStream`输入流包装为`UnsynchronizedBufferedInputStream`。
> 
> 不确定流大小的话，建议开启缓冲区。

```java
// 写入输入流
HttpResponseBuilder.from(response)
.write(inputstream);

// 一般情况下，类型、状态码和缓冲区请保持默认设置
HttpResponseBuilder.from(response)
// 设置响应内容类型
.contentType("image/jpeg")
// 不使用缓冲区
.buffer(false)
// 设置响应状态码
.status(HttpStatus.FOUND)
.write(inputstream);
```

## 将文件写入响应输出流

> [!TIP]
> 如果选择开启缓冲区的话，会使用`UnsynchronizedBufferedInputStream`打开文件输入流。
>
> 如果文件很大的话，建议使用缓冲区读取。

```java
File file = new File("test.jpg");

// 默认会使用缓冲区
HttpResponseBuilder.from(response)
    .writeFile(file);

// 不使用缓冲区
HttpResponseBuilder.from(response)
    .buffer(false)
    .writeFile(file);
    
// 使用指定的下载文件名
HttpResponseBuilder.from(response)
    .buffer(false)
    .writeFile(file, "avatar.jpg");
```


## 将对象写入响应输出流
将Java对象以JSON格式写入响应输出流，该方法会智能处理传入的对象类型：
- 如果对象已经是`Result`类型：直接序列化为JSON并写入响应
- 如果对象是其他类型：自动包装为`Result.ok(bean)`后再序列化写入

自动执行以下操作：
- 设置`Content-Type`为`application/json`
- 使用`UTF-8`字符集编码
- 将对象转换为JSON字符串并写入响应输出流

> [!TIP]
> 写入Bean的时候建议不开启缓冲区，除非这个Bean是超大集合或者超长字符串。

```java
HttpResponseBuilder.from(response).buffer(false).writeBean(Result.ok()); // {"code": 0, "message":"请求成功", "data":null}
HttpResponseBuilder.from(response).buffer(false).writeBean(Result.ok("test")); // {"code": 0, "message":"请求成功", "data":"test"}
HttpResponseBuilder.from(response).buffer(false).writeBean("test"); // {"code": 0, "message":"请求成功", "data":"test"}
HttpResponseBuilder.from(response).buffer(false).writeBean(null); // {"code": 0, "message":"请求成功", "data":null}
```

## 处理HTTP异常
处理[HTTP异常](/framework/web/exception)并将错误信息以JSON格式写入响应输出流，处理流程：
1. 检查异常类是否有`@HttpException`注解
2. 如果有注解：
   1. 根据注解配置的错误码类型和错误码生成`Result`
   2. 如果注解配置了需要记录日志，则按指定级别记录日志
   3. 设置响应状态码为注解中配置的状态码
3. 如果没有注解：
   1. 使用默认错误码（-1）生成`Result`
   2. 记录`ERROR`级别日志
4. 设置`Content-Type`为application/json
5. 将`Result`序列化为JSON并写入响应

> [!TIP]
> 异常信息转换的JSON比较精简，个人建议不要开启缓冲区输出。

```java
HttpResponseBuilder.from(response).buffer(false).writeHttpException(new ServiceException("测试错误")); // {"code": -1000, "message":"测试错误", "data":null}
```
