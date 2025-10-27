---
layout: doc
---

# Excel

## 工具类
`io.github.pangju666.commons.poi.utils.WorkbookUtils`

Excel文档操作是POI里我用的最多的模块，所以封装的方法也是最多的。

| 方法名                        | 返回值                   |       用途        |
|----------------------------|:----------------------|:---------------:|
| isXls                      | boolean               |  检查文件是否为XLS格式   |
| isXlsx                     | boolean               |  检查文件是否为XLSX格式  |
| isWorkbook                 | boolean               | 检查文件是否为XLS或XLSX |
| getWorkbook                | Workbook              |   读取Excel工作簿    |
| getSheets                  | List\<Sheet>          |     获取所有工作表     |
| getRows                    | List\<Row>            |      获取所有行      |
| getCells                   | List\<Cell>           |     获取所有单元格     |
| sheetStream                | Stream\<Sheet>        |   创建所有工作表的顺序流   |
| rowStream                  | Stream\<Row>          |    创建所有行的顺序流    |
| cellStream                 | Stream\<Cell>         |   创建所有单元格的顺序流   |
| getMergedRegionCell        | Cell                  | 获取合并单元格区域中的单元格  |
| isEmptyCell                | boolean               |    判断单元格是否为空    |
| getStringCellValue         | String                |   获取单元格的字符串值    |
| getStringFormulaCellValue  | String                |  获取公式单元格的字符串值   |
| getNumericCellValue        | Double                |   获取单元格的数值型值    |
| getNumericFormulaCellValue | Double                |  获取公式单元格的数值型值   |
| getBooleanCellValue        | Boolean               |   获取单元格的布尔型值    |
| getBooleanFormulaCellValue | Boolean               |  获取公式单元格的布尔型值   |
| getDateCellValue           | Date                  |    获取单元格的日期值    |
| countRow                   | int                   |    统计工作表中的行数    |
| countCell                  | int                   |   统计行中的单元格数量    |
| createRowIfAbsent          | Row                   |   获取或创建工作表中的行   |
| createCellIfAbsent         | Cell                  |   获取或创建行中的单元格   |
| createTitleRow             | Map\<String, Integer> |      创建标题行      |
| setAdjustColWidth          | void                  |    自动调整列的宽度     |
| addRow                     | void                  |  添加新行并应用消费者操作   |
| insertRow                  | void                  | 在指定位置插入新行并填充数据  |
| createCell                 | void                  |  创建单元格并设置值和样式   |

### 检查文件是否为XLS格式
底层基于`tika`实现

```java
File file = new File("test.xls");

WorkbookUtils.isXls(file); // true
WorkbookUtils.isXls(FileUtils.readFileToByteArray(file); // true
WorkbookUtils.isXls(FileUtils.openInputStream(file)); // true
```

### 检查文件是否为XLSX格式
底层基于`tika`实现

```java
File file = new File("test.xlsx");

WorkbookUtils.isXls(file); // true
WorkbookUtils.isXls(FileUtils.readFileToByteArray(file); // true
WorkbookUtils.isXls(FileUtils.openInputStream(file)); // true
```

### 检查文件是否为XLS或XLSX
底层基于`tika`实现

```java
File file = new File("test.xlsx"); 
WorkbookUtils.isXls(file); // true
WorkbookUtils.isXls(FileUtils.readFileToByteArray(file); // true
WorkbookUtils.isXls(FileUtils.openInputStream(file)); // true

File file2 = new File("test.xls");
WorkbookUtils.isWorkbook(file2); // true
WorkbookUtils.isWorkbook(FileUtils.readFileToByteArray(file2); // true
WorkbookUtils.isWorkbook(FileUtils.openInputStream(file2)); // true
```

### 读取Excel文件
```java
File file = new File("test.xlsx"); 
WorkbookUtils.getWorkbook(file); // XSSFWorkbook
WorkbookUtils.getWorkbook(file, PoiConstants.XLSX_MIME_TYPE); // XSSFWorkbook
WorkbookUtils.getWorkbook(FileUtils.readFileToByteArray(file); // XSSFWorkbook
WorkbookUtils.getWorkbook(FileUtils.readFileToByteArray(file, PoiConstants.XLSX_MIME_TYPE); // XSSFWorkbook
WorkbookUtils.getWorkbook(FileUtils.openInputStream(file), PoiConstants.XLSX_MIME_TYPE); // XSSFWorkbook

File file2 = new File("test.xls");
WorkbookUtils.getWorkbook(file2); // HSSFWorkbook
WorkbookUtils.getWorkbook(file2, PoiConstants.XLS_MIME_TYPE); // HSSFWorkbook
WorkbookUtils.getWorkbook(FileUtils.readFileToByteArray(file2); // HSSFWorkbook
WorkbookUtils.getWorkbook(FileUtils.readFileToByteArray(file2, PoiConstants.XLS_MIME_TYPE); // HSSFWorkbook
WorkbookUtils.getWorkbook(FileUtils.openInputStream(file2), PoiConstants.XLS_MIME_TYPE); // HSSFWorkbook
```

### 读取所有工作表
```java
File file = new File("test.xlsx"); 
Workbook workbook = WorkbookUtils.getWorkbook(file);

// 读取excel中的所有工作表
WorkbookUtils.getSheets(workbook); // List<Sheet>

// 读取excel中的所有工作表，并输出为顺序流
WorkbookUtils.sheetStream(workbook); // Stream<Sheet>
// 将输出流设置为并行流
WorkbookUtils.sheetStream(workbook, true); // Stream<Sheet>
```

### 批量读取行
```java
File file = new File("test.xlsx"); 
Workbook workbook = WorkbookUtils.getWorkbook(file);

// 读取excel中的所有工作表中的所有行
WorkbookUtils.getRows(workbook); // List<Row>

// 读取工作表中的所有行
WorkbookUtils.getRows(workbook.getSheetAt(0)); // List<Row>
// 从第一行开始读取工作表中的行，行号从0开始计算
WorkbookUtils.getRows(workbook.getSheetAt(0), 0); // List<Row>
// 读取工作表中的1-10行，行号从0开始计算
WorkbookUtils.getRows(workbook.getSheetAt(0), 0, 10); // List<Row>

// 读取工作表中的所有行，并输出为顺序流
WorkbookUtils.rowStream(workbook.getSheetAt(0)); // Stream<Row>
// 将输出流设置为并行流
WorkbookUtils.rowStream(workbook.getSheetAt(0), true); // Stream<Row>
```

### 批量读取单元格
```java
File file = new File("test.xlsx"); 
Workbook workbook = WorkbookUtils.getWorkbook(file);

// 读取excel中的所有工作表中的所有行的所有单元格
WorkbookUtils.getCells(workbook); // List<Cell>
// 设置缺失单元格处理策略，默认为返回null或空白单元格
WorkbookUtils.getCells(workbook, Row.MissingCellPolicy.RETURN_NULL_AND_BLANK); // List<Cell>

// 读取工作表中的所有行的所有单元格
WorkbookUtils.getCells(workbook.getSheetAt(0)); // List<Cell>
// 设置缺失单元格处理策略，默认为返回null或空白单元格
WorkbookUtils.getCells(workbook.getSheetAt(0), Row.MissingCellPolicy.RETURN_NULL_AND_BLANK); // List<Cell>

// 读取行中的所有单元格
WorkbookUtils.getCells(workbook.getSheetAt(0).getRow(0)); // List<Cell>
// 设置缺失单元格处理策略，默认为返回null或空白单元格
WorkbookUtils.getCells(workbook.getSheetAt(0).getRow(0), Row.MissingCellPolicy.RETURN_NULL_AND_BLANK); // List<Cell>
// 从第一列开始读取行中的所有单元格，列号从0开始计算
WorkbookUtils.getCells(workbook.getSheetAt(0).getRow(0), 0); // List<Cell>
WorkbookUtils.getCells(workbook.getSheetAt(0).getRow(0), 0, Row.MissingCellPolicy.RETURN_NULL_AND_BLANK); // List<Cell>
// 读取行中的1-10列，列号从0开始计算
WorkbookUtils.getCells(workbook.getSheetAt(0).getRow(0), 0, 10); // List<Cell>
WorkbookUtils.getCells(workbook.getSheetAt(0).getRow(0), 0, 10, Row.MissingCellPolicy.RETURN_NULL_AND_BLANK); // List<Cell>

// 读取行中的所有单元格，并输出为顺序流
WorkbookUtils.cellStream(workbook.getSheetAt(0).getRow(0)); // Stream<Cell>
// 将输出流设置为并行流
WorkbookUtils.cellStream(workbook.getSheetAt(0).getRow(0), true); // Stream<Cell>
```

### 获取合并单元格
根据指定的行号和列号查找合并单元格区域，如果找到则返回合并区域左上角的单元格， 否则返回null。如果指定的单元格不在任何合并区域内，则返回null。

```java
File file = new File("test.xlsx"); 
Workbook workbook = WorkbookUtils.getWorkbook(file);

// 获取行号为0，列好为0的合并单元格区域中的单元格
WorkbookUtils.getMergedRegionCell(workbook.getSheetAt(0), 0, 0); // Cell
```

### 判断单元格是否为空
判断条件：
1. 单元格对象为null
2. 单元格类型为BLANK(空白)
3. 单元格类型为ERROR(错误)
4. 单元格类型为STRING但内容为空字符串

```java
File file = new File("test.xlsx"); 
Workbook workbook = WorkbookUtils.getWorkbook(file);
WorkbookUtils.isEmptyCell(workbook.getSheetAt(0).getRow(0).getCell(0)); // boolean
```

### 获取单元格的值

#### 字符串
```java
File file = new File("test.xlsx"); 
Workbook workbook = WorkbookUtils.getWorkbook(file);

WorkbookUtils.getStringCellValue(workbook.getSheetAt(0).getRow(0).getCell(0)); // String
// 当单元格为空或转换失败时返回默认值
WorkbookUtils.getStringCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), "defaultValue"); // String

// 获取公式单元格的字符串值，直接使用excel文件中的公式计算器
WorkbookUtils.getStringFormulaCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), workbook); // String
// 当单元格为空或转换失败时返回默认值
WorkbookUtils.getStringFormulaCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), workbook, "defaultValue"); // String
// 获取公式单元格的字符串值，手动指定公式计算器
WorkbookUtils.getStringFormulaCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), workbook.getCreationHelper().createFormulaEvaluator()); // String
// 当单元格为空或转换失败时返回默认值
WorkbookUtils.getStringFormulaCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), workbook.getCreationHelper().createFormulaEvaluator(), "defaultValue"); // String
```

#### 数字
```java
File file = new File("test.xlsx"); 
Workbook workbook = WorkbookUtils.getWorkbook(file);

WorkbookUtils.getNumericCellValue(workbook.getSheetAt(0).getRow(0).getCell(0)); // Double
// 当单元格为空或转换失败时返回默认值
WorkbookUtils.getNumericCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), 1.00d); // Double

// 获取公式单元格的字符串值，直接使用excel文件中的公式计算器
WorkbookUtils.getNumericFormulaCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), workbook); // Double
// 当单元格为空或转换失败时返回默认值
WorkbookUtils.getNumericFormulaCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), workbook, 1.00d); // Double
// 获取公式单元格的字符串值，手动指定公式计算器
WorkbookUtils.getNumericFormulaCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), workbook.getCreationHelper().createFormulaEvaluator()); // Double
// 当单元格为空或转换失败时返回默认值
WorkbookUtils.getNumericFormulaCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), workbook.getCreationHelper().createFormulaEvaluator(), 1.00d); // Double
```

#### 布尔
```java
File file = new File("test.xlsx"); 
Workbook workbook = WorkbookUtils.getWorkbook(file);

WorkbookUtils.getBooleanCellValue(workbook.getSheetAt(0).getRow(0).getCell(0)); // Boolean
// 当单元格为空或转换失败时返回默认值
WorkbookUtils.getBooleanCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), false); // Boolean

// 获取公式单元格的字符串值，直接使用excel文件中的公式计算器
WorkbookUtils.getBooleanFormulaCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), workbook); // Boolean
// 当单元格为空或转换失败时返回默认值
WorkbookUtils.getBooleanFormulaCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), workbook, false); // Boolean
// 获取公式单元格的字符串值，手动指定公式计算器
WorkbookUtils.getBooleanFormulaCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), workbook.getCreationHelper().createFormulaEvaluator()); // Boolean
WorkbookUtils.getBooleanFormulaCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), workbook.getCreationHelper().createFormulaEvaluator(), false); // Boolean
```

#### 日期
```java
File file = new File("test.xlsx"); 
Workbook workbook = WorkbookUtils.getWorkbook(file);

WorkbookUtils.getDateCellValue(workbook.getSheetAt(0).getRow(0).getCell(0)); // Date
// 当单元格为空或转换失败时返回默认值
WorkbookUtils.getDateCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), new Date()); // Date

// 手动指定日期格式表达式
WorkbookUtils.getDateCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), "yyyy/MM/dd", "yyyy/M/d", "yyyy/M-d"); // Date
WorkbookUtils.getDateCellValue(workbook.getSheetAt(0).getRow(0).getCell(0), new Date(), "yyyy/MM/dd", "yyyy/M/d", "yyyy/M-d"); // Date
```

### 计数
```java
File file = new File("test.xlsx"); 
Workbook workbook = WorkbookUtils.getWorkbook(file);

// 统计工作表中的行数
WorkbookUtils.countRow(workbook.getSheetAt(0)); // int
// 统计行中的单元格数量
WorkbookUtils.countCell(workbook.getSheetAt(0).getRow(0)); // int
```

### 创建行
```java
File file = new File("test.xlsx"); 
Workbook workbook = WorkbookUtils.getWorkbook(file);

// 获取工作表中的第一行，如果不存在则创建第一行并返回，行号从0开始计算
WorkbookUtils.createRowIfAbsent(workbook.getSheetAt(0), 0); // Row

// 在工作表末尾添加新行并应用消费者操作
WorkbookUtils.addRow(workbook.getSheetAt(0), row -> row.createCell(0));
/*
在工作表末尾添加新行并填充数据。
支持处理多种数据类型：
null: 设置为空白单元格
Number: 设置为数值
Boolean: 设置为布尔值
String: 设置为字符串
Date/LocalDate/LocalDateTime/Calendar: 设置为日期
RichTextString: 设置为富文本
Hyperlink: 设置为超链接
URI/URL: 自动创建超链接
其他类型: 转换为JSON字符串
*/
WorkbookUtils.addRow(workbook.getSheetAt(0), "测试字符串", 123);
// 指定单元格样式
WorkbookUtils.addRow(workbook.getSheetAt(0), workbook.createCellStyle(), "测试字符串", 123);
WorkbookUtils.addRow(workbook.getSheetAt(0), List.of( "测试字符串", 123));
WorkbookUtils.addRow(workbook.getSheetAt(0), List.of( "测试字符串", 123), workbook.createCellStyle()); 
// 自定义单元格顺序
WorkbookUtils.addRow(workbook.getSheetAt(0), List.of(Pair.of("123", 0), Pair.of("123", 1))); 
WorkbookUtils.addRow(workbook.getSheetAt(0), List.of(Pair.of("123", 0), Pair.of("123", 1)), workbook.createCellStyle());

// 在工作表中创建第十行并应用消费者操作
WorkbookUtils.insertRow(workbook.getSheetAt(0), 9, row -> row.createCell(0)); 
// 在工作表中创建第十行并填充数据
WorkbookUtils.insertRow(workbook.getSheetAt(0), 9, "测试字符串", 123);
// 指定单元格样式
WorkbookUtils.insertRow(workbook.getSheetAt(0), 9, workbook.createCellStyle(), "测试字符串", 123);
WorkbookUtils.insertRow(workbook.getSheetAt(0), 9, List.of( "测试字符串", 123));
WorkbookUtils.insertRow(workbook.getSheetAt(0), 9, List.of( "测试字符串", 123), workbook.createCellStyle()); 
// 自定义单元格顺序
WorkbookUtils.insertRow(workbook.getSheetAt(0), 9, List.of(Pair.of("123", 0), Pair.of("123", 1))); 
WorkbookUtils.insertRow(workbook.getSheetAt(0), 9, List.of(Pair.of("123", 0), Pair.of("123", 1)), workbook.createCellStyle());
```

### 创建单元格
```java
File file = new File("test.xlsx");
Workbook workbook = WorkbookUtils.getWorkbook(file);

// 获取行中的第一列，如果不存在则创建第一列并返回，列号从0开始计算
WorkbookUtils.createCellIfAbsent(workbook.getSheetAt(0).getRow(0), 0); // Cell

// 创建单元格并设置值和样式，列号从0开始计算，样式可以为 null
WorkbookUtils.createCell(workbook.getSheetAt(0).getRow(0), 0, "123", null);
```

### 创建标题行
```java
File file = new File("test.xlsx");
Workbook workbook = WorkbookUtils.getWorkbook(file);

// 创建工作表标题行，默认为第一行
WorkbookUtils.createTitleRow(workbook.getSheetAt(0), "标题1", "标题2"); // Map<String, Integer>
WorkbookUtils.createTitleRow(workbook.getSheetAt(0), workbook.createCellStyle(), "标题1", "标题2"); // Map<String, Integer>
// 指定行号，行号从0开始计算
WorkbookUtils.createTitleRow(workbook.getSheetAt(0), 0, "标题1", "标题2"); // Map<String, Integer>
// 指定标题行单元格样式
WorkbookUtils.createTitleRow(workbook.getSheetAt(0), 0, workbook.createCellStyle(), "标题1", "标题2"); // Map<String, Integer>
WorkbookUtils.createTitleRow(workbook.getSheetAt(0), List.of("标题1", "标题2")); // Map<String, Integer>
WorkbookUtils.createTitleRow(workbook.getSheetAt(0), List.of("标题1", "标题2"), workbook.createCellStyle()); // Map<String, Integer>
WorkbookUtils.createTitleRow(workbook.getSheetAt(0), List.of("标题1", "标题2"), 0); // Map<String, Integer>
WorkbookUtils.createTitleRow(workbook.getSheetAt(0), List.of("标题1", "标题2"), 0, workbook.createCellStyle()); // Map<String, Integer>
```

### 设置自适应列宽度
基于`POI`自带的实现封装的，效果聊胜于无。

实现原理：自动调整指定数量列的宽度，并在自动调整的基础上增加70%的宽度作为缓冲。

```java
File file = new File("test.xlsx");
Workbook workbook = WorkbookUtils.getWorkbook(file);

// 自动调整工作表中所有列的宽度
WorkbookUtils.createTitleRow(workbook.getSheetAt(0));
// 自动调整工作表中1-10列的宽度
WorkbookUtils.createTitleRow(workbook.getSheetAt(0), 10);
```
