---
layout: doc
---

<script setup>
const frameworkBootVersion = import.meta.env.VITE_FRAMEWORK_SPRING_BOOT_STARTER_VERSION;
const springBootVersion = import.meta.env.VITE_SPRING_BOOT_VERSION;
const dependenciesVersion = import.meta.env.VITE_DEPENDENCIES_VERSION;
</script>

# 简介

基于`Pangju Framework`开发的`Spring Boot`自动装配，主要包含并发、加密、`MongoDB`、`Redis`、`Mybatis Plus`、`jackson`、图像、
`Web`和测试几个方面

## 使用要求

\>= JDK 17

## Pangju Dependencies 版本

{{ dependenciesVersion }}

## Spring Boot 版本

{{ springBootVersion }}

## 模块列表

我仿照`Spring Boot Starter`的命名方式对各个模块进行了命名，以此来方便上手。

| 模块                                              |                        介绍                        |
|-------------------------------------------------|:------------------------------------------------:|
| framework-spring-boot-starter-parent            |       父级模块，对标`spring-boot-starter-parent`        |
| framework-spring-boot-starter                   |           `Spring`模块，包含静态上下文和一次性任务执行器            |
| framework-spring-boot-starter-crypto            |              加密模块，包含几种加密算法工厂和加密工具类               |
| framework-spring-boot-starter-json              |              JSON模块，包含了几种序列化/反序列化器               |
| framework-spring-boot-starter-image             | 图像模块，实现了`BufferedImage`和`GraphicsMagick`两种图像处理实现 |
| framework-spring-boot-starter-validation        |                       校验模块                       |
| framework-spring-boot-starter-data-mybatis-plus |       `Mybatis Plus`模块，包含了插件自动装配和逻辑删除填充实现        |
| framework-spring-boot-starter-data-mongodb      |                    MongoDB模块                     |
| framework-spring-boot-starter-data-redis        |                     Redis 模块                     |
| framework-spring-boot-starter-test              |                       测试模块                       |
| framework-spring-boot-starter-spock-test        |                   Spock框架测试模块                    |
| framework-spring-boot-starter-web               |                      Web 模块                      |
| framework-spring-boot-starter-web-crypto        |                     Web 加密模块                     |
| framework-spring-boot-starter-web-validation    |                     Web 校验模块                     |
| framework-spring-boot-starter-web-log           |                     Web 日志模块                     |

## 引入
基于[Pangju Dependencies](/dependencies/getting-started)，可以像`Spring Boot Starter Parent`一样引入：

```xml-vue
<parent>
	<groupId>io.github.pangju666.framework.boot</groupId>
	<artifactId>framework-spring-boot-starter-parent</artifactId>
	<version>{{ frameworkBootVersion }}</version>
</parent>
```

## 插件管理
我在`framework-spring-boot-starter-parent`中做了一些默认的插件配置

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

如果不使用spock框架编写测试的话，一般用不到这个

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

### Smart Doc 插件
我增加了配置文件路径，具体的插件说明请参考：[传送门](/dependencies/plugin-management#smart-doc-接口文档插件)

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
