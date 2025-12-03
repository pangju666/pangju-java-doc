---
layout: doc
---

# 自动装配

## 配置
`jackson`默认只允许将`instant`以秒时间戳进行序列化/反序列化，我自定义了`instant`的序列化/反序列化器来支持毫秒级时间戳

```yaml
# 我自己用的 spring jackson 配置，你们可以参考下。
spring:
  jackson:
    # 设置时区
    time-zone: GMT+8
    # 设置时间格式
    date-format: yyyy-MM-dd HH:mm:ss
    # 设置语言
    locale: CHINESE
    # 序列化策略
    serialization:
      # Date对象序列化为时间戳
      write-dates-as-timestamps: true
      # 时间戳禁止精准到纳秒
      write-date-timestamps-as-nanoseconds: false
    generator:
      # 浮点数过大时防止返回科学计数
      write-bigdecimal-as-plain: true
    mapper:
      # 不区分枚举名称大小写
      accept-case-insensitive-enums: true
      
pangju:
  jackson:
    # 将instant以毫秒时间戳进行序列化/反序列化
    instant-as-timestamp: true # 是否启用，默认为true
```

