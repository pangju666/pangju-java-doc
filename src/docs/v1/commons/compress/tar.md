---
layout: doc
---

# Tar
`io.github.pangju666.commons.compress.utils.TarUtils`

| 方法名        | 返回值     |        用途         |
|------------|:--------|:-----------------:|
| isTar      | boolean | 检查指定文件是否为有效的Tar格式 |
| uncompress | void    |     解压缩TAR文件      |
| compress   | void    |   压缩文件/目录为TAR文件   |

## 判断是否为tar文件
根据文件内容来判断文件类型，底层基于`tika`实现

```java
File file = new File("file.tar");
TarUtils.isTar(file);

byte[] bytes = FileUtils.readFileToByteArray(file);
TarUtils.isTar(bytes);

InputStream inputStream = FileUtils.openInputStream(file);
TarUtils.isTar(inputStream);
```

## 压缩

### 压缩单个文件或目录
```java
File inputFile = new File("C:\logs");

File outputFile = new File("C:\output.tar");
TarUtils.compress(inputFile, outputFile);

OutputStream ouputStream = FileUtis.openOutputStream(outputFile);
TarUtils.compress(inputFile, ouputStream);

TarArchiveOutputStream tarArchiveOutputStream = new TarArchiveOutputStream(outputStream);
TarUtils.compress(inputFile, tarArchiveOutputStream);
```

### 压缩多个文件或目录
```java
List<File> inputFiles = Arrays.asList(new File("C:\logs"), new File("C:\logs2"));

File outputFile = new File("C:\output.tar");
TarUtils.compress(inputFiles, outputFile);

OutputStream ouputStream = FileUtis.openOutputStream(outputFile);
TarUtils.compress(inputFiles, ouputStream);

TarArchiveOutputStream tarArchiveOutputStream = new TarArchiveOutputStream(outputStream);
TarUtils.compress(inputFiles, tarArchiveOutputStream);
```

## 解压
```java
File outputDir = new File("C:\logs");

File inputFile = new File("C:\output.tar");
TarUtils.uncompress(inputFile, outputDir);

byte[] inputBytes = FileUtils.readFileToByteArray(inputFile);
TarUtils.uncompress(inputBytes, outputDir);

InputStream inputStream = FileUtils.openInputStream(inputFile);
TarUtils.uncompress(inputStream, outputDir);

TarFile tarFile = new TarFile(inputFile);
TarUtils.uncompress(tarFile, outputDir);

TarArchiveInputStream tarArchiveInputStream = new TarArchiveInputStream(inputFile)
TarUtils.uncompress(tarArchiveInputStream, outputDir);
```
