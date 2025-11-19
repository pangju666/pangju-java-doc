---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Pangju Java
  text: Java 项目开发辅助工具
  tagline: 简化项目开发，统一开发规范，写的一般，多多包涵
  image:
    src: /logo.jpg
  actions:
    - theme: brand
      text: 快速开始
      link: /starter/getting-started#引入

features:
  - title: 依赖管理
    details: 基于spring-boot-starter-parent，包含了常用的各种库的依赖管理和插件管理
  - title: 工具库
    details: 基于Apache Commons、jasypt、twelvemonkeys、poi-tl等工具库，包含了基础、文件压缩、加解密、地理信息、图像、IO、PDF、OFFICE、Jakarta参数校验用途的工具类
  - title: 框架
    details: 基于Spring Framework和Mybatis Plus，提供了例如：MongoDB CRUD辅助、Redis CRUD辅助、Mybatis Plus CRUD辅助、业务异常体系、第三方接口请求辅助、基础Web过滤器、基础Web拦截器、Web工具类等内容
  - title: Spring Boot Starter
    details: 基于Spring Boot Starter 和 Pangju Framework，提供了例如：动态Redis数据源、动态MongoDB数据源、Mybatis Plus插件管理、测试、Json字段脱敏、Json字段加解密、接口参数加解密、接口签名、接口限流、接口幂等性、接口日志、接口响应包装、全局异常处理等内容

---
