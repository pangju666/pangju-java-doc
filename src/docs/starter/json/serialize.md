---
layout: doc
---

# 序列化器

## LocalDate
io.github.pangju666.framework.boot.jackson.serializer.LocalDateJsonSerializer

将`LocalDate`序列化为时间戳

### 手动序列化
```java
// 注入获取
ObjectMapper objectMapper;

String json = objectMapper.writer().writeValueAsString(LocalDate.of(2025,11,22)); // 1763740800000
```

### 自动序列化
```java
public class TestVO {
	private LocalDate value;
}

@GetMapping("/test")
public TestVO test() {
    TestVO testVO = new TestVO()
    testVO.setValue(LocalDate.of(2025, 11, 22));
    return testVO;
}
// 接口响应为：{"value": 1763740800000}
```

## LocalDateTime
io.github.pangju666.framework.boot.jackson.serializer.LocalDateTimeJsonSerializer

将`LocalDateTime`序列化为时间戳

### 手动序列化
```java
// 注入获取
ObjectMapper objectMapper;

String json = objectMapper.writer().writeValueAsString(LocalDateTime.of(2025, 11, 22, 23, 25, 25)); // 1763825125000
```

### 自动序列化
```java
public class TestVO {
	private LocalDateTime value;
}

@GetMapping("/test")
public TestVO test() {
    TestVO testVO = new TestVO()
    testVO.setValue(LocalDateTime.of(2025, 11, 22, 23, 25, 25));
    return testVO;
}
// 接口响应为：{"value": 1763825125000}
```
