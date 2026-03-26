---
layout: doc
---

# GZip
`io.github.pangju666.commons.compress.utils.GZipUtils`

| 方法名        | 返回值     |         用途         |
|------------|:--------|:------------------:|
| isGZip     | boolean | 检查指定文件是否为有效的gzip格式 |
| uncompress | void    |      解压缩gz文件       |
| compress   | void    |     压缩文件为gz文件      |

## 判断是否为gz文件
根据文件内容来判断文件类型，底层基于`tika`实现

```java
File file = new File("file.gz");
GZipUtils.isGZip(file);

byte[] bytes = FileUtils.readFileToByteArray(file);
GZipUtils.isGZip(bytes);

InputStream inputStream = FileUtils.openInputStream(file);
GZipUtils.isGZip(inputStream);
```

## 压缩
```java
File inputFile = new File("C:\logs");

File outputFile = new File("C:\output.gz");
GZipUtils.compress(inputFile, outputFile);

OutputStream ouputStream = FileUtis.openOutputStream(outputFile);
GZipUtils.compress(inputFile, outputFile);

InputStream inputStream = FileUtis.openInputStream(inputFile);
OutputStream ouputStream = FileUtis.openOutputStream(outputFile);
GZipUtils.compress(inputStream, ouputStream);
```

## 解压
```java
File outputFile = new File("C:\logs\xxx.txt");

File inputFile = new File("C:\output.gz");
GZipUtils.uncompress(inputFile, outputFile);

OutputStream ouputStream = FileUtis.openOutputStream(outputFile);
GZipUtils.uncompress(inputFile, ouputStream);

InputStream inputStream = FileUtils.openInputStream(inputFile);
OutputStream ouputStream = FileUtis.openOutputStream(outputFile);
GZipUtils.uncompress(inputStream, ouputStream);
```
