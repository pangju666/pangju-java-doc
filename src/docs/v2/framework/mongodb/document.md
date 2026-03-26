---
layout: doc
---

# 实体类
`io.github.pangju666.framework.data.mongodb.model.document.BaseDocument`

就是一个普通的抽象类，我定义了`id`这个字段，加上了`@MongoId(value = FieldType.STRING)`注解和`@Field(name = "_id")`，并实现了序列化接口。

还写了几个简单实用的实体类方法，减少样板式的代码。

| 方法名         | 静态 | 返回值                                  |          用途           |
|-------------|:--:|:-------------------------------------|:---------------------:|
| getObjectId | 否  | ObjectId                             | 将字符串 ID 转换为`ObjectId` |
| getIdList   | 是  | Set\<String>                         |     获取文档集合中的ID列表      |
| getIdSet    | 是  | Set\<String>                         |     获取文档集合中的ID集合      |
| mapById     | 是  | Map\<String, ? extends BaseDocument> |    以文档 ID 为键构建映射。     |

## 使用
```java
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "test")
public class TestDocument extends BaseDocument {
	private String name;
	private String value;
}
```
