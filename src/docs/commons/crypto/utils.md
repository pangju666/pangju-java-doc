---
layout: doc
---

# 工具类

## 密钥对工具类
`io.github.pangju666.commons.crypto.utils.KeyPairUtils`

| 方法名                                | 返回值        |             用途             |
|------------------------------------|:-----------|:--------------------------:|
| getKeyFactory                      | KeyFactory |        获取指定算法的密钥工厂         |
| generateKeyPair                    | KeyPair    |         生成指定算法的密钥对         |
| getPrivateKeyFromPKCS8EncodedKey   | PrivateKey |   从PKCS#8格式的原始字节数组中解析私钥    |
| getPublicKeyFromX509EncodedKey     | PublicKey  | 从X.509格式的Base64编码字符串中解析公钥  |
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

### 解析PKCS#8格式私钥
```java
String pkcs8key = "-----BEGIN PRIVATE KEY-----\n" +
			"MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEA6xqo1vdFuXUqvXhj\n" +
			"7/0sS/QEHNdynH17TbwWnMrYFvqdz0QKdSfH8Ldui/5MVPTJ2Lp+1jjtaEJQQwik\n" +
			"YHFTJwIDAQABAkAumYQpx61cSysDjx9P7EChdWZzSQkAl6afC873mQUn2He2+Hk8\n" +
			"SMeV0eCSXOvVjEs8V1PFU1qiciPjqEUQc1SBAiEA+TEJMv5t39huX6DXwfKYDBCk\n" +
			"VC5O8g9Kui5ShVkyO6ECIQDxhxbuOw07fCxlWcxa9XTO9DhgZ69VS925NB86A2pZ\n" +
			"xwIhAMMWrMkLgCG7Y83iMohY0MjBTqXJC21eo3ZXRau4RSeBAiARAvrSfMZJ0k0u\n" +
			"Nkz2eyNnEDyITcVDtLxBNzKb23G6MQIgJj43Dh+mwqeonBgtCVswXwwbEy0mxnoP\n" +
			"3+2hW7LVM3E=\n" +
			"-----END PRIVATE KEY-----";

// 如果使用字节数组构建，需要自行去除头尾和换行符再解码BASE64
byte[] encodedKey = Base64.decodeBase64(pkcs8key
			.replace("-----BEGIN PRIVATE KEY-----", StringUtils.EMPTY)
			.replace("-----END PRIVATE KEY-----", StringUtils.EMPTY)
			.replaceAll("\\s", StringUtils.EMPTY));
PrivateKey privateKey1 = KeyPairUtils.getPrivateKeyFromPKCS8EncodedKey(CryptoConstants.RSA_ALGORITHM, encodedKey);

PrivateKey privateKey2 = KeyPairUtils.getPrivateKeyFromPKCS8Base64String(CryptoConstants.RSA_ALGORITHM, pkcs8key);
```

### 解析X.509格式公钥
```java
String x509Key = "-----BEGIN PUBLIC KEY-----\n" +
			"MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOsaqNb3Rbl1Kr14Y+/9LEv0BBzXcpx9\n" +
			"e028FpzK2Bb6nc9ECnUnx/C3bov+TFT0ydi6ftY47WhCUEMIpGBxUycCAwEAAQ==\n" +
			"-----END PUBLIC KEY-----";

// 如果使用字节数组构建，需要自行去除头尾和换行符再解码BASE64
byte[] encodedKey = Base64.decodeBase64(x509Key
			.replace("-----BEGIN PUBLIC KEY-----", StringUtils.EMPTY)
			.replace("-----END PUBLIC KEY-----", StringUtils.EMPTY)
			.replaceAll("\\s", StringUtils.EMPTY));
PublicKey publicKey1 = KeyPairUtils.getPublicKeyFromX509EncodedKey(CryptoConstants.RSA_ALGORITHM, encodedKey);

PublicKey publicKey2 = KeyPairUtils.getPublicKeyFromX509Base64String(CryptoConstants.RSA_ALGORITHM, x509Key);
```
