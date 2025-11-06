---
layout: doc
---

# 数据结构

## 数据传输对象（DTO）
因为JSON请求体不能直接用JSON数组，所以我就定义了一些常用的列表数据传输对象。

> [!TIP]
> 这些类需要配合`jakarta-validation`使用，否则校验机制无法生效。

### 自增ID列表
`io.github.pangju666.framework.data.mybatisplus.model.dto.AutoIdListDTO`

id列表需要保证不能重复，我增加了`org.hibernate.validator.constraints.UniqueElements`校验注解。

```java
AutoIdListDTO idListDTO = new AutoIdListDTO<>(Arrays.asList(1L, 2L, 3L));
/*
{
  "ids": [
    1
    2
    3
  ]
}
*/
```

如果需要保证列表不能为空，需要使用`RequiredAutoIdListDTO`，我在`AutoIdListDTO`的基础上，增加了`@NotEmpty`注解。

`io.github.pangju666.framework.data.mybatisplus.model.dto.RequiredAutoIdListDTO`

### UUID
`io.github.pangju666.framework.data.mybatisplus.model.dto.UUIDListDTO`

> [!IMPORTANT]
> 这里的`UUID`是根据`com.baomidou.mybatisplus.annotation.IdType`中的`ASSIGN_UUID`规则去校验的。
> 
> 是去掉中划线的`UUID`，千万不要用带中划线的版本，验证会不通过。

id列表需要保证不能重复，我增加了`org.hibernate.validator.constraints.UniqueElements`校验注解。

```java
UUIDListDTO idListDTO = new UUIDListDTO<>(Arrays.asList("7d3436e7ac0547b881bf742a91192c0b", "5b21c805940d40998e965047610d8089", "3845f44b988f416482c01fc7947a1f17"));
/*
{
  "ids": [
    "7d3436e7ac0547b881bf742a91192c0b",
    "5b21c805940d40998e965047610d8089",
    "3845f44b988f416482c01fc7947a1f17"
  ]
}
*/
```
如果需要保证列表不能为空，需要使用`RequiredUUIDListDTO`，我在`UUIDListDTO`的基础上，增加了`@NotEmpty`注解。

`io.github.pangju666.framework.data.mybatisplus.model.dto.RequiredUUIDListDTO`
