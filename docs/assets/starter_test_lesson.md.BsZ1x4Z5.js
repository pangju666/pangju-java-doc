import{_ as a,c as n,o as p,ag as e}from"./chunks/framework.XA8aHGu3.js";const d=JSON.parse('{"title":"Spock教程","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"starter/test/lesson.md","filePath":"starter/test/lesson.md","lastUpdated":1764631684000}'),l={name:"starter/test/lesson.md"};function i(t,s,c,o,r,u){return p(),n("div",null,[...s[0]||(s[0]=[e(`<h1 id="spock教程" tabindex="-1">Spock教程 <a class="header-anchor" href="#spock教程" aria-label="Permalink to &quot;Spock教程&quot;">​</a></h1><h2 id="为什么做测试" tabindex="-1">为什么做测试 <a class="header-anchor" href="#为什么做测试" aria-label="Permalink to &quot;为什么做测试&quot;">​</a></h2><p>是人，都会犯错。</p><p>写测试会让用户更加相信，说这句话不是自负，而是自信。</p><p>测试使你思考</p><ul><li><p>整理编码思路</p></li><li><p>增加对项目的理解</p></li></ul><h2 id="什么是单元测试" tabindex="-1">什么是单元测试 <a class="header-anchor" href="#什么是单元测试" aria-label="Permalink to &quot;什么是单元测试&quot;">​</a></h2><blockquote><p>单元测试（又称为模块测试, Unit Testing）是针对程序模块（软件设计的最小单位）来进行正确性检验的测试工作。程序单元是应用的最小可测试部件。在过程化编程中，一个单元就是单个程序、函数、过程等；对于面向对象编程，最小单元就是方法，包括基类（超类）、抽象类、或者派生类（子类）中的方法 （维基百科）</p></blockquote><h2 id="为什么做单元测试" tabindex="-1">为什么做单元测试 <a class="header-anchor" href="#为什么做单元测试" aria-label="Permalink to &quot;为什么做单元测试&quot;">​</a></h2><ul><li><p>越早发现bug,解决bug的时间成本就越低</p></li><li><p>省时--单元测试着眼点小，意味着当测试结果不对时，单元测试能够指出更明确的问题点</p></li><li><p>省力--单元测试可以帮助别人维护和理解代码。比如新人接手代码时，单元测试代码可以看成是各函数的使用范例（读例子比读全部代码更容易）。</p></li><li><p>重构--有没有改坏程序，跑跑单元就知道了</p></li></ul><p>缺点：需要花时间完整开发，需要长期维护。大范围重构时基本就废掉了。</p><h3 id="单元测试是用来做什么的" tabindex="-1">单元测试是用来做什么的 <a class="header-anchor" href="#单元测试是用来做什么的" aria-label="Permalink to &quot;单元测试是用来做什么的&quot;">​</a></h3><p>看看程序有没有问题？确保没有bug？</p><p>单元测试确实可以测试程序有没有问题，大部分情况下只是使用单元测试来“看看程序有没有问题”的话，效率反而不如把程序运行起来直接查看结果。原因有两个：</p><ul><li><p>单元测试要写额外的代码，而不写单元测试，直接运行程序也可以测试程序有没有问题。</p></li><li><p>即使通过了单元测试，程序在实际运行的时候仍然有可能出问题。</p></li></ul><h3 id="单元测试的几个场景" tabindex="-1">单元测试的几个场景 <a class="header-anchor" href="#单元测试的几个场景" aria-label="Permalink to &quot;单元测试的几个场景&quot;">​</a></h3><ul><li><p>开发前写单元测试，通过测试描述需求，由测试驱动开发。</p></li><li><p>在开发过程中及时得到反馈，提前发现问题。</p></li><li><p>应用于自动化构建或持续集成流程，对每次代码修改做回归测试。</p></li><li><p>作为重构的基础，验证重构是否可靠</p></li><li><p>编写单元测试的难易程度能够直接反应出代码的设计水平，编写可测试的代码绝对是门艺术。</p></li></ul><h2 id="为什么不做单元测试" tabindex="-1">为什么不做单元测试 <a class="header-anchor" href="#为什么不做单元测试" aria-label="Permalink to &quot;为什么不做单元测试&quot;">​</a></h2><h3 id="单元测试的资料不够全面" tabindex="-1">单元测试的资料不够全面 <a class="header-anchor" href="#单元测试的资料不够全面" aria-label="Permalink to &quot;单元测试的资料不够全面&quot;">​</a></h3><p>介绍如何编码，如何使用某个框架的书很多，但是与编码同样重要的介绍单元测试的书却不多。及时有，也不够深入，仅仅介绍了如何进行单元测试，如何利用junit定义测试类，测试方法，有哪些assert,然后就没然后了。</p><h3 id="单元测试难以理解和维护" tabindex="-1">单元测试难以理解和维护 <a class="header-anchor" href="#单元测试难以理解和维护" aria-label="Permalink to &quot;单元测试难以理解和维护&quot;">​</a></h3><p>测试代码不像普通的应用程序一样有很明确的输入和输出。举个例子，假如某个函数要做如下事情：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>· 接收一个user对象作为参数</span></span>
<span class="line"><span>· 调用dao层的update方法更新用户属性</span></span>
<span class="line"><span>· 返回true/false结果</span></span></code></pre></div><p>如果要对以上以上代码做一个完整的单元测试，其中一个测试可能就是下面这个样子的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>· 假设调用dao层的update方法会返回true。</span></span>
<span class="line"><span>· 程序去调用service层的update方法。</span></span>
<span class="line"><span>· 验证一下service是不是也返回了true。</span></span></code></pre></div><p>无论是用什么样的单元测试框架，最后写出来的单元测试代码量也比业务代码只多不少。更多的代码量，加上单测代码并不像业务代码那样直观，还有对单测代码可读性不重视的坏习惯，导致最终呈现出来的单测代码难以阅读，要维护更是难上加难。</p><p>同时，大部分单元测试的框架都有很强的代码侵入性。要理解单元测试，首先得学习他用的那个单元测试框架，这无形中又增加了单元测试理解和维护的难度。</p><h3 id="单元测试难以去除依赖" tabindex="-1">单元测试难以去除依赖 <a class="header-anchor" href="#单元测试难以去除依赖" aria-label="Permalink to &quot;单元测试难以去除依赖&quot;">​</a></h3><p>如果要写一个纯粹的、无依赖的单元测试往往很困难，比如依赖了数据库、或者依赖了文件系统、再或者依赖了其它模块。实际工作过程中，还有一类难以处理的依赖问题：代码依赖。比如一个对象的方法中调用了其它对象的方法，其它对象又调用了更多对象，最后形成了一个无比巨大的调用树。后来出现了一些mock框架，比如java的JMockit、EasyMock，或者Mockito。利用这类框架可以相对比较轻松的通过mock方式去做假设和验证，相对于之前的方式有了质的飞跃。但是如果对代码的拆分和逻辑的抽象设计不合理，任何测试框架也会无能为力。</p><p>写单元测试的难易程度跟代码的质量关系最大，并且是决定性的。项目里无论用了哪个测试框架都不能解决代码本身难以测试的问题，所以如果你遇到的是“我的代码里依赖的东西太多了所以写不出来单测”这样的问题的话，需要去看的是如何设计和重构代码。</p><h2 id="如何做单元测试" tabindex="-1">如何做单元测试 <a class="header-anchor" href="#如何做单元测试" aria-label="Permalink to &quot;如何做单元测试&quot;">​</a></h2><h3 id="写单元测试的时机" tabindex="-1">写单元测试的时机 <a class="header-anchor" href="#写单元测试的时机" aria-label="Permalink to &quot;写单元测试的时机&quot;">​</a></h3><ul><li><p>当程序需要被其他程序调用的时候</p></li><li><p>修复BUG前</p></li><li><p>需求变更的时候</p></li></ul><h3 id="如何衡量单元测试" tabindex="-1">如何衡量单元测试 <a class="header-anchor" href="#如何衡量单元测试" aria-label="Permalink to &quot;如何衡量单元测试&quot;">​</a></h3><p>优秀的单元测试的特性</p><ul><li><p>测试的是一个代码单元内部的逻辑，而不是各模块之间的交互</p></li><li><p>无依赖，不需要实际运行环境就可以测试代码</p></li><li><p>运行效率高，可以随时执行</p></li></ul><h3 id="spock是什么" tabindex="-1">SPOCK是什么 <a class="header-anchor" href="#spock是什么" aria-label="Permalink to &quot;SPOCK是什么&quot;">​</a></h3><ul><li><p>Spock是Java和Groovy应用程序的测试和规范框架</p></li><li><p>测试代码使用基于groovy语言扩展而成的规范说明语言（specification language）</p></li><li><p>通过junit runner调用测试，兼容绝大部分junit的运行场景（ide，构建工具，持续集成等）</p></li><li><p>框架的设计思路参考了JUnit，jMock，RSpec，Groovy，Scala，Vulcans</p></li></ul><h4 id="groovy" tabindex="-1">Groovy <a class="header-anchor" href="#groovy" aria-label="Permalink to &quot;Groovy&quot;">​</a></h4><ul><li><p>以“扩展JAVA”为目的而设计的JVM语言</p></li><li><p>JAVA开发者友好</p></li><li><p>可以使用java语法与API</p></li><li><p>语法精简，表达性强</p></li><li><p>典型应用：jenkins,elasticsearch,gradle,grails</p></li></ul><h4 id="specification-language" tabindex="-1">specification language <a class="header-anchor" href="#specification-language" aria-label="Permalink to &quot;specification language&quot;">​</a></h4><p>specification 来源于近期流行起来写的BDD（Behavior-driven development 行为驱动测试）</p><p>通过某种规范说明语言去描述程序“应该”做什么，再通过一个测试框架读取这些描述、并验证应用程序是否符合预期。</p><h3 id="为什么是spock" tabindex="-1">为什么是SPOCK <a class="header-anchor" href="#为什么是spock" aria-label="Permalink to &quot;为什么是SPOCK&quot;">​</a></h3><p>上面提到那个例子，如果用spock实现，代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>def &quot;isUserEnabled should return true only if user status is enabled&quot;() {</span></span>
<span class="line"><span>    given:</span></span>
<span class="line"><span>    UserInfo userInfo = new UserInfo(</span></span>
<span class="line"><span>            status: actualUserStatus</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>    userDao.getUserInfo(_) &gt;&gt; userInfo;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    expect:</span></span>
<span class="line"><span>    userService.isUserEnabled(1l) == expectedEnabled;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    where:</span></span>
<span class="line"><span>    actualUserStatus   | expectedEnabled</span></span>
<span class="line"><span>    UserInfo.ENABLED   | true</span></span>
<span class="line"><span>    UserInfo.INIT      | false</span></span>
<span class="line"><span>    UserInfo.CLOSED    | false</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这段代码实际是3个测试：当getUserInfo返回的用户状态分别为ENABLED、INIT和CLOSED时，验证各自isUserEnabled函数的返回是否符合期待。</p><p>SPOCK优点如下：</p><ul><li><p>spock框架使用标签分隔单元测试中不同的代码，更加规范，也符合实际写单元测试的思路</p></li><li><p>代码写起来更简洁、优雅、易于理解</p></li><li><p>由于使用groovy语言，所以也可以享受到脚本语言带来的便利</p></li><li><p>底层基于jUnit，不需要额外的运行框架</p></li><li><p>已趋于成熟</p></li></ul><p>SPOCK缺点：</p><ul><li><p>需要了解groovy语言</p></li><li><p>与其它java的测试框架风格相差比较大，需要适应</p></li></ul><p>这些缺点比起spock提供的易于开发和维护的单元测试代码来说，都是可以忽略的。</p><h3 id="spock中概念" tabindex="-1">SPOCK中概念 <a class="header-anchor" href="#spock中概念" aria-label="Permalink to &quot;SPOCK中概念&quot;">​</a></h3><h4 id="specification" tabindex="-1">Specification <a class="header-anchor" href="#specification" aria-label="Permalink to &quot;Specification&quot;">​</a></h4><p>在Spock中，待测系统(system under test; SUT) 的行为是由规格(specification) 所定义的。在使用Spock框架编写测试时，测试类需要继承自Specification类。</p><h4 id="fields" tabindex="-1">Fields <a class="header-anchor" href="#fields" aria-label="Permalink to &quot;Fields&quot;">​</a></h4><p>Specification类中可以定义字段，这些字段在运行每个测试方法前会被重新初始化，跟放在setup()里是一个效果。</p><h4 id="fixture-methods" tabindex="-1">Fixture Methods <a class="header-anchor" href="#fixture-methods" aria-label="Permalink to &quot;Fixture Methods&quot;">​</a></h4><p>预先先定义的几个固定的函数，与junit或testng中类似</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>def setup() {}          // run before every feature method</span></span>
<span class="line"><span>def cleanup() {}        // run after every feature method</span></span>
<span class="line"><span>def setupSpec() {}     // run before the first feature method</span></span>
<span class="line"><span>def cleanupSpec() {}   // run after the last feature method</span></span></code></pre></div><h4 id="blocks" tabindex="-1">blocks <a class="header-anchor" href="#blocks" aria-label="Permalink to &quot;blocks&quot;">​</a></h4><p>每个feature method又被划分为不同的block，不同的block处于测试执行的不同阶段，在测试运行时，各个block按照不同的顺序和规则被执行</p><p>介绍下每个block。</p><p>setup / given</p><p>setup也可以写成given，在这个block中会放置与这个测试函数相关的初始化程序</p><p>when ... then ...</p><p>when与then需要搭配使用，在when中执行待测试的函数，在then中判断是否符合预期</p><p>expert</p><p>expect可以看做精简版的when+then</p><p>thrown</p><p>如果要验证有没有抛出异常，可以用thrown(),例如</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>when:</span></span>
<span class="line"><span>stack.pop()  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>then:</span></span>
<span class="line"><span>thrown(EmptyStackException)</span></span>
<span class="line"><span>stack.empty</span></span></code></pre></div><p>如果要获取抛出的异常，可以用如下语法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>when:</span></span>
<span class="line"><span>stack.pop()  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>then:</span></span>
<span class="line"><span>def e = thrown(EmptyStackException)</span></span>
<span class="line"><span>e.cause == null</span></span></code></pre></div><p>如果要验证没有抛出某种异常，可以用notThrown()</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>def &quot;HashMap accepts null key&quot;() {</span></span>
<span class="line"><span>  setup:</span></span>
<span class="line"><span>  def map = new HashMap()  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>  when:</span></span>
<span class="line"><span>  map.put(null, &quot;elem&quot;)  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>  then:</span></span>
<span class="line"><span>  notThrown(NullPointerException)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Cleanup</p><p>函数退出前做一些清理工作，如关闭资源等。</p><p>Where</p><p>做测试时最复杂的事情之一就是准备测试数据，尤其是要测试边界条件、测试异常分支等，这些都需要在测试之前规划好数据。但是传统的测试框架很难轻松的制造数据，要么依赖反复调用，要么用xml或者data provider函数之类难以理解和阅读的方式。比如说：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class MathSpec extends Specification {</span></span>
<span class="line"><span>    def &quot;maximum of two numbers&quot;() {</span></span>
<span class="line"><span>        expect:</span></span>
<span class="line"><span>        // exercise math method for a few different inputs</span></span>
<span class="line"><span>        Math.max(1, 3) == 3</span></span>
<span class="line"><span>        Math.max(7, 4) == 7</span></span>
<span class="line"><span>        Math.max(0, 0) == 0</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>而在spock中，通过where block可以让这类需求实现起来变得非常优雅</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class DataDriven extends Specification {</span></span>
<span class="line"><span>    def &quot;maximum of two numbers&quot;() {</span></span>
<span class="line"><span>        expect:</span></span>
<span class="line"><span>        Math.max(a, b) == c</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        where:</span></span>
<span class="line"><span>        a | b || c</span></span>
<span class="line"><span>        3 | 5 || 5</span></span>
<span class="line"><span>        7 | 0 || 7</span></span>
<span class="line"><span>        0 | 0 || 0</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上述例子实际会跑三次测试，相当于在for循环中执行三次测试，a/b/c的值分别为3/5/5,7/0/7和0/0/0。如果在方法前声明@Unroll，则会当成三个方法运行。如</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class DataDriven extends Specification {</span></span>
<span class="line"><span>    @Unroll</span></span>
<span class="line"><span>    def &quot;maximum of #a and #b should be #c&quot;() {</span></span>
<span class="line"><span>        expect:</span></span>
<span class="line"><span>        Math.max(a, b) == c</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        where:</span></span>
<span class="line"><span>        a | b || c</span></span>
<span class="line"><span>        3 | 5 || 5</span></span>
<span class="line"><span>        7 | 0 || 7</span></span>
<span class="line"><span>        0 | 0 || 0</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>mock</p><p>在spock中创建一个mock对象非常简单：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class PublisherSpec extends Specification {</span></span>
<span class="line"><span>    Publisher publisher = new Publisher()</span></span>
<span class="line"><span>    Subscriber subscriber = Mock()</span></span>
<span class="line"><span>    Subscriber subscriber2 = Mock()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def setup() {</span></span>
<span class="line"><span>        publisher.subscribers.add(subscriber)</span></span>
<span class="line"><span>        publisher.subscribers.add(subscriber2)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>创建了mock对象之后就可以对它的交互做验证了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>def &quot;should send messages to all subscribers&quot;() {</span></span>
<span class="line"><span>    when:</span></span>
<span class="line"><span>    publisher.send(&quot;hello&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    then:</span></span>
<span class="line"><span>    1 * subscriber.receive(&quot;hello&quot;)</span></span>
<span class="line"><span>    1 * subscriber2.receive(&quot;hello&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面的例子里验证了：在publisher调用send时，两个subscriber都应该被调用一次receive(“hello”)。</p><p>示例中，表达式中的次数、对象、函数和参数部分都可以灵活定义。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1 * subscriber.receive(&quot;hello&quot;)      // exactly one call</span></span>
<span class="line"><span>0 * subscriber.receive(&quot;hello&quot;)      // zero calls</span></span>
<span class="line"><span>(1..3) * subscriber.receive(&quot;hello&quot;) // between one and three calls (inclusive)</span></span>
<span class="line"><span>(1.._) * subscriber.receive(&quot;hello&quot;) // at least one call</span></span>
<span class="line"><span>(_..3) * subscriber.receive(&quot;hello&quot;) // at most three calls</span></span>
<span class="line"><span>_ * subscriber.receive(&quot;hello&quot;)      // any number of calls, including zero</span></span>
<span class="line"><span>1 * subscriber.receive(&quot;hello&quot;)     // an argument that is equal to the String &quot;hello&quot;</span></span>
<span class="line"><span>1 * subscriber.receive(!&quot;hello&quot;)    // an argument that is unequal to the String &quot;hello&quot;</span></span>
<span class="line"><span>1 * subscriber.receive()            // the empty argument list (would never match in our example)</span></span>
<span class="line"><span>1 * subscriber.receive(_)           // any single argument (including null)</span></span>
<span class="line"><span>1 * subscriber.receive(*_)          // any argument list (including the empty argument list)</span></span>
<span class="line"><span>1 * subscriber.receive(!null)       // any non-null argument</span></span>
<span class="line"><span>1 * subscriber.receive(_ as String) // any non-null argument that is-a String</span></span>
<span class="line"><span>1 * subscriber.receive({ it.size() &gt; 3 }) // an argument that satisfies the given predicate</span></span>
<span class="line"><span>                                          // (here: message length is greater than 3)</span></span>
<span class="line"><span>1 * subscriber._(*_)     // any method on subscriber, with any argument list</span></span>
<span class="line"><span>1 * subscriber._         // shortcut for and preferred over the above</span></span>
<span class="line"><span>1 * _._                  // any method call on any mock object</span></span>
<span class="line"><span>1 * _                    // shortcut for and preferred over the above</span></span></code></pre></div><p>得益于groovy脚本语言的特性，在定义交互的时候不需要对每个参数指定类型</p><p>Stubbing</p><p>对mock对象定义函数的返回值可以用如下方法。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>subscriber.receive(_) &gt;&gt; &quot;ok&quot;</span></span></code></pre></div><p>符号“&gt;&gt;” 代表函数的返回值，执行上面的代码后，再调用subscriber.receice方法将返回ok。如果要每次调用返回不同结果，可以使用“&gt;&gt;&gt;”：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>subscriber.receive(_) &gt;&gt;&gt; [&quot;ok&quot;, &quot;error&quot;, &quot;error&quot;, &quot;ok&quot;]</span></span></code></pre></div><p>如果需要抛出异常。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>subscriber.receive(_) &gt;&gt; { throw new InternalError(&quot;ouch&quot;) }</span></span></code></pre></div><h4 id="block总结" tabindex="-1">block总结 <a class="header-anchor" href="#block总结" aria-label="Permalink to &quot;block总结&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@Title(&quot;测试的标题&quot;)</span></span>
<span class="line"><span>@Narrative(&quot;&quot;&quot;关于测试的大段文本描述&quot;&quot;&quot;)</span></span>
<span class="line"><span>@Subject(Adder)  //标明被测试的类是Adder</span></span>
<span class="line"><span>@Stepwise  //当测试方法间存在依赖关系时，标明测试方法将严格按照其在源代码中声明的顺序执行</span></span>
<span class="line"><span>class TestCaseClass extends Specification {  </span></span>
<span class="line"><span>  @Shared //在测试方法之间共享的数据</span></span>
<span class="line"><span>  SomeClass sharedObj</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  def setupSpec() {</span></span>
<span class="line"><span>    //TODO: 设置每个测试类的环境</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  def setup() {</span></span>
<span class="line"><span>    //TODO: 设置每个测试方法的环境，每个测试方法执行一次</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @Ignore(&quot;忽略这个测试方法&quot;)</span></span>
<span class="line"><span>  @Issue([&quot;问题#23&quot;,&quot;问题#34&quot;])</span></span>
<span class="line"><span>  def &quot;测试方法1&quot; () {</span></span>
<span class="line"><span>    given: &quot;给定一个前置条件&quot;</span></span>
<span class="line"><span>    //TODO: code here</span></span>
<span class="line"><span>    and: &quot;其他前置条件&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    expect: &quot;随处可用的断言&quot;</span></span>
<span class="line"><span>    //TODO: code here</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    when: &quot;当发生一个特定的事件&quot;</span></span>
<span class="line"><span>    //TODO: code here</span></span>
<span class="line"><span>    and: &quot;其他的触发条件&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    then: &quot;产生的后置结果&quot;</span></span>
<span class="line"><span>    //TODO: code here</span></span>
<span class="line"><span>    and: &quot;同时产生的其他结果&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    where: &quot;不是必需的测试数据&quot;</span></span>
<span class="line"><span>    input1 | input2 || output</span></span>
<span class="line"><span>     ...   |   ...  ||   ...   </span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @IgnoreRest //只测试这个方法，而忽略所有其他方法</span></span>
<span class="line"><span>  @Timeout(value = 50, unit = TimeUnit.MILLISECONDS)  // 设置测试方法的超时时间，默认单位为秒</span></span>
<span class="line"><span>  def &quot;测试方法2&quot;() {</span></span>
<span class="line"><span>    //TODO: code here</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  def cleanup() {</span></span>
<span class="line"><span>    //TODO: 清理每个测试方法的环境，每个测试方法执行一次</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  def cleanupSepc() {</span></span>
<span class="line"><span>    //TODO: 清理每个测试类的环境</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,103)])])}const b=a(l,[["render",i]]);export{d as __pageData,b as default};
