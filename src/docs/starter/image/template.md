---
layout: doc
---

# 图像操作

## 接口
`io.github.pangju666.framework.boot.image.core.ImageTemplate`

### 定义
```java
public interface ImageTemplate {
 	ImageFile read(File file) throws UnSupportedTypeException, ImageParsingException, ImageOperationException, IOException;

 	default void process(File inputFile, File outputFile, ImageOperation operation) throws UnSupportedTypeException,
 		ImageParsingException, ImageOperationException, IOException {
		process(read(inputFile), outputFile, operation);
 	}

	 void process(ImageFile imageFile, File outputFile, ImageOperation operation) throws UnSupportedTypeException,
		 ImageParsingException, ImageOperationException, IOException;

	boolean canRead(File file) throws IOException;

	boolean canWrite(String format);
}
```

### 概述
抽象常见图像处理功能（信息读取、图像操作）。

### 配置
```yaml
pangju:
    image:
        # 使用 GraphicsMagick 处理图像
        type: graphics_magick
        # 使用 ImageIO 处理图像
        # type: imageio 
        # GraphicsMagick 进程连接池配置
        gm:
          # GraphicsMagick 执行文件路径，默认为 gm（从系统环境解析）  
          path: gm 
          pool:
            # 最大空闲连接数，默认 0   
            max-idle: 0
            # 最小空闲连接数，默认 0
            min-idle: 0
            # 最大活跃连接数，默认 16（负数表示不限制）
            max-active: 16
            # 连接耗尽时阻塞等待毫秒数，默认 5 秒（≤0 表示无限期）。
            max-wait-mills: 5000
            # 耗尽动作（FAIL/BLOCK/GROW），默认 FAIL（抛出一个 NoSuchElementException）。
            when-exhausted-action: fail
            # 获取连接时是否校验，默认 true。
            test-on-get: true
            # 归还连接时是否校验，默认 false。
            test-on-return: false
            # 空闲时是否定期校验，默认 false。
            test-while-idle: false
            # 空闲资源检测周期毫秒数，默认 30 秒。
            time-between-eviction-runs-millis: 30000
            # 每次检测的最大连接数，默认 3（负数表示按比例）。
            num-tests-per-eviction-run: 3
            # 空闲最短驱逐毫秒数，默认 30 分钟。
            min-evictable-idle-time-millis: 1800000
            # 软驱逐空闲毫秒数，默认 -1（禁用）。
            soft-min-evictable-idle-time-millis: -1
            # 是否启用 LIFO，默认 true。
            lifo: true
            # 进程最大使用次数后驱逐，默认 100（≤0 表示禁用）。
            evict-after-number-of-use: 100
```

### 格式支持
取决于具体的实现。

### 操作配置
[`io.github.pangju666.framework.boot.image.model.GenericImageOperation`](/starter/image/model.html#通用)

通用操作配置是不同实现都支持的操作，执行顺序取决于实现。

### 使用示例
```java
@Service
public class ImageService {
	private final ImageTemplate imageTemplate;
	private final OnceTaskExecutor taskExecutor;
	private final AsyncTaskExecutor asyncTaskExecutor;

	public ImageService(ImageTemplate imageTemplate, OnceTaskExecutor taskExecutor, 
						@Qualifier("applicationTaskExecutor")
						AsyncTaskExecutor asyncTaskExecutor) {
		this.imageTemplate = imageTemplate;
		this.taskExecutor = taskExecutor;
		this.asyncTaskExecutor = asyncTaskExecutor;
	}
	
	public void test(File inputFile) throws IOException {
	    // 读取文件信息
		ImageFile imageFile = imageTemplate.read(inputFile);
		// ... 执行其他操作，比如将图像信息写入数据库
		
		// 定义输出文件
		File outputFile;
		
		// 如果只想转换图像格式，那么直接传入空操作，传null也行
		imageTemplate.process(imageFile, outputFile, ImageOperationBuilders.EMPTY);
		
		// 定义通用图像操作
		GenericImageOperation genericImageOperation = ImageOperationBuilders.generic()
			// 定义通用图像操作
			.build();
			
		// 对图像进行通用操作
		imageTemplate.process(imageFile, outputFile, imageOperation);
		
		// 追加不同实现的特有图像操作
		ImageOperation imageOperation;
		if (imageTemplate instanceof GMImageTemplate) {
			imageOperation = ImageOperationBuilders.gm(genericImageOperation)
				// ... 定义 GraphicsMagick 专有图像操作
				.build();
		} else if (imageTemplate instanceof BufferedImageTemplate) {
			imageOperation = ImageOperationBuilders.buffered(genericImageOperation)
				// ... 定义 BufferedImage 专有图像操作
				.build();
		} else {
			imageOperation = genericImageOperation;
		}
		imageTemplate.process(imageFile, outputFile, imageOperation);
		
		// 如果不需要运行时动态切换实现类型的话，可以直接传入具体实现的操作配置
		// ImageOperation imageOperation = ImageOperationBuilders.buffered()
		ImageOperation imageOperation = ImageOperationBuilders.gm()
			// ... 定义图像操作
			.build();
		imageTemplate.process(imageFile, outputFile, imageOperation);
		
		// 结合 OnceTaskExecutor 使用，保证并发情况下同一文件只被操作一次。
		// 可以使用文件摘要作为key的一部分，防止同内容不同名文件重复处理
		taskExecutor.execute(imageFile.getDigest() + "_operation_task", () -> {
			imageTemplate.process(imageFile, outputFile, imageOperation);
			return null;
		});
		
		// 异步执行
		// 可以使用文件摘要作为key的一部分，防止同内容不同名文件重复处理
		taskExecutor.submitToAsyncExecutor(asyncTaskExecutor,
		 imageFile.getDigest() + "_operation_task", () -> {
			imageTemplate.process(imageFile, outputFile, imageOperation);
			return null;
		});
	}
}
```

## BufferedImage 实现
`io.github.pangju666.framework.boot.image.core.impl.BufferedImageTemplate`

### 概述
基于`ImageIO`的图像操作实现。

- 使用`Tika`进行图像类型解析。
- 使用`ImageMetadataReader`和[`ImageUtils`](/commons/image/utils)读取图像尺寸与`EXIF`方向，并封装为[`ImageFile`](/starter/image/model#图像信息)。
- 使用[`ImageEditor`](/commons/image/editor)进行图像处理。

### 格式支持
- 读取类型以[`ImageIO`支持读取的类型](/commons/image/constants)判定。
- 写入格式以[`ImageIO`支持写入的类型](/commons/image/constants)判定。

### 操作配置
[`io.github.pangju666.framework.boot.image.model.BufferedImageOperation`](/starter/image/model.html#bufferedimage)

执行顺序：
1. 矫正方向（依据 EXIF 方向）。
2. 裁剪（按 CENTER/OFFSET/RECT 规则）。
3. 重采样滤镜类型设置（影响后续缩放质量与性能）。
4. 缩放（保持比例或强制尺寸）。
5. 旋转（角度）。
6. 翻转（VERTICAL/HORIZONTAL）。
7. 灰度化。
8. 图像增强（按顺序：亮度 → 对比度 → 锐化 → 模糊）。
9. 添加水印（优先使用文字水印，未配置则使用图片水印；按方向或坐标放置）。
10. 输出到文件。

### 异常与容错
- 元数据解析失败时使用[默认方向](/commons/image/constants)并通过文件解码获取尺寸。
- 输入或输出类型不受支持时抛出[不支持的图片类型异常](/starter/image/exception#不支持的图片类型异常)。
- 图像处理过程中发生错误时抛出[图像操作异常](/starter/image/exception#图像操作异常)

## [GraphicsMagick](http://www.graphicsmagick.org/index.html) 实现
`io.github.pangju666.framework.boot.image.core.impl.GMImageTemplate`

> [!IMPORTANT]
> GraphicsMagick 版本需要 >= 1.3.0
> 
> 输入/输出文件路径不支持包含中文或非 ASCII 字符的路径，需要使用纯英文路径，否则命令会执行失败

### 概述
基于`GraphicsMagick`的图像操作实现。

- 使用`Tika`进行图像类型解析。
- 使用`GraphicsMagick`命令（`identify`/`convert`/`composite`）进行信息读取与图像处理。

### 格式支持
- 读取格式以[`GraphicsMagick`支持读取的类型](/starter/image/constants)判定。
- 写入格式以[`GraphicsMagick`支持写入的类型](/starter/image/constants)判定。

### 操作配置
[`io.github.pangju666.framework.boot.image.model.GMImageOperation`](/starter/image/model.html#graphicsmagick)

操作流程：
1. 计算目标尺寸
2. 判断是否需要添加图像水印，不需要时直接执行`convert`命令处理图像。
3. 判断是否存在裁剪/翻转/EXIF 非正常方向/模糊几种操作之一，不存在则直接执行`composite`命令处理图像。
4. 需要先执行`convert`命令处理图像到临时文件，再使用`composite`命令添加图片水印，最后删除临时文件。

`convert`命令操作执行顺序：
1. 矫正方向（依据 EXIF 方向）。
2. 重采样滤镜类型设置
3. 裁剪
4. 缩放
5. 旋转
6. 翻转（垂直/水平）
7. 灰度化
8. 图像增强（按顺序：锐化 -> 模糊）
9. 添加文字水印；按方向或坐标放置
10. 设置输出质量
11. 设置输出DPI
12. 设置是否剥离元数据
13. 输出到文件

`composite`命令操作执行顺序：
1. 添加图片水印；按方向或坐标放置
2. 重采样滤镜类型设置
3. 缩放
4. 旋转
5. 灰度化
6. 锐化
7. 设置输出质量
8. 设置输出DPI 
9. 设置是否剥离元数据
10. 输出到文件

`convert` + `composite`命令操作执行顺序：
1. 同`convert`命令操作执行顺序
2. 输出到临时文件
3. 添加图片水印；按方向或坐标放置
4. 输出到文件
5. 删除临时文件

### 异常与容错
- 输入或输出类型不受支持时抛出[不支持的图片类型异常](/starter/image/exception#不支持的图片类型异常)。
- `GraphicsMagick`命令失败或进程通信错误时抛出[图像操作异常](/starter/image/exception#图像操作异常)

## 自定义实现
你也可以实现自己的版本来覆盖我的默认实现，比如基于`FFMPEG`或`OpenCV`

### 实现参考
```java
// 如果不需要增加OpenCV的专属图像操作，也可以不定义这个
public class OpencvImageOperation extends ImageOperation {
	public static class OpencvImageOperationBuilder extends ImageOperationBuilder<OpencvImageOperationBuilder, OpencvImageOperation> {
		public OpencvImageOperationBuilder() {
			super(new OpencvImageOperation());
		}
	}
}

// 实现ImageTemplate接口
public class OpencvImageTemplate implements ImageTemplate {
	@Override
	public ImageFile read(File file) throws UnSupportedTypeException, ImageParsingException, ImageOperationException, IOException {
		return null;
	}

	@Override
	public void process(File inputFile, File outputFile, ImageOperation operation) throws UnSupportedTypeException, ImageParsingException, ImageOperationException, IOException {
		ImageTemplate.super.process(inputFile, outputFile, operation);
	}

	@Override
	public void process(ImageFile imageFile, File outputFile, ImageOperation operation) throws UnSupportedTypeException, ImageParsingException, ImageOperationException, IOException {

	}

	@Override
	public boolean canRead(File file) throws IOException {
		return false;
	}

	@Override
	public boolean canWrite(String format) {
		return false;
	}
}

@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public ImageTemplate opencvImageTemplate() {
		return new OpencvImageTemplate();
	}
}
```
