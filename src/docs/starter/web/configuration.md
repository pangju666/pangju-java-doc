---
layout: doc
---

# 自动装配

## 跨域过滤器

### 概述
我默认装配了一个跨域过滤器（`CorsFilter`），允许任意来源、任意请求头与任意`HTTP`方法且允许携带凭证。

### 自定义
你可以通过自定义一个`CorsFilter`Bean来替换我的定义。

```java
@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean() {
	    // 配置跨域规则
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOriginPattern("*");
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		// 定义过滤器执行路径
		source.registerCorsConfiguration(WebConstants.ANT_ANY_PATH_PATTERN, config);

		FilterRegistrationBean<CorsFilter> filterRegistrationBean = new FilterRegistrationBean<>(new CorsFilter(source));
		// 定义过滤器执行排序（我内置的过滤器顺序为：跨域->日志->异常）
		filterRegistrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE + 1);
		return filterRegistrationBean;
	}
}
```

## RestClient

### 概述
我默认装配了一个`RestClient`并向其配置了[响应内容缓存拦截器](/framework/web/client.html#响应内容缓存拦截器)来配合[`错误处理器`](/framework/web/client#错误处理器)

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

## 异常信息过滤器
我默认装配了一个[异常列表过滤器](/framework/web/filter#http异常信息过滤器)

### 配置
```yaml
pangju:
  web:
    exception:
      info:
        enabled: true #是否启用异常信息过滤器
      endpoints:
        list: /exception/list # 异常类型汇总接口路径
        types: /exception/types # 异常列表查询接口路径 
      scan-packages: # 用户业务Http异常扫描包路径（未定义业务Http异常也可以不配置）
        - com.example.app.common.exception
```

### 自定义
你可以通过自定义一个`RestClient`Bean来替换我的定义。

```java
@SpringBootConfiguration
public class BeanConfig {
	@Bean
	@Bean
	public FilterRegistrationBean<HttpExceptionInfoFilter> httpExceptionInfoFilterFilterRegistrationBean(HttpExceptionInfoProperties properties) {
		Assert.hasText(properties.getEndpoints().getTypes(), "异常类型汇总接口路径不可为空");
		Assert.hasText(properties.getEndpoints().getList(), "异常列表查询接口路径不可为空");

		List<String> packages;
		if (!CollectionUtils.isEmpty(properties.getScanPackages())) {
			packages = new ArrayList<>(properties.getScanPackages().size());
			// web异常包路径
			packages.add("io.github.pangju666.framework.boot.web.exception");
			// 用户业务Http异常扫描包路径
			packages.addAll(properties.getScanPackages());
		} else {
			packages = List.of("io.github.pangju666.framework.boot.web.exception");
		}
		
		HttpExceptionInfoFilter httpExceptionInfoFilter = new HttpExceptionInfoFilter(
			properties.getEndpoints().getTypes(), properties.getEndpoints().getList(), packages);
		FilterRegistrationBean<HttpExceptionInfoFilter> filterRegistrationBean = new FilterRegistrationBean<>(httpExceptionInfoFilter);
		filterRegistrationBean.addUrlPatterns(properties.getEndpoints().getTypes(), properties.getEndpoints().getList());
		// 定义过滤器排序号，建议不要改（我内置的过滤器顺序为：跨域->日志->异常）
		filterRegistrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE + 3);
		return filterRegistrationBean;
	}
}
```

## 拦截器
所有继承了`BaseHttpInterceptor`的`Bean`，都会自动注入到`Spring Web`容器之中。

### 示例
```java
@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public WebLogInterceptor webLogInterceptor() {
		return new WebLogInterceptor(Collections.emptySet());
	}
}
```

## 参数解析器
所有`HandlerMethodArgumentResolver`类型的`Bean`，都会自动注入到`Spring Web`容器之中。

### 示例
```java
@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public EnumRequestParamArgumentResolver enumRequestParamArgumentResolver() {
		return new EnumRequestParamArgumentResolver();
	}
}
```
