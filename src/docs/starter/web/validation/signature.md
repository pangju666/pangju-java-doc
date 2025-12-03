---
layout: doc
---

# 接口签名
提供对接口进行签名校验的能力，支持两种签名方式，多种签名计算方法。

> [!IMPORTANT]
> 只有使用请求头方式签名时才支持签名时效校验。
> 
> 使用请求参数签名时，需要将请求参数也一起进行URL编码。
> 
> 签名算法推荐使用`SHA256`。

## 配置
```yaml
pangju:
  web:
    signature:
      signature-header-name: X-Signature # 签名请求头名称，默认为X-Signature
      app-id-header-name: X-App-Id # 应用ID请求头名称，默认为X-App-Id
      timestamp-header-name: X-Timestamp # 请求时间戳请求头名称，默认为X-Timestamp 
      signature-param-name: apiSignature # 签名请求参数名称，默认为apiSignature
      app-id-param-name: apiAppId # 应用ID请求参数名称，默认为apiAppId
      secret-keys: # 使用默认密钥存储器时的密钥列表
        app1: secretKey1 # 应用ID为 app1，密钥为 secretKey1
        app2: secretKey2
```

## 校验逻辑

### 请求参数方式
1. 从请求参数中提取应用ID、签名
2. 判断应用ID是否存在于注解的应用ID列表中（注解未配置则不判断）
3. 根据应用ID从密钥存储器中获取密钥
4. 拼接字符串：应用ID + & + 密钥 + & + URL编码后请求URL（包含请求参数）
5. 根据算法计算拼接字符串的摘要
6. 比较摘要与请求参数中的签名是否一致

拼接示例：
appId&secretKey&http%3a%2f%2f127.0.0.1%2fapi%2ftest%3fusername%3dtest_user

### 请求头方式
1. 从请求头中提取应用ID、签名和时间戳
2. 判断应用ID是否存在于注解的应用ID列表中（注解未配置则不判断）
3. 判断时间戳是否已超时（根据注解中定义的超时时间判断）
4. 根据应用ID从密钥存储器中获取密钥
5. 拼接字符串：应用ID + & + 密钥 + & + 请求URL（不包含请求参数也无需URL编码） + & + 时间戳
6. 根据算法计算拼接字符串的摘要
7. 比较摘要与请求参数中的签名是否一致

拼接示例：
appId&secretKey&http://127.0.0.1/api/test?username=test_user

## 注解
`io.github.pangju666.framework.boot.web.annotation.Signature`

### 属性
- appId: 指定支持的应用 ID 列表，默认为空列表（请求中应用 ID 必须与此处配置的 appId 匹配，为空则不校验）。
- type: 签名的存在位置，默认为`ANY`，可选值：
  - PARAMS（从请求参数中读取签名）
  - HEADER（从请求头中读取签名）
  - ANY（两种都可以）
- algorithm: 签名算法，默认使用`SHA256`（指定用于生成校验签名的哈希算法）。
- timeout: 签名超时时间，默认为 1（请求的时间戳超过此时间将被拒绝，单位由 timeUnit 决定）。
- timeUnit：超时时间单位，默认为分钟（指定 timeout 的时间单位）。

## 签名算法
`io.github.pangju666.framework.boot.web.enums.SignatureAlgorithm`

| 枚举值    |                   说明                    |                          
|--------|:---------------------------------------:|
| SHA1   |        `SHA-1`哈希算法（安全性较低，已逐渐被弃用）        |
| SHA256 | `SHA-256`哈希算法（兼顾安全性与性能的主流算法，适用于大多数应用场景） |
| SHA512 |   `SHA-512`哈希算法（提供更高的安全性，适合高安全性需求场景）    |
| MD5    | `MD5`哈希算法（计算速度快，但安全性较弱，已不推荐用于高安全性需求场景）  |

## 密钥存储
`io.github.pangju666.framework.boot.web.signature.SecretKeyStorer`

### 接口定义
```java
public interface SecretKeyStorer {
	String loadSecretKey(String appId);
}
```

### 默认实现
`io.github.pangju666.framework.boot.web.signature.impl.DefaultSecretKeyStorer`

从`Map`中读取应用ID和密钥

### 自定义实现
推荐从数据库之类的存储中间件中读取密钥。

```java
public class CustomSecretKeyStorer implements SecretKeyStorer {
	@Override
	public String loadSecretKey(String appId) {
	    // ...实现密钥读取逻辑
		return "";
	}
}

@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public CustomSecretKeyStorer customSecretKeyStorer() {
		return new CustomSecretKeyStorer();
	}
}
```

## 使用示例

```java
@RestController
@RequestMapping("/api")
public class DemoController {
    @Signature
	@GetMapping("/test")
	public UserVO test() {
		return new UserVO("test_user");
	}

	// 指定应用ID（接口请求的应用ID必须与其一致）
    @Signature(appId = "test")
	@GetMapping("/test")
	public UserVO test() {
		return new UserVO("test_user");
	}
	
	// 指定多个应用ID（接口请求的应用ID需要存在在于这些应用ID之中）
    @Signature(appId = {"test", "test2"})
	@GetMapping("/test")
	public UserVO test() {
		return new UserVO("test_user");
	}
    
    // 指定签名算法
    @Signature(appId = "test", algorithm = SignatureAlgorithm.SHA1)
	@GetMapping("/test")
	public UserVO test() {
		return new UserVO("test_user");
	}
	
	// 指定签名方式为请求参数
    @Signature(appId = "test", type = Signature.SignatureType.PARAM)
	@GetMapping("/test")
	public UserVO test() {
		return new UserVO("test_user");
	}
    
    // 修改签名时效为五分钟
    @Signature(appId = "test", algorithm = SignatureAlgorithm.SHA1, timeout = 5)
	@GetMapping("/test")
	public UserVO test() {
		return new UserVO("test_user");
	}
	
	// 修改签名时效为五秒
    @Signature(appId = "test", algorithm = SignatureAlgorithm.SHA1, 
               timeout = 5, timeUnit = TimeUnit.SECONDS)
	@GetMapping("/test")
	public UserVO test() {
		return new UserVO("test_user");
	}
}
```
