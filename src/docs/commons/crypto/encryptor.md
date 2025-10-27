---
layout: doc
---

# 加/解密
我只实现了基于RSA的加解密，`jasypt`本身就实现了多种加密算法

## 二进制
`io.github.pangju666.commons.crypto.encryption.binary.RSABinaryEncryptor`

### 实例化
```java
BinaryEncryptor encryptor1 = new RSABinaryEncryptor();
// 设置加密方案
BinaryEncryptor encryptor2 = new RSABinaryEncryptor(new RSAOEAPWithSHA256Transformation());
// 设置密钥长度
BinaryEncryptor encryptor3 = new RSABinaryEncryptor(2048);
// 设置密钥长度和加密方案
BinaryEncryptor encryptor4 = new RSABinaryEncryptor(2048, new RSAOEAPWithSHA256Transformation());
// 设置密钥
BinaryEncryptor encryptor5 = new RSABinaryEncryptor(RSAKey.random(2048));
// 设置密钥和加密方案
BinaryEncryptor encryptor6 = new RSABinaryEncryptor(RSAKey.random(2048), new RSAOEAPWithSHA256Transformation());
```

### 使用
```java
byte[] data = new byte[500]
new Random().nextBytes(data);
		
BinaryEncryptor encryptor = new RSABinaryEncryptor();
// 加密
byte[] encrypted = encryptor.encrypt(data);
// 解密
byte[] decrypted = encryptor.decrypt(encrypted);
```

## 字符串
`io.github.pangju666.commons.crypto.encryption.text.RSATextEncryptor`

### 实例化
```java
TextEncryptor encryptor1 = new RSATextEncryptor();
// 设置加密方案
TextEncryptor encryptor2 = new RSATextEncryptor(new RSAOEAPWithSHA256Transformation());
// 设置密钥长度
TextEncryptor encryptor3 = new RSATextEncryptor(2048);
// 设置密钥长度和加密方案
TextEncryptor encryptor4 = new RSATextEncryptor(2048, new RSAOEAPWithSHA256Transformation());
// 设置密钥
TextEncryptor encryptor5 = new RSATextEncryptor(RSAKey.random(2048));
// 设置密钥和加密方案
TextEncryptor encryptor6 = new RSATextEncryptor(RSAKey.random(2048), new RSAOEAPWithSHA256Transformation());
// 设置二进制加密器
TextEncryptor encryptor7 = new RSATextEncryptor(new RSABinaryEncryptor());
```

### 使用
只能解密被`Base64`或`Hex`编码过的字符串

```java
String originalText = "Hello, RSA Encryption! 你好，RSA加密！"
RSATextEncryptor encryptor = new RSATextEncryptor();

// 加密并将结果使用Base64编码
String encrypted = encryptor.encrypt(originalText);
// 使用Base64解码并解密
String decrypted = encryptor.decrypt(encrypted);

// 加密并将结果使用Hex编码
String encrypted2 = encryptor.encryptToHexString(originalText);
// 使用Hex解码并解密
String decrypted2 = encryptor.decryptFromHexString(encrypted);
```

## BigInteger
`io.github.pangju666.commons.crypto.encryption.numeric.RSAIntegerNumberEncryptor`

### 实例化
```java
IntegerNumberEncryptor encryptor1 = new RSAIntegerNumberEncryptor();
// 设置加密方案
IntegerNumberEncryptor encryptor2 = new RSAIntegerNumberEncryptor(new RSAOEAPWithSHA256Transformation());
// 设置密钥长度
IntegerNumberEncryptor encryptor3 = new RSAIntegerNumberEncryptor(2048);
// 设置密钥长度和加密方案
IntegerNumberEncryptor encryptor4 = new RSAIntegerNumberEncryptor(2048, new RSAOEAPWithSHA256Transformation());
// 设置密钥
IntegerNumberEncryptor encryptor5 = new RSAIntegerNumberEncryptor(RSAKey.random(2048));
// 设置密钥和加密方案
IntegerNumberEncryptor encryptor6 = new RSAIntegerNumberEncryptor(RSAKey.random(2048), new RSAOEAPWithSHA256Transformation());
// 设置二进制加密器
IntegerNumberEncryptor encryptor7 = new RSAIntegerNumberEncryptor(new RSABinaryEncryptor());
```

### 使用
```java
IntegerNumberEncryptor encryptor = new RSAIntegerNumberEncryptor();

// 加密并
BigInteger encrypted = encryptor.encrypt(BigInteger.valueOf(123456789));
// 解密
BigInteger decrypted = encryptor.decrypt(encrypted);
```

## BigDecimal
`io.github.pangju666.commons.crypto.encryption.numeric.RSADecimalNumberEncryptor`

### 实例化
```java
DecimalNumberEncryptor encryptor1 = new RSADecimalNumberEncryptor();
// 设置加密方案
DecimalNumberEncryptor encryptor2 = new RSADecimalNumberEncryptor(new RSAOEAPWithSHA256Transformation());
// 设置密钥长度
DecimalNumberEncryptor encryptor3 = new RSADecimalNumberEncryptor(2048);
// 设置密钥长度和加密方案
DecimalNumberEncryptor encryptor4 = new RSADecimalNumberEncryptor(2048, new RSAOEAPWithSHA256Transformation());
// 设置密钥
DecimalNumberEncryptor encryptor5 = new RSADecimalNumberEncryptor(RSAKey.random(2048));
// 设置密钥和加密方案
DecimalNumberEncryptor encryptor6 = new RSADecimalNumberEncryptor(RSAKey.random(2048), new RSAOEAPWithSHA256Transformation());
// 设置二进制加密器
DecimalNumberEncryptor encryptor7 = new RSADecimalNumberEncryptor(new RSABinaryEncryptor());
```

### 使用
```java
DecimalNumberEncryptor encryptor = new RSADecimalNumberEncryptor();

// 加密并
BigDecimal encrypted = encryptor.encrypt(new BigDecimal("123456789.123456789"));
// 解密
BigDecimal decrypted = encryptor.decrypt(encrypted);
```
