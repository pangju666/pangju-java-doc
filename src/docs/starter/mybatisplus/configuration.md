---
layout: doc
---

# 自动装配

## 说明
我自动装配了`Mybatis Plus`常用的几个内置插件。

## 插件列表
- [分页插件](https://baomidou.com/plugins/pagination/)：`MyBatis-Plus`的分页插件`PaginationInnerInterceptor`提供了强大的分页功能，
支持多种数据库，使得分页查询变得简单高效。
- [乐观锁插件](https://baomidou.com/plugins/optimistic-locker/)：乐观锁是一种并发控制机制，用于确保在更新记录时，该记录未被其他事务修改。
`MyBatis-Plus`提供了`OptimisticLockerInnerInterceptor`插件，使得在应用中实现乐观锁变得简单。
- [防全表更新与删除插件](https://baomidou.com/plugins/block-attack/)：`BlockAttackInnerInterceptor`是`MyBatis-Plus`框架提供的一个安全插件，
专门用于防止恶意的全表更新和删除操作。该插件通过拦截`update`和`delete`语句，确保这些操作不会无意中影响到整个数据表，从而保护数据的完整性和安全性。

> [!NOTE]
> 这些插件都是默认开启的，如果不需要的话，可以用配置属性关掉。
> 
> 插件注册顺序：分页 -> 乐观锁 -> 防全表更新与删除
>
> `Bean`的注入顺序为最低优先级，方便用户注册其他插件。

### 配置
```yaml
# 这是我自己用的`mybatis plus`配置
mybatis-plus:
    type-aliases-package: io.github.pangju666.test.entity # 实体类包路径，配不配置都行
    mapper-locations: classpath:mapper/*.xml # mapper xml 映射文件路径
    configuration:
        # 删除 SQL 中多余的空白字符。请注意，这也会影响 SQL 中的字面字符串。
        shrink-whitespaces-in-sql: true 
    global-config:
        banner: false # 禁用控制台 Banner
        db-config:
            column-format: "`%s`" # 列名格式化，主要是防止和数据库关键字冲突
            update-strategy: ALWAYS # 防止将值更新为 null 时失败
            id-type: auto # id类型，我平时用自动增长比较多，分布式项目不建议用这个
    # 我做的插件配置        
    plugins:
        # 乐观锁插件配置
        optimistic-locker:
            enabled: true # 是否启用乐观锁插件，默认为true
            # 启用wrapper模式后，在Wrapper方式更新时也可以使用乐观锁
            wrapper-mode: true # 是否启用wrapper模式，默认为true
        # 分页插件配置
        pagination:
            enabled: true # 是否启用分页插件，默认为true
            db-type: MYSQL # 数据库类型，默认为 MySQL
        # 防全表更新与删除插件配置
        block-attack:
            enabled: true # 是否启用防全表更新与删除插件，默认为true
```

### 其他插件
如果需要使用其他插件，可以选择自定义`Bean`来加载其他插件。

> [!TIP]
> 如果想覆盖掉我写的那几种插件配置，需要先在属性中禁用掉相关的配置。
> 
> 插件注册顺序建议参考`Mybatis Plus`的[建议顺序](https://baomidou.com/plugins/)。

```java
@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public MybatisPlusInterceptor customPlusInterceptor() {
		MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
		// 先从属性中禁用掉分页插件，然后自定义分页插件配置
		// 不需要自定义分页插件的话，可以忽略这行
		interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL);
		// ... 自行添加其他插件
		interceptor.addInnerInterceptor();
		return interceptor;
	}
}
```

## 逻辑删除填充SQL注入器
这个主要是用来配合我的[`逻辑删除填充注解`](/starter/mybatisplus/annotation)，如果你想添加自己的SQL注入器，可以选择继承我的SQL注入器实现，然后添加自己的SQL注入方法。

```java
public class CustomSqlInjector extends TableLogicFillSqlInjector {
	@Override
	public List<AbstractMethod> getMethodList(Configuration configuration, Class<?> mapperClass, TableInfo tableInfo) {
		List<AbstractMethod> superMethods = super.getMethodList(configuration, mapperClass, tableInfo);
		// 添加自己的注入方法
		superMethods.add();
		return newMethods;
	}
}

@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public ISqlInjector customSqlInjector() {
		return new CustomSqlInjector();
	}
}
```
