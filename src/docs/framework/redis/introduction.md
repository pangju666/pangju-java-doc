---
layout: doc
---

<script setup>
const frameworkVersion = import.meta.env.VITE_FRAMEWORK_VERSION;
</script>

# Redis模块

## 概述
Redis 模块是基于`spring-data-redis`开发的，定义了一系列Redis开发辅助工具，例如：
- `Redis`常量
- `ZSet`数据结构
- 序列化器枚举
- 支持`SCAN`扫描的`RedisTemplate`
- `Redis`工具类

## 安装
```xml-vue
<dependency>
    <dependency>
        <groupId>io.github.pangju666.framework</groupId>
        <artifactId>framework-data-redis</artifactId>
        <version>{{ frameworkVersion }}</version>
    </dependency>
</dependency>
```
