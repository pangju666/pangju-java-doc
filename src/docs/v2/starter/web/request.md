---
layout: doc
---

# 请求参数

## 时间类型

### 概述
我对`Date`和`Instant`请求参数做了时间戳格式适配，当请求参数类型是`Date`或`Instant`时会从时间戳字符串解析。

### 配置
```yaml
pangju:
  web:
    advice:
      enable-binder: true # 启用时间戳格式转换，默认启用
```    

### 使用示例
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    // GET请求示例：/api/users/query?createTime=1704067200000
    @GetMapping("/query")
    public ResponseEntity<?> query(@RequestParam Date createTime) {
        // createTime会被自动从时间戳转换为Date对象
        return ResponseEntity.ok.ok(createTime).build();
    }
    
    // 支持Instant
    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam Instant birthDate) {
        // birthDate会被自动从时间戳转换为Instant对象
        return ResponseEntity.ok.ok(birthDate).build();
    }
}
```


## 枚举类型
对于枚举类型，我做了对应的注解来处理。

### 注解
`io.github.pangju666.framework.boot.web.EnumRequestParam`

### 属性
- value: 请求参数的名称（指定HTTP请求中参数的名称。如果不指定或为空字符串，则默认使用方法参数的名称）。
- required: 参数是否为必需（默认为`true`，当设置为`true`时，如果请求中缺少该参数且未配置默认值，则抛出`MissingServletRequestParameterException`异常。当设置为`false`时，缺失的参数返回`null`）。
- defaultValue: 参数的默认值（当请求中未提供参数值时，使用该默认值。默认值应为有效的枚举名称（不区分大小写）。如果指定了默认值，则即使`required`为true，参数缺失时也会使用默认值而不会抛出异常）。
- description：参数的描述信息（用于描述该枚举参数的含义，在参数验证失败时会在错误消息中使用。 当无效的枚举值被提交时，异常消息将为：无效的`{description}`）

### 使用示例
```java
public enum UserStatus {
	DISABLED,
	ENABLED
}

@RestController
@RequestMapping("/api/users")
public class UserController {
    // 设置参数名称为 status，非必须参数，参数值为 null 或空白字符串时解析为 ENABLED，
    // 未找到枚举值时异常消息为 "无效的用户状态"
    @GetMapping("/users")
    public ResponseEntity<?> getUsers(@EnumRequestParam(value = "status", 
    required = false, defaultValue = "enabled", description = "用户状态") 
    UserStatus userStatus) {
        // status 参数将被自动转换为 UserStatus 枚举实例
        return ResponseEntity.ok().build();
    }
    
    // 参数名称为 userStatus，必须参数，参数值为 null 或空白字符串时解析为 ENABLED，
    // 未找到枚举值时异常消息为 "无效的用户状态"
    @GetMapping("/users")
    public ResponseEntity<?> getUsers(@EnumRequestParam(defaultValue = "enabled",
     description = "用户状态") UserStatus userStatus) {
        // status 参数将被自动转换为 UserStatus 枚举实例
        return ResponseEntity.ok().build();
    }
    
    // 参数名称为 userStatus，必须参数，参数值为 null 或空白字符串时解析为 null，
    // 未找到枚举值时异常消息为 "无效的用户状态"
    @GetMapping("/users")
    public ResponseEntity<?> getUsers(@EnumRequestParam(defaultValue = "enabled",
     description = "用户状态") UserStatus userStatus) {
        // status 参数将被自动转换为 UserStatus 枚举实例
        return ResponseEntity.ok().build();
    }
}
```
