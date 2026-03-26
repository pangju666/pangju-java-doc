---
layout: doc
---

# ID

## 说明

| 类名                | 类型    |                   用途                   |
|-------------------|:------|:--------------------------------------:|
| NanoId            | ID生成器 |  NanoId，一个小型、安全、对 URL友好的唯一字符串 ID 生成器   |
| SnowflakeIdWorker | ID生成器 | 雪花算法用于生成全局唯一的 64 位长整型 ID，具有高效性和分布式可用性。 |
| IdUtils           | 工具类   |                 ID工具类                  |

## ID生成器

### NanoId
`io.github.pangju666.commons.lang.id.NanoId`

从[HuTool](https://github.com/chinabugotech/hutool/blob/5.8.36/hutool-core/src/main/java/cn/hutool/core/lang/id/NanoId.java)拷贝的，来源于`cn.hutool.core.lang.id.NanoId`

```java
// 默认生成
String id= NanoId.randomNanoId(); // JbGrz4S5i7I2F8pRcT68Z

// 指定ID长度
String id2= NanoId.randomNanoId(21); // 7cw4-S5lBKcrpnx7qNY8z

// 指定ID长度和随机字符表
String id3= NanoId.randomNanoId(new SecureRandom(), "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray(), 21); // OHZZDEy2sqw75QlxWEiLL
```

### 雪花ID
`io.github.pangju666.commons.lang.id.SnowflakeIdWorker`

我用`ChatGpt`生成的

```java
// 根据机器ID(0-31)和数据中心ID(0-31)构建示例
SnowflakeIdWorker idWorker1 = new SnowflakeIdWorker(0, 0);
long id1 = idWorker1.nextId(); // 1981821290104750080

// 根据机器ID(0-31)、数据中心ID(0-31)和初始时间戳构建示例
SnowflakeIdWorker idWorker2 = new SnowflakeIdWorker(0, 0, DateUtils.addHours(new Date(), -1).getTime());
long id2 = idWorker2.nextId(); // 15099590868992
```

## 工具类
`io.github.pangju666.commons.lang.utils.IdUtils`

| 方法名              | 返回值    |         用途          |
|------------------|:-------|:-------------------:|
| randomUUID       | String |    生成标准格式随机UUID     |
| simpleRandomUUID | String |    生成简写格式随机UUID     |
| fastUUID         | String |    生成高性能标准格式UUID    |
| simpleFastUUID   | String |    生成高性能简写格式UUID    |
| objectId         | String | 生成MongoDB风格ObjectId |
| nanoId           | String |      生成NanoId       |

### UUID
```java
// 生成标准格式随机UUID
IdUtils.randomUUID(); // 8cafe526-20b3-4011-ab11-fdc77e4fc15b

// 生成简写格式随机UUID
IdUtils.simpleRandomUUID(); // 07dff44684e345f39176c14ebd6f338a

// 生成高性能标准格式UUID
IdUtils.fastUUID(); // dd2796ab-6bf6-4ebf-a3bf-06cb947d9096

// 生成高性能简写格式UUID
IdUtils.simpleFastUUID(); // 214e9a7664ba42b08b71f3f34d803993
```

### MongoDB风格ObjectId
```java
IdUtils.objectId(); // 68fbe63a64397a283e4c18f6
```

### NanoId
```java
// 生成默认长度的NanoId
IdUtils.nanoId(); // Vl4lf12zuPM2fY74vmIgt

// 生成指定长度的NanoId
IdUtils.nanoId(21); // Vl4lf12zuPM2fY74vmIgt
```
