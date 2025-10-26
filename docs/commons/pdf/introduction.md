---
layout: doc
---

<script setup>
const commonsVersion = import.meta.env.VITE_COMMONS_VERSION;
</script>

# 图像模块

## 概述
image 模块主要基于`pdfbox`开发，提供了一系列图像处理功能，例如：
- PDF相关常量
- PDF书签数据结构
- PDF文档工具类

## 安装
```xml-vue
<dependency>
    <dependency>
        <groupId>io.github.pangju666</groupId>
        <artifactId>pangju-commons-pdf</artifactId>
        <version>{{ commonsVersion }}</version>
    </dependency>
</dependency>
```


