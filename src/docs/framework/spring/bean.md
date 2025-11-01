---
layout: doc
---

# Bean

## 工具类
`io.github.pangju666.framework.spring.utils.BeanUtils`

该工具类优化了Spring的BeanUtils功能，提供了null安全的对象转换和集合处理方法。

推荐使用`Mapstruct`，而不是`BeanUtils`

| 方法名               | 返回值      |       用途       |
|-------------------|:---------|:--------------:|
| copyProperties    | void     |  复制源对象属性到目标对象  |
| convertCollection | List\<T> | 将源集合转换为目标类型的列表 |
| convert           | 泛型       | 将单个源对象转换为目标类型  |

### 复制对象属性
该方法使用Spring的`BeanUtils.copyProperties`方法复制属性，会复制所有名称相同且类型兼容的属性。

如果源对象或目标对象为`null`，则不执行复制操作。

```java
UserDTO sourceObj;
User targetObj;

BeanUtils.copyProperties(sourceObj, targetObj);
BeanUtils.copyProperties(sourceObj, targetObj, (userDto, user) -> { /* 自定义处理，可用于处理特殊字段或复杂对象 */ });
```

### 转换对象
将单个源对象转换为目标类型。

如果源对象为`null`，则返回`null`。

```java
UserDTO sourceObj;

User user = BeanUtils.convert(sourceObj, (userDto, user) -> { /* 自定义转换处理 */ });
```

### 转换集合
将源集合转换为目标类型的列表，默认会过滤掉`null`元素。

```java
List<UserDTO> sourceList;

List<User> userList = BeanUtils.convertCollection(sourceList, (userDto, user) -> { /* 自定义转换处理 */ });
// 不过滤null元素
List<User> userList = BeanUtils.convertCollection(sourceList, false, (userDto, user) -> { /* 自定义转换处理 */ });
```
