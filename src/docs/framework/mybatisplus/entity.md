---
layout: doc
---

# 基础实体类
我根据之前的工作经验，定义了几种常用到的基础实体类，希望你们能用上。

> [!IMPORTANT]
> 如果你要使用这些实体类，数据库表必须定义相关的字段，否则会映射失败。

> [!TIP]
> 所有基础实体类我都实现了`Serializable`接口，保证`Redis`缓存的正常使用。

## 基础字段
`io.github.pangju666.framework.data.mybatisplus.model.entity.BaseEntity`

继承该实体类，数据库表必须定义以下字段：
- create_time(datetime): 创建时间，默认为当前时间
- update_time(datetime): 更新时间，数据更新时自动设置为当前时间

## 逻辑删除
逻辑删除字段我提供了两种不同的基础实体类

> [!TIP]
> 如果需要建立**唯一索引**的话就选择继承`LogicStatusBaseEntity`。
> 
> 因为**删除时间**可能不是唯一的，但是**主键ID**一定是唯一的。

### 删除状态
`io.github.pangju666.framework.data.mybatisplus.model.entity.LogicStatusBaseEntity<ID>`

继承该实体类，数据库表必须定义以下字段：
- create_time(datetime): 创建时间，默认为当前时间
- update_time(datetime): 更新时间，数据更新时自动设置为当前时间
- delete_status(必须与主键ID类型相同): 删除状态，0表示未删除，删除时设置为表数据行主键ID

> [!IMPORTANT]
> 你的主键字段名称如果不是`id`的话，那么逻辑删除则不会生效。

### 删除时间
`io.github.pangju666.framework.data.mybatisplus.model.entity.LogicTimeBaseEntity`

继承该实体类，数据库表必须定义以下字段：
- create_time(datetime): 创建时间，默认为当前时间
- update_time(datetime): 更新时间，数据更新时自动设置为当前时间
- delete_time(datetime): 删除时间，`null`表示未删除，删除时设置为当前时间戳

> [!IMPORTANT]
> `delete_time`字段记得要设置为可为`null`。

## 乐观锁
`Mybatis Plus` 提供了**乐观锁**插件，我也在这个基础上做了几个集成乐观锁字段的基础实体类。

### 基础字段
`io.github.pangju666.framework.data.mybatisplus.model.entity.BaseEntity`

继承该实体类，数据库表必须定义以下字段：
- create_time(datetime): 创建时间，默认为当前时间
- update_time(datetime): 更新时间，数据更新时自动设置为当前时间
- version(int): 版本号，用于乐观锁控制（`Mybatis Plus`自动填充对应值）

### 删除状态逻辑删除
`io.github.pangju666.framework.data.mybatisplus.model.entity.VersionLogicStatusBaseEntity<ID>`

继承该实体类，数据库表必须定义以下字段：
- create_time(datetime): 创建时间，默认为当前时间
- update_time(datetime): 更新时间，数据更新时自动设置为当前时间
- delete_status(必须与主键ID类型相同): 删除状态，0表示未删除，删除时设置为表数据行主键ID
- version(int): 版本号，用于乐观锁控制（`Mybatis Plus`自动填充对应值）

### 删除时间逻辑删除
`io.github.pangju666.framework.data.mybatisplus.model.entity.VersionLogicTimeBaseEntity`

继承该实体类，数据库表必须定义以下字段：
- create_time(datetime): 创建时间，默认为当前时间
- update_time(datetime): 更新时间，数据更新时自动设置为当前时间
- delete_time(datetime): 删除时间，`null`表示未删除，删除时设置为当前时间戳
- version(int): 版本号，用于乐观锁控制（`Mybatis Plus`自动填充对应值）
