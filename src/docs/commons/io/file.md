---
layout: doc
---

# 文件

## 文件类型

`io.github.pangju666.commons.io.enums.FileType`

| 枚举值      | 说明  | 类型集合                                                                                                                                                                                                                                                                                                                                      | 类型前缀   |
|----------|:----|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------|
| IMAGE    | 图片  |                                                                                                                                                                                                                                                                                                                                           | image/ |
| TEXT     | 文本  |                                                                                                                                                                                                                                                                                                                                           | text/  |
| AUDIO    | 音频  |                                                                                                                                                                                                                                                                                                                                           | audio/ |
| MODEL    | 模型  |                                                                                                                                                                                                                                                                                                                                           | model/ |
| VIDEO    | 视频  | Collections.singleton("application/vnd.apple.mpegurl")                                                                                                                                                                                                                                                                                    | video/ |
| COMPRESS | 压缩包 | Set.of("application/x-tar", "application/x-gzip", "application/x-bzip", "application/x-bzip2","application/zip", "application/x-uc2-compressed", "application/x-rar-compressed","application/x-ace-compressed", "application/x-7z-compressed", "application/vnd.ms-cab-compressed")                                                       |        |
| DOCUMENT | 文档  | Set.of("application/pdf", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.ms-powerpoint") |        |

## 文件名

`io.github.pangju666.commons.io.utils.FilenameUtils`

在继承`org.apache.commons.io.FilenameUtils`的基础上，我添加一些自己总结的通用方法

| 方法名              | 返回值     |        用途         |
|------------------|:--------|:-----------------:|
| getMimeType      | String  |    获取文件MIME类型     |
| isImageType      | boolean |     判断是否为图片类型     |
| isTextType       | boolean |     判断是否为文本类型     |
| isModelType      | boolean |     判断是否为模型类型     |
| isVideoType      | boolean |     判断是否为视频类型     |
| isAudioType      | boolean |     判断是否为音频类型     |
| isMimeType       | boolean |     判断是否为指定类型     |
| isAnyMimeType    | boolean |     判断是否为任一类型     |
| rename           | String  | 完全替换文件名（包含名称和扩展名） |
| replaceBaseName  | String  | 替换文件基名（保留扩展名和路径）  |
| replaceExtension | String  |      替换文件扩展名      |
| isDirectoryPath  | boolean |    判断路径是否为目录路径    |
| isFilePath       | boolean |    判断路径是否为文件路径    |

### 获取文件类型

根据文件拓展名来获取文件类型，准确性高不高

```java
String mimeType1 = FilenameUtils.getMimeType("test.png"); // image/png
String mimeType2 = FilenameUtils.getMimeType(null); // null
String mimeType2 = FilenameUtils.getMimeType("test.test"); // 无法识别的类型会返回 application/octet-stream
```

### 判断文件类型

根据文件拓展名来判断文件类型，准确性高不高

```java
FilenameUtils.isImageType("test.png"); // true
FilenameUtils.isTextType("test.txt"); // true
FilenameUtils.isModelType("test.obj"); // true
FilenameUtils.isVideoType("test.mp4"); // true
FilenameUtils.isAudioType("test.mp3"); // true

FilenameUtils.isMimeType("test.png", "image/png"); // true
FilenameUtils.isMimeType("test.png", "video/mp4"); // false

// 判断是否为任一类型
FilenameUtils.isAnyMimeType("test.png", "image/png", "video/mp4"); // true
FilenameUtils.isAnyMimeType("test.png", Set.of("image/png", "video/mp4")); // true
```

### 修改文件名

只是从文件名层次重命名，不会涉及IO操作

```java
// 重命名文件名，保留父路径
FilenameUtils.rename("C:/docs/report.pdf", "test.png"); // C:/docs/test.png

// 替换文件名，保留父路径和拓展名
FilenameUtils.replaceBaseName("C:/docs/report.pdf", "test.png"); // C:/docs/test.png.pdf
FilenameUtils.replaceBaseName("C:/docs/report.pdf", "test"); // C:/docs/test.pdf

// 替换拓展名，保留父路径和文件名
FilenameUtils.replaceExtension("C:/docs/report.pdf", "png"); // C:/docs/report.png
FilenameUtils.replaceExtension("C:/docs/report.pdf", "test.png"); // C:/docs/report.test.png
```

### 判断路径

```java
// 判断是否为目录路径
FilenameUtils.isDirectoryPath("C:/logs/"); // true
FilenameUtils.isDirectoryPath("C:/logs"); // false
FilenameUtils.isDirectoryPath("C:/docs/report.pdf"); // false

// 判断是否为文件路径
FilenameUtils.isFilePath("C:/logs/"); // false
FilenameUtils.isFilePath("C:/logs"); // true
FilenameUtils.isFilePath("C:/docs/report.pdf"); // true
```

## 文件

`io.github.pangju666.commons.io.utils.FileUtils`

在继承`org.apache.commons.io.FileUtils`的基础上，我添加一些自己总结的通用方法

| 方法名                                   | 返回值                  |              用途              |
|---------------------------------------|:---------------------|:----------------------------:|
| getBufferSize                         | int                  |       根据文件大小计算最佳缓冲区大小        |
| getSlidingBufferSize                  | int                  |      根据文件大小计算滑动窗口缓冲区大小       |
| openUnsynchronizedBufferedInputStream | InputStream          |          打开非同步缓冲输入流          |
| openBufferedFileChannelInputStream    | InputStream          |         打开缓冲文件通道输入流          |
| openMemoryMappedFileInputStream       | InputStream          |         打开内存映射文件输入流          |
| encryptFile                           | void                 | 使用AES/CBC/PKCS5Padding模式加密文件 |
| decryptFile                           | void                 | 使用AES/CBC/PKCS5Padding模式解密文件 |
| encryptFileByCtr                      | void                 |       使用AES/CTR模式加密文件        |
| decryptFileByCtr                      | void                 |        AES/CTR模式文件解密         |
| forceDeleteIfExist                    | void                 |       强制删除文件或目录（如果存在）        |
| deleteIfExist                         | void                 |         条件删除文件（如果存在）         |
| exist                                 | boolean              |         检查文件或目录是否存在          |
| notExist                              | boolean              |         检查文件或目录是否不存在         |
| existFile                             | boolean              |          检查常规文件是否存在          |
| notExistFile                          | boolean              |         检查常规文件是否不存在          |
| parseMetaData                         | Map\<String, String> |          解析文件内容元数据           |
| getMimeType                           | String               |         获取文件真实MIME类型         |
| isImageType                           | boolean              |          检测是否为图片文件           |
| isTextType                            | boolean              |          检测是否为文本文件           |
| isModelType                           | boolean              |          检测是否为模型文件           |
| isVideoType                           | boolean              |          检测是否为视频文件           |
| isAudioType                           | boolean              |          检测是否为音频文件           |
| isMimeType                            | boolean              |         判断文件是否为指定类型          |
| isAnyMimeType                         | boolean              |         判断文件是否为任一类型          |
| rename                                | File                 |          安全重命名文件或目录          |
| replaceBaseName                       | File                 |        替换文件基名（保留扩展名）         |
| replaceExtension                      | File                 |           替换文件扩展名            |
| check                                 | boolean              |        基础文件校验（存在性检查）         |
| checkFile                             | boolean              |         常规文件校验（类型检查）         |
| checkFileIfExist                      | boolean              |       条件文件校验（存在时才验证类型）       |

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
FileUtils.getBufferSize(file);
```

### 计算滑动窗口缓冲区

需要配合`openMemoryMappedFileInputStream(File)`方法使用

分块策略：

- 小文件(100MB以下)：4MB
- 中等文件(100MB~1GB)：16MB
- 大文件(1GB~10GB)：32MB
- 超大文件(10GB以上)：64MB

```java
FileUtils.getSlidingBufferSize(file);
```

### 打开文件输入流

使用建议：

1. 首先考虑是否在意线程安全，不在意则使用`openUnsynchronizedBufferedInputStream(File)`
2. 其次考虑是否为超大文件，不是则使用`openInputStream(File)`
3. 其次考虑是否在意内存占用，不在意则使用`openMemoryMappedFileInputStream(File)`
4. 不满足以上条件的话，使用`openBufferedFileChannelInputStream(File)`

### 文件加解密

大文件推荐使用`encryptFileByCtr`加密，`decryptFileByCtr`解密

#### AES/CBC/PKCS5Padding模式加密

```java
File inputFile = new File("input.txt");
File outputFile = new File("output.txt");
byte[] key = "1234567890123456".getBytes();
byte[] IV_16 = "1234567890123456".getBytes();

// 加密文件，密钥只能为16字节，iv同密钥
FileUtils.encryptFile(inputFile, outputFile, key);
// 加密文件，密钥必须为16/24/32字节，iv只能为16字节
FileUtils.encryptFile(inputFile, outputFile, key, IV_16);

// 解密文件，密钥只能为16字节，iv同密钥
FileUtils.decryptFile(outputFile, inputFile, key);
// 加密文件，密钥必须为16/24/32字节，iv只能为16字节
FileUtils.decryptFile(outputFile, inputFile, key, IV_16);
```

#### AES/CTR模式加密

```java
File inputFile = new File("input.txt");
File outputFile = new File("output.txt");
byte[] key = "1234567890123456".getBytes();
byte[] IV_16 = "1234567890123456".getBytes();

// CTR模式加密文件，密钥只能为16字节，iv同密钥
FileUtils.encryptFileByCtr(inputFile, outputFile, key);
// CTR模式加密文件，密钥必须为16/24/32字节，iv只能为16字节
FileUtils.encryptFileByCtr(inputFile, outputFile, key, IV_16);

// CTR模式解密文件，密钥只能为16字节，iv同密钥
FileUtils.decryptFileByCtr(outputFile, inputFile, key);
// CTR模式加密文件，密钥必须为16/24/32字节，iv只能为16字节
FileUtils.decryptFileByCtr(outputFile, inputFile, key, IV_16);
```

### 文件删除

#### 强制删除

在`forceDelete`的基础上，增加了文件是否存在判断

```java
FileUtils.forceDeleteIfExist(file); // 文件不存在时，则不执行删除操作
```

#### 正常删除

在`delete`的基础上，增加了文件是否存在判断

```java
FileUtils.deleteIfExist(file); // 文件不存在时，则不执行删除操作
```

### 判断文件是否存在

```java
FileUtils.exist(null); // false
FileUtils.exist(file); // 文件或目录存在则返回true

FileUtils.notExist(null); // true
FileUtils.notExist(file); //  文件或目录不存在则返回true

FileUtils.existFile(null); // false
FileUtils.existFile(file); // 文件存在则返回true，如果是目录则返回false

FileUtils.notExistFile(null); // true
FileUtils.notExistFile(file); // 文件不存在则返回true，如果是目录则返回true
```

### 解析元数据

底层基于`tika`实现，支持格式示例：

| 类型   | 示例格式               |     可提取元数据      |
|------|:-------------------|:---------------:|
| 文档类  | PDF/DOCX/XLSX/PPTX | 作者、页数、创建时间、修改时间 |
| 多媒体  | MP3/MP4/JPEG/PNG   | 专辑、时长、分辨率、拍摄参数  |
| 压缩文件 | ZIP/RAR/7Z         |   条目数、压缩方法、注释   |
| 其他   | HTML/XML/JSON      | 编码、字符集、DOCTYPE  |

```java
Map<String, String> metaData = FileUtils.parseMetaData(file);
```

### 获取文件类型

根据文件内容来判断文件类型，底层基于`tika`实现，如果不在意IO操作的话，推荐使用这个方法获取文件类型

```java
FileUtils.getMimeType("test.png"); // image/png
```

### 判断文件类型

根据文件内容来判断文件类型，底层基于`tika`实现，如果不在意IO操作的话，推荐使用这个方法判断文件类型

```java
FileUtils.isImageType("test.png"); // true
FileUtils.isTextType("test.txt"); // true
FileUtils.isModelType("test.obj"); // true
FileUtils.isVideoType("test.mp4"); // true
FileUtils.isAudioType("test.mp3"); // true

FileUtils.isMimeType("test.png", "image/png"); // true
FileUtils.isMimeType("test.png", "video/mp4"); // false

// 判断是否为任一类型
FileUtils.isAnyMimeType("test.png", "image/png", "video/mp4"); // true
FileUtils.isAnyMimeType("test.png", Set.of("image/png", "video/mp4")); // true
```

### 修改文件名
```java
// 重命名文件名，保留父路径
FileUtils.rename(new File("C:/docs/report.pdf"), "test.png")); // C:/docs/test.png

// 替换文件名，保留父路径和拓展名
FileUtils.replaceBaseName(new File("C:/docs/report.pdf"), "test.png"); // C:/docs/test.png.pdf
FileUtils.replaceBaseName(new File("C:/docs/report.pdf"), "test"); // C:/docs/test.pdf

// 替换拓展名，保留父路径和文件名
FileUtils.replaceExtension(new File("C:/docs/report.pdf"), "png"); // C:/docs/report.png
FileUtils.replaceExtension(new File("C:/docs/report.pdf"), "test.png"); // C:/docs/report.test.png
```

### 检查文件有效性
主要是写库校验参数用的，业务开发里面应该是用不上的

```java
// 参数为 null则抛出 new NullPointerException("参数不可为 null")，文件或目录不存在则抛出 FileNotFoundException
FileUtils.check(new File("C:/docs/report.pdf"), "参数不可为 null"));

// 参数为 null则抛出 new NullPointerException("参数不可为 null")，文件不存在则抛出 FileNotFoundException，如果是目录则抛出 IllegalArgumentException
FileUtils.checkFile(new File("C:/docs/report.pdf"), "参数不可为 null"));

// 参数为 null则抛出 new NullPointerException("参数不可为 null")，文件存在且为目录则抛出 IllegalArgumentException
FileUtils.checkFileIfExist(new File("C:/docs/report.pdf"), "test");
```
