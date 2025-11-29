---
layout: doc
---

# 图像

## 概述
这个模块我集成了`spring-boot-starter`、`tika-parser-image-module`和[`Pangju Commons Image`](/commons/image/introduction)。

## 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
</dependency>

<dependency>
    <groupId>io.github.pangju666.commons</groupId>
    <artifactId>commons-image</artifactId>
</dependency>

<dependency>
    <groupId>io.github.pangju666.commons</groupId>
    <artifactId>commons-imageio</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.tika</groupId>
    <artifactId>tika-parser-image-module</artifactId>
</dependency>
```

## 引入
```xml
<dependency>
    <dependency>
        <groupId>io.github.pangju666.framework.boot</groupId>
		<artifactId>framework-spring-boot-starter-image</artifactId>
        <!-- 如果选择使用 GraphicsMagick的话，可以考虑去除这个依赖
        （如果你还想使用ImageIO读取/写入图片的话，建议保留） -->
        <exclusions>
            <exclusion>
                <groupId>io.github.pangju666.commons</groupId>
                <artifactId>commons-imageio</artifactId>
            </exclusion>
        </exclusions>
    </dependency>

    <!-- 如果想使用 GraphicsMagick 处理图像，需要引入这两个库 -->
    <dependency>
        <groupId>org.im4java</groupId>
        <artifactId>im4java</artifactId>
    </dependency>
    <dependency>
        <groupId>com.sharneng</groupId>
        <artifactId>gm4java</artifactId>
    </dependency>
</dependency>
```
