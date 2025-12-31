---
layout: doc
---

# 格式化
`io.github.pangju666.commons.lang.utils.TextFormatUtils`

## 全大写下划线格式（SCREAMING_SNAKE_CASE）
```java
String a = "TEST_VALUE";
TextFormatUtils.formatAsScreamingSnakeCase(a); // "TEST_VALUE"

String b = "TEST-VALUE";
TextFormatUtils.formatAsScreamingSnakeCase(b); // "TEST_VALUE"

String c = "test-value";
TextFormatUtils.formatAsScreamingSnakeCase(c); // "TEST_VALUE"

String d = "test_value";
TextFormatUtils.formatAsScreamingSnakeCase(d); // "TEST_VALUE"

String e = "testValue";
TextFormatUtils.formatAsScreamingSnakeCase(e); // "TEST_VALUE"

String f = "TestValue";
TextFormatUtils.formatAsScreamingSnakeCase(f); // "TEST_VALUE"
```

## 全大写中横线格式（SCREAMING-KEBAB-CASE）
```java
String a = "TEST_VALUE";
TextFormatUtils.formatAsScreamingKebabCase(a); // "TEST-VALUE"

String b = "TEST-VALUE";
TextFormatUtils.formatAsScreamingKebabCase(b); // "TEST-VALUE"

String c = "test-value";
TextFormatUtils.formatAsScreamingKebabCase(c); // "TEST-VALUE"

String d = "test_value";
TextFormatUtils.formatAsScreamingKebabCase(d); // "TEST-VALUE"

String e = "testValue";
TextFormatUtils.formatAsScreamingKebabCase(e); // "TEST-VALUE"

String f = "TestValue";
TextFormatUtils.formatAsScreamingKebabCase(f); // "TEST-VALUE"
```

## 中横线格式（kebab-case）
```java
String a = "TEST_VALUE";
TextFormatUtils.formatAsKebabCase(a); // "test-value"

String b = "TEST-VALUE";
TextFormatUtils.formatAsKebabCase(b); // "test-value"

String c = "test-value";
TextFormatUtils.formatAsKebabCase(c); // "test-value"

String d = "test_value";
TextFormatUtils.formatAsKebabCase(d); // "test-value"

String e = "testValue";
TextFormatUtils.formatAsKebabCase(e); // "test-value"

String f = "TestValue";
TextFormatUtils.formatAsKebabCase(f); // "test-value"
```

## 下划线格式（snake_case）
```java
String a = "TEST_VALUE";
TextFormatUtils.formatAsSnakeCase(a); // "test_value"

String b = "TEST-VALUE";
TextFormatUtils.formatAsSnakeCase(b); // "test_value"

String c = "test-value";
TextFormatUtils.formatAsSnakeCase(c); // "test_value"

String d = "test_value";
TextFormatUtils.formatAsSnakeCase(d); // "test_value"

String e = "testValue";
TextFormatUtils.formatAsSnakeCase(e); // "test_value"

String f = "TestValue";
TextFormatUtils.formatAsSnakeCase(f); // "test_value"
```

## 小驼峰格式（camelCase）
```java
String a = "TEST_VALUE";
TextFormatUtils.formatAsCamelCase(a); // "testValue"

String b = "TEST-VALUE";
TextFormatUtils.formatAsCamelCase(b); // "testValue"

String c = "test-value";
TextFormatUtils.formatAsCamelCase(c); // "testValue"

String d = "test_value";
TextFormatUtils.formatAsCamelCase(d); // "testValue"

String e = "testValue";
TextFormatUtils.formatAsCamelCase(e); // "testValue"

String f = "TestValue";
TextFormatUtils.formatAsCamelCase(f); // "testValue"

// 指定分隔符
String g = "TEST&VALUE";
TextFormatUtils.formatAsCamelCase(a, "&"); // "testValue"

String h = "TEST&VALUE";
TextFormatUtils.formatAsCamelCase(b, "&"); // "testValue"

String i = "test&value";
TextFormatUtils.formatAsCamelCase(c, "&"); // "testValue"

String j = "test&value";
TextFormatUtils.formatAsCamelCase(d, "&"); // "testValue"
```

## 大驼峰格式（PascalCase）
```java
String a = "TEST_VALUE";
TextFormatUtils.formatAsPascalCase(a); // "TestValue"

String b = "TEST-VALUE";
TextFormatUtils.formatAsPascalCase(b); // "TestValue"

String c = "test-value";
TextFormatUtils.formatAsPascalCase(c); // "TestValue"

String d = "test_value";
TextFormatUtils.formatAsPascalCase(d); // "TestValue"

String e = "testValue";
TextFormatUtils.formatAsPascalCase(e); // "TestValue"

String f = "TestValue";
TextFormatUtils.formatAsPascalCase(f); // "TestValue"

// 指定分隔符
String g = "TEST&VALUE";
TextFormatUtils.formatAsCamelCase(a, "&"); // "TestValue"

String h = "TEST&VALUE";
TextFormatUtils.formatAsCamelCase(b, "&"); // "TestValue"

String i = "test&value";
TextFormatUtils.formatAsCamelCase(c, "&"); // "TestValue"

String j = "test&value";
TextFormatUtils.formatAsCamelCase(d, "&"); // "TestValue"
```
