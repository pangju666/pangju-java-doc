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
- 一般从[`ImageTemplate`](/starter/image/template.html##接口)获取。

### 字段
- imageSize：图像宽高信息，见[`ImageSize`](/commons/image/image#图像尺寸)。
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

#### 支持操作
裁剪、缩放、图片水印、旋转、翻转与灰度化

> [!IMPORTANT]
> 同类型操作互斥，后设置的操作会覆盖先设置的操作。

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
			// 设置图像水印的最小宽度设置为40，最大宽度为200（默认为40-200）
			// 如果缩放后的水印尺寸不在范围内，则使用最小/大宽度设置水印尺寸
			.watermarkImageWidthRange(40, 200)
			// 设置图像水印的最小高度设置为40，最大高度为200（默认为40-200）
			// 如果缩放后的水印尺寸不在范围内，则使用最小/大高度设置水印尺寸
			.watermarkImageHeightRange(40, 200)
			.build()
```

### BufferedImage
`io.github.pangju666.framework.boot.image.model.BufferedImageOperation`

#### 概述
面向[`BufferedImageTemplate`](/starter/image/template.html#bufferedimage实现)的图像操作配置。

#### 拓展操作
文字水印、缩放重采样策略、模糊、锐化、对比度、亮度调整与自定义滤镜管线。

#### 说明
- 使用说明：通过构建器链式设置参数；不满足校验规则的参数将被忽略。
- 互斥规则：水印方向与坐标互斥；设置其中之一会清空另一种配置。
- 定位规则：可使用`watermarkDirection(`[WatermarkDirection](/commons/image/enums#水印方向)`)`或`watermarkPosition(x,y)`坐标需为正数。
- 裁剪规则：支持[中心裁剪、偏移裁剪与矩形裁剪](/starter/image/enums#裁剪类型)；如果裁剪参数为空、非正数或越界，则不设置裁剪。
- 缩放规则：`forceScale(width,height)`强制缩放到指定尺寸；按比例/按宽/按高缩放为等比，并会关闭强制缩放且清空其它尺寸/比例。
- 透明度范围：取值区间`[0,1]`；水印透明度遵循该范围。
- 旋转/翻转：旋转方向由[`RotateDirection`](/starter/image/enums#旋转方向)指定，旋转角度正数表示顺时针、负数表示逆时针；
翻转方向由[`FlipDirection`](/starter/image/enums#翻转方向) 指定。
- 灰度化：当开启灰度化时，输出图像为灰度模式。
- 文字水印：提供文本内容与样式配置；与图片水印互斥。
- 缩放重采样：支持[重采样滤镜类型](/starter/image/enums#重采样过滤器)选择。
- 图像增强：支持模糊、锐化、对比度与亮度调节。
- 滤镜管线：支持自定义`ImageFilter`，按添加顺序应用。

#### 使用示例
```java
// 先使用 GenericImageOperation 构建通用操作配置
// 再设置 BufferedImageOperation 特有操作配置
ImageOperation bufferedImageOperation = ImageOperationBuilders.buffered(genericImageOperation)    
// 也可以直接使用 BufferedImageOperation 设置全部操作配置
// ImageOperation bufferedImageOperation = ImageOperationBuilders.buffered()
            // 设置重采样策略（影响缩放质量和速度）
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
			// 增加图像滤镜，一般不建议设置这个，除非你知道自己要干啥
			.addFilter(new ImageFilter())
			// 增加多个图像滤镜，一般不建议设置这个，除非你知道自己要干啥
			.addFilters(List.of(new ImageFilter()))
			// 设置图像滤镜（会覆盖之前增加的滤镜），一般不建议设置这个，除非你知道自己要干啥
			.setFilters(List.of(new ImageFilter()))
			// 设置水印文字（与图像水印互斥，反之亦然）
			.watermarkText("水印")
			// 文字水印的下列配置都是有默认值的，确认需要修改再设置
			// 设置文字水印填充颜色（默认为白色）
			.watermarkTextFillColor(Color.WHITE)
			// 设置文字水印字体名称，默认为 SansSerif
            .watermarkTextFontName(Font.SANS_SERIF)
            // 设置文字水印字体样式，默认为 PLAIN
            .watermarkTextFontStyle(Font.PLAIN)
            // 设置文字水印字体大小比例（相对原图的长边），默认为 4%
            .watermarkTextFontSizeRatio(0.04)
			// 开启文字水印描边（默认为 开启）
			.watermarkTextStroke(true)
			// 设置文字水印描边颜色（默认为 亮灰）
			.watermarkTextStrokeColor(Color.LIGHT_GRAY)
			// 设置文字水印描边线宽（默认为 3 像素）
			.watermarkTextStrokeWidth(3.0)
			// 设置文字水印透明度（默认为 40%）
			.watermarkTextOpacity(0.4)
			.build()
```

### [GraphicsMagick](http://www.graphicsmagick.org/index.html)
`io.github.pangju666.framework.boot.image.model.GMImageOperation`

#### 概述
面向[`GMImageTemplate`](/starter/image/template.html#gm实现)的图像操作配置。

#### 拓展操作
文字水印、缩放重采样策略、模糊、锐化、输出质量、输出`DPI`与元数据清除。

#### 说明
- 使用说明：通过构建器链式设置参数；不满足校验规则的参数将被忽略。
- 互斥规则：水印方向与坐标互斥；设置其中之一会清空另一种配置。
- 定位规则：可使用`watermarkDirection(`[WatermarkDirection](/commons/image/enums#水印方向)`)`或`watermarkPosition(x,y)`坐标需为正数。
- 裁剪规则：支持中心裁剪、偏移裁剪与矩形裁剪；如果裁剪参数为空、非正数或越界，则不设置裁剪。
- 缩放规则：`forceScale(width,height)` 强制缩放到指定尺寸；按比例/按宽/按高缩放为等比，并会关闭强制缩放且清空其它尺寸/比例。
- 透明度范围：取值区间`[0,1]`；水印透明度遵循该范围。
- 旋转/翻转：旋转方向由[`RotateDirection`](/starter/image/enums#旋转方向)指定，旋转角度正数表示顺时针、负数表示逆时针；
翻转方向由[`FlipDirection`](/starter/image/enums#翻转方向) 指定。
- 灰度化：当开启灰度化时，输出图像为灰度模式。
- 质量设置：部分格式支持，如`JPEG`。
- 移除元数据：移除`Profile/EXIF/IPTC`等。
- `GM`缩放滤镜：支持滤镜类型选择以控制缩放质量与性能。
- 文字水印：字体/大小比例（相对原图的长边）/颜色/透明度配置；与图片水印互斥。
- 模糊/锐化：支持半径与标准差参数。
- `DPI`设置：设置输出图像的每英寸点数。

#### 注意事项
- 绘制文字水印必须设置字体，否则将不生效。
- 字体名称：不支持中文字体名称；若要显示中文，需要在 GM 运行环境安装可用的中文字体并以可识别的英文名称引用。
- 中文水印文本：在未正确安装中文字体或编码不兼容的情况下可能显示为空或乱码，建议优先使用英文文本；若必须使用中文，请确保环境字体与编码配置正确。
- 水印图片路径：不支持包含中文或非 ASCII 字符的路径，需要使用纯英文路径。

#### 使用示例
```java
// 先使用 GenericImageOperation 构建通用操作配置
// 再设置 GMImageOperation 特有操作配置
ImageOperation gmImageOperation = ImageOperationBuilders.gm(genericImageOperation)    
// 也可以直接使用 GMImageOperation 设置全部操作配置
// ImageOperation gmImageOperation = ImageOperationBuilders.gm()
            // 设置缩放策略（影响缩放质量和速度）
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
			// 文字水印的下列配置都是有默认值的，确认需要修改再设置
			// 设置文字水印透明度（默认为 40%）
			.watermarkTextOpacity(0.4)
			// 设置文字水印填充颜色（默认为白色）
			.watermarkTextColor(Color.WHITE)
			// 设置文字水印字体大小比例（相对原图的长边），默认为 4%
			.watermarkTextFontSizeRatio(0.04)
			.build()
```
