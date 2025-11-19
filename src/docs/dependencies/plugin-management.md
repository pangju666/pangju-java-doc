---
layout: doc
---

# 插件管理

## [Javadoc 生成插件](https://maven.apache.org/plugins/maven-javadoc-plugin/usage.html)

### 默认配置
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

### 参考用法
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-javadoc-plugin</artifactId>
</plugin>
```

## [Java 源码生成插件](https://maven.apache.org/plugins/maven-source-plugin/usage.html)

### 默认配置
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

### 参考用法
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-source-plugin</artifactId>
</plugin>
```

## [Smart Doc 接口文档插件](https://smart-doc-group.github.io/zh/guide/getting-started)
`smart-doc` 是一个用于生成 API 文档的工具，特别适合与 Java 项目集成，尤其是基于 Spring Boot 的应用。它能够自动生成 RESTful API 文档，并支持多种输出格式（如 Markdown、HTML 和 Postman Collection）。`smart-doc` 的主要优势在于其简洁性、灵活性和对代码注释的高度依赖，通过解析代码中的注释来生成文档，减少了手动编写文档的工作量。

### 默认配置
```xml
<plugin>
    <groupId>com.ly.smart-doc</groupId>
    <artifactId>smart-doc-maven-plugin</artifactId>
    <version>${smart-doc-maven.plugin.version}</version>
</plugin>
```

### 参考用法
```xml
<plugin>
    <groupId>com.ly.smart-doc</groupId>
    <artifactId>smart-doc-maven-plugin</artifactId>
    <configuration>
        <configFile>${basedir}/src/main/resources/smart-doc.json</configFile>
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

配置文件（`src/main/resources/smart-doc.json`）示例
```json
{
  "outPath": "target/smart-doc", 
  "packageFilters": "xxxx.web.controller.*",
  "projectName": "xxxx",
  "replace": true,
  "framework": "spring",    
  "showValidation": true,  
  "debugEnvName": "本地环境", 
  "debugEnvUrl": "http://127.0.0.1/api"
}
```
评价：javadoc驱动的文档，比swagger那种注解式好用，也支持open-api

## [Groovy 脚本解释插件](https://github.com/groovy/GMavenPlus/wiki/Usage)
`gmavenplus-plugin` 是一个 Maven 插件，用于在 Maven 项目中支持 Groovy 语言。它允许你在 Java 项目中编写和编译 Groovy 源代码，并提供了与 Maven 生命周期的无缝集成。这个插件非常适合那些希望在现有 Java 项目中引入 Groovy 脚本或类的开发者，或者完全使用 Groovy 编写项目的开发者。

### 默认配置
```xml
<plugin>
    <groupId>org.codehaus.gmavenplus</groupId>
    <artifactId>gmavenplus-plugin</artifactId>
    <version>${gmavenplus.plugin.version}</version>
</plugin>
```

### 参考用法
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
评价：我主要用来跑spock测试

## [GPG 签名插件](https://maven.apache.org/plugins/maven-gpg-plugin/usage.html)
`maven-gpg-plugin` 是一个 Maven 插件，主要是用来在打包时生成签名摘要防止篡改的。

### 默认配置
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-gpg-plugin</artifactId>
    <version>${gpg.plugin.version}</version>
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

### 参考用法
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-gpg-plugin</artifactId>
</plugin>
```
