---
layout: doc
---

# 日期

## 说明

| 类名              | 类型  |                            用途                             |
|-----------------|:----|:---------------------------------------------------------:|
| DateUtils       | 工具类 |     日期工具类，继承自org.apache.commons.lang3.time.DateUtils      |
| DateFormatUtils | 工具类 | 日期格式化工具类，继承自org.apache.commons.lang3.time.DateFormatUtils |

## 日期处理
`io.github.pangju666.commons.lang.utils.DateUtils`

| 方法名                    | 返回值           |         用途         |
|------------------------|:--------------|:------------------:|
| parseDate              | Date          |    将字符串解析为Date     |
| nowDate                | Date          |    获取当前时间的Date     |
| toDate                 | Date          |     转换为Date对象      |
| toLocalTime            | LocalTime     |    转换为LocalTime    |
| toLocalDateTime        | LocalDateTime |  转换为LocalDateTime  |
| toLocalDate            | LocalDate     |    转换为LocalDate    |
| getTime                | Long          |     获取Date的时间戳     |
| betweenMillis          | Long          |    计算两个日期之间的毫秒差    |
| betweenSeconds         | Long          |    计算两个日期之间的秒数差    |
| betweenMinutes         | Long          |    计算两个日期之间的分钟差    |
| betweenHours           | Long          |    计算两个日期之间的小时差    |
| betweenDays            | Long          |    计算两个日期之间的天数差    |
| truncateBetweenYears   | Integer       | 计算两个日期之间的年份差（截断计算） |
| truncateBetweenMonths  | Integer       | 计算两个日期之间的月份差（截断计算） |
| truncateBetweenDays    | Integer       | 计算两个日期之间的天数差（截断计算） |
| truncateBetweenHours   | Integer       | 计算两个日期之间的小时差（截断计算） |
| truncateBetweenMinutes | Integer       | 计算两个日期之间的分钟差（截断计算） |
| truncateBetweenSeconds | Integer       | 计算两个日期之间的秒数差（截断计算） |
| truncateBetween        | Integer       |    通用截断计算时间差方法     |
| calculateAge           | Integer       |    计算年龄（基于年份差值）    |

### 获取当前时间
```java
DateUtils.nowDate();
```

### 解析
```java
// 解析失败会返回null
DateUtils.parseDate("2022-01-21");
DateUtils.parseDate("2022-01-21 12:20");
DateUtils.parseDate("2022-01-21 12:10:10");
DateUtils.parseDate("2022-01-21-12:10:10"); // null

// 解析失败则返回默认值
DateUtils.parseDateOrDefault("2022-01-21", new Date());
DateUtils.parseDateOrDefault("2022-01-21 12:20", new Date());
DateUtils.parseDateOrDefault("2022-01-21 12:10:10", new Date());
DateUtils.parseDateOrDefault("2022-01-21-12:10:10", new Date()); // new Date()

// 自定义解析表达式
DateUtils.parseDateOrDefault("2022-01-21", new Date(), Constants.DATE_FORMAT, Constants.DATETIME_FORMAT, "yyyy-MM-dd HH:mm");
DateUtils.parseDateOrDefault("2022-01-21 12:20", new Date(), Constants.DATE_FORMAT, Constants.DATETIME_FORMAT, "yyyy-MM-dd HH:mm");
DateUtils.parseDateOrDefault("2022-01-21 12:10:10", new Date(), Constants.DATE_FORMAT, Constants.DATETIME_FORMAT, "yyyy-MM-dd HH:mm");
DateUtils.parseDateOrDefault("2022-01-21-12:10:10", new Date(), Constants.DATE_FORMAT, Constants.DATETIME_FORMAT, "yyyy-MM-dd HH:mm"); // new Date()
```

### 转换

#### Date
```java
Long timestamp = null;
// 时间戳转换为Date
DateUtils.toDate(1640995200000L); // 2022-01-01 08:00:00
// 解析失败返回null
DateUtils.toDate(timestamp); // null
// 解析失败返回默认值
DateUtils.toDate(timestamp, new Date()); // new Date()

// LocalDate转换为Date
LocalDate localDate = null;
DateUtils.toDate(LocalDate.of(2022, 1, 1)); // 2022-01-01 00:00:00
// 解析失败返回null
DateUtils.toDate(localDate); // null
// 解析失败返回默认值
DateUtils.toDate(localDate, new Date()); // new Date()

// LocalDateTime转换为Date
LocalDateTime localDateTime = null;
DateUtils.toDate(1640995200000L); // 2022-01-01 08:00:00
// 解析失败返回null
DateUtils.toDate(localDateTime); // null
// 解析失败返回默认值
DateUtils.toDate(localDateTime, new Date()); // new Date()
```

#### LocalDate
```java
Long timestamp = null;
// 时间戳转换为LocalDate
DateUtils.toLocalDate(1640995200000L); // 2022-01-01
// 解析失败返回null
DateUtils.toLocalDate(timestamp); // null
// 解析失败返回默认值
DateUtils.toLocalDate(timestamp, LocalDate.of(2022, 1, 1)); // 2022-01-01

// Date转换为LocalDate
Date date = null;
DateUtils.toLocalDate(new Date()); // new Date()
// 解析失败返回null
DateUtils.toLocalDate(date); // null
// 解析失败返回默认值
DateUtils.toLocalDate(date, LocalDate.of(2022, 1, 1)); // 2022-01-01
```

#### LocalTime
```java
Long timestamp = null;
// 时间戳转换为LocalTime
DateUtils.toLocalTime(1640995200000L); // 08:00:00
// 解析失败返回null
DateUtils.toLocalTime(timestamp); // null
// 解析失败返回默认值
DateUtils.toLocalTime(timestamp, LocalTime.of(8, 0, 0)); // 08:00:00

// Date转换为LocalTime
Date date = null;
DateUtils.toLocalTime(new Date()); // new Date()
// 解析失败返回null
DateUtils.toLocalTime(date); // null
// 解析失败返回默认值
DateUtils.toLocalTime(date, LocalTime.of(8, 0, 0)); // 08:00:00
```

#### LocalDateTime
```java
Long timestamp = null;
// 时间戳转换为LocalDateTime
DateUtils.toLocalDateTime(1640995200000L); // 2022-01-01 08:00:00
// 解析失败返回null
DateUtils.toLocalDateTime(timestamp); // null
// 解析失败返回默认值
DateUtils.toLocalDateTime(timestamp, LocalDateTime.of(2022, 1, 1, 8, 0, 0)); // 2022-01-01 08:00:00

// Date转换为LocalDateTime
Date date = null;
DateUtils.toLocalDateTime(new Date()); // new Date()
// 解析失败返回null
DateUtils.toLocalDateTime(date); // null
// 解析失败返回默认值
DateUtils.toLocalDateTime(date, LocalDateTime.of(2022, 1, 1, 8, 0, 0)); // 2022-01-01 08:00:00
```

### 获取时间戳
```java
Date date = null;
DateUtils.getTime(new Date()); // 1761408607462
DateUtils.getTime(date); // null
DateUtils.getTime(date, 1761408607462L); // 1761408607462
```

### 计算时间差
```java
// 计算毫秒差
Date date1 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 8, 0, 1));
Date date2 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 8, 0, 0));
DateUtils.betweenMillis(date1, date2); // 1000

// 计算秒差
Date date1 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 8, 0, 1));
Date date2 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 8, 0, 0));
DateUtils.betweenMillis(date1, date2); // 1

// 计算分钟差
Date date1 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 8, 2, 0));
Date date2 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 8, 1, 0));
DateUtils.betweenMillis(date1, date2); // 1

// 计算小时差
Date date1 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 9, 0, 0));
Date date2 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 8, 0, 0));
DateUtils.betweenHours(date1, date2); // 1

Date date3 = DateUtils.toDate(LocalDateTime.of(2022, 1, 2, 8, 2, 0));
Date date4 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 9, 1, 0));
println DateUtils.betweenHours(date3, date4); // 23

// 计算天数差
Date date1 = DateUtils.toDate(LocalDateTime.of(2022, 1, 2, 8, 0, 0));
Date date2 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 8, 0, 0));
DateUtils.betweenDays(date1, date2); // 1
```

### 截断计算时间差
```java
// 计算年份差
Date date1 = DateUtils.toDate(LocalDateTime.of(2022, 12, 1, 8, 0, 0));
Date date2 = DateUtils.toDate(LocalDateTime.of(2023, 1, 1, 8, 0, 0));
DateUtils.truncateBetweenYears(date1, date2); // 1

// 计算月份差
Date date1 = DateUtils.toDate(LocalDateTime.of(2023, 12, 1, 8, 0, 1));
Date date2 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 8, 0, 0));
DateUtils.truncateBetweenMonths(date1, date2); // 11

// 计算天数差
Date date1 = DateUtils.toDate(LocalDateTime.of(2022, 2, 12, 8, 2, 0));
Date date2 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 8, 1, 0));
DateUtils.truncateBetweenDays(date1, date2); // 11

// 计算小时差
Date date1 = DateUtils.toDate(LocalDateTime.of(2022, 1, 2, 23, 0, 0));
Date date2 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 8, 0, 0));
DateUtils.truncateBetweenHours(date1, date2); // 3

// 计算分钟差
Date date1 = DateUtils.toDate(LocalDateTime.of(2022, 1, 2, 9, 20, 0));
Date date2 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 8, 10, 0));
DateUtils.truncateBetweenMinutes(date1, date2); // 10

// 计算秒数差
Date date1 = DateUtils.toDate(LocalDateTime.of(2022, 1, 2, 9, 20, 30));
Date date2 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 8, 10, 10));
DateUtils.truncateBetweenSeconds(date1, date2); // 20

// 通用计算时间差
Date date1 = DateUtils.toDate(LocalDateTime.of(2022, 1, 2, 9, 20, 30));
Date date2 = DateUtils.toDate(LocalDateTime.of(2022, 1, 1, 8, 10, 10));
DateUtils.truncateBetweenSeconds(date1, date2, Calendar.SECOND); // 20
```

### 计算年龄
```java
Date date = DateUtils.toDate(LocalDate.of(1998, 6, 10));
DateUtils.calculateAge(date); // 27
```

## 格式化
`io.github.pangju666.commons.lang.utils.DateFormatUtils`

| 方法名            | 返回值    |             用途             |
|----------------|:-------|:--------------------------:|
| formatDatetime | String | 使用 yyyy-MM-dd HH:mm:ss 格式化 |
| formatDate     | String |     使用 yyyy-MM-dd 格式化      |
| formatTime     | String |      使用 HH:mm:ss 格式化       |

### 日期和时间
```java
DateFormatUtils.formatDatetime(); // 2025-10-26 01:15:19
DateFormatUtils.formatDatetime(new Date()); // 2025-10-26 01:15:19
DateFormatUtils.formatDatetime(new Date().getTime()); // 2025-10-26 01:15:19
```

### 日期
```java
DateFormatUtils.formatDate(); // 2025-10-26
DateFormatUtils.formatDate(new Date()); // 2025-10-26
DateFormatUtils.formatDate(new Date().getTime()); // 2025-10-26
```

### 时间
```java
DateFormatUtils.formatTime(); // 01:15:19
DateFormatUtils.formatTime(new Date()); // 01:15:19
DateFormatUtils.formatTime(new Date().getTime()); // 01:15:19
```
