---
layout: doc
---

# Word
Word相关的工具类，我做的功能不多，只做了判断文件有效性和获取文档对象和`Poi-tl`简化封装

## DOC
`io.github.pangju666.commons.poi.utils.HWPFDocumentUtils`

| 方法名         | 返回值          |     用途     |
|-------------|:-------------|:----------:|
| isDoc       | boolean      | 检查是否为DOC格式 |
| getDocument | HWPFDocument |  加载DOC文档   |

### 检查是否为DOC格式
```java
File file = new File("test.doc");

HWPFDocumentUtils.isDoc(file); // true
HWPFDocumentUtils.isDoc(FileUtils.readFileToByteArray(file)); // true 
HWPFDocumentUtils.isDoc(FileUtils.openInputStream(file)); // true
```

### 加载DOC文档
```java
File file = new File("test.doc");

HWPFDocumentUtils.getDocument(file); // HWPFDocument 
HWPFDocumentUtils.getDocument(FileUtils.readFileToByteArray(file)); // HWPFDocument 
```

## DOCX
`io.github.pangju666.commons.poi.utils.XWPFDocumentUtils`

| 方法名         | 返回值          |     用途      |
|-------------|:-------------|:-----------:|
| isDocx      | boolean      | 检查是否为DOCX格式 |
| getDocument | XWPFDocument |  加载DOCX文档   |

### 检查是否为DOCX格式
```java
File file = new File("test.docx");

XWPFDocumentUtils.isDocx(file); // true
XWPFDocumentUtils.isDocx(FileUtils.readFileToByteArray(file); // true 
XWPFDocumentUtils.isDocx(FileUtils.openInputStream(file); // true
```

### 加载DOCX文档
```java
File file = new File("test.docx");

XWPFDocumentUtils.getDocument(file); // XWPFDocument 
XWPFDocumentUtils.getDocument(FileUtils.readFileToByteArray(file)); // XWPFDocument 
```

## DOCX模板
`io.github.pangju666.commons.poi.utils.XWPFTemplateUtils`

基于[`poi-tl`](https://deepoove.com/poi-tl/#_getting_started)实现，这个模板引擎本身就封装的很好，不需要多余的方法封装，所以我只是做了几个我自己觉得实用的操作。

| 方法名            | 返回值                      |      用途      |
|----------------|:-------------------------|:------------:|
| compile        | XWPFTemplate             |     编译模板     |
| getTagNames    | List\<String>            | 获取模板中的所有标签名称 |
| buildDataModel | Map\<String, RenderData> |   构建模板数据模型   |

### 编译模板
`Configure`里面主要配置一些插件和一些模板引擎的配置，一般来说用默认的就行了。

```java
File file = new File("template.docx");

XWPFTemplateUtils.compile(file); // XWPFTemplate
XWPFTemplateUtils.compile(file, Configure.createDefault()); // XWPFTemplate

XWPFTemplateUtils.compile(FileUtils.readFileToByteArray(file)); // XWPFTemplate
XWPFTemplateUtils.compile(FileUtils.readFileToByteArray(file), Configure.createDefault()); // XWPFTemplate
```

### 获取模板中的所有标签名称
用来构建模板数据模型的时候，可能用的上。

```java
File file = new File("template.docx");

XWPFTemplate template = XWPFTemplateUtils.compile(file); // XWPFTemplate
XWPFTemplateUtils.getTagNames(template); // List<String>
```

### 构建模板数据模型
将渲染数据列表与模板标签名称按顺序映射，构建可用于模板渲染的数据模型。 如果渲染数据数量少于标签数量，多余的标签将不会被映射。

我这个只是简化了构建的操作，如果想要灵活度的话，还是自己构建比较好。

```java
File file = new File("template.docx");
XWPFTemplate template = XWPFTemplateUtils.compile(file); // XWPFTemplate
File outputFile = new File("output.docx");

List<RenderData> datas = new ArrayList<>(2);
datas.add(Texts.of("Sayi").create());

Map<String, RenderData> dataModel = XWPFTemplateUtils.buildDataModel(template, datas);
template.render(dataModel);
template.writeAndClose(FileUtils.openOutputStream(outputFile));
```
