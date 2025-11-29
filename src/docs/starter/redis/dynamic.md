---
layout: doc
---

# 动态数据源

## 说明
我参考`baomidou`的`dynamic-datasource`，实现了`Redis`的动态数据源。

## 注册的Bean
`name`为数据源名称

> [!NOTE]
> 各个类型的`Bean`注册逻辑与`Spring`一致。

| Bean 类型                 |            Bean 名称            |             说明              |
|-------------------------|:-----------------------------:|:---------------------------:|
| RedisConnectionDetails  | {name}RedisConnectionDetails  |         Redis 连接详情          |
| RedisConnectionFactory  | {name}RedisConnectionFactory  |         Redis 连接工厂          |
| RedisTemplate           |      {name}RedisTemplate      |        RedisTemplate        |
| StringRedisTemplate     |   {name}StringRedisTemplate   |     StringRedisTemplate     |
| ScanRedisTemplate       |    {name}ScanRedisTemplate    |    支持游标扫描的 RedisTemplate    |
| StringScanRedisTemplate | {name}StringScanRedisTemplate | 支持游标扫描的字符串序列化 RedisTemplate |

## 配置
数据源的配置，我继承了`spring`的配置，并在其基础上增加了`key-serializer`、`value-serializer`、`hash-key-serializer`和`hash-value-serializer`。

[`ScanRedisTemplate`](/framework/redis/template)的值和哈希值序列化器取决于数据源配置中的`value-serializer`和`hash-value-serializer`。

`RedisTemplate`的键、值、哈希键和哈希值序列化器取决于数据源配置中的`key-serializer`、`value-serializer`、`hash-key-serializer`和`hash-value-serializer`。

```yaml
spring:
  data:
    redis:
      dynamic:
        # 设置主数据源
        primary: redis1
        databases:
          redis1:
            host: 192.168.0.100
            port: 6379
            database: 0
            key-serializer: STRING # 键序列化器
            value-serializer: JSON # 值序列化器
            hash-key-serializer: STRING # 哈希键序列化器
            hash-value-serializer: JSON # 哈希值序列化器
          redis2:
              host: 192.168.0.100
              port: 6379
              database: 1
              key-serializer: STRING
              value-serializer: JSON
              hash-key-serializer: STRING
              hash-value-serializer: JSON
          redis3:
              host: 192.168.0.100
              port: 6378
              database: 1
              key-serializer: STRING
              value-serializer: JSON
              hash-key-serializer: STRING
              hash-value-serializer: JSON
          redis4:
              host: 192.168.0.101
              port: 6379
              database: 1
              key-serializer: STRING
              value-serializer: JSON
              hash-key-serializer: STRING
              hash-value-serializer: JSON
```

## 使用示例
```java
@Service
public class RedisService {
	public RedisService(// 注入主数据源的 RedisConnectionFactory
						RedisConnectionFactory redisConnectionFactory,
						// 注入主数据源的 RedisTemplate
						RedisTemplate<Object, Object> redisTemplate,
						// 注入 注入主数据源的 ScanRedisTemplate
						ScanRedisTemplate<Object> scanRedisTemplate,
						// 注入 注入主数据源的 StringRedisTemplate
						StringRedisTemplate stringRedisTemplate,
						// 注入 注入主数据源的 StringScanRedisTemplate
						StringScanRedisTemplate stringScanRedisTemplate,
						// 注入 redis2 数据源的 RedisConnectionFactory
						@Qualifier("redis2RedisConnectionFactory")
						RedisConnectionFactory redisConnectionFactory2,
						// 注入 redis2 数据源的 RedisTemplate
						@Qualifier("redis2RedisTemplate")
						RedisTemplate<Object, Object> redisTemplate2,
						// 注入 redis2 数据源的 StringRedisTemplate
						@Qualifier("redis2StringRedisTemplate")
						StringRedisTemplate stringRedisTemplate2,
						// 注入 redis2 数据源的 ScanRedisTemplate
						@Qualifier("redis2ScanRedisTemplate")
						ScanRedisTemplate<Object> scanRedisTemplate2,
						// 注入 redis2 数据源的 StringScanRedisTemplate
						@Qualifier("redis2StringScanRedisTemplate")
						StringScanRedisTemplate stringScanRedisTemplate2) {		
	}
	
	// 通过`DynamicRedisUtils`获取
	public void test() {
		RedisConnectionFactory redisConnectionFactory = DynamicRedisUtils.getRedisConnectionFactory("redis1");
		RedisTemplate<Object, Object> redisTemplate = DynamicRedisUtils.getRedisTemplate("redis1");
		ScanRedisTemplate<Object> scanRedisTemplate = DynamicRedisUtils.getScanRedisTemplate("redis1");
		StringRedisTemplate stringRedisTemplate = DynamicRedisUtils.getStringRedisTemplate("redis1");
		StringScanRedisTemplate stringScanRedisTemplate = DynamicRedisUtils.getStringScanRedisTemplate("redis1");
	}
}
```
