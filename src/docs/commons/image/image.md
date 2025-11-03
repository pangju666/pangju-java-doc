---
layout: doc
---

# 图像

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

## 缩略图
`io.github.pangju666.commons.image.utils.Thumbnails`

基于`twelvemonkeys`的`ResampleOp`实现

速度和质量都挺不错的，纯Java实现里我觉得这个是最好用的

| 方法名           | 返回值                   |      用途       |
|---------------|:----------------------|:-------------:|
| forceScale    | boolean/BufferedImage |  强制缩放图像到指定尺寸  |
| scaleByHeight | boolean/BufferedImage |  根据高度等比缩放图像   |
| scaleByWidth  | boolean/BufferedImage |  根据宽度等比缩放图像   |
| scale         | boolean/BufferedImage | 根据高度或宽度等比缩放图像 |

原始图片：
![原始图片](/test.png)

缩略图：
![缩略图](/thumbnail.png)

### 强制缩放
强制缩放至指定该尺寸，不考虑原始长宽比，可能会导致图像变形

```java
File file = new File("image.jpg");
BufferedImage bufferedImage = ImageIO.read(file);
File outputFile = new File("thumbnail.jpg");

// 输出图片格式只能是ImageIO支持的格式（如"PNG","JPEG"）
ThumbnailUtils.forceScale(bufferedImage, FileUtils.openOutputStream(outputFile), new ImageSize(100, 100), "JPEG"); // 成功返回true，否则为false
// 可以指定重采样给滤波器类型，默认为ResampleOp.FILTER_TRIANGLE
ThumbnailUtils.forceScale(bufferedImage, FileUtils.openOutputStream(outputFile), new ImageSize(100, 100), "JPEG", ResampleOp.FILTER_TRIANGLE); // 成功返回true，否则为false

ThumbnailUtils.forceScale(bufferedImage, outputFile, new ImageSize(100, 100)); // 成功返回true，否则为false 
ThumbnailUtils.forceScale(bufferedImage, outputFile, new ImageSize(100, 100), "JPEG"); // 成功返回true，否则为false
ThumbnailUtils.forceScale(bufferedImage, outputFile, new ImageSize(100, 100), ResampleOp.FILTER_TRIANGLE); // 成功返回true，否则为false
ThumbnailUtils.forceScale(bufferedImage, outputFile, new ImageSize(100, 100), "JPEG", ResampleOp.FILTER_TRIANGLE); // 成功返回true，否则为false

// 不传入输出文件，则返回BufferedImage
ThumbnailUtils.forceScale(bufferedImage, new ImageSize(100, 100)); // BufferedImage
ThumbnailUtils.forceScale(bufferedImage, new ImageSize(100, 100), ResampleOp.FILTER_TRIANGLE); // BufferedImage
```

### 根据宽度缩放
```java
File file = new File("image.jpg");
BufferedImage bufferedImage = ImageIO.read(file);
File outputFile = new File("thumbnail.jpg");

// 输出图片格式只能是ImageIO支持的格式（如"PNG","JPEG"）
ThumbnailUtils.scaleByWidth(bufferedImage, FileUtils.openOutputStream(outputFile), 100, "JPEG"); // 成功返回true，否则为false
// 可以指定重采样给滤波器类型，默认为ResampleOp.FILTER_TRIANGLE
ThumbnailUtils.scaleByWidth(bufferedImage, FileUtils.openOutputStream(outputFile), 100, "JPEG", ResampleOp.FILTER_TRIANGLE); // 成功返回true，否则为false

ThumbnailUtils.scaleByWidth(bufferedImage, outputFile, 100); // 成功返回true，否则为false
ThumbnailUtils.scaleByWidth(bufferedImage, outputFile, 100, "JPEG"); // 成功返回true，否则为false
ThumbnailUtils.scaleByWidth(bufferedImage, outputFile, 100, ResampleOp.FILTER_TRIANGLE); // 成功返回true，否则为false
ThumbnailUtils.scaleByWidth(bufferedImage, outputFile, 100, "JPEG", ResampleOp.FILTER_TRIANGLE); // 成功返回true，否则为false

// 不传入输出文件，则返回BufferedImage
ThumbnailUtils.scaleByWidth(bufferedImage, 100); // BufferedImage 
ThumbnailUtils.scaleByWidth(bufferedImage, 100, ResampleOp.FILTER_TRIANGLE); // BufferedImage
```

### 根据高度缩放
```java
File file = new File("image.jpg");
BufferedImage bufferedImage = ImageIO.read(file);
File outputFile = new File("thumbnail.jpg");

// 输出图片格式只能是ImageIO支持的格式（如"PNG","JPEG"）
ThumbnailUtils.scaleByHeight(bufferedImage, FileUtils.openOutputStream(outputFile), 100, "JPEG"); // 成功返回true，否则为false
// 可以指定重采样给滤波器类型，默认为ResampleOp.FILTER_TRIANGLE
ThumbnailUtils.scaleByHeight(bufferedImage, FileUtils.openOutputStream(outputFile), 100, "JPEG", ResampleOp.FILTER_TRIANGLE); // 成功返回true，否则为false

ThumbnailUtils.scaleByHeight(bufferedImage, outputFile, 100); // 成功返回true，否则为false
ThumbnailUtils.scaleByHeight(bufferedImage, outputFile, 100, "JPEG"); // 成功返回true，否则为false
ThumbnailUtils.scaleByHeight(bufferedImage, outputFile, 100, ResampleOp.FILTER_TRIANGLE); // 成功返回true，否则为false
ThumbnailUtils.scaleByHeight(bufferedImage, outputFile, 100, "JPEG", ResampleOp.FILTER_TRIANGLE); // 成功返回true，否则为false

// 不传入输出文件，则返回BufferedImage
ThumbnailUtils.scaleByHeight(bufferedImage, 100); // BufferedImage
ThumbnailUtils.scaleByHeight(bufferedImage, 100, ResampleOp.FILTER_TRIANGLE); // BufferedImage
```

### 根据宽高或高度缩放
```java
File file = new File("image.jpg");
BufferedImage bufferedImage = ImageIO.read(file);
File outputFile = new File("thumbnail.jpg");

// 输出图片格式只能是ImageIO支持的格式（如"PNG","JPEG"）
ThumbnailUtils.scale(bufferedImage, FileUtils.openOutputStream(outputFile), new ImageSize(100, 100), "JPEG"); // 成功返回true，否则为false
// 可以指定重采样给滤波器类型，默认为ResampleOp.FILTER_TRIANGLE
ThumbnailUtils.scale(bufferedImage, FileUtils.openOutputStream(outputFile), new ImageSize(100, 100), "JPEG", ResampleOp.FILTER_TRIANGLE); // 成功返回true，否则为false

ThumbnailUtils.scale(bufferedImage, outputFile, new ImageSize(100, 100)); // 成功返回true，否则为false
ThumbnailUtils.scale(bufferedImage, outputFile, new ImageSize(100, 100), "JPEG"); // 成功返回true，否则为false
ThumbnailUtils.scale(bufferedImage, outputFile, new ImageSize(100, 100), ResampleOp.FILTER_TRIANGLE); // 成功返回true，否则为false
ThumbnailUtils.scale(bufferedImage, outputFile, new ImageSize(100, 100), "JPEG", ResampleOp.FILTER_TRIANGLE); // 成功返回true，否则为false

// 不传入输出文件，则返回BufferedImage
ThumbnailUtils.scale(bufferedImage, new ImageSize(100, 100)); // BufferedImage
ThumbnailUtils.scale(bufferedImage, new ImageSize(100, 100), ResampleOp.FILTER_TRIANGLE); // BufferedImage

// 直接传入BufferedImage作为输出目标
BufferedImage outputBufferedImage = new BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB);
ThumbnailUtils.scale(bufferedImage, outputBufferedImage);
ThumbnailUtils.scale(bufferedImage, outputBufferedImage, ResampleOp.FILTER_TRIANGLE);
```

## 滤镜处理
`io.github.pangju666.commons.image.utils.ImageFilterUtils`

基于`twelvemonkeys`实现

我只封装了调整亮度，调整对比度和灰度化

| 方法名        | 返回值                |   用途    |
|------------|:-------------------|:-------:|
| grayscale  | void/BufferedImage | 将图像灰度化  |
| contrast   | void/BufferedImage | 增加图像对比度 |
| brightness | void/BufferedImage | 增加图像亮度  |
| filter     | void/BufferedImage | 应用图像滤镜  |

### 灰度化

原始图片：
![原始图片](/test.png)

缩略图：
![缩略图](/grayscale.png)

```java
File file = new File("image.jpg");
BufferedImage bufferedImage = ImageIO.read(file);
File outputFile = new File("grayscale.jpg");

// 输出图片格式只能是ImageIO支持的格式（如"PNG","JPEG"）
ImageFilterUtils.grayscale(bufferedImage, FileUtils.openOutputStream(outputFile), "JPEG");

ImageFilterUtils.grayscale(bufferedImage, outputFile);
ImageFilterUtils.grayscale(bufferedImage, outputFile, "JPEG");

// 不传入输出文件，则返回BufferedImage
ImageFilterUtils.grayscale(bufferedImage); // BufferedImage
ImageFilterUtils.grayscale(bufferedImage, BufferedImage.TYPE_INT_RGB); // BufferedImage
```

### 图像对比度

原始图片：
![原始图片](/test.png)

缩略图：
![缩略图](/contrast.png)

```java
File file = new File("image.jpg");
BufferedImage bufferedImage = ImageIO.read(file);
File outputFile = new File("contrast.jpg");

// 输出图片格式只能是ImageIO支持的格式（如"PNG","JPEG"）
ImageFilterUtils.contrast(bufferedImage, 1.0, FileUtils.openOutputStream(outputFile), "JPEG");

ImageFilterUtils.contrast(bufferedImage, 1.0, outputFile);
ImageFilterUtils.contrast(bufferedImage, 1.0, outputFile, "JPEG");

// 不传入输出文件，则返回BufferedImage
ImageFilterUtils.contrast(bufferedImage, 1.0); // BufferedImage
ImageFilterUtils.contrast(bufferedImage, 1.0, BufferedImage.TYPE_INT_RGB); // BufferedImage
```

### 图像亮度

原始图片：
![原始图片](/test.png)

缩略图：
![缩略图](/brightness.png)

```java
File file = new File("image.jpg");
BufferedImage bufferedImage = ImageIO.read(file);
File outputFile = new File("brightness.jpg");

// 输出图片格式只能是ImageIO支持的格式（如"PNG","JPEG"）
ImageFilterUtils.brightness(bufferedImage, 1.0, FileUtils.openOutputStream(outputFile), "JPEG");

ImageFilterUtils.brightness(bufferedImage, 1.0, outputFile);
ImageFilterUtils.brightness(bufferedImage, 1.0, outputFile, "JPEG");

// 不传入输出文件，则返回BufferedImage
ImageFilterUtils.brightness(bufferedImage, 1.0); // BufferedImage
ImageFilterUtils.brightness(bufferedImage, 1.0, BufferedImage.TYPE_INT_RGB); // BufferedImage
```

### 图像滤镜
可以传入自定义的`ImageFilter`接口实现或`twelvemonkeys`内置的滤镜来实现一些自定义滤镜处理

```java
File file = new File("image.jpg");
BufferedImage bufferedImage = ImageIO.read(file);
File outputFile = new File("brightness.jpg");

// 输出图片格式只能是ImageIO支持的格式（如"PNG","JPEG"）
ImageFilterUtils.filter(bufferedImage, new GrayFilter(), FileUtils.openOutputStream(outputFile), "JPEG");

ImageFilterUtils.filter(bufferedImage, new GrayFilter(), outputFile);
ImageFilterUtils.filter(bufferedImage, new GrayFilter(), outputFile, "JPEG");

// 不传入输出文件，则返回BufferedImage
ImageFilterUtils.filter(bufferedImage, new GrayFilter()); // BufferedImage
ImageFilterUtils.filter(bufferedImage, new GrayFilter(), BufferedImage.TYPE_INT_RGB); // BufferedImage
```
