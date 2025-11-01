---
layout: doc
---

# 拦截器

## 基础拦截器
`io.github.pangju666.framework.web.interceptor.BaseHttpInterceptor`

我在`org.springframework.web.servlet.HandlerInterceptor`的基础上，增加了一些常用属性：
- order：执行顺序
- patterns：拦截路径
- excludePathPatterns：排除路径

```java
class TestHttpInterceptor extends BaseHttpInterceptor {
    public TestHttpInterceptor(Set<String> patterns, Set<String> excludePathPatterns, int order) {
		super(patterns, excludePathPatterns, order);
	}
}

public class WebMvcConfiguration implements WebMvcConfigurer {
    @Override
	public void addInterceptors(InterceptorRegistry registry) {
		TestHttpInterceptor testHttpInterceptor = new TestHttpInterceptor(Set.of("/**"), Collections.emptySet(), Ordered.LOWEST_PRECEDENCE);
			registry.addInterceptor(testHttpInterceptor)
				.addPathPatterns(testHttpInterceptor.getPatterns())
				.excludePathPatterns(testHttpInterceptor.getExcludePathPatterns())
				.order(interceptor.getOrder());
	}
}
```
