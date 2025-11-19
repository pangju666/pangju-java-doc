---
layout: doc
---

<script setup>
const frameworkVersion = import.meta.env.VITE_FRAMEWORK_VERSION;
const mybatisPlusVersion = import.meta.env.VITE_MYBATIS_PLUS_VERSION;
</script>

# Mybatis Plus模块

## Mybatis Plus 版本

{{ mybatisPlusVersion }}

## 概述
Mybatis Plus 模块是基于`Mybatis Plus`开发的，定义了一系列Mybatis Plus开发辅助工具，例如：
- ID校验
- 常用请求数据结构
- 基础实体类
- `CrudRepository`拓展
- 常用类型处理器
- 实体类工具类

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
