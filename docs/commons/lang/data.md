---
layout: doc
---

# 数据

## 说明

| 类名       | 类型   |  用途  |
|----------|:-----|:----:|
| DataSize | 数据结构 | 数据单位 |

## 数据单位
`io.github.pangju666.commons.lang.model.DataSize`

从Spring Framework拷贝的，来源于`org.springframework.util.unit.DataSize`

| 术语   | 符号表示 |      大小（字节）       |
|------|:-----|:-----------------:|
| 字节   | 1B   |         1         |
| 千字节  | 1KB  |       1,024       |
| 兆字节  | 1MB  |     1,048,576     |
| 千兆字节 | 1GB  |   1,073,741,824   |
| 太字节  | 1TB  | 1,099,511,627,776 |

### 字节（B）
```java
long bytes = DataSize.ofBytes(1).toBytes() // 1
long kbBytes = DataSize.ofKilobytes(1).toBytes() // 1024
long mbBytes = DataSize.ofMegabytes(1).toBytes() // 1048576
long gbBytes = DataSize.ofGigabytes(1).toBytes() // 1073741824
long tbBytes = DataSize.ofTerabytes(1).toBytes() // 1099511627776
```

### 千字节（KB）
```java
long kbBytes = DataSize.ofKilobytes(1).toKilobytes() // 1
long mbBytes = DataSize.ofMegabytes(1).toKilobytes() // 1024
long gbBytes = DataSize.ofGigabytes(1).toKilobytes() // 1048576
long tbBytes = DataSize.ofTerabytes(1).toKilobytes() // 1073741824
```

### 兆字节（MB）
```java
long mbBytes = DataSize.ofMegabytes(1).toMegabytes() // 1
long gbBytes = DataSize.ofGigabytes(1).toMegabytes() // 1024
long tbBytes = DataSize.ofTerabytes(1).toMegabytes() // 1048576
```

### 千兆字节（GB）
```java
long gbBytes = DataSize.ofGigabytes(1).toGigabytes() // 1
long tbBytes = DataSize.ofTerabytes(1).toMegabytes() // 1024
```

### 太字节（TB）
```java
long tbBytes = DataSize.ofTerabytes(1).toTerabytes() // 1
```

### 解析
```java
DataSize.parse("1B").toBytes() // 1
DataSize.parse("1KB").toBytes() // 1024
DataSize.parse("1MB").toBytes() // 1048576
DataSize.parse("1GB").toBytes() // 1073741824
DataSize.parse("1TB").toBytes() // 1099511627776
```

### 比较
```java
DataSize dataSize1 = DataSize.ofBytes(1)
DataSize dataSize2 = DataSize.ofKilobytes(1)
dataSize2.compareTo(dataSize1) // 1
```
