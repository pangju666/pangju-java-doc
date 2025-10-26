---
layout: doc
---

# 坐标

## 坐标类型
`io.github.pangju666.commons.geo.enums.CoordinateType`

| 枚举值    | 说明            |
|--------|:--------------|
| GCJ_02 | 国测局坐标系（火星坐标系） |                                                                                                                                                                                                                                                                                                                                        
| WGS_84 | 世界大地坐标系       |

## 坐标
`io.github.pangju666.commons.geo.model.Coordinate`

| 方法名          | 返回值        |     用途      |
|--------------|:-----------|:-----------:|
| isOutOfChina | boolean    | 判断坐标是否在中国境内 |
| getLatitude  | BigDecimal |    获取纬度     |
| getLongitude | BigDecimal |    获取经度     |
| toString     | String     |  格式化为度分秒格式  |

### 实例化
```java
Coordinate coordinate1 = new Coordinate(116.3915d, 39.9042d);
Coordinate coordinate2 = new Coordinate(new BigDecimal("11.3915"), new BigDecimal("28.9042");
Coordinate coordinate3 = new Coordinate("116°23'29.40\"E", "39°54'15.12\"N");
```

### 判断坐标是否在中国境内
```java
Coordinate coordinate = new Coordinate(116.4074d, 39.9042d);
coordinate.isOutOfChina(); // false
```

### 格式化为度分秒格式
```java
Coordinate coordinate = new Coordinate(116.3915d, 39.9042d);
coordinate.toString(); // 116°23'29.40"E,39°54'15.12"N
```

## 工具类
`io.github.pangju666.commons.geo.utils.CoordinateUtils`

| 方法名            | 返回值        |         用途          |
|----------------|:-----------|:-------------------:|
| toLatitudeDMS  | String     |   将十进制纬度转换为度分秒格式    |
| toLongitudeDms | String     |   将十进制经度转换为度分秒格式    |
| fromDMS        | BigDecimal |  将度分秒格式经纬度转换为十进制度   |
| GCJ02ToWGS84   | Coordinate | GCJ-02坐标系转WGS-84坐标系 |
| WGS84ToGCJ02   | Coordinate | WGS-84坐标系转GCJ-02坐标系 |

### 格式化
```java
CoordinateUtils.toLatitudeDMS(new BigDecimal("11.3915")); // 11°23'29.40"N
CoordinateUtils.toLongitudeDms(new BigDecimal("28.9042")); // 28°54'15.12"E

CoordinateUtils.fromDMS("28°54'15.12\"E"); // 28.9042
```

### 坐标系转换

#### GCJ-02转WGS-84
转换结果还是会有一定偏差，50米左右

```java
CoordinateUtils.GCJ02ToWGS84(new Coordinate(116.3915, 39.9042)); // 116.385259135,39.902798774
```

#### WGS-84转GCJ-02
转换结果还是会有一定偏差，最好还是用厂商的api区转换

```java
CoordinateUtils.WGS84ToGCJ02(new Coordinate(116.3915, 39.9042)); // 116.397740865,39.905601226
```
