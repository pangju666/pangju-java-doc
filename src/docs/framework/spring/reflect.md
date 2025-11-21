---
layout: doc
---

# Reflect

## 工具类
`io.github.pangju666.framework.spring.utils.ReflectionUtils`

该工具类继承并扩展了`org.springframework.util.ReflectionUtils`的功能。

提供更加便捷的字段访问、方法调用、类信息提取、泛型类型解析等反射辅助操作。

| 方法名                 | 返回值       |     用途     |
|---------------------|:----------|:----------:|
| getField            | 泛型        | 获取对象指定字段的值 |
| setField            | void      | 设置对象指定字段的值 |
| getSimpleClassName  | String    |  获取类的简化类名  |
| getClassGenericType | Class\<T> | 获取泛型类的类型参数 |
| canMakeAccessible   | boolean   | 强制设置字段可访问  |

### 获取字段的值
当字段可访问时，直接读取字段值；当字段不可直接访问时，尝试调用字段的`getter`方法。

```java
public class User {
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}

User user;

String name = (String) ReflectionUtils.getField(user, "name");

// 也可以传入字段类型进行精准匹配
String name = ReflectionUtils.getField(user, "name", String.class);
```

### 设置字段的值
当字段可访问时，直接写入字段值；当字段不可直接访问时，尝试调用字段的`setter`方法进行赋值。

```java
public class User {
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}

User user;

ReflectionUtils.setField(user, "name", "test");

// 也可以传入字段类型进行精准匹配
ReflectionUtils.setField(user, "name", "test", String.class);
```

### 获取类的简单名称
该方法就是去除类名称中的包路径部分。

```java
String test;

ReflectionUtils.getSimpleClassName(test); // String
ReflectionUtils.getSimpleClassName(test.getClass()); // String
```

### 获取父类中定义的泛型类型
本方法用于在运行时解析某个类的父类所声明的泛型实参类型，仅当父类定义了参数化类型时有效。

```java
class GenericParent<T> {}
class MyClass extends GenericParent<String, Boolean> {}

ReflectionUtils.getClassGenericType(MyClass.class); // java.lang.String
ReflectionUtils.getClassGenericType(MyClass.class, 0); // java.lang.String
ReflectionUtils.getClassGenericType(MyClass.class, 1); // java.lang.Boolean
```

### 修改可访问性
实现与父类的`org.springframework.util.ReflectionUtils.makeAccessible`方法相同，只是增加了返回值用来判断是否修改成功。

```java
class MyClass {
    private String value;
    
    private void test() {
    }
}

boolean result1 = ReflectionUtils.canMakeAccessible(MyClass.class.getDeclaredField("value"));
boolean result2 = ReflectionUtils.canMakeAccessible(MyClass.class.getMethod("test"));
```
