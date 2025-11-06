---
layout: doc
---

# 工具类

## 数据表实体工具类
`io.github.pangju666.framework.data.mybatisplus.uitls.EntityUtils`

我写了几个比较简单且常用的方法，减少样板式的代码。

| 方法名                     | 返回值               |           用途           |
|-------------------------|:------------------|:----------------------:|
| getFieldValueList       | List\<V>          |  提取字段并生成列表（保留顺序，允许重复）  |
| getFieldValueSet        | Set\<V>           |  提取字段并生成集合（去重，不保证顺序）   |
| getUniqueFieldValueList | List\<V>          | 提取字段并生成去重列表（保留首次出现的顺序） |
| mapByField              | Map\<V, T>        |   以字段值作为键，将实体映射为 Map   |
| groupByField            | Map\<V, List\<T>> |      按字段值对实体进行分组       |
| sumFieldValue           | double            |  对数值字段求和（转换为 double）   |
| averageFieldValue       | double            |  对数值字段求平均（转换为 double）  |

### 使用示例
```java
@TableName(value = "test")
public class TestDO extends BaseEntity {
    @TableId(type = IdType.AUTO)
    private Long id;
	private String name;
	private String content;
	private Integer score;
}

@AutoWired
TestMapper mapper;
// 查询全部行
List<TestDO> list = mapper.selectList(Wrappers.emptyWrapper());

// 提取全部id
List<String> ids = EntityUtils.getFieldValueList(list, TestDO::getId);
// 提取全部id
Set<String> ids = EntityUtils.getFieldValueSet(list, TestDO::getId);
// 提取全部不重复的name
Set<String> ids = EntityUtils.getUniqueFieldValueList(list, TestDO::getName);

// 根据id映射
Map<Long, TestDO> idMap = EntityUtils.mapByField(list, TestDO::getId); 
// 根据name分组
Map<String, List<TestDO>> nameGroups = EntityUtils.groupByField(list, TestDO::getId);

// 计算所有score的和（虽然字段是int类型，但是为了通用性，我是全部转换成double了，避免出现小数点被截断）
double sum = EntityUtils.sumFieldValue(list, TestDO::getScore);
// 计算所有score的平均数（虽然字段是int类型，但是为了通用性，我是全部转换成double了，避免出现小数点被截断）
double sum = EntityUtils.averageFieldValue(list, TestDO::getScore);
```
