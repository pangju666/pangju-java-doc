---
layout: doc
---

# 常量
`io.github.pangju666.commons.crypto.lang.CryptoConstants`

| 常量名                         | 值                        |                         说明                         |
|-----------------------------|:-------------------------|:--------------------------------------------------:|
| RSA_ALGORITHM               | RSA                      | RSA 算法标准名称（对应 Java Cryptography Architecture 标准名称） |
| DIFFIE_HELLMAN_ALGORITHM    | DiffieHellman            |             Diffie-Hellman 密钥交换算法标准名称              |
| DSA_ALGORITHM               | DSA                      |                  DSA（数字签名算法）标准名称                   |
| RSA_DEFAULT_KEY_SIZE        | 2048                     |                 RSA 默认密钥长度（单位：bit）                 |
| RSA_KEY_SIZE_SET            | Set.of(1024, 2048, 4096) |               允许的 RSA 密钥长度集合（单位：bit）               |
| DIFFIE_HELLMAN_KEY_SIZE_SET | Set.of(1024, 2048, 4096) |         允许的 Diffie-Hellman 密钥长度集合（单位：bit）          |
| DSA_KEY_SIZE_SET            | Set.of(1024, 2048)       |               允许的 DSA 密钥长度集合（单位：bit）               |
