---
layout: doc
---

# 签名/校验
我只实现了基于RSA的签名/校验，`jasypt`本身就实现了多种签名算法

## 算法
`io.github.pangju666.commons.crypto.enums.RsaSignatureAlgorithm`

| 枚举值                 | 算法名称              |
|---------------------|:------------------|
| MD2_WITH_RSA        | MD2withRSA        |
| MD5_WITH_RSA        | MD5withRSA        |
| SHA1_WITH_RSA       | SHA1withRSA       |
| SHA224_WITH_RSA     | SHA224withRSA     | 
| SHA256_WITH_RSA     | SHA256withRSA     | 
| SHA384_WITH_RSA     | SHA384withRSA     | 
| SHA512_WITH_RSA     | SHA512withRSA     | 
| SHA512_224_WITH_RSA | SHA512/224withRSA |  
| SHA512_256_WITH_RSA | SHA512/256withRSA |    

我测试的时候发现`NONEwithRSA`这个算法，不支持大于256字节的数据，就没加这个

还有SHA3开头的算法签名失败了，我也就没加

## 二进制
`io.github.pangju666.commons.crypto.digest.RSAByteDigester`

### 实例化
```java
ByteDigester encryptor1 = new RSAByteDigester();
// 设置加密方案
ByteDigester encryptor2 = new RSAByteDigester("SHA256withRSA");
// 设置密钥长度
ByteDigester encryptor3 = new RSAByteDigester(2048);
// 设置密钥长度和加密方案
ByteDigester encryptor4 = new RSAByteDigester(2048, "SHA256withRSA");
// 设置密钥
ByteDigester encryptor5 = new RSAByteDigester(RSAKey.random(2048));
// 设置密钥和加密方案
ByteDigester encryptor6 = new RSAByteDigester(RSAKey.random(2048), "SHA256withRSA");
```

### 使用
```java
byte[] message = "测试数据".getBytes()
ByteDigester digester = new RSAByteDigester();
// 签名
byte[] signature = digester.digest(message);
// 校验
boolean isValid = digester.matches(message, signature);
```

## 字符串
`io.github.pangju666.commons.crypto.digest.RSAStringDigester`

### 实例化
```java
StringDigester encryptor1 = new RSAStringDigester();
// 设置加密方案
StringDigester encryptor2 = new RSAStringDigester(RsaSignatureAlgorithm.SHA256_WITH_RSA);
// 设置密钥长度
StringDigester encryptor3 = new RSAStringDigester(2048);
// 设置密钥长度和加密方案
StringDigester encryptor4 = new RSAStringDigester(2048, RsaSignatureAlgorithm.SHA256_WITH_RSA);
// 设置密钥
StringDigester encryptor5 = new RSAStringDigester(RSAKey.random(2048));
// 设置密钥和加密方案
StringDigester encryptor6 = new RSAStringDigester(RSAKey.random(2048), RsaSignatureAlgorithm.SHA256_WITH_RSA);
// 设置二进制数字签名处理器
StringDigester encryptor7 = new RSAStringDigester(new RSAByteDigester());
```

### 使用
只能校验被`Base64`编码或`Hex`编码过的签名

```java
String message = "Hello, RSA!";
StringDigester digester = new RSAStringDigester();
// 签名并将结果使用Base64编码
String signature = digester.digest(message);
// 使用Base64解码并校验
boolean isValid = digester.matches(message, signature);

// 签名并将结果使用Hex编码
String signature2 = digester.digestToHexString(message);
// 使用Hex解码并校验
String isValid2 = digester.matches(message, signature2);
```
