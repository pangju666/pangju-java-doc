---
layout: doc
---

<script setup>
const commonsVersion = import.meta.env.VITE_COMMONS_VERSION;
</script>

# 图像模块

## 概述
image 模块主要基于`poi`和`poi-tl`开发，提供了一系列图像处理功能，例如： 
- POI相关常量
- DOC文档工具类
- DOCX文档工具类
- DOCX模板工具类
- Excel工作簿工具类

## 安装
```xml-vue
<dependency>
    <dependency>
        <groupId>io.github.pangju666</groupId>
        <artifactId>pangju-commons-poi</artifactId>
        <version>{{ commonsVersion }}</version>
    </dependency>
</dependency>
```


