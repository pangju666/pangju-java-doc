---
layout: doc
---

# IO

## 工具类

`io.github.pangju666.commons.io.utils.IOUtils`

在继承`org.apache.commons.io.IOUtils`的基础上，我添加一些自己总结的通用方法

| 方法名                                   | 返回值          |            用途             |
|---------------------------------------|:-------------|:-------------------------:|
| getBufferSize                         | int          |      根据总大小获取推荐的缓冲区大小      |
| unsynchronizedBuffer                  | InputStream  |        创建非同步缓冲输入流         |
| toUnsynchronizedByteArrayInputStream  | InputStream  |       创建非同步字节数组输入流        |
| toUnsynchronizedByteArrayOutputStream | OutputStream |       创建非同步字节数组输出流        |
| encrypt                               | void         | AES/CBC/PKCS5Padding模式流加密 |
| decrypt                               | void         | AES/CBC/PKCS5Padding模式流解密 |
| encryptByCtr                          | void         |       使用AES/CTR模式加密       |
| decryptByCtr                          | void         |       使用AES/CTR模式解密       |

### 计算缓冲区

适用于需要缓冲区类型的输入流或输出流

缓冲区大小策略如下：

- 小于256KB：4KB
- 256KB~1MB：8KB
- 1MB~10MB：32KB
- 10MB~100MB：64KB
- 100MB~1GB：128KB
- \>=1GB：256KB

```java
IOUtils.getBufferSize(file);
```

### 打开输入流

#### 创建非同步缓冲输入流
不考虑线程安全的话，推荐用这个缓冲区输入流

```java
\\ 自动计算缓冲区大小
UnsynchronizedBufferedInputStream inputStream = IOUtils.unsynchronizedBuffer(inputStream);

\\ 自定义缓冲区大小
UnsynchronizedBufferedInputStream inputStream = IOUtils.unsynchronizedBuffer(inputStream, 4 * 1024);
```

#### 创建非同步字节数组输入流
不考虑线程安全的话，推荐用这个数组输入流

```java
\\ 自动计算缓冲区大小
UnsynchronizedBufferedInputStream inputStream = IOUtils.toUnsynchronizedByteArrayInputStream(byte[]);
```

#### 创建非同步字节数组输出流
不考虑线程安全的话，推荐用这个组输出流

```java
\\ 自定义缓冲区大小
UnsynchronizedByteArrayOutputStream outputStream = IOUtils.toUnsynchronizedByteArrayOutputStream(4 * 1024);

\\ 使用输入流初始化
UnsynchronizedByteArrayOutputStream outputStream = IOUtils.toUnsynchronizedByteArrayOutputStream(inputStream);

\\ 自定义缓冲区大小并使用输入流初始化
UnsynchronizedByteArrayOutputStream outputStream = IOUtils.toUnsynchronizedByteArrayOutputStream(inputStream, 4 * 1024);
```

### 流加解密
流长度不确定或比较大的话推荐使用`encryptByCtr`加密，`decryptByCtr`解密

#### AES/CBC/PKCS5Padding模式加密

```java
byte[] key = "1234567890123456".getBytes();
byte[] iv = RandomUtils.secureStrong().randomBytes(16);

// 加密流，密钥必须为16/24/32字节，iv只能为16字节，默认缓冲区为8192
IOUtils.encryptFile(inputStream, outputStream, key, iv);
// 加密流，密钥必须为16/24/32字节，iv只能为16字节，指定缓冲区为8192
IOUtils.encryptFile(inputStream, outputStream, key, iv, 8192);

// 解密流，密钥必须为16/24/32字节，iv只能为16字节，默认缓冲区为8192
IOUtils.decryptFile(inputStream, outputStream, key, iv);
// 加密流，密钥必须为16/24/32字节，iv只能为16字节，指定缓冲区为8192
IOUtils.decryptFile(inputStream, outputStream, key, iv, 8192);
```

#### AES/CTR模式加密

```java
byte[] key = "1234567890123456".getBytes();
byte[] iv = RandomUtils.secureStrong().randomBytes(16);

// CTR模式加密流，密钥必须为16/24/32字节，iv只能为16字节，默认缓冲区为8192
IOUtils.encryptFileByCtr(inputStream, outputStream, key, iv);
// CTR模式加密流，密钥必须为16/24/32字节，iv只能为16字节，指定缓冲区为8192
IOUtils.encryptFileByCtr(inputStream, outputStream, key, iv, 8192);

// CTR模式解密流，密钥必须为16/24/32字节，iv只能为16字节，默认缓冲区为8192
IOUtils.decryptFileByCtr(inputStream, outputStream, key, iv);
// CTR模式加密流，密钥必须为16/24/32字节，iv只能为16字节，指定缓冲区为8192
IOUtils.decryptFileByCtr(inputStream, outputStream, key, iv, 8192);
```
