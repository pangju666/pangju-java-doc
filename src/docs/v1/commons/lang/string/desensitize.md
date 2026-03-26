---
layout: doc
---

# 脱敏
`io.github.pangju666.commons.lang.utils.DesensitizationUtils`

创意来自`ruoyi`

## 身份证号
保留前1位，后1位
```java
String str = "210102198801164317";
DesensitizationUtils.hideIdCardNumber(str); // 2****************7
```

## 军官证号
保留前1位，后1位
```java
String str = "军11111111111111";
DesensitizationUtils.validate(str); // 军*************1
```

## 护照号
保留前1位，后1位
```java
String str = "E1111111111111111";
DesensitizationUtils.validate(str); // E***************1
```

## 社保卡号
动态保留首尾各1/3长度，长度不能被3整除的，首部长度+1
```java
String str = "123111111789";
DesensitizationUtils.validate(str); // 123******789
```

## 医保卡号
动态保留首尾各1/3长度，长度不能被3整除的，首部长度+1
```java
String str = "C12111111456";
DesensitizationUtils.validate(str); // C12******456
```

## 手机号
保留前3位，后2位
```java
String str = "18991938939";
DesensitizationUtils.validate(str); // 189******39
```

## 固定电话
保留区号和后4位
```java
String str = "01012341234";
DesensitizationUtils.validate(str); // 010****1234
```

## 邮箱地址
保留用户名前3位，域名全保留
```java
String str = "tes11111111@example.com";
DesensitizationUtils.validate(str); // tes********@example.com
```

## 地址
隐藏区/县以下部分的地址
```java
String str = "北京市朝阳区幸福人生小区";
DesensitizationUtils.validate(str); // 北京市朝阳区******
```

## 昵称
保留首尾各1位
```java
String str = "张嘉三";
DesensitizationUtils.validate(str); // 张*三
```

## 中文姓名
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

## 车辆发动机号
保留前1位，后2位
```java
String str = "A1212";
DesensitizationUtils.validate(str); // A**12
```

## 车辆车架号
保留前3位，后3位

*适用于17位VIN码的标准脱敏*
```java
String str = "ABC123XYZ";
DesensitizationUtils.validate(str); // ABC***XYZ
```

## 车牌号
保留前2位，后3位

*同时支持新能源车牌和普通车牌格式*
```java
String str = "京A123189";
DesensitizationUtils.validate(str); // 京A***189
```

## 银行卡号
保留前后各4位
```java
String str = "62281111118888";
DesensitizationUtils.validate(str); // 6228******8888
```

## 密码
全部替换为星号
```java
String str = "12345678";
DesensitizationUtils.validate(str); // ********
```

## 右侧
保留左侧指定位数
```java
String str = "123456";
DesensitizationUtils.validate(str, 3); // 123***
```

## 左侧
保留右侧指定位数
```java
String str = "123456";
DesensitizationUtils.validate(str, 3); // ***456
```

## 环形
保留字符串首尾指定长度内容，中间用星号替代
```java
String str = "123456789";
DesensitizationUtils.validate(str, 3, 3); // 123***789
```
