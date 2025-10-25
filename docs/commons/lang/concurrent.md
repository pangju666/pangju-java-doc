---
layout: doc
---

# 并发

## 说明

| 类名          | 类型  |                    用途                    |
|-------------|:----|:----------------------------------------:|
| SystemClock | 工具类 | 高并发场景下System.currentTimeMillis()的性能问题的优化 |

## 工具类
`io.github.pangju666.commons.lang.concurrent.SystemClock`

从[Mybatis Plus](https://github.com/baomidou/mybatis-plus/blob/v3.5.11/mybatis-plus-core/src/main/java/com/baomidou/mybatisplus/core/toolkit/SystemClock.java)拷贝的，来源于`com.baomidou.mybatisplus.core.toolkit.SystemClock`

```java
SystemClock.now(); // 1761420256365
```

