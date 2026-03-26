---
layout: doc
---

# Http响应工具类
`io.github.pangju666.framework.web.servlet.utils.RangeDownloadUtils`

这个工具类主要就一个方法`download`，其他都是我暴露出去方便用户自己处理分片下载的。

常见Range请求头格式：
- bytes=0-499：请求前500字节
- bytes=500-999：请求第500-999字节
- bytes=0-499, 1000-1499：请求多个区间（多范围）
- bytes=500-：请求第500字节到结尾
- bytes=-500：请求最后 500 个字节

| 方法名                   | 返回值          |     说明      |
|-----------------------|:-------------|:-----------:|
| download              | void         | 支持分片的下载请求处理 |
| getRanges             | List\<Range> |  解析和验证范围请求  |
| writeRangesToResponse | void         | 将文件分片内容写入响应 |
| writeRangeHeaders     | void         | 写入响应的分片头信息  |


## 字节数组分片
支持分片的字节数组下载处理，处理流程：
1. 检查请求中是否包含`Range`请求头
2. 如果没有`Range`请求头，则返回完整字节数组
3. 如果有`Range`请求头，解析请求的范围
4. 验证请求范围的有效性
5. 返回请求范围的字节数据

```java
byte[] bytes; // 请求下载的字节数组
HttpServletRequest request; // 请求信息
HttpServletResponse response; // 响应信息
RangeDownloadUtils.download(bytes, request, response);
```

## 文件分片
支持分片的文件下载处理，处理流程：
1. 检查请求中是否包含`Range`请求头
2. 如果没有`Range`请求头，则返回完整字节数组
3. 如果有`Range`请求头，解析请求的范围
4. 验证请求范围的有效性
5. 返回请求范围的文件数据

```java
File file; // 请求下载的文件
HttpServletRequest request; // 请求信息
HttpServletResponse response; // 响应信息
RangeDownloadUtils.download(bytes, request, response);
```
