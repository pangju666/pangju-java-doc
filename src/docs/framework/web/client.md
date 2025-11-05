---
layout: doc
---

# 客户端

## Rest请求构建器
`io.github.pangju666.framework.web.client.builder.RestRequestBuilder`

提供流式API风格的HTTP请求构建器，简化RestClient的使用。

支持以下功能：
- URI构建：支持路径、查询参数、URI变量的设置
- 请求头管理：支持单个或批量添加请求头
- 请求体处理：支持JSON、表单数据、文本、二进制、资源格式
- 响应处理：支持多种响应类型的转换（JSON、资源、二进制、文本）

| 方法名                    | 静态 | 返回值                        |               用途                |
|------------------------|:---|:---------------------------|:-------------------------------:|
| fromUriString          | 是  | RestRequestBuilder         |  从URI字符串创建RestRequestBuilder实例  |
| fromUri                | 是  | RestRequestBuilder         |  从URI对象创建RestRequestBuilder实例   |
| method                 | 否  | RestRequestBuilder         |           设置HTTP请求方法            |
| withJsonErrorHandler   | 否  | RestRequestBuilder         |          配置 JSON 错误处理器          |
| errorService           | 否  | RestRequestBuilder         |         设置错误信息中的远程服务名称          |
| errorApi               | 否  | RestRequestBuilder         |        设置错误信息中的 API 接口名称        |
| customExceptionMessage | 否  | RestRequestBuilder         |            设置自定义异常消息            |
| errorCodeField         | 否  | RestRequestBuilder         |          设置响应体中的业务码字段名          |
| errorMessageField      | 否  | RestRequestBuilder         |         设置响应体中的错误消息字段名          |
| path                   | 否  | RestRequestBuilder         |             添加请求路径              |
| queryParam             | 否  | RestRequestBuilder         |            添加单个查询参数             |
| queryParams            | 否  | RestRequestBuilder         |            批量添加查询参数             |
| query                  | 否  | RestRequestBuilder         |            设置原始查询字符串            |
| uriVariable            | 否  | RestRequestBuilder         |            添加单个URI变量            |
| uriVariables           | 否  | RestRequestBuilder         |            批量添加URI变量            |
| header                 | 否  | RestRequestBuilder         |             添加单个请求头             |
| headers                | 否  | RestRequestBuilder         |             批量添加请求头             |
| formPart               | 否  | RestRequestBuilder         |           添加资源类型的表单字段           |
| formData               | 否  | RestRequestBuilder         |             添加表单字段              |
| jsonBody               | 否  | RestRequestBuilder         |            设置JSON请求体            |
| textBody               | 否  | RestRequestBuilder         |             设置文本请求体             |
| bytesBody              | 否  | RestRequestBuilder         |            设置二进制请求体             |
| resourceBody           | 否  | RestRequestBuilder         |             设置资源请求体             |
| body                   | 否  | RestRequestBuilder         |          设置请求体，指定媒体类型           |
| toResource             | 否  | Resource                   | 将请求结果转换为Resource响应实体，可以指定可接受的类型 |
| toBytes                | 否  | byte[]                     |   将请求结果转换为字节数组响应实体，可以指定可接受的类型   |
| toString               | 否  | String                     |   将请求结果转换为字符串响应实体，可以指定可接受的类型    |
| toJson                 | 否  | T                          |      将请求结果转换为指定类型的JSON响应实体      |
| toBean                 | 否  | T                          |  将请求结果转换为指定类型的响应实体，可以指定可接受的类型   |
| toBodilessEntity       | 否  | ResponseEntity\<Void>      |        将请求结果转换为无响应体的响应实体        |
| buildRequestBodySpec   | 否  | RestClient.RequestBodySpec |              构建请求               |

### 从URI构建请求
```java
RestClient restClient = RestClient.builder().build();

// 使用URI字符串构建
ResponseEntity<Void> response1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1/xxxx")
		.method(HttpMethod.GET)
		.toBodilessEntity();

// 使用URI对象构建
ResponseEntity<Void> response2 = RestRequestBuilder.fromUri(restClient, "http://xxxxx/api/v1/xxxx")
		.method(HttpMethod.GET)
		.toBodilessEntity();	
```

### 动态增加请求路径
```java
RestClient restClient = RestClient.builder().build();

// http://xxxxx/api/v1/user
ResponseEntity<Void> response1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toBodilessEntity();
		
// http://xxxxx/api/v1/user/info
ResponseEntity<Void> response2 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.path("/info")
		.toBodilessEntity();
```

### 添加查询参数
```java
RestClient restClient = RestClient.builder().build();

// http://xxxxx/api/v1/user?name=Tom&age=2
ResponseEntity<Void> response1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.queryParam("name", "Tom")
		.queryParam("age", 2)
		.toBodilessEntity();	
		
// http://xxxxx/api/v1/user?name=Tom&age=2
ResponseEntity<Void> response2 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.queryParams(MultiValueMap.of("name", "test", "age", 2))
		.toBodilessEntity();
		
// http://xxxxx/api/v1/user?name=Tom&age=2
ResponseEntity<Void> response3 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.queryParams(Map.of("name", "test", "age", 2))
		.toBodilessEntity();
		
// http://xxxxx/api/v1/user?name=Tom&age=2
ResponseEntity<Void> response4 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.query("name=Tom&age=2")
		.toBodilessEntity();
```

### 添加路径参数
```java
RestClient restClient = RestClient.builder().build();

// http://xxxxx/api/v1/user/1
ResponseEntity<Void> response1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.path("/{id}")
		.uriVariable("id", 1)
		.toBodilessEntity();
		
// http://xxxxx/api/v1/user/1/Tom
ResponseEntity<Void> response2 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.path("/{id}")
		.path("/{name}")
		.uriVariables(Map.of("id", 1, "name", "Tom"))
		.toBodilessEntity();
```

### 添加请求头
```java
RestClient restClient = RestClient.builder().build();

// http://xxxxx/api/v1/user
ResponseEntity<Void> response1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.header(HttpHeaders.AUTHORIZATION, "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
		.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
		.toBodilessEntity();
		
// http://xxxxx/api/v1/user
ResponseEntity<Void> response2 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.headers(Map.of(HttpHeaders.AUTHORIZATION, "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", 
				HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE))
		.toBodilessEntity();

// http://xxxxx/api/v1/user
ResponseEntity<Void> response3 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.headers(MultiValueMap.of(HttpHeaders.AUTHORIZATION, "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", 
				HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE))
		.toBodilessEntity();
		
// http://xxxxx/api/v1/user
ResponseEntity<Void> response4 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.header(HttpHeaders.AUTHORIZATION, List.of("Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"))
		.header(HttpHeaders.CONTENT_TYPE, List.of(MediaType.APPLICATION_JSON_VALUE))
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
ResponseEntity<Void> response1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.formPart("file", new FileSystemResource(new File("example.txt")))
		.toBodilessEntity();
		
// 构建form参数
ResponseEntity<Void> response2 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.formData("name", "Tom")
		.toBodilessEntity();

ResponseEntity<Void> response3 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.formData(MultiValueMap.of("name", "Tom", "file", new FileSystemResource(new File("example.txt"))))
		.toBodilessEntity();
```

#### application/json
依赖于`org.springframework.http.converter.json.MappingJackson2HttpMessageConverter`Http消息处理器

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

ResponseEntity<Void> response1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.jsonBody(testDTO)
		.toBodilessEntity();
		
// 将null请求体转换为空json字符串（{}）
TestDTO testDTO = null;

ResponseEntity<Void> response3 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.jsonBody(testDTO, true)
		.toBodilessEntity();
		
// 使用Gson库的JsonElement
ResponseEntity<Void> response2 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.jsonBody(JsonUtils.parseString("{ \"name\": \"Tom\", \"age\": 2 }"))
		.toBodilessEntity();

// 使用Jackson库的JsonNode
ObjectMapper objectMapper = new ObjectMapper();
ObjectNode body = objectMapper.createObjectNode();
result.put("name", "Tom");
result.put("age", 2);

ResponseEntity<Void> response3 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.jsonBody(body)
		.toBodilessEntity();
```

#### text/plain
依赖于`org.springframework.http.converter.StringHttpMessageConverter`Http消息处理器

```java
RestClient restClient = RestClient.builder().build();

ResponseEntity<Void> response1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.textBody("Hello World")
		.toBodilessEntity();
		
// 将null请求体转换为空字符串（""）
String body = null;
ResponseEntity<Void> response2 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.textBody(body, true)
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

ResponseEntity<Void> response1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.bytesBody(bytes)
		.toBodilessEntity();
		
// 将null请求体转换为空字节数组
byte[] bytes = null;

ResponseEntity<Void> response2 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.bytesBody(bytes, true)
		.toBodilessEntity();
```

##### 资源
依赖于`org.springframework.http.converter.ResourceHttpMessageConverter`Http消息处理器

> [!TIP]
> 一般写接口不会直接`org.springframework.core.io.Resource`对象作为请求参数，基本上是用不上的，知道有这个方法就行

```java
RestClient restClient = RestClient.builder().build();

Resource body = new FileSystemResource(new File("example.txt"));

ResponseEntity<Void> response1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.resourceBody(body)
		.toBodilessEntity();
		
// 自定义资源类型
ResponseEntity<Void> response2 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.resourceBody(body, MediaType.TEXT_MARKDOWN)
		.toBodilessEntity();
```

#### 自定义
依赖于`org.springframework.http.converter.HttpMessageConverter`Http消息处理器

可以自由定义请求体和请求体类型

```java
RestClient restClient = RestClient.builder().build();

// json请求体
ResponseEntity<Void> response1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.POST)
		.path("/user")
		.body(JsonUtils.parseString("{ \"name\": \"Tom\", \"age\": 2 }"), MediaType.APPLICATION_JSON)
		.toBodilessEntity();
```

### 错误处理器
我提供了一个默认的错误处理器，当请求失败的时候，会自动处理并抛出一个[HTTP远程服务异常](/framework/web/exception/#http远程服务异常)，
如果响应状态码是`504`，则会抛出[HTTP远程服务异常](/framework/web/exception/#http远程服务超时异常)。

> [!NOTE]
> 只有以下情况的响应才能被正确处理：
> - 响应状态码为200且响应消息是JSON类型
> - 响应状态码为4xx、5xx

> [!TIP]
> 错误处理器不是一个通用的错误处理器，里面的配置需要针对不同的接口去调整，所以最好不要在不同请求中共享。
> 
> 我个人是建议每种请求定义一个错误处理器，在构建请求的时候直接传入，而不是在请求构建过程中去配置。

> [!IMPORTANT]
> 如果想要在不同线程中共享的话，那么需要在定义的时候就完成初始化，然后调用`init`方法，锁定对属性的修改。

#### 使用
想在请求构建过程中加入错误处理器，必须指定接口的成功业务码、自定义判断条件或者直接传入实例

> [!NOTE]
> 一般情况下直接设置成功业务码就行了，现在写接口基本都要求返回一个业务码。
> 
> 当然如果你要请求的接口实现是另类，那就只能用谓词自定义判断逻辑了。

```java
RestClient restClient = RestClient.builder().build();

// 使用成功业务码初始化
RestRequestBuilder.fromUriString(restClient, "https://api.example.com")
    .path("/api/test/{id}")
    .method(HttpMethod.POST)
    .withJsonErrorHandler("SUCCESS")
    .jsonBody(new User("admin", "password"))
    .toJson(Result.class);
    
// 使用自定义判断条件初始化
RestRequestBuilder.fromUriString(restClient, "https://api.example.com")
    .path("/api/test/{id}")
    .method(HttpMethod.POST)
    .withJsonErrorHandler(response -> response.getAsJsonPrimitive("code").getAsLong() == 0)
    .jsonBody(new User("admin", "password"))
    .toJson(Result.class);
    
// 直接使用现有错误处理器初始化
JsonResponseErrorHandler errorHandler1 = new JsonResponseErrorHandler("SUCCESS");
JsonResponseErrorHandler errorHandler2 = new JsonResponseErrorHandler(response -> response.getAsJsonPrimitive("code").getAsLong() == 0);

RestRequestBuilder.fromUriString(restClient, "https://api.example.com")
    .path("/api/test/{id}")
    .method(HttpMethod.POST)
    .withJsonErrorHandler(errorHandler1)
    .jsonBody(new User("admin", "password"))
    .toJson(Result.class);    
```

#### 配置
我提供了以下配置参数：
- service: 远程服务名称
- api: API接口名称
- customExceptionMessage: 自定义异常消息（用来覆盖异常的默认message，不配置就使用异常的默认消息）
- codeField: 业务码字段名（默认是"code"）
- messageField: 错误消息字段名（默认是"message"）。

主要是用来定义错误信息的，用途可以参考[远程服务异常](/framework/web/exception/#远程服务异常)。

> [!IMPORTANT]
> 如果不显式调用`init`的话，在错误处理器开始处理响应时也会隐式的去调用`init`。
> 
> 所以，想要在多线程间共享的话，一定要在最开始就配置好然后执行`init`。

```java
// 对错误处理器配置
JsonResponseErrorHandler errorHandler = new JsonResponseErrorHandler("SUCCESS");
errorHandler.setService("测试服务");
errorHandler.setApi("测试接口");
errorHandler.setCustomExceptionMessage("测试接口调用失败");
errorHandler.setCodeField("code");
errorHandler.setMessageField("message");
errorHandler.init(); // 初始化配置，调用后就无法修改其中的配置了会忽略setxx()等方法的执行。

// 直接在请求构建器中配置
RestRequestBuilder.fromUriString(restClient, "https://api.example.com")
    .path("/api/test/{id}")
    .method(HttpMethod.POST)
    .withJsonErrorHandler("SUCCESS")
    .errorService("测试服务")
    .errorApi("测试接口")
    .exceptionMessage("测试接口调用失败")
    .errorCodeField("code")
    .errorMessageField("message")
    .jsonBody(new User("admin", "password"))
    .toJson(Result.class);
```

#### 自定义错误处理器
你如果不想用我提供的这个错误处理器，也可以自己手动实现一个，`Spring`有提供`ResponseErrorHandler`接口，我也是实现的这个接口。

```java
import org.springframework.web.client.ResponseErrorHandler;

public class CustomResponseErrorHandler implements ResponseErrorHandler {
    @Override
    public boolean hasError(ClientHttpResponse response) throws IOException {
        // 判断响应是否发生错误
    }
    
    @Override
    public void handleError(URI url, HttpMethod method, ClientHttpResponse response) throws IOException {
        // 处理响应发生的错误
    }
}

CustomResponseErrorHandler errorHandler = new CustomResponseErrorHandler();
RestRequestBuilder.fromUriString(restClient, "https://api.example.com")
    .path("/api/test/{id}")
    .method(HttpMethod.POST)
    .jsonBody(new User("admin", "password"))
    .buildRequestBodySpec()
    .retrieve()
    .onStatus(errorHandler)
    .toBodilessEntity();
```

### 返回响应值

#### 无响应值
```java
RestClient restClient = RestClient.builder().build();

RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toBodilessEntity();
```

#### 返回资源
依赖于`org.springframework.http.converter.ResourceHttpMessageConverter`Http消息处理器

类似于返回字节数组，只是用`Resource`包装过

```java
RestClient restClient = RestClient.builder().build();

Resource resource1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toResource();
		
// 设置可接受响应类型
Resource resource2 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toResource(MediaType.APPLICATION_OCTET_STREAM, MediaType.TEXT_MARKDOWN);	
```

#### 返回字节数组
依赖于`org.springframework.http.converter.ByteArrayHttpMessageConverter`Http消息处理器

```java
RestClient restClient = RestClient.builder().build();

byte[] bytes1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toBytes();
		
// 设置可接受响应类型
byte[] bytes2 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toBytes(MediaType.APPLICATION_OCTET_STREAM, MediaType.TEXT_MARKDOWN);
```

#### 返回字符串
依赖于`org.springframework.http.converter.StringHttpMessageConverter`Http消息处理器

```java
RestClient restClient = RestClient.builder().build();

String str1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toString();
		
// 设置可接受响应类型
String str2 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toString(MediaType.APPLICATION_OCTET_STREAM, MediaType.TEXT_MARKDOWN);
```

#### 返回Java对象
依赖于`org.springframework.http.converter.json.MappingJackson2HttpMessageConverter`Http消息处理器

```java
RestClient restClient = RestClient.builder().build();

class TestVO {
    String name;
    Integer age;
}

TestVO testVO1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toJson(TestVO.class);

// 如果响应类型为泛型，建议使用ParameterizedTypeReference定义返回类型
TestVO testVO2 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toJson(new ParameterizedTypeReference<List<TestVO>>() {});
```

#### 返回自定义类型
依赖于`org.springframework.http.converter.HttpMessageConverter`Http消息处理器

```java
RestClient restClient = RestClient.builder().build();

class TestVO {
    String name;
    Integer age;
}

TestVO testVO1 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toBean(TestVO.class, MediaType.APPLICATION_JSON);
		
// 如果响应类型为泛型，建议使用ParameterizedTypeReference定义返回类型
TestVO testVO2 = RestRequestBuilder.fromUriString(restClient, "http://xxxxx/api/v1")
		.method(HttpMethod.GET)
		.path("/user")
		.toBean(new ParameterizedTypeReference<List<TestVO>>() {}, MediaType.APPLICATION_JSON);
```


### 追加操作
如果我定义的方法不能满足于你构建请求的需求，也可以自行追加操作。

调用`buildRequestBodySpec`方法，我返回的是`RestClient.RequestBodySpec`，你可以进行后续的链式调用进行其他操作。

```java
ResponseEntity<String> responseEntity = RestRequestBuilder.fromUriString(restClient, "https://api.example.com")
    .path("/api/test/{id}")
    .method(HttpMethod.POST)
    .jsonBody(new User("admin", "password"))
    .buildResponseSpec()
    .accept(acceptableMediaTypes) // 设置可接受的响应类型
	.retrieve() // 执行请求操作
	.toEntity(String.class); // 返回响应内容
```
