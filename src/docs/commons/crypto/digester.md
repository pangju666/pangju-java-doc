---
layout: doc
---

# 签名/校验
我只实现了基于RSA的签名/校验，`jasypt`本身就实现了多种签名算法

> [!IMPORTANT]
>
> 实例化后需要手动设置密钥。
> 
> 需要在调用签名/校验方法前完成设置，否则将无法设置。
> 
> 密钥获取和解析请参阅[文档](/commons/crypto/key)

## 算法
`io.github.pangju666.commons.crypto.enums.RSASignatureAlgorithm`

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
RSAByteDigester digester1 = new RSAByteDigester();
// 设置加密方案
RSAByteDigester digester2 = new RSAByteDigester(RSASignatureAlgorithm.SHA256_WITH_RSA);

RSAKeyPair keyPair = RSAKeyPair.random();
// 设置密钥对既可以签名也可以校验
digester1.setKeyPair(keyPair);
// 只设置私钥则只能签名
digester1.setPrivateKey(keyPair.getPrivateKey());
// 只设置公钥则只能校验
digester1.setPublicKey(keyPair.getPublicKey());
```

### 使用
```java
byte[] message = "测试数据".getBytes()

ByteDigester signDigester = new RSAByteDigester();
digester.setKeyPair(RSAKeyPair.random());

// 签名
byte[] signature = digester.digest(message);
// 校验
boolean isValid = digester.matches(message, signature);
```

## 字符串
`io.github.pangju666.commons.crypto.digest.RSAStringDigester`

### 实例化
```java
RSAStringDigester digester1 = new RSAStringDigester();
// 设置加密方案
RSAStringDigester digester2 = new RSAStringDigester(RSASignatureAlgorithm.SHA256_WITH_RSA);
// 设置二进制签名处理器
RSAStringDigester digester3 = new RSAStringDigester(new RSAByteDigester());

RSAKeyPair keyPair = RSAKeyPair.random();
// 设置密钥对，即可以签名也可以校验
digester1.setKeyPair(keyPair);
// 只设置私钥则只能签名
digester1.setPrivateKey(keyPair.getPrivateKey());
// 只设置公钥则只能校验
digester1.setPublicKey(keyPair.getPublicKey());
```

### 使用
```java
String message = "Hello, RSA!";

StringDigester digester = new RSAStringDigester();
digester.setKeyPair(RSAKeyPair.random());

// 签名并将结果使用Base64编码
String signature = digester.digest(message);
// 使用Base64解码并校验
boolean isValid = digester.matches(message, signature);
```
