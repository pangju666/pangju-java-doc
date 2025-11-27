---
layout: doc
---

# 枚举

## 裁剪类型
`io.github.pangju666.framework.boot.image.enums.CropType`

| 枚举值    |          说明           |                          
|--------|:---------------------:|
| CENTER |   以图片中心为基准按目标尺寸进行裁剪   |
| OFFSET | 根据偏移量（起点坐标）与目标尺寸进行裁剪  |
| RECT   | 按给定矩形区域（左上角坐标与宽高）进行裁剪 |  

## 翻转方向
`io.github.pangju666.framework.boot.image.enums.FlipDirection`

| 枚举值        |     说明     |                          
|------------|:----------:|
| HORIZONTAL | 水平翻转（左右镜像） |
| VERTICAL   | 垂直翻转（上下镜像） |

## 旋转方向
`io.github.pangju666.framework.boot.image.enums.RotateDirection`

| 枚举值                  |         说明         |                          
|----------------------|:------------------:|
| CLOCKWISE_90         | 顺时针旋转 90 度（等价于向右转） |
| COUNTER_CLOCKWISE_90 | 逆时针旋转 90 度（等价于向左转） |
| UPSIDE_DOWN          |   旋转 180 度（上下颠倒）   |

## 重采样过滤器
`io.github.pangju666.framework.boot.image.enums.ResampleFilter`

### 使用说明
在缩放操作中选择不同滤镜以平衡质量与性能； 低阶滤镜（如`POINT`、`BOX`）速度更快但细节较差，高阶滤镜（如`LANCZOS`、`SINC`）质量更好但计算更慢。

### 术语说明
- 振铃（ringing）：在锐利边缘附近出现明暗交替的细条纹/光晕，常见于使用理想低通近似（如`Sinc`、`Lanczos`）时的过冲/欠冲，并非锯齿。
- 锯齿（aliasing/jaggies）：斜线或曲线边缘呈台阶状的块状边缘，多由采样不足或缩小时未进行足够预滤导致，与振铃不同。

### 选择建议
- 质量优先且可接受轻微振铃：优选`LANCZOS`、`MITCHELL`。
- 需要降低振铃、获得更平滑边缘：优选窗函数类 `BLACKMAN`/`HANNING`/`HAMMING`或`BESSEL`，但细节会更柔和。
- 性能或像素风格：使用`POINT`/`BOX`，注意锯齿明显。
- 通用均衡：`CUBIC`或`QUADRATIC` 在锐度与平滑之间有良好折中。
- 小幅缩放与锯齿抑制：`HERMITE`、`TRIANGLE`，边缘更柔和。
- 边缘更锐利但可能振铃：`CATROM`。
- 极致细节且可接受明显振铃与较慢计算：`SINC`。
- 柔化伪影/噪声（整体更模糊）：`GAUSSIAN`。

> [!TIP]
> 大部分场景下默认使用`LANCZOS`即可，一般建议不要修改。

| 枚举值       |          说明           |
|-----------|:---------------------:|
| POINT     | 速度最快、锯齿明显；适合像素风或极少量缩放 | 
| BOX       |   快速但偏模糊；适合缩小时的粗略平滑   |    
| TRIANGLE  |     速度与质量折中；边缘较柔和     | 
| HERMITE   |   相对柔和，抑制锯齿；适合小幅缩放    | 
| HANNING   |     抑制振铃，平滑；适合缩小      | 
| HAMMING   |       抑制振铃；适合缩小       | 
| BLACKMAN  |   更强的振铃抑制，较平滑；细节略损失   | 
| GAUSSIAN  |    柔和平滑，避免伪影；可能偏模糊    | 
| QUADRATIC |    质量介于线性与立方之间；稳健     | 
| CUBIC     |   通用高质量；锐度与平滑度平衡良好    | 
| CATROM    |   更锐利，边缘保留好；可能出现振铃    | 
| MITCHELL  |   平衡锐度与平滑；放大/缩小均适用    | 
| LANCZOS   |   高质量与高锐度；计算较慢，可能振铃   | 
| BESSEL    |     平滑且细腻；细节保留一般      | 
| SINC      |     细节最好但振铃明显；最慢      |
