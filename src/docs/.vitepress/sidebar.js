export default [
    {
        text: '快速开始',
        link: '/getting-started'
    },
    {
        text: '依赖管理（dependencies）',
        collapsed: true,
        items: [
            {text: '简介', link: '/dependencies/getting-started'},
            {text: '依赖管理', link: '/dependencies/dependency-management'},
            {text: '插件管理', link: '/dependencies/plugin-management'},
        ]
    },
    {
        text: "自动装配（starter）",
        collapsed: true,
        items: [
            {text: '简介', link: '/starter/getting-started'},
            {
                text: 'Spring',
                collapsed: true,
                items: [
                    {text: '概述', link: '/starter/spring/introduction'},
                    {text: '静态上下文', link: '/starter/spring/context'},
                    {text: '去重任务', link: '/starter/spring/task'},
                ]
            },
            {
                text: '加密',
                collapsed: true,
                items: [
                    {text: '概述', link: '/starter/crypto/introduction'},
                    {text: '加/解密器工厂', link: '/starter/crypto/factory'},
                    {text: '枚举', link: '/starter/crypto/enums'},
                    {text: '工具类', link: '/starter/crypto/utils'},
                ]
            },
            {
                text: '校验',
                collapsed: true,
                items: [
                    {text: '概述', link: '/starter/validation/introduction'},
                ]
            },
            {
                text: '图像',
                collapsed: true,
                items: [
                    {text: '概述', link: '/starter/image/introduction'},
                ]
            },
            {
                text: 'JSON',
                collapsed: true,
                items: [
                    {text: '概述', link: '/starter/json/introduction'},
                ]
            },
            {
                text: 'Mybatis Plus',
                collapsed: true,
                items: [
                    {text: '概述', link: '/starter/mybatisplus/introduction'},
                ]
            },
            {
                text: 'MongoDB',
                collapsed: true,
                items: [
                    {text: '概述', link: '/starter/mongodb/introduction'},
                ]
            },
            {
                text: 'Redis',
                collapsed: true,
                items: [
                    {text: '概述', link: '/starter/redis/introduction'},
                ]
            },
            {
                text: 'Web',
                collapsed: true,
                items: [
                    {text: '概述', link: '/starter/web/introduction'},
                ]
            },
            {
                text: 'Web 加密',
                collapsed: true,
                items: [
                    {text: '概述', link: '/starter/web-crypto/introduction'},
                ]
            },
            {
                text: 'Web 校验',
                collapsed: true,
                items: [
                    {text: '概述', link: '/starter/web-validation/introduction'},
                ]
            },
            {
                text: 'Web 日志',
                collapsed: true,
                items: [
                    {text: '概述', link: '/starter/web-log/introduction'},
                ]
            },
            {
                text: '测试',
                collapsed: true,
                items: [
                    {text: '概述', link: '/starter/test/introduction'},
                ]
            },
            {
                text: 'Spock测试集成',
                collapsed: true,
                items: [
                    {text: '概述', link: '/starter/spock/introduction'},
                ]
            },
        ],
    },
    {
        text: '工具库（commons）',
        collapsed: true,
        items: [
            {text: '简介', link: '/commons/getting-started'},
            {
                text: '基础（lang）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/lang/introduction'},
                    {text: '常量', link: '/commons/lang/constants'},
                    {text: '字符串', link: '/commons/lang/string'},
                    {text: '数据', link: '/commons/lang/data'},
                    {text: 'JSON', link: '/commons/lang/json'},
                    {text: '正则表达式', link: '/commons/lang/regex'},
                    {text: 'ID', link: '/commons/lang/id'},
                    {text: '树', link: '/commons/lang/tree'},
                    {text: '日期', link: '/commons/lang/date'},
                    {text: '数组', link: '/commons/lang/array'},
                    {text: '随机数', link: '/commons/lang/random'},
                    {text: '金额', link: '/commons/lang/money'},
                    {text: '序列化', link: '/commons/lang/serialize'},
                    {text: '并发', link: '/commons/lang/concurrent'},
                ]
            },
            {
                text: '校验（validation）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/validation/introduction'},
                    {text: '注解', link: '/commons/validation/annotation'},
                ]
            },
            {
                text: '加密（crypto）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/crypto/introduction'},
                    {text: '常量', link: '/commons/crypto/constants'},
                    {text: 'RSA密钥', link: '/commons/crypto/key'},
                    {text: '加/解密', link: '/commons/crypto/encryptor'},
                    {text: '签名/校验', link: '/commons/crypto/digester'},
                    {text: '加密方案', link: '/commons/crypto/transformation'},
                    {text: '工具类', link: '/commons/crypto/utils'},
                ]
            },
            {
                text: 'IO（io）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/io/introduction'},
                    {text: '常量', link: '/commons/io/constants'},
                    {text: '文件', link: '/commons/io/file'},
                    {text: 'io', link: '/commons/io/io'},
                ]
            },
            {
                text: '压缩（compress）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/compress/introduction'},
                    {text: '常量', link: '/commons/compress/constants'},
                    {text: 'zip', link: '/commons/compress/zip'},
                    {text: '7z', link: '/commons/compress/7z'},
                ]
            },
            {
                text: '图像（image）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/image/introduction'},
                    {text: '常量', link: '/commons/image/constants'},
                    {text: '图像信息', link: '/commons/image/image'},
                    {text: '图像处理', link: '/commons/image/editor'},
                ]
            },
            {
                text: 'Office文档（poi）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/poi/introduction'},
                    {text: '常量', link: '/commons/poi/constants'},
                    {text: 'Excel', link: '/commons/poi/excel'},
                    {text: 'Word', link: '/commons/poi/word'},
                ]
            },
            {
                text: 'Pdf文档（pdf）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/pdf/introduction'},
                    {text: '常量', link: '/commons/pdf/constants'},
                    {text: 'PDF', link: '/commons/pdf/pdf'},
                ]
            },
            {
                text: '地理信息（geo）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/geo/introduction'},
                    {text: '常量', link: '/commons/geo/constants'},
                    {text: '坐标', link: '/commons/geo/coordinate'},
                ]
            },
        ]
    },
    {
        text: "框架（framework）",
        collapsed: true,
        items: [
            {text: '简介', link: '/framework/getting-started'},
            {
                text: 'Spring',
                collapsed: true,
                items: [
                    {text: '概述', link: '/framework/spring/introduction'},
                    {text: '常量', link: '/framework/spring/constants'},
                    {text: 'Bean', link: '/framework/spring/bean'},
                    {text: '反射（reflect）', link: '/framework/spring/reflect'},
                    {text: 'SpEL表达式', link: '/framework/spring/spel'},
                ]
            },
            {
                text: 'Web',
                collapsed: true,
                items: [
                    {text: '概述', link: '/framework/web/introduction'},
                    {text: '常量', link: '/framework/web/constants'},
                    {text: '客户端', link: '/framework/web/client'},
                    {text: '数据结构', link: '/framework/web/data'},
                    {text: '过滤器', link: '/framework/web/filter'},
                    {text: '拦截器', link: '/framework/web/interceptor'},
                    {text: '异常', link: '/framework/web/exception'},
                    {
                        text: "工具类",
                        items: [
                            {text: '数据操作断言', link: '/framework/web/data-assert'},
                            {text: 'IP地址', link: '/framework/web/ip'},
                            {text: 'Http请求', link: '/framework/web/request'},
                            {text: 'Http响应', link: '/framework/web/response'},
                            {text: '分片下载', link: '/framework/web/range'},
                        ]
                    }
                ]
            },
            {
                text: 'Mybatis Plus',
                collapsed: true,
                items: [
                    {text: '概述', link: '/framework/mybatisplus/introduction'},
                    {text: 'ID校验', link: '/framework/mybatisplus/validation'},
                    {text: '数据结构', link: '/framework/mybatisplus/data'},
                    {text: '实体类', link: '/framework/mybatisplus/entity'},
                    {text: '类型处理器', link: '/framework/mybatisplus/type-handler'},
                    {text: 'CRUD', link: '/framework/mybatisplus/crud'},
                    {text: '工具类', link: '/framework/mybatisplus/utils'},
                ]
            },
            {
                text: 'Redis',
                collapsed: true,
                items: [
                    {text: '概述', link: '/framework/redis/introduction'},
                    {text: '常量', link: '/framework/redis/constants'},
                    {text: '序列化器', link: '/framework/redis/serializer'},
                    {text: '工具类', link: '/framework/redis/utils'},
                    {text: 'SCAN', link: '/framework/redis/template'},
                ]
            },
            {
                text: 'MongoDB',
                collapsed: true,
                items: [
                    {text: '概述', link: '/framework/mongodb/introduction'},
                    {text: '常量', link: '/framework/mongodb/constants'},
                    {text: '数据结构', link: '/framework/mongodb/data'},
                    {text: '实体类', link: '/framework/mongodb/document'},
                    {text: '工具类', link: '/framework/mongodb/utils'},
                    {text: 'CRUD', link: '/framework/mongodb/crud'},
                ]
            },
        ]
    }
]
