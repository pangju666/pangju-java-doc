---
layout: doc
---

# 文件

## 工具类
`io.github.pangju666.commons.io.utils.FileUtils`

在继承`org.apache.commons.io.FileUtils`的基础上，我添加一些自己总结的通用方法

| 方法名               | 返回值     |        用途         |
|-------------------|:--------|:-----------------:|
| getMimeType       | String  |    获取文件MIME类型     |
| isImageType       | boolean |     判断是否为图片类型     |
| isTextType        | boolean |     判断是否为文本类型     |
| isModelType       | boolean |     判断是否为模型类型     |
| isVideoType       | boolean |     判断是否为视频类型     |
| isAudioType       | boolean |     判断是否为音频类型     |
| isApplicationType | boolean |     判断是否为应用类型     |
| isMimeType        | boolean |    精确匹配MIME类型     |
| isAnyMimeType     | boolean |    批量匹配MIME类型     |
| rename            | String  | 完全替换文件名（包含名称和扩展名） |
| replaceBaseName   | String  | 替换文件基名（保留扩展名和路径）  |
| replaceExtension  | String  |      替换文件扩展名      |
| isDirectoryPath   | boolean |    判断路径是否为目录路径    |
| isFilePath        | boolean |    判断路径是否为文件路径    |
