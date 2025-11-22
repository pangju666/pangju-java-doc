---
layout: doc
---

# JSON

## 说明

基于`Gson`，我提供了一些内置序列化/反序列器和一个通用工具类

| 类名                            | 类型       |                 用途                 |
|-------------------------------|:---------|:----------------------------------:|
| BigDecimalDeserializer        | 反序列化接口实现 |     将JSON数字、字符串元素转换为BigDecimal     |
| BigIntegerDeserializer        | 反序列化接口实现 |     将JSON数字、字符串元素转换为BigInteger     |
| ClassJsonDeserializer         | 反序列化接口实现 |         将JSON字符串元素转换为Class         |
| DateJsonDeserializer          | 反序列化接口实现 |     将JSON时间字符串/时间戳数字元素转换为Date      |
| LocalDateJsonDeserializer     | 反序列化接口实现 |   将JSON时间字符串/时间戳数字元素转换为LocalDate   |
| LocalDateTimeJsonDeserializer | 反序列化接口实现 | 将JSON时间字符串/时间戳数字元素转换为LocalDateTime |
| ClassJsonSerializer           | 序列化接口实现  |    将Class对象元素转换为Class名字符串JSON元素    |
| DateJsonSerializer            | 序列化接口实现  |      将Date对象元素转换为时间戳数字JSON元素       |
| LocalDateJsonSerializer       | 序列化接口实现  |    将LocalDate对象元素转换为时间戳数字JSON元素    |
| LocalDateTimeJsonSerializer   | 序列化接口实现  |  将LocalDateTime对象元素转换为时间戳数字JSON元素  |
| JsonUtils                     | 工具类      |    解析\生成JSON字符串、JSON/Java对象互相转换    |

## 序列化

### BigDecimal
`io.github.pangju666.commons.lang.gson.deserializer.BigDecimalDeserializer`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(BigDecimal.class, new BigDecimalDeserializer());
Gson gson = builder.create();

gson.fromJson("100.22", BigDecimal.class); // 100.22
gson.fromJson("100", BigDecimal.class); // 100.0
```

### BigInteger
`io.github.pangju666.commons.lang.gson.deserializer.BigIntegerDeserializer`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(BigInteger.class, new BigIntegerDeserializer());
Gson gson = builder.create();

gson.fromJson("100", BigInteger.class); // 100
```

### Class
`io.github.pangju666.commons.lang.gson.deserializer.ClassJsonDeserializer`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(Class.class, new ClassJsonDeserializer());
Gson gson = builder.create();

gson.fromJson("java.lang.String", Class.class); // Class<String>
```

### Date
`io.github.pangju666.commons.lang.gson.deserializer.DateJsonDeserializer`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(Date.class, new DateJsonDeserializer());
Gson gson = builder.create();

gson.fromJson("1640995200000", Date.class); // 2022-01-01 08:00:00
gson.fromJson("\"2022-01-01 00:00:00\"", Date.class); // 2022-01-01 00:00:00
gson.fromJson("\"2022-01-01\"", Date.class); // 2022-01-01 00:00:00
gson.fromJson("\"2022-01-01 00:00\"", Date.class); // 2022-01-01 00:00:00
```

### LocalDate
`io.github.pangju666.commons.lang.gson.deserializer.LocalDateJsonDeserializer`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateJsonDeserializer());
Gson gson = builder.create();

gson.fromJson("1640995200000", LocalDate.class); // 2022-01-01 08:00:00
gson.fromJson("\"2022-01-01 00:00:00\"", LocalDate.class); // 2022-01-01 00:00:00
gson.fromJson("\"2022-01-01\"", LocalDate.class); // 2022-01-01 00:00:00
gson.fromJson("\"2022-01-01 00:00\"", LocalDate.class); // 2022-01-01 00:00:00
```

### LocalDateTime
`io.github.pangju666.commons.lang.gson.deserializer.LocalDateTimeJsonDeserializer`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeJsonDeserializer());
Gson gson = builder.create();

gson.fromJson("1640995200000", LocalDateTime.class); // 2022-01-01 08:00:00
gson.fromJson("\"2022-01-01 00:00:00\"", LocalDateTime.class); // 2022-01-01 00:00:00
gson.fromJson("\"2022-01-01\"", LocalDateTime.class); // 2022-01-01 00:00:00
gson.fromJson("\"2022-01-01 00:00\"", LocalDateTime.class); // 2022-01-01 00:00:00
```

## 反序列化

### Class
`io.github.pangju666.commons.lang.gson.serializer.ClassJsonSerializer`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(Class.class, new ClassJsonSerializer());
Gson gson = builder.create();

gson.toJsonTree(String.class, Class.class); // java.lang.String
```

### Date
`io.github.pangju666.commons.lang.gson.serializer.DateJsonSerializer`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(Date.class, new DateJsonSerializer());
Gson gson = builder.create();

gson.toJsonTree(new Date(), Date.class); // 1761310267319
```

### LocalDate
`io.github.pangju666.commons.lang.gson.serializer.LocalDateJsonSerializer`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateJsonSerializer());
Gson gson = builder.create();

gson.toJsonTree(LocalDate.of(2022, 1, 1), LocalDate.class); // 1640966400000
```

### LocalDateTime
`io.github.pangju666.commons.lang.gson.serializer.LocalDateTimeJsonSerializer`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeJsonSerializer());
Gson gson = builder.create();

gson.toJsonTree(LocalDateTime.of(2022, 1, 1, 8, 0, 0), LocalDateTime.class); // 1640995200000
```

## 工具类
`io.github.pangju666.commons.lang.utils.JsonUtils`

| 方法名               | 返回值         |           用途           |
|-------------------|:------------|:----------------------:|
| createGsonBuilder | GsonBuilder |  创建预配置的GsonBuilder实例   |
| parseString       | JsonElement | 解析JSON字符串为JsonElement  |
| fromString        | 泛型          |   反序列化JSON字符串到指定类型对象   |
| toString          | String      |     序列化对象为JSON字符串      |
| fromJson          | 泛型          | 反序列化JsonElement到Java对象 |
| toJson            | JsonElement |   序列化对象为JsonElement    |
| fromJsonArray     | List\<T>    |   反序列化JsonArray到List   |
| toJsonArray       | JsonArray   |    序列化集合为JsonArray     |

### createGsonBuilder
```java
GsonBuilder builder = JsonUtils.createGsonBuilder().setPrettyPrinting();
Gson gson = builder.create();
```

### parseString
```java
JsonUtils.parseString("{"test": "test_str"}"); // JsonObject
```

### fromString
```java
public class Test {
    public String test;
}

JsonUtils.fromString("{"test": "test_str"}", Test.class); // Test对象
JsonUtils.fromString("{"test": "test_str"}", JsonUtils.createGsonBuilder().create(), Test.class); // Test对象

JsonUtils.fromString("{"test": "test_str"}", new com.google.gson.reflect.TypeToken<Test>(){}); // Test对象
JsonUtils.fromString("{"test": "test_str"}", JsonUtils.createGsonBuilder().create(), new com.google.gson.reflect.TypeToken<Test>(){}); // Test对象
```

### toString
```java
public class Test {
    public String test;
}
Test test = new Test();
test.test = "test_str";

JsonUtils.toString(test); // {"test": "test_str"}
JsonUtils.toString(test, JsonUtils.createGsonBuilder().create()); // {"test": "test_str"}

JsonUtils.toString(test, Test.class); // {"test": "test_str"}
JsonUtils.toString(test, JsonUtils.createGsonBuilder().create(), Test.class); // {"test": "test_str"}

JsonUtils.toString(test, new com.google.gson.reflect.TypeToken<Test>(){}); // {"test": "test_str"}
JsonUtils.toString(test, JsonUtils.createGsonBuilder().create(), new com.google.gson.reflect.TypeToken<Test>(){}); // {"test": "test_str"}
```

### fromJson
```java
public class Test {
    public String test;
}

JsonObject json = new JsonObject();
json.addProperty("test", "test_str");

JsonUtils.fromJson(json, Test.class); // Test对象
JsonUtils.fromJson(json, JsonUtils.createGsonBuilder().create(), Test.class); // Test对象

JsonUtils.fromJson(json, new com.google.gson.reflect.TypeToken<Test>(){}); // Test对象
JsonUtils.fromJson(json, JsonUtils.createGsonBuilder().create(), new com.google.gson.reflect.TypeToken<Test>(){}); // Test对象
```

### toJson
```java
public class Test {
    public String test;
}
Test test = new Test();
test.test = "test_str";

JsonUtils.toJson(test); // JsonObject
JsonUtils.toJson(test, JsonUtils.createGsonBuilder().create()); // JsonObject

JsonUtils.toJson(test, Test.class); // JsonObject
JsonUtils.toJson(test, JsonUtils.createGsonBuilder().create(), Test.class); // JsonObject

JsonUtils.toJson(test, new com.google.gson.reflect.TypeToken<Test>(){}); // JsonObject
JsonUtils.toJson(test, JsonUtils.createGsonBuilder().create(), new com.google.gson.reflect.TypeToken<Test>(){}); // JsonObject
```

### fromJsonArray
```java
public class Test {
    public String test;
}

JsonObject json = new JsonObject();
json.addProperty("test", "test_str");
JsonArray array = new JsonArray();
array.add(json);

JsonUtils.fromJsonArray(json); // Test对象列表
JsonUtils.fromJsonArray(json, JsonUtils.createGsonBuilder().create()); // Test对象列表

JsonUtils.fromJsonArray(json, new com.google.gson.reflect.TypeToken<List<Test>>(){}); // Test对象列表
JsonUtils.fromJsonArray(json, JsonUtils.createGsonBuilder().create(), new com.google.gson.reflect.TypeToken<List<Test>>(){}); // Test对象列表
```

### toJsonArray
```java
public class Test {
    public String test;
}
Test test = new Test();
test.test = "test_str";

JsonUtils.toJsonArray(Collections.singletonList(test)); // JsonArray
JsonUtils.toJsonArray(Collections.singletonList(test), JsonUtils.createGsonBuilder().create()); // JsonArray

JsonUtils.toJsonArray(Collections.singletonList(test), new com.google.gson.reflect.TypeToken<List<Test>>(){}); // JsonArray
JsonUtils.toJsonArray(Collections.singletonList(test), JsonUtils.createGsonBuilder().create(), new com.google.gson.reflect.TypeToken<List<Test>>(){}); // JsonArray
```
