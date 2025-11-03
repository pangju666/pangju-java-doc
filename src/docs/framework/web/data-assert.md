---
layout: doc
---

# 数据操作断言

`io.github.pangju666.framework.web.utils.DataOperationAssert`

提供一组用于数据操作断言的实用方法，用于简化[数据操作异常](/framework/web/exception#数据操作异常-1)的使用。

| 方法名    | 返回值  |                  说明                   |
|--------|:-----|:-------------------------------------:|
| query  | void | 判断查询操作是否成功，失败时抛出`DataQueryException`  |
| create | void | 判断创建操作是否成功，失败时抛出`DataCreateException` |
| update | void | 判断更新操作是否成功，失败时抛出`DataUpdateException` |
| save   | void |  判断保存操作是否成功，失败时抛出`DataSaveException`  |
| remove | void | 判断删除操作是否成功，失败时抛出`DataRemoveException` |

## 查询
```java
DataOperationAssert.query(userRepository.getByUsername("pangju666") != null, "用户不存在"); // 失败则会抛出DataQueryException

DataOperationAssert.query(userRepository.getByUsername("pangju666") != null, "用户不存在", "记录不存在"); // 失败则会抛出DataQueryException

DataOperationError error = new DataOperationError(
    "用户表",       // 数据来源
    "用户名",      // 数据描述
    "pangju666",    // 数据值
    "记录不存在" // 错误原因
);
DataOperationAssert.query(userRepository.getByUsername("pangju666") != null, "用户不存在", error); // 失败则会抛出DataQueryException
```

## 创建
```java
DataOperationAssert.create(userRepository.create(user), "用户创建失败"); // 失败则会抛出DataCreateException

DataOperationAssert.create(userRepository.create(user), "用户创建失败", "用户名已存在"); // 失败则会抛出DataCreateException

DataOperationError error = new DataOperationError(
    "用户表",       // 数据来源
    "用户名",      // 数据描述
    "pangju666",    // 数据值
    "用户名已存在" // 错误原因
);
DataOperationAssert.create(userRepository.create(user), "用户创建失败", error); // 失败则会抛出DataCreateException
```

## 更新
```java
DataOperationAssert.update(userRepository.update(user), "用户更新失败"); // 失败则会抛出DataUpdateException

DataOperationAssert.update(userRepository.update(user), "用户更新失败", "记录更新失败"); // 失败则会抛出DataUpdateException

DataOperationError error = new DataOperationError(
    "用户表",       // 数据来源
    "用户名",      // 数据描述
    "pangju666",    // 数据值
    "记录更新失败" // 错误原因
);
DataOperationAssert.update(userRepository.update(user), "用户更新失败", error); // 失败则会抛出DataUpdateException
```

## 保存
```java
DataOperationAssert.save(userRepository.save(user), "用户保存失败"); // 失败则会抛出DataSaveException

DataOperationAssert.save(userRepository.save(user), "用户保存失败", "记录写入失败"); // 失败则会抛出DataSaveException

DataOperationError error = new DataOperationError(
    "用户表",       // 数据来源
    "用户名",      // 数据描述
    "pangju666",    // 数据值
    "记录写入失败" // 错误原因
);
DataOperationAssert.save(userRepository.save(user), "用户保存失败", error); // 失败则会抛出DataSaveException
```

## 删除
```java
DataOperationAssert.remove(userRepository.remove(user), "用户删除失败"); // 失败则会抛出DataRemoveException

DataOperationAssert.remove(userRepository.remove(user), "用户删除失败", "记录不存在"); // 失败则会抛出DataRemoveException

DataOperationError error = new DataOperationError(
    "用户表",       // 数据来源
    "用户名",      // 数据描述
    "pangju666",    // 数据值
    "记录不存在" // 错误原因
);
DataOperationAssert.remove(userRepository.remove(user), "用户删除失败", error); // 失败则会抛出DataRemoveException
```
