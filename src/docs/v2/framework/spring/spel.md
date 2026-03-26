---
layout: doc
---

# SpEL

## 工具类
`io.github.pangju666.framework.spring.utils.SpELUtils`

这个工具类主要是用来辅助使用SpEL表达式的，封装了一些样板式代码。

| 属性名                        | 类型                        |      说明       |
|----------------------------|:--------------------------|:-------------:|
| DEFAULT_EXPRESSION_PARSER  | SpelExpressionParser      | 默认的SpEL表达式解析器 |
| DEFAULT_EVALUATION_CONTEXT | StandardEvaluationContext |  默认的表达式计算上下文  |

> [!IMPORTANT]
> `DEFAULT_EVALUATION_CONTEXT`是共享的，修改其中变量会影响其他使用方。

| 方法名                   | 返回值                          |        用途        |
|-----------------------|:-----------------------------|:----------------:|
| initEvaluationContext | MethodBasedEvaluationContext | 初始化基于方法的表达式计算上下文 |

### 初始化上下文
一般来说都是在切面中使用，所以我给的实例也是基于切面

```java
@Aspect
public class TestAspect {
    private ParameterNameDiscoverer discoverer = new DefaultParameterNameDiscoverer();

    public void doBefore(JoinPoint point) {
        MethodSignature methodSignature = (MethodSignature) point.getSignature();
        Method method = methodSignature.getMethod();
            
        MethodBasedEvaluationContext context = SpELUtils.initEvaluationContext(method, point.getArgs(), discoverer);
    }
}
```
