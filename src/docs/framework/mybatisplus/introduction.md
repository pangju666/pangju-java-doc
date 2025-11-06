---
layout: doc
---

<script setup>
const frameworkVersion = import.meta.env.VITE_FRAMEWORK_VERSION;
</script>

# Mybatis Plus模块

## 概述
Mybatis Plus 模块是基于`Mybatis Plus`开发的，定义了一系列Web开发常用的工具，例如：
- 自增ID校验
- 常用请求数据结构
- 基础实体类
- `CrudRepository`拓展
- 常用类型处理器

## 安装
```xml-vue
<dependency>
    <dependency>
        <groupId>io.github.pangju666.framework</groupId>
        <artifactId>framework-data-mybatis-plus</artifactId>
        <version>{{ frameworkVersion }}</version>
    </dependency>
</dependency>
```
