---
layout: doc
---

# 序列化

## 说明

| 类名                 | 类型  |         用途         |
|--------------------|:----|:------------------:|
| SerializationUtils | 工具类 | 使用静态实用程序进行序列化和反序列化 |

## 工具类
`io.github.pangju666.commons.lang.utils.SerializationUtils`

从Spring Framework拷贝的，来源于`org.springframework.util.SerializationUtils`

### 序列化
```java
SerializationUtils.serialize(null); // []
SerializationUtils.serialize(new String("测试字符串"));
```

### 深拷贝
```java
SerializationUtils.clone(null); // null
SerializationUtils.clone(new String("测试字符串")); // "测试字符串"
```
