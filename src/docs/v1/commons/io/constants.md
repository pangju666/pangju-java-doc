---
layout: doc
---

# 常量
`io.github.pangju666.commons.io.lang.IOConstants`

| 常量名                          | 值            |               说明                |
|------------------------------|:-------------|:-------------------------------:|
| ANY_MIME_TYPE                | \*/\*        |             任意文件类型              |
| IMAGE_MIME_TYPE_PREFIX       | image/       |    图像类型MIME前缀（如："image/png"）    |
| VIDEO_MIME_TYPE_PREFIX       | video/       |    视频类型MIME前缀（如："video/mp4"）    |
| AUDIO_MIME_TYPE_PREFIX       | audio/       |   音频类型MIME前缀（如："audio/mpeg"）    |
| MODEL_MIME_TYPE_PREFIX       | model/       |    模型类型MIME前缀（如："mode/obj"）     |
| TEXT_MIME_TYPE_PREFIX        | text/        |   文本类型MIME前缀（如："text/plain"）    |
| APPLICATION_MIME_TYPE_PREFIX | application/ | 应用类型MIME前缀（如："application/pdf"） |
| DEFAULT_TIKA                 | Tika（动态获取）   |            默认Tika实例             |

```java
// 获取默认Tika单例实例
Tika tika = IOConstants.getDefaultTika();
```
