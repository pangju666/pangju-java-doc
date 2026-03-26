export default {
    '/v1/': [
        {
            text: '依赖管理',
            collapsed: true,
            items: [
                {text: '快速开始', link: '/v1/dependencies/getting-started'},
                {text: '依赖管理', link: '/v1/dependencies/dependency-management'},
                {text: '插件管理', link: '/v1/dependencies/plugin-management'},
                {text: '更新记录', link: '/v1/dependencies/change-log'},
            ]
        },
        {
            text: '工具库',
            collapsed: true,
            items: [
                {text: '快速开始', link: '/v1/commons/getting-started'},
                {
                    text: '基础（lang）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/commons/lang/introduction'},
                        {text: '常量', link: '/v1/commons/lang/constants'},
                        {
                            text: '字符串',
                            collapsed: true,
                            items: [
                                {text: '概述', link: '/v1/commons/lang/string/introduction'},
                                {text: '脱敏', link: '/v1/commons/lang/string/desensitize'},
                                {text: '拼音', link: '/v1/commons/lang/string/pinyin'},
                                {text: '格式化', link: '/v1/commons/lang/string/format'},
                                {text: '工具类', link: '/v1/commons/lang/string/utils'},
                            ]
                        },
                        {text: '数据', link: '/v1/commons/lang/data'},
                        {text: 'JSON', link: '/v1/commons/lang/json'},
                        {text: '正则表达式', link: '/v1/commons/lang/regex'},
                        {text: 'ID', link: '/v1/commons/lang/id'},
                        {text: '身份证', link: '/v1/commons/lang/idcard'},
                        {text: '树', link: '/v1/commons/lang/tree'},
                        {text: '日期', link: '/v1/commons/lang/date'},
                        {text: '数组', link: '/v1/commons/lang/array'},
                        {text: '随机数', link: '/v1/commons/lang/random'},
                        {text: '金额', link: '/v1/commons/lang/money'},
                        {text: '序列化', link: '/v1/commons/lang/serialize'},
                        {text: '并发', link: '/v1/commons/lang/concurrent'},
                    ]
                },
                {
                    text: '校验（validation）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/commons/validation/introduction'},
                        {text: '注解', link: '/v1/commons/validation/annotation'},
                    ]
                },
                {
                    text: '加密（crypto）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/commons/crypto/introduction'},
                        {text: '常量', link: '/v1/commons/crypto/constants'},
                        {text: 'RSA密钥', link: '/v1/commons/crypto/key'},
                        {text: '加/解密', link: '/v1/commons/crypto/encryptor'},
                        {text: '签名/校验', link: '/v1/commons/crypto/digester'},
                        {text: '加密方案', link: '/v1/commons/crypto/transformation'},
                        {text: '工具类', link: '/v1/commons/crypto/utils'},
                    ]
                },
                {
                    text: 'IO（io）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/commons/io/introduction'},
                        {text: '常量', link: '/v1/commons/io/constants'},
                        {text: '文件', link: '/v1/commons/io/file'},
                        {text: 'io', link: '/v1/commons/io/io'},
                    ]
                },
                {
                    text: '压缩（compress）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/commons/compress/introduction'},
                        {text: '常量', link: '/v1/commons/compress/constants'},
                        {text: 'zip', link: '/v1/commons/compress/zip'},
                        {text: '7z', link: '/v1/commons/compress/7z'},
                        {text: 'tar', link: '/v1/commons/compress/tar'},
                        {text: 'gzip', link: '/v1/commons/compress/gzip'},
                        {text: 'xz', link: '/v1/commons/compress/xz'},
                        {text: '工具类', link: '/v1/commons/compress/utils'},
                    ]
                },
                {
                    text: '图像（image）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/commons/image/introduction'},
                        {text: '常量', link: '/v1/commons/image/constants'},
                        {text: '枚举', link: '/v1/commons/image/enums'},
                        {text: '数据结构', link: '/v1/commons/image/model'},
                        {text: '工具类', link: '/v1/commons/image/utils'},
                        {text: '图像处理', link: '/v1/commons/image/editor'},
                    ]
                },
                {
                    text: 'Office文档（poi）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/commons/poi/introduction'},
                        {text: '常量', link: '/v1/commons/poi/constants'},
                        {text: 'Excel', link: '/v1/commons/poi/excel'},
                        {text: 'Word', link: '/v1/commons/poi/word'},
                    ]
                },
                {
                    text: 'Pdf文档（pdf）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/commons/pdf/introduction'},
                        {text: '常量', link: '/v1/commons/pdf/constants'},
                        {text: 'PDF', link: '/v1/commons/pdf/pdf'},
                    ]
                },
                {
                    text: '地理信息（geo）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/commons/geo/introduction'},
                        {text: '常量', link: '/v1/commons/geo/constants'},
                        {text: '坐标', link: '/v1/commons/geo/coordinate'},
                    ]
                },
                {text: '更新记录', link: '/v1/commons/change-log'},
            ]
        },
        {
            text: "框架",
            collapsed: true,
            items: [
                {text: '快速开始', link: '/v1/framework/getting-started'},
                {
                    text: 'Spring',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/framework/spring/introduction'},
                        {text: '常量', link: '/v1/framework/spring/constants'},
                        {text: 'Bean', link: '/v1/framework/spring/bean'},
                        {text: '反射（reflect）', link: '/v1/framework/spring/reflect'},
                        {text: 'SpEL表达式', link: '/v1/framework/spring/spel'},
                    ]
                },
                {
                    text: 'Web',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/framework/web/introduction'},
                        {text: '常量', link: '/v1/framework/web/constants'},
                        {text: '客户端', link: '/v1/framework/web/client'},
                        {text: '数据结构', link: '/v1/framework/web/data'},
                        {text: '过滤器', link: '/v1/framework/web/filter'},
                        {text: '拦截器', link: '/v1/framework/web/interceptor'},
                        {text: '异常', link: '/v1/framework/web/exception'},
                        {
                            text: "工具类",
                            items: [
                                {text: '数据操作断言', link: '/v1/framework/web/data-assert'},
                                {text: 'IP地址', link: '/v1/framework/web/ip'},
                                {text: 'Http请求', link: '/v1/framework/web/request'},
                                {text: 'Http响应', link: '/v1/framework/web/response'},
                                {text: '分片下载', link: '/v1/framework/web/range'},
                            ]
                        }
                    ]
                },
                {
                    text: 'Mybatis Plus',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/framework/mybatisplus/introduction'},
                        {text: 'ID校验', link: '/v1/framework/mybatisplus/validation'},
                        {text: '数据结构', link: '/v1/framework/mybatisplus/data'},
                        {text: '实体类', link: '/v1/framework/mybatisplus/entity'},
                        {text: '类型处理器', link: '/v1/framework/mybatisplus/type-handler'},
                        {text: 'CRUD', link: '/v1/framework/mybatisplus/crud'},
                        {text: '工具类', link: '/v1/framework/mybatisplus/utils'},
                    ]
                },
                {
                    text: 'Redis',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/framework/redis/introduction'},
                        {text: '常量', link: '/v1/framework/redis/constants'},
                        {text: '序列化器', link: '/v1/framework/redis/serializer'},
                        {text: '工具类', link: '/v1/framework/redis/utils'},
                        {text: 'SCAN', link: '/v1/framework/redis/template'},
                    ]
                },
                {
                    text: 'MongoDB',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/framework/mongodb/introduction'},
                        {text: '常量', link: '/v1/framework/mongodb/constants'},
                        {text: '数据结构', link: '/v1/framework/mongodb/data'},
                        {text: '实体类', link: '/v1/framework/mongodb/document'},
                        {text: '工具类', link: '/v1/framework/mongodb/utils'},
                        {text: 'CRUD', link: '/v1/framework/mongodb/crud'},
                    ]
                },
                {text: '更新记录', link: '/v1/framework/change-log'},
            ]
        },
        {
            text: "Starter",
            collapsed: true,
            items: [
                {text: '快速开始', link: '/v1/starter/getting-started'},
                {
                    text: 'Spring',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/starter/spring/introduction'},
                        {text: '静态上下文', link: '/v1/starter/spring/context'},
                        {text: '任务执行器', link: '/v1/starter/spring/task'},
                    ]
                },
                {
                    text: '校验',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/starter/validation/introduction'},
                        {text: '自动装配', link: '/v1/starter/validation/configuration'},
                    ]
                },
                {
                    text: '加密',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/starter/crypto/introduction'},
                        {text: '加/解密器工厂', link: '/v1/starter/crypto/factory'},
                        {text: '枚举', link: '/v1/starter/crypto/enums'},
                        {text: '工具类', link: '/v1/starter/crypto/utils'},
                    ]
                },
                {
                    text: 'JSON',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/starter/json/introduction'},
                        {text: '自动装配', link: '/v1/starter/json/configuration'},
                        {text: '脱敏', link: '/v1/starter/json/desensitized'},
                        {
                            text: '加密',
                            collapsed: true,
                            items: [
                                {text: '概述', link: '/v1/starter/json/crypto/introduction'},
                                {text: '加密', link: '/v1/starter/json/crypto/encrypt'},
                                {text: '解密', link: '/v1/starter/json/crypto/decrypt'},
                                {text: '工具类', link: '/v1/starter/json/crypto/utils'},
                            ]
                        },
                    ]
                },
                {
                    text: '图像',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/starter/image/introduction'},
                        {text: '常量', link: '/v1/starter/image/constants'},
                        {text: '枚举', link: '/v1/starter/image/enums'},
                        {text: '异常', link: '/v1/starter/image/exception'},
                        {text: '数据结构', link: '/v1/starter/image/model'},
                        {text: '操作', link: '/v1/starter/image/template'},
                    ]
                },
                {
                    text: 'Mybatis Plus',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/starter/mybatisplus/introduction'},
                        {text: '自动装配', link: '/v1/starter/mybatisplus/configuration'},
                        {text: '注解', link: '/v1/starter/mybatisplus/annotation'},
                        {text: '实体类', link: '/v1/starter/mybatisplus/entity'}
                    ]
                },
                {
                    text: 'MongoDB',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/starter/mongodb/introduction'},
                        {text: '自动装配', link: '/v1/starter/mongodb/configuration'},
                        {text: '动态数据源', link: '/v1/starter/mongodb/dynamic'},
                    ]
                },
                {
                    text: 'Redis',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/starter/redis/introduction'},
                        {text: '自动装配', link: '/v1/starter/redis/configuration'},
                        {text: '动态数据源', link: '/v1/starter/redis/dynamic'},
                    ]
                },
                {
                    text: 'Web',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/starter/web/introduction'},
                        {text: '自动装配', link: '/v1/starter/web/configuration'},
                        {text: '请求参数转换', link: '/v1/starter/web/request'},
                        {text: '响应体包装', link: '/v1/starter/web/response'},
                        {text: '异常处理', link: '/v1/starter/web/exception'},
                        {
                            text: '加密',
                            collapsed: true,
                            items: [
                                {text: '概述', link: '/v1/starter/web/crypto/introduction'},
                                {text: '加密', link: '/v1/starter/web/crypto/encrypt'},
                                {text: '解密', link: '/v1/starter/web/crypto/decrypt'}
                            ]
                        },
                        {
                            text: '校验',
                            collapsed: true,
                            items: [
                                {text: '概述', link: '/v1/starter/web/validation/introduction'},
                                {text: '接口签名', link: '/v1/starter/web/validation/signature'},
                                {text: '接口限流', link: '/v1/starter/web/validation/limit'},
                            ]
                        },
                        {
                            text: '日志',
                            collapsed: true,
                            items: [
                                {text: '概述', link: '/v1/starter/web/log/introduction'},
                                {text: '自动装配', link: '/v1/starter/web/log/configuration'},
                                {text: '数据结构', link: '/v1/starter/web/log/data'},
                            ]
                        },
                    ]
                },
                {
                    text: '测试',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v1/starter/test/introduction'},
                        {text: 'Spock教程', link: '/v1/starter/test/lesson'},
                    ]
                },
                {text: '更新记录', link: '/v1/starter/change-log'},
            ],
        }
    ],
    '/v2/': [
        {
            text: '依赖管理',
            collapsed: true,
            items: [
                {text: '快速开始', link: '/v2/dependencies/getting-started'},
                {text: '依赖管理', link: '/v2/dependencies/dependency-management'},
                {text: '插件管理', link: '/v2/dependencies/plugin-management'},
                {text: '更新记录', link: '/v2/dependencies/change-log'},
            ]
        },
        {
            text: '工具库',
            collapsed: true,
            items: [
                {text: '快速开始', link: '/v2/commons/getting-started'},
                {
                    text: '基础（lang）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/commons/lang/introduction'},
                        {text: '常量', link: '/v2/commons/lang/constants'},
                        {
                            text: '字符串',
                            collapsed: true,
                            items: [
                                {text: '概述', link: '/v2/commons/lang/string/introduction'},
                                {text: '脱敏', link: '/v2/commons/lang/string/desensitize'},
                                {text: '拼音', link: '/v2/commons/lang/string/pinyin'},
                                {text: '格式化', link: '/v2/commons/lang/string/format'},
                                {text: '工具类', link: '/v2/commons/lang/string/utils'},
                            ]
                        },
                        {text: '数据', link: '/v2/commons/lang/data'},
                        {text: 'JSON', link: '/v2/commons/lang/json'},
                        {text: '正则表达式', link: '/v2/commons/lang/regex'},
                        {text: 'ID', link: '/v2/commons/lang/id'},
                        {text: '身份证', link: '/v2/commons/lang/idcard'},
                        {text: '树', link: '/v2/commons/lang/tree'},
                        {text: '日期', link: '/v2/commons/lang/date'},
                        {text: '数组', link: '/v2/commons/lang/array'},
                        {text: '随机数', link: '/v2/commons/lang/random'},
                        {text: '金额', link: '/v2/commons/lang/money'},
                        {text: '序列化', link: '/v2/commons/lang/serialize'},
                        {text: '并发', link: '/v2/commons/lang/concurrent'},
                    ]
                },
                {
                    text: '校验（validation）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/commons/validation/introduction'},
                        {text: '注解', link: '/v2/commons/validation/annotation'},
                    ]
                },
                {
                    text: '加密（crypto）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/commons/crypto/introduction'},
                        {text: '常量', link: '/v2/commons/crypto/constants'},
                        {text: 'RSA密钥', link: '/v2/commons/crypto/key'},
                        {text: '加/解密', link: '/v2/commons/crypto/encryptor'},
                        {text: '签名/校验', link: '/v2/commons/crypto/digester'},
                        {text: '加密方案', link: '/v2/commons/crypto/transformation'},
                        {text: '工具类', link: '/v2/commons/crypto/utils'},
                    ]
                },
                {
                    text: 'IO（io）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/commons/io/introduction'},
                        {text: '常量', link: '/v2/commons/io/constants'},
                        {text: '文件', link: '/v2/commons/io/file'},
                        {text: 'io', link: '/v2/commons/io/io'},
                    ]
                },
                {
                    text: '压缩（compress）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/commons/compress/introduction'},
                        {text: '常量', link: '/v2/commons/compress/constants'},
                        {text: 'zip', link: '/v2/commons/compress/zip'},
                        {text: '7z', link: '/v2/commons/compress/7z'},
                        {text: 'tar', link: '/v2/commons/compress/tar'},
                        {text: 'gzip', link: '/v2/commons/compress/gzip'},
                        {text: 'xz', link: '/v2/commons/compress/xz'},
                        {text: '工具类', link: '/v2/commons/compress/utils'},
                    ]
                },
                {
                    text: '图像（image）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/commons/image/introduction'},
                        {text: '常量', link: '/v2/commons/image/constants'},
                        {text: '枚举', link: '/v2/commons/image/enums'},
                        {text: '数据结构', link: '/v2/commons/image/model'},
                        {text: '工具类', link: '/v2/commons/image/utils'},
                        {text: '图像处理', link: '/v2/commons/image/editor'},
                    ]
                },
                {
                    text: 'Office文档（poi）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/commons/poi/introduction'},
                        {text: '常量', link: '/v2/commons/poi/constants'},
                        {text: 'Excel', link: '/v2/commons/poi/excel'},
                        {text: 'Word', link: '/v2/commons/poi/word'},
                    ]
                },
                {
                    text: 'Pdf文档（pdf）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/commons/pdf/introduction'},
                        {text: '常量', link: '/v2/commons/pdf/constants'},
                        {text: 'PDF', link: '/v2/commons/pdf/pdf'},
                    ]
                },
                {
                    text: '地理信息（geo）',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/commons/geo/introduction'},
                        {text: '常量', link: '/v2/commons/geo/constants'},
                        {text: '坐标', link: '/v2/commons/geo/coordinate'},
                    ]
                },
                {text: '更新记录', link: '/v2/commons/change-log'},
            ]
        },
        {
            text: "框架",
            collapsed: true,
            items: [
                {text: '快速开始', link: '/v2/framework/getting-started'},
                {
                    text: 'Spring',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/framework/spring/introduction'},
                        {text: '常量', link: '/v2/framework/spring/constants'},
                        {text: 'Bean', link: '/v2/framework/spring/bean'},
                        {text: '反射（reflect）', link: '/v2/framework/spring/reflect'},
                        {text: 'SpEL表达式', link: '/v2/framework/spring/spel'},
                    ]
                },
                {
                    text: 'Web',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/framework/web/introduction'},
                        {text: '常量', link: '/v2/framework/web/constants'},
                        {text: '客户端', link: '/v2/framework/web/client'},
                        {text: '数据结构', link: '/v2/framework/web/data'},
                        {text: '过滤器', link: '/v2/framework/web/filter'},
                        {text: '拦截器', link: '/v2/framework/web/interceptor'},
                        {text: '异常', link: '/v2/framework/web/exception'},
                        {
                            text: "工具类",
                            items: [
                                {text: '数据操作断言', link: '/v2/framework/web/data-assert'},
                                {text: 'IP地址', link: '/v2/framework/web/ip'},
                                {text: 'Http请求', link: '/v2/framework/web/request'},
                                {text: 'Http响应', link: '/v2/framework/web/response'},
                                {text: '分片下载', link: '/v2/framework/web/range'},
                            ]
                        }
                    ]
                },
                {
                    text: 'Mybatis Plus',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/framework/mybatisplus/introduction'},
                        {text: 'ID校验', link: '/v2/framework/mybatisplus/validation'},
                        {text: '数据结构', link: '/v2/framework/mybatisplus/data'},
                        {text: '实体类', link: '/v2/framework/mybatisplus/entity'},
                        {text: '类型处理器', link: '/v2/framework/mybatisplus/type-handler'},
                        {text: 'CRUD', link: '/v2/framework/mybatisplus/crud'},
                        {text: '工具类', link: '/v2/framework/mybatisplus/utils'},
                    ]
                },
                {
                    text: 'Redis',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/framework/redis/introduction'},
                        {text: '常量', link: '/v2/framework/redis/constants'},
                        {text: '序列化器', link: '/v2/framework/redis/serializer'},
                        {text: '工具类', link: '/v2/framework/redis/utils'},
                        {text: 'SCAN', link: '/v2/framework/redis/template'},
                    ]
                },
                {
                    text: 'MongoDB',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/framework/mongodb/introduction'},
                        {text: '常量', link: '/v2/framework/mongodb/constants'},
                        {text: '数据结构', link: '/v2/framework/mongodb/data'},
                        {text: '实体类', link: '/v2/framework/mongodb/document'},
                        {text: '工具类', link: '/v2/framework/mongodb/utils'},
                        {text: 'CRUD', link: '/v2/framework/mongodb/crud'},
                    ]
                },
                {text: '更新记录', link: '/v2/framework/change-log'},
            ]
        },
        {
            text: "Starter",
            collapsed: true,
            items: [
                {text: '快速开始', link: '/v2/starter/getting-started'},
                {
                    text: 'Spring',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/starter/spring/introduction'},
                        {text: '静态上下文', link: '/v2/starter/spring/context'},
                        {text: '任务执行器', link: '/v2/starter/spring/task'},
                    ]
                },
                {
                    text: '校验',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/starter/validation/introduction'},
                        {text: '自动装配', link: '/v2/starter/validation/configuration'},
                    ]
                },
                {
                    text: '加密',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/starter/crypto/introduction'},
                        {text: '加/解密器工厂', link: '/v2/starter/crypto/factory'},
                        {text: '枚举', link: '/v2/starter/crypto/enums'},
                        {text: '工具类', link: '/v2/starter/crypto/utils'},
                    ]
                },
                {
                    text: 'JSON',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/starter/json/introduction'},
                        {text: '自动装配', link: '/v2/starter/json/configuration'},
                        {text: '脱敏', link: '/v2/starter/json/desensitized'},
                        {
                            text: '加密',
                            collapsed: true,
                            items: [
                                {text: '概述', link: '/v2/starter/json/crypto/introduction'},
                                {text: '加密', link: '/v2/starter/json/crypto/encrypt'},
                                {text: '解密', link: '/v2/starter/json/crypto/decrypt'},
                                {text: '工具类', link: '/v2/starter/json/crypto/utils'},
                            ]
                        },
                    ]
                },
                {
                    text: '图像',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/starter/image/introduction'},
                        {text: '常量', link: '/v2/starter/image/constants'},
                        {text: '枚举', link: '/v2/starter/image/enums'},
                        {text: '异常', link: '/v2/starter/image/exception'},
                        {text: '数据结构', link: '/v2/starter/image/model'},
                        {text: '操作', link: '/v2/starter/image/template'},
                    ]
                },
                {
                    text: 'Mybatis Plus',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/starter/mybatisplus/introduction'},
                        {text: '自动装配', link: '/v2/starter/mybatisplus/configuration'},
                        {text: '注解', link: '/v2/starter/mybatisplus/annotation'},
                        {text: '实体类', link: '/v2/starter/mybatisplus/entity'}
                    ]
                },
                {
                    text: 'MongoDB',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/starter/mongodb/introduction'},
                        {text: '自动装配', link: '/v2/starter/mongodb/configuration'},
                        {text: '动态数据源', link: '/v2/starter/mongodb/dynamic'},
                    ]
                },
                {
                    text: 'Redis',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/starter/redis/introduction'},
                        {text: '自动装配', link: '/v2/starter/redis/configuration'},
                        {text: '动态数据源', link: '/v2/starter/redis/dynamic'},
                    ]
                },
                {
                    text: 'Web',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/starter/web/introduction'},
                        {text: '自动装配', link: '/v2/starter/web/configuration'},
                        {text: '请求参数转换', link: '/v2/starter/web/request'},
                        {text: '响应体包装', link: '/v2/starter/web/response'},
                        {text: '异常处理', link: '/v2/starter/web/exception'},
                        {
                            text: '加密',
                            collapsed: true,
                            items: [
                                {text: '概述', link: '/v2/starter/web/crypto/introduction'},
                                {text: '加密', link: '/v2/starter/web/crypto/encrypt'},
                                {text: '解密', link: '/v2/starter/web/crypto/decrypt'}
                            ]
                        },
                        {
                            text: '校验',
                            collapsed: true,
                            items: [
                                {text: '概述', link: '/v2/starter/web/validation/introduction'},
                                {text: '接口签名', link: '/v2/starter/web/validation/signature'},
                                {text: '接口限流', link: '/v2/starter/web/validation/limit'},
                            ]
                        },
                        {
                            text: '日志',
                            collapsed: true,
                            items: [
                                {text: '概述', link: '/v2/starter/web/log/introduction'},
                                {text: '自动装配', link: '/v2/starter/web/log/configuration'},
                                {text: '数据结构', link: '/v2/starter/web/log/data'},
                            ]
                        },
                    ]
                },
                {
                    text: '测试',
                    collapsed: true,
                    items: [
                        {text: '概述', link: '/v2/starter/test/introduction'},
                        {text: 'Spock教程', link: '/v2/starter/test/lesson'},
                    ]
                },
                {text: '更新记录', link: '/v2/starter/change-log'},
            ],
        }
    ]
}
