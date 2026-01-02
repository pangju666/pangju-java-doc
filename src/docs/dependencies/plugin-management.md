---
layout: doc
---

# 插件管理

## [编译插件](https://maven.apache.org/plugins/maven-compiler-plugin/usage.html)

### 默认配置
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <parameters>true</parameters>
    </configuration>
</plugin>
```

### 参考用法
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
</plugin>
```

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

## [Groovy 脚本解释插件](https://github.com/groovy/GMavenPlus/wiki/Usage)

用于在 Maven 项目中支持 Groovy 语言。它允许你在 Java 项目中编写和编译 Groovy 源代码，并提供了与 Maven 生命周期的无缝集成。这个插件非常适合那些希望在现有 Java 项目中引入 Groovy 脚本或类的开发者，或者完全使用 Groovy 编写项目的开发者。

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
    <!-- 编译时跳过测试（看情况加吧，如果只是自己做测试的话可以加上，避免编译失败）-->
    <configuration>
        <skipTests>true</skipTests>
    </configuration>
</plugin>
```
评价：我主要用来跑spock测试

## [GPG 签名插件](https://maven.apache.org/plugins/maven-gpg-plugin/usage.html)

主要是用来在打包时生成签名摘要防止篡改的。

### 默认配置
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

### 参考用法
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-gpg-plugin</artifactId>
    <!--<configuration>
        <skip>true</skip>
    </configuration>-->
</plugin>
```
