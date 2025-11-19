---
layout: doc
---

<script setup>
const commonsVersion = import.meta.env.VITE_COMMONS_VERSION;
</script>

# 简介

基于`Apache Commons`、`jasypt`、`twelvemonkeys`、`poi`, `poi-tl`等工具库，包含了基础、文件压缩、加解密、地理信息、图像、IO、PDF、
OFFICE、Jakarta参数校验用途的工具类

## 使用要求
\>= JDK 11

## 模块列表
| 模块                                            |                            介绍                             |
|-----------------------------------------------|:---------------------------------------------------------:|
| [compress](/commons/compress/introduction)    |               文件压缩工具类库（基于commons-compress）                |
| [crypto](/commons/crypto/introduction)        |                     加解密工具类库（基于jasypt）                     |
| [geo](/commons/geo/introduction)              |                          GEO工具类库                          |
| [image](/commons/image/introduction)          | 图片工具类库（基于metadata-extractor、twelvemonkeys和javax Image IO） |
| [imageio](/commons/image/introduction)        |                ImageIO解析库，集成了各个库的ImageIO包                 |
| [io](/commons/io/introduction)                |         IO工具类库（基于tika、commons-io和commons-crypto）          |
| [lang](/commons/lang/introduction)            |    基础工具类库，部分代码来源于Hutool、Spring Framework、Mybatis plus     |
| [pdf](/commons/pdf/introduction)              |                     PDF工具库（基于pdfbox）                      |
| [poi](/commons/poi/introduction)              |                  POI工具库（基于poi 和 poi-tl）                   |
| [validation](/commons/validtion/introduction) |                参数校验库（基于jakarta-validation）                |

## 引入

### 全部引入
不推荐这种方式，如果你想图省事当我没说
```xml-vue
<parent>
    <groupId>io.github.pangju666.commons</groupId>
    <artifactId>commons-all</artifactId>
    <version>{{ commonsVersion }}</version>
    <relativePath/>
</parent>
```

### 按需引入
如果你想像Spring-Boot一样引入，再由子模块决定用到哪些模块，你可以在父模块中加入：
```xml-vue
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.github.pangju666.commons</groupId>
            <artifactId>commons-bom</artifactId>
            <version>{{ commonsVersion }}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
在子模块中就可以引入自己需要的模块了：
```xml-vue
<dependencies>
    <dependency>
        <groupId>io.github.pangju666.commons</groupId>
        <artifactId>commons-lang</artifactId>
    </dependency>
</dependencies>
```
