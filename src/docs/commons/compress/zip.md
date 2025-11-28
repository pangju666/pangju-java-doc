---
layout: doc
---

# Zip
`io.github.pangju666.commons.compress.utils.ZipUtils`

| 方法名        | 返回值     |        用途         |
|------------|:--------|:-----------------:|
| isZip      | boolean | 检查指定文件是否为有效的zip文件 |
| uncompress | void    |     解压缩zip文件      |
| compress   | void    |   压缩文件/目录为zip文件   |

> [!TIP]
> 如果需要加密或解密zip文件，请使用[`zip4j`](/dependencies/dependency-management#zip4j)。

## 判断是否为zip文件
根据文件内容来判断文件类型，底层基于`tika`实现

```java
File file = new File("file.zip");
ZipUtils.isZip(file);

byte[] bytes = FileUtils.readFileToByteArray(file);
ZipUtils.isZip(bytes);

InputStream inputStream = FileUtils.openInputStream(file);
ZipUtils.isZip(inputStream);
```

## 压缩

### 压缩单个文件或目录
```java
File inputFile = new File("C:\logs");

File outputFile = new File("C:\output.zip");
ZipUtils.compress(inputFile, outputFile);

OutputStream ouputStream = FileUtis.openOutputStream(outputFile);
ZipUtils.compress(inputFile, ouputStream);

ZipArchiveOutputStream zipArchiveOutputStream = new ZipArchiveOutputStream(outputStream);
ZipUtils.compress(inputFile, zipArchiveOutputStream);
```

### 压缩多个文件或目录
```java
List<File> inputFiles = Arrays.asList(new File("C:\logs"), new File("C:\logs2"));

File outputFile = new File("C:\output.zip");
ZipUtils.compress(inputFiles, outputFile);

OutputStream ouputStream = FileUtis.openOutputStream(outputFile);
ZipUtils.compress(inputFiles, ouputStream);

ZipArchiveOutputStream zipArchiveOutputStream = new ZipArchiveOutputStream(outputStream);
ZipUtils.compress(inputFiles, zipArchiveOutputStream);
```

## 解压
```java
File outputDir = new File("C:\logs");

File inputFile = new File("C:\output.zip");
ZipUtils.uncompress(inputFile, outputDir);

byte[] inputBytes = FileUtils.readFileToByteArray(inputFile);
ZipUtils.uncompress(inputBytes, outputDir);

InputStream inputStream = FileUtils.openInputStream(inputFile);
ZipUtils.uncompress(inputStream, outputDir);

ZipFile zipFile = ZipFile.builder().setFile(inputFile).get()
ZipUtils.uncompress(zipFile, outputDir);

ZipArchiveInputStream zipArchiveInputStream = new ZipArchiveInputStream(inputFile)
ZipUtils.uncompress(zipArchiveInputStream, outputDir);
```
