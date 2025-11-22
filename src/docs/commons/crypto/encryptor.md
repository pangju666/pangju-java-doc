---
layout: doc
---

# 加/解密
我只实现了基于RSA的加解密，`jasypt`本身就实现了多种加密算法

> [!IMPORTANT]
> 
> 实例化后需要手动设置密钥。
>
> 需要在调用加密/解密方法前完成设置，否则将无法设置。
>
> 密钥获取和解析请参阅[文档](/commons/crypto/key)
> 
> 加密方案请参阅[文档](/commons/crypto/transformation)

## 二进制
`io.github.pangju666.commons.crypto.encryption.binary.RSABinaryEncryptor`

### 实例化
```java
BinaryEncryptor encryptor1 = new RSABinaryEncryptor();
// 设置加密方案
BinaryEncryptor encryptor2 = new RSABinaryEncryptor(new RSAOEAPWithSHA256Transformation());

RSAKeyPair keyPair = RSAKeyPair.random();
// 设置密钥对既可以加密也可以解密
encryptor1.setKeyPair(keyPair);
// 只设置私钥则只能解密
encryptor1.setPrivateKey(keyPair.getPrivateKey());
// 只设置公钥则只能加密
encryptor1.setPublicKey(keyPair.getPublicKey());
```

### 使用
```java
byte[] data = new byte[500]
new Random().nextBytes(data);
		
BinaryEncryptor encryptor = new RSABinaryEncryptor();
encryptor.setKeyPair(RSAKeyPair.random());

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
// 设置二进制加密器
TextEncryptor encryptor3 = new RSATextEncryptor(new RSABinaryEncryptor());

RSAKeyPair keyPair = RSAKeyPair.random();
// 设置密钥对既可以加密也可以解密
encryptor1.setKeyPair(keyPair);
// 只设置私钥则只能解密
encryptor1.setPrivateKey(keyPair.getPrivateKey());
// 只设置公钥则只能加密
encryptor1.setPublicKey(keyPair.getPublicKey());
```

### 使用
```java
String originalText = "Hello, RSA Encryption! 你好，RSA加密！"

RSATextEncryptor encryptor = new RSATextEncryptor();
encryptor.setKeyPair(RSAKeyPair.random());

// 加密并将结果使用Base64编码
String encrypted = encryptor.encrypt(originalText);
// 使用Base64解码并解密
String decrypted = encryptor.decrypt(encrypted);
```

## BigInteger
`io.github.pangju666.commons.crypto.encryption.numeric.RSAIntegerNumberEncryptor`

### 实例化
```java
IntegerNumberEncryptor encryptor1 = new RSAIntegerNumberEncryptor();
// 设置加密方案
IntegerNumberEncryptor encryptor2 = new RSAIntegerNumberEncryptor(new RSAOEAPWithSHA256Transformation());
// 设置二进制加密器
IntegerNumberEncryptor encryptor3 = new RSAIntegerNumberEncryptor(new RSABinaryEncryptor());

RSAKeyPair keyPair = RSAKeyPair.random();
// 设置密钥对既可以加密也可以解密
encryptor1.setKeyPair(keyPair);
// 只设置私钥则只能解密
encryptor1.setPrivateKey(keyPair.getPrivateKey());
// 只设置公钥则只能加密
encryptor1.setPublicKey(keyPair.getPublicKey());
```

### 使用
```java
IntegerNumberEncryptor encryptor = new RSAIntegerNumberEncryptor();
encryptor.setKeyPair(RSAKeyPair.random());

// 加密
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
// 设置二进制加密器
DecimalNumberEncryptor encryptor3 = new RSADecimalNumberEncryptor(new RSABinaryEncryptor());

RSAKeyPair keyPair = RSAKeyPair.random();
// 设置密钥对既可以加密也可以解密
encryptor1.setKeyPair(keyPair);
// 只设置私钥则只能解密
encryptor1.setPrivateKey(keyPair.getPrivateKey());
// 只设置公钥则只能加密
encryptor1.setPublicKey(keyPair.getPublicKey());
```

### 使用
```java
DecimalNumberEncryptor encryptor = new RSADecimalNumberEncryptor();
encryptor.setKeyPair(RSAKeyPair.random());

// 加密
BigDecimal encrypted = encryptor.encrypt(new BigDecimal("123456789.123456789"));
// 解密
BigDecimal decrypted = encryptor.decrypt(encrypted);
```
