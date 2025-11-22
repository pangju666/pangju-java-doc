---
layout: doc
---

# RSA密钥
`io.github.pangju666.commons.crypto.key.RSAKey`

一个用于封装RSA公私钥和一些常用功能的数据结构类

| 方法名              | 返回值           |          用途          |
|------------------|:--------------|:--------------------:|
| getPublicKey     | RSAPublicKey  |         获取公钥         |
| getPrivateKey    | RSAPrivateKey |         获取私钥         |
| random           | RSAKey        |      生成随机RSA密钥对      |
| fromKeyPair      | RSAKey        | 从现有KeyPair构建RSAKey实例 |
| fromBytes        | RSAKey        |    从字节数组构建RSAKey     |
| fromBase64String | RSAKey        | 从Base64编码字符串构建RSAKey |

## 获取密钥
```java
RSAKey rsaKey = RSAKey.random();
RSAPublicKey publicKey = rsaKey.getPublicKey(); //获取公钥
RSAPrivateKey privateKey = rsaKey.getPrivateKey(); // 获取私钥
```

## 生成随机密钥对
```java
RSAKey rsaKey1 = RSAKey.random(); // 生成默认长度(2048位)的随机RSA密钥对
RSAKey rsaKey2 = RSAKey.random(2048); // 生成指定长度的随机RSA密钥对，支持1024/2048/4096位三种标准密钥长度
```

## 从KeyPair构建
```java
// 算法必须是RSA
KeyPair keyPair = KeyPairUtils.generateKeyPair(CryptoConstants.RSA_ALGORITHM, 2048);
RSAKey rsaKey = RSAKey.fromKeyPair(keyPair);

// 可以自定义随机数生成器
KeyPair keyPair = KeyPairUtils.generateKeyPair(CryptoConstants.RSA_ALGORITHM, 2048, SecureRandom.getInstanceStrong());
RSAKey rsaKey = RSAKey.fromKeyPair(keyPair);
```

## 从字节数组构建

> [!IMPORTANT]
> 公钥必须符合`X.509`格式，私钥必须符合`PKCS#8`格式。

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
byte[] pkcs8EncodedKey = Base64.decodeBase64(pkcs8key
			.replace("-----BEGIN PRIVATE KEY-----", StringUtils.EMPTY)
			.replace("-----END PRIVATE KEY-----", StringUtils.EMPTY)
			.replaceAll("\\s", StringUtils.EMPTY));
			
String x509Key = "-----BEGIN PUBLIC KEY-----\n" +
			"MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOsaqNb3Rbl1Kr14Y+/9LEv0BBzXcpx9\n" +
			"e028FpzK2Bb6nc9ECnUnx/C3bov+TFT0ydi6ftY47WhCUEMIpGBxUycCAwEAAQ==\n" +
			"-----END PUBLIC KEY-----";

// 如果使用字节数组构建，需要自行去除头尾和换行符再解码BASE64
byte[] x509EncodedKey = Base64.decodeBase64(x509Key
			.replace("-----BEGIN PUBLIC KEY-----", StringUtils.EMPTY)
			.replace("-----END PUBLIC KEY-----", StringUtils.EMPTY)
			.replaceAll("\\s", StringUtils.EMPTY));			
			
RSAKey rsaKey = RSAKey.fromBytes(x509EncodedKey, pkcs8EncodedKey);

// 也可以只传入公私钥中的任意一个
RSAKey rsaKey2 = RSAKey.fromBytes(null, pkcs8EncodedKey);
RSAKey rsaKey3 = RSAKey.fromBytes(x509EncodedKey, null);

// 如果传入无效密钥
RSAKey rsaKey4 = RSAKey.fromBytes("invalid", pkcs8EncodedKey); // 抛出InvalidKeySpecException
```

## 从Base64编码字符串构建

> [!IMPORTANT]
> 公钥必须符合`X.509`格式，私钥必须符合`PKCS#8`格式。

```java
// X.509格式的公钥
String base64Public = "-----BEGIN PUBLIC KEY-----\n" +
			"MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOsaqNb3Rbl1Kr14Y+/9LEv0BBzXcpx9\n" +
			"e028FpzK2Bb6nc9ECnUnx/C3bov+TFT0ydi6ftY47WhCUEMIpGBxUycCAwEAAQ==\n" +
			"-----END PUBLIC KEY-----";
// PKCS#8格式的私钥
String base64Private = "-----BEGIN PRIVATE KEY-----\n" +
			"MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEA6xqo1vdFuXUqvXhj\n" +
			"7/0sS/QEHNdynH17TbwWnMrYFvqdz0QKdSfH8Ldui/5MVPTJ2Lp+1jjtaEJQQwik\n" +
			"YHFTJwIDAQABAkAumYQpx61cSysDjx9P7EChdWZzSQkAl6afC873mQUn2He2+Hk8\n" +
			"SMeV0eCSXOvVjEs8V1PFU1qiciPjqEUQc1SBAiEA+TEJMv5t39huX6DXwfKYDBCk\n" +
			"VC5O8g9Kui5ShVkyO6ECIQDxhxbuOw07fCxlWcxa9XTO9DhgZ69VS925NB86A2pZ\n" +
			"xwIhAMMWrMkLgCG7Y83iMohY0MjBTqXJC21eo3ZXRau4RSeBAiARAvrSfMZJ0k0u\n" +
			"Nkz2eyNnEDyITcVDtLxBNzKb23G6MQIgJj43Dh+mwqeonBgtCVswXwwbEy0mxnoP\n" +
			"3+2hW7LVM3E=\n" +
			"-----END PRIVATE KEY-----";
RSAKey rsaKey = RSAKey.fromBase64String(base64Public, base64Private);

// 也可以只传入公私钥中的任意一个
RSAKey rsaKey2 = RSAKey.fromBase64String(null, base64Private);
RSAKey rsaKey3 = RSAKey.fromBase64String(base64Public, null);

// 如果传入无效密钥
RSAKey rsaKey4 = RSAKey.fromBase64String("invalid", base64Private); // 抛出InvalidKeySpecException
```
