---
layout: doc
---

# 注解

## 逻辑删除填充
`io.github.pangju666.framework.boot.data.mybatisplus.annotation.TableLogicFill`

我在[`Framework Mybaits Plus`](/framework/mybatisplus/entity)中定义了几个基础实体类，但是无法在逻辑删除的同时填充一些其他逻辑删除相关的值。

所以我做了这么一个注解，方便在逻辑删除的同时写入一些其他值。

我在这个注解的基础上，定义了新的两个基础实体类：[`LogicBaseEntity`](/starter/mybatisplus/entity#逻辑删除-填充删除时间)和[`VersionLogicBaseEntity`](/starter/mybatisplus/entity#乐观锁-逻辑删除-填充删除时间)
，用于在填充逻辑删除状态的同时填充删除时间。

### 属性
- value: 逻辑删除时需要填充的值（可以是常量值，也可以是数据库表达式，如：CURRENT_TIMESTAMP）。

### 自定义
如果你不想使用我内置的基础实体类，也可以借助这个注解定义自己的实体类

```java
@TableName(value = "xxxx")
public class TestADO {
	//...其他字段
	/**
	 * 删除时间（逻辑删除时自动填充为当前时间）
	 */
	@TableLogicFill(value = "CURRENT_TIMESTAMP")
	@TableField("delete_time")
	private Date deleteTime;
	/**
	 * 删除状态，false表示未删除，删除时设置为true
	 */
	@TableLogic(value = "false", delval = "id")
	@TableField("delete_status")
	private Boolean deleteStatus;
}
```

