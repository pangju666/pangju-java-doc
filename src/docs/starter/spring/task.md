---
layout: doc
---

# 任务执行

## 一次性任务执行器
接口：io.github.pangju666.framework.boot.task.OnceTaskExecutor

默认实现：io.github.pangju666.framework.boot.task.FutureOnceTaskExecutor

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

### 接口定义
```java
/**
 * 一次性任务执行器。
 * <p>
 * 提供按 {@code key} 维度的去重执行能力：在并发或重复请求场景下，确保同一 {@code key} 的任务仅执行一次，
 * 调用方均获得该次执行的结果。支持同步执行与异步提交，并可配置超时控制。
 * </p>
 *
 * <p>线程安全与去重策略由具体实现保证。</p>
 *
 * @author pangju666
 * @see AsyncTaskExecutor
 * @see CompletableFuture
 * @since 1.0.0
 */
public interface OnceTaskExecutor {
    /**
     * 同步执行一次性任务（按 {@code key} 去重）。
     * <p>
     * 当已存在相同 {@code key} 的任务正在或已执行完成时，复用其执行结果；否则触发新的执行。
     * </p>
     *
     * @param key  任务唯一标识
     * @param task 待执行的任务
     * @return 任务执行结果
     * @throws Exception 任务执行失败或被中断时抛出；具体异常由实现决定
     * @since 1.0.0
     */
    Object execute(String key, Callable<Object> task) throws Exception;

    /**
     * 同步执行一次性任务并设置超时（按 {@code key} 去重）。
     * <p>
     * 在超时未完成时抛出异常（例如 {@link java.util.concurrent.TimeoutException}），具体异常类型与处理由实现决定；
     * 已存在相同 {@code key} 的任务时复用其结果。
     * </p>
     *
     * @param key     任务唯一标识
     * @param task    待执行的任务
     * @param timeout 超时时长
     * @param unit    超时单位
     * @return 任务执行结果
     * @throws Exception 执行失败或超时抛出；具体异常由实现决定
     * @since 1.0.0
     */
    Object execute(String key, Callable<Object> task, long timeout, TimeUnit unit) throws Exception;

    /**
     * 异步提交一次性任务（按 {@code key} 去重）。
     * <p>
     * 使用提供的 {@link AsyncTaskExecutor} 调度任务；若相同 {@code key} 的任务已在执行或已完成，
     * 返回复用的 {@link CompletableFuture}，其完成状态与结果与该次执行保持一致。
     * </p>
     *
     * @param executor 异步任务执行器
     * @param key      任务唯一标识
     * @param task     待提交的任务
     * @return 可观察任务结果的 {@link CompletableFuture}
     * @since 1.0.0
     */
    CompletableFuture<Object> submitToAsyncExecutor(AsyncTaskExecutor executor, String key, Callable<Object> task);
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
			File result = (File) onceTaskExecutor.execute("test-task", () -> {
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
			File result = (File) onceTaskExecutor.execute("test-task", () -> {
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
		CompletableFuture<Object> completableFuture = onceTaskExecutor.submitToAsyncExecutor(asyncTaskExecutor, "test-async-task", () -> {
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

### 自定义实现
我本来是想再实现一个分布式版本，但是怎么写都感觉不太好用，就暂时放弃了。

当然，你也可以自定义实现一个分布式版本。

#### 实现参考
```java
public class CustomOnceTaskExecutor implements OnceTaskExecutor {
	@Override
	public Object execute(String key, Callable<Object> task) throws Exception {
		//... 自定义实现
	}
	
	@Override
	 public Object execute(String key, Callable<Object> task, long timeout, TimeUnit unit) throws Exception {
		//... 自定义实现
	}
	
	@Override
	public CompletableFuture<Object> submitToAsyncExecutor(AsyncTaskExecutor executor, String key, Callable<Object> task) {
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

