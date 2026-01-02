---
layout: doc
---

<script setup>
const frameworkBootVersion = import.meta.env.VITE_FRAMEWORK_SPRING_BOOT_STARTER_VERSION;
const springBootVersion = import.meta.env.VITE_SPRING_BOOT_VERSION;
const frameworkVersion = import.meta.env.VITE_FRAMEWORK_VERSION;
</script>

# 简介

基于`Pangju Framework`开发的`Spring Boot`自动装配，主要包含并发、加密、`MongoDB`、`Redis`、`Mybatis Plus`、`jackson`、图像、
`Web`和测试几个方面

## 使用要求

\>= JDK 17

## Pangju Framework 版本

{{ frameworkVersion }}

## Spring Boot 版本

{{ springBootVersion }}

## 模块列表

我仿照`Spring Boot Starter`的命名方式对各个模块进行了命名，以此来方便上手。

| 模块                                  |                 介绍                  |
|-------------------------------------|:-----------------------------------:|
| framework-starter-parent            | 父级模块，对标`spring-boot-starter-parent` |
| framework-starter                   |             `Spring`模块              |
| framework-starter-crypto            |                加密模块                 |
| framework-starter-json              |               JSON模块                |
| framework-starter-json-crypto       |              JSON加密模块               |
| framework-starter-image             |                图像模块                 |
| framework-starter-validation        |                校验模块                 |
| framework-starter-data-mybatis-plus |          `Mybatis Plus`模块           |
| framework-starter-data-mongodb      |              MongoDB模块              |
| framework-starter-data-redis        |              Redis 模块               |
| framework-starter-test              |                测试模块                 |
| framework-starter-test-spock        |             Spock框架测试模块             |
| framework-starter-web               |               Web 模块                |
| framework-starter-web-crypto        |              Web 加密模块               |
| framework-starter-web-validation    |              Web 校验模块               |
| framework-starter-web-log           |              Web 日志模块               |

## 引入
基于`Spring Boot Starter Parent`，可以像`Spring Boot Starter Parent`一样引入：

```xml-vue
<parent>
	<groupId>io.github.pangju666.framework.boot</groupId>
	<artifactId>framework-starter-parent</artifactId>
	<version>{{ frameworkBootVersion }}</version>
</parent>
```

## 插件管理
我在`framework-starter-parent`中做了一些默认的插件配置

### 编译插件
我在`Spring Boot Starter Parent`的`maven-compiler-plugin`默认配置上增加一些注解处理器

#### 默认配置
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <parameters>true</parameters>
        <annotationProcessorPaths>
            <!-- mapstruct 注解处理器 -->
            <path>
                <groupId>org.mapstruct</groupId>
                <artifactId>mapstruct-processor</artifactId>
                <version>${mapstruct.version}</version>
            </path>
            <!-- lombok 注解处理器 -->
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
            </path>
            <!-- lombok 和 mapstruct 绑定处理器，主要用于解决两者冲突问题  -->
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok-mapstruct-binding</artifactId>
                <version>${lombok-mapstruct-binding.version}</version>
            </path>
            <!-- spring boot 配置文件注解处理器 -->
            <path>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-configuration-processor</artifactId>
                <version>${spring-boot.version}</version>
            </path>
            <!-- spring boot 自动装配注解处理器 -->
            <path>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-autoconfigure-processor</artifactId>
                <version>${spring-boot.version}</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

#### 用法示例
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
</plugin>
```

### Javadoc 插件

#### 默认配置
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-javadoc-plugin</artifactId>
    <configuration>
        <doclint>none</doclint>
    </configuration>
    <executions>
        <execution>
            <id>attach-javadocs</id>
            <goals>
                <goal>jar</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

#### 用法示例
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-javadoc-plugin</artifactId>
</plugin>
```

### 源码插件

#### 默认配置
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-source-plugin</artifactId>
    <executions>
        <execution>
            <id>attach-sources</id>
            <goals>
                <goal>jar-no-fork</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

#### 用法示例
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-source-plugin</artifactId>
</plugin>
```

### Spring Boot 插件
我排除了打包时对`lombok`的依赖

#### 默认配置
```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
        <excludes>
            <exclude>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
            </exclude>
        </excludes>
    </configuration>
</plugin>
```

#### 用法示例
```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
</plugin>
```

### Groovy 脚本编译插件
我增加了编译测试的配置和跳过编译测试

如果不使用`Spock`框架编写测试的话，一般用不到这个

#### 默认配置
```xml
<plugin>
    <groupId>org.codehaus.gmavenplus</groupId>
    <artifactId>gmavenplus-plugin</artifactId>
    <executions>
        <execution>
            <goals>
                <goal>compileTests</goal>
            </goals>
        </execution>
    </executions>
    <!-- 编译时跳过测试（看情况加吧，如果只是自己做测试的话可以加上，避免编译失败）-->
    <configuration>
        <skipTests>true</skipTests>
    </configuration>
</plugin>
```

#### 用法示例
```xml
<build>
    <!-- 指定 groovy 测试脚本源码位置 -->
    <testSourceDirectory>src/test/groovy</testSourceDirectory>
    <plugins>
        <plugin>
            <groupId>org.codehaus.gmavenplus</groupId>
            <artifactId>gmavenplus-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

### [Smart Doc 接口文档插件](https://smart-doc-group.github.io/zh/guide/getting-started)
`Smart Doc` 是一个用于生成 API 文档的工具，特别适合与 Java 项目集成，尤其是基于 Spring Boot 的应用。它能够自动生成 RESTful API 文档，并支持多种输出格式（如 Markdown、HTML 和 Postman Collection）。`smart-doc` 的主要优势在于其简洁性、灵活性和对代码注释的高度依赖，通过解析代码中的注释来生成文档，减少了手动编写文档的工作量。

#### 默认配置
```xml
<plugin>
    <groupId>com.ly.smart-doc</groupId>
    <artifactId>smart-doc-maven-plugin</artifactId>
    <configuration>
        <configFile>${basedir}/src/main/resources/smart-doc.json</configFile>
    </configuration>
</plugin>
```

#### 用法示例
```xml
<plugin>
    <groupId>com.ly.smart-doc</groupId>
    <artifactId>smart-doc-maven-plugin</artifactId>
    <configuration>
        <includes>
            <!-- 使用了mybatis-plus的Page分页需要include所使用的源码包 -->
            <!--<include>com.baomidou:mybatis-plus-extension</include>-->
            <!-- 使用了mybatis-plus的IPage分页需要include mybatis-plus-core-->
            <!--<include>com.baomidou:mybatis-plus-core</include>-->
            <!-- 使用了jpa的分页需要include所使用的源码包 -->
            <!--<include>org.springframework.data:spring-data-commons</include>-->
        </includes>
    </configuration>
</plugin>
```

### GPG 插件
主要是用来在打包时生成签名摘要防止篡改的。

#### 默认配置
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-gpg-plugin</artifactId>
    <executions>
        <execution>
            <id>sign-artifacts</id>
            <phase>verify</phase>
            <goals>
                <goal>sign</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

#### 用法示例
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-gpg-plugin</artifactId>
    <!--<configuration>
        <skip>true</skip>
    </configuration>-->
</plugin>
```
