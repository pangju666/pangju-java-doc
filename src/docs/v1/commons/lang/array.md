---
layout: doc
---

# 数组

## 说明

| 类名         | 类型  |                      用途                      |
|------------|:----|:--------------------------------------------:|
| ArrayUtils | 工具类 | 日期工具类，继承自org.apache.commons.lang3.ArrayUtils |

## 工具类
`io.github.pangju666.commons.lang.utils.ArrayUtils`

### 数组分割
```java
// 布尔数组分割
boolean[] booleanArray = new boolean[]{true, true, false, false, true, false};
ArrayUtils.partition(booleanArray, 2); // [[true, true], [false, false], [true, false]]

// 字节数组分割
byte[] bytesArray = new byte[]{1, 1, 1, 1, 1, 1};
ArrayUtils.partition(bytesArray, 2); // [[1, 1], [1, 1], [1, 1]]

// 字符数组分割
char[] charArray = new char[]{'a', 'a', 'a', 'a', 'a'};
ArrayUtils.partition(charArray, 2); // [['a', 'a'], ['a', 'a'], ['a']]

// 双精度浮点数数组分割
double[] doubleArray = new double[]{1.0d, 1.0d, 1.0d, 1.0d, 1.0d};
ArrayUtils.partition(doubleArray, 2); // [[1.0, 1.0], [1.0, 1.0], [1.0]]

// 单精度浮点数数组分割
float[] floatArray = new float[]{1.0f, 1.0f, 1.0f, 1.0f, 1.0f};
ArrayUtils.partition(floatArray, 2); // [[1.0, 1.0], [1.0, 1.0], [1.0]]

// 整型数组分割
int[] intArray = new int[]{1, 1, 1, 1, 1};
ArrayUtils.partition(intArray, 2); // [[1, 1], [1, 1], [1]]

// 长整型数组分割
long[] longArray = new long[]{1L, 1L, 1L, 1L, 1L};
ArrayUtils.partition(longArray, 2); // [[1, 1], [1, 1], [1]]

// 短整型数组分割
short[] shortArray = new short[]{1, 1, 1, 1, 1};
ArrayUtils.partition(shortArray, 2); // [[1, 1], [1, 1], [1]]

// 泛型数组分割，T = String
String[] array = new String[]{"abc", "abc", "abc", "abc", "abc"};
ArrayUtils.partition(array, 2); // [["abc", "abc"], ["abc", "abc"], ["abc"]]
```
