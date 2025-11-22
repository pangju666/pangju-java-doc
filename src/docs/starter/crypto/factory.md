---
layout: doc
---

# 加/解密器工厂
`io.github.pangju666.framework.boot.crypto.factory.CryptoFactory`

## 概述
为二进制、文本、整型与高精度小数四类数据提供加密器与解密器的获取方法。

我默认自动装配了四种实现：
- AES256CryptoFactory（基于`PBEWithHMACSHA512AndAES_256`算法）
- BasicCryptoFactory（基于`PBEWithMD5AndDES`算法）
- RSACryptoFactory（基于`RSA/ECB/OAEPWithSHA-256AndMGF1Padding`算法）
- StrongCryptoFactory（基于`PBEWithMD5AndTripleDES`算法）

> [!NOTE]
> 四种默认实现的`Spring Bean`是同时存在的，所以使用时不能直接注入`CryptoFactory`类型的Bean，而是注入具体实现类型的Bean。
> 
> 当然，我更建议通过[`CryptoAlgorithm`](/starter/crypto/enums#获取加密工厂)来获取具体的工厂。

> [!IMPORTANT]
> 除了`RSA`的其他算法都是`PBE`类型的基于口令的算法，加解密使用的是同一口令。
> 
> `RSA`算法加密需要传入Base64编码的公钥，解密需要传入Base64编码的私钥
> 
> [RSA密钥文档](/commons/crypto/key#从base64编码字符串构建)

## 接口定义
```java
public interface CryptoFactory {
    /**
     * 获取字节数组加密器。
     *
     * @param key 密钥或口令；也可为占位符，具体由实现类解析
     * @return 字节数组加密器
     * @throws InvalidKeySpecException 密钥不可用或格式不合法时抛出
     * @since 1.0.0
     */
    BinaryEncryptor getBinaryEncryptor(String key) throws InvalidKeySpecException;

    /**
     * 获取大整数加密器。
     *
     * @param key 密钥或口令；也可为占位符，具体由实现类解析
     * @return 整型数字加密器
     * @throws InvalidKeySpecException 密钥不可用或格式不合法时抛出
     * @since 1.0.0
     */
    IntegerNumberEncryptor getIntegerNumberEncryptor(String key) throws InvalidKeySpecException;

    /**
     * 获取高精度小数加密器。
     *
     * @param key 密钥或口令；也可为占位符，具体由实现类解析
     * @return 高精度小数加密器
     * @throws InvalidKeySpecException 密钥不可用或格式不合法时抛出
     * @since 1.0.0
     */
    DecimalNumberEncryptor getDecimalNumberEncryptor(String key) throws InvalidKeySpecException;

    /**
     * 获取字节数组解密器。
     * <p>
     * 默认返回与加密器相同的实例；具体实现可覆盖以使用不同密钥或参数（如 RSA 私钥）。
     * </p>
     *
     * @param key 密钥或口令；也可为占位符，具体由实现类解析
     * @return 字节数组解密器
     * @throws InvalidKeySpecException 密钥不可用或格式不合法时抛出
     * @since 1.0.0
     */
    default BinaryEncryptor getBinaryDecryptor(String key) throws InvalidKeySpecException {
        return getBinaryEncryptor(key);
    }

    /**
     * 获取大整数解密器。
     * <p>
     * 默认返回与加密器相同的实例；具体实现可覆盖以使用不同密钥或参数（如 RSA 私钥）。
     * </p>
     *
     * @param key 密钥或口令；也可为占位符，具体由实现类解析
     * @return 整型数字解密器
     * @throws InvalidKeySpecException 密钥不可用或格式不合法时抛出
     * @since 1.0.0
     */
    default IntegerNumberEncryptor getIntegerNumberDecryptor(String key) throws InvalidKeySpecException {
        return getIntegerNumberEncryptor(key);
    }

    /**
     * 获取高精度小数解密器。
     * <p>
     * 默认返回与加密器相同的实例；具体实现可覆盖以使用不同密钥或参数。
     * </p>
     *
     * @param key 密钥或口令；也可为占位符，具体由实现类解析
     * @return 高精度小数解密器
     * @throws InvalidKeySpecException 密钥不可用或格式不合法时抛出
     * @since 1.0.0
     */
    default DecimalNumberEncryptor getDecimalNumberDecryptor(String key) throws InvalidKeySpecException {
        return getDecimalNumberEncryptor(key);
    }
}
```

## 使用示例
```java
@Service
public class CryptoService {
	public void test() {
	    // RSA加密
	    CryptoFactory cryptoFactory = CryptoAlgorithm.RSA.getFactory();
	    RSAKey rasKey = RSAKey.random();
	    String rawText = "hello world";
	    
	    // 加密
		String publicKey = Base64.encodeBase64String(rasKey.getPublicKey().getEncoded());
		String encryptText;
		try {
			encryptText = cryptoFactory.getTextEncryptor(publicKey).encrypt(rawText);
		} catch (InvalidKeySpecException e) {
			// 处理密钥无效异常
		} catch (EncryptionOperationNotPossibleException e) {
			// 处理加密失败异常
		}
		
		// 解密
		String privateKey = Base64.encodeBase64String(rasKey.getPrivateKey().getEncoded());
		String decryptText;
		try {
			decryptText = cryptoFactory.getTextDecryptor(privateKey).decrypt(encryptText);
		} catch (InvalidKeySpecException e) {
			// 处理密钥无效异常
		} catch (EncryptionOperationNotPossibleException e) {
			// 处理解密失败异常
		}
		
		// AES加密
		CryptoFactory cryptoFactory = CryptoAlgorithm.AES256.getFactory();
		String password = "123456";
	    String rawText = "hello world";
	    
	    // 加密
		String encryptText;
		try {
			encryptText = cryptoFactory.getTextEncryptor(password).encrypt(rawText);
		} catch (InvalidKeySpecException e) {
			// 处理密钥无效异常
		} catch (EncryptionOperationNotPossibleException e) {
			// 处理加密失败异常
		}
		
		// 解密
		String decryptText;
		try {
			decryptText = cryptoFactory.getTextDecryptor(password).decrypt(encryptText);
		} catch (InvalidKeySpecException e) {
			// 处理密钥无效异常
		} catch (EncryptionOperationNotPossibleException e) {
			// 处理解密失败异常
		}
	}
}
```

## 自定义算法
可以实现其他加密算法工厂，也可以替换掉上述的算法工厂默认实现。

### 自定义算法实现参考
```java
public class CustomCryptoFactory implements CryptoFactory {
	@Override
	public BinaryEncryptor getBinaryEncryptor(String key) throws InvalidKeySpecException {
		return null;
	}
	
	@Override
	public TextEncryptor getTextEncryptor(String key) throws InvalidKeySpecException {
		return null;
	}

	@Override
	public IntegerNumberEncryptor getIntegerNumberEncryptor(String key) throws InvalidKeySpecException {
		return null;
	}

	@Override
	public DecimalNumberEncryptor getDecimalNumberEncryptor(String key) throws InvalidKeySpecException {
		return null;
	}

	@Override
	public BinaryEncryptor getBinaryDecryptor(String key) throws InvalidKeySpecException {
		return null;
	}
	
	@Override
	public TextEncryptor getTextDecryptor(String key) throws InvalidKeySpecException {
		return null;
	}

	@Override
	public IntegerNumberEncryptor getIntegerNumberDecryptor(String key) throws InvalidKeySpecException {
		return null;
	}

	@Override
	public DecimalNumberEncryptor getDecimalNumberDecryptor(String key) throws InvalidKeySpecException {
		return null;
	}
}

@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public CustomCryptoFactory customCryptoFactory() {
		return new CustomCryptoFactory();
	}
}
```

### 替换RSA默认加密方案
`RSA`加密工厂可以修改默认的加密方案，默认使用`RSA/ECB/OAEPWithSHA-256AndMGF1Padding`，具体说明请查看[相关文档](/commons/crypto/transformation)。

```java
@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public RSACryptoFactory customRSACryptoFactory() {
		return new RSACryptoFactory(new RSAPKCS1PaddingTransformation());
	}
}
```

### 替换加密算法默认实现
可以直接继承内置的加密算法工厂，然后重写其中的逻辑，再将其定义为`Spring Bean`来替换默认实现。

```java
public class CustomAes256CryptoFactory extends AES256CryptoFactory {
	@Override
	public BinaryEncryptor getBinaryEncryptor(String key) {
		return null;
	}

	@Override
	public TextEncryptor getTextEncryptor(String key) {
		return null;
	}

	@Override
	public IntegerNumberEncryptor getIntegerNumberEncryptor(String key) {
		return null;
	}

	@Override
	public DecimalNumberEncryptor getDecimalNumberEncryptor(String key) {
		return null;
	}

	@Override
	public BinaryEncryptor getBinaryDecryptor(String key) throws InvalidKeySpecException {
		return null;
	}

	@Override
	public TextEncryptor getTextDecryptor(String key) throws InvalidKeySpecException {
		return null;
	}

	@Override
	public IntegerNumberEncryptor getIntegerNumberDecryptor(String key) throws InvalidKeySpecException {
		return null;
	}

	@Override
	public DecimalNumberEncryptor getDecimalNumberDecryptor(String key) throws InvalidKeySpecException {
		return null;
	}
}

@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public Aes256CryptoFactory customAes256CryptoFactory() {
		return new CustomAes256CryptoFactory();
	}
}
```
