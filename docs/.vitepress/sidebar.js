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
