---
layout: doc
---

# 工具类

`io.github.pangju666.commons.image.uitls.ImageUtils`

| 方法名                 | 返回值                                    |           用途            |
|---------------------|:---------------------------------------|:-----------------------:|
| toHexColorWithAlpha | String                                 |      将颜色转换为十六进制字符串      |
| toHexColor          | String                                 | 将颜色转换为十六进制字符串（忽略 Alpha） |
| isSupportReadType   | boolean                                |      检查图像类型是否支持读取       |
| isSupportWriteType  | boolean                                |      检查图像类型是否支持写入       |
| getMimeType         | String                                 |         获取图像类型          |
| getSize             | [ImageSize](/commons/image/model#图像尺寸) |         获取图像尺寸          |
| getExifOrientation  | int                                    |       获取EXIF方向信息        |

## 将颜色转换为十六进制字符串
```java
// 将Color转换为 #AARRGGBB 格式
ImageUtils.toHexColorWithAlpha(Color.BLACK); // #ff000000
ImageUtils.toHexColor(Color.BLACK); // #000000
```

## 检测类型是否支持读取
检测图像类型是否可以使用`ImageIO`读取

```java
// 检测jpeg类型是否支持读取
ImageUtils.isSupportReadType("image/jpeg");
```

## 检测类型是否支持写入
检测图像类型是否可以使用`ImageIO`写入

```java
// 检测jpeg类型是否支持写入
ImageUtils.isSupportWriteType("image/jpeg");
```

## 检测图像类型

### 使用文件检测
基于`Tika`实现，如果检测失败则返回`null`

```java
File file = new File("image.jpg");
ImageUtils.getMimeType(file); // "image/jpeg"
```

### 使用字节数组检测
基于`Tika`实现，如果检测失败则返回`null`

```java
File file = new File("image.jpg");
ImageUtils.getMimeType(FileUtils.readFileToByteArray(file)); // "image/jpeg"
```

### 使用输入流检测
基于`Tika`实现，如果检测失败则返回`null`

```java
File file = new File("image.jpg");
ImageUtils.getMimeType(FileUtils.openInputStream(file)); //"image/jpeg"
```

### 使用图像输入流检测
基于`ImageIO`实现，如果检测失败则返回`null`

```java
File file = new File("image.jpg");
ImageUtils.getMimeType(ImageIO.createImageInputStream(file)); // "image/jpeg"
```

### 使用元数据检测
基于`metadata-extractor`实现，如果检测失败则返回`null`

`metadata-extractor`支持的格式有限，而且不是所有图像都存在**元数据**。

```java
File file = new File("image.jpg");
Metadata metadata = ImageMetadataReader.readMetadata(file);
ImageUtils.getMimeType(metadata); // "image/jpeg"
```

## 获取图像尺寸
基于`ImageIO`和`metadata-extractor`实现，如果解析失败则返回`null`

> [!IMPORTANT]
> 对于确定方向正常的图像，建议使用getSize(xxx, false)，避免解析元数据耗费额外的时间。

处理流程：
1. 如果使用元数据参数为`false`，则直接使用`ImageIO`解析图像尺寸。
2. 尝试使用元数据获取图像`EXIF`方向。 
3. 尝试使用元数据获取图像尺寸。
4. 如果元数据中不存在图像尺寸信息，则使用`ImageIO`解析图像尺寸。
5. 如果还是无法获取图像宽高信息，则返回`null`。

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
ImageUtils.getSize(ImageIO.createImageInputStream(file));

// 只使用metadata-extractor获取图像宽高信息
Metadata metadata = ImageMetadataReader.readMetadata(file);
ImageUtils.getSize(metadata);
```

## 获取图像Exif方向
基于`metadata-extractor`实现，如果解析失败则返回`null`

根据EXIF标准，方向值范围为1-8：
- 1: 正常方向 (不需要校正)。
- 2: 水平翻转。
- 3: 旋转180度。
- 4: 垂直翻转。
- 5: 顺时针旋转90度后水平翻转。
- 6: 顺时针旋转90度。
- 7: 逆时针旋转90度后水平翻转。
- 8: 逆时针旋转90度。

```java
File file = new File("image.jpg");

ImageUtils.getExifOrientation(file);

ImageUtils.getExifOrientation(FileUtils.readFileToByteArray(file));

ImageUtils.getExifOrientation(FileUtils.openInputStream(file));

Metadata metadata = ImageMetadataReader.readMetadata(file);
ImageUtils.getExifOrientation(metadata);
```
