---
layout: doc
---

# CRUD
`io.github.pangju666.framework.data.mybatisplus.repository.BaseRepository<M extends BaseMapper<T>, T>`

我继承了[`com.baomidou.mybatisplus.extension.repository.CrudRepository`](https://baomidou.com/guides/data-interface/#_top)，并在其基础上了增加了一系列常用的`CRUD`方法。

| 方法名                             | 返回值      |         用途          |
|---------------------------------|:---------|:-------------------:|
| listByJsonObjectValue           | List\<T> |    根据JSON对象字段值查询    |
| listByEmptyJsonObject           | List\<T> |    查询列为空JSON对象的行    |
| listByJsonArrayValue            | List\<T> |     根据JSON数组值查询     |
| listByEmptyJsonArray            | List\<T> |   查询指定列为空JSON数组的行   |
| existsById                      | boolean  |      检查ID是否存在       |
| notExistsById                   | boolean  |      检查ID是否不存在      |
| existsByColumnValue             | boolean  |     检查指定列的值是否存在     |
| notExistsByColumnValue          | boolean  |    检查某指定列的值是否不存在    |
| getByColumnValue                | T        |      根据指定列的值查询      |
| listColumnValue                 | List\<?> |      查询指定列的全部值      |
| listUniqueColumnValue           | List\<?> |    获取指定列的全部不重复值     |
| listByIds                       | List\<T> |      根据ID集合查询       |
| listByColumnValue               | List\<T> |      根据指定列的值查询      |
| listByColumnValues              | List\<T> |     根据指定列的值集合查询     |
| listByNotNullColumn             | List\<T> |    查询指定列不为null的行    |
| listByNullColumn                | List\<T> |    查询指定列为null的行     |
| listByLikeColumnValue           | List\<T> |    根据列值进行模糊全匹配查询    |
| listByLikeLeftColumnValue       | List\<T> |    根据列值进行模糊左匹配查询    |
| listByLikeRightColumnValue      | List\<T> |    根据列值进行模糊右匹配查询    |
| listByNotLikeColumnValue        | List\<T> |    根据列值进行模糊全排除查询    |
| listByNotLikeLeftColumnValue    | List\<T> |    根据列值进行模糊左排除查询    |
| listByNotLikeRightColumnValue   | List\<T> |    根据列值进行模糊右排除查询    |
| saveBatch                       | boolean  |        批量保存         |
| updateBatchById                 | boolean  |      根据Id批量更新       |
| saveOrUpdateBatch               | boolean  |      批量保存或更新实体      |
| replaceColumnValue              | boolean  |     替换指定列符合条件的值     |
| removeByIds                     | boolean  |      根据ID批量删除       |
| removeByColumnValue             | boolean  |       根据列值删除        |
| removeByColumnValues            | boolean  |     根据列值集合批量删除      |
| removeByLikeColumnValue         | boolean  |    根据列值进行模糊全匹配删除    |
| removeByNotLikeColumnValue      | boolean  |    根据列值进行模糊全排除删除    |
| removeByLikeLeftColumnValue     | boolean  |    根据列值进行模糊左匹配删除    |
| removeByNotLikeLeftColumnValue  | boolean  |    根据列值进行模糊左排除删除    |
| removeByLikeRightColumnValue    | boolean  |    根据列值进行模糊右匹配删除    |
| removeByNotLikeRightColumnValue | boolean  |    根据列值进行模糊右排除删除    |
| getJsonValue                    | String   | 将对象转换为JSON字符串（内部方法） |

## 使用
这个类是一个抽象类，需要用你自己的类继承它，然后就可以愉快的使用了。

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
	private List<String> tags;
}
```

SQL示例：
```sql
CREATE TABLE `test` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `tags` JSON DEFAULT NULL COMMENT '标签',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间'
  PRIMARY KEY (`id`)
)
```

### 查询

#### JSON查询

### 保存/更新

### 删除
