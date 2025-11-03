---
layout: doc
---

<script setup>
const commonsVersion = import.meta.env.VITE_COMMONS_VERSION;
</script>

# IO模块

## 概述
crypto 模块是基于`commons-io`、`commons-crypto`和`tika`开发的，提供了一系列功能，例如：
- 文件类型枚举
- IO相关常量
- 文件名工具类
- 文件工具类
- IO工具类

## 安装
```xml-vue
<dependency>
    <dependency>
        <groupId>io.github.pangju666.commons</groupId>
        <artifactId>commons-io</artifactId>
        <version>{{ commonsVersion }}</version>
    </dependency>
</dependency>
```


