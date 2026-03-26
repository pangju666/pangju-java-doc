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
    time-zone: Asia/Shanghai
    # 设置时间格式
    date-format: yyyy-MM-dd HH:mm:ss
    # 设置语言
    locale: CHINESE
    # 时间序列化策略
    datatype:
      datetime:
        write-dates-as-timestamps: true
        #write-date-timestamps-as-nanoseconds: false
```

