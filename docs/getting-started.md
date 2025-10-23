---
layout: doc
---

# 快速开始
基于spring-boot-starter-parent，包含了常用的各种库的依赖管理和插件管理

## Spring Boot 版本
__SPRING_BOOT_VERSION__

## 如何使用

### parent引入
```xml
<parent>
    <groupId>io.github.pangju666</groupId>
    <artifactId>pangju-dependencies</artifactId>
    <version>__DEPENDENCIES_VERSION__</version>
    <relativePath/>
</parent>
```

### import引入（建议在非Spring Boot项目使用这种方式导入）
```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.github.pangju666</groupId>
            <artifactId>pangju-dependencies</artifactId>
            <version>__DEPENDENCIES_VERSION__</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
