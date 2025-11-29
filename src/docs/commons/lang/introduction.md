---
layout: doc
---

<script setup>
const commonsVersion = import.meta.env.VITE_COMMONS_VERSION;
</script>

# 基础

## 概述
lang 模块是整个工具库的基础模块，提供了一系列的基础工具，例如：
- 拼音字符比较器
- 数据单位
- gson序列化/反序列化
- 高并发id生成器
- 树节点接口
- 常量池/正则表达式常量池
- 随机数组/列表
- JSON、数组、日期、脱敏、身份证、正则表达式、树、字符串、序列化、Id、金钱等常用工具类

## 安装
```xml-vue
<dependency>
    <dependency>
        <groupId>io.github.pangju666.commons</groupId>
        <artifactId>commons-lang</artifactId>
        <version>{{ commonsVersion }}</version>
    </dependency>
</dependency>
```


