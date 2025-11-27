---
layout: doc
---

# 加/解密

## 加密序列化

> [!IMPORTANT]
> 只能作用于以下类型的字段（`null`、空字符串、空白字符串不会加密）：
> - 标量：`String`、`byte[]`、`java.math.BigInteger`、`java.math.BigDecimal`
> - 集合：`java.util.List<T>`、`java.util.Set<T>`、`java.util.Collection<T>` 及其他 `Iterable<T>`，其中 `T` 为上述受支持类型
> - 映射：`java.util.Map<?, T>`，其中 `T` 为上述受支持类型

### 注解
`io.github.pangju666.framework.boot.jackson.annotation.EncryptFormat`

#### 属性
- key: 明文密钥或占位符，支持两种形式：
  1. 明文密钥：直接传入密钥字符串，例如`@EncryptFormat(key = "my-secret-key")`
  2. 占位符：使用`${property.name}`格式，框架将从`Spring`配置读取实际密钥值，例如`@EncryptFormat(key = "${app.encryption.key}")`
- algorithm: [加密算法](/starter/crypto/enums#加密算法)，默认使用`AES256`算法。
- encoding: 字符串加密输出的[编码方式](/starter/crypto/enums#编码类型)，默认使用`BASE64`（仅在加密字符串时生效，对二进制与数值类型不适用）。
- factory: 自定义加密工厂（必须存在可访问的无参构造方法）。
  - 优先级：当提供工厂类型时，优先使用该类型；未提供时按算法枚举关联的工厂。
  - 获取策略：优先从`Spring`容器获取`Bean`；当容器不可用或获取失败时回退到直接构造。
  - 构造要求与原因：为保证在容器不可用或无`Bean`定义时能够通过[`CryptoFactoryRegistry`](/starter/json/crypto#加密工厂注册与缓存工具)的反射回退路径创建实例（调用无参构造），
  自定义工厂必须提供可访问的无参构造方法（必须为`public`）。 若缺失或不可访问，将导致回退构造失败并抛出异常。
  - 默认与行为：未指定则使用算法默认工厂；如提供多个类型，仅取第一个。

### 使用示例

#### 示例数据结构
```java
public class TestCryptoVO {
	@EncryptFormat(key = "123456")
	private String content;
	// 手动指定算法工厂类型，此时算法类型将不生效
	@EncryptFormat(key = "123456", factory = AES256CryptoFactory.class)
	private String content2;
	// 这种类型只需要给对应的数据结构类上的字段加注解即可
	private TestChildVO child;
	// @EncryptFormat(key = "123456") 加在不受支持类型的字段上无效
	private Integer number;
	@EncryptFormat(key = "123456")
	private byte[] bytes;
	@EncryptFormat(key = "123456")
	private BigInteger bigInteger;
	@EncryptFormat(key = "123456")
	private BigDecimal bigDecimal;
	@EncryptFormat(key = "123456")
	private List<String> list;
	@EncryptFormat(key = "123456")
	private Set<BigDecimal> set;
	@EncryptFormat(key = "123456")
	private Collection<BigInteger> collection;
	@EncryptFormat(key = "123456")
	private Iterable<byte[]> iterable;
	// Map的 key 不需要一定是 String，序列化时会调用 Objects.toString 将其转换为字符串
	@EncryptFormat(key = "123456")
	private Map<Integer, String> map;
	// 对于嵌套类型，我也做了支持
	@EncryptFormat(key = "123456")
	private List<Map<String, List<BigDecimal>>> nestedList;
	// 这种类型只需要给对应的数据结构类上的字段加注解即可
	private List<Map<String, List<TestChildVO>>> nestedList2;

	public static class TestChildVO {
		// 指定加密算法
		@EncryptFormat(key = "123456", algorithm = CryptoAlgorithm.AES256)
		private String content;
	}
}
```

#### 手动序列化
```java
// 注入获取
ObjectMapper objectMapper;

TestCryptoVO cryptoVO = new TestCryptoVO();
cryptoVO.setContent("测试内容");
cryptoVO.setContent2("测试内容");
TestCryptoVO.TestChildVO childVO = new TestCryptoVO.TestChildVO();
childVO.setContent("测试内容");
cryptoVO.setChild(childVO);
cryptoVO.setNumber(1);
cryptoVO.setBytes(RandomUtils.secure().randomBytes(100));
cryptoVO.setBigInteger(BigInteger.ONE);
cryptoVO.setBigDecimal(BigDecimal.TEN);
// 空字符串、空白字符串不会加密
cryptoVO.setList(List.of("test", "", " "));
cryptoVO.setSet(Set.of(BigDecimal.ONE));
cryptoVO.setCollection(Set.of(BigInteger.TEN));
cryptoVO.setIterable(Set.of(RandomUtils.secure().randomBytes(100)));
cryptoVO.setMap(Map.of(1, "test"));
cryptoVO.setNestedList(List.of(Map.of("test", List.of(BigDecimal.ONE))));
cryptoVO.setNestedList2(List.of(Map.of("test", List.of(childVO))));

/*
{
  "content": "ba00NrnJHpUCZ8XgqZZ4KjWmzI0zxwyumQPrQzik5Nw1MZRb17lJgq6PH1rGkeTo",
  "content2": "oK2BNoESo5EpM07LWFfeKP4sxPcYSbu6D8FLmIpdd+7RS6TuHnt/M6pEqtc1Sax3",
  "number": 1,
  "child": {
    "content": "L6z3zYbclUq5CnQeFW37P/7goHLJzouWCsGK210VHYeNyEsnYnd/MGKOGDneIczb"
  },
  "bytes": "K3DtqutPkL5TmYweNeIWEqsIVwS4aum3VNvcNLK/m2DJc08Dh5kA+NX4DohSSGD9X3tKHqp7aw/3aRQzsw0KXfYIUHRlSipSo3T426UsDfGDoyZXbLNhloaABxYAX39hMy/62tPojwiPCj4dveNEairPz7i9wU1v+Kt5YbrpVzOuadhKZrS627vtpQVokjiK",
  "bigInteger": 130913694759058833587393404385859135970348187688956984157162974997695801869569998829008359771723365869254873749629763059760,
  "bigDecimal": -33865433982517633433440783765679057818426317385838980396329131035400131623484376900357759812701088124775412650944297024094160,
  "list": [
    "bREE8tw5stscUq0N9H7/xQaKeDXSMPVNiONcUmjG0iRUNxbjaJlXmoBn3X7dthwd",
    "",
    " "
  ],
  "set": [
    37021833592625531181671414805246729889730253807376018318933310485460445396344194517751706315949955218899726277524430031683632
  ],
  "collection": [
    62663863385555496229519111011613776683783759620437327066381859336552369768161133217874116511074145742231632905110886643925040
  ],
  "iterable": [
    "0OeS4jiIhjRWa7ba9gNP59ovNs+FNuk8ffAvdeGOQlbssdkqLqTub2L14VDpXnhlkQYqHrMB5JakV3kfhjtqvWiIRyTNer/kZErTpA9WUGcuO8lbCUDlMaFU7vF1Ll1bXe+Ei3VIB7C3Wg9SKCT2kJeL72p+CVq9KXbLl1IhkCutFX/7x2m6UVutDcLYssQ3"
  ],
  "map": {
    "1": "EatHCqZibZCVrm/XdrSk13v9EHMH0phULEDVHXLDT2dmAqF7uEA9LsVxBNP8kgBv"
  },
  "nestedList": [
    {
      "test": [
        -7045291871959232856781939931757781852580532100039497955286289586953543202773920257259174923246971863091271666171853567688656
      ]
    }
  ],
  "nestedList2": [
    {
      "test": [
        {
          "content": "KoiIWI7M9SmDtoh8cOKsUJ7T/yJNWLqf23udkPS18oodeMLlxpnEe0S5FxYOKwCW"
        }
      ]
    }
  ]
}
*/
String json = objectMapper.writer().writeValueAsString(testVO);
```

#### 自动序列化
```java
@GetMapping("/test")
public TestVO test() {
   TestCryptoVO cryptoVO = new TestCryptoVO();
   cryptoVO.setContent("测试内容");
   cryptoVO.setContent2("测试内容");
   TestCryptoVO.TestChildVO childVO = new TestCryptoVO.TestChildVO();
   childVO.setContent("测试内容");
   cryptoVO.setChild(childVO);
   cryptoVO.setBytes(RandomUtils.secure().randomBytes(100));
   cryptoVO.setBigInteger(BigInteger.ONE);
   cryptoVO.setBigDecimal(BigDecimal.TEN);
   // 空字符串、空白字符串不会加密
   cryptoVO.setList(List.of("test", "", " "));
   cryptoVO.setSet(Set.of(BigDecimal.ONE));
   cryptoVO.setCollection(Set.of(BigInteger.TEN));
   cryptoVO.setIterable(Set.of(RandomUtils.secure().randomBytes(100)));
   cryptoVO.setMap(Map.of(1, "test"));
   cryptoVO.setNestedList(List.of(Map.of("test", List.of(BigDecimal.ONE))));
   cryptoVO.setNestedList2(List.of(Map.of("test", List.of(childVO))));
   return testVO;
}
/* 
接口响应：
{
  "content": "ba00NrnJHpUCZ8XgqZZ4KjWmzI0zxwyumQPrQzik5Nw1MZRb17lJgq6PH1rGkeTo",
  "content2": "oK2BNoESo5EpM07LWFfeKP4sxPcYSbu6D8FLmIpdd+7RS6TuHnt/M6pEqtc1Sax3",
  "number": 1,
  "child": {
    "content": "L6z3zYbclUq5CnQeFW37P/7goHLJzouWCsGK210VHYeNyEsnYnd/MGKOGDneIczb"
  },
  "bytes": "K3DtqutPkL5TmYweNeIWEqsIVwS4aum3VNvcNLK/m2DJc08Dh5kA+NX4DohSSGD9X3tKHqp7aw/3aRQzsw0KXfYIUHRlSipSo3T426UsDfGDoyZXbLNhloaABxYAX39hMy/62tPojwiPCj4dveNEairPz7i9wU1v+Kt5YbrpVzOuadhKZrS627vtpQVokjiK",
  "bigInteger": 130913694759058833587393404385859135970348187688956984157162974997695801869569998829008359771723365869254873749629763059760,
  "bigDecimal": -33865433982517633433440783765679057818426317385838980396329131035400131623484376900357759812701088124775412650944297024094160,
  "list": [
    "bREE8tw5stscUq0N9H7/xQaKeDXSMPVNiONcUmjG0iRUNxbjaJlXmoBn3X7dthwd",
    "",
    " "
  ],
  "set": [
    37021833592625531181671414805246729889730253807376018318933310485460445396344194517751706315949955218899726277524430031683632
  ],
  "collection": [
    62663863385555496229519111011613776683783759620437327066381859336552369768161133217874116511074145742231632905110886643925040
  ],
  "iterable": [
    "0OeS4jiIhjRWa7ba9gNP59ovNs+FNuk8ffAvdeGOQlbssdkqLqTub2L14VDpXnhlkQYqHrMB5JakV3kfhjtqvWiIRyTNer/kZErTpA9WUGcuO8lbCUDlMaFU7vF1Ll1bXe+Ei3VIB7C3Wg9SKCT2kJeL72p+CVq9KXbLl1IhkCutFX/7x2m6UVutDcLYssQ3"
  ],
  "map": {
    "1": "EatHCqZibZCVrm/XdrSk13v9EHMH0phULEDVHXLDT2dmAqF7uEA9LsVxBNP8kgBv"
  },
  "nestedList": [
    {
      "test": [
        -7045291871959232856781939931757781852580532100039497955286289586953543202773920257259174923246971863091271666171853567688656
      ]
    }
  ],
  "nestedList2": [
    {
      "test": [
        {
          "content": "KoiIWI7M9SmDtoh8cOKsUJ7T/yJNWLqf23udkPS18oodeMLlxpnEe0S5FxYOKwCW"
        }
      ]
    }
  ]
}
*/
```


## 解密反序列化

> [!IMPORTANT]
> 只能作用于以下类型的字段（`null`、空字符串、空白字符串不会解密）：
> - 标量：`String`、`byte[]`、`java.math.BigInteger`、`java.math.BigDecimal`
> - 集合：`java.util.List<T>`、`java.util.Set<T>`、`java.util.Collection<T>`，其中 `T` 为上述受支持类型
> - 映射：`java.util.Map<String, T>`，其中 `T` 为上述受支持类型

> [!WARNING]
> 字段类型必须与支持类型一致，不能是支持类型的子类或实现。

### 注解
`io.github.pangju666.framework.boot.jackson.annotation.DecryptFormat`

#### 属性
- key: 明文密钥或占位符，支持两种形式：
    1. 明文密钥：直接传入密钥字符串，例如`@EncryptFormat(key = "my-secret-key")`
    2. 占位符：使用`${property.name}`格式，框架将从`Spring`配置读取实际密钥值，例如`@EncryptFormat(key = "${app.encryption.key}")`
- algorithm: [解密算法](/starter/crypto/enums#加密算法)，默认使用`AES256`算法。
- encoding: 字符串解密的[解码方式](/starter/crypto/enums#编码类型)，默认使用`BASE64`（仅在解密字符串时生效，对二进制与数值类型不适用）。
- factory: 自定义加密工厂（必须存在可访问的无参构造方法）。
    - 优先级：当提供工厂类型时，优先使用该类型；未提供时按算法枚举关联的工厂。
    - 获取策略：优先从`Spring`容器获取`Bean`；当容器不可用或获取失败时回退到直接构造。
    - 构造要求与原因：为保证在容器不可用或无`Bean`定义时能够通过[`CryptoFactoryRegistry`](/starter/json/crypto#加密工厂注册与缓存工具)的反射回退路径创建实例（调用无参构造），
      自定义工厂必须提供可访问的无参构造方法（必须为`public`）。 若缺失或不可访问，将导致回退构造失败并抛出异常。
    - 默认与行为：未指定则使用算法默认工厂；如提供多个类型，仅取第一个。

### 使用示例

#### 示例数据结构
```java
public class TestCryptoDTO {
	@DecryptFormat(key = "123456")
	private String content;
	// 手动指定算法工厂类型，此时算法类型将不生效
	@DecryptFormat(key = "123456", factory = AES256CryptoFactory.class)
	private String content2;
	// 这种类型只需要给对应的数据结构类上的字段加注解即可
	private TestChildDTO child;
	// @DecryptFormat(key = "123456") 加在不受支持类型的字段上无效
	private Integer number;
	@DecryptFormat(key = "123456")
	private byte[] bytes;
	@DecryptFormat(key = "123456")
	private BigInteger bigInteger;
	@DecryptFormat(key = "123456")
	private BigDecimal bigDecimal;
	@DecryptFormat(key = "123456")
	private List<String> list;
	@DecryptFormat(key = "123456")
	private Set<BigDecimal> set;
	@DecryptFormat(key = "123456")
	private Collection<BigInteger> collection;
	// Map 的 key 必须是 String 类型
	@DecryptFormat(key = "123456")
	private Map<String, String> map;
	// 对于嵌套类型，我也做了支持
	@DecryptFormat(key = "123456")
	private List<Map<String, List<BigDecimal>>> nestedList;
	// 不支持解密集合实现类型
	private ArrayList<String> arrayList;
	// 不支持解密Map实现类型
	private HashMap<String, String> arrayList;
	// 这种类型只需要给对应的数据结构类上的字段加注解即可
	private List<Map<String, List<TestChildDTO>>> nestedList2;

	public static class TestChildDTO {
		// 指定加密算法
		@DecryptFormat(key = "123456", algorithm = CryptoAlgorithm.AES256)
		private String content;
	}
}
```

#### 手动序列化
```java
// 注入获取
ObjectMapper objectMapper;

String json = """
		{
		  "content": "ba00NrnJHpUCZ8XgqZZ4KjWmzI0zxwyumQPrQzik5Nw1MZRb17lJgq6PH1rGkeTo",
		  "content2": "oK2BNoESo5EpM07LWFfeKP4sxPcYSbu6D8FLmIpdd+7RS6TuHnt/M6pEqtc1Sax3",
		  "child": {
			"content": "L6z3zYbclUq5CnQeFW37P/7goHLJzouWCsGK210VHYeNyEsnYnd/MGKOGDneIczb"
		  },
		  "number": 1,
		  "bytes": "K3DtqutPkL5TmYweNeIWEqsIVwS4aum3VNvcNLK/m2DJc08Dh5kA+NX4DohSSGD9X3tKHqp7aw/3aRQzsw0KXfYIUHRlSipSo3T426UsDfGDoyZXbLNhloaABxYAX39hMy/62tPojwiPCj4dveNEairPz7i9wU1v+Kt5YbrpVzOuadhKZrS627vtpQVokjiK",
		  "bigInteger": "130913694759058833587393404385859135970348187688956984157162974997695801869569998829008359771723365869254873749629763059760",
		  "bigDecimal": "-33865433982517633433440783765679057818426317385838980396329131035400131623484376900357759812701088124775412650944297024094160",
		  "list": [
			"bREE8tw5stscUq0N9H7/xQaKeDXSMPVNiONcUmjG0iRUNxbjaJlXmoBn3X7dthwd",
			"",
			" "
		  ],
		  "set": [
			37021833592625531181671414805246729889730253807376018318933310485460445396344194517751706315949955218899726277524430031683632
		  ],
		  "collection": [
			62663863385555496229519111011613776683783759620437327066381859336552369768161133217874116511074145742231632905110886643925040
		  ],
		  "map": {
			"1": "EatHCqZibZCVrm/XdrSk13v9EHMH0phULEDVHXLDT2dmAqF7uEA9LsVxBNP8kgBv"
		  },
		  "nestedList": [
			{
			  "test": [
				100
			  ]
			}
		  ],
		  "nestedList2": [
			{
			  "test": [
				{
				  "content": "KoiIWI7M9SmDtoh8cOKsUJ7T/yJNWLqf23udkPS18oodeMLlxpnEe0S5FxYOKwCW"
				}
			  ]
			}
		  ]
		}
		""";

TestCryptoDTO testCryptoDTO = objectMapper.readValue(json, TestCryptoDTO.class);
```

#### 自动序列化
```java
@PostMapping("/test")
public void test(@RequestBody TestCryptoDTO testCryptoDTO) {
}
/* 
接口请求体：
{
    "content": "ba00NrnJHpUCZ8XgqZZ4KjWmzI0zxwyumQPrQzik5Nw1MZRb17lJgq6PH1rGkeTo",
	"content2": "oK2BNoESo5EpM07LWFfeKP4sxPcYSbu6D8FLmIpdd+7RS6TuHnt/M6pEqtc1Sax3",
	"child": {
	    "content": "L6z3zYbclUq5CnQeFW37P/7goHLJzouWCsGK210VHYeNyEsnYnd/MGKOGDneIczb"
	},
	"number": 1,
	"bytes": "K3DtqutPkL5TmYweNeIWEqsIVwS4aum3VNvcNLK/m2DJc08Dh5kA+NX4DohSSGD9X3tKHqp7aw/3aRQzsw0KXfYIUHRlSipSo3T426UsDfGDoyZXbLNhloaABxYAX39hMy/62tPojwiPCj4dveNEairPz7i9wU1v+Kt5YbrpVzOuadhKZrS627vtpQVokjiK",
	"bigInteger": "130913694759058833587393404385859135970348187688956984157162974997695801869569998829008359771723365869254873749629763059760",
	"bigDecimal": "-33865433982517633433440783765679057818426317385838980396329131035400131623484376900357759812701088124775412650944297024094160",
	"list": [
		"bREE8tw5stscUq0N9H7/xQaKeDXSMPVNiONcUmjG0iRUNxbjaJlXmoBn3X7dthwd",
		"",
		" "
	],
	"set": [
		37021833592625531181671414805246729889730253807376018318933310485460445396344194517751706315949955218899726277524430031683632
	],
	"collection": [
	    62663863385555496229519111011613776683783759620437327066381859336552369768161133217874116511074145742231632905110886643925040
	],
	"map": {
		"1": "EatHCqZibZCVrm/XdrSk13v9EHMH0phULEDVHXLDT2dmAqF7uEA9LsVxBNP8kgBv"
	},
	"nestedList": [
		{
		    "test": [
				1
			]
		}
	],
	"nestedList": [
		{
		    "test": [
				100
			]
		}
	],
	"nestedList2": [
		{
		    "test": [
		        {
			        "content": "KoiIWI7M9SmDtoh8cOKsUJ7T/yJNWLqf23udkPS18oodeMLlxpnEe0S5FxYOKwCW"
			    }
			]
		}
	]
}
*/
```

## 加密工厂注册与缓存工具
io.github.pangju666.framework.boot.jackson.utils.CryptoFactoryRegistry

用于在初始化[加密序列化器](/starter/json/crypto#加密序列化)和[解密反序列化器](/starter/json/crypto#解密反序列化)时获取对应的加密工厂实例。

> [!NOTE]
> 主要用途就是如果无法从`Spring`获取到对应的加密算法工厂`Bean`，也能显式构造一个实例作为兜底。
> 
> 如果你想实现自己的`Jackson`加解密操作，那这个类你会用的上的。

### 获取加密工厂
```java
// 先尝试从Spring获取，如果失败则尝试使用无参构造方法构建实例
CryptoFactory cryptoFactory = CryptoFactoryRegistry.getOrCreate(AES256CryptoFactory.class);
```

### 注册加密工厂
```java
CryptoFactoryRegistry.register(new CustomCryptoFactory());

// 获取注册过的实例
CryptoFactory cryptoFactory = CryptoFactoryRegistry.getOrCreate(CustomCryptoFactory.class);
```
