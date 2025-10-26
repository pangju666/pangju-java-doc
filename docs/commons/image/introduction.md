---
layout: doc
---

<script setup>
const commonsVersion = import.meta.env.VITE_COMMONS_VERSION;
</script>

# 图像模块

## 概述
image 模块主要基于`twelvemonkeys`和`metadata-extractor`开发，提供了一系列图像处理功能，例如：
- 图像相关常量
- 图像尺寸数据结构
- 图像滤镜处理工具类
- 图像处理工具类
- 缩略图生成工具类

## 安装
```xml-vue
<dependency>
    <dependency>
        <groupId>io.github.pangju666</groupId>
        <artifactId>pangju-commons-image</artifactId>
        <version>{{ commonsVersion }}</version>
    </dependency>
</dependency>

<!-- 可选引入 -->
<dependency>
    <dependency>
        <groupId>io.github.pangju666</groupId>
        <artifactId>pangju-commons-imageio</artifactId>
        <version>{{ commonsVersion }}</version>
    </dependency>
</dependency>
```


