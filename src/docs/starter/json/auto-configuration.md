---
layout: doc
---

# 自动装配

## 说明
我在`spring boot`内置的`JacksonAutoConfiguration`基础上，新增了`Jackson2ObjectMapperBuilderCustomizer` Bean。

目的：配置我内置的序列化和反序列化器。

```java
@Order(Ordered.HIGHEST_PRECEDENCE)
@Bean
public Jackson2ObjectMapperBuilderCustomizer jackson2ObjectMapperBuilderCustomizer() {
	return jacksonObjectMapperBuilder -> jacksonObjectMapperBuilder
		.deserializerByType(Class.class, new ClassJsonDeserializer())
		.deserializerByType(Enum.class, new EnumJsonDeserializer())
		.serializerByType(LocalDateTime.class, new LocalDateTimeJsonSerializer())
		.deserializerByType(LocalDateTime.class, new LocalDateTimeJsonDeserializer())
		.serializerByType(LocalDate.class, new LocalDateJsonSerializer())
		.deserializerByType(LocalDate.class, new LocalDateJsonDeserializer());
}
```

## 自定义
`Spring Boot`支持同时定义多个`Jackson2ObjectMapperBuilderCustomizer`类型的`Bean`，你可以定义自己的`Bean`覆盖掉我的配置或者增加自己的配置。

```java
@SpringBootConfiguration
public class BeanConfig {
    // 需要比我的排序号低才能覆盖我的默认配置
    @Order(Ordered.HIGHEST_PRECEDENCE + 1)
	@Bean
	public Jackson2ObjectMapperBuilderCustomizer customJackson2ObjectMapperBuilderCustomizer() {
		return jacksonObjectMapperBuilder -> {
		    //... 自定义处理
		};
	}
}
```

