---
layout: doc
---

<script setup>
const frameworkVersion = import.meta.env.VITE_FRAMEWORK_VERSION;
</script>

# Web模块

## 概述
Web 模块是基于`Spring WebMVC`开发的，定义了一系列Web开发常用的工具，例如：
- 业务异常体系
- 客户端请求构建器
- 基础拦截器
- 基础过滤器
- 基础请求数据结构
- 基础响应数据结构
- Web相关常量
- 分片下载工具类
- HTTP请求工具类
- HTTP响应构建器
- IP工具类
- 数据操作断言

## 安装
```xml-vue
<dependency>
    <dependency>
        <groupId>io.github.pangju666.framework</groupId>
        <artifactId>framework-web</artifactId>
        <version>{{ frameworkVersion }}</version>
    </dependency>
</dependency>
```
