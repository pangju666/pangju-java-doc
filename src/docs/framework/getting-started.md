---
layout: doc
---

<script setup>
const frameworkVersion = import.meta.env.VITE_FRAMEWORK_VERSION;
</script>

# 说明

基于`Spring Framework`开发的业务框架，主要包含MongoDB、Redis、Mybatis Plus、Web几个方面

## 使用要求
\>= JDK 17

## 组件列表
模块的artifactId统一格式为 pangju-framework-模块名，例如：`pangju-framework-spring`

| 模块                |                  介绍                  |
|-------------------|:------------------------------------:|
| data-mongodb      |   MongoDB模块，基于spring-data-mongodb    |
| data-mybatis-plus | Mybatis Plus模块，基于mybatis-plus-spring |
| data-redis        |     Redis模块，基于spring-data-redis      |
| spring            |      Spring模块，基于spring-context       |
| web               |        Web模块，基于spring-webmvc         |

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
