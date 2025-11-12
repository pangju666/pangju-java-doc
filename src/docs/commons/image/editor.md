---
layout: doc
---

# 图像编辑
`io.github.pangju666.commons.image.utils.ImageEditor`

本类提供了流式API来处理图像，支持链式方法调用以配置各种参数。 可以轻松实现图像的缩放、旋转、滤镜效果等多种处理操作。

> [!NOTE]
> 基于`twelvemonkeys`实现，速度和质量都挺不错的，纯Java实现里我觉得这个是最好用的。

> [!TIP]
> 注意事项：
> - 默认使用`Lanczos插值`（高质量）滤波器
> - 默认输出格式根据输入图像是否有透明通道自动选择（`PNG`或`JPEG`）
> - 不支持透明的格式（如`JPEG`）会自动转换为RGB模式
> - 可以使用`restore()`方法恢复到原始图像状态
> - 处理大量图像时，建议在使用完毕后显式关闭相关资源
> - 图像处理操作会按照调用顺序依次应用

| 方法名                 | 返回值         |              用途               |
|---------------------|:------------|:-----------------------------:|
| of                  | ImageEditor |           创建缩略图生成器            |
| scaleFilterType     | ImageEditor |          设置重采样滤波器类型           |
| scaleHints          | ImageEditor |     设置图像缩放的提示类型，影响缩放算法的选择     |
| outputFormat        | ImageEditor |           设置输出图像的格式           |
| correctOrientation  | ImageEditor |       根据EXIF方向信息校正图像方向        |
| rotate              | ImageEditor |             旋转图像              |
| blur                | ImageEditor |           对图像应用模糊效果           |
| flip                | ImageEditor |             翻转图像              |
| sharpen             | ImageEditor |           对图像应用锐化效果           |
| grayscale           | ImageEditor |           将图像转换为灰度图           |
| contrast            | ImageEditor |            调整图像对比度            |
| brightness          | ImageEditor |            调整图像亮度             |
| filter              | ImageEditor |          对图像应用自定义过滤器          |
| resize              | ImageEditor |    强制将图像缩放到指定的尺寸，不保持原始宽高比     |
| scaleByWidth        | ImageEditor |     按指定宽度等比例缩放图像，保持原始宽高比      |
| scaleByHeight       | ImageEditor |     按指定高度等比例缩放图像，保持原始宽高比      |
| scale               | ImageEditor | 将图像缩放到指定的最大宽度和最大高度范围内，保持原始宽高比 |
| restore             | ImageEditor |      恢复图像到初始状态，重置所有处理效果       |
| toFile              | void        |         将处理后的图像保存到文件          |
| toOutputStream      | void        |         将处理后的图像写入输出流          |
| toImageOutputStream | void        |        将处理后的图像写入图像输出流         |
| toBufferedImage     | void        |          获取处理后图像的副本           |

## 实例化
支持从`URL`、文件、输入流、图像输入流、`BufferImage`几种方式读取。


```java
URL imageUrl;
ImageEditor.of(imageUrl);

File imageFile;
// 默认不开启自动矫正方向
ImageEditor.of(imageFile);
// 开启自动矫正方向
ImageEditor.of(imageFile, true);

InputStream imageInputStream;
// 默认不开启自动矫正方向
ImageEditor.of(imageInputStream);
// 开启自动矫正方向
ImageEditor.of(imageInputStream, true);

ImageInputStream imageInputStream;
ImageEditor.of(imageUrl);

BufferedImage image;
ImageEditor.of(image);
```

## 设置重采样滤波器类型
默认是`Lanczos 插值（高质量）滤波器`，建议不要乱改，有些滤波器会无法生成部分图像。

支持以下滤波器：
- ResampleOp\.FILTER_UNDEFINED：未定义插值法，滤波方法将使用默认滤波器。
- ResampleOp\.FILTER_POINT：点插值法（也称为 "近邻插值"）。 速度非常快，但质量较低（类似于`RenderingHints.VALUE_INTERPOLATION_NEAREST_NEIGHBOR`和`Image.SCALE_REPLICATE`）
- ResampleOp\.FILTER_BOX：盒式插值法。速度快，但质量低。
- ResampleOp\.FILTER_TRIANGLE：三角形插值法（也称为 "线性 "或 "双线性"）。 速度相当快，质量可以接受（类似于`RenderingHints.VALUE_INTERPOLATION_BILINEAR`和`Image.SCALE_AREA_AVERAGING`）。
- ResampleOp\.FILTER_HERMITE：Hermite 插值法。
- ResampleOp\.FILTER_HANNING：Hanning 插值法。
- ResampleOp\.FILTER_HAMMING：Hamming 插值法。
- ResampleOp\.FILTER_BLACKMAN：Blackman 插值法。
- ResampleOp\.FILTER_GAUSSIAN：高斯插值法。
- ResampleOp\.FILTER_QUADRATIC：二次插值法。
- ResampleOp\.FILTER_CUBIC：三次插值。
- ResampleOp\.FILTER_CATROM：Catrom 插值法。
- ResampleOp\.FILTER_MITCHELL：Mitchell 插值法（高质量）。
- ResampleOp\.FILTER_LANCZOS：Lanczos 插值法（高质量）。
- ResampleOp\.FILTER_BLACKMAN_BESSEL：Blackman-Bessel 插值法（高质量）。
- ResampleOp\.FILTER_BLACKMAN_SINC：Blackman-Sinc 插值法（高质量）。

```java
File imageFile;
ImageEditor.of(imageFile).scaleFilterType(ResampleOp.FILTER_LANCZOS);
```

## 设置图像缩放的提示类型
根据不同的提示类型，会选择不同的重采样过滤器：
- `Image.SCALE_FAST`或`Image.SCALE_REPLICATE`： 使用最近邻插值 (`FILTER_POINT`)
- `Image.SCALE_AREA_AVERAGING`： 使用盒式过滤 (`FILTER_BOX`)
- `Image.SCALE_SMOOTH`： 使用`Lanczos`插值 (`FILTER_LANCZOS`)
- 其他值：使用二次插值 (`FILTER_QUADRATIC`)

```java
File imageFile;
ImageEditor.of(imageFile).scaleHints(Image.SCALE_AREA_AVERAGING);
```

### 设置输出图像的格式
只能设置为`ImageIO`支持写入的格式。

```java
File imageFile;
ImageEditor.of(imageFile).outputFormat("jpg");
```

### 校正图像方向
根据EXIF方向信息校正图像方向。

根据EXIF标准，方向值范围为1-8：
- 1: 正常方向 (不需要校正)。
- 2: 水平翻转。
- 3: 旋转180度。
- 4: 垂直翻转。
- 5: 顺时针旋转90度后水平翻转。
- 6: 顺时针旋转90度。
- 7: 逆时针旋转90度后水平翻转。
- 8: 逆时针旋转90度。

> [!NOTE]
> 对于方向值5-8，会同时调整输出图像的宽高比例。

### 旋转
支持根据方向或角度两种旋转方式，方向值：
- ImageUtil\.ROTATE_90_CW：顺时针旋转90度
- ImageUtil\.ROTATE_90_CCW：逆时针旋转90度
- ImageUtil\.ROTATE_180：旋转180度

```java
File imageFile;
ImageEditor.of(imageFile).rotate(ImageUtil.ROTATE_90_CW); // 顺时针旋转90度
ImageEditor.of(imageFile).rotate(45.0d); // 顺时针旋转45度
```

### 模糊
对图像应用模糊效果，模糊程度小于等于1则没有效果。

```java
File imageFile;
ImageEditor.of(imageFile).blur(); // 默认模糊程度为1.5
ImageEditor.of(imageFile).blur(100.0f); // 模糊程度为100
```

### 翻转
翻转图像。

```java
File imageFile;
ImageEditor.of(imageFile).flip(ImageUtil.FLIP_HORIZONTA); // 水平翻转
ImageEditor.of(imageFile).flip(ImageUtil.FLIP_VERTICAL); // 垂直翻转
```

### 锐化
对图像应用锐化效果，锐化强度等于0则没有效果。

```java
File imageFile;
ImageEditor.of(imageFile).sharpen(); // 默认锐化强度为0.3
ImageEditor.of(imageFile).sharpen(10.0f); // 锐化强度为10
```

### 灰度化
将图像转换为灰度图。

```java
File imageFile;
ImageEditor.of(imageFile).grayscale();
```

### 调整对比度
调整图像对比度，范围为-1.0到1.0，0表示不变，正值增加对比度，负值降低对比度。

```java
File imageFile;
ImageEditor.of(imageFile).contrast(); // 默认对比度增加0.3
ImageEditor.of(imageFile).contrast(10.0f); // 对比度增加10
```

### 调整亮度
调整图像亮度，范围为-2.0到2.0，0表示不变，正值增加亮度，负值降低亮度。

```java
File imageFile;
ImageEditor.of(imageFile).brightness(10.0f); // 亮度增加10
```

### 滤镜
对图像应用自定义过滤器。

```java
File imageFile;
ImageEditor.of(imageFile).filter(new GrayFilter()); // 对图像使用灰度化滤镜
```

### 强制缩放
强制将图像缩放到指定的宽度和高度，不保持原始宽高比。

```java
File imageFile;
ImageEditor.of(imageFile).resize(500, 500); // 强制将图像缩放为500x500
ImageEditor.of(imageFile).resize(new ImageSize(500, 500)); // 强制将图像缩放为500x500
```

### 等比例缩放
双约束缩放规则：
1. 在不超过目标宽高的前提下保持宽高比
2. 优先适配宽度计算
3. 若高度超出则改为适配高度
4. 确保最小1像素

```java
File imageFile;
ImageEditor.of(imageFile).scaleByWidth(500); // 按500宽度等比例缩放图像，保持原始宽高比
ImageEditor.of(imageFile).scaleByHeight(500); // 按500高度等比例缩放图像，保持原始宽高比
ImageEditor.of(imageFile).scale(500, 400); // 将图像缩放到500x400范围内，保持原始宽高比
ImageEditor.of(imageFile).scale(0.5); // 将图像缩放到原本的0.5倍
```

缩放效果图：

![原始图片](/test.png)

![缩略图](/thumbnail.png)

### 重置
恢复图像到初始状态，重置所有处理效果。

此方法会将输出图像重置为输入图像，并恢复默认设置。

```java
File imageFile;
ImageEditor.of(imageFile).scale(500, 400).restore(); // 重置图像所有处理效果
```

### 写入到文件
```java
File imageFile;
File outputFile;
ImageEditor.of(imageFile).scale(500, 400).toFile(outputFile);
```

### 写入到输出流
> [!NOTE]
> 需要调用者自己关闭输出流。

```java
File imageFile;
OutputStream outputStream;
ImageEditor.of(imageFile).scale(500, 400).toOutputStream(outputStream);
```

### 写入到图像输出流
> [!NOTE]
> 需要调用者自己关闭图像输出流。

```java
File imageFile;
ImageOutputStream outputStream;
ImageEditor.of(imageFile).scale(500, 400).toImageOutputStream(outputStream);
```

### 获取输出图像副本
底层调用`ImageUtil.createCopy(BufferedImage)`深拷贝一个完全相同的副本，操作它不会影响编辑器中的输出图像。

```java
File imageFile;
BufferedImage image = ImageEditor.of(imageFile).scale(500, 400).toBufferedImage();
```
