---
layout: doc
---

# 金额

## 说明

| 类名         | 类型  |        用途        |
|------------|:----|:----------------:|
| MoneyUtils | 工具类 | 提供金额格式化和中文大写转换功能 |

## 工具类
`io.github.pangju666.commons.lang.utils.MoneyUtils`

创意来自`ruoyi`

### 格式化
```java
MoneyUtils.format(null); // ""
MoneyUtils.format(100235.23d); // 100,235.23
MoneyUtils.format(BigDecimal.valueOf(100235.23d)); // 100,235.23
```

### 转换为中文大写
```java
MoneyUtils.convertToChinese(null); // ""
MoneyUtils.convertToChinese(100235.23d); // 壹拾万贰佰叁拾伍元贰角叁分
MoneyUtils.convertToChinese(BigDecimal.valueOf(100235.23d)); // 壹拾万贰佰叁拾伍元贰角叁分
```
