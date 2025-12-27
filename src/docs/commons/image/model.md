---
layout: doc
---

# 数据结构

## 图像尺寸
`io.github.pangju666.commons.image.model.ImageSize`

根据EXIF标准，方向值范围为1-8：
- 1: 正常方向 (不需要校正)。
- 2: 水平翻转。
- 3: 旋转180度。
- 4: 垂直翻转。
- 5: 顺时针旋转90度后水平翻转。
- 6: 顺时针旋转90度。
- 7: 逆时针旋转90度后水平翻转。
- 8: 逆时针旋转90度。

### 构建

```java
// exif方向为null
ImageSize size = new ImageSize(1920, 1080);
// exif方向为6
ImageSize size = new ImageSize(1920, 1080, 6);
```

### 获取视觉尺寸

存在exif方向且大于5时会交换宽高，返回视觉尺寸。

> [!NOTE]
> 如果不存在exif方向，获取视觉尺寸时会返回一个方向为1（正常方向）的实例。

```java
// 构建时定义图像exif方向
ImageSize size = new ImageSize(1920, 1080, 6);
ImageSize visualSize = size.getVisualSize(); // 1080x1920

ImageSize size = new ImageSize(1920, 1080, 4);
ImageSize visualSize = size.getVisualSize(); // 1920x1080

ImageSize size = new ImageSize(1920, 1080);
ImageSize visualSize = size.getVisualSize(); // 1920x1080
```

### 根据宽度计算缩放后的尺寸

该方法不会修改当前对象，而是返回一个新的尺寸实例。

```java
ImageSize size = new ImageSize(1920, 1080);
ImageSize scaleSize = size.scaleByWidth(500); // 500x281
```

### 根据高度计算缩放后的尺寸

该方法不会修改当前对象，而是返回一个新的尺寸实例。

```java
ImageSize size = new ImageSize(1920, 1080);
ImageSize scaleSize = size.scaleByHeight(500); // 888x500
```

### 等比计算缩放后的尺寸

该方法不会修改当前对象，而是返回一个新的尺寸实例。

```java
// 宽度大于高度则按宽度计算
ImageSize size = new ImageSize(1920, 1080);
ImageSize scaleSize = size.scale(500, 500); // 500x281

// 高度大于宽度则按宽度计算
ImageSize size2 = new ImageSize(3000, 5000);
ImageSize scaleSize2 = size2.scale(400, 500); // 300x500

// 如果目标高度大于原始高度，则根据宽度计算
ImageSize size3 = new ImageSize(400, 500);
ImageSize scaleSize3 = size3.scale(300, 550); // 440x550

// 如果目标宽度大于原始高度，则根据高度计算
ImageSize size4 = new ImageSize(600, 500);
ImageSize scaleSize4 = size4.scale(700, 300); // 360x300
```

### 比例计算缩放后的尺寸

该方法不会修改当前对象，而是返回一个新的尺寸实例。

```java
ImageSize size = new ImageSize(600, 500);
ImageSize scaleSize = size.scale(0.5); // 300x250
```

### 强制调整尺寸（非等比）。

该方法不会修改当前对象，而是返回一个新的尺寸实例。

```java
ImageSize size = new ImageSize(600, 500);
ImageSize newSize = size.resize(300, 400); // 300x400
```
