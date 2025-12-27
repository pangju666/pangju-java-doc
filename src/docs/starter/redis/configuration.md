---
layout: doc
---

# 自动装配

## 说明
我定义[`ScanRedisTemplate`](/framework/redis/template)的自动装配。

我自动装配了[`StringScanRedisTemplate`](/framework/redis/template#stringscanredistemplate)和
[`JsonScanRedisTemplate`](/framework/redis/template#jsonscanredistemplate)两种Bean。

`JsonScanRedisTemplate`等价于`RedisTemplate<String, Object>`

`JsonScanRedisTemplate`等价于`ScanRedisTemplate<Object>`

## 使用示例
```java
@Service
public class RedisService {
	public RedisService(
	                    // 注入默认的 ScanRedisTemplate
	                    ScanRedisTemplate<Object> redisTemplate,
	                    // 等价于注入默认的 ScanRedisTemplate<Object>
						JsonScanRedisTemplate jsonScanRedisTemplate,
						// 注入 Spring 默认的 RedisTemplate
						RedisTemplate<Object, Object> redisTemplate2,
						// 注入 Spring 默认的 StringRedisTemplate
						StringRedisTemplate stringRedisTemplate,
						// 注入 默认的 StringScanRedisTemplate
						StringScanRedisTemplate stringScanRedisTemplate,
						// 等价于注入默认的 ScanRedisTemplate<Object>
						RedisTemplate<String, Object> redisTemplate3,
						// 注入这个会报错，因为存在两个相同类型的Bean
						// StringScanRedisTemplate 等价于 RedisTemplate<String, String>
						// StringRedisTemplate 等价于 RedisTemplate<String, String>
						RedisTemplate<String, String> redisTemplate4) {
	}
}
```

## 自定义
如果你不想使用JSON作为序列化器，那么可以使用自定义的`Bean`覆盖掉我的配置

> [!IMPORTANT]
> 如果你的Bean方法不为`scanRedisTemplate`的话，则无法覆盖掉我的自动装配。

```java
@SpringBootConfiguration
public class BeanConfig {
	public ScanRedisTemplate<Object> scanRedisTemplate(RedisConnectionFactory connectionFactory) {
		return new JavaScanRedisTemplate(connectionFactory);
	}
}
```
