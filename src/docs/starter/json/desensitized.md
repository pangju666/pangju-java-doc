---
layout: doc
---

# 脱敏

## 注解
`io.github.pangju666.framework.boot.jackson.annotation.DesensitizeFormat`

> [!IMPORTANT]
> 只能作用于`CharSequence`或其子类型的字段。

### 属性
- type: 脱敏策略类型（当选择内置类型时，应用对应的内置算法；当选择`CUSTOM`时， 使用`prefix`与`suffix` 控制前后缀保留与中间隐藏）。
- prefix: 保留的前缀长度（当`type`为`CUSTOM`时生效；指定保留原始字符串开头的字符数量（≤-1 表示不保留））。
- suffix: 保留的后缀长度（当`type`为`CUSTOM`时生效；指定保留原始字符串末尾的字符数量（≤-1 表示不保留））。

## 内置脱敏类型
io.github.pangju666.framework.boot.jackson.enums.DesensitizedType

具体实现逻辑，请阅读[脱敏工具类文档](/commons/lang/string/desensitize)

| 枚举值                         |      说明       |                                脱敏逻辑                                 |           示例            |
|-----------------------------|:-------------:|:-------------------------------------------------------------------:|:-----------------------:|
| CHINESE_NAME                |     姓名脱敏      | 3字及以下：隐藏第一个字（如：\*三）；4-6字：显示最后两个字（如：\*\*不败）；6字以上：保留首1位+尾2位（如：欧***莫非） |  \*三 或 \*\*不败 或 欧***莫非  |
| MILITARY_ID_NUMBER          |    军官证号码脱敏    |                              保留前1位，后1位                              |     军*************1     |
| PASSPORT_NUMBER             |    护照号码脱敏     |                              保留前1位，后1位                              |    E***************1    |
| SOCIAL_SECURITY_CARD_NUMBER |   社会保障卡号脱敏    |                    动态保留首尾各1/3长度，长度不能被3整除的，首部长度+1                    |      123******789       |
| MEDICAL_CARD_NUMBER         |    医保卡号脱敏     |                    动态保留首尾各1/3长度，长度不能被3整除的，首部长度+1                    |      C12******456       |
| ID_CARD                     |    身份证号脱敏     |                              保留前1位，后1位                              |    1***************1    |
| TEL_PHONE                   |   中国固定电话脱敏    |                              保留区号和后4位                               |       010****1234       |
| PHONE_NUMBER                |     手机号脱敏     |                              保留前3位，后2位                              |       138******12       |
| ADDRESS                     |   中国大陆地址脱敏    |                            隐藏区/县以下部分的地址                             |      北京市朝阳区******       |
| EMAIL                       |    电子邮件脱敏     |                           保留用户名前3位，域名全保留                            | tes********@example.com |
| PASSWORD                    |     密码脱敏      |                               全部替换为星号                               |        ********         |
| PLATE_NUMBER                |     车牌号脱敏     |                              保留前2位，后3位                              |        京A***189         |
| VEHICLE_ENGINE_NUMBER       |   车辆发动机号脱敏    |                              保留前1位，后2位                              |          A**12          |
| VEHICLE_FRAME_NUMBER        |    车辆车架号脱敏    |                              保留前3位，后3位                              |        ABC***XYZ        |
| NICK_NAME                   |     昵称脱敏      |                               保留首尾各1位                               |           张*三           |
| BANK_CARD                   |    银行卡号脱敏     |                               保留前后各4位                               |     6228******8888      |
| CUSTOM                      | 自定义脱敏类型（占位类型） |                                                                     |                         |

## 使用示例

### 示例数据结构
```java
public class TestVO {
	@DesensitizeFormat(type = DesensitizedType.CHINESE_NAME)
	private String name;
	// 保留前后各一个字符
	@DesensitizeFormat(type = DesensitizedType.CUSTOM, suffix = 1, prefix = 1)
	private String content;
	// 默认脱敏全部字符
	@DesensitizeFormat(type = DesensitizedType.CUSTOM)
	private String content2;
	// 保留最后一个字符
	@DesensitizeFormat(type = DesensitizedType.CUSTOM, suffix = 1)
	private String content3;
	// 保留第一个字符
	@DesensitizeFormat(type = DesensitizedType.CUSTOM, prefix = 1)
	private String content4;
	// @DesensitizeFormat(type = DesensitizedType.CUSTOM, prefix = 1) 加在非字符串类型上无效
	private TestChildVO child;
	
	public static class TestChildVO {
	    // 保留第一个字符
	    @DesensitizeFormat(type = DesensitizedType.CUSTOM, prefix = 1)
	    private String content5;
	}
}
```

### 手动序列化
```java
// 注入获取
ObjectMapper objectMapper;

TestVO testVO = new TestVO();
testVO.setName("东方不败");
testVO.setContent("测试内容");
testVO.setContent2("测试内容2");
testVO.setContent3("测试内容");
testVO.setContent4("测试内容");
TestVO.TestChildVO child = new TestVO.TestChildVO();
child.setContent5("测试内容");
testVO.setChild(child);

/*
{
  "name": "**不败",
  "content": "测**容",
  "content2": "*****",
  "content3": "***容",
  "content4": "测***",
  "child": {
    "content5": "测***"
  }
}
*/
String json = objectMapper.writer().writeValueAsString(testVO); 
```

### 自动序列化
```java
@GetMapping("/test")
public TestVO test() {
    TestVO testVO = new TestVO();
    testVO.setName("东方不败");
    testVO.setContent("测试内容");
    testVO.setContent2("测试内容2");
    testVO.setContent3("测试内容");
    testVO.setContent4("测试内容");
    TestVO.TestChildVO child = new TestVO.TestChildVO();
    child.setContent5("测试内容");
    testVO.setChild(child);
    return testVO;
}
/*
接口响应为：
{
  "name": "**不败",
  "content": "测**容",
  "content2": "*****",
  "content3": "***容",
  "content4": "测***",
  "child": {
    "content5": "测***"
  }
}
*/
```
