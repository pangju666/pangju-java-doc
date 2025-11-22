---
layout: doc
---

# 拼音

## 拼音比较器
`io.github.pangju666.commons.lang.comparator.PinyinComparator`

比较顺序为：

1. `null`值具有最高优先级
2. 空字符串""次之
3. 空白字符串" "再次之
4. 其他字符串按拼音顺序

### 比较
```java
// 默认使用空格各个字符的拼音分隔符
String a = "你好"; // ni hao
String b = "世界"; // shi jie
Comparator<String> comparator1 = new PinyinComparator();
comparator1.compare(a, b); // -5

// 手动指定各个字符的拼音分隔符
String c = "你好"; // ni-hao
String d = "世界"; // shi-jie
Comparator<String> comparator2 = new PinyinComparator("-");
comparator2.compare(c, d); // -5

// 默认使用空格各个字符的拼音分隔符
String e = "hello"; // hello
String f = "世界"; // shi jie
Comparator<String> comparator3 = new PinyinComparator();
comparator3.compare(e, f); // -11
```

### 排序
此方法会修改原数组/列表
```java
List<String> list = new ArrayList<>(List.of("你好", "世界", "", "我是", "胖橘"));
PinyinComparator.order(list/*, "-"*/); // ["", 你好, 胖橘, 世界, 我是]

String[] arr = new String[]{"你好", "世界", "我是", "胖橘", null, ""};
PinyinComparator.order(arr/*, "-"*/); // [null, "", 你好, 胖橘, 世界, 我是]
```
