---
layout: doc
---

# 测试

## Junit

### 概述
这个模块我集成了`spring-boot-starter-test`、`json-path-assert`和`javafaker`。

### 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
</dependency>

<dependency>
    <groupId>com.jayway.jsonpath</groupId>
    <artifactId>json-path-assert</artifactId>
</dependency>
<dependency>
    <groupId>org.skyscreamer</groupId>
    <artifactId>jsonassert</artifactId>
</dependency>
<dependency>
    <groupId>com.github.javafaker</groupId>
    <artifactId>javafaker</artifactId>
</dependency>
```

### 引入
```xml
<dependency>
    <dependency>
        <groupId>io.github.pangju666.framework.boot</groupId>
		<artifactId>framework-spring-boot-starter-test</artifactId>
    </dependency>
</dependency>
```

## Spock
基于`groovy`的一个测试框架，我现在写测试用的都是这个。

### 概述
这个模块我集成了`framework-spring-boot-starter-test`、`spock-spring`和`rest-assured`。

### 依赖

```xml
<dependency>
    <groupId>io.github.pangju666.framework.boot</groupId>
    <artifactId>framework-spring-boot-starter-test</artifactId>
    <scope>compile</scope>
</dependency>

<dependency>
    <groupId>org.spockframework</groupId>
    <artifactId>spock-spring</artifactId>
</dependency>
<dependency>
    <groupId>io.rest-assured</groupId>
    <artifactId>rest-assured</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.codehaus.groovy</groupId>
            <artifactId>groovy</artifactId>
        </exclusion>
        <exclusion>
            <groupId>org.codehaus.groovy</groupId>
            <artifactId>groovy-json</artifactId>
        </exclusion>
        <exclusion>
            <groupId>org.codehaus.groovy</groupId>
            <artifactId>groovy-xml</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

### 引入
```xml
<dependency>
    <dependency>
        <groupId>io.github.pangju666.framework.boot</groupId>
		<artifactId>framework-spring-boot-starter-spock-test</artifactId>
    </dependency>
</dependency>

<!-- 需要配置这两项才能正常使用spock测试 -->
<build>
    <!-- 配置测试源代码目录 -->
    <testSourceDirectory>src/test/groovy</testSourceDirectory>
    <plugins>
        <!-- 配置 Groovy 解释插件 -->
        <plugin>
            <groupId>org.codehaus.gmavenplus</groupId>
            <artifactId>gmavenplus-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```
