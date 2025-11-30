---
layout: doc
---

# 异常处理
基于`ExceptionHandler`注解实现，涵盖了所有的常用异常。

所有异常的响应格式都为`Result`结构，响应示例如下：

```json
{"code": 错误码, "message": 错误信息}
```

## 配置
```yaml
pangju:
  web:
    advice:
      enable-exception: true # 启用全局异常处理器
```

## 业务异常

[`BaseHttpException`](/framework/web/exception)
- 异常说明：业务异常/框架内置异常。
- 响应状态码：由`@HttpException`注解决定
- 记录日志：由`@HttpException`注解决定
- 响应信息：由异常的`message`决定

## 参数绑定与校验异常

1. `MissingServletRequestParameterException`
    - 异常说明：缺少请求参数异常。
    - 响应状态码：400
    - 记录日志：否
    - 响应信息示例：缺少请求参数：username
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
2. `MissingRequestHeaderException`
    - 异常说明：缺少请求头异常。
    - 响应状态码：400
    - 记录日志：否
    - 响应信息示例：缺少请求头：Authorization
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
3. `MissingPathVariableException`
    - 异常说明：缺少路径变量异常。
    - 响应状态码：404
    - 记录日志：否
    - 响应信息示例：缺少路径变量：userId
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
4. `MissingRequestValueException`
    - 异常说明：缺少请求值异常。
    - 响应状态码：400
    - 记录日志：是
    - 响应信息：缺少请求值
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
5. `MissingServletRequestPartException`
    - 异常说明：缺少请求文件异常。
    - 响应状态码：400
    - 记录日志：否
    - 响应信息示例：缺少表单参数：username
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
6. `MethodArgumentTypeMismatchException`
    - 异常说明：方法参数类型不匹配异常。
    - 响应状态码：400
    - 记录日志：否
    - 响应信息示例：参数：username类型不正确
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
7. `TypeMismatchException`
    - 异常说明：类型不匹配异常。
    - 响应状态码：400
    - 记录日志：是
    - 响应信息：参数：username类型不正确
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
8. `ServletRequestBindingException`
    - 异常说明：请求参数绑定异常。
    - 响应状态码：400
    - 记录日志：是
    - 响应信息：请求参数绑定错误
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
9. `HttpMessageNotReadableException`
    - 异常说明：请求内容不可读异常。
    - 响应状态码：400
    - 记录日志：是
    - 响应信息：请求内容读取失败
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
10. `MethodArgumentNotValidException`
    - 异常说明：方法参数验证异常。
    - 响应状态码：400
    - 记录日志：否
    - 响应信息示例：请求参数验证不合法/校验注解上的`message`列表，使用；分隔
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
11. `BindException`
    - 异常说明：表单绑定异常。
    - 响应状态码：400
    - 记录日志：否
    - 响应信息示例：请求参数验证不合法/校验注解上的`message`列表，使用；分隔
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
12. `MultipartException`
    - 异常说明：文件上传失败异常。
    - 响应状态码：400
    - 记录日志：是
    - 响应信息：文件上传失败
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
13. `ConstraintViolationException`（如果存在这个类）
    - 异常说明：参数验证异常。
    - 响应状态码：400
    - 记录日志：是
    - 响应信息：请求参数验证不合法/校验注解上的`message`列表，使用；分隔
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 2
14. `MaxUploadSizeExceededException`
    - 异常说明：传文件大小超过限制异常。
    - 响应状态码：400
    - 记录日志：否
    - 响应信息：上传文件大小超过100MB/上传文件大小超过限制
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
15. `SizeLimitExceededException`（如果存在这个类）
    - 异常说明：Tomcat 的大小限制异常。
    - 响应状态码：400
    - 记录日志：否
    - 响应信息：上传文件大小超过100MB
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 2

## 路径与资源

1. `NoHandlerFoundException`
    - 异常说明：请求路径不存在异常。
    - 响应状态码：404
    - 记录日志：否
    - 响应信息示例：请求路径：/api/user 不存在
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
2. `NoResourceFoundException`
    - 异常说明：请求资源不存在异常。
    - 响应状态码：404
    - 记录日志：否
    - 响应信息示例：请求资源：/api/user 不存在
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3

## 请求方法不支持

`HttpRequestMethodNotSupportedException`
- 异常说明：请求方法不支持异常。
- 响应状态码：405
- 记录日志：否
- 响应信息示例：预期的请求方法类型：GET、POST
- 排序号：Ordered.HIGHEST_PRECEDENCE + 3

## 媒体类型不支持

1. `HttpMediaTypeNotSupportedException`
    - 异常说明：请求的`Content-Type`不支持异常。
    - 响应状态码：415
    - 记录日志：否
    - 响应信息示例：预期的请求数据类型：application/json
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
2. `HttpMediaTypeNotAcceptableException`
    - 异常说明：`Accept`响应类型不支持异常。
    - 响应状态码：406
    - 记录日志：否
    - 响应信息示例：预期的响应数据类型：application/json
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3

## 服务器错误

1. `HttpMessageNotWritableException`
    - 异常说明：响应内容不可写异常。
    - 响应状态码：500
    - 记录日志：是
    - 响应信息：响应内容写入失败
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
2. `AsyncRequestTimeoutException`
    - 异常说明：异步请求超时异常。
    - 响应状态码：503
    - 记录日志：是
    - 响应信息：异步请求超时
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 3
3. `DataAccessException`（如果存在这个类）
    - 异常说明：数据访问异常。
    - 响应状态码：500
    - 记录日志：是
    - 响应信息：数据访问错误
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 2
4. `NestedRuntimeException`
    - 异常说明：嵌套运行时异常。
    - 响应状态码：500
    - 记录日志：是
    - 响应信息：服务器内部错误
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 4
5. `Exception`
    - 异常说明：所有未处理的异常（兜底处理）。
    - 响应状态码：500
    - 记录日志：是
    - 响应信息：服务器内部错误
    - 排序号：Ordered.HIGHEST_PRECEDENCE + 4

## 自定义错误处理
如果想覆盖我的错误处理，需要让排序号比我定义的异常处理的排序号要更优先

```java
// 需要排序号比我定义的更优先
@Order(Ordered.HIGHEST_PRECEDENCE + 2)
@Component
@RestControllerAdvice
public class GlobalExceptionAdvice {
	// @ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(value = MissingPathVariableException.class)
	public Result<Void> handleMissingPathVariableException(MissingPathVariableException e) {
		return Result.fail("缺少路径变量：" + e.getVariableName());
	}
}
```
