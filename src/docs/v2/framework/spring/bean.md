---
layout: doc
---

# Bean

## 工具类
`io.github.pangju666.framework.spring.utils.BeanUtils`

继承了`Spring`的`BeanUtils`，并在其基础上新增了一个`null`安全以及可以自定义处理的复制对象属性方法。

| 方法名               | 返回值      |       用途       |
|-------------------|:---------|:--------------:|
| copyProperties    | void     |  复制源对象属性到目标对象  |

### 复制对象属性
该方法使用Spring的`BeanUtils.copyProperties`方法复制属性，会复制所有名称相同且类型兼容的属性。

> [!IMPORTANT]
> 如果源对象或目标对象为`null`，则不执行复制操作。

```java
UserDTO sourceObj;
User targetObj;

BeanUtils.copyProperties(sourceObj, targetObj, null); // 不传入自定义处理
BeanUtils.copyProperties(sourceObj, targetObj, (userDto, user) -> { /* 自定义处理，可用于处理特殊字段或复杂对象 */ });
```
