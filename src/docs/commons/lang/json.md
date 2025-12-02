---
layout: doc
---

# JSON

## 说明

基于`Gson`，我提供了一些内置序列化器、类型适配器和一个通用工具类。

| 类名                       | 类型    |              用途              |
|--------------------------|:------|:----------------------------:|
| BigDecimalTypeAdapter    | 类型适配器 |   在 JSON 与 BigDecimal 之间转换   |
| BigIntegerTypeAdapter    | 类型适配器 |   在 JSON 与 BigInteger 之间转换   |
| DateTypeAdapter          | 类型适配器 |      在 JSON 与 Date 之间转换      |
| InstantTypeAdapter       | 类型适配器 |    在 JSON 与 Instant 之间转换     |
| LocalDateTimeTypeAdapter | 类型适配器 | 在 JSON 与 LocalDateTime 之间转换  |
| LocalDateTypeAdapter     | 类型适配器 |   在 JSON 与 LocalDate 之间转换    |
| LocalTimeTypeAdapter     | 类型适配器 |   在 JSON 与 LocalTime 之间转换    |
| JsonUtils                | 工具类   | 解析\生成JSON字符串、JSON/Java对象互相转换 |

## 类型适配器

### BigDecimal
`io.github.pangju666.commons.lang.gson.type.BigDecimalTypeAdapter`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(BigDecimal.class, new BigDecimalTypeAdapter());
Gson gson = builder.create();

gson.toJsonTree(new BigDecimal("100"), BigDecimal.class); // "100"
gson.fromJson("100.22", BigDecimal.class); // 100.22
gson.fromJson("\"100.22\", BigDecimal.class); // 100.22
```

### BigInteger
`io.github.pangju666.commons.lang.gson.type.BigIntegerTypeAdapter`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(BigInteger.class, new BigIntegerTypeAdapter());
Gson gson = builder.create();

gson.toJsonTree(new BigInteger("100"), BigInteger.class); // "100"
gson.fromJson("100", BigInteger.class); // 100
gson.fromJson("\"100\"", BigInteger.class); // 100
```

### Date
`io.github.pangju666.commons.lang.gson.type.DateTypeAdapter`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(Date.class, new DateTypeAdapter());
Gson gson = builder.create();

gson.fromJson("1640995200000", Date.class); // 2022-01-01 08:00:00
gson.fromJson("\"2022-01-01 00:00:00\"", Date.class); // 2022-01-01 08:00:00
gson.fromJson("\"2022-01-01\"", Date.class); // 2022-01-01 00:00:00
gson.fromJson("\"2022-01-01 00:00\"", Date.class); // 2022-01-01 00:00:00
gson.toJsonTree(new Date(), Date.class); // 1761310267319
```

### Instant
`io.github.pangju666.commons.lang.gson.type.InstantTypeAdapter`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(Instant.class, new InstantTypeAdapter());
Gson gson = builder.create();

gson.fromJson("1640995200000", Instant.class); // 2022-01-01 08:00:00
gson.toJsonTree(Instant.now(), Instant.class); // 1761310267319
```

### LocalDate
`io.github.pangju666.commons.lang.gson.type.LocalDateTypeAdapter`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateTypeAdapter());
Gson gson = builder.create();

gson.toJsonTree(LocalDate.of(2022, 1, 1), LocalDate.class); // 2022-01-01
gson.fromJson("1640995200000", LocalDate.class); // 2022-01-01
gson.fromJson("\"2022-01-01\"", LocalDate.class); // 2022-01-01
```

### LocalDateTime
`io.github.pangju666.commons.lang.gson.type.LocalDateTimeTypeAdapter`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeTypeAdapter());
Gson gson = builder.create();

gson.toJsonTree(LocalDateTime.of(2022, 1, 1, 8, 0, 0), LocalDateTime.class); // 2022-01-01 08:00:00
gson.fromJson("1640995200000", LocalDateTime.class); // 2022-01-01 08:00:00
gson.fromJson("\"2022-01-01T00:00:00\"", LocalDateTime.class); // 2022-01-01 00:00:00
```

### LocalTime
`io.github.pangju666.commons.lang.gson.type.LocalTimeTypeAdapter`

```java
GsonBuilder builder = new GsonBuilder().registerTypeAdapter(LocalTime.class, new LocalTimeTypeAdapter());
Gson gson = builder.create();

gson.toJsonTree(LocalTime.of(8, 0, 0), LocalTime.class); // 08:00:00
gson.fromJson("1640995200000", LocalTime.class); // 00:00:00
gson.fromJson("\"10:15:30\"", LocalTime.class); // 10:15:30
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

> [!NOTE]
> 此工具类已默认配置上述类型适配器。

## DEFAULT_GSON
```java
// 已默认配置上述序列化/反序列化器
Gson gson = JsonUtils.DEFAULT_GSON();
```

### createGsonBuilder
```java
// 默认配置上述类型适配器
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
