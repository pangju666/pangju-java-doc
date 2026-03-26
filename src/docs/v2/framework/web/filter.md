---
layout: doc
---

# 过滤器

## 基础过滤器
`io.github.pangju666.framework.web.servlet.BaseHttpRequestFilter`

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

## HTTP异常信息过滤器
提供两个端点用于获取系统中的异常信息：
- 异常类型列表端点：返回所有已定义的异常类型（枚举）
- 异常信息列表端点：返回所有使用 HttpException 注解标注的异常类信息

### 注册
```java
@Bean
public FilterRegistrationBean<HttpExceptionInfoFilter> httpExceptionInfoFilter() {
    HttpExceptionInfoFilter filter = new HttpExceptionInfoFilter(
        "/http-exception/types",
        "/http-exception/list",
        List.of("com.example.app") // 可选扫描包
    );
    FilterRegistrationBean<HttpExceptionInfoFilter> registration = new FilterRegistrationBean<>(filter);
    // 建议直接注册构造参数对应的两个端点路径
    registration.addUrlPatterns("/http-exception/types", "/http-exception/list");
    registration.setOrder(Ordered.HIGHEST_PRECEDENCE);
    return registration;
}
```

### 异常类型列表
请求链接示例：`http://127.0.0.1/http-exception/types`

```json
{
  "code": 0,
  "message": "请求成功",
  "data": [
    {
      "label": "服务器内部错误",
      "value": "SERVER"
    },
    {
      "label": "业务逻辑错误",
      "value": "SERVICE"
    },
    {
      "label": "数据操作错误",
      "value": "DATA_OPERATION"
    },
    {
      "label": "认证授权错误",
      "value": "AUTHENTICATION"
    },
    {
      "label": "参数校验错误",
      "value": "VALIDATION"
    },
    {
      "label": "自定义错误",
      "value": "CUSTOM"
    },
    {
      "label": "未知错误",
      "value": "UNKNOWN"
    }
  ]
}
```

### 异常信息列表
请求链接示例：`http://127.0.0.1/http-exception/list`

```json
{
    "code": 0,
    "message": "请求成功",
    "data": [
        {
            "typeLabel": "未知错误",
            "type": "UNKNOWN",
            "code": -1,
            "description": null
        },
        {
            "typeLabel": "业务逻辑错误",
            "type": "SERVICE",
            "code": -1000,
            "description": "业务逻辑错误"
        },
        {
            "typeLabel": "认证授权错误",
            "type": "AUTHENTICATION",
            "code": -3000,
            "description": "认证授权错误"
        },
        {
            "typeLabel": "参数校验错误",
            "type": "VALIDATION",
            "code": -4000,
            "description": "参数校验错误"
        },
        {
            "typeLabel": "数据操作错误",
            "type": "DATA_OPERATION",
            "code": -2000,
            "description": "数据操作错误"
        },
        {
            "typeLabel": "服务器内部错误",
            "type": "SERVER",
            "code": -5000,
            "description": "服务器内部错误"
        },
        {
            "typeLabel": "业务逻辑错误",
            "type": "SERVICE",
            "code": -1100,
            "description": "Http远程服务错误"
        },
        {
            "typeLabel": "认证授权错误",
            "type": "AUTHENTICATION",
            "code": -3300,
            "description": "缺少权限错误"
        },
        {
            "typeLabel": "认证授权错误",
            "type": "AUTHENTICATION",
            "code": -3100,
            "description": "认证过期错误"
        },
        {
            "typeLabel": "认证授权错误",
            "type": "AUTHENTICATION",
            "code": -3200,
            "description": "缺少角色错误"
        },
        {
            "typeLabel": "参数校验错误",
            "type": "VALIDATION",
            "code": -4210,
            "description": "id已存在错误"
        },
        {
            "typeLabel": "参数校验错误",
            "type": "VALIDATION",
            "code": -4230,
            "description": "id格式不正确错误"
        },
        {
            "typeLabel": "参数校验错误",
            "type": "VALIDATION",
            "code": -4330,
            "description": "标识符格式不正确错误"
        },
        {
            "typeLabel": "参数校验错误",
            "type": "VALIDATION",
            "code": -4220,
            "description": "id不存在错误"
        },
        {
            "typeLabel": "参数校验错误",
            "type": "VALIDATION",
            "code": -4120,
            "description": "数据不存在错误"
        },
        {
            "typeLabel": "参数校验错误",
            "type": "VALIDATION",
            "code": -4320,
            "description": "标识符不存在错误"
        },
        {
            "typeLabel": "参数校验错误",
            "type": "VALIDATION",
            "code": -4110,
            "description": "数据已存在错误"
        },
        {
            "typeLabel": "参数校验错误",
            "type": "VALIDATION",
            "code": -4310,
            "description": "标识符已存在错误"
        },
        {
            "typeLabel": "数据操作错误",
            "type": "DATA_OPERATION",
            "code": -2200,
            "description": "数据创建错误"
        },
        {
            "typeLabel": "数据操作错误",
            "type": "DATA_OPERATION",
            "code": -2400,
            "description": "数据保存错误"
        },
        {
            "typeLabel": "数据操作错误",
            "type": "DATA_OPERATION",
            "code": -2500,
            "description": "数据删除错误"
        },
        {
            "typeLabel": "数据操作错误",
            "type": "DATA_OPERATION",
            "code": -2300,
            "description": "数据更新错误"
        },
        {
            "typeLabel": "数据操作错误",
            "type": "DATA_OPERATION",
            "code": -2100,
            "description": "数据查询错误"
        },
        {
            "typeLabel": "业务逻辑错误",
            "type": "SERVICE",
            "code": -1110,
            "description": "Http远程服务超时错误"
        }
    ]
}
```
