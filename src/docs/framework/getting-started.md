---
layout: doc
---

<script setup>
const frameworkVersion = import.meta.env.VITE_FRAMEWORK_VERSION;
</script>

# 说明

基于`Spring Framework`和`Mybatis Plus`开发的业务用框架

## 使用要求
\>= JDK 17

## 组件列表
模块的artifactId统一格式为 pangju-framework-模块名，例如：`pangju-framework-spring`

| 模块                |        介绍        |
|-------------------|:----------------:|
| data-mongodb      |   框架MongoDB模块    |
| data-mybatis-plus | 框架Mybatis Plus模块 |
| data-redis        |    框架Redis模块     |
| spring            |    框架Spring模块    |
| web               |     框架Web模块      |

## 引入

### 全部引入
不推荐这种方式，如果你想图省事当我没说
```xml-vue
<parent>
    <groupId>io.github.pangju666</groupId>
    <artifactId>pangju-framework-all</artifactId>
    <version>{{ frameworkVersion }}</version>
    <relativePath/>
</parent>
```

### 按需引入
如果你想像Spring-Boot一样引入，再由子模块决定用到哪些模块，你可以在父模块中加入：
```xml-vue
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.github.pangju666</groupId>
            <artifactId>pangju-framework-bom</artifactId>
            <version>{{ frameworkVersion }}</version>
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
        <groupId>io.github.pangju666</groupId>
        <artifactId>pangju-framework-spring</artifactId>
    </dependency>
</dependencies>
```
