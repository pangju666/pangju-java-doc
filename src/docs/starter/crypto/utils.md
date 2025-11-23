---
layout: doc
---

# 工具类
`io.github.pangju666.framework.boot.crypto.utils.CryptoUtils`

## 概述
提供对字节数组、字符串、`BigInteger`、`BigDecimal` 等类型的通用加/解密能力，并封装了常见编码（`Base64`、`Hex`）及密钥占位符解析（如`${...}`）的辅助逻辑。

| 方法名               | 返回值        |                          用途                          |
|-------------------|:-----------|:----------------------------------------------------:|
| encrypt           | byte[]     |                        加密字节数组                        |
| decrypt           | byte[]     |                        解密字节数组                        |
| encryptString     | String     |                    加密字符串并按指定编码输出                     |
| decryptString     | String     |                解密字符串（先按指定编码解码，再进行解密）                 |
| encryptBigInteger | BigInteger |                        加密大整数                         |
| decryptBigInteger | BigInteger |                        解密大整数                         |
| encryptBigDecimal | BigDecimal |                       加密高精度小数                        |
| decryptBigDecimal | BigDecimal |                       解密高精度小数                        |
| getKey            | String     | 解析密钥字符串，支持明文密钥与占位符密钥。占位符形如 ${crypto.key}；明文密钥直接返回入参。 |

## 加/解密示例

```java
CryptoFactory cryptoFactory = CryptoAlgorithm.AES256.getFactory(); // 返回AES256CryptoFactory实例对象

byte[] rawData;
byte[] encryptBytes = CryptoUtils.encrypt(cryptoFactory, rawData, "123456");
byte[] decryptBytes = CryptoUtils.decrypt(cryptoFactory, encryptBytes, "123456");

String rawText;
// 加密文本并使用 Base64 编码
String encryptText = CryptoUtils.encryptString(cryptoFactory, rawText, "123456", Encoding.BASE64);
// 先使用 Base64 解码，再解密文本
String decryptText = CryptoUtils.decryptString(cryptoFactory, encryptText, "123456", Encoding.BASE64);

BigInteger rawNumber;
BigInteger encryptNumber = CryptoUtils.encryptBigInteger(cryptoFactory, rawNumber, "123456");
BigInteger decryptNumber = CryptoUtils.decryptBigInteger(cryptoFactory, encryptNumber, "123456");

BigDecimal rawNumber;
BigDecimal encryptNumber = CryptoUtils.encryptBigInteger(cryptoFactory, rawNumber, "123456");
BigDecimal decryptNumber = CryptoUtils.decryptBigInteger(cryptoFactory, encryptNumber, "123456");
```

## 获取密钥

```java
// 如果密钥为 null、空白则抛出 IllegalArgumentException
String key = CryptoUtils.getKey("123456", true); // 直接返回明文

// 如果密钥为 null、空白或无法从 Spring 配置中获取则抛出 IllegalArgumentException
String key = CryptoUtils.getKey("${crypto.key}", true); // 根据属性路径 crypto.key，从Spring配置中获取
```
