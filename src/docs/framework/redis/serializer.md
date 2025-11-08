---
layout: doc
---

# 序列化器
`io.github.pangju666.framework.data.redis.enums.RedisSerializerType`

这是一个`Redis`序列化器的枚举，只是为了方便获取不同类型的序列化器

```java
RedisSerializerType.STRING.getSerializer(); // StringRedisSerializer

RedisSerializerType.JAVA.getSerializer(); // ByteArrayRedisSerializer

RedisSerializerType.JSON.getSerializer(); // GenericJackson2JsonRedisSerializer

RedisSerializerType.BYTE_ARRAY.getSerializer(); // JdkSerializationRedisSerializer
```
