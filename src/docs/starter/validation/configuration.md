---
layout: doc
---

# 自动装配

## 说明
我在`spring boot`内置的`ValidationAutoConfiguration`基础上，新增了`ValidationConfigurationCustomizer` Bean。

目的：当验证过程中发现第一个错误时，验证过程将立即停止并返回错误，不再继续验证其他属性。

```java
@Order(Ordered.HIGHEST_PRECEDENCE)
@Bean
public ValidationConfigurationCustomizer hibernateValidationConfigurationCustomizer() {
	return configuration -> {
		if (configuration instanceof HibernateValidatorConfiguration hibernateValidatorConfiguration) {
			hibernateValidatorConfiguration.failFast(true);
		}
	};
}
```

## 自定义
`Spring Boot`支持同时定义多个`ValidationConfigurationCustomizer`类型的`Bean`，你可以定义自己的`Bean`覆盖掉我的配置或者增加自己的配置。

```java
@SpringBootConfiguration
public class BeanConfig {
    // 需要比我的排序号低才能覆盖我的默认配置
    @Order(Ordered.HIGHEST_PRECEDENCE + 1)
	@Bean
	public ValidationConfigurationCustomizer customValidationConfigurationCustomizer() {
		return configuration -> {
		    //... 自定义处理
		};
	}
}
```
