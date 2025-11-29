---
layout: doc
---

<script setup>
const commonsVersion = import.meta.env.VITE_COMMONS_VERSION;
</script>

# 加密

## 概述
crypto 模块是基于`jasypt`开发的，提供了一系列功能，例如：
- 字节数组RSA加解密
- 字符串RSA加解密
- BigDecimalRSA加解密
- BigIntegerRSA加解密
- 字节数组RSA签名\验证
- 字符串RSA签名\验证
- RSA密钥对工具类
- RSA密钥数据结构
- 加解密相关常量
- RSA加密方案接口及其实现

## 安装
```xml-vue
<dependency>
    <dependency>
        <groupId>io.github.pangju666.commons</groupId>
        <artifactId>commons-crypto</artifactId>
        <version>{{ commonsVersion }}</version>
    </dependency>
</dependency>
```


