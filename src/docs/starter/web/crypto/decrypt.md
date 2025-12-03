---
layout: doc
---

# 接口解密

## 解密请求体

支持对`String`和`JSON`类型的请求体进行解密，解密/解码失败则抛出[`RequestDataDecryptFailureException`](/starter/web/crypto/decrypt#异常)。

> [!IMPORTANT]
> 传递JSON请求体密文时，需要将请求体的`Content-Type`设置为`application/json`，否则`Spring`会将其视作字符串类型请求体。

### 注解
`io.github.pangju666.framework.boot.web.annotation.DecryptRequestBody`

#### 属性
- key: 明文密钥或占位符，支持两种形式：
    1. 明文密钥：直接传入密钥字符串，例如`@DecryptRequestBody(key = "my-secret-key")`
    2. 占位符：使用`${property.name}`格式，框架将从`Spring`配置读取实际密钥值，例如`@DecryptRequestBody(key = "${app.encryption.key}")`
- algorithm: [加密算法](/starter/crypto/enums#加密算法)，默认使用`AES256`算法。
- encoding: 字符串/`JSON`加密输出的[编码方式](/starter/crypto/enums#编码类型)，默认使用`BASE64`。
- factory: 自定义加密工厂（必须存在可访问的无参构造方法）。
    - 优先级：当提供工厂类型时，优先使用该类型；未提供时按算法枚举关联的工厂。
    - 获取策略：从`Spring`容器获取`Bean`；当容器不可用或获取失败时抛出[`ServerException`](/framework/web/exception#服务器内部异常)。
    - 默认与行为：未指定则使用算法默认工厂；如提供多个类型，仅取第一个。

### 使用示例

```java
public class UserDTO {
	private String username;

	public UserDTO(String username) {
		this.username = username;
	}
}

@RestController
@RequestMapping("/api")
public class DemoController {
    // 解密字符串类型请求体
    @PostMapping("/submit")
    public ResponseEntity<String> submit(
                    @DecryptRequestBody(key = "${app.encryption.key}")
                     @RequestBody String content) {
        return ResponseEntity.ok(content);
    }
    
    // 手动指定算法工厂类型，此时算法类型将不生效
    @PostMapping("/create")
    public ResponseEntity<String> create(@DecryptRequestBody(key = "123456", 
                        factory = AES256CryptoFactory.class) 
                       @RequestBody String content) {
        return ResponseEntity.ok(content);
    }
    
    // 解密JSON类型请求体
    @PostMapping("/submit")
    public UserDTO submit(
                    @DecryptRequestBody(key = "${app.encryption.key}")
                     @RequestBody UserDTO user) {
       return user;
    }
    
    // 手动指定算法工厂类型，此时算法类型将不生效
    @PostMapping("/create")
    public UserDTO create(@DecryptRequestBody(key = "123456", 
                        factory = AES256CryptoFactory.class) 
                       @RequestBody UserDTO user) {
       return user;
    }
}
```

## 解密请求参数
支持对`String`类型请求参数进行解密，解密/解码失败则抛出[`RequestDataDecryptFailureException`](/starter/web/crypto/decrypt#异常)。

### 注解
`io.github.pangju666.framework.boot.web.annotation.EncryptRequestParam`

#### 属性
- value: 请求参数的名称（指定HTTP请求中参数的名称。如果不指定或为空字符串，则默认使用方法参数的名称）。
- required: 参数是否为必需（默认为`true`，当设置为`true`时，如果请求中缺少该参数且未配置默认值，则抛出`MissingServletRequestParameterException`异常。当设置为`false`时，缺失的参数返回`null`）。
- defaultValue: 参数的默认值（当请求中未提供参数值时，使用该默认值。默认值应为有效的枚举名称（不区分大小写）。如果指定了默认值，则即使`required`为true，参数缺失时也会使用默认值而不会抛出异常）。
- key: 明文密钥或占位符，支持两种形式：
    1. 明文密钥：直接传入密钥字符串，例如`@DecryptRequestBody(key = "my-secret-key")`
    2. 占位符：使用`${property.name}`格式，框架将从`Spring`配置读取实际密钥值，例如`@DecryptRequestBody(key = "${app.encryption.key}")`
- algorithm: [加密算法](/starter/crypto/enums#加密算法)，默认使用`AES256`算法。
- encoding: 字符串/`JSON`加密输出的[编码方式](/starter/crypto/enums#编码类型)，默认使用`BASE64`。
- factory: 自定义加密工厂（必须存在可访问的无参构造方法）。
    - 优先级：当提供工厂类型时，优先使用该类型；未提供时按算法枚举关联的工厂。
    - 获取策略：从`Spring`容器获取`Bean`；当容器不可用或获取失败时抛出[`ServerException`](/framework/web/exception#服务器内部异常)。
    - 默认与行为：未指定则使用算法默认工厂；如提供多个类型，仅取第一个。

### 使用示例

```java
@RestController
@RequestMapping("/api")
public class DemoController {
    // 解密字符串类型请求体
    @GetMapping("/test")
    public ResponseEntity<String> test(@EncryptRequestParam(key = "123456") 
                                        String username) {
        return ResponseEntity.ok(username);
    }
    
    // 手动指定算法工厂类型，此时算法类型将不生效
    @GetMapping("/test")
    public ResponseEntity<String> test(@EncryptRequestParam(key = "123456",
                                        factory = AES256CryptoFactory.class) 
                                        String content) {
        return ResponseEntity.ok(content);
    }
    
     // 设置参数名称为 user，为非必须参数，参数值为 null 或空白字符串时解析为 hello world
    @GetMapping("/test")
    public ResponseEntity<String> test(@EncryptRequestParam(
                                        value="user",
                                        required = false,
                                        defaultValue = "hello world",
                                        key = "123456", 
                                        factory = AES256CryptoFactory.class) 
                                        String username) {
        return ResponseEntity.ok(username);
    }
}
```

## 解密异常
`io.github.pangju666.framework.boot.web.exception.RequestDataDecryptFailureException`

用于标识请求参数或请求体在解密过程中发生的校验类错误。

响应状态码：400

业务状态码：-4510
