---
layout: doc
---

# 数据结构

## 图像尺寸
`io.github.pangju666.commons.image.model.ImageSize`

### 根据宽度计算缩放后的尺寸

该方法不会修改当前对象，而是返回一个新的尺寸实例。

```java
ImageSize size = new ImageSize(1920, 1080);
ImageSize scaleSize = size.scaleByWidth(500); // 500 281
```

### 根据高度计算缩放后的尺寸

该方法不会修改当前对象，而是返回一个新的尺寸实例。

```java
ImageSize size = new ImageSize(1920, 1080);
ImageSize scaleSize = size.scaleByHeight(500); // 888 500
```

### 等比计算缩放后的尺寸

该方法不会修改当前对象，而是返回一个新的尺寸实例。

```java
// 宽度大于高度则按宽度计算
ImageSize size = new ImageSize(1920, 1080);
ImageSize scaleSize = size.scale(500, 500); // 500 281

// 高度大于宽度则按宽度计算
ImageSize size2 = new ImageSize(3000, 5000);
ImageSize scaleSize2 = size2.scale(400, 500); // 300 500

// 如果目标高度大于原始高度，则根据宽度计算
ImageSize size3 = new ImageSize(400, 500);
ImageSize scaleSize3 = size3.scale(300, 550); // 440 550

// 如果目标宽度大于原始高度，则根据高度计算
ImageSize size4 = new ImageSize(600, 500);
ImageSize scaleSize4 = size4.scale(700, 300); // 360 300
```

### 比例计算缩放后的尺寸

该方法不会修改当前对象，而是返回一个新的尺寸实例。

```java
ImageSize size = new ImageSize(600, 500);
ImageSize scaleSize = size.scale(0.5); // 300 250
```
