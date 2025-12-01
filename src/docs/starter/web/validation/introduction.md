---
layout: doc
---

# Web

## 概述
这个模块我集成了[`Pangju Starter Web`](/starter/web/introduction)、`spring-boot-starter-aop`、`resilience4j-ratelimiter`和`expiringmap`。

## 依赖

```xml
<dependency>
    <groupId>io.github.pangju666.framework.boot</groupId>
    <artifactId>framework-spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>

<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-ratelimiter</artifactId>
</dependency>
<dependency>
    <groupId>net.jodah</groupId>
    <artifactId>expiringmap</artifactId>
</dependency>
```

## 引入
```xml
<dependency>
    <dependency>
        <groupId>io.github.pangju666.framework.boot</groupId>
		<artifactId>framework-spring-boot-starter-web-validation</artifactId>
    </dependency>
</dependency>
```
