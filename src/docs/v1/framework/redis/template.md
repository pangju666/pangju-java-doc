---
layout: doc
---

# SCAN

## ScanRedisTemplate
`io.github.pangju666.framework.data.redis.core.ScanRedisTemplate<V>`

用途：围绕[`Redis SCAN`](https://redis.io/docs/latest/commands/scan/)命令提供简洁的扫描`API`，将游标结果聚合为集合或映射。

行为特性：
- 采用渐进式迭代（`Cursor`），方法完成后自动关闭游标。
- 提供匹配模式由服务器端过滤；`ZSet`扫描结果按默认比较排序并返回`SortedSet`。

匹配模式的序列化器要求：
- Key 扫描：本类固定键序列化器为`StringRedisSerializer`（不可更改），始终支持模式匹配。
- Hash 扫描：本类固定哈希键序列化器为`StringRedisSerializer`（不可更改），只支持对哈希字段名（hash key/field）进行模式匹配。
- Set/ZSet 扫描：当设置匹配模式时，当前值序列化器必须支持`String`类型序列化，否则抛出`UnsupportedOperationException`。

方法列表：

| 方法名               | 返回值                                       |             用途             |
|-------------------|:------------------------------------------|:--------------------------:|
| scanKeys          | String                                    |           扫描所有键            |
| scanKeysBySuffix  | Set\<String>                              |          按后缀扫描所有键          |
| scanKeysByPrefix  | Set\<String>                              |          按前缀扫描所有键          |
| scanKeysByKeyword | Set\<String>                              |     按关键字扫描所有键（包含该关键字）      |
| scanZSet          | SortedSet\<ZSetOperations.TypedTuple\<V>> |        扫描 ZSet 的元素         |
| scanSet           | Set\<V>                                   |         扫描 Set 的元素         |
| scanHash          | Map\<String, V>                           |        扫描 Hash 的键值对        |
| scanHashBySuffix  | Map\<String, V>                           | 按后缀扫描 Hash 的键值对（按哈希字段名过滤）  |
| scanHashByPrefix  | Map\<String, V>                           | 按前缀扫描 Hash 的键值对（按哈希字段名过滤）  |
| scanHashByKeyword | Map\<String, V>                           | 按关键字扫描 Hash 的键值对（按哈希字段名过滤） |
| scanOptions       | ScanOptions                               |           构建扫描规则           |

`Spring Bean`定义示例：
```java
@Bean
public ScanRedisTemplate<Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
	ScanRedisTemplate<Object> template = new ScanRedisTemplate<>();
	template.setConnectionFactory(redisConnectionFactory);
	template.setKeySerializer(RedisSerializer.string());
	template.setValueSerializer(RedisSerializer.json());
	template.setHashKeySerializer(RedisSerializer.string());
	template.setHashValueSerializer(RedisSerializer.json());
	return template;
}
```

### 扫描键
```java
ScanRedisTemplate<Object> redisTemplate;

// 扫描所有key
redisTemplate.scanKeys();

// 扫描所有list类型的key
redisTemplate.scanKeys(DataType.LIST); 

// 扫描所有后缀为test（*test）的key
redisTemplate.scanKeysBySuffix("test");

// 扫描所有后缀为test（*test）且是list类型的key
redisTemplate.scanKeysBySuffix("test", DataType.LIST);

// 扫描所有前缀为test（test*）的key
redisTemplate.scanKeysByPrefix("test");

// 扫描所有前缀为test（test*）且是list类型的key
redisTemplate.scanKeysByPrefix("test", DataType.LIST);

// 扫描所有键名包含（*test*）的key
redisTemplate.scanKeysByPrefix("test");

// 扫描所有键名包含（*test*）且是list类型的key
redisTemplate.scanKeysByPrefix("test", DataType.LIST);

// 也可以自定义扫描规则
ScanOptions scanOptions = redisTemplate.scanOptions(null, DataType.STRING, 1000);
redisTemplate.scanKeys(scanOptions);
```

### 扫描Set元素
```java
ScanRedisTemplate<Object> redisTemplate;

// 自定义扫描规则
ScanOptions scanOptions = redisTemplate.scanOptions(null, null, 1000);
redisTemplate.scanSetValues("test_set", scanOptions);
```

### 扫描ZSet元素
```java
ScanRedisTemplate<Object> redisTemplate;

// 自定义扫描规则
ScanOptions scanOptions = redisTemplate.scanOptions(null, null, 1000);
redisTemplate.scanZSetValues("test_zset", scanOptions);
```

### 扫描Hash元素
```java
ScanRedisTemplate<Object> redisTemplate;

// 扫描test_hash下hash键后缀为name（*name）的所有键值对
redisTemplate.scanHashBySuffix("test_hash", "name"); 

// 扫描test_hash下hash键前缀为name（name*）的所有键值对
redisTemplate.scanHashByPrefix("test_hash", "name");

// 扫描test_hash下hash键包含name（*name*）的所有键值对
redisTemplate.scanHashByKeyword("test_hash", "name");

// 自定义扫描规则
ScanOptions scanOptions = redisTemplate.scanOptions("*name*", null, 1000);
redisTemplate.scanHash(scanOptions);
```

## StringScanRedisTemplate
`io.github.pangju666.framework.data.redis.core.StringScanRedisTemplate`

在`ScanRedisTemplate`基础上，预设键、值、哈希键和哈希值的序列化器为`RedisSerializer.string()`，确保所有基于模式的扫描路径均与字符串序列化兼容。 

提供对 ZSet/Set 元素的按后缀、前缀、关键字的便捷扫描方法。

| 方法名               | 返回值                                            |           用途            |
|-------------------|:-----------------------------------------------|:-----------------------:|
| scanZSetBySuffix  | SortedSet\<ZSetOperations.TypedTuple\<String>> |     按后缀扫描 ZSet 的元素      |
| scanZSetByPrefix  | SortedSet\<ZSetOperations.TypedTuple\<String>> |     按前缀扫描 ZSet 的元素      |
| scanZSetByKeyword | SortedSet\<ZSetOperations.TypedTuple\<String>> | 按关键字扫描 ZSet 的元素（包含该关键字） |
| scanSetBySuffix   | Set\<String>                                   |      按后缀扫描 Set 的元素      |
| scanSetByPrefix   | Set\<String>                                   |      按前缀扫描 Set 的元素      |
| scanSetByKeyword  | Set\<String>                                   | 按关键字扫描 Set 的元素（包含该关键字）  |

### 扫描Set元素
```java
StringScanRedisTemplate redisTemplate;

// 扫描test_set下后缀为name（*name）的所有元素
redisTemplate.scanHashBySuffix("test_set", "name"); 

// 扫描test_set下前缀为name（name*）的所有元素
redisTemplate.scanHashByPrefix("test_set", "name");

// 扫描test_set下名包含name（*name*）的所有元素
redisTemplate.scanHashByKeyword("test_set", "name");
```

### 扫描ZSet元素
```java
StringScanRedisTemplate redisTemplate;

// 扫描test_zset下后缀为name（*name）的所有元素
redisTemplate.scanHashBySuffix("test_zset", "name"); 

// 扫描test_zset下前缀为name（name*）的所有元素
redisTemplate.scanHashByPrefix("test_zset", "name");

// 扫描test_zset下包含name（*name*）的所有元素
redisTemplate.scanHashByKeyword("test_zset", "name");
```

## JsonScanRedisTemplate
`io.github.pangju666.framework.data.redis.core.JsonScanRedisTemplate`

在`ScanRedisTemplate`基础上，预设值和哈希值的序列化器为`RedisSerializer.json()`，适用于以 JSON 格式存储对象的场景。

## JavaScanRedisTemplate
`io.github.pangju666.framework.data.redis.core.JavaScanRedisTemplate`

在`ScanRedisTemplate`基础上，预设值和哈希值的序列化器为`RedisSerializer.java()`，适用于需要以 JDK 序列化存储对象的场景。
