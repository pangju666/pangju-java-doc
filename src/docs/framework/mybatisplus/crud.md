---
layout: doc
---

# CRUD

`io.github.pangju666.framework.data.mybatisplus.repository.BaseRepository<M extends BaseMapper<T>, T>`

我继承了[
`com.baomidou.mybatisplus.extension.repository.CrudRepository`](https://baomidou.com/guides/data-interface/#_top)
，并在其基础上了增加了一系列常用的`CRUD`方法。

| 方法名                             | 返回值          |         用途          |
|---------------------------------|:-------------|:-------------------:|
| listByJsonColumnKey             | List\<T>     |    根据JSON对象字段值查询    |
| listByJsonColumnKeyValue        | List\<T>     |    根据JSON对象字段值查询    |
| listByJsonArrayColumnValue      | List\<T>     |    查询列为空JSON对象的行    |
| listByJsonArrayColumnValues     | List\<T>     |     根据JSON数组值查询     |
| listByEmptyJsonArray            | List\<T>     |   查询指定列为空JSON数组的行   |
| listByEmptyJsonObject           | List\<T>     |   查询指定列为空JSON数组的行   |
| existsById                      | boolean      |      检查ID是否存在       |
| notExistsById                   | boolean      |      检查ID是否不存在      |
| existsByColumnValue             | boolean      |     检查指定列的值是否存在     |
| notExistsByColumnValue          | boolean      |    检查某指定列的值是否不存在    |
| getByColumnValue                | T            |      根据指定列的值查询      |
| getOptByColumnValue             | Optional\<T> |      根据指定列的值查询      |
| listColumnValue                 | List\<?>     |      查询指定列的全部值      |
| listUniqueColumnValue           | List\<?>     |    获取指定列的全部不重复值     |
| listByIds                       | List\<T>     |      根据ID集合查询       |
| listByColumnValue               | List\<T>     |      根据指定列的值查询      |
| listByColumnValues              | List\<T>     |     根据指定列的值集合查询     |
| listByNotNullColumn             | List\<T>     |    查询指定列不为null的行    |
| listByNullColumn                | List\<T>     |    查询指定列为null的行     |
| listByLikeColumnValue           | List\<T>     |    根据列值进行模糊全匹配查询    |
| listByLikeLeftColumnValue       | List\<T>     |    根据列值进行模糊左匹配查询    |
| listByLikeRightColumnValue      | List\<T>     |    根据列值进行模糊右匹配查询    |
| listByNotLikeColumnValue        | List\<T>     |    根据列值进行模糊全排除查询    |
| listByNotLikeLeftColumnValue    | List\<T>     |    根据列值进行模糊左排除查询    |
| listByNotLikeRightColumnValue   | List\<T>     |    根据列值进行模糊右排除查询    |
| replaceColumnValue              | boolean      |     替换指定列符合条件的值     |
| removeByColumnValue             | boolean      |       根据列值删除        |
| removeByColumnValues            | boolean      |     根据列值集合批量删除      |
| removeByLikeColumnValue         | boolean      |    根据列值进行模糊全匹配删除    |
| removeByNotLikeColumnValue      | boolean      |    根据列值进行模糊全排除删除    |
| removeByLikeLeftColumnValue     | boolean      |    根据列值进行模糊左匹配删除    |
| removeByNotLikeLeftColumnValue  | boolean      |    根据列值进行模糊左排除删除    |
| removeByLikeRightColumnValue    | boolean      |    根据列值进行模糊右匹配删除    |
| removeByNotLikeRightColumnValue | boolean      |    根据列值进行模糊右排除删除    |
| getJsonValue                    | String       | 将对象转换为JSON字符串（内部方法） |
| columnToString                  | String       | 将对象转换为JSON字符串（内部方法） |

## 使用

这个类是一个抽象类，需要用你自己的类继承它，然后就可以愉快的使用了。

我只写了一些常用的简单查询，复杂查询还是需要自己实现。

> [!TIP]
> 继承的类建议加上`@Repository`注解或者`@Component`、`@Service`注解也行。
>
> 我是喜欢用`@Repository`，这样好区分不同的层级。

```java
@TableName(value = "test")
public class TestDO extends BaseEntity {
    @TableId(type = IdType.AUTO)
    private Long id;
	private String name;
	private String content;
	private Integer score;
}

@Mapper
public interface TestMapper extends BaseMapper<TestDO> {
}

@Repository
public class TestRepository extends BaseRepository<TestMapper, TestDO> {
    // 也可以在内部定义自己的方法
    public List<String> listName() {
        return listUniqueColumnValue(TestDO::getName);
    }
}

@Autowired
TestRepository repository;
repository.listUniqueColumnValue(TestDO::getName); // 查询表中所有name字段的值并去重
repository.listName(); // 查询表中所有name字段的值并去重
```

## 方法说明

这个类也算是我耗费了不少脑细胞，能写到的我都写上去了。

实体类示例：

```java
@TableName(value = "test", autoResultMap = true)
public class TestDO extends LogicTimeBaseEntity {
    @TableId(type = IdType.AUTO)
    private Long id;
	private String name;
	@TableField(typeHandler = JsonTypeHandler.class)
	private Map<String, String> metaData;
	@TableField(typeHandler = JsonTypeHandler.class)
	private List<String> tags;
}
```

SQL示例：

```sql
CREATE TABLE `test` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `meta_data` JSON DEFAULT NULL COMMENT '元数据',
  `tags` JSON DEFAULT NULL COMMENT '标签',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间'
  PRIMARY KEY (`id`)
)
```

### 是否存在

判断是否存在这块我只写了两个常用的：根据id判断和根据字段值判断

```java
repository.existsById(1L); // 判断是否存在id为1的行

repository.notExistsById(10000L); // 判断是否存在id为10000的行

repository.existsByColumnValue(TestDO::getName, null); // 判断表中是否存在name为null的值

repository.existsByColumnValue(TestDO::getName, "dKnBNHBKSE"); // 判断表中是否存在name为dKnBNHBKSE的行

repository.notExistsByColumnValue(TestDO::getName, null); // 判断表中是否存在name不为null的值

repository.notExistsByColumnValue(TestDO::getName, "dKnBNHBKSE"); // 判断表中是否不存在name为dKnBNHBKSE的行
```

### 指定列查询

有些场景下，我们会有查询表中某个字段全部值的需求，所以我就封装了一下。

```java
List<String> names = repository.listColumnValue(TestDO::getName);
// 等价SQL：select `name` from test where `name` is not null;

List<String> names = repository.listUniqueColumnValue(TestDO::getName);
// 等价SQL：select distinct `name` from test where `name` is not null;
```

### 单行查询

这个方法类似于父类的`getById`，只是从根据`id`查询变成了根据指定字段查询。

> [!IMPORTANT]
> 字段值必须是唯一的，不然会报错。
>
> 如果这个字段值在表中多行都存在，请使用`listByColumnValue`。

```java
TestDO testDO = repository.getByColumnValue(TestDO::getName, null);
// 等价SQL：select * from test where `name` is null;

TestDO testDO = repository.getByColumnValue(TestDO::getName, "dKnBNHBKSE");
// 等价SQL：select * from test where `name` = 'dKnBNHBKSE';

Optional<TestDO> testDO = repository.getOptByColumnValue(TestDO::getName, null);
// 等价SQL：select * from test where `name` is null;

Optional<TestDO> testDO = repository.getOptByColumnValue(TestDO::getName, "dKnBNHBKSE");
// 等价SQL：select * from test where `name` = 'dKnBNHBKSE';
```

### 多行查询

#### 字段值

查询表中所有字段为指定值的行，这个也是比较常用的。

```java
List<TestDO> list = repository.listByColumnValue(TestDO::getName, null);
// 等价SQL：select * from test where `name` is null;

List<TestDO> list = repository.listByColumnValue(TestDO::getName, "dKnBNHBKSE");
// 等价SQL：select * from test where `name` = 'dKnBNHBKSE';
```

#### id集合

这个方法基于父类的`listByIds`，只是增加了空值处理和分批处理。

> [!NOTE]
> 如果传入的集合为`null`或空集合，则会返回空列表。
>
> 默认批次大小为`1000`个。

```java
List<Long> ids = List.of(1L, 2L, 3L);

// 如果集合元素数量超过1000个，则会分批次查询，每次只传入1000个元素进行查询
List<TestDO> list = repository.listByIds(ids);
// 等价SQL：select * from test where `id` in (1, 2, 3);

// 如果你觉得一次传入1000个元素太少，也可以自行指定单次查询批次数量。
List<TestDO> list = repository.listByIds(ids, 2000);
```

#### 字段值集合

查询表中所有字段存在集合中的值的行，这个也是比较常用的，我就封装了一下并增加了空值处理和分批处理。

> [!NOTE]
> 如果传入的集合为`null`或空集合，则会返回空列表。
>
> 默认批次大小为`1000`个。

```java
List<String> names = List.of("test1", "test2", "test3");

// 如果集合元素数量超过1000个，则会分批次查询，每次只传入1000个元素进行查询
List<TestDO> list = repository.listByColumnValues(TestDO::getName, names);
// 等价SQL：select * from test where `name` in ("test1", "test2", "test3");

// 如果你觉得一次传入1000个元素太少，也可以自行指定单次查询批次数量。
List<TestDO> list = repository.listByColumnValues(TestDO::getName, names, 1000);

// 也可以自定义查询条件
List<TestDO> list = repository.listByColumnValues(TestDO::getName, names, () -> repository.lambdaQuery()
			.gt(TestDO::getId, 100));
// 等价SQL：select * from test where `name` in ("test1", "test2", "test3") and `id` > 100;

List<TestDO> list = repository.listByColumnValues(TestDO::getName, names, 2000, () -> repository.lambdaQuery()
			.gt(TestDO::getId, 100));
```

#### null字段

查询指定列为`null`的所有行，很常见的查询，简单封装了一下。

```java
List<TestDO> list = repository.listByNullColumn(TestDO::getName);
// 等价SQL：select * from test where `name` is null;
```

#### 非null字段

查询指定列不为`null`的所有行，很常见的查询，简单封装了一下。

```java
List<TestDO> list = repository.listByNotNullColumn(TestDO::getName);
// 等价SQL：select * from test where `name` is not null;
```

### 模糊匹配查询

这个就是模糊匹配查询的封装，我只是增加了空字符串处理。

> [!NOTE]
> 如果传入的字符串为`null`、空字符串、空白字符串则返回空列表。

```java
List<TestDO> list = repository.listByLikeColumnValue(TestDO::getName, "test");
// 等价SQL：select * from test where `name` like '%test%';

List<TestDO> list = repository.listByLikeLeftColumnValue(TestDO::getName, "test");
// 等价SQL：select * from test where `name` like '%test';

List<TestDO> list = repository.listByLikeRightColumnValue(TestDO::getName, "test");
// 等价SQL：select * from test where `name` like 'test%';
```

### 模糊排除查询

这个就是模糊排除查询的封装，我只是增加了空字符串处理。

> [!NOTE]
> 如果传入的字符串为`null`、空字符串、空白字符串则返回空列表。

```java
List<TestDO> list = repository.listByNotLikeColumnValue(TestDO::getName, "test");
// 等价SQL：select * from test where `name` not like '%test%';

List<TestDO> list = repository.listByNotLikeLeftColumnValue(TestDO::getName, "test");
// 等价SQL：select * from test where `name` not like '%test';

List<TestDO> list = repository.listByNotLikeRightColumnValue(TestDO::getName, "test");
// 等价SQL：select * from test where `name` not like 'test%';
```

### JSON查询

> [!IMPORTANT]
> JSON相关方法我只在MySQL环境下测试过。
>
> MySQL版本必须 >= 5.7.8

这是几行示例数据

| ID | 名称         | 元数据                                         | 标签                       |
|----|:-----------|:--------------------------------------------|:-------------------------|
| 1  | dKnBNHBKSE | \{"size": 1, "user": "test", "width": null} | \["test", "test2", null] |
| 2  | MhYJGsDJTi | \{"tree": {"user": "test"}, "user": "test"} | \["test", "test3"]       | 
| 3  | TZmFtmldEn | \{"size": 2, "user": "test"}                | \["test"]                | 
| 4  | kuJYcVeLxG | \{}                                         | \[]                      | 

#### 空JSON对象

查询所有为`null`或空JSON的行。

```java
List<TestDO> list = repository.listByEmptyJsonObject(TestDO::getMetaData);
// 等价SQL：select * from test where `meta_data` like '{}' or `meta_data` is null;

// 也可以自定义查询条件
var queryWrapper = lambdaQuery().gt(TestDO::getId, 100); // 查询条件: id > 100

List<TestDO> list = repository.listByEmptyJsonObject(TestDO::getMetaData);
// 等价SQL：select * from test where `id` > 100 and (`meta_data` like '{}' or `meta_data` is null);
```

#### 空JSON数组

查询所有为`null`或空JSON数组的行。

```java
List<TestDO> list = repository.listByEmptyJsonArray(TestDO::getTags);
// 等价SQL：select * from test where `tags` like '[]' or `tags` is null;

// 也可以自定义查询条件
var queryWrapper = lambdaQuery().gt(TestDO::getId, 100); // 查询条件: id > 100

List<TestDO> list = repository.listByEmptyJsonArray(TestDO::getTags);
// 等价SQL：select * from test where `id` > 100 and (`tags` like '[]' or `tags` is null);
```

#### JSON键
根据json字段中键是否存在来查询

```java
// 返回存在json字段中存在size这个键的所有行
List<TestDO> result = repository.listByJsonColumnKey(TestDO::getMetaData, "size");
// 等价SQL：select * from test where JSON_CONTAINS_PATH(meta_data, 'one', '$.size');

// 也支持嵌套查询，返回存在json字段中存在tree.user这个键的所有行
List<TestDO> result = repository.listByJsonColumnKey(TestDO::getMetaData, "size");
// 等价SQL：select * from test where JSON_CONTAINS_PATH(meta_data, 'one', '$.tree.user');

// 也可以直接使用列名而不是lamada写法
List<TestDO> result = repository.listByJsonColumnKey("meta_data", "size");
// 等价SQL：select * from test where JSON_CONTAINS_PATH(meta_data, 'one', '$.size');

List<TestDO> result = repository.listByJsonColumnKey("meta_data", "size");
// 等价SQL：select * from test where JSON_CONTAINS_PATH(meta_data, 'one', '$.tree.user');
```

#### JSON键值
根据json字段中键和值来查询

> [!IMPORTANT]
>
> 使用这个方法，MySQL版本必须 >= 5.7.13

```java
// 返回json字段中size等于1的所有行
List<TestDO> result = repository.listByJsonColumnKeyValue(TestDO::getMetaData, "size", 1);
// 等价SQL：select * from test where meta_data->>'$.size' = '1';

// 也支持嵌套查询，返回json字段tree.user等于test的所有行
List<TestDO> result = repository.listByJsonColumnKeyValue(TestDO::getMetaData, "tree.user", "test");
// 等价SQL：select * from test where meta_data->>'$.tree.user' = 'test';

// 也支持查询null值
List<TestDO> result = repository.listByJsonArrayColumnValue(TestDO::getMetaData, "width", null);
// 等价SQL：select * from test where meta_data->>'$.width' = 'null';

// 也可以直接使用列名而不是lamada写法
List<TestDO> result = repository.listByJsonColumnKeyValue("meta_data", "size", 1);
// 等价SQL：select * from test where meta_data->>'$.size' = '1';

List<TestDO> result = repository.listByJsonColumnKeyValue("meta_data", "tree.user", "test");
// 等价SQL：select * from test where meta_data->>'$.tree.user' = 'test';

List<TestDO> result = repository.listByJsonArrayColumnValue("meta_data", "width", null);
// 等价SQL：select * from test where meta_data->>'$.width' = 'null';
```

#### JSON数组值
根据json字段中数组是否存在某个值来查询

```java
// 返回存在json字段中数组存在test的所有行
List<TestDO> result = repository.listByJsonArrayColumnValue(TestDO::getTags, "test");
// 等价SQL：select * from test where JSON_CONTAINS(tags, 'test');

// 也支持查询null值
List<TestDO> result = repository.listByJsonArrayColumnValue(TestDO::getTags, null);
// 等价SQL：select * from test where JSON_CONTAINS(tags, 'null');

// 也可以直接使用列名而不是lamada写法
List<TestDO> result = repository.listByJsonArrayColumnValue("tags", "test");
// 等价SQL：select * from test where JSON_CONTAINS(tags, 'test');

List<TestDO> result = repository.listByJsonArrayColumnValue("tags", null);
// 等价SQL：select * from test where JSON_CONTAINS(tags, 'null');
```

#### JSON数组值集合
根据json字段中数组是否存在集合中任意一个值来查询

> [!IMPORTANT]
>
> 使用这个方法，MySQL版本必须 >= 8.0.17

```java
List<String> names = List.of("test2", "test3");

// 返回存在json字段中数组存在test2或test3的所有行
List<TestDO> result = repository.listByJsonArrayColumnValues(TestDO::getTags, "test");
// 等价SQL：select * from test where JSON_OVERLAPS(tags, '["test2", "test3"]');

// 也可以直接使用列名而不是lamada写法
List<TestDO> result = repository.listByJsonArrayColumnValues("tags", "test");
// 等价SQL：select * from test where JSON_OVERLAPS(tags, '["test2", "test3"]');
```

### 批量替换

> [!WARNING]
> 这个方法用的时候需要非常慎重，因为是直接用新的值替换掉所有旧的值，可能会影响到很多行。

```java
boolean result = repository.replaceColumnValue(TestDO::getName, null, "test");
// 等价SQL：update test set `name` = 'test' where `name` is null;

boolean result = repository.replaceColumnValue(TestDO::getName, "old", "new");
// 等价SQL：update test set `name` = 'test' where `name` = 'old';
```

### 删除

> [!WARNING]
> 调用删除相关方法的时候一定要慎重，非必要情况下建议还是使用`id`删除。

#### 字段值

```java
boolean result = repository.removeByColumnValue(TestDO::getName, null);
// 等价SQL：delete from test where `name` is null;

boolean result = repository.removeByColumnValue(TestDO::getName, "test");
// 等价SQL：delete from test where `name` = 'test';
```

#### 字段值集合

> [!NOTE]
> 如果传入的集合为`null`或空集合，则会返回`false`。

```java
List<String> names = List.of("test1", "test2", "test3");

// 如果集合元素数量超过1000个，则会分批次删除，每次只传入1000个元素进行删除
boolean result = repository.removeByColumnValues(TestDO::getName, names);
// 等价SQL：delete from test where `name` in ("test1", "test2", "test3");
```

#### 模糊匹配删除

> [!NOTE]
> 如果传入的字符串为`null`、空字符串、空白字符串则返回`false`。

```java
boolean result = repository.removeByLikeColumnValue(TestDO::getName, "test");
// 等价SQL：delete from test where `name` like '%test%';

boolean result = repository.removeByLikeLeftColumnValue(TestDO::getName, "test");
// 等价SQL：delete from test where `name` like '%test';

boolean result = repository.removeByLikeRightColumnValue(TestDO::getName, "test");
// 等价SQL：delete from test where `name` like 'test%';
```

#### 模糊排除删除

> [!NOTE]
> 如果传入的字符串为`null`、空字符串、空白字符串则返回`false`。

```java
boolean result = repository.removeByLikeColumnValue(TestDO::getName, "test");
// 等价SQL：delete from test where `name` not like '%test%';

boolean result = repository.removeByLikeLeftColumnValue(TestDO::getName, "test");
// 等价SQL：delete from test where `name` not like '%test';

boolean result = repository.removeByLikeRightColumnValue(TestDO::getName, "test");
// 等价SQL：delete from test where `name` not like 'test%';
```
