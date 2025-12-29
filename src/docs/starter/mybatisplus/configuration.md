---
layout: doc
---

# 自动装配

## 说明
我自动装配了`Mybatis Plus`常用的几个内置插件。

## 插件
- [分页插件](https://baomidou.com/plugins/pagination/)：`MyBatis-Plus`的分页插件`PaginationInnerInterceptor`提供了强大的分页功能，
支持多种数据库，使得分页查询变得简单高效。
- [乐观锁插件](https://baomidou.com/plugins/optimistic-locker/)：乐观锁是一种并发控制机制，用于确保在更新记录时，该记录未被其他事务修改。
`MyBatis-Plus`提供了`OptimisticLockerInnerInterceptor`插件，使得在应用中实现乐观锁变得简单。
- [防全表更新与删除插件](https://baomidou.com/plugins/block-attack/)：`BlockAttackInnerInterceptor`是`MyBatis-Plus`框架提供的一个安全插件，
专门用于防止恶意的全表更新和删除操作。该插件通过拦截`update`和`delete`语句，确保这些操作不会无意中影响到整个数据表，从而保护数据的完整性和安全性。

> [!NOTE]
> 这些插件都是默认开启的，不需要的插件，可以在配置中禁用掉。
> 
> 插件Bean的注册顺序：
> 1. 分页（排序号：最高优先级 + 11）
> 2. 乐观锁（排序号：最高优先级 + 12）
> 3. 防全表更新与删除（排序号：最高优先级 + 22）。

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
如果需要使用其他插件，可以选择自定义插件`Bean`来加载其他插件。

> [!TIP]
> 使用多个插件时，需要注意它们的顺序。建议的顺序是：
> 1. 多租户、动态表名
> 2. 分页、乐观锁
> 3. SQL 性能规范、防止全表更新与删除 
>
> 总结：对 SQL 进行单次改造的插件应优先放入，不对 SQL 进行改造的插件最后放入。

```java
@SpringBootConfiguration
public class BeanConfig {
    // 定义多租户插件Bean，排序号遵从插件建议注册顺序
    @Order(Ordered.HIGHEST_PRECEDENCE)
	@Bean
	public TenantLineInnerInterceptor tenantLineInnerInterceptor() {
		return new TenantLineInnerInterceptor();
	}
	
	// 定义动态表名插件Bean，排序号遵从插件建议注册顺序
    @Order(Ordered.HIGHEST_PRECEDENCE + 1)
	@Bean
	public DynamicTableNameInnerInterceptor dynamicTableNameInnerInterceptor() {
		return new DynamicTableNameInnerInterceptor();
	}
	
	// 定义数据权限插件Bean，排序号遵从插件建议注册顺序
    @Order(Ordered.HIGHEST_PRECEDENCE + 2)
	@Bean
	public DataPermissionInterceptor dataPermissionInterceptor() {
		return new TenantLineInnerInterceptor();
	}
	
	// 覆盖掉我定义的分页插件Bean，排序号遵从插件建议注册顺序
	@Order
	@Bean(Ordered.HIGHEST_PRECEDENCE + 11)
	public PaginationInnerInterceptor paginationInnerInterceptor() {
		return new PaginationInnerInterceptor(DbType.MYSQL);
	}
	
	// 覆盖掉我定义的防止全表删除插件Bean，排序号遵从插件建议注册顺序
	@Order
	@Bean(Ordered.HIGHEST_PRECEDENCE + 22)
	public BlockAttackInnerInterceptor blockAttackInnerInterceptor() {
		return new BlockAttackInnerInterceptor();
	}
}
```

## 逻辑删除填充
这个主要是用来配合我的[`逻辑删除填充注解`](/starter/mybatisplus/annotation)，如果你想定义自己的SQL注入器，需要继承我的SQL注入器实现。

[官方文档](https://baomidou.com/guides/sql-injector/#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%85%A8%E5%B1%80%E6%96%B9%E6%B3%95%E6%94%BB%E7%95%A5)

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
