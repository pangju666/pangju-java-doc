---
layout: doc
---

<script setup>
const frameworkVersion = import.meta.env.VITE_V1_FRAMEWORK_VERSION;
const springFrameworkVersion = import.meta.env.VITE_V1_SPRING_FRAMEWORK_VERSION;
</script>

# 简介

基于`Spring Framework`开发的业务框架，主要包含`MongoDB`、`Redis`、`Mybatis Plus`、`Web`几个方面

## 使用要求
\>= JDK 17

## Spring Framework 版本

{{ springFrameworkVersion }}

## 模块列表
| 模块                                                 |                  介绍                  |
|----------------------------------------------------|:------------------------------------:|
| [mongodb](/v1/framework/mongodb/introduction)      |   MongoDB模块，基于spring-data-mongodb    |
| [mybatis-plus](/v1/framework/mybatisplus/introduction) | Mybatis Plus模块，基于mybatis-plus-spring |
| [redis](/v1/framework/redis/introduction)             |     Redis模块，基于spring-data-redis      |
| [spring](/v1/framework/spring/introduction)           |      Spring模块，基于spring-context       |
| [web](/v1/framework/web/introduction)                 |        Web模块，基于spring-webmvc         |

## 引入

### 全部引入
不推荐这种方式，如果你想图省事当我没说
```xml-vue
<parent>
    <groupId>io.github.pangju666.framework</groupId>
    <artifactId>framework-all</artifactId>
    <version>{{ frameworkVersion }}</version>
    <relativePath/>
</parent>
```

### 按需引入
通过导入`bom`来实现按需导入自己需要的模块：
```xml-vue
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.github.pangju666.framework</groupId>
            <artifactId>framework-bom</artifactId>
            <version>{{ frameworkVersion }}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>io.github.pangju666.framework</groupId>
        <artifactId>framework-spring</artifactId>
    </dependency>
</dependencies>
```
