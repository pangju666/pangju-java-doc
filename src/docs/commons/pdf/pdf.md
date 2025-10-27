---
layout: doc
---

# PDF

## 书签
`io.github.pangju666.commons.pdf.model.Bookmark`

实现了`TreeNode<String, Bookmark>`接口，这是一个树型数据结构，包含以下属性：
- 父级书签id
- 书签id
- 书签名称
- 书签所在页码
- 子书签集合

## 工具类
`io.github.pangju666.commons.pdf.utils.PDDocumentUtils`

| 方法名                       | 返回值                  |             用途              |
|---------------------------|:---------------------|:---------------------------:|
| computeMemoryUsageSetting | MemoryUsageSetting   |     根据PDF文件大小获取最优内存处理策略     |
| isPDF                     | boolean              |      验证指定文件是否为有效的PDF文档      |
| createDocument            | PDDocument           |    创建新的PDF文档并完整复制源文档元数据     |
| getDocument               | PDDocument           |        从文件系统加载PDF文档         |
| addImage                  | void                 |         将图像添加到PDF文档         |
| getPagesAsImage           | List\<BufferedImage> |     将PDF文档指定页面渲染为图像并返回      |
| getPageAsImageWithDPI     | List\<BufferedImage> | 将PDF文档指定页面渲染为图像并返回(使用指定DPI) |
| getPageAsImage            | BufferedImage        |     将PDF文档指定页面渲染为图像并返回      |
| getPageAsImageWithDPI     | BufferedImage        | 将PDF文档指定页面渲染为图像并返回(使用指定DPI) |
| merge                     | PDDocument           |          合并多个PDF文档          |
| split                     | List\<PDDocument>    |          按页拆分PDF文档          |
| copy                      | PDDocument           |           复制PDF文档           |
| getBookmarks              | List\<Bookmark>      |        获取PDF文档的书签列表         |

### 最优内存处理策略

配合`Loader.loadPDF(File, StreamCacheCreateFunction)`或`PDDocumentUtils.merge(Collection<PDDocument>, MemoryUsageSetting)`使用

选择策略：
- 纯内存模式：文件小于50MB时使用，性能最佳
- 混合模式：文件50MB-500MB时使用，平衡性能与内存
- 临时文件模式：文件大于500MB时使用，内存占用最低

```java
File file = new File("test.pdf");
Loader.loadPDF(file, PDDocumentUtils.computeMemoryUsageSetting(file.length()).streamCache);
```

### 判断是否为PDF文件
底层基于`tika`实现

```java
File file = new File("test.pdf");

PDDocumentUtils.idPDF(file);
PDDocumentUtils.idPDF(FileUtils.readFileToByteArray(file);
PDDocumentUtils.idPDF(FileUtils.openInputStream(file));
```

### 创建文档
这个方法适用于根据已有PDF文件的信息创建一个新的PDF文件

会复制以下信息：
- PDF版本信息
- 文档信息(作者、标题等)
- XMP元数据(如果存在)

**注意：此方法不会复制文档内容(页面、书签等)**

```java
PDDocument sourceDocument;
PDDocument newDocument = PDDocumentUtils.createDocument(sourceDocument);
```

### 读取PDF文件
```java
File file = new File("test.pdf");

PDDocument document = PDDocumentUtils.getDocument(file);
// 如果文档存在密码，需要传入密码
PDDocument document = PDDocumentUtils.getDocument(file, "123456");
```

### 将图像添加到文档
```java
File file = new File("test.pdf");
PDDocument document = PDDocumentUtils.getDocument(file);
File imageFile = new File("test.png");
byte[] imageBytes = FileUtils.readFileToByteArray(imageFile);

// 将图像绘制到pdf最后一页的起始坐标位置，保持图像原始大小
PDDocumentUtils.addImage(document, imageBytes);
// 将图像绘制到pdf最后一页的起始坐标位置，并指定图像位置和图像大小
PDDocumentUtils.addImage(document, imageBytes, 0, 0, 1920, 1080);
// 将图像绘制到指定页码，1为起始页码
PDDocumentUtils.addImage(document, imageBytes, 1);
PDDocumentUtils.addImage(document, imageBytes, 1, 0, 0, 1920, 1080);

// 也可以直接传入图像文件
PDDocumentUtils.addImage(document, imageFile);
PDDocumentUtils.addImage(document, imageFile, 0, 0, 1920, 1080);
PDDocumentUtils.addImage(document, imageFile, 1);
PDDocumentUtils.addImage(document, imageFile, 1, 0, 0, 1920, 1080);
```

### 将文档页面渲染为图像
基于`PDFRenderer`实现

```java
File file = new File("test.pdf");
PDDocument document = PDDocumentUtils.getDocument(file);

// 将文档全部页面渲染为图像
PDDocumentUtils.getPagesAsImage(document)); // List<BufferedImage>
// 设置缩放比例
PDDocumentUtils.getPagesAsImage(document, 0.5); // List<BufferedImage>
// 设置DPI
PDDocumentUtils.getPagesAsImageWithDPI(document, 300f); // List<BufferedImage>

// 将第1，2，3页渲染为图像
PDDocumentUtils.getPagesAsImage(document, List.of(1, 2, 3)); // List<BufferedImage>
PDDocumentUtils.getPagesAsImage(document, 0.5, List.of(1, 2, 3)); // List<BufferedImage>
PDDocumentUtils.getPagesAsImageWithDPI(document, 300f, List.of(1, 2, 3)); // List<BufferedImage>

// 将1-3页渲染为图像
PDDocumentUtils.getPagesAsImage(document, 1, 3)); // List<BufferedImage>
PDDocumentUtils.getPagesAsImage(document, 0.5, 1, 3); // List<BufferedImage>
PDDocumentUtils.getPagesAsImageWithDPI(document, 300f, 1, 3); // List<BufferedImage>

// 将第1页渲染为图像
PDDocumentUtils.getPageAsImage(document, 1)); // BufferedImage
PDDocumentUtils.getPageAsImage(document, 1, 0.5); // BufferedImage
PDDocumentUtils.getPageAsImageWithDPI(document, 1, 300f); // BufferedImage
```

### 合并文档
基于`PDFMergerUtility`实现

```java
File file1 = new File("test1.pdf");
PDDocument document1 = PDDocumentUtils.getDocument(file1); // PDDocument

File file2 = new File("test2.pdf");
PDDocument document2 = PDDocumentUtils.getDocument(file2); // PDDocument

PDDocumentUtils.merge(List.of(document1, document2), PDDocumentUtils.computeMemoryUsageSetting(file1.length() + file2.length())); // PDDocument
```

### 拆分文档
实现原理：复制要拆分出的页码

```java
File file = new File("test1.pdf");
PDDocument document = PDDocumentUtils.getDocument(file);

// 每两页拆分一次
PDDocumentUtils.split(document, 2); // List<PDDocument>
```

### 复制文档
这是一个深拷贝操作，复制出来的文档是一个全新的文档

```java
File file = new File("test1.pdf");
PDDocument document = PDDocumentUtils.getDocument(file);

// 复制整个文档
PDDocumentUtils.copy(document); // PDDocument

// 复制1-10页
PDDocumentUtils.copy(document, 1, 10); // PDDocument

// 复制第1，2，3页
PDDocumentUtils.copy(document, 1, List.of(1, 2, 3)); // PDDocument
```


### 获取书签
用来获取书签，生成目录很方便

```java
File file = new File("test1.pdf");
PDDocument document = PDDocumentUtils.getDocument(file);

// 获取文档书签，返回值是一个树型结构
PDDocumentUtils.getBookmarks(document); // List<Bookmark>
```
