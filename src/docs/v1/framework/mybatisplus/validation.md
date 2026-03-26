---
layout: doc
---

# ID校验
## 自增ID
`io.github.pangju666.framework.data.mybatisplus.annotation.validation.AutoId`

支持的类型是`Long`，`null`视为有效。

验证方式：id >= 1

```java
@AutoId
Long id;
```

### 自增ID列表
`io.github.pangju666.framework.data.mybatisplus.annotation.validation.AutoIds`

支持的类型是`Collection<Long>`，`null`或空集合视为有效。

验证方式：集合中的每个元素必须不为`null`且大于等于1

```java
@AutoIds
List<Long> ids;
```

## UUID
`io.github.pangju666.framework.data.mybatisplus.annotation.validation.UUID`

> [!IMPORTANT]
> 这里的`UUID`是根据`com.baomidou.mybatisplus.annotation.IdType`中的`ASSIGN_UUID`规则去校验的。
> 
> 如果想要校验标准版本的UUID，请使用`org.hibernate.validator.constraints.UUID`。

支持的类型是`String`，`null`视为有效。

验证条件：
1. 不为空白字符串
2. 长度为32
3. 满足正则`^[0-9a-f]{8}[0-9a-f]{4}[0-9a-f]{4}[0-9a-f]{4}[0-9a-f]{12}$`

```java
@UUID
String id;
```

## UUID列表
`io.github.pangju666.framework.data.mybatisplus.annotation.validation.UUIDS`

> [!IMPORTANT]
> 这里的`UUID`是根据`com.baomidou.mybatisplus.annotation.IdType`中的`ASSIGN_UUID`规则去校验的。
>
> 如果想要校验标准版本的UUID，请使用`io.github.pangju666.commons.validation.annotation.UUIDS`。

支持的类型是`Collection<String>`，`null`或空集合视为有效。

验证方式：
验证条件：
1. 每个字符串都不为空白字符串
2. 每个字符串长度都为32
3. 每个字符串都满足正则`^[0-9a-f]{8}[0-9a-f]{4}[0-9a-f]{4}[0-9a-f]{4}[0-9a-f]{12}$`

```java
@UUIDS
List<String> ids;
```
