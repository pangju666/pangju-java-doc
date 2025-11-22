---
layout: doc
---

# 工具类
`io.github.pangju666.commons.lang.utils.StringUtils`

继承自`org.apache.commons.lang3.StringUtils`，新增了部分功能

| 方法名                       | 返回值           |        用途         |
|---------------------------|:--------------|:-----------------:|
| convertCharset            | String        |     转换字符串字符集      |
| getNotBlankElements       | List\<String> |  获取集合中非空字符串元素列表   |
| getUniqueNotBlankElements | List\<String> | 获取集合中唯一且非空字符串元素列表 |

## 字符串转换
```java
String str = "你好世界";

// 不指定原始字符串字符集
StringUtils.convertCharset(str, StandardCharsets.ISO_8859_1);

// 指定原始字符串字符集
StringUtils.convertCharset(str, StandardCharsets.UTF_8, StandardCharsets.ISO_8859_1);
```

## 获取非空字符串元素列表
```java
List<String> list = new ArrayList<>(List.of("你好", "世界", "", "我是", " ", "", "胖橘", "世界"));
// 不去除重复字符串
StringUtils.getNotBlankElements(list); // [你好, 世界, 我是, 胖橘, 世界]
//去除重复字符串
StringUtils.getUniqueNotBlankElements(list); // [你好, 世界, 我是, 胖橘]

// 不去除重复字符串
StringUtils.getNotBlankElements("你好", "世界", null, "", "我是", " ", "", "胖橘", "世界"); // [你好, 世界, 我是, 胖橘, 世界]
//去除重复字符串
StringUtils.getUniqueNotBlankElements("你好", "世界", null, "", "我是", " ", "", "胖橘", "世界"); // [你好, 世界, 我是, 胖橘]
```
