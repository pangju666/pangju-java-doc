---
layout: doc
---

# 工具类

## 查询工具类
`io.github.pangju666.framework.data.mongodb.utils.QueryUtils`

我封装了一些常用的查询方法。

| 方法名                 | 返回值   |          用途           |
|---------------------|:------|:---------------------:|
| queryByNullKey      | Query |  构建字段不存在或字段值为null的查询  |
| queryByNotNullKey   | Query |  构建字段存在且字段值不为null的查询  |
| queryByKeyValue     | Query |     根据字段名和值构建等值查询     |
| queryByKeyNotValue  | Query |    根据字段名和值构建不等值查询     |
| queryByKeyValues    | Query |    根据字段名和值集合构建包含查询    |
| queryByKeyNotValues | Query |    根据字段名和值集合构建排除查询    |
| queryByKeyRegex     | Query | 根据字段名和正则表达式字符串构建匹配查询  |
| queryByKeyNotRegex  | Query | 根据字段名和正则表达式字符串构建不匹配查询 |


### 空值查询
查询不存在`name2`字段或`name2`字段为`null`的所有文档。

```java
Query query = QueryUtils.queryByNullKey("name2")
// { "$or" : [{ "name2" : { "$type" : 10}}, { "name2" : null}]}
```

### 非空值查询
查询存在`name`字段且`name`字段不为`null`的所有文档。

```java
Query query = QueryUtils.queryByNotNullKey("name")
// { "$and" : [{ "name" : { "$not" : { "$type" : 10}}}, { "name" : { "$ne" : null}}]}
```

### 键值对查询

#### 相等
查询指定字段为指定值的所有文档。

```java
Query query = QueryUtils.queryByKeyValue("name", "test")
// 等价MongoDB查询语句: { "name" : "test"}
```

#### 不相等
查询指定字段不为指定值的所有文档。

```java
Query query = QueryUtils.queryByKeyNotValue("name", "test")
// 等价MongoDB查询语句: { "name" : { "$ne" : "test"}}
```

#### 包含
查询指定字段存在集合中的值的所有文档。

```java
Query query = QueryUtils.queryByKeyValues("name", List.of("test"))
// 等价MongoDB查询语句: { "name" : { "$in" : ["test"]}}
```

#### 排除
查询指定字段不存在集合中的值的所有文档。

```java
Query query = QueryUtils.queryByKeyNotValues("name", List.of("test"))
// 等价MongoDB查询语句: { "name" : { "$nin" : ["test"]}}
```

### 正则查询

#### 匹配
查询指定字段符合正则表达式的的所有文档。

```java
Query query = QueryUtils.queryByKeyRegex("name", "^.+\$")
// 等价MongoDB查询语句: { "name" : { "$regularExpression" : { "pattern" : "^.+$", "options" : ""}}}

// 也可以直接传入Pattern
Query query = QueryUtils.queryByKeyRegex("name", Pattern.compile("^.+\$"))
```

#### 不匹配
查询指定字段不符合正则表达式的的所有文档。

```java
Query query = QueryUtils.queryByKeyNotRegex("name", "^.+\$")
// 等价MongoDB查询语句: { "name" : { "$not" : { "$regularExpression" : { "pattern" : "^.+$", "options" : ""}}}}

// 也可以直接传入Pattern
Query query = QueryUtils.queryByKeyNotRegex("name", Pattern.compile("^.+\$"))
```
