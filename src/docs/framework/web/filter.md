---
layout: doc
---

# 过滤器

## 基础过滤器
`io.github.pangju666.framework.web.filter.BaseHttpRequestFilter`

我在`org.springframework.web.filter.OncePerRequestFilter`的基础上增加了路径排除功能，其他功能不变。

```java
class TestHttpRequestFilter extends BaseHttpRequestFilter {
    // 不传排序路径，则不拦截任何路径
    public TestHttpRequestFilter() {
		super();
	}
	
    public TestHttpRequestFilter(Set<String> excludePathPatterns) {
		super(excludePathPatterns);
	}
}
```

## 内容缓存包装过滤器
`io.github.pangju666.framework.web.filter.ContentCachingWrapperHttpRequestFilter`

这个过滤器主要是将`HttpServletRequest`转换为`ContentCachingRequestWrapper`，将`HttpServletResponse`转换为`ContentCachingResponseWrapper`，
保证请求体和响应体可以重复读取或写入。
