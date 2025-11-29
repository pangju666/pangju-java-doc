---
layout: doc
---

# 动态数据源

## 说明
我参考`baomidou`的`dynamic-datasource`，实现了`MongoDB`的动态数据源。

动态数据源也将`MongoRepository`的默认实现修改为了[`SimpleBaseMongoRepository`](/framework/mongodb/crud)，等价于：

```java
@EnableMongoRepositories(
repositoryFactoryBeanClass = DynamicMongoRepositoryFactoryBean.class, 
repositoryBaseClass = SimpleBaseMongoRepository.class)
@SpringBootApplication
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
```

`DynamicMongoRepositoryFactoryBean`用于通过`@DynamicMongo`注解给不同数据源的`MongoRepository`接口注入`MongoTemplate`。

如果你不想使用`SimpleBaseMongoRepository`作为`MongoRepository`的实现类，
也需要在`EnableMongoRepositories`注解上配置`DynamicMongoRepositoryFactoryBean`来适配动态数据源。

## 注册的Bean
`name`为数据源名称

> [!NOTE]
> 各个类型的`Bean`注册逻辑与`Spring`一致。

| Bean 类型                |           Bean 名称            |       说明       |
|------------------------|:----------------------------:|:--------------:|
| MongoConnectionDetails | {name}MongoConnectionDetails |  MongoDB 连接详情  |
| MongoClientSettings    |  {name}MongoClientSettings   | MongoDB 客户端设置  |
| MongoMappingContext    |  {name}MongoMappingContext   | MongoDB 映射上下文  |
| MongoClient            |      {name}MongoClient       |  MongoDB 客户端   |
| MongoDatabaseFactory   |  {name}MongoDatabaseFactory  | MongoDB 数据库工厂  |
| MongoConverter         |     {name}MongoConverter     | MongoDB 类型转换器  |
| MongoTemplate          |     {name}MongoTemplate      | MongoTemplate  |
| GridFsTemplate         |     {name}GridFsTemplate     | GridFsTemplate |

## 配置
数据源的配置，我直接使用了`spring`的配置。

```yaml
spring:
  data:
    mongodb:
      dynamic:
        primary: test1
        databases:
          test1:
            host: 192.168.0.100
            port: 27017
            database: test1
          test2:
            host: 192.168.0.100
            port: 27017
            database: test2
          test3:
              host: 192.168.0.100
              port: 27018
              database: test
          test4:
              host: 192.168.0.101
              port: 27017
              database: test
```

## 使用示例
```java
@Service
public class MongoService {
	public MongoService(// 注入主数据源的 MongoClient
						MongoClient mongoClient,
						// 注入主数据源的 MongoDatabaseFactory
						MongoDatabaseFactory mongoDatabaseFactory,
						// 注入主数据源的 MongoTemplate
						MongoTemplate mongoTemplate,
						// 注入主数据源的 GridFsTemplate
						GridFsTemplate gridFsTemplate,
						// 注入 redis2 数据源的 MongoClient
						@Qualifier("test2MongoClient")
						MongoClient mongoClient2,
						// 注入 redis2 数据源的 MongoDatabaseFactory
						@Qualifier("test2MongoDatabaseFactory")
						MongoDatabaseFactory mongoDatabaseFactory2,
						// 注入 redis2 数据源的 MongoTemplate
						@Qualifier("test2MongoTemplate")
						MongoTemplate mongoTemplate2,
						// 注入 redis2 数据源的 GridFsTemplate
						@Qualifier("test2GridFsTemplate")
						GridFsTemplate gridFsTemplate2) {		
	}
	
	// 通过`DynamicMongoUtils`获取
	public void test() {
		MongoClient mongoClient = DynamicMongoUtils.getMongoClient("test2")
		MongoDatabaseFactory mongoDatabaseFactory = DynamicMongoUtils.getMongoDatabaseFactory("test2");
		MongoTemplate mongoTemplate = DynamicMongoUtils.getMongoTemplate("test2");
		GridFsTemplate gridFsTemplate = DynamicMongoUtils.getGridFsTemplate("test2");
	}
}
```

## MongoRepository
```java
// 如果是主数据源，可以省略这个注解
@DynamicMongo("test2")
@Repository
public interface Test2Repository extends BaseMongoRepository<Test2Document, String> {
}
