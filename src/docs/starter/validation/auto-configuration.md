---
layout: doc
---

# 自动装配

## 说明
我在`spring boot`内置的`ValidationAutoConfiguration`基础上，新增了`ValidationConfigurationCustomizer` Bean。

目的：当验证过程中发现第一个错误时，验证过程将立即停止并返回错误，不再继续验证其他属性。

```java
@ConditionalOnMissingBean(ValidationConfigurationCustomizer.class)
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
如果你不喜欢我定义的默认行为，也可以覆盖掉我的默认定义实现自己的需求

```java
@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public ValidationConfigurationCustomizer customValidationConfigurationCustomizer() {
		return configuration -> {
		    //... 自定义处理
		};
	}
}
```
