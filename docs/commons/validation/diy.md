---
layout: doc
---

# 自定义

## 概述
`io.github.pangju666.commons.validation.utils.ConstraintValidatorUtils`

该模块也提供了通用的工具类来帮助开发者实现自己的校验注解，流程如下：

### 字符串校验

#### 定义校验注解
```java
@Documented
@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE})
@Retention(RUNTIME)
@Constraint(validatedBy = TestValidator.class)
public @interface Test {
	/**
	 * 校验失败时的默认消息
	 */
	String message() default "校验失败";
	
	/**
	 * 是否要求值不能为空白（仅空格等空白字符）
	 */
	boolean notBlank() default false;

	/**
	 * 是否要求值不能为空字符串
	 */
	boolean notEmpty() default false;

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
```

#### 定义注解校验器
```java
public class TestValidator implements ConstraintValidator<Test, String> {
	private boolean notBlank;
	private boolean notEmpty;

	@Override
	public void initialize(Test constraintAnnotation) {
		this.notBlank = constraintAnnotation.notBlank();
		this.notEmpty = constraintAnnotation.notEmpty();
	}

	@Override
	public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
		// 通用正则来校验
		return ConstraintValidatorUtils.validate(value, notBlank, notEmpty, 正则表达式);
		
		// 通用函数式接口来校验
		return ConstraintValidatorUtils.validate(value, notBlank, notEmpty, val -> {
		    // 校验逻辑，通过则返回 true，否则返回 false
		});
	}
}
```

### 集合校验

#### 定义校验注解
```java
@Documented
@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE})
@Retention(RUNTIME)
@Constraint(validatedBy = TestValidator.class)
public @interface Test {
	/**
	 * 校验失败时的默认消息
	 */
	String message() default "校验失败";
	
	/**
	 * 是否要求所有元素匹配（默认true）
	 * <p>false表示只要任一元素匹配即通过</p>
	 */
	boolean allMatch() default true;

	/**
	 * 是否要求集合不能为空
	 * <p>包括null和空集合两种情况</p>
	 */
	boolean notEmpty() default false;

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
```

#### 定义注解校验器
可以是任何类型的集合，不一定是`String`类型

```java
public class TestValidator implements ConstraintValidator<Test, Collection<String>> {
	private boolean allMatch;
	private boolean notEmpty;

	@Override
	public void initialize(NotBlankElements constraintAnnotation) {
		this.allMatch = constraintAnnotation.allMatch();
		this.notEmpty = constraintAnnotation.notEmpty();
	}

	@Override
	public boolean isValid(Collection<String> value, ConstraintValidatorContext constraintValidatorContext) {
		// 通用正则来校验
		return ConstraintValidatorUtils.validate(value, allMatch, notEmpty, 正则表达式);
		
		// 通用函数式接口来校验
		return ConstraintValidatorUtils.validate(value, allMatch, notEmpty, val -> {
		    // 校验逻辑，通过则返回 true，否则返回 false
		});
	}
}
```
