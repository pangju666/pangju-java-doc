---
layout: doc
---

# 随机数

## 说明

| 类名          | 类型  |    用途     |
|-------------|:----|:---------:|
| RandomArray | 工具类 | 随机数组生成工具类 |
| RandomList  | 工具类 | 随机列表生成工具类 |

## 随机数组
`io.github.pangju666.commons.lang.random.RandomArray`

提供基本类型数组的随机生成能力，支持普通随机数组和元素唯一随机数组的生成

### 实例化
推荐使用`RandomArray.secure()`或`RandomArray.secureStrong()`
```java
// 基于 ThreadLocalRandom.current() 获取单例实例；这在密码学上并不安全；
RandomArray randomArray1 = RandomArray.insecure();

// 获取基于 SecureRandom.SecureRandom() 的单例实例
RandomArray randomArray2 = RandomArray.secure();

// 获取基于 SecureRandom.getInstanceStrong() 的单例实例
RandomArray randomArray3 = RandomArray.secureStrong();
```

### 随机布尔数组
```java
RandomArray randomArray = RandomArray.secure();
// 生成长度为10的随机布尔数组
randomArray.randomBooleanArray(10); // [false, false, false, false, false, true, true, false, false, true]
```

### 随机整数数组
```java
RandomArray randomArray = RandomArray.secure();

// 生成长度为10的随机整数数组
randomArray.randomIntArray(10); // [1252475697, 1541230163, 451011624, 730572650, 1321028179, 720055077, 1720727933, 1118821540, 1501280485, 638494164]
// 生成长度为10，范围在1-10之间的随机整数数组
randomArray.randomIntArray(1, 11, 10); // [9, 6, 9, 1, 3, 4, 6, 9, 3, 7]

// 生成长度为10的随机不重复整数数组
randomArray.randomUniqueIntArray(10); // [34431500, 1924561732, 596076420, 1102205654, 1002841987, 361966149, 805182873, 1084160629, 1029260645, 28788120]
// 生成长度为10，范围在1-10之间的随机不重复整数数组
randomArray.randomUniqueIntArray(1, 11, 10); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### 随机长整数数组
```java
RandomArray randomArray = RandomArray.secure();

// 生成长度为10的随机长整数数组
randomArray.randomLongArray(10); // [1252475697, 1541230163, 451011624, 730572650, 1321028179, 720055077, 1720727933, 1118821540, 1501280485, 638494164]
// 生成长度为10，范围在1-10之间的随机长整数数组
randomArray.randomLongArray(1, 11, 10); // [9, 6, 9, 1, 3, 4, 6, 9, 3, 7]

// 生成长度为10的随机不重复长整数数组
randomArray.randomUniqueLongArray(10); // [34431500, 1924561732, 596076420, 1102205654, 1002841987, 361966149, 805182873, 1084160629, 1029260645, 28788120]
// 生成长度为10，范围在1-10之间的随机不重复长整数数组
randomArray.randomUniqueLongArray(1, 11, 10); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### 随机单精度浮点数数组
```java
RandomArray randomArray = RandomArray.secure();

// 生成长度为10的随机单精度浮点数数组
randomArray.randomFloatArray(10); // [1.773487E38, 2.9297223E38, 1.701454E38, 2.0887507E38, 1.8498405E38, 3.2608711E38, 5.7886174E37, 3.1477783E38, 2.0516718E38, 2.3726332E38]
// 生成长度为10，范围在1-10之间的随机单精度浮点数数组
randomArray.randomFloatArray(1, 11, 10); // [7.2866406, 7.247472, 6.970335, 9.075619, 2.7839837, 10.521232, 4.835578, 2.716907, 4.479539, 1.8207822]
```

### 随机双精度浮点数数组
```java
RandomArray randomArray = RandomArray.secure();

// 生成长度为10的随机双精度浮点数数组
randomArray.randomDoubleArray(10); // [1.773487E38, 2.9297223E38, 1.701454E38, 2.0887507E38, 1.8498405E38, 3.2608711E38, 5.7886174E37, 3.1477783E38, 2.0516718E38, 2.3726332E38]
// 生成长度为10，范围在1-10之间的随机双精度浮点数数组
randomArray.randomDoubleArray(1, 11, 10); // [7.2866406, 7.247472, 6.970335, 9.075619, 2.7839837, 10.521232, 4.835578, 2.716907, 4.479539, 1.8207822]

// 生成长度为10的随机不重复双精度浮点数数组
randomArray.randomUniqueDoubleArray(10); // [2.5169438E38, 2.9075475E38, 3.207947E38, 1.7587403E38, 7.1809014E37, 8.0922854E37, 1.9945008E38, 1.3943659E38, 2.2905075E38, 1.3382793E38]
// 生成长度为10，范围在1-10之间的随机不重复双精度浮点数数组
randomArray.randomUniqueDoubleArray(1, 11, 10); // [5.325041, 8.112324, 10.728409, 1.0307697, 7.635397, 5.662279, 4.477864, 4.9628816, 3.622487, 8.322156]
```

## 随机列表
`io.github.pangju666.commons.lang.random.RandomList`

提供基本类型列表的随机生成能力，支持普通列表和元素唯一列表的生成

### 实例化
推荐使用`RandomList.secure()`或`RandomArray.secureStrong()`

```java
// 基于 ThreadLocalRandom.current() 获取单例实例；这在密码学上并不安全；
RandomList randomList1 = RandomList.insecure();

// 获取基于 SecureRandom.SecureRandom() 的单例实例
RandomList randomList2 = RandomList.secure();

// 获取基于 SecureRandom.getInstanceStrong() 的单例实例
RandomList randomList3 = RandomList.secureStrong();
```

### 随机布尔列表
```java
RandomList randomList = RandomList.secure();

// 生成长度为10的随机布尔列表
randomList.randomBooleanList(10); // [false, false, false, false, false, true, true, false, false, true]
```

### 随机整数列表
```java
RandomList randomList = RandomList.secure();

// 生成长度为10的随机整数列表
randomList.randomIntList(10); // [1252475697, 1541230163, 451011624, 730572650, 1321028179, 720055077, 1720727933, 1118821540, 1501280485, 638494164]
// 生成长度为10，范围在1-10之间的随机整数列表
randomList.randomIntList(1, 11, 10); // [9, 6, 9, 1, 3, 4, 6, 9, 3, 7]

// 生成长度为10的随机不重复整数列表
randomList.randomUniqueIntList(10); // [34431500, 1924561732, 596076420, 1102205654, 1002841987, 361966149, 805182873, 1084160629, 1029260645, 28788120]
// 生成长度为10，范围在1-10之间的随机不重复整数列表
randomList.randomUniqueIntList(1, 11, 10); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### 随机长整数列表
```java
RandomList randomList = RandomList.secure();

// 生成长度为10的随机长整数列表
randomList.randomLongList(10); // [1252475697, 1541230163, 451011624, 730572650, 1321028179, 720055077, 1720727933, 1118821540, 1501280485, 638494164]
// 生成长度为10，范围在1-10之间的随机长整数列表
randomList.randomLongList(1, 11, 10); // [9, 6, 9, 1, 3, 4, 6, 9, 3, 7]

// 生成长度为10的随机不重复长整数列表
randomList.randomUniqueLongList(10); // [34431500, 1924561732, 596076420, 1102205654, 1002841987, 361966149, 805182873, 1084160629, 1029260645, 28788120]
// 生成长度为10，范围在1-10之间的随机不重复长整数列表
randomList.randomUniqueLongList(1, 11, 10); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### 随机单精度浮点数列表
```java
RandomList randomList = RandomList.secure();

// 生成长度为10的随机单精度浮点数列表
randomList.randomFloatList(10); // [1.773487E38, 2.9297223E38, 1.701454E38, 2.0887507E38, 1.8498405E38, 3.2608711E38, 5.7886174E37, 3.1477783E38, 2.0516718E38, 2.3726332E38]
// 生成长度为10，范围在1-10之间的随机单精度浮点数列表
randomList.randomFloatList(1, 11, 10); // [7.2866406, 7.247472, 6.970335, 9.075619, 2.7839837, 10.521232, 4.835578, 2.716907, 4.479539, 1.8207822]

// 生成长度为10的随机不重复单精度浮点数列表
randomList.randomUniqueFloatList(10); // [2.5169438E38, 2.9075475E38, 3.207947E38, 1.7587403E38, 7.1809014E37, 8.0922854E37, 1.9945008E38, 1.3943659E38, 2.2905075E38, 1.3382793E38]
// 生成长度为10，范围在1-10之间的随机不重复单精度浮点数列表
randomList.randomUniqueFloatList(1, 11, 10); // [5.325041, 8.112324, 10.728409, 1.0307697, 7.635397, 5.662279, 4.477864, 4.9628816, 3.622487, 8.322156]
```

### 随机双精度浮点数列表
```java
RandomList randomList = RandomList.secure();

// 生成长度为10的随机双精度浮点数列表
randomList.randomDoubleList(10); // [1.773487E38, 2.9297223E38, 1.701454E38, 2.0887507E38, 1.8498405E38, 3.2608711E38, 5.7886174E37, 3.1477783E38, 2.0516718E38, 2.3726332E38]
// 生成长度为10，范围在1-10之间的随机双精度浮点数列表
randomList.randomDoubleList(1, 11, 10); // [7.2866406, 7.247472, 6.970335, 9.075619, 2.7839837, 10.521232, 4.835578, 2.716907, 4.479539, 1.8207822]

// 生成长度为10的随机不重复双精度浮点数列表
randomList.randomUniqueDoubleList(10); // [2.5169438E38, 2.9075475E38, 3.207947E38, 1.7587403E38, 7.1809014E37, 8.0922854E37, 1.9945008E38, 1.3943659E38, 2.2905075E38, 1.3382793E38]
// 生成长度为10，范围在1-10之间的随机不重复双精度浮点数列表
randomList.randomUniqueDoubleList(1, 11, 10); // [5.325041, 8.112324, 10.728409, 1.0307697, 7.635397, 5.662279, 4.477864, 4.9628816, 3.622487, 8.322156]
```
