---
layout: doc
---

<script setup>
const commonsVersion = import.meta.env.VITE_COMMONS_VERSION;
</script>

# 压缩模块

## 概述
compress 模块是基于`commons-compress`开发的，提供了一系列功能，例如：
- 压缩相关常量
- Zip压缩工具类
- 7z压缩工具类
- Tar压缩工具类
- GZip压缩工具类
- XZ压缩工具类
- 通用压缩工具类

## 安装
```xml-vue
<dependency>
    <dependency>
        <groupId>io.github.pangju666.commons</groupId>
        <artifactId>commons-compress</artifactId>
        <version>{{ commonsVersion }}</version>
    </dependency>
</dependency>
```


