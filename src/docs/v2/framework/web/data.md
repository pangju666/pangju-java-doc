---
layout: doc
---

# 数据结构

## 统一响应结果
`io.github.pangju666.framework.web.model.Result`

这个是一个比较重要的类，框架里所有的Web相关的内容都是使用这个类做成统一响应结果

属性：
- code: 状态码，成功统一为0，失败则默认为-1，也可以自定义
- message：响应消息：成果统一为请求成功，失败则默认为请求失败，也可以自定义
- data：响应数据，默认为null，也可以自定义，类型为泛型

```java
Result<Void> result1 = Result.ok(); // 成功响应，无响应数据

Result<String> result2 = Result.ok("Hello World"); // 成功响应

Result<String> result3 = Result.fail(); // 失败响应

Result<String> result4 = Result.fail("接口请求失败"); // 失败响应，自定义失败响应消息

Result<String> result5 = Result.fail(-100, "接口请求失败"); // 失败响应，自定义失败状态码和响应消息

String reusltStr = Result.fail(-100, "接口请求失败").toString(); // {"code":-100,"message":"接口请求失败","data":null}
```

## 数据传输对象（DTO）
因为JSON请求体不能直接用JSON数组，所以我就定义了一些常用的列表数据传输对象。

属性值我设置了`@Valid`注解，支持对列表元素进行验证。

> [!TIP]
> 这些类需要配合`jakarta-validation`使用，否则校验机制无法生效。

### 泛型列表
`io.github.pangju666.framework.web.model.dto.ListDTO`

```java
List<String> list = Arrays.asList("1", "2", "3");
ListDTO<String> listDTO = new ListDTO<>(list);
/*
{
  "values": [
    "1",
    "2",
    "3"
  ]
}
*/
```

如果需要保证列表元素不重复，需要使用`UniqueListDTO`，我在`ListDTO`的基础上，增加了`@UniqueElements`注解。

`io.github.pangju666.framework.web.model.dto.UniqueStringListDTO`
<br>
<br>

如果需要保证列表不能为空，需要使用`RequiredListDTO`，我在`ListDTO`的基础上，增加了`@NotEmpty`注解。

`io.github.pangju666.framework.web.model.dto.RequiredListDTO`
<br>
<br>

如果需要同时保证列表不能为空和列表元素不重复，需要使用`RequiredUniqueListDTO`，我在`ListDTO`的基础上，增加了`@NotEmpty`和`@UniqueElements`注解。

`io.github.pangju666.framework.web.model.dto.RequiredUniqueListDTO`

### 字符串列表
`io.github.pangju666.framework.web.model.dto.StringListDTO`

这个类和`ListDTO`的区别在于，列表中的字符串元素不能为空白。

如果列表为`["test", "", " "]`这样的，则会校验失败。

```java
List<String> list = Arrays.asList("1", "2", "3");
StringListDTO listDTO = new StringListDTO(list);
/*
{
  "values": [
    "1",
    "2",
    "3"
  ]
}
*/
```

如果需要保证列表元素不重复，需要使用`UniqueStringListDTO`，我在`StringListDTO`的基础上，增加了`@UniqueElements`注解。

`io.github.pangju666.framework.web.model.dto.UniqueStringListDTO`
<br>
<br>

如果需要保证列表不能为空，需要使用`RequiredStringListDTO`，我在`StringListDTO`的基础上，增加了`@NotEmpty`注解。

`io.github.pangju666.framework.web.model.dto.RequiredStringListDTO`
<br>
<br>

如果需要同时保证列表不能为空和列表元素不重复，需要使用`RequiredUniqueStringListDTO`，我在`StringListDTO`的基础上，增加了`@NotEmpty`和`@UniqueElements`注解。

`io.github.pangju666.framework.web.model.dto.RequiredUniqueListDTO`

## 响应数据对象（VO）

### 枚举类
`io.github.pangju666.framework.web.model.vo.EnumVO`

这个类主要用于返回列表枚举数据用的，我自己平时开发用的比较多。

属性：
- label：显示名称，一般是用于向用户展示的文字
- value：枚举值，一般是枚举名称或者自定义的值

```java
enum TestEnum {
	TEST_1("测试枚举1"),
	TEST_2("测试枚举2"),
	TEST_3("测试枚举3");

	private String label;

	TestEnum(String label) {
		this.label = label;
	}

	public String getLabel() {
	    return this.label;
	}
}

List<EnumVO> list = Arrays.stream(TestEnum.values())
    .map(item -> new EnumVO(item.getLabel(), item.name()))
	.toList();
/*
[
  {
    "label": "测试枚举1",
    "value": "TEST_1"
  },
  {
    "label": "测试枚举2",
    "value": "TEST_2"
  },
  {
    "label": "测试枚举3",
    "value": "TEST_3"
  }
]
*/
```
