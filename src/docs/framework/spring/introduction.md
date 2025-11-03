---
layout: doc
---

<script setup>
const frameworkVersion = import.meta.env.VITE_FRAMEWORK_VERSION;
</script>

# Spring模块

## 概述
Spring 模块是基于`Spring Context`开发的， 提供了一些Spring相关的工具类和常量池，例如：
- Spring相关常量
- Java Bean工具类
- 反射工具类
- SpEL表达式工具类

## 安装
```xml-vue
<dependency>
    <dependency>
        <groupId>io.github.pangju666.framework</groupId>
        <artifactId>framework-spring</artifactId>
        <version>{{ frameworkVersion }}</version>
    </dependency>
</dependency>
```


