---
layout: doc
---

# 格式化
`io.github.pangju666.commons.lang.utils.StringFormatUtils`

## 全大写下划线格式（SCREAMING_SNAKE_CASE）
```java
String a = "TEST_VALUE";
StringFormatUtils.formatAsScreamingSnakeCase(a); // "TEST_VALUE"

String b = "TEST-VALUE";
StringFormatUtils.formatAsScreamingSnakeCase(b); // "TEST_VALUE"

String c = "test-value";
StringFormatUtils.formatAsScreamingSnakeCase(c); // "TEST_VALUE"

String d = "test_value";
StringFormatUtils.formatAsScreamingSnakeCase(d); // "TEST_VALUE"

String e = "testValue";
StringFormatUtils.formatAsScreamingSnakeCase(e); // "TEST_VALUE"

String f = "TestValue";
StringFormatUtils.formatAsScreamingSnakeCase(f); // "TEST_VALUE"
```

## 全大写中横线格式（SCREAMING-KEBAB-CASE）
```java
String a = "TEST_VALUE";
StringFormatUtils.formatAsScreamingKebabCase(a); // "TEST-VALUE"

String b = "TEST-VALUE";
StringFormatUtils.formatAsScreamingKebabCase(b); // "TEST-VALUE"

String c = "test-value";
StringFormatUtils.formatAsScreamingKebabCase(c); // "TEST-VALUE"

String d = "test_value";
StringFormatUtils.formatAsScreamingKebabCase(d); // "TEST-VALUE"

String e = "testValue";
StringFormatUtils.formatAsScreamingKebabCase(e); // "TEST-VALUE"

String f = "TestValue";
StringFormatUtils.formatAsScreamingKebabCase(f); // "TEST-VALUE"
```

## 中横线格式（kebab-case）
```java
String a = "TEST_VALUE";
StringFormatUtils.formatAsKebabCase(a); // "test-value"

String b = "TEST-VALUE";
StringFormatUtils.formatAsKebabCase(b); // "test-value"

String c = "test-value";
StringFormatUtils.formatAsKebabCase(c); // "test-value"

String d = "test_value";
StringFormatUtils.formatAsKebabCase(d); // "test-value"

String e = "testValue";
StringFormatUtils.formatAsKebabCase(e); // "test-value"

String f = "TestValue";
StringFormatUtils.formatAsKebabCase(f); // "test-value"
```

## 下划线格式（snake_case）
```java
String a = "TEST_VALUE";
StringFormatUtils.formatAsSnakeCase(a); // "test_value"

String b = "TEST-VALUE";
StringFormatUtils.formatAsSnakeCase(b); // "test_value"

String c = "test-value";
StringFormatUtils.formatAsSnakeCase(c); // "test_value"

String d = "test_value";
StringFormatUtils.formatAsSnakeCase(d); // "test_value"

String e = "testValue";
StringFormatUtils.formatAsSnakeCase(e); // "test_value"

String f = "TestValue";
StringFormatUtils.formatAsSnakeCase(f); // "test_value"
```

## 小驼峰格式（camelCase）
```java
String a = "TEST_VALUE";
StringFormatUtils.formatAsCamelCase(a); // "testValue"

String b = "TEST-VALUE";
StringFormatUtils.formatAsCamelCase(b); // "testValue"

String c = "test-value";
StringFormatUtils.formatAsCamelCase(c); // "testValue"

String d = "test_value";
StringFormatUtils.formatAsCamelCase(d); // "testValue"

String e = "testValue";
StringFormatUtils.formatAsCamelCase(e); // "testValue"

String f = "TestValue";
StringFormatUtils.formatAsCamelCase(f); // "testValue"

// 指定分隔符
String g = "TEST&VALUE";
StringFormatUtils.formatAsCamelCase(a, "&"); // "testValue"

String h = "TEST&VALUE";
StringFormatUtils.formatAsCamelCase(b, "&"); // "testValue"

String i = "test&value";
StringFormatUtils.formatAsCamelCase(c, "&"); // "testValue"

String j = "test&value";
StringFormatUtils.formatAsCamelCase(d, "&"); // "testValue"
```

## 大驼峰格式（PascalCase）
```java
String a = "TEST_VALUE";
StringFormatUtils.formatAsPascalCase(a); // "TestValue"

String b = "TEST-VALUE";
StringFormatUtils.formatAsPascalCase(b); // "TestValue"

String c = "test-value";
StringFormatUtils.formatAsPascalCase(c); // "TestValue"

String d = "test_value";
StringFormatUtils.formatAsPascalCase(d); // "TestValue"

String e = "testValue";
StringFormatUtils.formatAsPascalCase(e); // "TestValue"

String f = "TestValue";
StringFormatUtils.formatAsPascalCase(f); // "TestValue"

// 指定分隔符
String g = "TEST&VALUE";
StringFormatUtils.formatAsCamelCase(a, "&"); // "TestValue"

String h = "TEST&VALUE";
StringFormatUtils.formatAsCamelCase(b, "&"); // "TestValue"

String i = "test&value";
StringFormatUtils.formatAsCamelCase(c, "&"); // "TestValue"

String j = "test&value";
StringFormatUtils.formatAsCamelCase(d, "&"); // "TestValue"
```
