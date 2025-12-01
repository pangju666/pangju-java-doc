---
layout: doc
---

# 响应体

## 响应体包装

### 概述
我对`JSON`和字符串类型的响应体做了[`Result`](/framework/web/data)包装处理。

### 配置
```yaml
pangju:
  web:
    advice:
      enable-wrapper: true # 启用响应体包装，默认启用
```

### 使用示例
```java
public class UserVO {
	private String username;

	public UserVO(String username) {
		this.username = username;
	}
}

@RequestMapping("/api")
@RestController
public class TestController {
	@GetMapping("/test")
	public void test() {
		return;
	}
	// 响应：{"code": 0, "message": "请求成功", "data": null}

	@GetMapping("/test")
	public String test2() {
		return "Hello World!";
	}
	// 响应：{"code": 0, "message": "请求成功", "data": "Hello World!"}

	@GetMapping("/test")
	public UserVO test3() {
		return new UserVO("test_user");
	}
	// 响应：{"code": 0, "message": "请求成功", "data": {"username": "test_user"}}

	@GetMapping("/test")
	public List<String> test4() {
		return List.of("Hello World!");
	}
	// 响应：{"code": 0, "message": "请求成功", "data": ["Hello World!"]}
	
	// Result 类型不会包装
	@GetMapping("/test")
	public Result test5() {
		return Result.ok("Hello World!");
	}
	// 响应：{"code": 0, "message": "请求成功", "data": ["Hello World!"]}
	
	// Result 类型不会包装
	@GetMapping("/test")
	public Result test5() {
		return Result.ok("Hello World!");
	}
	// 响应：{"code": 0, "message": "请求成功", "data": ["Hello World!"]}
	
	// ResponseEntity 类型不会包装
	@GetMapping("/test")
	public ResponseEntity<?> test6() {
		return ResponseEntity.ok(new UserVO("test_user")).build();
	}
	// 响应：{"username": "test_user"}
	
	// byte[] 类型不会包装
	@GetMapping("/test")
	public byte[] test7() {
		return ResponseEntity.ok(new UserVO("test_user")).build();
	}
	
	// 标注了 UnwrappedResponse 注解的方法不会包装
	@UnwrappedResponse
	@GetMapping("/test")
	public UserVO test8() {
		return new UserVO("test_user");
	}
	// 响应：{"username": "test_user"}
}
```
