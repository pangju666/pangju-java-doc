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
                ]
            },
            {
                text: '加密（crypto）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/crypto/introduction'},
                ]
            },
            {
                text: 'IO（io）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/io/introduction'},
                ]
            },
            {
                text: '压缩（compress）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/compress/introduction'},
                ]
            },
            {
                text: '图像（image）',
                collapsed: true,
                items: [
                    {text: '概述', link: '/commons/image/introduction'},
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
                ]
            },
        ]
    }
]
