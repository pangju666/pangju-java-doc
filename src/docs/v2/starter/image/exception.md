---
layout: doc
---

# 异常

## 不支持的图片类型异常
`io.github.pangju666.framework.boot.image.exception.UnSupportedTypeException`

### 概述
- 当输入或输出的图片格式不在支持集合中时抛出。
- 常见于格式探测（读取）或写出格式校验流程。

### 使用示例
```java
throw new UnSupportedTypeException("不支持读取 image/jpeg 类型图片");
```

## 图像解析异常
`io.github.pangju666.framework.boot.image.exception.ImageParsingException`

### 概述
- 用于标识图像文件在解析阶段失败，包括读取头信息、识别格式、提取尺寸/方向、获取 MIME 类型、计算摘要等。
- 适用于图像元数据提取与基础解码过程中的错误场景；更广泛的操作失败请使用`ImageOperationException`。

### 使用示例
```java
File imageFile;
try {
    // 解析图像文件类型
	String mimeType =  FileUtils.getMimeType(imageFile);
} catch (IOException e) {
	throw new ImageParsingException(imageFile, "类型解析失败", e);
	// 也可以不传file参数
	// throw new ImageParsingException("图片类型解析失败", e);
}
```

## 图像操作异常
`io.github.pangju666.framework.boot.image.exception.ImageOperationException`

### 概述
- 用于标识图像处理过程中的操作失败，包括解析、读写、校验、转换等。
- 适用于读取图像信息、计算摘要、识别格式、尺寸/方向处理、编码/解码、缩放/裁剪、存储/删除失败等场景。

### 使用示例
```java
try {
	// 图像处理
} catch (IOException e) {
	throw new ImageOperationException(imageFile, "操作执行失败", e);
	// 也可以不传file参数
	// throw new ImageOperationException("图片操作执行失败", e);
}
```
