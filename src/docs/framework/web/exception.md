---
layout: doc
---

# 异常

异常体系其实我构思了很久，最后才决定按这个结构去写，实在是又想要灵活性高，又想统一结构有点头疼。

> [!IMPORTANT]
> 需要搭配[`HttpServletResponseUtils.writeBeanToResponse`](/framework/web/utils#http响应)使用。

## 核心

整个异常体系的核心由`BaseHttpException`类和`HttpException`注解组成。

`BaseHttpException`决定了异常的日志打印规则和接口响应消息（message）。

`HttpException`决定了接口响应时异常的错误码、类型、是否打印日志、日志打印等级和Http响应状态码。

错误码计算规则：

- 最终错误码 = -(基础错误码 + |异常错误码|)
- 基础错误码来自`HttpExceptionType`枚举值
- 异常错误码大于1000时，仅保留后三位（如1234变为234）
- 使用负数表示错误状态

### 异常基类

`io.github.pangju666.framework.web.exception.base.BaseHttpException`

这是整个异常体系的基类，基于`org.springframework.core.NestedRuntimeException`开发，我在其基础上增加了`reason`属性和日志打印（
`log`）方法。

不同于普通异常，接口响应时返回的错误消息是异常的`message`值，而打印到日志里的是`reason`。

示例：
```java
ServiceException e = new ServerException("文件读取失败", "读取xxxxx文件失败，文件可能并不存在");
// 接口响应：{"code": -1000, "message": "文件读取失败", "data": null}
// 日志打印：原因：读取xxxxx文件失败，文件可能并不存在
```

### 异常类型

`io.github.pangju666.framework.web.enums.HttpExceptionType`

| 枚举值            | 基础错误码 | 异常类型描述  |                    说明                    |
|----------------|:------|:-------:|:----------------------------------------:|
| SERVER         | 5000  | 服务器内部错误 |             用于表示系统运行时发生的内部错误             |
| SERVICE        | 1000  | 业务逻辑错误  |              用于表示业务处理过程中的错误              |
| DATA_OPERATION | 2000  | 数据操作错误  |              用于表示数据操作相关的错误               |
| AUTHENTICATION | 3000  | 认证授权错误  |             用于表示用户认证和授权相关的错误             |
| VALIDATION     | 4000  | 参数校验错误  |             用于表示请求参数验证相关的错误              |
| CUSTOM         | 6000  |  自定义错误  |             用于处理特定业务场景的自定义异常             |
| UNKNOWN        | 0     |  未知错误   | 框架内部使用的异常类型，用于处理未标注`HttpException`注解的异常类 |

### 异常注解

`io.github.pangju666.framework.web.annotation.HttpException`

每个继承自`BaseHttpException`的异常建议都加上这个注解，如果不加的话会被作为未知错误处理。

属性：

- code: 异常配置码（与异常类型基础码组合生成最终错误码）。
- type: 异常类型（用于分类异常，提供对应的基础错误码，默认为`HttpExceptionType.CUSTOM`）。
- description: 异常概述（用于简要描述异常的具体含义，默认为异常类型的概述）。
- log: 是否记录日志（控制是否记录该异常的日志信息，默认为`true`，对于一些预期内的业务异常，可以设置为`false`以减少日志量）。
- level: 日志等级（设置该异常的日志等级，默认为`Level.ERROR`）。
- status: HTTP响应状态码（指定抛出此异常时返回的HTTP状态码，默认为`HttpStatus.OK`）。

### 异常处理
需要定义异常处理器来确保可以自动的处理抛出的Http异常。

```java
@RestControllerAdvice
public class GlobalDataExceptionAdvice {
    @ExceptionHandler(value = BaseHttpException.class)
	public void handleBaseHttpException(BaseHttpException e, HttpServletResponse response) {
		HttpServletResponseUtils.writeHttpExceptionToResponse(e, response);
	}
}
```

## 内置异常

| 异常类                               |      概述      | code码 | 响应状态码 |   类型    | 打印日志 |
|-----------------------------------|:------------:|:-----:|:-----:|:-------:|:----:| 
| ServerException                   |   服务器内部错误    | -5000 |  500  | 服务器内部错误 |  是   | 
| ServiceException                  |    业务逻辑错误    | -1000 |  200  | 业务逻辑错误  |  是   |
| HttpRemoteServiceException        |  Http远程服务错误  | -1100 |  200  | 业务逻辑错误  |  是   |
| HttpRemoteServiceTimeoutException | Http远程服务超时错误 | -1110 |  200  | 业务逻辑错误  |  是   |
| AuthenticationException           |    认证授权错误    | -3000 |  401  | 认证授权错误  |  是   |
| AuthenticationExpireException     |    认证过期错误    | -3100 |  401  | 认证授权错误  |  否   |
| NoPermissionException             |    缺少权限错误    | -3300 |  403  | 认证授权错误  |  否   |
| NoRoleException                   |    缺少角色错误    | -3200 |  403  | 认证授权错误  |  否   |
| DataOperationException            |    数据操作错误    | -2000 |  200  | 数据操作错误  |  是   |
| DataCreateException               |    数据创建错误    | -2200 |  200  | 数据操作错误  |  是   |
| DataQueryException                |    数据查询错误    | -2100 |  200  | 数据操作错误  |  是   |
| DataRemoveException               |    数据删除错误    | -2500 |  200  | 数据操作错误  |  是   |
| DataSaveException                 |    数据保存错误    | -2400 |  200  | 数据操作错误  |  是   |
| DataUpdateException               |    数据更新错误    | -2300 |  200  | 数据操作错误  |  是   |
| ValidationException               |    参数校验错误    | -4000 |  400  | 参数校验错误  |  否   |
| DataExistException                |   数据已存在错误    | -4110 |  400  | 参数校验错误  |  否   |
| DataNotExistException             |   数据不存在错误    | -4120 |  400  | 参数校验错误  |  否   |
| IdExistException                  |   id已存在错误    | -4210 |  400  | 参数校验错误  |  否   |
| IdNotExistException               |   id不存在错误    | -4220 |  400  | 参数校验错误  |  否   |
| InvalidIdException                |  id格式不正确错误   | -4230 |  400  | 参数校验错误  |  否   |
| IdentifierExistException          |   标识符已存在错误   | -4310 |  400  | 参数校验错误  |  否   |
| IdentifierNotExistException       |   标识符不存在错误   | -4320 |  400  | 参数校验错误  |  否   |
| InvalidIdentifierException        |  标识符格式不正确错误  | -4330 |  400  | 参数校验错误  |  否   |

### 基础异常
基础异常是通用性没有具体错误场景的异常，可以通过继承它们来实现自己的业务异常，也可以直接使用这些基础异常。

> [!TIP]
> 基础异常的错误码是固定的，如果需要自定义错误码，请继承它们定义自己的异常。

#### 服务器内部异常
`io.github.pangju666.framework.web.exception.base.ServerException`

所有服务端内部引起的错误。

特点：
- 构建时只需要传入错误原因。
- 错误消息固定为：服务器内部错误。

```java
try {
    // 业务逻辑
} catch (IOException e) {
    // 定义错误原因和原始异常
    throw new ServerException("文件读取失败", e);
    // 接口响应：{"code": -5000, "message": "服务器内部错误", "data": null}
    // 日志打印：原因：文件读取失败
}
```

#### 业务逻辑异常
`io.github.pangju666.framework.web.exception.base.ServiceException`

业务逻辑产生的错误，比如：短信发送失败、订单提交失败、余额不足、支付失败等业务性错误。

```java
// 定义错误消息和错误原因
throw new ServiceException("余额不足", "用户xxxxx的账户余额为：0");

// 接口响应：{"code": -1000, "message": "余额不足", "data": null}
// 日志打印：原因：用户xxxxx的账户余额为：0
```

#### 认证授权异常
`io.github.pangju666.framework.web.exception.base.AuthenticationException`

认证授权产生的错误，比如：用户未登录，登录失败，密码错误等鉴权相关的错误。

特点：
- 存在属性`userIdentifier`用于表示用户标识符。
- 构建时需要传入用户标识符，比如：用户名、用户id之类的。
- 日志打印格式：认证授权错误，用户标识：{userIdentifier}，原因：{reason}。
- 接口HTTP响应状态码为：401。

```java
throw new AuthenticationException(
        "登录已过期",         // 错误消息
        "pangju666",            // 用户标识（支持各种类型）
        "Token：xxxxxxxxxxxx 已过期",      // 错误原因
);
// 接口响应：{"code": -3000, "message": "登录已过期", "data": null}
// 日志打印：认证授权错误，用户标识：pangju666，原因：Token：xxxxxxxxxxxx 已过期
```

#### 校验异常
`io.github.pangju666.framework.web.exception.base.ValidationException`

参数校验产生的错误，比如：用户id不存在，用户名不存在、Token格式不正确等校验性错误。

特点：
- 构建时只需要传入错误消息。
- 不打印日志。
- 接口HTTP响应状态码为：400。

```java
// 定义错误消息
throw new ValidationException("用户名不能为空");
// 接口响应：{"code": -4000, "message": "用户名不能为空", "data": null}
```

#### 数据操作异常
`io.github.pangju666.framework.web.exception.base.DataOperationException`

`io.github.pangju666.framework.web.model.error.DataOperationError`

操作数据产生的错误，比如：数据查询失败、删除失败、添加失败等数据操作错误。

特点：
- 存在属性`operation`表示操作类型。
- 存在属性`error`表示操作错误的详细信息。
- 日志打印格式：数据操作错误，来源：{error.source}，操作：{operation}，数据描述：{error.description}，数据值：{error.data}，原因：{reason}。

```java
// 无操作错误信息
throw new DataOperationException(
    "删除",          // 操作类型
    "删除用户失败",   // 错误消息
    "记录不存在"      // 错误原因
);
// 接口响应：{"code": -2000, "message": "删除用户失败", "data": null}
// 日志打印：数据操作错误，来源：未知，操作：删除，数据描述：未知，数据值：未知，原因：记录不存在。

// 定义操作错误信息
DataOperationError error = new DataOperationError(
    "数据库表 user",       // 数据来源
    "用户名",      // 数据描述
    "pangju666",       // 数据值
    "记录不存在"    // 错误原因
);
throw new DataOperationException(
    "删除",        // 操作类型
    "删除用户失败", // 展示消息
    error         // 错误信息
);
// 接口响应：{"code": -2000, "message": "删除用户失败", "data": null}
// 日志打印：数据操作错误，来源：数据库表 user，操作：删除，数据描述：用户名，数据值：pangju666，原因：记录不存在。
```

### 远程服务异常

> [!TIP]
> 建议配合`HttpRemoteServiceErrorBuilder`和[`RestClientHelper`](/framework/web/client)使用。

#### Http远程服务异常
`io.github.pangju666.framework.web.exception.remote.HttpRemoteServiceException`

`io.github.pangju666.framework.web.model.error.HttpRemoteServiceError`

`io.github.pangju666.framework.web.model.error.HttpRemoteServiceErrorBuilder`

请求第三方接口时产生的错误。

特点：
- 存在属性`error`用于表示远程服务错误信息。
- 构建时需要传入远程服务错误信息。
- 日志打印格式：http远程服务请求失败，服务：{error.service}，功能：{error.api}，链接：{error.uri}，http状态码：{error.httpStatus} 错误码：{error.code} 错误信息：{error.message}

```java
// 直接构建错误信息
HttpRemoteServiceError error = new HttpRemoteServiceError("测试服务", "测试接口", "http://xxxxx/api/v1/test");
throw new HttpRemoteServiceException("调用用户服务失败", error);
// 接口响应：{"code": -1100, "message": "调用用户服务失败", "data": null}
// 日志打印：http远程服务请求失败，服务：测试服务，功能：测试接口，链接：http://xxxxx/api/v1/test，http状态码：404 错误码：无 错误信息：无

// 使用构建器
HttpRemoteServiceError error = new HttpRemoteServiceErrorBuilder("测试服务", "测试接口")
    .uri("http://xxxxx/api/v1/test")
    .message("接口暂时不可用")
    .code("API_CAN_NOT_USE")
    .build();
throw new HttpRemoteServiceException(error);
// 接口响应：{"code": -1100, "message": "远程服务请求失败", "data": null}
// 日志打印：http远程服务请求失败，服务：测试服务，功能：测试接口，链接：http://xxxxx/api/v1/test，http状态码：404 错误码：API_CAN_NOT_USE 错误信息：接口暂时不可用

// 处理RestClientResponseException
try {
    // 接口请求逻辑
} catch (RestClientException e) {
    HttpRemoteServiceError error = new HttpRemoteServiceErrorBuilder("测试服务", "测试接口")
        .uri("http://xxxxx/api/v1/test")
        .toException(e, "code", "message");
    throw new HttpRemoteServiceException(error);
    // 接口响应：{"code": -1100, "message": "远程服务请求失败", "data": null}
    // 日志打印：http远程服务请求失败，服务：测试服务，功能：测试接口，链接：http://xxxxx/api/v1/test，http状态码：404 错误码：API_CAN_NOT_USE 错误信息：接口暂时不可用
}
```

#### Http远程服务超时异常
`io.github.pangju666.framework.web.exception.remote.HttpRemoteServiceTimeoutException`

`io.github.pangju666.framework.web.model.error.HttpRemoteServiceError`

`io.github.pangju666.framework.web.model.error.HttpRemoteServiceErrorBuilder`

请求第三方接口超时产生的错误。

特点：
- 存在属性`error`用于表示远程服务错误信息。
- 构建时需要传入远程服务错误信息。
- 日志打印格式：http远程服务请求超时，服务：{error.service}，功能：{error.api}，链接：{error.uri}

```java
// 直接构建错误信息
HttpRemoteServiceError error = new HttpRemoteServiceError("测试服务", "测试接口", "http://xxxxx/api/v1/test");
throw new HttpRemoteServiceException("调用用户服务超时", error);
// 接口响应：{"code": -1110, "message": "调用用户服务超时", "data": null}
// 日志打印：http远程服务请求超时，服务：测试服务，功能：测试接口，链接：http://xxxxx/api/v1/test

// 使用构建器
HttpRemoteServiceError error = new HttpRemoteServiceErrorBuilder("测试服务", "测试接口")
    .uri("http://xxxxx/api/v1/test")
    .build();
throw new HttpRemoteServiceException(error);
// 接口响应：{"code": -1110, "message": "远程服务请求超时", "data": null}
// 日志打印：http远程服务请求超时，服务：测试服务，功能：测试接口，链接：http://xxxxx/api/v1/test

// 处理HttpServerErrorException.GatewayTimeout
try {
    // 接口请求逻辑
} catch (HttpServerErrorException.GatewayTimeout e) {
    HttpRemoteServiceError error = new HttpRemoteServiceErrorBuilder("测试服务", "测试接口")
        .uri("http://xxxxx/api/v1/test")
        .toTimeoutException(e);
    throw new HttpRemoteServiceException(error);
    // 接口响应：{"code": -1110, "message": "远程服务请求超时", "data": null}
    // 日志打印：http远程服务请求超时，服务：测试服务，功能：测试接口，链接：http://xxxxx/api/v1/test
}
```

### 认证授权异常
> [!TIP]
> 如果需要账户已锁定、密码错误之类的特定异常，需要自己定义。

#### 认证过期异常
`io.github.pangju666.framework.web.exception.authentication.AuthenticationExpireException`

认证过期时产生的错误，比如：Token过期、Session会话过期之类的。

特点：
- 构建时只需要传入错误消息。
- 不打印日志。
- 接口HTTP响应状态码为：401。

```java
throw new AuthenticationExpireException("登录已过期，请重新登录");
// 接口响应：{"code": -3100, "message": "登录已过期，请重新登录", "data": null}
```

#### 角色缺失异常
`io.github.pangju666.framework.web.exception.authentication.NoRoleException`

用户缺失指定角色时产生的错误。

特点：
- 构建时只需要传入错误消息。
- 不打印日志。
- 接口HTTP响应状态码为：403。

```java
throw new NoRoleException("需要管理员角色");
// 接口响应：{"code": -3200, "message": "登录已过期，请重新登录", "data": null}

throw new NoRoleException();
// 接口响应：{"code": -3200, "message": "缺少相应角色", "data": null}

throw new NoRoleException("admin");
// 接口响应：{"code": -3200, "message": "缺少 admin 角色", "data": null}

throw new NoRoleException("admin", "clerk");
// 接口响应：{"code": -3200, "message": "至少需要 admin、clerk 中任一角色", "data": null}
```

#### 权限缺失异常
`io.github.pangju666.framework.web.exception.authentication.NoPermissionException`

用户缺失指定权限时产生的错误。

特点：
- 构建时只需要传入错误消息。
- 不打印日志。
- 接口HTTP响应状态码为：403。

```java
throw new NoPermissionException("没有查看用户的权限");
// 接口响应：{"code": -3300, "message": "没有查看用户的权限", "data": null}

throw new NoPermissionException();
// 接口响应：{"code": -3300, "message": "缺少相应权限", "data": null}

throw new NoPermissionException("查看所有用户信息");
// 接口响应：{"code": -3300, "message": "缺少 查看所有用户信息 权限", "data": null}

throw new NoPermissionException("查看所有用户信息", "删除用户信息");
// 接口响应：{"code": -3300, "message": "至少需要 查看所有用户信息、删除用户信息 中任一权限", "data": null}
```

### 数据操作异常

> [!TIP]
> 建议搭配[数据操作断言](/framework/web/utils#数据操作断言)使用。

#### 数据创建异常
`io.github.pangju666.framework.web.exception.data.DataCreateException`

数据创建失败时的错误。

特点：
- 日志打印格式：数据操作错误，来源：{error.source}，操作：创建，数据描述：{error.description}，数据值：{error.data}，原因：{reason}。

```java
// 定义错误原因
throw new DataCreateException(
    "记录不存在"      // 错误原因
);
// 接口响应：{"code": -2200, "message": "数据创建错误", "data": null}
// 日志打印：数据操作错误，来源：未知，操作：创建，数据描述：未知，数据值：未知，原因：记录不存在。

// 定义错误信息和错误原因
throw new DataCreateException(
    "数据创建错误",   // 错误消息
    "记录不存在"      // 错误原因
);
// 接口响应：{"code": -2200, "message": "数据创建错误", "data": null}
// 日志打印：数据操作错误，来源：未知，操作：创建，数据描述：未知，数据值：未知，原因：记录不存在。

// 定义操作错误信息
DataOperationError error = new DataOperationError(
    "数据库表 user",       // 数据来源
    "用户名",      // 数据描述
    "pangju666",       // 数据值
    "记录不存在"    // 错误原因
);
throw new DataCreateException(
    "数据创建错误", // 展示消息
    error         // 错误信息
);
// 接口响应：{"code": -2200, "message": "数据创建错误", "data": null}
// 日志打印：数据操作错误，来源：数据库表 user，操作：创建，数据描述：用户名，数据值：pangju666，原因：记录不存在。
```

#### 数据更新异常
`io.github.pangju666.framework.web.exception.data.DataUpdateException`

数据更新失败时的错误。

特点：
- 日志打印格式：数据操作错误，来源：{error.source}，操作：更新，数据描述：{error.description}，数据值：{error.data}，原因：{reason}。

```java
// 定义错误原因
throw new DataUpdateException(
    "记录不存在"      // 错误原因
);
// 接口响应：{"code": -2300, "message": "数据更新错误", "data": null}
// 日志打印：数据操作错误，来源：未知，操作：更新，数据描述：未知，数据值：未知，原因：记录不存在。

// 定义错误信息和错误原因
throw new DataUpdateException(
    "数据更新错误",   // 错误消息
    "记录不存在"      // 错误原因
);
// 接口响应：{"code": -2300, "message": "数据更新错误", "data": null}
// 日志打印：数据操作错误，来源：未知，操作：更新，数据描述：未知，数据值：未知，原因：记录不存在。

// 定义操作错误信息
DataOperationError error = new DataOperationError(
    "数据库表 user",       // 数据来源
    "用户名",      // 数据描述
    "pangju666",       // 数据值
    "记录不存在"    // 错误原因
);
throw new DataUpdateException(
    "数据更新错误", // 展示消息
    error         // 错误信息
);
// 接口响应：{"code": -2300, "message": "数据更新错误", "data": null}
// 日志打印：数据操作错误，来源：数据库表 user，操作：更新，数据描述：用户名，数据值：pangju666，原因：记录不存在。
```

#### 数据保存异常
`io.github.pangju666.framework.web.exception.data.DataSaveException`

数据保存失败时的错误。。

特点：
- 日志打印格式：数据操作错误，来源：{error.source}，操作：保存，数据描述：{error.description}，数据值：{error.data}，原因：{reason}。

```java
// 定义错误原因
throw new DataSaveException(
    "记录不存在"      // 错误原因
);
// 接口响应：{"code": -2400, "message": "数据保存错误", "data": null}
// 日志打印：数据操作错误，来源：未知，操作：保存，数据描述：未知，数据值：未知，原因：记录不存在。

// 定义错误信息和错误原因
throw new DataSaveException(
    "数据保存错误",   // 错误消息
    "记录不存在"      // 错误原因
);
// 接口响应：{"code": -2400, "message": "数据保存错误", "data": null}
// 日志打印：数据操作错误，来源：未知，操作：保存，数据描述：未知，数据值：未知，原因：记录不存在。

// 定义操作错误信息
DataOperationError error = new DataOperationError(
    "数据库表 user",       // 数据来源
    "用户名",      // 数据描述
    "pangju666",       // 数据值
    "记录不存在"    // 错误原因
);
throw new DataSaveException(
    "数据保存错误", // 展示消息
    error         // 错误信息
);
// 接口响应：{"code": -2400, "message": "数据保存错误", "data": null}
// 日志打印：数据操作错误，来源：数据库表 user，操作：保存，数据描述：用户名，数据值：pangju666，原因：记录不存在。
```

#### 数据删除异常
`io.github.pangju666.framework.web.exception.data.DataRemoveException`

数据删除失败时的错误。。

特点：
- 日志打印格式：数据操作错误，来源：{error.source}，操作：删除，数据描述：{error.description}，数据值：{error.data}，原因：{reason}。

```java
// 定义错误原因
throw new DataRemoveException(
    "记录不存在"      // 错误原因
);
// 接口响应：{"code": -2500, "message": "数据删除错误", "data": null}
// 日志打印：数据操作错误，来源：未知，操作：删除，数据描述：未知，数据值：未知，原因：记录不存在。

// 定义错误信息和错误原因
throw new DataRemoveException(
    "数据删除错误",   // 错误消息
    "记录不存在"      // 错误原因
);
// 接口响应：{"code": -2500, "message": "数据删除错误", "data": null}
// 日志打印：数据操作错误，来源：未知，操作：删除，数据描述：未知，数据值：未知，原因：记录不存在。

// 定义操作错误信息
DataOperationError error = new DataOperationError(
    "数据库表 user",       // 数据来源
    "用户名",      // 数据描述
    "pangju666",       // 数据值
    "记录不存在"    // 错误原因
);
throw new DataRemoveException(
    "数据删除错误", // 展示消息
    error         // 错误信息
);
// 接口响应：{"code": -2500, "message": "数据删除错误", "data": null}
// 日志打印：数据操作错误，来源：数据库表 user，操作：查询，数据描述：用户名，数据值：pangju666，原因：记录不存在。
```

#### 数据查询异常
`io.github.pangju666.framework.web.exception.data.DataQueryException`

数据查询失败时的错误。

特点：
- 日志打印格式：数据操作错误，来源：{error.source}，操作：查询，数据描述：{error.description}，数据值：{error.data}，原因：{reason}。

```java
// 定义错误原因
throw new DataQueryException(
    "记录不存在"      // 错误原因
);
// 接口响应：{"code": -2100, "message": "数据查询错误", "data": null}
// 日志打印：数据操作错误，来源：未知，操作：查询，数据描述：未知，数据值：未知，原因：记录不存在。

// 定义错误信息和错误原因
throw new DataQueryException(
    "数据查询错误",   // 错误消息
    "记录不存在"      // 错误原因
);
// 接口响应：{"code": -2100, "message": "数据查询错误", "data": null}
// 日志打印：数据操作错误，来源：未知，操作：查询，数据描述：未知，数据值：未知，原因：记录不存在。

// 定义操作错误信息
DataOperationError error = new DataOperationError(
    "数据库表 user",       // 数据来源
    "用户名",      // 数据描述
    "pangju666",       // 数据值
    "记录不存在"    // 错误原因
);
throw new DataQueryException(
    "数据查询错误", // 展示消息
    error         // 错误信息
);
// 接口响应：{"code": -2100, "message": "数据查询错误", "data": null}
// 日志打印：数据操作错误，来源：数据库表 user，操作：查询，数据描述：用户名，数据值：pangju666，原因：记录不存在。
```

### 参数校验异常

特点：
- 构建时只需要传入错误消息。
- 不打印日志。
- 接口HTTP响应状态码为：400。

#### 数据存在异常
`io.github.pangju666.framework.web.exception.validation.data.DataExistException`

#### 数据不存在异常
`io.github.pangju666.framework.web.exception.validation.data.DataNotExistException`

#### Id存在异常
`io.github.pangju666.framework.web.exception.validation.id.IdExistException`

#### Id不存在异常
`io.github.pangju666.framework.web.exception.validation.id.IdNotExistException`

#### 非法Id异常
`io.github.pangju666.framework.web.exception.validation.id.InvalidIdException`

#### 标识符存在异常
`io.github.pangju666.framework.web.exception.validation.identifier.IdentifierExistException`

#### 标识符不存在异常
`io.github.pangju666.framework.web.exception.validation.identifier.IdentifierNotExistException`

#### 非法标识符异常
`io.github.pangju666.framework.web.exception.validation.identifier.InvalidIdentifierException`


### 自定义异常
如果框架内置的异常无法满足你的需求，那么可以通过继承`BaseHttpException`类或者基础异常类来定义自己的异常类。

假设我要定义一个业务逻辑类型的异常，异常错误码设置为200，Http响应状态码设置为400

```java
@HttpException(code = 200, type = HttpExceptionType.SERVICE, description = "测试异常", status = HttpStatus.HttpStatus.BAD_REQUEST)
public class TestException extends ServiceException {
	public TestException(String message) {
		super(message, message);
	}
	
	public TestException(String message, String reason) {
		super(message, reason);
	}
	
	public TestException(String message, Throwable cause) {
		super(message, message, cause);
	}

	public TestException(String message, String reason, Throwable cause) {
		super(message, reason, cause);
	}
	
	// 自定义日志打印逻辑，也可以选择不重写这个方法，直接使用父类的日志打印逻辑
	@Override
	public void log(Logger logger, Level level) {
		logger.atLevel(level)
			.setCause(this)
			.log("自定义异常，原因：" + this.reason);
	}
}

throw new TestException("测试错误");
// 接口响应：{"code": -1200, "message": "测试错误", "data": null}
// 日志打印：自定义异常，原因：测试错误
```
