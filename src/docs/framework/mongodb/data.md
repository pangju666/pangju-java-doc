---
layout: doc
---

# 数据结构

## 数据传输对象（DTO）
因为JSON请求体不能直接用JSON数组，所以我就定义了一些常用的列表数据传输对象。

> [!TIP]
> 这些类需要配合`jakarta-validation`使用，否则校验机制无法生效。

`io.github.pangju666.framework.data.mongodb.model.dto.ObjectIdListDTO`

id列表需要保证不能重复，我设置了`org.hibernate.validator.constraints.UniqueElements`校验注解。

```java
ObjectIdListDTO idListDTO = new ObjectIdListDTO<>(Arrays.asList("68dbcc442fdc604cf104122e", "68dbcc64f83f03c0087b07a3", "68dbcca4c3b2dc9f1fe8c1ef"));
/*
{
  "ids": [
    "68dbcc442fdc604cf104122e",
    "68dbcc64f83f03c0087b07a3",
    "68dbcca4c3b2dc9f1fe8c1ef"
  ]
}
*/
```

如果需要保证列表不能为空，需要使用`RequiredObjectIdListDTO`，我在`ObjectIdListDTO`的基础上，增加了`@NotEmpty`注解。

`io.github.pangju666.framework.data.mongodb.model.dto.RequiredObjectIdListDTO`
