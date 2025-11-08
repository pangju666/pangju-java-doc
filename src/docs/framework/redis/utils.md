---
layout: doc
---

# 工具类
`io.github.pangju666.framework.data.redis.utils.RedisUtils`

| 方法名        | 返回值    |      用途       |
|------------|:-------|:-------------:|
| computeKey | String | 计算（拼接）Redis 键 |
| deleteKeys | void   |  批量删除键（支持重试）  |

## 计算键
这个是我用的比较多的一个方法，用来拼接Redis key的。

```java
RedisUtils.computeKey("user_id_cache", 1); // user_id_cache:1

// 也允许传入null值
RedisUtils.computeKey("user_id_cache", null); // user_id_cache:null
```

## 批量删除
这个是我之前做批量删除`Token`时发现部分key删除失败了，所以我就做了这么一个带重试机制的批量删除。

> [!TIP]
> 如果一次删除成功，则不会触发重试机制。
> 
> 所以最好不要传一些不存在的key，避免无意义的删除尝试。

```java
RedisTemplate<Object, Object> redisTemplate;

Set<Object> keys = Set.of("key1", "key2");

// 默认会重试3次，尝试全部删除
RedisUtils.deleteKeys(redisTemplate, keys);

// 也可以自行指定重试次数
RedisUtils.computeKey(redisTemplate, keys, 5);
```
