---
layout: doc
---

<script setup>
const frameworkVersion = import.meta.env.VITE_FRAMEWORK_VERSION;
</script>

# MongoDB 模块

## 概述
MongoDB 模块是基于`spring-data-mongodb`开发的，定义了一系列MongoDB辅助工具，例如：
- 基础实体类
- 常用请求数据结构
- `MongoDB`常量
- `MongoRepository`拓展
- 查询工具类

## 安装
```xml-vue
<dependency>
    <dependency>
        <groupId>io.github.pangju666.framework</groupId>
        <artifactId>framework-data-mongodb</artifactId>
        <version>{{ frameworkVersion }}</version>
    </dependency>
</dependency>
```
