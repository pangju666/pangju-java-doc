---
layout: doc
---

# 字符串

## 说明

| 类名                   | 类型                       |                       用途                       |
|----------------------|:-------------------------|:----------------------------------------------:|
| PinyinComparator     | `Comparable<String>`接口实现 |                    字符串拼音比较器                    |
| StringUtils          | 工具类                      | 字符串工具类，继承自org.apache.commons.lang3.StringUtils |
| StringFormatUtils    | 工具类                      |                   字符串格式化工具类                    |
| IdCardUtils          | 工具类                      |                    身份证号码工具类                    |
| DesensitizationUtils | 工具类                      |                     脱敏工具类                      |

## 拼音比较器
`io.github.pangju666.commons.lang.comparator.PinyinComparator`

比较顺序为：

1. `null`值具有最高优先级
2. 空字符串""次之
3. 空白字符串" "再次之
4. 其他字符串按拼音顺序

### 比较
```java
// 默认使用空格各个字符的拼音分隔符
String a = "你好"; // ni hao
String b = "世界"; // shi jie
Comparator<String> comparator1 = new PinyinComparator();
comparator1.compare(a, b); // -5

// 手动指定各个字符的拼音分隔符
String c = "你好"; // ni-hao
String d = "世界"; // shi-jie
Comparator<String> comparator2 = new PinyinComparator("-");
comparator2.compare(c, d); // -5

// 默认使用空格各个字符的拼音分隔符
String e = "hello"; // hello
String f = "世界"; // shi jie
Comparator<String> comparator3 = new PinyinComparator();
comparator3.compare(e, f); // -11
```

### 排序
此方法会修改原数组/列表
```java
List<String> list = new ArrayList<>(List.of("你好", "世界", "", "我是", "胖橘"));
PinyinComparator.order(list/*, "-"*/); // ["", 你好, 胖橘, 世界, 我是]

String[] arr = new String[]{"你好", "世界", "我是", "胖橘", null, ""};
PinyinComparator.order(arr/*, "-"*/); // [null, "", 你好, 胖橘, 世界, 我是]
```

## 字符串处理
`io.github.pangju666.commons.lang.utils.StringUtils`

| 方法名                       | 返回值           |        用途         |
|---------------------------|:--------------|:-----------------:|
| convertCharset            | String        |     转换字符串字符集      |
| getNotBlankElements       | List\<String> |  获取集合中非空字符串元素列表   |
| getUniqueNotBlankElements | List\<String> | 获取集合中唯一且非空字符串元素列表 |

### 字符串转换
```java
String str = "你好世界";

// 不指定原始字符串字符集
StringUtils.convertCharset(str, StandardCharsets.ISO_8859_1);

// 指定原始字符串字符集
StringUtils.convertCharset(str, StandardCharsets.UTF_8, StandardCharsets.ISO_8859_1);
```

### 获取非空字符串元素列表
```java
List<String> list = new ArrayList<>(List.of("你好", "世界", "", "我是", " ", "", "胖橘", "世界"));
// 不去除重复字符串
StringUtils.getNotBlankElements(list); // [你好, 世界, 我是, 胖橘, 世界]
//去除重复字符串
StringUtils.getUniqueNotBlankElements(list); // [你好, 世界, 我是, 胖橘]

// 不去除重复字符串
StringUtils.getNotBlankElements("你好", "世界", null, "", "我是", " ", "", "胖橘", "世界"); // [你好, 世界, 我是, 胖橘, 世界]
//去除重复字符串
StringUtils.getUniqueNotBlankElements("你好", "世界", null, "", "我是", " ", "", "胖橘", "世界"); // [你好, 世界, 我是, 胖橘]
```

## 格式化
`io.github.pangju666.commons.lang.utils.StringFormatUtils`

### 全大写下划线格式（SCREAMING_SNAKE_CASE）
```java
String a = "TEST_VALUE";
StringFormatUtils.formatAsScreamingSnakeCase(a); // "TEST_VALUE"

String b = "TEST-VALUE";
StringFormatUtils.formatAsScreamingSnakeCase(b); // "TEST_VALUE"

String c = "test-value";
StringFormatUtils.formatAsScreamingSnakeCase(c); // "TEST_VALUE"

String d = "test_value";
StringFormatUtils.formatAsScreamingSnakeCase(d); // "TEST_VALUE"

String e = "testValue";
StringFormatUtils.formatAsScreamingSnakeCase(e); // "TEST_VALUE"

String f = "TestValue";
StringFormatUtils.formatAsScreamingSnakeCase(f); // "TEST_VALUE"
```

### 全大写中横线格式（SCREAMING-KEBAB-CASE）
```java
String a = "TEST_VALUE";
StringFormatUtils.formatAsScreamingKebabCase(a); // "TEST-VALUE"

String b = "TEST-VALUE";
StringFormatUtils.formatAsScreamingKebabCase(b); // "TEST-VALUE"

String c = "test-value";
StringFormatUtils.formatAsScreamingKebabCase(c); // "TEST-VALUE"

String d = "test_value";
StringFormatUtils.formatAsScreamingKebabCase(d); // "TEST-VALUE"

String e = "testValue";
StringFormatUtils.formatAsScreamingKebabCase(e); // "TEST-VALUE"

String f = "TestValue";
StringFormatUtils.formatAsScreamingKebabCase(f); // "TEST-VALUE"
```

### 中横线格式（kebab-case）
```java
String a = "TEST_VALUE";
StringFormatUtils.formatAsKebabCase(a); // "test-value"

String b = "TEST-VALUE";
StringFormatUtils.formatAsKebabCase(b); // "test-value"

String c = "test-value";
StringFormatUtils.formatAsKebabCase(c); // "test-value"

String d = "test_value";
StringFormatUtils.formatAsKebabCase(d); // "test-value"

String e = "testValue";
StringFormatUtils.formatAsKebabCase(e); // "test-value"

String f = "TestValue";
StringFormatUtils.formatAsKebabCase(f); // "test-value"
```

### 下划线格式（snake_case）
```java
String a = "TEST_VALUE";
StringFormatUtils.formatAsSnakeCase(a); // "test_value"

String b = "TEST-VALUE";
StringFormatUtils.formatAsSnakeCase(b); // "test_value"

String c = "test-value";
StringFormatUtils.formatAsSnakeCase(c); // "test_value"

String d = "test_value";
StringFormatUtils.formatAsSnakeCase(d); // "test_value"

String e = "testValue";
StringFormatUtils.formatAsSnakeCase(e); // "test_value"

String f = "TestValue";
StringFormatUtils.formatAsSnakeCase(f); // "test_value"
```

### 小驼峰格式（camelCase）
```java
String a = "TEST_VALUE";
StringFormatUtils.formatAsCamelCase(a); // "testValue"

String b = "TEST-VALUE";
StringFormatUtils.formatAsCamelCase(b); // "testValue"

String c = "test-value";
StringFormatUtils.formatAsCamelCase(c); // "testValue"

String d = "test_value";
StringFormatUtils.formatAsCamelCase(d); // "testValue"

String e = "testValue";
StringFormatUtils.formatAsCamelCase(e); // "testValue"

String f = "TestValue";
StringFormatUtils.formatAsCamelCase(f); // "testValue"

// 指定分隔符
String g = "TEST&VALUE";
StringFormatUtils.formatAsCamelCase(a, "&"); // "testValue"

String h = "TEST&VALUE";
StringFormatUtils.formatAsCamelCase(b, "&"); // "testValue"

String i = "test&value";
StringFormatUtils.formatAsCamelCase(c, "&"); // "testValue"

String j = "test&value";
StringFormatUtils.formatAsCamelCase(d, "&"); // "testValue"
```

### 大驼峰格式（PascalCase）
```java
String a = "TEST_VALUE";
StringFormatUtils.formatAsPascalCase(a); // "TestValue"

String b = "TEST-VALUE";
StringFormatUtils.formatAsPascalCase(b); // "TestValue"

String c = "test-value";
StringFormatUtils.formatAsPascalCase(c); // "TestValue"

String d = "test_value";
StringFormatUtils.formatAsPascalCase(d); // "TestValue"

String e = "testValue";
StringFormatUtils.formatAsPascalCase(e); // "TestValue"

String f = "TestValue";
StringFormatUtils.formatAsPascalCase(f); // "TestValue"

// 指定分隔符
String g = "TEST&VALUE";
StringFormatUtils.formatAsCamelCase(a, "&"); // "TestValue"

String h = "TEST&VALUE";
StringFormatUtils.formatAsCamelCase(b, "&"); // "TestValue"

String i = "test&value";
StringFormatUtils.formatAsCamelCase(c, "&"); // "TestValue"

String j = "test&value";
StringFormatUtils.formatAsCamelCase(d, "&"); // "TestValue"
```

## 身份证
`io.github.pangju666.commons.lang.utils.IdCardUtils`

此工具类只能校验格式有效性，无法校验其真实性

### 校验有效性
```java
String idCard = "210102198801164317";
IdCardUtils.validate(idCard); // true

String idCard2 = "2101317";
IdCardUtils.validate(idCard2); // false
```

### 解析性别
```java
String idCard = "210102198801164317";
IdCardUtils.parseSex(idCard); // 男

String idCard2 = "210102198301112246";
IdCardUtils.parseSex(idCard2); // 女
```

### 解析出生日期
```java
String idCard = "210102198801164317";
IdCardUtils.parseSex(idCard); // 1988-01-16
```

## 脱敏
`io.github.pangju666.commons.lang.utils.DesensitizationUtils`

创意来自`ruoyi`

### 身份证号
保留前1位，后1位
```java
String str = "210102198801164317";
DesensitizationUtils.hideIdCardNumber(str); // 2****************7
```

### 军官证号
保留前1位，后1位
```java
String str = "军11111111111111";
DesensitizationUtils.validate(str); // 军*************1
```

### 护照号
保留前1位，后1位
```java
String str = "E1111111111111111";
DesensitizationUtils.validate(str); // E***************1
```

### 社保卡号
动态保留首尾各1/3长度，长度不能被3整除的，首部长度+1
```java
String str = "123111111789";
DesensitizationUtils.validate(str); // 123******789
```

### 医保卡号
动态保留首尾各1/3长度，长度不能被3整除的，首部长度+1
```java
String str = "C12111111456";
DesensitizationUtils.validate(str); // C12******456
```

### 手机号
保留前3位，后2位
```java
String str = "18991938939";
DesensitizationUtils.validate(str); // 189******39
```

### 固定电话
保留区号和后4位
```java
String str = "01012341234";
DesensitizationUtils.validate(str); // 010****1234
```

### 邮箱地址
保留用户名前3位，域名全保留
```java
String str = "tes11111111@example.com";
DesensitizationUtils.validate(str); // tes********@example.com
```

### 地址
隐藏区/县以下部分的地址
```java
String str = "北京市朝阳区幸福人生小区";
DesensitizationUtils.validate(str); // 北京市朝阳区******
```

### 昵称
保留首尾各1位
```java
String str = "张嘉三";
DesensitizationUtils.validate(str); // 张*三
```

### 中文姓名
根据姓名长度采用不同脱敏策略：
- 3字及以下：隐藏第一个字（如：*三）
- 4-6字：显示最后两个字（如：**不败）
- 6字以上：保留首1位+尾2位（如：欧***莫非）
```java
String str1 = "张三";
DesensitizationUtils.validate(str1); // *三

String str2 = "东方不败";
DesensitizationUtils.validate(str2); // **不败

String str3 = "欧阳北冥莫非";
DesensitizationUtils.validate(str3); // 欧***莫非
```

### 车辆发动机号
保留前1位，后2位
```java
String str = "A1212";
DesensitizationUtils.validate(str); // A**12
```

### 车辆车架号
保留前3位，后3位

*适用于17位VIN码的标准脱敏*
```java
String str = "ABC123XYZ";
DesensitizationUtils.validate(str); // ABC***XYZ
```

### 车牌号
保留前2位，后3位

*同时支持新能源车牌和普通车牌格式*
```java
String str = "京A123189";
DesensitizationUtils.validate(str); // 京A***189
```

### 银行卡号
保留前后各4位
```java
String str = "62281111118888";
DesensitizationUtils.validate(str); // 6228******8888
```

### 密码
全部替换为星号
```java
String str = "12345678";
DesensitizationUtils.validate(str); // ********
```

### 右侧
保留左侧指定位数
```java
String str = "123456";
DesensitizationUtils.validate(str, 3); // 123***
```

### 左侧
保留右侧指定位数
```java
String str = "123456";
DesensitizationUtils.validate(str, 3); // ***456
```

### 环形
保留字符串首尾指定长度内容，中间用星号替代
```java
String str = "123456789";
DesensitizationUtils.validate(str, 3, 3); // 123***789
```
