---
layout: doc
---

<script setup>
const commonsVersion = import.meta.env.VITE_COMMONS_VERSION;
</script>

# 校验模块

## 概述
validation 模块是基于`jakarta validation`开发的，提供了一系列的jakarta校验注解，例如：
- 银行卡
- BASE64
- 中文姓名
- 枚举变量
- 文件名
- 颜色十六进制表示
- HTTP方法
- 身份证
- 标识符
- IP地址
- MD5
- Mime Type
- 数字
- 手机号码
- 请求路径
- Xss
- NanoId
- NanoId集合
- ObjectId
- ObjectId集合
- UUID集合
- 字符串集合正则表达式验证
- 字符串集合非空白验证

## 安装
```xml-vue
<dependency>
    <dependency>
        <groupId>io.github.pangju666.commons</groupId>
        <artifactId>commons-validation</artifactId>
        <version>{{ commonsVersion }}</version>
    </dependency>
</dependency>
```


