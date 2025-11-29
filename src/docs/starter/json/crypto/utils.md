---
layout: doc
---

# 加密工厂注册与缓存
`io.github.pangju666.framework.boot.jackson.utils.CryptoFactoryRegistry`

用于在初始化[加密序列化器](/starter/json/crypto/encrypt)和[解密反序列化器](/starter/json/crypto/decrypt)时获取对应的加密工厂实例。

> [!NOTE]
> 主要用途就是如果无法从`Spring`获取到对应的加密算法工厂`Bean`，也能显式构造一个实例作为兜底。
>
> 如果你想实现自己的`Jackson`加解密操作，那这个类你会用的上的。

## 获取加密工厂
```java
// 先尝试从Spring获取，如果失败则尝试使用无参构造方法构建实例
CryptoFactory cryptoFactory = CryptoFactoryRegistry.getOrCreate(AES256CryptoFactory.class);
```

## 注册加密工厂
```java
CryptoFactoryRegistry.register(new CustomCryptoFactory());

// 获取注册过的实例
CryptoFactory cryptoFactory = CryptoFactoryRegistry.getOrCreate(CustomCryptoFactory.class);
```
