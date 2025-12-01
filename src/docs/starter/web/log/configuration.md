---
layout: doc
---

# 自动装配

## 配置
```yaml
pangju:
    web:
      log:
        enabled: true # 启用web日志收集
        sender-type: disruptor # 日志发送器类型，默认为slf4J（可选值：disruptor、kafka）
        receiver-type: slf4j # 日志接收器类型，默认为slf4J（可选值：slf4J、mongoDb）
        kafka: # Kafka 日志发送器配置
          kafka-template-ref: myKafkaTemplate # 用于指定要使用的 KafkaTemplate 实例。如果未指定，则默认使用应用中存在的 KafkaTemplate
          topic: web-log # 日志发送目标 Topic
        mongo: # MongoDB 日志收集器配置
          mongo-template-ref: myMongoTemplate # 用于指定应用中某个 MongoTemplate 实例来操作 MongoDB 集合。如果未指定，则使用默认的 MongoTemplate
          base-collection-name: web-log # MongoDB 日志集合的基础名称，默认 web-log。实际集合名可据模块或业务在此基础上扩展。
        disruptor: # disruptor 日志发送器配置
          buffer-size: 1024 # 定义 Disruptor 使用的缓冲区大小。默认为 1024。缓冲区大小应为 2 的指数倍，以获得最佳性能
        slf4j: # slf4J 日志收集器配置
          logger: WebLogLogger # 目标日志记录器名称，用于将采集的网络日志写入日志系统
        request: # 请求信息收集设置
          headers: true # 启用收集请求头，默认为true
          query-params: true # 启用收集请求参数，默认为true
          body: true # 启用收集请求体，默认为true
          multipart: true # 启用收集文件上传信息，默认为true
          acceptable-media-types: # 允许采集的请求体媒体类型集合，默认收集 application/json 和 text/plain 类型请求体
            - application/json
            - text/plain
        response: # 响应信息收集设置
          headers: true  # 启用收集响应头，默认为true
          body: true # 启用收集响应体，默认为true
          result-data: true # 启用收集统一返回结构的data数据，默认为true
          acceptable-media-types: # 允许采集的响应体媒体类型集合，默认收集 application/json 和 text/plain 类型请求体
            - application/json
            - text/plain
        # 当请求路径匹配任一模式时，该请求的 Web 日志将不会被采集    
        exclude-path-patterns: # 日志采集排除路径模式集合，用于排除不需要记录的请求路径（如健康检查、监控与文档访问）。
          - /actuator/**
          - /swagger-ui/**
          - /v3/api-docs/**
          - /favicon.ico
```


## 注解
`io.github.pangju666.framework.boot.web.log.annotation.WebLogOperation`

### 概述
用于标识控制器方法的业务功能描述。

### 使用示例
```java
@WebLogOperation("测试接口")
@PostMapping("/test3")
public UserVO test3(@RequestBody UserVO userVO) {
	return userVO;
}
```

## 日志结构
`io.github.pangju666.framework.boot.web.log.model.WebLog`

```json
{
  "ip": "127.0.0.1", // 客户端ip地址
  "url": "/api/test", // 请求链接
  "method": "GET", // 请求方法
  "date": "2025-11-21 01:27:57", // 请求时间
  "costMillis": 54, // 请求耗费时间（单位：毫秒）
  "operation": "operation_a9262fe84bde", // 请求业务操作说明
  "request": { // 请求信息
      "headers": { // 请求头信息
          "user-agent": [
              "PostmanRuntime/7.49.1"
          ],
          "accept": [
              "*/*"
          ],
          "postman-token": [
              "8fee8ad6-40f7-4901-a4cf-f21a9b85b88c"
          ],
          "host": [
              "127.0.0.1"
          ],
          "accept-encoding": [
              "gzip, deflate, br"
          ],
          "connection": [
              "keep-alive"
          ]
      },
    "queryParams": {}, // 查询参数信息
    "characterEncoding": "UTF-8", // 请求字符编码
    "fileParts": {}, // 上传文件信息
    "contentLength": -1, // 请求体字节长度，未设置时为-1
    "contentType": "contentType_e1769551d15d", // 请求体类型
    "body": {} // 请求体信息
  },
  "response": { // 响应信息
    "status": 200, // http响应状态码
    "contentType": "application/json;charset=UTF-8", // 响应体类型
    "characterEncoding": "UTF-8", // 响应字符编码
    "headers": { // 响应头信息
        "Vary": [
            "Origin",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers"
        ],
        "Content-Length": [
            "47"
        ]
    },
    "body": {  // 响应体信息
        "code": 0,
        "message": "请求成功"
    },
    "location": "location_cfc4096691fa" // 重定向地址，不存在时为 null
  },
  "expandData": {} // 拓展数据，一般由 WebLogHandler 写入
}
```


## 日志发送器
在收集到日志后发送的逻辑定义，需要与日志接收器协同使用。

我内置了`Disruptor`和`Kafka`两种实现。

> [!TIP]
> 接口并发量高的情况下，建议使用`Kafka`实现。

### 接口定义
```java
public interface WebLogSender {
	void send(WebLog webLog) throws Exception;
}
```

### 自定义实现
你也可以自定义实现自己的日志发送器，来替换掉内置的实现。

```java
public class CustomWebLogSender implements WebLogSender {
    // 注入日志接收器的实现
	private final WebLogReceiver receiver;
		
	public CustomWebLogSender(WebLogReceiver receiver) {
		this.receiver = receiver;
	}
		
	@Override
	public void send(WebLog webLog) throws Exception {
	    //... 自定义逻辑
	    // 将日志发给接收器
		receiver.receive(webLog);
	}
}

@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public CustomWebLogSender customWebLogSender(WebLogReceiver receiver) {
		return new CustomWebLogSender(receiver);
	}
}
```

## 日志接收器
在从日志发送器中收到日志后的存储逻辑定义，需要与日志发送器协同使用。

我内置了`Slf4j`和`MongoDB`两种实现。

> [!TIP]
> 生产环境下建议使用`MongoDB`实现。
> 
> 如果不考虑日志可查询化的话，用`Slf4j`实现也行。
> 
> `MongoDB`存储日志的集合名为：配置中的集合名称 + 日期（yyyy-MM-dd 格式）

### 接口定义
```java
public interface WebLogReceiver {
	void receive(WebLog webLog);
}
```

### 自定义实现
你也可以自定义实现自己的日志接收器，来替换掉内置的实现。

```java
public class CustomWebLogReceiver implements WebLogReceiver {
    @Override
	public void receive(WebLog webLog) {
        //... 自定义逻辑
	}
}

@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public CustomWebLogReceiver customWebLogReceiver() {
		return new CustomWebLogReceiver(receiver);
	}
}
```

### Logback配置
```xml
<!-- 请求日志专用 Appender -->
<appender name="WEB_LOG_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>E:/logs/web/web.log</file>
    <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
        <fileNamePattern>E:/logs/web/web.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
        <maxFileSize>500MB</maxFileSize>
        <maxHistory>30</maxHistory>
        <totalSizeCap>10GB</totalSizeCap>
    </rollingPolicy>
    <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
        <pattern>%msg%n</pattern>
        <charset>UTF-8</charset>
    </encoder>
</appender>

<!-- 绑定专用 Logger -->
<logger name="WebLogLogger" level="INFO" additivity="false">
    <appender-ref ref="WEB_LOG_FILE"/>
</logger>
```

### Log4j配置
```xml
<Appenders>
    <!-- 请求日志专用 Appender -->
    <RollingFile name="WEB_LOG_FILE" fileName="E:/logs/web/web.log" filePattern="E:/logs/web/web.%d{yyyy-MM-dd}.%i.log">
        <PatternLayout pattern="%msg%n" charset="UTF-8"/>
        <Policies>
            <SizeBasedTriggeringPolicy size="500MB"/>
            <TimeBasedTriggeringPolicy interval="1" modulate="true"/>
        </Policies>
        <DefaultRolloverStrategy max="30">
            <!-- totalSizeCap 在 Log4j2 中需通过自定义删除动作实现 -->
            <Delete basePath="E:/logs/web" maxDepth="1">
                <IfFileName glob="web.*.log"/>
                <IfAccumulatedFileSize exceeds="10GB"/>
            </Delete>
        </DefaultRolloverStrategy>
     </RollingFile>
</Appenders>

<Loggers>
    <!-- 绑定专用 Logger -->
    <Logger name="WebLogLogger" level="info" additivity="false">
        <AppenderRef ref="WEB_LOG_FILE"/>
    </Logger>
</Loggers>
```

```yaml
Appenders:
  RollingFile:
    - name: webLogFile
      fileName: E:/logs/web/web.log
      filePattern: E:/logs/web/web.%d{yyyy-MM-dd}.%i.log
      PatternLayout:
        pattern: "%msg%n"
        charset: UTF-8
      Policies:
        SizeBasedTriggeringPolicy:
          size: 500MB
        TimeBasedTriggeringPolicy:
          interval: 1
          modulate: true
      DefaultRolloverStrategy:
        max: 30
        Delete:
          basePath: E:/logs/web/
          maxDepth: 1
          IfFileName:
            glob: "web.*.log"
          IfAccumulatedFileSize:
            exceeds: 10GB
Loggers:
  Logger:
    - name: WebLogLogger
      level: info
      additivity: false
      AppenderRef:
        - ref: webLogFile
```

## 请求/响应内容处理器
用于处理如何将请求体或响应体字节数组转换为可`JSON`序列化的值。

我内置了`Text`和`JSON`两种类型的处理。

> [!TIP]
> 如果被一种处理器处理后不会再被其他处理器处理。
>
> 需要将实现注册为`Bean`，注入到`Spring`容器之中。

### 接口定义
```java
public interface MediaTypeBodyHandler {
    boolean supports(MediaType mediaType);

    Object getBody(byte[] rawBody, MediaType mediaType);
}
```

### 替换默认实现
如果你想对`Text`或`JSON`类型做自定义处理，需要替换掉我的实现。

```java
public class CustomJsonBodyHandler extends JsonBodyHandler {
	@Override
	public Object getBody(byte[] rawBody, MediaType mediaType) {
		// ... 自定义处理
	}
}

@SpringBootConfiguration
public class BeanConfig {
	@Bean
	public CustomJsonBodyHandler customJsonBodyHandler() {
		return new CustomJsonBodyHandler();
	}
}
```

## 日志自定义处理器
在收集到日志后用户对日志做自定义处理的逻辑定义。

主要用于写入一些业务性信息，比如：敏感信息脱敏、记录用户ID之类的。

> [!TIP]
> 使用责任链模式处理，日志会被每种处理器都处理一次。
> 
> 需要将实现注册为`Bean`，注入到`Spring`容器之中。

### 接口定义
```java
public interface WebLogHandler {
    void handle(WebLog webLog, Class<?> targetClass, Method targetMethod);
}
```

