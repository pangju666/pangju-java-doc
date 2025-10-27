---
layout: doc
---

# 密钥

## RSA密钥
`io.github.pangju666.commons.crypto.key.RSAKey`

我在该模块定义了一个用于封装RSA公私钥和一些常用功能的数据结构类

| 方法名              | 返回值        |          用途          |
|------------------|:-----------|:--------------------:|
| getPublicKey     | PublicKey  |         获取公钥         |
| getPrivateKey    | PrivateKey |         获取私钥         |
| random           | RSAKey     |      生成随机RSA密钥对      |
| fromKeyPair      | RSAKey     | 从现有KeyPair构建RSAKey实例 |
| fromRawBytes     | RSAKey     |     从公私钥构建RSAKey     |
| fromBase64String | RSAKey     | 从Base64编码公私钥构建RSAKey |

### 获取公钥
```java
RSAKey rsaKey = RSAKey.random();
rsaKey.getPublicKey(); //获取公钥
rsaKey.getPrivateKey(); // 获取私钥
```

### 生成随机密钥对
```java
RSAKey rsaKey1 = RSAKey.random(); // 生成默认长度(2048位)的随机RSA密钥对
RSAKey rsaKey2 = RSAKey.random(2048); // 生成指定长度的随机RSA密钥对，支持1024/2048/4096位三种标准密钥长度
```

### 从KeyPair构建
```java
KeyPair keyPair = KeyPairUtils.generateKeyPair(CryptoConstants.RSA_ALGORITHM, 2048);
RSAKey rsaKey = RSAKey.fromKeyPair(keyPair);
```

### 从公私钥构建
```java
KeyPair keyPair = KeyPairUtils.generateKeyPair(CryptoConstants.RSA_ALGORITHM, 2048);
byte[] publicBytes = keyPair.public.getEncoded();
byte[] privateBytes = keyPair.private.getEncoded();
RSAKey rsaKey = RSAKey.fromRawBytes(publicBytes, privateBytes);

// 也可以只传入公私钥中的任意一个
RSAKey rsaKey2 = RSAKey.fromRawBytes(null, privateBytes);
RSAKey rsaKey3 = RSAKey.fromRawBytes(publicBytes, null);

// 如果传入无效密钥
RSAKey rsaKey4 = RSAKey.fromBase64String("invalid", privateBytes); // 抛出InvalidKeySpecException
```

### 从Base64编码公私钥构建
```java
KeyPair keyPair = KeyPairUtils.generateKeyPair(CryptoConstants.RSA_ALGORITHM, 2048);
String base64Public = Base64.encodeBase64String(originalPair.public.getEncoded());
String base64Private = Base64.encodeBase64String(originalPair.private.getEncoded());
RSAKey rsaKey = RSAKey.fromBase64String(base64Public, base64Private);

// 也可以只传入公私钥中的任意一个
RSAKey rsaKey2 = RSAKey.fromBase64String(null, base64Private);
RSAKey rsaKey3 = RSAKey.fromBase64String(base64Public, null);

// 如果传入无效密钥
RSAKey rsaKey4 = RSAKey.fromBase64String("invalid", base64Private); // 抛出InvalidKeySpecException
```

## 工具类
`io.github.pangju666.commons.crypto.utils.KeyPairUtils`

| 方法名                                | 返回值        |             用途             |
|------------------------------------|:-----------|:--------------------------:|
| getKeyFactory                      | KeyFactory |        获取指定算法的密钥工厂         |
| generateKeyPair                    | KeyPair    |         生成指定算法的密钥对         |
| getPrivateKeyFromPKCS8RawBytes     | PrivateKey |   从PKCS#8格式的原始字节数组中解析私钥    |
| getPublicKeyFromX509RawBytes       | PublicKey  | 从X.509格式的Base64编码字符串中解析公钥  |
| getPrivateKeyFromPKCS8Base64String | PrivateKey | 从PKCS#8格式的Base64编码字符串中解析私钥 |
| getPublicKeyFromX509Base64String   | PublicKey  |    从X.509格式的原始字节数组中解析公钥    |

### 获取密钥工厂
```java
KeyFactory keyFactory = KeyPairUtils.getKeyFactory(CryptoConstants.RSA_ALGORITHM);
```

### 生成密钥对
```java
// 生成RSA密钥对
KeyPairUtils.generateKeyPair(CryptoConstants.RSA_ALGORITHM);

// 生成长度为2048的密钥对
KeyPairUtils.generateKeyPair(CryptoConstants.RSA_ALGORITHM, 2048);

// 指定随机数生成器并生成长度为2048的密钥对
KeyPairUtils.generateKeyPair(CryptoConstants.RSA_ALGORITHM, 2048, new SecureRandom());
```

### 解析私钥
```java
KeyPair keyPair = KeyPairUtils.generateKeyPair(CryptoConstants.RSA_ALGORITHM);

byte[] privateKeyBytes = keyPair.getPrivate().getEncoded();
PrivateKey privateKey1 = KeyPairUtils.getPrivateKeyFromPKCS8RawBytes(RSA, privateKeyBytes);

String base64Key = Base64.encodeBase64String(privateKeyBytes);
PrivateKey privateKey2 = KeyPairUtils.getPrivateKeyFromPKCS8Base64String(RSA, base64Key);
```

### 解析公钥
```java
KeyPair keyPair = KeyPairUtils.generateKeyPair(CryptoConstants.RSA_ALGORITHM);

byte[] publicKeyBytes = keyPair.getPublic().getEncoded();
PublicKey publicKey1 = KeyPairUtils.getPublicKeyFromX509RawBytes(RSA, publicKeyBytes);

String base64Key = Base64.encodeBase64String(publicKeyBytes);
PublicKey publicKey2 = KeyPairUtils.getPublicKeyFromX509Base64String(RSA, base64Key);
```
