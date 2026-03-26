---
layout: doc
---

# 接口限流
提供对接口进行签名限流的能力，内置提供两种限流器。

> [!IMPORTANT]
> 限流源提取器必须注册为`Spring Bean`。
> 
> 非分布式项目用`RESILIENCE4J`就可以了，速度比较快。
> 
> 注解的`key`属性支持`SpEl`表达式，如： 
> 
> `#{T(java.lang.System).currentTimeMillis()}` - 使用系统时间戳 
> 
> `#request.getParameter('param')` - 使用请求参数
> 
> 不支持使用`#p0`,`#p1`这样的方法参数表达式。
> 
> `SpEl`表达式计算失败时，直接使用表达式作为`key`。

## 配置
```yaml
pangju:
  web:
    rate-limit:
      type: RESILIENCE4J # 限流实现类型（RESILIENCE4J 或 REDISSON），默认为 RESILIENCE4J
      # Redisson相关配置
      redisson:
        redisson-client-ref: redissonClient # Redisson客户端Bean名称，默认直接根据类型注入
        key-prefix: rate-limit # Redis键前缀，默认为 rate-limit
```

## 注解
`io.github.pangju666.framework.boot.web.annotation.RateLimit`

### 属性
- key: 限流的业务键 ID 列表，默认为 请求URL+请求方法（用于标识一个特定的限流规则。同一个键会共享限流计数，不同的键维护独立的限流计数）。
- interval: 时间窗口的数值，默认为 1（与`timeUnit`配合使用确定完整的时间窗口。）。
- timeUnit: 时间单位，默认为秒（与`interval`配合使用确定完整的时间窗口）。
- rate: 时间窗口内允许的最大请求数（当单位时间内的请求数超过此值时，触发限流，后续请求会被拒绝并抛出异常）。
- scope: 限流作用域（决定限流规则的应用范围），默认为`GLOBAL`，可选值：
  - GLOBAL（全局限流。 所有客户端共享同一个限流配额， 任何客户端超过限制都会触发限流）
  - SOURCE（基于请求源的限流。 不同的请求源（如不同IP地址）各自维护独立的限流配额， 互不影响）。
- source：限流源提取器类，默认使用`IpRateLimitSourceExtractor`（基于请求的IP地址进行限流）。
- message：限流时返回的错误消息，默认为：请求次数已达上限，请稍候再试。

## 限流器
`io.github.pangju666.framework.boot.web.limit.RateLimiter`

### 接口定义
```java
public interface RateLimiter {
	boolean tryAcquire(String key, RateLimit annotation, HttpServletRequest request);
}
```

### 自定义实现
可以自行实现一个限流器覆盖掉我内置的限流器。

```java
public static class CustomRateLimiter implements RateLimiter {
	@Override
	public boolean tryAcquire(String key, RateLimit annotation, HttpServletRequest request) {
	    // ...限流逻辑
		return false; // 返回true表示请求通过，false表示已限流
	}
} 

@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public CustomRateLimiter customRateLimiter() {
		return new CustomRateLimiter();
	}
}
```

## 源提取器
`io.github.pangju666.framework.boot.web.limit.RateLimitSourceExtractor`

### 接口定义
```java
public interface RateLimitSourceExtractor {
	String getSource(HttpServletRequest request);
}
```

### 自定义实现
我只实现了提取IP地址作为请求源这一种，你可以根据业务需求自行实现其他类型。

```java
public static class CustomRateLimitSourceExtractor implements RateLimitSourceExtractor {
	@Override
	public String getSource(HttpServletRequest request) {
		return "";
	}
} 

@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public CustomRateLimitSourceExtractor customRateLimitSourceExtractor() {
		return new CustomRateLimitSourceExtractor();
	}
}
```

## 限流异常
`io.github.pangju666.framework.boot.web.exception.RateLimitException`

当请求超过设定的限流阈值时抛出该异常。

响应状态码：429

业务状态码：-4410


## 使用示例

```java
@RestController
@RequestMapping("/api")
public class DemoController {
    // 每秒只允许请求1次
    @RateLimit(rate = 1)
	@GetMapping("/test")
	public UserVO test() {
		return new UserVO("test_user");
	}

	// 每 10 分钟允许请求5次
    @RateLimit(rate = 1, timeUnit = TimeUnit.MINUTES, interval = 10)
	@GetMapping("/test")
	public UserVO test() {
		return new UserVO("test_user");
	}
	
	// 每个ip每分钟允许请求5次
    @RateLimit(rate = 5, timeUnit = TimeUnit.MINUTES, 
    scope = RateLimit.RateLimitScope.SOURCE)
	@GetMapping("/test")
	public UserVO test() {
		return new UserVO("test_user");
	}
    
    // 指定限流时返回的错误信息
    @RateLimit(rate = 5, message = "请稍后重试", 
    scope = RateLimit.RateLimitScope.SOURCE)
	@GetMapping("/test")
	public UserVO test() {
		return new UserVO("test_user");
	}
	
	// 指定限流的key
    @RateLimit(key="test-rate-limit", rate = 1, message = "请稍后重试")
	@GetMapping("/test")
	public UserVO test() {
		return new UserVO("test_user");
	}
	
	// 使用SpEl表达式计算限流的key
    @RateLimit(key="#request.getParameter('username')", rate = 1,
     message = "请稍后重试")
	@GetMapping("/test")
	public UserVO test(@RequestParam String username) {
		return new UserVO("test_user");
	}
}
```
