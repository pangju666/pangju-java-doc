---
layout: doc
---

# 常量
`io.github.pangju666.commons.image.lang.ImageConstants`

| 常量名                           | 值                                                    |         说明         |
|-------------------------------|:-----------------------------------------------------|:------------------:|
| NON_TRANSPARENT_IMAGE_FORMATS | Set.of("jpeg", "jpg", "jpeg-lossless", "bmp", "gif") |   不支持透明通道的图像格式集合   |
| SUPPORT_READ_IMAGE_TYPES      | Set\<String>（动态获取）                                   | 系统支持的可读取图像MIME类型集合 |
| SUPPORT_WRITE_IMAGE_TYPES     | Set\<String> （动态获取）                                  | 系统支持的可写入图像MIME类型集合 |

```java
// 获取系统支持的可读取图像MIME类型集合
Set<String> readImageTypes = IOConstants.getSupportReadImageTypes();

// 获取系统支持的可写入图像MIME类型集合
Set<String> writeImageTypes = IOConstants.getSupportWriteImageTypes();
```
