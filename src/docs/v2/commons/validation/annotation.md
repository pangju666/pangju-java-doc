---
layout: doc
---

# 注解

> [!NOTE]
> 我没加的常用校验注解，大概率是`jakarta.validation.constraints`或`org.hibernate.validator.constraints`包里已经有了。

## 银行卡
`io.github.pangju666.commons.validation.annotation.BankCard`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：正则表达式 `^[1-9]\d{9,29}$`

示例值：
- 6222021001116666

```java
@BankCard
String bankCard;
```

## BASE64
`io.github.pangju666.commons.validation.annotation.BASE64`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：`org.apache.commons.codec.binary.Base64.isBase64(String)`

示例值：
- ewogICAgImxpc3QiOiBbCiAgICAgICAgIk1UZzVPVEU1TXpnNU16ST0iCiAgICBdLAogICAgIm1hcCI6IHsKICAgICAgICAiMTIzIjogIk1UZzVPVEU1TXpnNU16ST0iCiAgICB9Cn0=

```java
@BASE64
String base64;
```

## 中文姓名
`io.github.pangju666.commons.validation.annotation.ChineseName`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：正则表达式 `^[\u4e00-\u9fa5]{2,30}$`

示例值：
- 孟伟
- 连逍遥
- 玛合萨提别克·哈斯木别克

```java
@ChineseName
String name;
```

## 枚举变量
`io.github.pangju666.commons.validation.annotation.EnumName`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：`org.apache.commons.lang3.EnumUtils.isValidEnum(Class<?>, String)`

```java
@EnumName(enumClass = Type.class)
String type;
```

## 文件名
`io.github.pangju666.commons.validation.annotation.Filename`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：正则表达式 `^[^\\<>:"/|?*.]+(\.[^\\<>:"/|?*]+)?$`或`^[^\\<>:"/|?*.]+$`

示例值：
- test.txt
- test（不允许包含文件拓展名）

```java
@Filename
String filename;

@Filename(extension = false)
String filename;
// 根据传入的文件名（不允许包含文件拓展名）称判断
```

## 颜色十六进制表示
`io.github.pangju666.commons.validation.annotation.HexColor`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：正则表达式 `^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{8}|[a-fA-F0-9]{4})$`

示例值：
- #RGB
- #RRGGBB
- #RRGGBBAA

```java
@HexColor
String color;
```

## HTTP方法
`io.github.pangju666.commons.validation.annotation.HttpMethod`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：判断值是否存在于集合`Set.of("GET", "POST", "PUT", "PATCH", "HEAD", "DELETE", "OPTIONS")`

示例值：
- GET
- POST
- PUT
- DELETE

```java
@HttpMethod
String method;
```

## 身份证
`io.github.pangju666.commons.validation.annotation.IdCard`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：`io.github.pangju666.commons.lang.utils.IdCardUtils.validate(String)`

示例值：
- 11010519900307233X
- 44030820000229032X
- 12345678901234567

```java
@IdCard
String idCard;
```

## 标识符
`io.github.pangju666.commons.validation.annotation.Identifier`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：正则表达式 `^[a-zA-Z_][a-zA-Z0-9_]*$`

示例值：
- a
- _
- _a
- a_asdsad
- a123

```java
@Identifier
String username;
```

## IP地址
`io.github.pangju666.commons.validation.annotation.IP`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：正则表达式 `^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$`或`^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(([0-9a-fA-F]{1,4}:){1,7}:)|(([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})|(([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2})|(([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3})|(([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4})|(([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5})|([0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6}))|(:((:[0-9a-fA-F]{1,4}){1,7}|:)))$`

示例值：
- 192.168.1.1
- AD80::ABAA:0000:00C2:0002

```java
@IP
String clientIp;

@IP(ipv6 = true)
String clientIp;
// 允许ipv6地址通过校验
```

## MD5
`io.github.pangju666.commons.validation.annotation.Md5`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：正则表达式 `^[a-fA-F0-9]{32}$`

示例值：
- B10A8DB164E0754105B7A99BE72E3FE5

```java
@Md5
String fileMd5;
```

## Mime Type
`io.github.pangju666.commons.validation.annotation.MimeType`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：正则表达式 `^[a-z0-9!#$&.+-^_]+/[a-z0-9!#$&.+-^_]+(?:\s*;\s*[a-z0-9!#$&.+-^_]+=(?:[a-z0-9!#$&.+-^_]+|"[^"]*"))*$`

示例值：
- text/plain
- image/png
- application/json

```java
@MimeType
String fileType;
```

## 数字字符串
`io.github.pangju666.commons.validation.annotation.Number`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：正则表达式 `^-?\d+$`、`^\d+$`、`^(-?[1-9]\d*\.\d+|-?0\.\d*[1-9])$`或`^([1-9]\d*\.\d+|0\.\d*[1-9])$`

示例值：
- "10"
- "-10"
- "-10.00"

```java
@Number(positive = true)
String money;
// 值必须为正数才能通过校验

@Number(decimal = true)
String money;
// 允许带小数的值通过校验
```

## 手机号码
`io.github.pangju666.commons.validation.annotation.PhoneNumber`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：正则表达式 `^1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$`、`^1\d{10}$`或`^(?:(?:\d{3}-)?\d{8}|(?:\d{4}-)?\d{7,8})(?:-\d+)?$`

示例值：
- 11010519900307233X
- 44030820000229032X
- 12345678901234567

```java
@PhoneNumber(type = PhoneNumberType.MIX)
String phoneNumber;
// 允许手机号码或座机号码通过校验

@PhoneNumber(type = PhoneNumberType.TEL)
String phoneNumber;
// 只允许座机号码通过校验

@PhoneNumber(type = PhoneNumberType.MOBILE)
String phoneNumber;
// 只允许手机号码通过校验

@PhoneNumber(strong = true)
String phoneNumber;
// 校验运营商号段
```

## 请求路径
`io.github.pangju666.commons.validation.annotation.RequestPath`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：正则表达式 `^/[\w/-]+$`

示例值：
- /test/api/v1

```java
@RequestPath
String requestPath;
```

## Xss防护校验
`io.github.pangju666.commons.validation.annotation.Xss`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：`org.jsoup.Jsoup.parse(String)`

```java
@Xss
String content;
```

## NanoId
`io.github.pangju666.commons.validation.annotation.NanoId`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：根据长度是否满足，是否只包含了字典内的字符。

```java
@NanoId
String id;

@NanoId(size = 21) // 可以修改要校验的id长度，需要和预期id的长度一致
String id;

@NanoId(alphabet = {'_', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f',
		'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B',
		'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
		'Y', 'Z'}) // 可以修改要校验的id字典，需要和预期id的字典一致，一般不需要改
String id;
```

## NanoId集合
`io.github.pangju666.commons.validation.annotation.NanoIds`

支持的类型是`Collection<? extends CharSequence>`，`null`或空集合视为有效。

验证方式：根据长度是否满足，是否只包含了字典内的字符。

```java
@NanoIds
List<String> ids;

@NanoIds(size = 21) // 可以修改要校验的id长度，需要和预期id的长度一致
List<String> ids;

@NanoIds(alphabet = {'_', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f',
		'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B',
		'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
		'Y', 'Z'}) // 可以修改要校验的id字典，需要和预期id的字典一致，一般不需要改
Set<String> ids;

@NanoIds(allMatch = false)
Set<String> ids;
// 集合内任一元素为有效的NanoId即可
```

## ObjectId
`io.github.pangju666.commons.validation.annotation.ObjectId`

支持的类型是`CharSequence`。

`null`视为有效，空白字符串视为无效。

验证方式：`org.bson.types.ObjectId.isValid(String)`

```java
@ObjectId
String id;
```

## ObjectId集合
`io.github.pangju666.commons.validation.annotation.ObjectIds`

支持的类型是`Collection<? extends CharSequence>`，`null`或空集合视为有效。

验证方式：`org.bson.types.ObjectId.isValid(String)`

```java
@ObjectIds
List<String> ids;

@ObjectIds(allMatch = false)
Set<String> ids;
// 集合内任一元素为有效的ObjectId即可
```

## UUID集合
`io.github.pangju666.commons.validation.annotation.UUIDS`

> [!TIP]
> 如果需要校验单个`UUID`，请使用`org.hibernate.validator.constraints.UUID`。
 
支持的类型是`Collection<? extends CharSequence>`，`null`或空集合视为有效。

验证方式：根据UUID规则校验（代码来源于`org.hibernate.validator.internal.constraintvalidators.hv.UUIDValidator`）

```java
@UUIDS
List<String> ids;

@UUIDS(allMatch = false)
Set<String> ids;
// 集合内任一元素为有效的UUID即可
```

## 非空字符串集合
`io.github.pangju666.commons.validation.annotation.NotBlankElements`

> [!TIP]
> 如果需要校验单个字符串是否为非空，请使用`jakarta.validation.constraints.NotBlank`。

支持的类型是`Collection<? extends CharSequence>`，`null`或空集合视为有效。

验证方式：`org.apache.commons.lang3.StringUtils.isNotBlank(String)`

示例值：
- ["test", "asdad", "", " ", null]

```java
@NotBlankElements(allMatch = true)
List<String> usernames;
// 集合内所有元素都必须不为null、""、" "

@NotBlankElements(allMatch = false)
Set<String> usernames;
// 集合内任一元素不为null、""、" "即可
```

## 字符串集合正则表达式验证
`io.github.pangju666.commons.validation.annotation.PatternElements`

> [!TIP]
> 如果需要校验单个字符串是否匹配正则表达式，请使用`jakarta.validation.constraints.Pattern`。

支持的类型是`Collection<? extends CharSequence>`，`null`或空集合视为有效。

验证方式：通过自定义的正则表达式来校验

```java
@PatternElements(regexp = "\d+")
List<String> scores;

@PatternElements(regexp = "\d+", flags = {RegExFlag.UNIX_LINES, RegExFlag.CASE_INSENSITIVE})
Set<String> scores;
// 配置正则表达式匹配标志位

@RegexElements(regexp = "\d+", allMatch = true)
Set<String> scores;
// 集合内所有元素都必须符合正则表达式

@RegexElements(regexp = "\d+", allMatch = false)
List<String> scores;
// 集合内任一元素符合正则表达式即可
```
