---
layout: doc
---

# XZ
`io.github.pangju666.commons.compress.utils.XZpUtils`

| 方法名        | 返回值     |        用途        |
|------------|:--------|:----------------:|
| isXZ       | boolean | 检查指定文件是否为有效的xz格式 |
| uncompress | void    |     解压缩xz文件      |
| compress   | void    |    压缩文件为xz文件     |

## 判断是否为gz文件
根据文件内容来判断文件类型，底层基于`tika`实现

```java
File file = new File("file.xz");
XzpUtils.isXZ(file);

byte[] bytes = FileUtils.readFileToByteArray(file);
XzpUtils.isXZ(bytes);

InputStream inputStream = FileUtils.openInputStream(file);
XzpUtils.isXZ(inputStream);
```

## 压缩
```java
File inputFile = new File("C:\logs");

File outputFile = new File("C:\output.xz");
XzpUtils.compress(inputFile, outputFile);

OutputStream ouputStream = FileUtis.openOutputStream(outputFile);
XzpUtils.compress(inputFile, outputFile);

InputStream inputStream = FileUtis.openInputStream(inputFile);
OutputStream ouputStream = FileUtis.openOutputStream(outputFile);
XzpUtils.compress(inputStream, ouputStream);
```

## 解压
```java
File outputFile = new File("C:\logs\xxx.txt");

File inputFile = new File("C:\output.xz");
XzpUtils.uncompress(inputFile, outputFile);

OutputStream ouputStream = FileUtis.openOutputStream(outputFile);
XzpUtils.uncompress(inputFile, ouputStream);

InputStream inputStream = FileUtils.openInputStream(inputFile);
OutputStream ouputStream = FileUtis.openOutputStream(outputFile);
XzpUtils.uncompress(inputStream, ouputStream);
```
