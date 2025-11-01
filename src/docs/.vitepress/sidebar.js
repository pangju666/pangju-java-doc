export default [
    {
        text: '快速开始',
        link: '/getting-started'
    },
    {
        text: '依赖管理',
        collapsed: true,
        items: [
            {text: '简介', link: '/dependencies/getting-started'},
            {text: '依赖管理', link: '/dependencies/dependency-management'},
            {text: '插件管理', link: '/dependencies/plugin-management'},
        ]
    },
    {
        text: '工具库',
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
                    {text: '自定义', link: '/commons/validation/diy'},
                ]
            },
            {
                text: '加密（crypto）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/crypto/introduction'},
                    {text: '常量', link: '/commons/crypto/constants'},
                    {text: '密钥', link: '/commons/crypto/key'},
                    {text: '加/解密', link: '/commons/crypto/encryptor'},
                    {text: '签名/校验', link: '/commons/crypto/digester'},
                    {text: '加密方案', link: '/commons/crypto/transformation'},
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
                    {text: '图像', link: '/commons/image/image'},
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
        text: "框架",
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
                    {text: '数据模型', link: '/framework/web/data'},
                    {text: '过滤器', link: '/framework/web/filter'},
                    {text: '拦截器', link: '/framework/web/interceptor'},
                    {text: '异常', link: '/framework/web/exception'},
                    {text: '工具类', link: '/framework/web/utils'},
                ]
            },
            {
                text: 'Mybatis Plus',
                collapsed: true,
                items: [
                ]
            },
            {
                text: 'MongoDB',
                collapsed: true,
                items: [
                ]
            },
            {
                text: 'Redis',
                collapsed: true,
                items: [
                ]
            }
        ]
    }
]
