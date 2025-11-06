---
layout: doc
---

# 正则表达式

## 说明

| 类名         | 类型  |                       用途                        |
|------------|:----|:-----------------------------------------------:|
| RegexFlag  | 枚举类 |                     正则模式标志位                     |
| RegExPool  | 常量池 |                     正则表达式大全                     |
| RegExUtils | 工具类 | 正则表达式工具类，继承自org.apache.commons.lang3.RegExUtils |

## 标志位
`io.github.pangju666.commons.lang.enums.RegexFlag`

| 枚举值              | 标志位值 |         描述         |
|------------------|:-----|:------------------:|
| UNIX_LINES       | 0x01 |    启用 Unix 行模式     |
| CASE_INSENSITIVE | 0x02 |    启用对案例不敏感的匹配     |
| COMMENTS         | 0x04 |   允许在模式中使用空白和注释    |
| MULTILINE        | 0x08 |       启用多行模式       |
| DOTALL           | 0x20 |    启用 dotall 模式    |
| UNICODE_CASE     | 0x40 | 启用 Unicode 识别大小写折叠 |
| CANON_EQ         | 0x80 |       启用规范等价       |

## 常量池
`io.github.pangju666.commons.lang.pool.RegExPool`

| 常量名                        |            说明            |
|----------------------------|:------------------------:|
| HEX_COLOR                  |          十六进制颜色          |
| ENGLISH_CHARACTER          |            字母            |
| ENGLISH_CHARACTERS         |           多个字母           |
| CHINESE_CHARACTER          |          单个中文汉字          |
| CHINESE_CHARACTERS         |          多个中文汉字          |
| SYMBOLS_CHARACTER          |            字符            |
| SYMBOLS_CHARACTERS         |           多个字符           |
| IPV4                       |           Ipv4           |
| IPV6                       |           IPv6           |
| MONEY                      |    货币金额（支持负数、千分位分隔符）     |
| EMAIL                      |     邮件，符合RFC 5322规范      |
| MOBILE_PHONE_STRONG        |         电话号码（强）          |
| MOBILE_PHONE_WEAK          |         电话号码（弱）          |
| TEL_PHONE                  |           座机号码           |
| ID_CARD                    |          身份证号码           |
| ZIP_CODE                   |         邮编，兼容港澳台         |
| URI                        |           URI            |
| URL                        |           URL            |
| HTTP_URL                   |       Http、Https链接       |
| FTP_URL                    |        Ftp、Ftps链接        |
| FILE_URL                   |           文件链接           |
| NUMBER                     |            数字            |
| POSITIVE_NUMBER            |            正数            |
| FLOAT_NUMBER               |           浮点数            |
| POSITIVE_FLOAT_NUMBER      |           正浮点数           |
| MIME_TYPE                  |       文件Mime Type        |
| IDENTIFIER                 |           标识符            |
| MD5                        |           MD5            |
| BANK_CARD                  |  银行卡号（10到30位, 覆盖对公/私账户）  |
| FILENAME                   |           文件名称           |
| FILENAME_WITHOUT_EXTENSION |        文件名称（无拓展名）        |
| UUID                       |           UUID           |
| UUID_SIMPLE                |        不带横线的UUID         |
| JAVA_UUID                  |   Java版本的UUID（没有大写字母）    |
| JAVA_UUID_SIMPLE           | Java版本的不带横线的UUID（没有大写字母） |
| MAC                        |          MAC地址           |
| HEX                        |           16进制           |
| DATE                       |     日期，YYYY-MM-DD格式      |
| TIME_12                    |         十二小时制时间          |
| TIME_24                    |         二十四小时制时间         |
| VEHICLE_PLATE_NUMBER       |           车牌号码           |
| CREDIT_CODE                |         统一社会信用代码         |
| NET_MASK                   |           子网掩码           |
| VEHICLE_FRAME_NUMBER       |           车架号            |
| VEHICLE_DRIVING_NUMBER     |           驾驶证            |
| CHINESE_NAME               |           中文姓名           |
| PHONE_IMEI                 |         手机IMEI码          |
| LINUX_DIR_PATH             |        Linux目录路径         |
| LINUX_FILE_PATH            |        Linux文件路径         |
| WINDOWS_DIR_PATH           |       Windows目录路径        |
| WINDOWS_FILE_PATH          |       Windows文件路径        |
| VERSION                    |           版本号            |
| IMAGE_URL                  |           图片链接           |
| VIDEO_URL                  |           视频链接           |
| PASSPORT                   |            护照            |
| DOMAIN                     |            域名            |

## 工具类
`io.github.pangju666.commons.lang.utils.RegExUtils`

| 方法名          | 返回值           |         用途         |
|--------------|:--------------|:------------------:|
| computeFlags | int           |   计算正则表达式标志位的组合值   |
| compile      | Pattern       |      编译正则表达式       |
| matches      | boolean       |  检查字符串是否完全匹配正则表达式  |
| find         | List\<String> | 查找字符串中所有匹配正则表达式的子串 |

### computeFlags
```java
int flags = RegExUtils.computeFlags(RegexFlag.UNIX_LINES, RegexFlag.CASE_INSENSITIVE);
Pattern pattern = Pattern.compile(RegexPool.MOBILE_PHONE_WEAK, flags);
```

### compile
```java
int flags = RegExUtils.computeFlags(RegexFlag.UNIX_LINES, RegexFlag.CASE_INSENSITIVE);

Pattern pattern1 = RegExUtils.compile(Pattern.compile(RegexPool.MOBILE_PHONE_WEAK), flags); // 1\d{10}

Pattern pattern2 = RegExUtils.compile(RegexPool.MOBILE_PHONE_WEAK, true, true); // ^1\d{10}$
Pattern pattern3 = RegExUtils.compile(RegexPool.MOBILE_PHONE_WEAK, false, false); // 1\d{10}
Pattern pattern4 = RegExUtils.compile(RegexPool.MOBILE_PHONE_WEAK, true, false); // ^1\d{10}
Pattern pattern5 = RegExUtils.compile(RegexPool.MOBILE_PHONE_WEAK, flags, true, true); // ^1\d{10}$
```

### matches
```java
RegExUtils.matches(Pattern.compile("^1\\d{10}\$"), "12345678911"); // true
RegExUtils.matches(Pattern.compile("^1\\d{10}\$"), "22345678911"); // false

RegExUtils.matches("^1\\d{10}\$", "12345678911"); // true
RegExUtils.matches("^1\\d{10}\$", "22345678911"); // false
```

### find
```java
RegExUtils.find(Pattern.compile("1\\d{10}"), "12222"); // [12345678911]
RegExUtils.find(Pattern.compile("1\\d{10}"), "22222"); // []

RegExUtils.find("1\\d{10}", "12222"); // [12345678911]
RegExUtils.find("1\\d{10}", "22222"); // []
```
