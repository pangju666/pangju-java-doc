---
layout: doc
---

<script setup>
const springBootVersion = import.meta.env.VITE_SPRING_BOOT_VERSION;
const dependenciesVersion = import.meta.env.VITE_DEPENDENCIES_VERSION;
</script>

# 简介
基于spring-boot-starter-parent，包含了常用的各种库的依赖管理和插件管理

## Spring Boot 版本

{{ springBootVersion }}

## 如何使用

### parent引入
```xml-vue
<parent>
    <groupId>io.github.pangju666</groupId>
    <artifactId>pangju-dependencies</artifactId>
    <version>{{ dependenciesVersion }}</version>
    <relativePath/>
</parent>
```

### import引入
建议在非Spring Boot项目使用这种方式导入
```xml-vue
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.github.pangju666</groupId>
            <artifactId>pangju-dependencies</artifactId>
            <version>{{ dependenciesVersion }}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
