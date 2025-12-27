---
layout: doc
---

# 接口加密

## 加密响应体

支持对`String`、`byte[]`和`JSON`类型的响应体进行加密，加密失败则抛出[`ServerException`](/framework/web/exception#服务器内部异常)。

### 注解
`io.github.pangju666.framework.boot.web.annotation.EncryptResponseBody`

> [!IMPORTANT]
> 注解的`key`属性支持`SpEl`表达式，如：
>
> `#headers['My-Secret-Header']` - 使用请求头参数
>
> 不支持使用`#p0`,`#p1`这样的方法参数表达式。

#### 属性
- key: 明文密钥或占位符，支持三种形式：
  1. 明文密钥：直接传入密钥字符串，例如`@EncryptResponseBody(key = "my-secret-key")`
  2. 占位符：使用`${property.name}`格式，框架将从`Spring`配置读取实际密钥值，例如`@EncryptResponseBody(key = "${app.encryption.key}")`
  3. SpEL表达式：例如：`#headers['My-Secret-Header']`，使用`headers`作为上下文变量
- algorithm: [加密算法](/starter/crypto/enums#加密算法)，默认使用`AES256`算法。
- encoding: 字符串/`JSON`加密输出的[编码方式](/starter/crypto/enums#编码类型)，默认使用`BASE64`。
- factory: 自定义加密工厂（必须存在可访问的无参构造方法）。
  - 优先级：当提供工厂类型时，优先使用该类型；未提供时按算法枚举关联的工厂。
  - 获取策略：从`Spring`容器获取`Bean`；当容器不可用或获取失败时抛出[`ServerException`](/framework/web/exception#服务器内部异常)。
  - 默认与行为：未指定则使用算法默认工厂；如提供多个类型，仅取第一个。

### 使用示例

```java
public class UserVO {
	private String username;

	public UserVO(String username) {
		this.username = username;
	}
}

// 可以直接标注在类上，表示对控制器类中所有的接口响应进行加密
@EncryptResponseBody(key = "${app.encryption.key}")
@RestController
@RequestMapping("/api")
public class DemoController {
    // 加密字符串类型响应（如果不使用ResponseEntity包装，会被包装为Result类型的JSON响应）
    @EncryptResponseBody(key = "${app.encryption.key}")
    public ResponseEntity<String> echo() {
        return ResponseEntity.ok("sensitive-text");
    }
    
    // 手动指定算法工厂类型，此时算法类型将不生效
	@EncryptFormat(key = "123456", factory = AES256CryptoFactory.class)
	public ResponseEntity<String> echo() {
        return ResponseEntity.ok("sensitive-text");
    }
    
    // 加密字节数组类型响应
	@EncryptFormat(key = "123456")
	public byte[] echo() {
        return "sensitive-text".getBytes();
    }
    
    // 加密JSON类型响应
	@EncryptFormat(key = "123456")
	public UserVO echo() {
        return new UserVO("test_user");
    }
}
```
