---
layout: doc
---

# 基础实体类
我在[`Framework Mybaits Plus`](/framework/mybatisplus/entity)中定义的基础实体类的基础上做了进一步拓展

> [!IMPORTANT]
> 如果你要使用这些实体类，数据库表必须定义相关的字段，否则会映射失败。

> [!TIP]
> 所有基础实体类我都实现了`Serializable`接口，保证`Redis`缓存的正常使用。

## 逻辑删除+填充删除时间
`io.github.pangju666.framework.boot.data.mybatisplus.entity.LogicBaseEntity`

> [!IMPORTANT]
> `delete_time`字段记得要设置为可为`null`。
>
> 你的主键字段名称如果不是`id`的话，那么逻辑删除则不会生效。

继承该实体类，数据库表必须定义以下字段：
- create_time(datetime): 创建时间，默认为当前时间
- update_time(datetime): 更新时间，数据更新时自动设置为当前时间
- delete_status(必须与主键ID类型相同): 删除状态，`0`表示未删除，删除时自动设置为表数据行主键ID
- delete_time(datetime): 删除时间，`null`表示未删除，删除时自动填充为当前时间戳

## 乐观锁+逻辑删除+填充删除时间
`io.github.pangju666.framework.boot.data.mybatisplus.entity.VersionLogicBaseEntity`

> [!IMPORTANT]
> `delete_time`字段记得要设置为可为`null`。
>
> 你的主键字段名称如果不是`id`的话，那么逻辑删除则不会生效。

继承该实体类，数据库表必须定义以下字段：
- create_time(datetime): 创建时间，默认为当前时间
- update_time(datetime): 更新时间，数据更新时自动设置为当前时间
- delete_status(必须与主键ID类型相同): 删除状态，`0`表示未删除，删除时自动设置为表数据行主键ID
- delete_time(datetime): 删除时间，`null`表示未删除，删除时自动填充为当前时间戳
- version(int): 版本号，用于乐观锁控制（`Mybatis Plus`自动填充对应值）
