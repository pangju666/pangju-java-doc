---
layout: doc
---

# 自动装配

## 说明
我将`MongoRepository`的实现类修改为了[`SimpleBaseMongoRepository`](/framework/mongodb/crud)，等价于：

```java
@EnableMongoRepositories(repositoryBaseClass = SimpleBaseMongoRepository.class)
@SpringBootApplication
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
```

> [!IMPORTANT]
> 如果需要自定义其他配置，记得把`repositoryBaseClass = SimpleBaseMongoRepository.class`加上。
