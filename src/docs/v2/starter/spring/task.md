---
layout: doc
---

# 一次性任务执行器

## 接口
`io.github.pangju666.framework.boot.task.OnceTaskExecutor`

### 概述
基于键进行并发任务去重，确保同一键的任务在同一时间仅执行一次；后续并发请求复用首个任务的结果.

### 定义
```java
public interface OnceTaskExecutor {
    <T> T execute(String key, Callable<T> task) throws Exception;

    <T> T execute(String key, Callable<T> task, long timeout, TimeUnit unit) throws Exception;

    <T> CompletableFuture<T> submitToAsyncExecutor(AsyncTaskExecutor executor, String key, Callable<T> task);
}
```

### 使用示例
```java
@Service
public class ConcurrentService {
	private final OnceTaskExecutor onceTaskExecutor;

	public ConcurrentService(OnceTaskExecutor onceTaskExecutor) {
		this.onceTaskExecutor = onceTaskExecutor;
	}

	public void test() {
	    // 会一直等待结果直到任务完成
		try {
			File result = onceTaskExecutor.execute("test-task", () -> {
				File file;
				//...任务执行逻辑
				return file; // 不需要获取执行结果的话，可以随便返回一个值
			});
		} catch (InterruptedException e) {
		    // 恢复中断状态
			Thread.currentThread().interrupt(); 
			//... 处理线程被中断异常
		} catch (Exception e) {
			//... 处理任务执行过程中抛出的异常
		}
		
		// 设置任务超时时间，如果规定时间内未完成则抛出 TimeoutException
		try {
			File result = onceTaskExecutor.execute("test-task", () -> {
				File file;
				//...任务执行逻辑
				return file; // 不需要获取执行结果的话，可以随便返回一个值
			}, 10, TimeUnit.MINUTES);
		} catch (InterruptedException e) {
			// 恢复中断状态
			Thread.currentThread().interrupt(); 
			//... 处理线程被中断异常
		} catch (TimeoutException e) {
			//... 处理任务超时异常，可以选择重试或其他处理
		} catch (Exception e) {
			//... 处理任务执行过程中抛出的异常
		}
		
		// 提交任务到异步线程池
		CompletableFuture<File> completableFuture = onceTaskExecutor.submitToAsyncExecutor(asyncTaskExecutor, "test-async-task", () -> {
			File file;
			//...任务执行逻辑
			return file;
		});
		try {
		    // 等待获取任务执行结果，如果不需要获取结果也可以不加这行
			completableFuture.get();
		} catch (InterruptedException e) {
			// 恢复中断状态
			Thread.currentThread().interrupt(); 
			//... 处理线程被中断异常
		} catch (ExecutionException e) {
			Throwable cause = e.getCause();
			if (cause instanceof Exception ex) {
				//... 处理任务执行过程中抛出的异常
			}
		}
	}
}
```

## 实现
`io.github.pangju666.framework.boot.task.impl.FutureOnceTaskExecutor`

### 概述
基于键进行并发任务去重，确保同一键的任务在同一时间仅执行一次；后续并发请求复用首个任务的结果.

- 同步场景：使用`FutureTask`与`ConcurrentMap`去重
- 异步场景：使用`CompletableFuture`与`ConcurrentMap`去重，并通过`AsyncTaskExecutor`执行任务

### 配置
```yaml
pangju:
    task:
      execution:
        once:
            sync-initial-capacity: 16 #同步任务映射初始容量，默认值：16
            async-initial-capacity: 16 #异步任务映射初始容量，默认值：16
```

## 自定义实现
我本来是想再实现一个分布式版本，但是怎么写都感觉不太好用，就暂时放弃了。

当然，你也可以自定义实现一个分布式版本。

### 实现参考
```java
public class CustomOnceTaskExecutor implements OnceTaskExecutor {
	@Override
	<T> public T execute(String key, Callable<T> task) throws Exception {
		//... 自定义实现
	}
	
	@Override
	<T> public T execute(String key, Callable<T> task, long timeout, TimeUnit unit) throws Exception {
		//... 自定义实现
	}
	
	@Override
	<T> public CompletableFuture<T> submitToAsyncExecutor(AsyncTaskExecutor executor, String key, Callable<T> task) {
		//... 自定义实现
	}
}

@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public OnceTaskExecutor customOnceTaskExecutor() {
		return new CustomOnceTaskExecutor();
	}
}
```

