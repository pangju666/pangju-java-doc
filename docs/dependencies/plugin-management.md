---
layout: doc
---

# 插件管理

## [接口文档](https://smart-doc-group.github.io/zh/guide/getting-started)
`smart-doc` 是一个用于生成 API 文档的工具，特别适合与 Java 项目集成，尤其是基于 Spring Boot 的应用。它能够自动生成 RESTful API 文档，并支持多种输出格式（如 Markdown、HTML 和 Postman Collection）。`smart-doc` 的主要优势在于其简洁性、灵活性和对代码注释的高度依赖，通过解析代码中的注释来生成文档，减少了手动编写文档的工作量。
```xml
<plugin>
    <groupId>com.ly.smart-doc</groupId>
    <artifactId>smart-doc-maven-plugin</artifactId>
</plugin>
```

配置文件（`resources/smart-doc.json`）示例
```json
{
  "outPath": "target/smart-doc",
  "packageFilters": "xxxx.web.controller.*",
  "projectName": "xxxx",
  "appToken": "823b0f9dfabc4ab9bd2731dddd32354e",
  "openUrl": "http://127.0.0.1/swagger/api",
  "replace": true,
  "tornaDebug": true,
  "framework": "spring",    
  "showValidation": true,  
  "debugEnvName": "本地环境", 
  "debugEnvUrl": "http://127.0.0.1/api"
}
```
评价：javadoc驱动的文档，比swagger那种注解式好用，也支持open-api

## [Groovy](https://github.com/groovy/GMavenPlus/wiki/Usage)
`gmavenplus-plugin` 是一个 Maven 插件，用于在 Maven 项目中支持 Groovy 语言。它允许你在 Java 项目中编写和编译 Groovy 源代码，并提供了与 Maven 生命周期的无缝集成。这个插件非常适合那些希望在现有 Java 项目中引入 Groovy 脚本或类的开发者，或者完全使用 Groovy 编写项目的开发者。
```xml
<plugin>
    <groupId>org.codehaus.gmavenplus</groupId>
    <artifactId>gmavenplus-plugin</artifactId>
</plugin>
```
评价：我主要用来跑spock测试
