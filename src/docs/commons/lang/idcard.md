---
layout: doc
---

# 身份证
`io.github.pangju666.commons.lang.utils.IdCardUtils`

此工具类只能校验格式有效性，无法校验其真实性

## 校验有效性
```java
String idCard = "210102198801164317";
IdCardUtils.validate(idCard); // true

String idCard2 = "2101317";
IdCardUtils.validate(idCard2); // false
```

## 解析性别
```java
String idCard = "210102198801164317";
IdCardUtils.parseSex(idCard); // 男

String idCard2 = "210102198301112246";
IdCardUtils.parseSex(idCard2); // 女
```

## 解析出生日期
```java
String idCard = "210102198801164317";
LocalDate birthDate = IdCardUtils.parseBirthDate(idCard); // 1988-01-16
```
