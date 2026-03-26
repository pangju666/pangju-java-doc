---
layout: doc
---

# 工具类
`io.github.pangju666.commons.compress.utils.CompressUtils`

| 方法名              | 返回值  |        用途         |
|------------------|:-----|:-----------------:|
| compress         | void |      压缩文件或目录      |
| uncompress       | void | 将单文件格式压缩文件解压到输出流  |
| uncompressToFile | void | 将单文件格式压缩文件解压到目标文件 |
| uncompressToDir  | void |   将归档格式解压到目标目录    |

## 压缩单个文件
只支持将单个文件压缩为`xz`、`gz`、`tar`、`7z`、`zip`、`tgz`/`tar.gz` 这六种格式

> [!IMPORTANT]
> 如果输出文件格式不是上述的这六种会抛出`UnsupportedOperationException`异常

```java
File inputFile = new File("C:\logs\xxx.txt");

File outputFile = new File("C:\output.xz");
CompressUtils.compress(inputFile, outputFile);

File outputFile = new File("C:\output.gz");
CompressUtils.compress(inputFile, outputFile);

File outputFile = new File("C:\output.tar");
CompressUtils.compress(inputFile, outputFile);

File outputFile = new File("C:\output.7z");
CompressUtils.compress(inputFile, outputFile);

File outputFile = new File("C:\output.zip");
CompressUtils.compress(inputFile, outputFile);

File outputFile = new File("C:\output.tar.gz");
CompressUtils.compress(inputFile, outputFile);
```

## 压缩目录
只支持将目录压缩为`tar`、`7z`、`zip`、`tgz`/`tar.gz` 这四种格式

> [!IMPORTANT]
> 如果输出文件格式不是上述的这四种会抛出`UnsupportedOperationException`异常
> 
> 如果是`gz`或`xz`则会抛出`IllegalArgumentException`异常

```java
File inputDir = new File("C:\logs");

File outputFile = new File("C:\output.tar");
CompressUtils.compress(inputDir, outputFile);

File outputFile = new File("C:\output.7z");
CompressUtils.compress(inputDir, outputFile);

File outputFile = new File("C:\output.zip");
CompressUtils.compress(inputDir, outputFile);

File outputFile = new File("C:\output.tar.gz");
CompressUtils.compress(inputDir, outputFile);
```

## 压缩文件/目录集合
只支持将文件/目录集合压缩为`tar`、`7z`、`zip`、`tgz`/`tar.gz` 这四种格式

> [!IMPORTANT]
> 如果输出文件格式不是上述的这四种会抛出`UnsupportedOperationException`异常

```java
List<File> inputFiles = Arrays.asList(new File("C:\logs"), new File("C:\logs2"));

File outputFile = new File("C:\output.tar");
CompressUtils.compress(inputFiles, outputFile);

File outputFile = new File("C:\output.7z");
CompressUtils.compress(inputFiles, outputFile);

File outputFile = new File("C:\output.zip");
CompressUtils.compress(inputFiles, outputFile);

File outputFile = new File("C:\output.tar.gz");
CompressUtils.compress(inputFiles, outputFile);
```

## 解压到输出流/文件
只支持将`xz`、`gz`这两种格式的压缩文件解压到输出流/文件

> [!IMPORTANT]
> 如果输出文件格式不是上述的这两种会抛出`UnsupportedOperationException`异常

```java
File inputFile = new File("C:\output.xz");
// File inputFile = new File("C:\output.gz");

File outputFile = new File("C:\logs\xxx.txt");
CompressUtils.uncompress(inputFile, outputFile);

OutputStream ouputStream = FileUtis.openOutputStream(outputFile);
CompressUtils.uncompress(inputFile, ouputStream);
```

## 解压到目录
只支持将`tar`、`7z`、`zip`、`tgz`/`tar.gz` 这四种格式的压缩文件解压到目录

> [!IMPORTANT]
> 如果输出文件格式不是上述的这四种会抛出`UnsupportedOperationException`异常

```java
File outputDir = new File("C:\logs");

File inputFile = new File("C:\output.zip");
ZipUtils.uncompress(inputFile, outputDir);

File inputFile = new File("C:\output.7z");
ZipUtils.uncompress(inputFile, outputDir);

File inputFile = new File("C:\output.tar");
ZipUtils.uncompress(inputFile, outputDir);

File inputFile = new File("C:\output.tar");
ZipUtils.uncompress(inputFile, outputDir);

File inputFile = new File("C:\output.tar.gz");
ZipUtils.uncompress(inputFile, outputDir);
```
