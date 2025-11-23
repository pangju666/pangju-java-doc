---
layout: doc
---

# 枚举

## 加密算法枚举
io.github.pangju666.framework.boot.crypto.enums.CryptoAlgorithm

| 枚举值    | 算法                                    | 加密工厂类型              | 说明                                                            |
|--------|:--------------------------------------|:--------------------|:--------------------------------------------------------------|
| RSA    | RSA/ECB/OAEPWithSHA-256AndMGF1Padding | RSACryptoFactory    | RSA 非对称加密算法，基于公钥/私钥的非对称加密与签名算法，安全性高，适用于密钥交换、短消息加密或签名校验等场景。    |
| AES256 | PBEWithHMACSHA512AndAES_256           | AES256CryptoFactory | AES‑256 对称加密算法，使用 256 位密钥的高级加密标准算法，性能与安全性兼顾，适用于大多数业务数据的高效加解密。 |
| BASIC  | PBEWithMD5AndDES                      | BasicCryptoFactory  | 普通强度 DES 对称加密算法                                               |
| STRONG | PBEWithMD5AndTripleDES                | StrongCryptoFactory | 高强度 DES 对称加密算法，提供更强的安全策略或多算法组合能力，适合对安全性要求更高的场景。               |


### 获取加密工厂类型
```java
Class<? extends CryptoFactory> cryptoFactory = CryptoAlgorithm.RSA.getFactoryClass(); // 返回Class<RSACryptoFactory>
```

## 文本编码类型枚举
io.github.pangju666.framework.boot.crypto.enums.Encoding

| 枚举值    | 说明       |
|--------|:---------|
| BASE64 | BASE64编码 |
| HEX    | 十六进制编码   | 
