---
layout: doc
---

# 类型处理器

`Mybatis Plus` 有很多内置的类型处理器，但是还是不太满足日常使用的需求，所以我就自己做了一些常用的。

> [!IMPORTANT]
> 手动指定字段的`typeHandler`时，一定要在实体类的`@TableName`注解上配置`autoResultMap = true`。

## JSON类型

`io.github.pangju666.framework.data.mybatisplus.type.handler.JsonTypeHandler`

`Mybatis Plus`虽然提供了内置的JSON类型处理器，但是它没实现`null`处理。

数据库里的值如果为`null`，映射出来就报错。

我就自己整了一个，基于`Gson`实现的。

映射规则：varchar -> Object

`null`值处理规则：

- List类型：返回`Collections.emptyList()`。
- Set类型：返回`Collections.emptySet()`。
- Map类型：返回`Collections.emptyMap()`。
- Enumeration类型：返回`Collections.emptyEnumeration()`。
- Iterator类型：返回`Collections.emptyIterator()`。
- 其他类型：返回`null`。

> [!NOTE]
> 我没做数组相关的处理，可别往数组映射。

使用示例
```java
@TableName(value = "test", autoResultMap = true)
public class TestEntity extends BaseEntity {
    @TableField(typeHandler = JsonTypeHandler.class)
	private Map<String, Object> jsonValue;
	@TableField(typeHandler = JsonTypeHandler.class)
	private List<String> jsonArray;
}
```

## Class类型

`io.github.pangju666.framework.data.mybatisplus.type.handler.ClassTypeHandler`

映射成`Class`的需求可能比较少见吧，我之前做过一个远程配置中心，属性值的类型需要用`Class`类型存储就顺手做了这个。

映射规则：varchar -> Class

实现原理
```java
private static final Map<String, Class<?>> CLASS_NAME_MAP = new ConcurrentHashMap<>(10);

if (StringUtils.isBlank(className)) {
    return null;
}
if (CLASS_NAME_MAP.containsKey(className)) {
	return CLASS_NAME_MAP.get(className);
}

try {
	Class<?> clz = Class.forName(className);
	CLASS_NAME_MAP.put(className, clz);
	return clz;
} catch (ClassNotFoundException e) {
	CLASS_NAME_MAP.put(className, null);
	throw new SQLException("无法将值" + className + "转换为Class对象");
}
```

使用示例
```java
@TableName(value = "test", autoResultMap = true)
public class TestEntity extends BaseEntity {
   @TableField(typeHandler = ClassTypeHandler.class)
   private Class<?> clz;
}
```

## 字符串列表
`io.github.pangju666.framework.data.mybatisplus.type.handler.GenericsListTypeHandler<T>`

这个也是之前做的，现在基本上都用JSON类型了，这个用的不多。

这是一个基础实现，我已经完成了大部分的处理，只需要继承这个类再定义一个转换过程就行了。

映射规则：varchar -> List<?>（将`,`分隔的字符串转换为对应的List列表）

使用示例
```java
@TableName(value = "test", autoResultMap = true)
public class TestEntity extends BaseEntity {
    @TableField(typeHandler = LongListTypeHandler.class)
    private List<Long> list;
}
```

### 自定义实现
"1,2,3" -> [1,2,3]

```java
@MappedTypes({List.class})
@MappedJdbcTypes({JdbcType.VARCHAR})
public final class IntegerVarcharToListTypeHandler extends GenericsVarcharToListTypeHandler<Integer> {
	public IntegerVarcharToListTypeHandler() {
		super(value -> StringUtils.isBlank(value) ? null : Integer.valueOf(value));
	}
}
```

### 自定义分隔符
如果你不想用`,`作为分隔符的话，也可以自己定义成别的。

"1&2&3" -> [1,2,3]
```java
@MappedTypes({List.class})
@MappedJdbcTypes({JdbcType.VARCHAR})
public final class IntegerVarcharToListTypeHandler extends GenericsVarcharToListTypeHandler<Integer> {
	public IntegerVarcharToListTypeHandler() {
		super("&", value -> StringUtils.isBlank(value) ? null : Integer.valueOf(value));
	}
}
```

### 内置实现
常用的类型我基本都实现了，直接用就行了。

#### BigDecimal
`io.github.pangju666.framework.data.mybatisplus.type.handler.list.BigDecimalListTypeHandler`

#### BigInteger
`io.github.pangju666.framework.data.mybatisplus.type.handler.list.BigIntegerListTypeHandler`

#### Boolean
`io.github.pangju666.framework.data.mybatisplus.type.handler.list.BooleanListTypeHandler`

#### Double
`io.github.pangju666.framework.data.mybatisplus.type.handler.list.DoubleListTypeHandler`

#### Float
`io.github.pangju666.framework.data.mybatisplus.type.handler.list.FloatListTypeHandler`

#### Integer
`io.github.pangju666.framework.data.mybatisplus.type.handler.list.IntegerListTypeHandler`

#### Long
`io.github.pangju666.framework.data.mybatisplus.type.handler.list.LongListTypeHandler`

#### String
`io.github.pangju666.framework.data.mybatisplus.type.handler.list.StringListTypeHandler`


## xml中使用
> [!IMPORTANT]
> `resultMap`标签的`autoMapping`属性必须为`true`，自定义类型处理器才能生效。

```xml
<!-- 不需要定义全部字段，只需要定义配置了自定义类型处理器的字段即可 -->
<resultMap id="TestResultMap" type="io.github.pangju666.test.model.entity.TestEntity" autoMapping="true">
    <result column="json_value" property="jsonValue" typeHandler="io.github.pangju666.framework.data.mybatisplus.type.handler.JsonTypeHandler" />
    <result column="json_array" property="jsonArray" typeHandler="io.github.pangju666.framework.data.mybatisplus.type.handler.JsonTypeHandler" />
</resultMap>

<select id="selectPageByQuery" resultMap="TestResultMap">
 <!-- 编写查询SQL -->
</select>
```
