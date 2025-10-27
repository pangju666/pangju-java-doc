---
layout: doc
---

# Zip

## 工具类

`io.github.pangju666.commons.compress.utils.ZipUtils`

| 方法名        | 返回值     |        用途         |
|------------|:--------|:-----------------:|
| isZip      | boolean | 检查指定文件是否为有效的ZIP格式 |
| unCompress | void    |     解压缩ZIP文件      |
| compress   | void    |      压缩文件/目录      |

### 判断是否为zip文件
根据文件内容来判断文件类型，底层基于`tika`实现

```java
File file = new File("file.zip");
ZipUtils.isZip(file);

byte[] bytes = FileUtils.readFileToByteArray(file);
ZipUtils.isZip(bytes);

InputStream inputStream = FileUtils.openInputStream(file);
ZipUtils.isZip(inputStream);
```

### 压缩

#### 压缩单个文件或目录
```java
File inputFile = new File("C:\logs");

File outputFile = new File("C:\output.zip");
ZipUtils.compress(inputFile, outputFile);

OutputStream ouputStream = FileUtis.openOutputStream(outputFile);
ZipUtils.compress(inputFile, ouputStream);

ZipArchiveOutputStream zipArchiveOutputStream = new ZipArchiveOutputStream(outputStream);
ZipUtils.compress(inputFile, zipArchiveOutputStream);
```

#### 压缩多个文件或目录
```java
List<File> inputFiles = Arrays.asList(new File("C:\logs"), new File("C:\logs2"));

File outputFile = new File("C:\output.zip");
ZipUtils.compress(inputFiles, outputFile);

OutputStream ouputStream = FileUtis.openOutputStream(outputFile);
ZipUtils.compress(inputFiles, ouputStream);

ZipArchiveOutputStream zipArchiveOutputStream = new ZipArchiveOutputStream(outputStream);
ZipUtils.compress(inputFiles, zipArchiveOutputStream);
```

### 解压
```java
File outputDir = new File("C:\logs");

File inputFile = new File("C:\output.zip");
ZipUtils.unCompress(inputFile, outputDir);

byte[] inputBytes = FileUtils.readFileToByteArray(inputFile);
ZipUtils.unCompress(inputBytes, outputDir);

InputStream inputStream = FileUtils.openInputStream(inputFile);
ZipUtils.unCompress(inputStream, outputDir);

ZipFile zipFile = ZipFile.builder().setFile(inputFile).get()
ZipUtils.unCompress(zipFile, outputDir);

ZipArchiveInputStream zipArchiveInputStream = new ZipArchiveInputStream(inputFile)
ZipUtils.unCompress(zipArchiveInputStream, outputDir);
```
