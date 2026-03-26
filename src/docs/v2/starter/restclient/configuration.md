---
layout: doc
---

# 自动装配

## RestClient

### 概述
我默认装配了一个`RestClient`并向其配置了[响应内容缓存拦截器](/v2/framework/web/client#响应内容缓存拦截器)来配合[`错误处理器`](/v2/framework/web/client#错误处理器)

### 自定义
你可以通过自定义一个`RestClient`Bean来替换我的定义。

```java
@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public RestClient restClient(RestClient.Builder builder) {
		return builder.build();
	}
}
```
