---
layout: doc
---

# 依赖管理

## 类型转换

### [mapstruct](https://mapstruct.org/documentation/installation/)
**MapStruct** 是一个用于 Java 的代码生成器，它简化了不同对象之间映射的过程。通常在开发过程中，我们需要将数据从一个对象（如数据库实体）转换为另一个对象（如 DTO 数据传输对象）。手动编写这些转换代码既繁琐又容易出错，而 `MapStruct` 通过注解处理器自动生成类型安全的映射代码，从而提高了开发效率和代码质量。
```xml
<dependency>
    <groupId>org.mapstruct</groupId>
    <artifactId>mapstruct</artifactId>
</dependency>

<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <annotationProcessorPaths>
            <path>
                <groupId>org.mapstruct</groupId>
                <artifactId>mapstruct-processor</artifactId>
                <version>${mapstruct.version}</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```
评价：建议用这个别用**BeanUtils**比较好

## 集合

### [commons-collections4](https://commons.apache.org/proper/commons-collections/userguide.html)
**Apache Commons Collections4** 是 Apache Commons 项目的一部分，专注于扩展和增强 Java 集合框架（Java Collections Framework, JCF）。它提供了许多额外的集合类型、装饰器（decorators）和实用工具类，帮助开发者更高效地处理集合数据。Collections4 是对早期版本的升级，专门针对 Java 5 及更高版本进行了优化，支持泛型和其他现代 Java 特性。
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-collections4</artifactId>
</dependency>
```

### [disruptor](https://lmax-exchange.github.io/disruptor/user-guide/index.html)
**Disruptor** 是一个高性能的线程间消息传递库，由 LMAX 开发并开源。LMAX 是一家金融交易平台公司，他们开发 Disruptor 的初衷是为了提高其交易平台的性能。Disruptor 通过使用无锁的数据结构和高效的内存管理机制，实现了极高的吞吐量和低延迟的消息传递。
```xml
<dependency>
    <groupId>com.lmax</groupId>
    <artifactId>disruptor</artifactId>
</dependency>
```
评价：可以作为消息队列的内存替代版

### [expiringmap](https://github.com/jhalterman/expiringmap/)
**ExpiringMap** 是一个用于 Java 的简单且高效的库，它允许您创建带有自动过期功能的映射（Map）。这种类型的映射非常适合需要在一段时间后自动删除条目的场景，例如缓存、会话管理等。ExpiringMap 提供了灵活的配置选项来控制键值对的有效期和过期策略。
```xml
<dependency>
    <groupId>net.jodah</groupId>
    <artifactId>expiringmap</artifactId>
</dependency>
```
评价：可以作为Redis的内存替代版

## 数学运算

### [commons-math3](https://commons.apache.org/proper/commons-math/userguide/utilities.html)
**Apache Commons Math3** 是 Apache Commons 项目的一部分，专注于提供数学计算和统计分析的功能。它提供了广泛的数学和统计操作的实现，包括线性代数、数值分析、概率分布、统计测试、优化算法等。Commons Math3 旨在为开发者提供一个强大且易于使用的工具库，适用于需要进行复杂数学运算的应用场景。
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-math3</artifactId>
</dependency>
```
评价：用的不多，不过数学计算功能挺全的

### [commons-numbers-core](https://commons.apache.org/proper/commons-numbers/userguide/index.html)
**Apache Commons Numbers Core** 是 Apache Commons Numbers 项目的一部分，专注于提供基础数学运算和数值计算的功能。它旨在补充 Java 标准库中的数学功能，并提供了更广泛的数值处理能力，包括复数、分数、伽玛函数、阶乘、组合数等。Commons Numbers Core 提供了高效且易于使用的 API，适用于需要进行复杂数值计算的应用场景
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-numbers-core</artifactId>
</dependency>
```

### [big-math](https://eobermuhlner.github.io/big-math/)
使用任意精度的高级 Java BigDecimal 数学函数（pow、sqrt、log、sin......）。
```xml
<dependency>
    <groupId>ch.obermuhlner</groupId>
    <artifactId>big-math</artifactId>
</dependency>
```
评价：BigDecimal数学函数基本都有，可以省去自己动手的功夫

## 字符串

### [commons-text](https://commons.apache.org/proper/commons-text/userguide.html)
**Apache Commons Text** 是 Apache Commons 项目的一部分，专注于提供一系列用于文本处理的实用工具和算法。它扩展了 Java 标准库中的字符串处理功能，提供了更丰富的文本操作方法，如字符串相似度计算、字符替换、模式匹配等。Commons Text 适用于需要进行复杂文本处理的应用场景，能够简化代码并提高开发效率。
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-text</artifactId>
</dependency>
```
评价：字符串转换功能不错，其他功能没用过

### [hanlp](https://github.com/hankcs/HanLP)
**HanLP**（Han Language Processing）是由 复旦大学 NLP 实验室的 hankcs（韩家炜团队成员之一）开发并维护的一系列中文自然语言处理工具库。它是目前 Java 和 Python 生态中功能最全面、性能优异、文档完善的开源中文 NLP 工具之一。

HanLP 不仅仅是一个分词器，而是一个集分词、词性标注、命名实体识别、句法分析、文本分类、摘要生成等于一体的综合性 NLP 框架。
```xml
<dependency>
    <groupId>com.hankcs</groupId>
    <artifactId>hanlp</artifactId>
</dependency>
```
评价：我主要用来获取字符串的拼音表示

## 反射

### [reflections](https://github.com/ronmamo/reflections?tab=readme-ov-file)
**Reflections** 会扫描项目的类路径元数据并编制索引，允许在运行时对类型系统进行反向传递查询。
```xml
<dependency>
    <groupId>org.reflections</groupId>
    <artifactId>reflections</artifactId>
</dependency>  
```
评价：写库的话非常用得上，功能很实用

## 加密

### [commons-crypto](https://commons.apache.org/proper/commons-crypto/userguide.html)
**Apache Commons Crypto** 是 Apache Commons 项目的一部分，专注于提供高性能且易于使用的加密库。它封装了 Java Cryptography Extension (JCE) 和 OpenSSL 的功能，旨在简化加密操作并提高性能。Commons Crypto 支持多种加密算法，包括对称加密、非对称加密、哈希函数和消息认证码（MAC），适用于需要安全数据处理的应用场景。
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-crypto</artifactId>
</dependency>
```
**Tips:** 不支持非对称加密，如**RSA**

评价：里面的加密解密**IO流**很实用

### [jasypt](http://www.jasypt.org/)
**Jasypt**（Java Simplified Encryption）是一个用于简化 Java 应用程序中加密操作的开源库。它提供了对文本、字符串、类路径资源等的简单加密功能，使得开发者可以轻松地在应用程序中集成安全的加密机制。Jasypt 支持多种加密算法，并且可以通过简单的配置来实现加密和解密操作。
```xml
<dependency>
    <groupId>org.jasypt</groupId>
    <artifactId>jasypt</artifactId>
</dependency>
```
**Tips:** 不支持非对称加密，如**RSA**

评价：里面的加密接口封装的很好，内置的**AES**加密器实现的也很有参考价值，一般有加密需求的都可以用这个

### [zero-allocation-hashing](https://github.com/OpenHFT/Zero-Allocation-Hashing)
zero-allocation-hashing 是一个 高性能、无垃圾回收（GC-free）、零内存分配 的 Java 哈希函数库，专为 低延迟、高吞吐场景（如金融交易系统、高频日志、网络协议处理）设计。
```xml
<dependency>
    <groupId>net.openhft</groupId>
    <artifactId>zero-allocation-hashing</artifactId>
</dependency>
```
评价：快速计算摘要的话就选这个

## IO

### [commons-io](https://commons.apache.org/proper/commons-io/description.html)
**Commons IO** 是 Apache 软件基金会提供的一个Java库，旨在简化与文件系统、输入输出流相关的常见编程任务。它提供了一系列实用工具类和方法，使得处理文件、目录、流等操作更加简便。
```xml
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
</dependency>
```

### [commons-exec](https://commons.apache.org/proper/commons-exec/commandline.html)
**Apache Commons Exec** 是 Apache Commons 项目的一部分，旨在提供一个更强大和灵活的方式来执行外部进程。它扩展了 Java 标准库中的 `java.lang.ProcessBuilder` 和 `Runtime.exec()` 方法，提供了更多的功能和更好的错误处理机制。Commons Exec 主要用于需要在 Java 应用程序中启动和管理外部命令或脚本的场景。
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-exec</artifactId>
</dependency>
```
评价：调外部程序或者shell脚本很方便

### [commons-compress](https://commons.apache.org/proper/commons-compress/examples.html)
**Apache Commons Compress** 是 Apache Commons 项目的一部分，专注于提供处理各种压缩和归档格式的库。它支持读取和写入多种常见的压缩和归档文件格式，如 ZIP、TAR、JAR、7z、BZIP2、GZIP、XZ 和 Pack200 等。Commons Compress 使得在 Java 应用程序中处理这些格式变得简单而高效。
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-compress</artifactId>
</dependency>
```
**Tips:** **7z**格式需要第三方包支持
```xml
<dependency>
    <groupId>org.tukaani</groupId>
    <artifactId>xz</artifactId>
</dependency>
```
评价：主流支持zip和7z，rar不支持

### [zip4j](https://github.com/srikanth-lingala/zip4j)
**Zip4j** 是一个功能强大、轻量级、纯 Java 实现的 ZIP 文件处理库，专注于提供对 标准 ZIP 格式、分卷压缩、Unicode 支持以及最重要的 —— 加密（AES 和传统） 的完整支持。它是目前 Java 生态中 最流行、最可靠的 ZIP 加解密解决方案之一。
```xml
<dependency>
    <groupId>net.lingala.zip4j</groupId>
    <artifactId>zip4j</artifactId>
</dependency>
```
评价：如果需要加密解密zip的话用这个

### [lz4-java](https://github.com/lz4/lz4-java )
**lz4-java** 是一个高性能的 LZ4 压缩算法 的 Java 实现，由 Apache 开源（原为 lz4/lz4-java 项目），广泛用于需要 低延迟、高吞吐压缩/解压 的场景（如 Kafka、Netty、Redis、日志系统等）。
```xml
<dependency>
    <groupId>at.yawk.lz4</groupId>
    <artifactId>lz4-java</artifactId>
</dependency>
```

## 文件

### [tika-core](https://tika.apache.org/3.1.0/gettingstarted.html)
**Tika-Core** 是 Apache Tika 项目的核心模块，Apache Tika 是一个用于从各种文件类型中提取文本和元数据的强大工具。它支持超过1200种不同的文件格式，包括文档、图片、视频和音频文件等。Tika 利用了其他多种开源库（如 Apache POI、PDFBox 等）来解析这些文件，并提供了一个统一的接口来处理不同类型的文件内容。
```xml
<dependency>
    <groupId>org.apache.tika</groupId>
    <artifactId>tika-core</artifactId>
</dependency>
```
**Tips:** 解析文件格式需要拓展包
```xml
<dependency>
    <groupId>org.apache.tika</groupId>
    <artifactId>tika-parsers-standard-package</artifactId>
</dependency>

<!-- 也可以只导入单个模块的拓展包 -->
<dependency>
    <groupId>org.apache.tika</groupId>
    <artifactId>tika-parser-image-module</artifactId>
    <version>${tika.version}</version>
</dependency>
```
评价：解析文件mime-type或者解析文件元数据、内容超级好用，就是依赖的包很多，打包出来体积会有点大

### [commons-csv](https://commons.apache.org/proper/commons-csv/user-guide.html)
**Apache Commons CSV** 是 Apache Commons 项目的一部分，专注于提供一个简单且功能强大的库来读取和写入 CSV（Comma-Separated Values）文件。它支持多种 CSV 格式，并提供了灵活的 API 来处理不同风格的 CSV 文件。Commons CSV 使得在 Java 应用程序中处理 CSV 数据变得更加容易和高效。
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-csv</artifactId>
</dependency>
```

### [poi](https://poi.apache.org/components/index.html)
`Apache POI` 是一个强大的Java库，用于操作各种基于Office Open XML标准的文件格式，比如Microsoft Office的Word、Excel和PowerPoint文档。它由Apache软件基金会维护，提供了丰富的API接口，使得开发者能够读取、创建和修改这些文件。
```xml
<!-- doc、xls、ppt -->
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-scratchpad</artifactId>
</dependency>

<!-- docx、xlsx、pptx -->
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-oomxl</artifactId>
</dependency>
```

### [poi-tl](http://deepoove.com/poi-tl/)
**Poi-tl**（POI Template Language）是一个基于 Apache POI 的 Java 模板引擎，专门用于生成 Word 文档（.docx）。它允许开发者通过在模板文档中定义占位符来动态填充内容，从而简化了 Word 文档的生成过程。POI-TL 提供了丰富的功能来处理文本、图片、表格、列表等元素，并支持复杂的样式和格式设置。
```xml
<dependency>
    <groupId>com.deepoove</groupId>
    <artifactId>poi-tl</artifactId>
</dependency>
```
评价：只支持docx，如果可以把输出文档抽象成模板，那么用它渲染总是没错的，比poi方便太多

### [poi-tl-plugin-highlight](https://deepoove.com/poi-tl/#plugin-highlight)
HighlightRenderPolicy 插件对Word代码块进行高亮展示。
```xml
<dependency>
    <groupId>com.deepoove</groupId>
    <artifactId>poi-tl-plugin-highlight</artifactId>
</dependency>
```

### [poi-tl-plugin-markdown](https://deepoove.com/poi-tl/#plugin-markdown)
MarkdownRenderPolicy 插件支持通过Markdown生成word文档。
```xml
<dependency>
    <groupId>com.deepoove</groupId>
    <artifactId>poi-tl-plugin-markdown</artifactId>
</dependency>
```

### [fastexcel](https://idev.cn/fastexcel/zh-CN/docs)
**FastExcel** 是一个用于快速读取和写入 Excel 文件的 Java 库。它旨在提供比 Apache POI 更快的性能，特别是在处理大型 Excel 文件时。FastExcel 通过减少内存占用和优化数据处理流程来实现高效的数据操作。它支持 Excel 的多种格式（如 XLSX），并且提供了简洁易用的 API。
```xml
<dependency>
    <groupId>cn.idev.excel</groupId>
    <artifactId>fastexcel</artifactId>
</dependency>
```
评价：easy-excel新版，easy-excel已经不维护了

### [pdfbox](https://pdfbox.apache.org/3.0/migration.html)
**Apache PDFBox** 是一个开源的 Java 库，用于处理 PDF 文档。它提供了丰富的功能，使开发者能够创建、修改、提取文本和图像、加密/解密、打印 PDF 文件等。PDFBox 是 Apache 软件基金会的一部分，具有良好的文档和支持社区。
```xml
<dependency>
    <groupId>org.apache.pdfbox</groupId>
    <artifactId>pdfbox</artifactId>
</dependency>
```
**Tips:** **jbig2**格式需要拓展包支持
```xml
<dependency>
    <groupId>org.apache.pdfbox</groupId>
    <artifactId>jbig2-imageio</artifactId>
</dependency>
```
**Tips:** **jpeg2000**格式需要拓展包支持
```xml
<dependency>
    <groupId>com.github.jai-imageio</groupId>
    <artifactId>jai-imageio-core</artifactId>
</dependency>
<dependency>
    <groupId>com.github.jai-imageio</groupId>
    <artifactId>jai-imageio-jpeg2000</artifactId>
</dependency>
```
评价：文件太大，容易内容溢出（如果是用于获取每一页的图片之类的，建议还是用命令行调用外部程序更合适，例如：[mupdf](https://www.mupdf.com/)）

### fontbox
**FontBox** 是 Apache PDFBox 项目的一部分，专门用于处理字体文件。它提供了对多种字体格式的支持，包括 TrueType（TTF）、OpenType（OTF）和 Type 1 字体。FontBox 允许开发者在 Java 应用程序中加载、解析和使用这些字体文件，特别适用于需要处理 PDF 文档的场景。
```xml
<dependency>
    <groupId>org.apache.pdfbox</groupId>
    <artifactId>fontbox</artifactId>
</dependency>
```

## 图像

### [metadata-extractor](https://github.com/drewnoakes/metadata-extractor/wiki/Getting-Started-(Java))
**Metadata Extractor** 是一个用于从多种图像格式中提取元数据的 Java 库。它支持从 JPEG、TIFF、PNG、GIF、BMP、WebP 等多种图片文件中读取元数据，并且能够解析这些图片中的 EXIF、IPTC 和 XMP 等标准格式的元数据。这个库非常适合需要处理和分析图片元数据的应用场景，例如照片管理软件、图像处理工具等。

```xml
<dependency>
    <groupId>com.drewnoakes</groupId>
    <artifactId>metadata-extractor</artifactId>
</dependency>
```
评价：主要用来读取元数据，比如手机相机拍摄的图片，需要根据方向（**ORIENTATION**）属性，来读取宽高

### [thumbnailator](https://github.com/coobird/thumbnailator/wiki/Examples)
**Thumbnailator** 是一个用于 Java 的高效、易用的缩略图生成库。它简化了创建高质量缩略图的过程，支持多种图像处理操作，如缩放、旋转、裁剪和水印添加等。Thumbnailator 旨在提供简单而强大的 API，使得开发者可以轻松地将缩略图生成功能集成到自己的应用程序中。
```xml
<dependency>
    <groupId>net.coobird</groupId>
    <artifactId>thumbnailator</artifactId>
</dependency>
```
评价：使用很方便，就是文件大了容易内存溢出（如果并发高或者图片比较大的话，建议还是用命令行调用外部程序更合适，例如：[graphicsmagick](http://www.graphicsmagick.org/)）

### [twelvemonkeys](https://github.com/haraldk/TwelveMonkeys)
**TwelveMonkeys**（全称：TwelveMonkeys ImageIO）是一个功能强大的 Java 图像处理开源库，专注于扩展 Java 平台内置的 ImageIO 框架，提供对更多图像格式的支持，并修复标准 JDK 中图像处理的一些限制和缺陷。
```xml
<dependency>
    <groupId>com.twelvemonkeys.common</groupId>
    <artifactId>common-image</artifactId>
</dependency>
```

**Tips:** 部分图像格式需要拓展包
```xml
<!-- BMP、CUR、ICO -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-bmp</artifactId>
</dependency>

<!-- TIFF、BigTIFF -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-tiff</artifactId>
</dependency>

<!-- XWD -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-xwd</artifactId>
</dependency>

<!-- PCX、DCX -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-pcx</artifactId>
</dependency>

<!-- DDS -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-dds</artifactId>
</dependency>

<!-- Thumbs.db -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-thumbsdb</artifactId>
</dependency>

<!-- TGA -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-tga</artifactId>
</dependency>

<!-- PSD、PSB -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-psd</artifactId>
</dependency>

<!-- WebP -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-webp</artifactId>
</dependency>

<!-- PICT -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-pict</artifactId>
</dependency>

<!-- SGI -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-sgi</artifactId>
</dependency>

<!-- PAM、PBM、PGM、PPM、PFM -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-pnm</artifactId>
</dependency>

<!-- IFF -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-iff</artifactId>
</dependency>

<!-- ICNS -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-icns</artifactId>
</dependency>

<!-- HDR -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-hdr</artifactId>
</dependency>

<!-- JPEG -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-jpeg</artifactId>
</dependency>

<!-- SVG、WMF -->
<dependency>
    <groupId>com.twelvemonkeys.imageio</groupId>
    <artifactId>imageio-batik</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.xmlgraphics</groupId>
    <artifactId>batik-anim</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.xmlgraphics</groupId>
    <artifactId>batik-extension</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.xmlgraphics</groupId>
    <artifactId>batik-rasterizer-ext</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.xmlgraphics</groupId>
    <artifactId>batik-svggen</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.xmlgraphics</groupId>
    <artifactId>batik-transcoder</artifactId>
</dependency>
```
评价：功能挺丰富的，例如：生成缩略图、灰度化、调整亮度、调整对比度等

### [boofcv](https://boofcv.org)
**BoofCV**（Boof Computer Vision）是一个功能强大、完全用 Java 编写的开源计算机视觉库，专为实时处理和嵌入式系统设计。它由 Peter Abeles 开发并维护，目标是提供一个无需依赖本地代码（如 C/C++ 库）的纯 Java 计算机视觉解决方案，适用于 Android、桌面应用和服务器端图像处理。
```xml
<dependency>
    <groupId>org.boofcv</groupId>
    <artifactId>boofcv-core</artifactId>
    <version>${boofcv.version}</version>
</dependency>
```

### [jai-imageio-core](https://github.com/jai-imageio/jai-imageio-core)
**JAI Image I/O Tools（jai-imageio-core）** 是一个用于处理图像输入输出的 Java 库，它是 Java Advanced Imaging (JAI) API 的一部分。该库扩展了标准的 Java Image I/O 框架，提供了对更多图像格式的支持，并增强了图像处理功能。它特别适用于需要读取、写入和处理多种图像格式的应用程序。
```xml
<dependency>
    <groupId>com.github.jai-imageio</groupId>
    <artifactId>jai-imageio-core</artifactId>
</dependency>
```
**Tips:** **jpeg2000**格式需要拓展包支持
```xml
<dependency>
    <groupId>com.github.jai-imageio</groupId>
    <artifactId>jai-imageio-jpeg2000</artifactId>
</dependency>
```
评价：主要是结合apache-pdbox用，没有单独使用过

### jbig2-imageio
**jbig2-imageio** 是一个用于 Java 的开源库，它提供了对 JBIG2 格式图像的支持。JBIG2 是一种高效的二值图像压缩标准，常用于扫描文档、传真和黑白图像的存储。通过使用 jbig2-imageio，您可以在 Java 应用程序中读取和写入 JBIG2 图像文件，从而扩展了标准 Java Image I/O API 的功能。
```xml
<dependency>
    <groupId>org.apache.pdfbox</groupId>
    <artifactId>jbig2-imageio</artifactId>
</dependency>
```
评价：主要是结合apache-pdbox用，没有单独使用过

## XML
### [dom4j](https://dom4j.github.io/)
`dom4j` 是一个用于处理 XML 的 Java 库，它提供了非常灵活且功能强大的 API 来解析、生成、操作和转换 XML 文档。`dom4j` 支持 XPath 查询、XSLT 转换以及对 DOM 和 SAX 模型的完整支持，使其成为处理 XML 数据的理想选择之一。
```xml
<dependency>
    <groupId>org.dom4j</groupId>
    <artifactId>dom4j</artifactId>
</dependency>
```

## 网络

### [commons-net](https://commons.apache.org/proper/commons-net/index.html)
**Apache Commons Net** 库实现了许多基础的网络协议，使得 Java 开发者可以轻松地进行网络编程而无需深入了解每个协议的具体实现细节。它封装了多种常用的 Internet 协议，包括 FTP、NNTP、SMTP、POP3 等，并提供了丰富的 API 来操作这些协议。
```xml
<dependency>
    <groupId>commons-net</groupId>
    <artifactId>commons-net</artifactId>
</dependency>
```

### [resilience4j](https://resilience4j.readme.io/docs/getting-started)
`Resilience4j` 是一个轻量级、易于使用的容错库，专为 Java 8 及以上版本设计。它提供了多种模式来帮助开发者构建具有弹性的应用程序，能够有效地处理系统中的故障和不稳定性。

Spring Boot项目导入：
```xml
<dependency> 
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-spring-boot3</artifactId>
</dependency>
```
只使用限速器：
```xml
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-ratelimiter</artifactId>
</dependency>
```
评价：我主要用里面的限流库（[resilience4j-ratelimiter](https://mvnrepository.com/artifact/io.github.resilience4j/resilience4j-ratelimiter)）

### [jsoup](https://jsoup.org/)
`Jsoup` 是一个用于处理 HTML 的 Java 库，它提供了非常方便的 API 来解析、操作、遍历和清理 HTML 文档，特别适合用于网页抓取（Web Scraping）、HTML 清理（Sanitization） 和 数据提取。
```xml
<dependency>
    <groupId>org.jsoup</groupId>
    <artifactId>jsoup</artifactId>
</dependency>
```

### [ipaddress](https://seancfoley.github.io/IPAddress/)
`ipaddress` 是一个功能强大的 Java 库，用于处理 IPv4 和 IPv6 地址及地址段（CIDR）。它提供了比 Java 标准库（如 InetAddress）更丰富、更直观的 API，特别适合在需要进行 IP 地址验证、解析、子网计算、范围判断等场景中使用。
```xml
<dependency>
    <groupId>com.github.seancfoley</groupId>
    <artifactId>ipaddress</artifactId>
</dependency>
```

## 鉴权

### [java-jwt](https://github.com/auth0/java-jwt#getting-started)
**Java JWT（JSON Web Token）** 是一个用于生成和验证 JWT 的 Java 库。JWT 是一种开放标准（RFC 7519），它定义了一种紧凑且自包含的方式，用于在各方之间安全地传输信息作为 JSON 对象。此信息可以被验证和信任，因为它是数字签名的。JWT 可以使用 HMAC 算法或 RSA 公钥/私钥对进行签名。
```xml
<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>java-jwt</artifactId>
</dependency>
```

### [sa-token](https://sa-token.cc/doc.html#/)
`Sa-Token` 是一个轻量级且功能强大的 Java 权限认证框架，适用于各种类型的 Java 应用程序。它旨在简化权限认证相关的开发工作，提供了一套简洁的 API 和丰富的功能，支持多种认证方式和灵活的权限管理策略。

Spring Boot项目导入：
```xml
<dependency> 
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-spring-boot3-starter</artifactId>
</dependency>
```

## 数据库
### [mybatis-plus](https://baomidou.com/introduce/)
`MyBatis-Plus` 是一个 MyBatis 的增强工具，旨在简化开发、提高效率。它在不改变 MyBatis 原有功能的基础上，提供了更多的便捷操作和功能扩展，如代码生成器、分页插件、性能分析插件等。通过 MyBatis-Plus，开发者可以更轻松地进行数据库操作。

Spring Boot项目导入：
```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
</dependency>
```

### [mybatis](https://mybatis.org/mybatis-3/zh_CN/getting-started.html)
**MyBatis** 是一个广受欢迎的Java持久层框架，它简化了数据库编程的复杂度。通过使用 MyBatis，开发者可以更专注于业务逻辑而非 JDBC 代码、参数设置及结果集的处理。

Spring Boot项目导入：
```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
</dependency>
```

### [dynamic-datasource-spring-boot3-starter](https://www.kancloud.cn/tracy5546/dynamic-datasource/2264611)
`dynamic-datasource-spring-boot3-starter` 是一个用于 Spring Boot 3.x 应用的动态数据源切换库，它允许你在运行时根据业务需求轻松地切换不同的数据库连接。这对于需要访问多个数据库的应用程序非常有用，例如多租户系统、读写分离架构等。
```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>dynamic-datasource-spring-boot3-starter</artifactId>
</dependency>
```
评价：个人感觉很好用，结合他家的**mybatis-plus**很方便

### [redisson](https://redisson.org/docs/overview/)
`Redisson` 是一个用于 Redis 的 Java 客户端，它极大地简化了基于 Redis 的分布式应用程序开发。Redisson 提供了许多高级功能和数据结构，使得在分布式环境中使用 Redis 更加便捷和高效。

Spring Boot项目导入：
```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson-spring-boot-starter</artifactId>
</dependency>
```
评价：里面的分布式锁很好用

### [p6spy](https://p6spy.readthedocs.io/en/latest/install.html)
`P6Spy` 是一个开源库，主要用于在 Java 应用程序中拦截和记录数据库操作。它可以帮助开发者调试和监控应用程序中的 SQL 语句执行情况，而无需修改现有的代码。P6Spy 可以与多种数据源和框架（如 JDBC、MyBatis、Hibernate 等）无缝集成，适用于 Spring Boot 等现代应用开发环境。
```xml
<dependency>
    <groupId>p6spy</groupId>
    <artifactId>p6spy</artifactId>
</dependency>
```

配置文件（`resources/spy.properties`）示例
```INI
#3.2.1以上使用
modulelist=com.baomidou.mybatisplus.extension.p6spy.MybatisPlusLogFactory,com.p6spy.engine.outage.P6OutageFactory
#3.2.1以下使用或者不配置
#modulelist=com.p6spy.engine.logging.P6LogFactory,com.p6spy.engine.outage.P6OutageFactory
# 自定义日志打印
logMessageFormat=com.baomidou.mybatisplus.extension.p6spy.P6SpyLogger
#日志输出到控制台
appender=com.baomidou.mybatisplus.extension.p6spy.StdoutLogger
# 使用日志系统记录 sql
#appender=com.p6spy.engine.spy.appender.Slf4JLogger
# 设置 p6spy driver 代理
deregisterdrivers=true
# 取消JDBC URL前缀
useprefix=true
# 配置记录 Log 例外,可去掉的结果集有error,info,batch,debug,statement,commit,rollback,result,resultset.
excludecategories=info,debug,result,commit,resultset
# 日期格式
dateformat=yyyy-MM-dd HH:mm:ss
# 实际驱动可多个
#driverlist=org.h2.Driver
# 是否开启慢SQL记录
outagedetection=true
# 慢SQL记录标准 2 秒
outagedetectioninterval=2
```

评价：主要用来在开发和测试环境打印**SQL**用的，挺方便的，比**mybatis**的日志强多了

### [spring-vault](https://projects.spring.io/spring-vault/spring-vault-core/)
`Spring Vault Core` 是 Spring 提供的一个库，用于简化与 HashiCorp Vault 的集成。HashiCorp Vault 是一个用于安全访问秘密（如 API 密钥、密码、证书等）的工具，它提供了统一的接口来管理、存储和访问这些敏感信息。通过使用 Spring Vault，开发者可以在 Spring 应用中方便地与 Vault 进行交互，并安全地获取和使用敏感数据。
```xml
<dependency>
    <groupId>org.springframework.vault</groupId>
    <artifactId>spring-vault-core</artifactId>
</dependency>
```
评价：Vault可以当作配置中心用来存放一些敏感的配置

## 其他

### [commons-configuration2](https://commons.apache.org/proper/commons-configuration/userguide/quick_start.html)
**Apache Commons Configuration2** 是 Apache Commons 项目的一部分，旨在提供一个通用的框架来处理应用程序配置。它支持多种配置源（如属性文件、XML 文件、JSON 文件、JNDI、系统属性等），并允许开发者以统一的方式访问和管理这些配置。Commons Configuration2 提供了丰富的功能来读取、写入和修改配置数据，并且具有良好的扩展性和灵活性。
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-configuration2</artifactId>
</dependency>
```

### [guava](https://guava.dev/)
**Google Guava** 是一个开源的 Java 库，由 Google 开发和维护，旨在提供一系列高质量的工具类和辅助方法，以简化常见的编程任务。Guava 包含了多种实用工具，涵盖了集合（Collections）、缓存（Caching）、原生类型支持、并发库、字符串处理、I/O 等多个方面。它不仅提高了代码的可读性和可维护性，还通过优化常见操作提升了性能。
```xml
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
</dependency>
```

## 测试

### [spock](https://spockframework.org/spock/docs/2.3/spock_primer.html)
`Spock` 是一个基于 Groovy 的测试框架，专门用于 Java 和 Groovy 应用程序的单元测试和集成测试。它结合了 JUnit 的功能与 Groovy 的简洁语法，提供了更强大、更具表现力的测试工具。Spock 的测试代码通常更加易读且易于维护，支持 BDD（行为驱动开发）风格的测试编写。
```xml
<dependency>
    <groupId>org.spockframework</groupId>
    <artifactId>spock-bom</artifactId>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```

Spring Boot项目导入：
```xml
<dependency>
    <groupId>org.spockframework</groupId>
    <artifactId>spock-spring</artifactId>
</dependency>
```

**Tips:** 需要配置groovy编译插件使用
```xml
<plugin>
    <groupId>org.codehaus.gmavenplus</groupId>
    <artifactId>gmavenplus-plugin</artifactId>
</plugin>
```
评价：我现在写单元测试挺喜欢用Spock + Groovy，语法更自由一些

### [datafaker](https://www.datafaker.net )
`Datafaker` 是一个用于生成逼真但虚构的测试数据的 Java 库，非常适合在开发、测试、演示或填充数据库时使用。
```xml
<dependency>
    <groupId>net.datafaker</groupId>
    <artifactId>datafaker</artifactId>
</dependency>
```


