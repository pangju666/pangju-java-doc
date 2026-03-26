---
layout: doc
---

# CRUD
`io.github.pangju666.framework.data.mongodb.repository.BaseMongoRepository<T, ID>`

基础实现：

`io.github.pangju666.framework.data.mongodb.repository.SimpleBaseMongoRepository<T, ID>`

我在[`spring-data-mongodb`](https://docs.spring.io/spring-data/mongodb/reference/)自带的`MongoRepository`的基础上做了一些常用方法的补充。

>[!NOTE]
> 我没写的方法，可能是`Spring`已经实现过了或着不太常用。

使用示例：
```java
@Configuration
@EnableMongoRepositories(repositoryBaseClass = SimpleBaseMongoRepository.class)
public class MongoConfig {
}

@Document(collection = "user")
public class UserDocument extends BaseDocument {
	private String username;
	private String password;
}

public interface UserRepository extends BaseMongoRepository<UserDocument, String> {
}
```

| 方法名                   | 返回值               |             用途              |
|-----------------------|:------------------|:---------------------------:|
| existsByKeyValue      | boolean           | 判断是否存在满足“key 等于 value”条件的文档 |
| exists                | boolean           |       判断是否存在满足给定条件的文档       |
| findOneByKeyValue     | Optional\<T>      | 查找并返回一个满足“key 等于 value”的文档  |
| findOne               | Optional\<T>      |      查找并返回一个满足给定条件的文档       |
| count                 | long              |        统计满足给定条件的文档数量        |
| findDistinctKeyValues | List\<V>          |        提取指定字段的去重值列表         |
| findAll               | List\<T>/Page\<T> |    列表/分页查询所有满足给定条件的文档列表     |
| findAllByKeyValue     | List\<T>          |  查询所有满足“key 等于 value”的文档列表  |
| findAllByKeyNotValue  | List\<T>          | 查询所有满足“key 不等于 value”的文档列表  |
| findAllByKeyValues    | List\<T>          |   查询所有满足“key 在给定集合中”的文档列表   |
| findAllByKeyNotValues | List\<T>          |  查询所有满足“key 不在给定集合中”的文档列表   |
| findAllByKeyNull      | List\<T>          |     查询所有满足“key 为空”的文档列表     |
| findAllByKeyNotNull   | List\<T>          |     查询所有满足“key 非空”的文档列表     |
| findAllByKeyNotRegex  | List\<T>          | 查询所有满足“key 不匹配指定正则表达式”的文档列表 |
| findAllByKeyRegex     | List\<T>          | 查询所有满足“key 匹配指定正则表达式”的文档列表  |
| updateById            | void              |        对指定ID的文档执行更新         |
| updateAllById         | void              |      对给定ID集合中的文档批量执行更新      |
| updateAllByKeyValue   | void              | 将满足“key 等于 value”的文档批量执行更新  |
| updateAll             | void              |      对满足给定条件的文档批量执行更新       |
| replaceKeyValue       | void              |   删除所有满足“key 等于 value”的文档   |
| deleteAllByKeyValue   | void              |        删除所有满足给定条件的文档        |
| deleteAll             | void              |        删除所有满足给定条件的文档        |

## 是否存在
这里我只做了一个常用的和一个通用的，根据id判断的`Spring`已经实现过了（existsById）。

### 根据键值对判断
```java
UserRepository repository;

boolean result = repository.existsByKeyValue("username", "test_user"); // 判断username为test_user的文档是否存在

boolean result = repository.existsByKeyValue("username", null); // 判断username为null的文档是否存在
```

### 自定义条件
```java
UserRepository repository;

boolean result = repository.exists(QueryUtils.queryByKeyValue("username", "test_user")); // 判断username为test_user的文档是否存在
```

## 统计

### 自定义条件
```java
UserRepository repository;

long count = repository.count(QueryUtils.queryByKeyValue("username", "test_user")); // 统计username为test_user的文档数量
```

## 查询

### 单个字段
```java
UserRepository repository;

List<String> usernames = repository.findDistinctKeyValues("username", String.class); // 查询集合中所有不为null的username字段值

List<String> usernames = repository.findDistinctKeyValues(QueryUtils.queryByKeyNotNull("username"), "username", String.class); // 查询集合中所有不为null的username字段值
```

### 单文档查询

#### 根据键值对查询
> [!IMPORTANT]
> 字段值必须是唯一的，不然会报错。
>
> 如果这个字段值在集合中多个文档都存在，请使用`findAllByKeyValue`。

```java
UserRepository repository;

Optional<UserDocument> user = repository.findOneByKeyValue("username", "test_user"); // 查询username为test_user的文档

Optional<UserDocument> user = repository.findOneByKeyValue("username", null); // 查询username为null的文档
```

#### 自定义条件
```java
UserRepository repository;

UserDocument user = repository.findOne(QueryUtils.queryByKeyValue("username", "test_user")); // 查询username为test_user的文档
```

### 多文档查询

#### 字段
```java
UserRepository repository;

List<UserDocument> users = repository.findAllByKeyNull("username"); // 查询所有username为null的文档

List<UserDocument> users = repository.findAllByKeyNotNull("username"); // 查询所有username不为null的文档
```

#### 字段值
```java
UserRepository repository;

List<UserDocument> users = repository.findAllByKeyValue("username", "test_user"); // 查询所有username为test_user的文档

List<UserDocument> users = repository.findAllByKeyNotValue("username", "test_user"); // 查询所有username不为test_user的文档
```

#### 字段值集合
```java
UserRepository repository;

List<String> usernames = Arrays.asList("test_user", "test_user2");

List<UserDocument> users = repository.findAllByKeyValues("username", usernames); // 查询username包含usernames中的值的文档

List<UserDocument> users = repository.findAllByKeyNotValues("username", usernames); // 查询所有username不包含usernames中的值的文档
```

#### 正则
```java
UserRepository repository;

List<UserDocument> users = repository.findAllByKeyRegex("username", "^[a-zA-Z_][a-zA-Z0-9_]*$$"); // 查询username符合正则表达式的文档

List<UserDocument> users = repository.findAllByKeyNotRegex("username", "^[a-zA-Z_][a-zA-Z0-9_]*$$"); // 查询所有username不符合正则表达式的文档
```

#### 自定义条件
```java
UserRepository repository;

List<UserDocument> users = repository.findAll(QueryUtils.queryByKeyValue("username", "test_user")); // 查询所有username为test_user的文档
```

#### 自定义条件分页
```java
UserRepository repository;

Pageable pageable = PageRequest.of(0, 10);
Page<UserDocument> page = repository.findAll(pageable, QueryUtils.queryByKeyValue("username", "test_user"));
```

## 更新

### 根据ID

```java
UserRepository repository;

Update update = Update.update("username", "test_user")
		.set("password", "123456");
		
repository.updateById(update, "690f1ebbe2035cd08e0c4231"); // 更新id为690f1ebbe2035cd08e0c4231的文档

List<String> ids = List.of("690f1ebbe2035cd08e0c4231", "690f212552f2531d6901015d");
repository.updateAllById(update, ids); // 更新id为690f1ebbe2035cd08e0c4231和690f212552f2531d6901015d的文档
```

### 根据键值对

```java
UserRepository repository;

UserRepository repository;

Update update = Update.update("password", "123456");

// 将username为test_user的文档中的password更新为123456
repository.updateAllByKeyValue(update, "username", "test_user");
```

### 自定义条件
```java
UserRepository repository;

Update update = Update.update("password", "123456");

// 将username为test_user的文档中的password更新为123456
repository.updateAll(update, QueryUtils.queryByKeyValue("username", "test_user"));
```

### 替换旧值
```java
UserRepository repository;

repository.replaceKeyValue("password", "123456", "789687"); // 将所有密码123456更新为789687
```

## 删除

### 根据键值对
```java
UserRepository repository;

repository.deleteAllByKeyValue("username", "test_user"); // 删除所有username为test_user的文档
```

### 自定义条件
```java
UserRepository repository;

repository.deleteAll(QueryUtils.queryByKeyValue("username", "test_user")); // 删除所有username为test_user的文档
```
