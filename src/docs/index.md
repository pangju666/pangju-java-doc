---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Pangju Java
  text: 简化 Java 业务逻辑开发
  tagline: 简化项目业务逻辑开发，避免造一些重复的轮子，统一项目开发规范，写的一般，多多包涵
  image:
    src: /logo.jpg
  actions:
    - theme: brand
      text: 依赖管理（基于 Spring Boot）
      link: /dependencies/getting-started
    - theme: brand
      text: 工具库
      link: /commons/getting-started
    - theme: brand
      text: 框架（基于 Spring Framework 和 Mybatis Plus）
      link: /framework/getting-started   
    - theme: brand
      text: Spring Boot Starter（基于 Spring Boot Starter 生态）
      link: /starter/getting-started
        
features:
  - icon: 🛠️
    title: 依赖管理
    details: 基于spring-boot-dependencies，包含了常用的各种库的依赖管理和插件管理
  - icon: 🛠️
    title: 工具库
    details: 基于Apache Commons、jasypt、twelvemonkeys、poi-tl等工具库，包含了基础、文件压缩、加解密、地理信息、图像、IO、PDF、OFFICE、Jakarta参数校验用途的工具类
  - icon: 🛠️
    title: 框架
    details: 基于Spring Framework和Mybatis Plus，提供了例如：MongoDB CRUD辅助、Redis CRUD辅助、Mybatis Plus CRUD辅助、业务异常体系、第三方接口请求辅助、基础Web过滤器、基础Web拦截器、Web工具类等内容
  - icon: 🛠️
    title: Starter
    details: 基于Spring Boot Starter 和 Pangju Framework，提供了例如：动态Redis数据源、动态MongoDB数据源、Mybatis Plus插件管理、测试、Json字段脱敏、Json字段加解密、接口参数加解密、接口签名、接口限流、接口日志、接口响应包装、全局异常处理等内容
---
