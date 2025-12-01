---
layout: doc
---

# Spock教程

## 为什么做测试

是人，都会犯错。

写测试会让用户更加相信，说这句话不是自负，而是自信。

测试使你思考

- 整理编码思路

- 增加对项目的理解

## 什么是单元测试

> 单元测试（又称为模块测试, Unit Testing）是针对程序模块（软件设计的最小单位）来进行正确性检验的测试工作。程序单元是应用的最小可测试部件。在过程化编程中，一个单元就是单个程序、函数、过程等；对于面向对象编程，最小单元就是方法，包括基类（超类）、抽象类、或者派生类（子类）中的方法 （维基百科）


## 为什么做单元测试

- 越早发现bug,解决bug的时间成本就越低

- 省时--单元测试着眼点小，意味着当测试结果不对时，单元测试能够指出更明确的问题点

- 省力--单元测试可以帮助别人维护和理解代码。比如新人接手代码时，单元测试代码可以看成是各函数的使用范例（读例子比读全部代码更容易）。

- 重构--有没有改坏程序，跑跑单元就知道了

缺点：需要花时间完整开发，需要长期维护。大范围重构时基本就废掉了。

### 单元测试是用来做什么的

看看程序有没有问题？确保没有bug？

单元测试确实可以测试程序有没有问题，大部分情况下只是使用单元测试来“看看程序有没有问题”的话，效率反而不如把程序运行起来直接查看结果。原因有两个：

- 单元测试要写额外的代码，而不写单元测试，直接运行程序也可以测试程序有没有问题。

- 即使通过了单元测试，程序在实际运行的时候仍然有可能出问题。

### 单元测试的几个场景

- 开发前写单元测试，通过测试描述需求，由测试驱动开发。

- 在开发过程中及时得到反馈，提前发现问题。

- 应用于自动化构建或持续集成流程，对每次代码修改做回归测试。

- 作为重构的基础，验证重构是否可靠

- 编写单元测试的难易程度能够直接反应出代码的设计水平，编写可测试的代码绝对是门艺术。

## 为什么不做单元测试

### 单元测试的资料不够全面

介绍如何编码，如何使用某个框架的书很多，但是与编码同样重要的介绍单元测试的书却不多。及时有，也不够深入，仅仅介绍了如何进行单元测试，如何利用junit定义测试类，测试方法，有哪些assert,然后就没然后了。

### 单元测试难以理解和维护

测试代码不像普通的应用程序一样有很明确的输入和输出。举个例子，假如某个函数要做如下事情：

```
· 接收一个user对象作为参数
· 调用dao层的update方法更新用户属性
· 返回true/false结果

```

如果要对以上以上代码做一个完整的单元测试，其中一个测试可能就是下面这个样子的

```
· 假设调用dao层的update方法会返回true。
· 程序去调用service层的update方法。
· 验证一下service是不是也返回了true。

```

无论是用什么样的单元测试框架，最后写出来的单元测试代码量也比业务代码只多不少。更多的代码量，加上单测代码并不像业务代码那样直观，还有对单测代码可读性不重视的坏习惯，导致最终呈现出来的单测代码难以阅读，要维护更是难上加难。

同时，大部分单元测试的框架都有很强的代码侵入性。要理解单元测试，首先得学习他用的那个单元测试框架，这无形中又增加了单元测试理解和维护的难度。

### 单元测试难以去除依赖

如果要写一个纯粹的、无依赖的单元测试往往很困难，比如依赖了数据库、或者依赖了文件系统、再或者依赖了其它模块。实际工作过程中，还有一类难以处理的依赖问题：代码依赖。比如一个对象的方法中调用了其它对象的方法，其它对象又调用了更多对象，最后形成了一个无比巨大的调用树。后来出现了一些mock框架，比如java的JMockit、EasyMock，或者Mockito。利用这类框架可以相对比较轻松的通过mock方式去做假设和验证，相对于之前的方式有了质的飞跃。但是如果对代码的拆分和逻辑的抽象设计不合理，任何测试框架也会无能为力。

写单元测试的难易程度跟代码的质量关系最大，并且是决定性的。项目里无论用了哪个测试框架都不能解决代码本身难以测试的问题，所以如果你遇到的是“我的代码里依赖的东西太多了所以写不出来单测”这样的问题的话，需要去看的是如何设计和重构代码。

## 如何做单元测试

### 写单元测试的时机

- 当程序需要被其他程序调用的时候

- 修复BUG前

- 需求变更的时候

### 如何衡量单元测试

优秀的单元测试的特性

- 测试的是一个代码单元内部的逻辑，而不是各模块之间的交互

- 无依赖，不需要实际运行环境就可以测试代码

- 运行效率高，可以随时执行

### SPOCK是什么

- Spock是Java和Groovy应用程序的测试和规范框架

- 测试代码使用基于groovy语言扩展而成的规范说明语言（specification language）

- 通过junit runner调用测试，兼容绝大部分junit的运行场景（ide，构建工具，持续集成等）

- 框架的设计思路参考了JUnit，jMock，RSpec，Groovy，Scala，Vulcans

#### Groovy

- 以“扩展JAVA”为目的而设计的JVM语言

- JAVA开发者友好

- 可以使用java语法与API

- 语法精简，表达性强

- 典型应用：jenkins,elasticsearch,gradle,grails

#### specification language

specification 来源于近期流行起来写的BDD（Behavior-driven development 行为驱动测试）

通过某种规范说明语言去描述程序“应该”做什么，再通过一个测试框架读取这些描述、并验证应用程序是否符合预期。

### 为什么是SPOCK

上面提到那个例子，如果用spock实现，代码如下：

```
def "isUserEnabled should return true only if user status is enabled"() {
    given:
    UserInfo userInfo = new UserInfo(
            status: actualUserStatus
    );
    userDao.getUserInfo(_) >> userInfo;

    expect:
    userService.isUserEnabled(1l) == expectedEnabled;

    where:
    actualUserStatus   | expectedEnabled
    UserInfo.ENABLED   | true
    UserInfo.INIT      | false
    UserInfo.CLOSED    | false
}

```

这段代码实际是3个测试：当getUserInfo返回的用户状态分别为ENABLED、INIT和CLOSED时，验证各自isUserEnabled函数的返回是否符合期待。

SPOCK优点如下：

- spock框架使用标签分隔单元测试中不同的代码，更加规范，也符合实际写单元测试的思路

- 代码写起来更简洁、优雅、易于理解

- 由于使用groovy语言，所以也可以享受到脚本语言带来的便利

- 底层基于jUnit，不需要额外的运行框架

- 已趋于成熟

SPOCK缺点：

- 需要了解groovy语言

- 与其它java的测试框架风格相差比较大，需要适应

这些缺点比起spock提供的易于开发和维护的单元测试代码来说，都是可以忽略的。

### SPOCK中概念

#### Specification

在Spock中，待测系统(system under test; SUT) 的行为是由规格(specification) 所定义的。在使用Spock框架编写测试时，测试类需要继承自Specification类。

#### Fields

Specification类中可以定义字段，这些字段在运行每个测试方法前会被重新初始化，跟放在setup()里是一个效果。

#### Fixture Methods

预先先定义的几个固定的函数，与junit或testng中类似

```
def setup() {}          // run before every feature method
def cleanup() {}        // run after every feature method
def setupSpec() {}     // run before the first feature method
def cleanupSpec() {}   // run after the last feature method

```

#### blocks

每个feature method又被划分为不同的block，不同的block处于测试执行的不同阶段，在测试运行时，各个block按照不同的顺序和规则被执行，如下图

![](images/WEBRESOURCE11699037370099截图.png)

介绍下每个block。

setup / given

setup也可以写成given，在这个block中会放置与这个测试函数相关的初始化程序

when ... then ...

when与then需要搭配使用，在when中执行待测试的函数，在then中判断是否符合预期

expert

expect可以看做精简版的when+then

thrown

如果要验证有没有抛出异常，可以用thrown(),例如

```
when:
stack.pop()  

then:
thrown(EmptyStackException)
stack.empty

```

如果要获取抛出的异常，可以用如下语法：

```
when:
stack.pop()  

then:
def e = thrown(EmptyStackException)
e.cause == null

```

如果要验证没有抛出某种异常，可以用notThrown()

```
def "HashMap accepts null key"() {
  setup:
  def map = new HashMap()  

  when:
  map.put(null, "elem")  

  then:
  notThrown(NullPointerException)
}

```

Cleanup

函数退出前做一些清理工作，如关闭资源等。

Where

做测试时最复杂的事情之一就是准备测试数据，尤其是要测试边界条件、测试异常分支等，这些都需要在测试之前规划好数据。但是传统的测试框架很难轻松的制造数据，要么依赖反复调用，要么用xml或者data provider函数之类难以理解和阅读的方式。比如说：

```
class MathSpec extends Specification {
    def "maximum of two numbers"() {
        expect:
        // exercise math method for a few different inputs
        Math.max(1, 3) == 3
        Math.max(7, 4) == 7
        Math.max(0, 0) == 0
    }
}

```

而在spock中，通过where block可以让这类需求实现起来变得非常优雅

```
class DataDriven extends Specification {
    def "maximum of two numbers"() {
        expect:
        Math.max(a, b) == c

        where:
        a | b || c
        3 | 5 || 5
        7 | 0 || 7
        0 | 0 || 0
    }
}

```

上述例子实际会跑三次测试，相当于在for循环中执行三次测试，a/b/c的值分别为3/5/5,7/0/7和0/0/0。如果在方法前声明@Unroll，则会当成三个方法运行。如

```
class DataDriven extends Specification {
    @Unroll
    def "maximum of #a and #b should be #c"() {
        expect:
        Math.max(a, b) == c

        where:
        a | b || c
        3 | 5 || 5
        7 | 0 || 7
        0 | 0 || 0
    }
}

```

mock

在spock中创建一个mock对象非常简单：

```
class PublisherSpec extends Specification {
    Publisher publisher = new Publisher()
    Subscriber subscriber = Mock()
    Subscriber subscriber2 = Mock()

    def setup() {
        publisher.subscribers.add(subscriber)
        publisher.subscribers.add(subscriber2)
    }
}

```

创建了mock对象之后就可以对它的交互做验证了

```
def "should send messages to all subscribers"() {
    when:
    publisher.send("hello")

    then:
    1 * subscriber.receive("hello")
    1 * subscriber2.receive("hello")
}

```

上面的例子里验证了：在publisher调用send时，两个subscriber都应该被调用一次receive(“hello”)。

示例中，表达式中的次数、对象、函数和参数部分都可以灵活定义。

```
1 * subscriber.receive("hello")      // exactly one call
0 * subscriber.receive("hello")      // zero calls
(1..3) * subscriber.receive("hello") // between one and three calls (inclusive)
(1.._) * subscriber.receive("hello") // at least one call
(_..3) * subscriber.receive("hello") // at most three calls
_ * subscriber.receive("hello")      // any number of calls, including zero
1 * subscriber.receive("hello")     // an argument that is equal to the String "hello"
1 * subscriber.receive(!"hello")    // an argument that is unequal to the String "hello"
1 * subscriber.receive()            // the empty argument list (would never match in our example)
1 * subscriber.receive(_)           // any single argument (including null)
1 * subscriber.receive(*_)          // any argument list (including the empty argument list)
1 * subscriber.receive(!null)       // any non-null argument
1 * subscriber.receive(_ as String) // any non-null argument that is-a String
1 * subscriber.receive({ it.size() > 3 }) // an argument that satisfies the given predicate
                                          // (here: message length is greater than 3)
1 * subscriber._(*_)     // any method on subscriber, with any argument list
1 * subscriber._         // shortcut for and preferred over the above
1 * _._                  // any method call on any mock object
1 * _                    // shortcut for and preferred over the above

```

得益于groovy脚本语言的特性，在定义交互的时候不需要对每个参数指定类型

Stubbing

对mock对象定义函数的返回值可以用如下方法。

```
subscriber.receive(_) >> "ok"

```

符号“>>” 代表函数的返回值，执行上面的代码后，再调用subscriber.receice方法将返回ok。如果要每次调用返回不同结果，可以使用“>>>”：

```
subscriber.receive(_) >>> ["ok", "error", "error", "ok"]

```

如果需要抛出异常。

```
subscriber.receive(_) >> { throw new InternalError("ouch") }

```

#### block总结

```
@Title("测试的标题")
@Narrative("""关于测试的大段文本描述""")
@Subject(Adder)  //标明被测试的类是Adder
@Stepwise  //当测试方法间存在依赖关系时，标明测试方法将严格按照其在源代码中声明的顺序执行
class TestCaseClass extends Specification {  
  @Shared //在测试方法之间共享的数据
  SomeClass sharedObj

  def setupSpec() {
    //TODO: 设置每个测试类的环境
  }

  def setup() {
    //TODO: 设置每个测试方法的环境，每个测试方法执行一次
  }

  @Ignore("忽略这个测试方法")
  @Issue(["问题#23","问题#34"])
  def "测试方法1" () {
    given: "给定一个前置条件"
    //TODO: code here
    and: "其他前置条件"


    expect: "随处可用的断言"
    //TODO: code here

    when: "当发生一个特定的事件"
    //TODO: code here
    and: "其他的触发条件"

    then: "产生的后置结果"
    //TODO: code here
    and: "同时产生的其他结果"

    where: "不是必需的测试数据"
    input1 | input2 || output
     ...   |   ...  ||   ...   
  }

  @IgnoreRest //只测试这个方法，而忽略所有其他方法
  @Timeout(value = 50, unit = TimeUnit.MILLISECONDS)  // 设置测试方法的超时时间，默认单位为秒
  def "测试方法2"() {
    //TODO: code here
  }

  def cleanup() {
    //TODO: 清理每个测试方法的环境，每个测试方法执行一次
  }

  def cleanupSepc() {
    //TODO: 清理每个测试类的环境
  }
}

```
