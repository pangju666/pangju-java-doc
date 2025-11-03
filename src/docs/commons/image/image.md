---
layout: doc
---

# 图像信息

## 图像尺寸
`io.github.pangju666.commons.image.model.ImageSize`

### 根据宽度计算缩放后的尺寸
```java
ImageSize size = new ImageSize(1920, 1080);
ImageSize scaleSize = size.scaleByWidth(500); // 500 281
```

### 根据高度计算缩放后的尺寸
```java
ImageSize size = new ImageSize(1920, 1080);
ImageSize scaleSize = size.scaleByHeight(500); // 888 500
```

### 等比计算缩放后的尺寸
```java
// 宽度大于高度则按宽度计算
ImageSize size = new ImageSize(1920, 1080);
ImageSize scaleSize = size.scale(500, 500); // 500 281

// 高度大于宽度则按宽度计算
ImageSize size2 = new ImageSize(3000, 5000);
ImageSize scaleSize2 = size.scale(400, 500); // 300 500

// 如果目标高度大于原始高度，则根据宽度计算
ImageSize size3 = new ImageSize(400, 500);
ImageSize scaleSize3 = size.scale(300, 550); // 440 550

// 如果目标宽度大于原始高度，则根据高度计算
ImageSize size4 = new ImageSize(600, 500);
ImageSize scaleSize4 = size.scale(700, 300); // 360 300
```

## 图像信息
`io.github.pangju666.commons.image.uitls.ImageUtils`

| 方法名                | 返回值       |         用途          |
|--------------------|:----------|:-------------------:|
| isSupportReadType  | boolean   |    检查图像类型是否支持读取     |
| isSupportWriteType | boolean   |    检查图像类型是否支持写入     |
| isSameType         | boolean   | 判断图像类型是否与指定MIME类型匹配 |
| getMimeType        | String    |       获取图像类型        |
| getSize            | ImageSize |       获取图像尺寸        |
| getExifOrientation | Integer   |     获取EXIF方向信息      |

### 检测类型是否支持读取
```java
// 检测jpeg类型是否支持读取
ImageUtils.isSupportReadType("image/jpeg");
```

### 检测类型是否支持写入
```java
// 检测jpeg类型是否支持写入
ImageUtils.isSupportWriteType("image/jpeg");
```

### 检测是否为相同类型图像
基于`ImageIO`实现

```java
File file = new File("image.jpg");

ImageUtils.isSameType("image/jpeg", "image/jpg"); // true

ImageUtils.isSameType(file, "image/jpeg"); // true

ImageUtils.isSameType(FileUtils.readFileToByteArray(file), "image/jpeg"); // true

ImageUtils.isSameType(FileUtils.openInputStream(file), "image/jpeg"); // true

ImageUtils.isSameType(ImageIO.createImageInputStream(file), "image/jpeg"); // true
```

### 检测图像类型

#### 根据图像检测
基于`ImageIO`实现

只能检测出`ImageIO`支持的类型，如果单纯获取图像类型，建议使用`FileUtils.getMimeType`

```java
File file = new File("image.jpg");

ImageUtils.getMimeType(file); // "image/jpeg"

ImageUtils.getMimeType(FileUtils.readFileToByteArray(file)); // "image/jpeg"

ImageUtils.getMimeType(FileUtils.openInputStream(file)); //"image/jpeg"

ImageUtils.getMimeType(ImageIO.createImageInputStream(file)); // "image/jpeg"
```

#### 根据元数据检测
基于`metadata-extractor`实现，如果解析失败则返回`null`

metadata-extractor支持的格式有限，而且不是所有图像都有**元数据**

```java
File file = new File("image.jpg");
Metadata metadata = ImageMetadataReader.readMetadata(file);
ImageUtils.getMimeType(metadata); // "image/jpeg"
```

### 获取图像尺寸
基于`ImageIO`和`metadata-extractor`实现，如果解析失败则返回`null`

处理流程：
1. 尝试使用`metadata-extractor`获取元数据中的图像宽高信息 
2. 使用`metadata-extractor`解析图像Exif方向，如果不存在则将反向定义为默认方向
3. 如果元数据中存在图像宽高信息，则根据图像Exif方向决定是否交换图像宽高
4. 尝试使用`ImageIO`解析图像获取图像宽高信息，并根据图像Exif方向决定是否交换图像宽高
5. 如果还是无法获取图像宽高信息，则返回`null`

```java
File file = new File("image.jpg");

ImageUtils.getSize(file);
// 如果传入false，则只使用ImageIO来获取图像宽高信息
ImageUtils.getSize(file, false);

ImageUtils.getSize(FileUtils.readFileToByteArray(file));
// 如果传入false，则只使用ImageIO来获取图像宽高信息
ImageUtils.getSize(FileUtils.readFileToByteArray(file), false);

ImageUtils.getSize(FileUtils.openInputStream(file));
// 如果传入false，则只使用ImageIO来获取图像宽高信息
ImageUtils.getSize(FileUtils.openInputStream(file), false);

// 只使用ImageIO获取图像宽高信息
ImageUtils.getMimeType(ImageIO.createImageInputStream(file));

// 只使用metadata-extractor获取图像宽高信息
Metadata metadata = ImageMetadataReader.readMetadata(file);
ImageUtils.getMimeType(metadata);
```

### 获取图像Exif方向
基于`metadata-extractor`实现，如果解析失败则返回`null`

```java
File file = new File("image.jpg");

ImageUtils.getExifOrientation(file);

ImageUtils.getExifOrientation(FileUtils.readFileToByteArray(file));

ImageUtils.getExifOrientation(FileUtils.openInputStream(file));

Metadata metadata = ImageMetadataReader.readMetadata(file);
ImageUtils.getExifOrientation(metadata);
```
