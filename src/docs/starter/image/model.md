---
layout: doc
---

# 数据结构

## 图像信息
`io.github.pangju666.framework.boot.image.model.ImageFile`

> [!NOTE]
> 图像文件摘要计算基于[`xxHash64`](/commons/io/file#计算文件摘要)算法。
> 
> 如果你不想使用这个算法的话，需要避免使用`ImageFile.formFile(File)`来构建`ImageFile`。

### 概述
- 封装图像的基础元数据与文件引用，包括尺寸、方向、格式、MIME 类型、大小与摘要等。
- 用于图像上传、处理与展示等场景的通用数据载体。
- 一般从[`ImageTemplate`](/starter/image/template#接口)获取。

### 字段
- imageSize：图像宽高信息，见[`ImageSize`](/commons/image/model#图像尺寸)。
- orientation：图像方向标记（`EXIF Orientation`），默认值见[`ImageConstants.NORMAL_EXIF_ORIENTATION`](/commons/image/constants)。
- format：图像文件格式（如`JPEG`、`PNG`，设置时会自动转为大写）。
- fileSize：文件大小（单位：字节）。
- mimeType：图像的`MIME`类型（如`image/jpeg`，设置时会自动转为小写）。
- digest：图像摘要（用于内容唯一性校验或缓存）。
- file：图像对应的本地文件引用。

### 实例化
```java
File file;
// 初始化并设置：MIME 类型、摘要、格式、大小与文件引用，尺寸和方向需要手动设置
ImageFile imageFile = ImageFile.fromFile(file);
// 设置尺寸
imageFile.setImageSize();
// 设置方向
imageFile.setOrientation();

// 也可以选择手动构建，只初始化设置格式、大小与文件引用
ImageFile imageFile = new ImageFile(file);
// 覆盖设置文件格式
imageFile.setFormat();
// 覆盖设置文件大小
imageFile.setFileSize();
// 设置摘要（不需要的话也可以不设置）
imageFile.setDigest();
// 设置类型
imageFile.setMimeType();
// 设置尺寸
imageFile.setImageSize();
// 设置方向
imageFile.setOrientation();
```

## 操作配置

### 通用
`io.github.pangju666.framework.boot.image.model.GenericImageOperation`

#### 概述
通用图像处理操作配置模型，像[`ImageTemplate`](/starter/image/template.html##接口)提供操作配置。

#### 操作说明
- 裁剪 (Crop)：
  - 中心裁剪：保留图像中心区域。
  - 偏移裁剪：指定上下左右的裁剪偏移量。
  - 矩形裁剪：指定裁剪区域的坐标与宽高。
- 缩放 (Scale)：
  - 强制缩放：忽略原图比例，强制拉伸至指定宽高。
  - 等比缩放：支持按比例系数、固定宽度或固定高度进行等比缩放（互斥）。
- 水印 (Watermark)：
  - 类型：支持图片水印与文字水印（互斥）。
  - 定位：支持[九宫格方位](/commons/image/enums#水印方向)与绝对坐标定位（互斥）。
  - 样式：支持透明度、相对缩放比例（图片水印）、字体样式（文字水印）等配置。
- 几何变换：
  - 旋转：支持任意角度旋转（正数顺时针，负数逆时针）。
  - 翻转：支持水平翻转与垂直翻转。
- 色彩调整：
  - 支持图像灰度化处理。

#### 校验规则
所有尺寸、坐标参数需为正数；非法参数将被自动忽略，不影响其他配置。

#### 互斥策略
- 设置水印坐标会自动清除水印方位配置。
- 设置强制缩放会自动清除等比缩放配置；反之亦然。
- 设置图片水印会自动清除文字水印内容；反之亦然。

#### 使用示例
以下的操作设置属于通用操作，所有[`ImageTemplate`](/starter/image/template.html##接口)实现都应支持。

```java
ImageOperation genericImageOperation = ImageOperationBuilders.generic()     
            // 设置矩形裁剪区域（起点坐标为(100, 100)，宽高为(500x500)）
			.cropByRect(100, 100, 500, 500)
			// 设置中心裁剪区域（以图像中心为七点，裁剪宽高为(100x100)的区域）
			.cropByCenter(100, 100)
			// 设置中心裁剪区域（以图像四个方向各自偏移50像素的区域进行裁剪）
			.cropByOffset(50, 50, 50, 50)
			// 将图像缩放为原始比例的50%
			.scaleByRatio(0.5)
			// 将图像宽度缩放到500像素，高度根据比例自适应
			.scaleByWidth(500)
			// 将图像高度缩放到500像素，宽度根据比例自适应
			.scaleByHeight(500)
			// 将图像宽度和高度缩放到（500x500）的范围内，以长边为主，短边自适应
			.scaleByRange(500, 500)
			// 强制将图像缩放到500x500，不考虑长宽比
			.forceScale(500, 500)			
			// 将图像顺时针旋转90度
			.rotate(RotateDirection.CLOCKWISE_90)
			// 将图像逆时针旋转90度
			.rotate(-90)
			// 将图像垂直翻转
			.flip(FlipDirection.VERTICAL)
			// 将图像灰度化
			.grayscale()
			// 取消图像灰度化
			.grayscale(false)
			// 设置图像水印方向为右上角
			.watermarkDirection(WatermarkDirection.TOP_RIGHT)
			// 设置图像水印坐标为(50,50)
			.watermarkPosition(50, 50)
			// 设置图像水印文件
			.watermarkImage(new File(""))
			// 图像水印的下列配置都是有默认值的，确认需要修改再设置
			// 设置图像水印基于原图的相对缩放比例（默认为15%）
			.watermarkImageRelativeScale(0.15)
			// 设置图像水印的透明度设置为40%（默认为40%）
			.watermarkImageOpacity(0.4)
			// 如果没有定制策略的需求，不要修改这个
			// 设置水印的尺寸范围策略（根据原始图像大小计算水印图像的最小和最大尺寸）
			.watermarkImageSizeLimitStrategy(imageSize -> {
                int shorter = Math.min(imageSize.getWidth(), imageSize.getHeight());
                if (shorter < 600) { // 小图
                    return Pair.of(new ImageSize(120, 120), new ImageSize(150, 150));
                } else if (shorter >= 1920) { // 大图（注意：>=1920）
                    return Pair.of(new ImageSize(250, 250), new ImageSize(400, 400));
                } else { // 中等图
                    return Pair.of(new ImageSize(150, 150), new ImageSize(250, 250));
                }
            })
            // 设置水印文字（与图像水印互斥，反之亦然）
			.watermarkText("水印")
			// 文字水印的下列配置都是有默认值的，确认需要修改再设置
			// 设置文字水印填充颜色（默认为白色）
			.watermarkTextFillColor(Color.WHITE)
			// 设置文字水印字体名称，默认为 SansSerif
            .watermarkTextFontName(Font.SANS_SERIF)
            // 设置文字水印字体样式，默认为加粗
            .watermarkTextFontStyle(Font.BOLD)
            // 如果没有定制策略的需求，不要修改这个
            // 设置水印文字大小的计算策略（根据原始图像大小计算水印文字的大小）
            .watermarkTextFontSizeStrategy(imageSize -> {
                int shorter = Math.min(imageSize.getWidth(), imageSize.getHeight());
                if (shorter < 600) {
                    // 小图：强制 32pt
                    return 32;
                } else if (shorter >= 1920) {
                    // 大图：48pt~80pt 缓慢增长
                    double ratio = Math.min(1.0, (shorter - 1920.0) / 3000.0);
                    return (int) Math.round(48 + ratio * (80 - 48));
                } else {
                    // 中等图：32pt~48pt 线性增长
                    double ratio = (shorter - 600.0) / (1920.0 - 600.0);
                    return (int) Math.round(32 + ratio * (48 - 32));
                }
            })
			// 开启文字水印描边（默认为 开启）
			.watermarkTextStroke(true)
			// 设置文字水印描边颜色（默认为黑色）
			.watermarkTextStrokeColor(Color.BLACK)
			// 设置文字水印描边线宽（默认为 2 像素）
			.watermarkTextStrokeWidth(2.0)
			// 设置文字水印透明度（默认为 40%）
			.watermarkTextOpacity(0.4)
			.build()
```

### BufferedImage
`io.github.pangju666.framework.boot.image.model.BufferedImageOperation`

#### 概述
面向[`BufferedImageTemplate`](/starter/image/template.html#bufferedimage实现)的图像操作配置。

#### 拓展操作说明
- 缩放优化：
  - 支持指定[重采样过滤器](/starter/image/enums#重采样过滤器)以控制缩放质量。
- 图像增强：
  - 模糊：高斯模糊（支持自定义半径）；
  - 锐化：非锐化掩模（USM，支持自定义强度）；
  - 对比度/亮度：支持线性调整对比度与亮度。
- 滤镜管线：
  - 支持添加标准`ImageFilter`，按添加顺序依次处理。

#### 校验规则
非法参数将被自动忽略，不影响其他配置。

#### 使用示例
```java
// 先使用 GenericImageOperation 构建通用操作配置
// 再设置 BufferedImageOperation 特有操作配置
ImageOperation bufferedImageOperation = ImageOperationBuilders.buffered(genericImageOperation)    
// 也可以直接使用 BufferedImageOperation 设置全部操作配置
// ImageOperation bufferedImageOperation = ImageOperationBuilders.buffered()
            // 设置缩放重采样策略（影响缩放质量和速度）
            // 一般不建议设置这个，底层实现已经使用 LANCZOS 作为默认值
			.resampleFilter(ResampleFilter.LANCZOS)
			// 将图像模糊化，默认半径为1.5
			.blur()
			// 将图像模糊化，设置半径为1.5，半径需要 > 1
			.blur(1.5)
			// 将图像模锐化，默认强度为0.3
			.sharpen()
			// 将图像模锐化，设置强度为0.3，强度不能等于 0
			.sharpen(0.3)
			// 调整图像对比度，默认幅度为0.3
			.contrast()
			// 调整图像对比度，设置幅度为0.3，取值范围：[-1,1] 且不能等于 0
			.contrast(0.3)
			// 调整图像亮度，设置幅度为2.0，取值范围：[-2,2] 且不能等于 0
			.brightness(2.0)
			// 增加图像滤镜，一般不建议设置这个，除非你知道自己在干什么
			.addFilter(new ImageFilter())
			// 增加多个图像滤镜，一般不建议设置这个，除非你知道自己在干什么
			.addFilters(List.of(new ImageFilter()))
			// 设置图像滤镜（会覆盖之前增加的滤镜），一般不建议设置这个，除非你知道自己在干什么
			.setFilters(List.of(new ImageFilter()))
			.build()
```

### [GraphicsMagick](http://www.graphicsmagick.org/index.html)
`io.github.pangju666.framework.boot.image.model.GMImageOperation`

#### 概述
面向[`GMImageTemplate`](/starter/image/template#gm实现)的图像操作配置。

#### 拓展操作说明
- 输出控制：
  - 质量 (Quality)：支持设置`JPEG`等格式的压缩质量（1-100）。
  - DPI：支持设置输出图像的分辨率（每英寸点数）。
  - 元数据 (Profile)：支持移除`EXIF`、`IPTC`等元数据信息以减小文件体积。
- 缩放优化：支持指定[重采样过滤器](/starter/image/enums#重采样过滤器)以控制缩放质量。
- 图像增强：
  - 模糊 (Blur)：高斯模糊（支持自定义半径与标准差）。
  - 锐化 (Sharpen)：支持自定义半径与标准差的锐化处理。

#### 校验规则
非法参数将被自动忽略，不影响其他配置。

#### GM 兼容性与限制
- 路径限制：水印图片路径建议使用纯英文，避免中文路径导致的兼容性问题。
- 中文字体：若需使用中文水印，必须确保系统安装了相应字体，并指定正确的英文字体名称（如 "simhei"）。
- 中文编码：建议优先使用英文水印文本，避免环境编码问题导致的乱码。
- 字体设置：绘制文字水印必须设置字体，否则将不生效。
- 文字样式：不支持设置文字样式（如粗体、斜体等），相关配置将被忽略。

#### 使用示例
```java
// 先使用 GenericImageOperation 构建通用操作配置
// 再设置 GMImageOperation 特有操作配置
ImageOperation gmImageOperation = ImageOperationBuilders.gm(genericImageOperation)    
// 也可以直接使用 GMImageOperation 设置全部操作配置
// ImageOperation gmImageOperation = ImageOperationBuilders.gm()
            // 设置缩放重采样策略（影响缩放质量和速度）
            // 一般不建议设置这个，GraphicsMagick 已经使用 LANCZOS 作为默认值
			.resizeFilter(ResampleFilter.LANCZOS)
			// 高斯模糊，并设置标准差为0.5，半径使用 0 以由 GM 自动推导
			.blur(0.5)
			// 高斯模糊，并设置标准差为0.5，半径为 2
			.blur(2, 0.5)
			// 锐化，并设置标准差为0.8，半径使用 0 以由 GM 自动推导
			.sharpen(0.8)
			// 高斯模糊，并设置标准差为0.8，半径为 1
			.sharpen(1, 0.8)
			// 设置输出质量为75（部分格式支持，如 JPEG）
			// GraphicsMagick 默认为 75，一般情况下不需要设置这个
			.quality(75)
			// 设置输出DPI为300
			// 如果不是明确需要修改输出图像的DPI，请不要设置这个
			.dpi(300)
			// 生成缩略图的话建议加上这个，减小生成图片的体积
			// 启用移除图像的 Profile/元数据（如 EXIF/IPTC）
			.stripProfiles()
			// 禁用移除图像的 Profile/元数据（如 EXIF/IPTC）
			.stripProfiles(false)
			// 如果想设置中文水印字体，需要字体支持中文
			// 设置水印文字（与图像水印互斥，反之亦然）
			.watermarkText("水印")
			// 字体名称必须是英文
			// 设置文字水印字体为黑体（不设置字体的话，无法绘制文字水印）
			.watermarkTextFontName("simhei")
			.build()
```
