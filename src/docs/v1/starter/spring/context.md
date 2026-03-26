---
layout: doc
---

# StaticSpringContext

## 概述
`io.github.pangju666.framework.boot.spring.StaticSpringContext`

提供静态方法访问`Spring`容器中的`ApplicationContext`、`Environment和BeanFactory`。

主要用于在非`Spring`管理的类中获取`Spring`容器中的`Bean`和配置信息。

> [!TIP]
> 这个主要是在工具类或者写库的时候用，一般情况下还是建议用正常方式注入项目配置和Spring Bean。

## 方法

| 方法名            | 返回值                |               用途               |
|----------------|:-------------------|:------------------------------:|
| getContext     | ApplicationContext |         获取Spring应用上下文          |
| getEnvironment | Environment        |          获取Spring环境配置          |
| getBeanFactory | BeanFactory        |        获取Spring Bean工厂         |
| getProperty    | String             | 获取配置属性值（支持${property}格式的属性名解析） |

## 用法
```java
// 获取应用上下文
ApplicationContext context = StaticSpringContext.getContext();

// 获取项目配置
Boolean enabled = StaticSpringContext.getEnvironment().getProperty("spring.threads.virtual.enabled", Boolean.class);

// 获取Spring Bean
MongoTemplate mongoTemplate = StaticSpringContext.getBeanFactory().getBean(MongoTemplate.class);
```
