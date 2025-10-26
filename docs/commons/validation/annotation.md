---
layout: doc
---

# 注解

## 银行卡
`io.github.pangju666.commons.validation.annotation.BankCard`

验证方式：正则表达式 `^[1-9]\d{9,29}$`

示例值：
- 6222021001116666

```java
@BankCard(notBlank = true)
// 如果值为null、"", " "则校验不通过

@BankCard(notEmpty = true)
// 如果值为null、""则校验不通过
```

## BASE64
`io.github.pangju666.commons.validation.annotation.BASE64`

验证方式：`org.apache.commons.codec.binary.Base64.isBase64(String)`

示例值：
- ewogICAgImxpc3QiOiBbCiAgICAgICAgIk1UZzVPVEU1TXpnNU16ST0iCiAgICBdLAogICAgIm1hcCI6IHsKICAgICAgICAiMTIzIjogIk1UZzVPVEU1TXpnNU16ST0iCiAgICB9Cn0=

```java
@BASE64(notBlank = true)
// 如果值为null、"", " "则校验不通过

@BASE64(notEmpty = true)
// 如果值为null、""则校验不通过
```

## 中文姓名
`io.github.pangju666.commons.validation.annotation.ChineseName`

验证方式：正则表达式 `^[\u4e00-\u9fa5]{2,30}$`

示例值：
- 孟伟
- 连逍遥
- 玛合萨提别克·哈斯木别克

```java
@ChineseName(notBlank = true)
// 如果值为null、"", " "则校验不通过

@ChineseName(notEmpty = true)
// 如果值为null、""则校验不通过
```

## 枚举变量
`io.github.pangju666.commons.validation.annotation.EnumName`

验证方式：`org.apache.commons.lang3.EnumUtils.isValidEnum(Class<?>, String)`

```java
@EnumName(enumClass = enumClass.class)
// 根据枚举类和传入的枚举变量名称忽略大小判断是否为枚举变量

@EnumName(enumClass = enumClass.class, ignoreCase = false)
// 根据枚举类和传入的枚举变量名称不忽略大小写判断是否为枚举变量
```

## 文件名
`io.github.pangju666.commons.validation.annotation.Filename`

验证方式：正则表达式 `^[^\\<>:"/|?*.]+(\.[^\\<>:"/|?*]+)?$`或`^[^\\<>:"/|?*.]+$`

示例值：
- test.txt
- test（不允许包含文件拓展名）

```java
@Filename

@Filename(extension = false)
// 根据传入的文件名（不允许包含文件拓展名）称判断
```

## 颜色十六进制表示
`io.github.pangju666.commons.validation.annotation.HexColor`

验证方式：正则表达式 `^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{8}|[a-fA-F0-9]{4})$`

示例值：
- #RGB
- #RRGGBB
- #RRGGBBAA

```java
@HexColor(notBlank = true)
// 如果值为null、"", " "则校验不通过

@HexColor(notEmpty = true)
// 如果值为null、""则校验不通过
```

## HTTP方法
`io.github.pangju666.commons.validation.annotation.HttpMethod`

验证方式：判断值是否存在于集合`Set.of("GET", "POST", "PUT", "PATCH", "HEAD", "DELETE", "OPTIONS")`

示例值：
- GET
- POST
- PUT
- DELETE

```java
@HttpMethod
```

## 身份证
`io.github.pangju666.commons.validation.annotation.IdCard`

验证方式：`io.github.pangju666.commons.lang.utils.IdCardUtils.validate(String)`

示例值：
- 11010519900307233X
- 44030820000229032X
- 12345678901234567

```java
@IdCard(notBlank = true)
// 如果值为null、"", " "则校验不通过

@IdCard(notEmpty = true)
// 如果值为null、""则校验不通过
```

## 标识符
`io.github.pangju666.commons.validation.annotation.Identifier`

验证方式：正则表达式 `^[a-zA-Z_][a-zA-Z0-9_]*$`

示例值：
- a
- _
- _a
- a_asdsad
- a123

```java
@Identifier(notBlank = true)
// 如果值为null、"", " "则校验不通过

@Identifier(notEmpty = true)
// 如果值为null、""则校验不通过
```

## IP地址
`io.github.pangju666.commons.validation.annotation.IP`

验证方式：正则表达式 `^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$`或`^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(([0-9a-fA-F]{1,4}:){1,7}:)|(([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})|(([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2})|(([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3})|(([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4})|(([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5})|([0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6}))|(:((:[0-9a-fA-F]{1,4}){1,7}|:)))$`

示例值：
- 192.168.1.1
- AD80::ABAA:0000:00C2:0002

```java
@IP(notBlank = true)
// 如果值为null、"", " "则校验不通过

@IP(notEmpty = true)
// 如果值为null、""则校验不通过

@IP(ipv6 = true)
// 允许ipv6地址通过校验
```

## MD5
`io.github.pangju666.commons.validation.annotation.Md5`

验证方式：正则表达式 `^[a-fA-F0-9]{32}$`

示例值：
- B10A8DB164E0754105B7A99BE72E3FE5

```java
@Md5(notBlank = true)
// 如果值为null、"", " "则校验不通过

@Md5(notEmpty = true)
// 如果值为null、""则校验不通过
```

## Mime Type
`io.github.pangju666.commons.validation.annotation.MimeType`

验证方式：正则表达式 `^.+/.+$`

示例值：
- text/plain
- image/png
- application/json

```java
@MimeType(notBlank = true)
// 如果值为null、"", " "则校验不通过

@MimeType(notEmpty = true)
// 如果值为null、""则校验不通过
```

## 非空字符串集合
`io.github.pangju666.commons.validation.annotation.NotBlankElements`

验证方式：`org.apache.commons.lang3.StringUtils.isNotBlank(String)`

示例值：
- ["test", "asdad", "", " ", null]

```java
@NotBlankElements(allMatch = true)
// 集合内所有元素都必须不为null、""、" "

@NotBlankElements(allMatch = false)
// 集合内任一元素不为null、""、" "即可

@NotBlankElements(notEmpty = true)
// 如果集合为空或为null，则允许通过校验
```

## 数字字符串
`io.github.pangju666.commons.validation.annotation.Number`

验证方式：正则表达式 `^-?\d+$`、`^\d+$`、`^(-?[1-9]\d*\.\d+|-?0\.\d*[1-9])$`或`^([1-9]\d*\.\d+|0\.\d*[1-9])$`

示例值：
- "10"
- "-10"
- "-10.00"

```java
@Number(positive = true)
// 值必须为正数才能通过校验

@Number(decimal = true)
// 允许带小数的值通过校验
```

## 手机号码
`io.github.pangju666.commons.validation.annotation.PhoneNumber`

验证方式：正则表达式 `^1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$`、`^1\d{10}$`或`^(?:(?:\d{3}-)?\d{8}|(?:\d{4}-)?\d{7,8})(?:-\d+)?$`

示例值：
- 11010519900307233X
- 44030820000229032X
- 12345678901234567

```java
@PhoneNumber(type = PhoneNumberType.MIX)
// 允许手机号码或座机号码通过校验

@PhoneNumber(type = PhoneNumberType.TEL)
// 只允许座机号码通过校验

@PhoneNumber(type = PhoneNumberType.MOBILE)
// 只允许手机号码通过校验

@PhoneNumber(strong = true)
// 校验运营商号段

@PhoneNumber(notBlank = true)
// 如果值为null、"", " "则校验不通过

@PhoneNumber(notEmpty = true)
// 如果值为null、""则校验不通过
```

## 正则表达式校验
`io.github.pangju666.commons.validation.annotation.Regex`

验证方式：通过自定义的正则表达式来校验

```java
@Regex(regexp = "\d+")

@Regex(regexp = "\d+", flags = {RegExFlag.UNIX_LINES, RegExFlag.CASE_INSENSITIVE})
// 配置正则表达式匹配标志位

@Regex(matchStart = "\d+", matchStart = true)
// 给正则表达式增加起始匹配符：^\d+

@Regex(matchEnd = "\d+", matchEnd = true)
// 给正则表达式增加结束匹配符：\d+$

@Regex(notBlank = true)
// 如果值为null、"", " "则校验不通过

@Regex(notEmpty = true)
// 如果值为null、""则校验不通过
```

## 正则表达式校验字符串集合
`io.github.pangju666.commons.validation.annotation.RegexElements`

验证方式：通过自定义的正则表达式来校验

```java
@RegexElements(regexp = "\d+")

@RegexElements(regexp = "\d+", flags = {RegExFlag.UNIX_LINES, RegExFlag.CASE_INSENSITIVE})
// 配置正则表达式匹配标志位

@RegexElements(matchStart = "\d+", matchStart = true)
// 给正则表达式增加起始匹配符：^\d+

@RegexElements(matchEnd = "\d+", matchEnd = true)
// 给正则表达式增加结束匹配符：\d+$

@RegexElements(regexp = "\d+", allMatch = true)
// 集合内所有元素都必须符合正则表达式

@RegexElements(regexp = "\d+", allMatch = false)
// 集合内任一元素符合正则表达式即可

@RegexElements(regexp = "\d+", notEmpty = true)
// 如果集合为空或为null，则允许通过校验
```

## 请求路径
`io.github.pangju666.commons.validation.annotation.RequestPath`

验证方式：正则表达式 `^/[\w/-]+$`

示例值：
- /test/api/v1

```java
@RequestPath
```

## Xss防护校验
`io.github.pangju666.commons.validation.annotation.Xss`

验证方式：`org.jsoup.Jsoup.parse(String)`

```java
@Xss
```
