---
layout: doc
---

# 自动装配

## 配置
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
    generator:
      # 浮点数过大时防止返回科学计数
      write-bigdecimal-as-plain: true
    mapper:
      # 不区分枚举名称大小写
      accept-case-insensitive-enums: true
      
pangju:
  jackson:
    # 将 Instant 以毫秒时间戳进行序列化/反序列化
    instant-as-timestamp: true # 是否启用，默认为true
    # 将 Date 以毫秒时间戳进行序列化/反序列化
    date-as-timestamp: true # 是否启用，默认为true
```

