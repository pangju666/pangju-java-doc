---
layout: doc
---

# 反序列化器

## LocalDate
io.github.pangju666.framework.boot.jackson.deserializer.LocalDateJsonDeserializer

将时间戳反序列化为`LocalDate`

### 手动反序列化
```java
// 注入获取
ObjectMapper objectMapper;

LocalDate value = objectMapper.reader().readValue("1763740800000", LocalDate.class);
```

### 自动反序列化
```java
public class TestDTO {
	private LocalDate value;
}

@PostMapping("/test")
public void test(TestDTO testDTO) {
}
// 接口请求体：{"value": 1763740800000}
```

## LocalDateTime
io.github.pangju666.framework.boot.jackson.deserializer.LocalDateTimeJsonDeserializer

将时间戳反序列化为`LocalDateTime`

### 手动反序列化
```java
// 注入获取
ObjectMapper objectMapper;

LocalDateTime value = objectMapper.reader().readValue("1763825125000", LocalDateTime.class);
```

### 自动反序列化
```java
public class TestDTO {
	private LocalDateTime value;
}

@PostMapping("/test")
public void test(TestDTO testDTO) {
}
// 接口请求体：{"value": 1763825125000}
```

## Class
io.github.pangju666.framework.boot.jackson.deserializer.ClassJsonDeserializer

将字符串反序列化为`Class`

### 手动反序列化
```java
// 注入获取
ObjectMapper objectMapper;

Class<?> value = objectMapper.reader().readValue("\"java.lang.String\"", Class.class); // String.class

// 如果未找到对应的 Class 则会返回 null
Class<?> value = objectMapper.reader().readValue("\"java.lang.String.A\"", Class.class); // null
```

### 自动反序列化
```java
public class TestDTO {
	private Class<?> value;
}

@PostMapping("/test")
public void test(TestDTO testDTO) {
}
// 接口请求体：{"value": "java.lang.String"}
```

## Enum
io.github.pangju666.framework.boot.jackson.deserializer.EnumJsonDeserializer

将字符串反序列化为枚举变量

### 手动反序列化
```java
// 注入获取
ObjectMapper objectMapper;

enum TestEnum {
	A,
	B
}

// 按枚举变量名称匹配
TestEnum testEnum = objectMapper.reader().readValue("\"A\"", TestEnum.class); // TestEnum.A

// 大小写不敏感
TestEnum testEnum = objectMapper.reader().readValue("\"a\"", TestEnum.class); // TestEnum.A

// 如果未找到匹配的枚举变量则会返回 null
TestEnum testEnum = objectMapper.reader().readValue("\"AB\"", TestEnum.class); // null
```

### 自动反序列化
```java
public class TestDTO {
	private TestEnum value;
}

@PostMapping("/test")
public void test(TestDTO testDTO) {
}
// 接口请求体：{"value": "A"}
```
