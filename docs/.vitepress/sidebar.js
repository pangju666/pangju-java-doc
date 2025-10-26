export default [
    {
        text: '快速开始',
        link: '/getting-started'
    },
    {
        text: '依赖管理',
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
                    {text: '滤镜', link: '/commons/image/filter'},
                    {text: '缩略图', link: '/commons/image/thumbnail'},
                ]
            },
            {
                text: 'Office文档（poi）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/poi/introduction'},
                ]
            },
            {
                text: 'PDF文档（pdf）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/pdf/introduction'},
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
    }
]
