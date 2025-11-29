---
layout: doc
---

<script setup>
const commonsVersion = import.meta.env.VITE_COMMONS_VERSION;
</script>

# 图像

## 概述
image 模块主要基于`twelvemonkeys`和`metadata-extractor`开发，提供了一系列图像处理功能，例如：
- 图像相关常量
- 图像尺寸数据结构
- 图像信息工具类
- 图像处理器

## 安装
```xml-vue
<dependency>
    <dependency>
        <groupId>io.github.pangju666.commons</groupId>
        <artifactId>commons-image</artifactId>
        <version>{{ commonsVersion }}</version>
    </dependency>
</dependency>

<!-- 可选引入 -->
<dependency>
    <dependency>
        <groupId>io.github.pangju666.commons</groupId>
        <artifactId>commons-imageio</artifactId>
        <version>{{ commonsVersion }}</version>
    </dependency>
</dependency>
```


