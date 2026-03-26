---
layout: doc
---

# IP地址
`io.github.pangju666.framework.web.utils.IpUtils`

基于`IPAddressString`实现IP地址操作，支持IPv4和IPv6地址格式。

| 方法名                         | 返回值         |              说明               |
|-----------------------------|:------------|:-----------------------------:|
| isUnknown                   | boolean     |         判断IP地址是否为未知状态         |
| getLocalHostInetAddress     | InetAddress |          获取本地主机的IP地址          |
| getLocalHostAddress         | String      |        获取本地主机的IP地址字符串         |
| isIpv4                      | boolean     |     判断给定的字符串是否为有效的IPv4地址      |
| isIpv6                      | boolean     |     判断给定的字符串是否为有效的IPv6地址      |
| isValid                     | boolean     | 判断给定的字符串是否为有效的IP地址（IPv4或IPv6） |
| toBytes                     | byte[]      |         将IP地址转换为字节数组          |
| isIpInNetwork               | boolean     |       判断IP地址是否在指定网络范围内        |
| isInternalIpv4              | boolean     |       判断IP地址是否为内部IPv4地址       |
| getMultistageReverseProxyIp | String      |          获取多级反向代理的IP          |

## 判断IP

### 是否为未知
代码来源于 [RuoYi Common IpUtils](https://github.com/yangzongzhuan/RuoYi/blob/master/ruoyi-common/src/main/java/com/ruoyi/common/utils/IpUtils.java")

判断IP地址是否为未知状态，检查给定的IP地址是否为空白或"unknown"（不区分大小写）。 

> [!NOTE]
> 这通常用于处理代理服务器传递的IP信息，代理服务器可能在无法确定客户端IP时使用"unknown"标记。

### 是否为IPV4
判断给定的字符串是否为有效的IPv4地址

```java
boolean isV4_1 = IpUtils.isIpv4("192.168.1.1");   // 返回 true
boolean isV4_2 = IpUtils.isIpv4("0.0.0.0");       // 返回 true
boolean isV4_3 = IpUtils.isIpv4("256.0.0.1");     // 返回 false（超出范围）
boolean isV4_4 = IpUtils.isIpv4("192.168.1");     // 返回 false（段数不足）
boolean isV4_5 = IpUtils.isIpv4("::1");           // 返回 false（IPv6地址）
```

### 是否为IPV6
判断给定的字符串是否为有效的IPv6地址

```java
boolean isV6_1 = IpUtils.isIpv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334");  // 返回 true
boolean isV6_2 = IpUtils.isIpv6("::1");                  // 返回 true（本地环回地址）
boolean isV6_3 = IpUtils.isIpv6("2001:db8::");           // 返回 true（压缩格式）
boolean isV6_4 = IpUtils.isIpv6("192.168.1.1");          // 返回 false（IPv4地址）
boolean isV6_5 = IpUtils.isIpv6("2001:db8:g1::");        // 返回 false（非法字符）
```

### 是否有效
判断给定的字符串是否为有效的IP地址（IPv4或IPv6）

```java
boolean isValid1 = IpUtils.isValid("192.168.1.1");                         // 返回 true（IPv4）
boolean isValid2 = IpUtils.isValid("2001:0db8:85a3:0000:0000:8a2e:0370:7334"); // 返回 true（IPv6）
boolean isValid3 = IpUtils.isValid("::1");                                 // 返回 true（IPv6压缩格式）
boolean isValid4 = IpUtils.isValid("256.0.0.1");                           // 返回 false（无效IPv4）
boolean isValid5 = IpUtils.isValid("hello");                               // 返回 false（非IP格式）
```

### 是否在指定网络范围内
该方法检查指定的IP地址是否包含在给定的网络地址范围内。
网络地址可以是`CIDR`格式、`通配符`格式或`IP范围`格式等，具体请参阅[IPAddressString](https://seancfoley.github.io/IPAddress/)文档。

```java
// 使用CIDR格式
boolean inNetwork1 = IpUtils.isIpInNetwork("192.168.1.0/24", "192.168.1.100");  // 返回 true
boolean inNetwork2 = IpUtils.isIpInNetwork("192.168.1.0/24", "192.168.2.1");    // 返回 false

// 使用IPv6网络
boolean inNetwork3 = IpUtils.isIpInNetwork("2001:db8::/64", "2001:db8::1");     // 返回 true
boolean inNetwork4 = IpUtils.isIpInNetwork("2001:db8::/64", "2001:db9::1");     // 返回 false

// 使用单个IP
boolean inNetwork5 = IpUtils.isIpInNetwork("192.168.1.1", "192.168.1.1");       // 返回 true

// 使用通配符
boolean inNetwork = IpUtils.isIpInNetwork("192.168.1.*", "192.168.1.100");  // 返回 true
boolean inNetwork = IpUtils.isIpInNetwork("192.168.*.100", "192.168.11.100");  // 返回 true

// 使用范围分隔符
boolean inNetwork = IpUtils.isIpInNetwork("192.168.1.1-255", "192.168.1.100");  // 返回 true
```

### 是否为内部IPv4地址
根据[RuoYi Common IpUtils](https://github.com/yangzongzhuan/RuoYi/blob/master/ruoyi-common/src/main/java/com/ruoyi/common/utils/IpUtils.java")修改

检查给定的IPV4地址是否为本地网络内的地址，包括环回地址、私有网络地址等。

```java
boolean isInternal1 = IpUtils.isInternalIpv4("127.0.0.1");    // 返回 true（本地回环地址）
boolean isInternal2 = IpUtils.isInternalIpv4("10.0.0.1");     // 返回 true（A类私有地址）
boolean isInternal3 = IpUtils.isInternalIpv4("172.16.0.1");   // 返回 true（B类私有地址）
boolean isInternal4 = IpUtils.isInternalIpv4("192.168.0.1");  // 返回 true（C类私有地址）
boolean isInternal5 = IpUtils.isInternalIpv4("8.8.8.8");      // 返回 false（公网IP地址）
```

## 获取本地主机的IP地址

### IP地址
获取本地主机的IP地址，返回第一个可用的非环回、非虚拟网络接口的IP地址，如果没有找到合适的地址则返回`null`。

```java
try {
    InetAddress address = IpUtils.getLocalHostInetAddress();
    if (address != null) {
        System.out.println("本机IP地址: " + address.getHostAddress());
    } else {
        System.out.println("无法获取本机IP地址");
    }
} catch (SocketException e) {
    System.err.println("获取网络接口信息出错: " + e.getMessage());
}
```

### IP地址字符串
获取本地主机的IP地址，返回第一个可用的非环回、非虚拟网络接口的IP地址，如果没有找到合适的地址则返回本地主机IP常量（通常为`127.0.0.1`）。

```java
IpUtils.getLocalHostAddress(); // 192.168.1.5
```

## 获取多级反向代理的IP
代码来源于 [RuoYi Common IpUtils](https://github.com/yangzongzhuan/RuoYi/blob/master/ruoyi-common/src/main/java/com/ruoyi/common/utils/IpUtils.java")

当使用多级反向代理时，HTTP请求头中的IP地址可能包含多个IP，以逗号分隔。 

此方法从这些IP中提取第一个非未知（非`unknown`）的IP地址作为客户端的真实IP。

如果所有IP都是未知的，则返回原始IP字符串。

```java
// 单个IP地址
String ip1 = IpUtils.getMultistageReverseProxyIp("192.168.1.1");               // 返回 "192.168.1.1"

// 多级代理，第一个IP有效
String ip2 = IpUtils.getMultistageReverseProxyIp("192.168.1.1, 10.0.0.1");     // 返回 "192.168.1.1"

// 第一个IP未知，取第二个
String ip3 = IpUtils.getMultistageReverseProxyIp("unknown, 192.168.1.1");      // 返回 "192.168.1.1"

// 所有IP都未知
String ip4 = IpUtils.getMultistageReverseProxyIp("unknown, unknown, unknown"); // 返回 "unknown"

// 处理空格
String ip5 = IpUtils.getMultistageReverseProxyIp("  192.168.1.1  , 10.0.0.1"); // 返回 "192.168.1.1"
```

## IP地址转换为字节数组
```java
byte[] bytes1 = IpUtils.toBytes("192.168.1.1");  // 返回 [192, 168, 1, 1]
byte[] bytes2 = IpUtils.toBytes("127.0.0.1");    // 返回 [127, 0, 0, 1]
byte[] bytes3 = IpUtils.toBytes("::1");          // 返回 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
```
