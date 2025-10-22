import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: "zh-CN",
    title: "Pangju Java",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {
                text: '指南',
                items: [
                    {
                        text: '快速上手',
                        link: '/dependencies/getting-started',
                    },
                    {
                        text: '快速上手2',
                        link: '/dependencies/getting-started2',
                    },
                    {
                        text: '框架',
                        link: 'https://github.com/pangju666/java-pangju-commonsjava-pangju-framework',
                    },
                    {
                        text: '框架 Spring Boot Starter',
                        link: 'https://github.com/pangju666/java-pangju-framework-spring-boot-starter',
                    }
                ]
            },
            {
                text: '参考',
                items: [
                    {
                        text: '依赖管理',
                        link: 'https://github.com/pangju666/java-pangju-dependencies',
                    },
                    {
                        text: '工具库',
                        link: 'https://github.com/pangju666/java-pangju-commonsjava-pangju-commons',
                    },
                    {
                        text: '框架',
                        link: 'https://github.com/pangju666/java-pangju-commonsjava-pangju-framework',
                    },
                    {
                        text: '框架 Spring Boot Starter',
                        link: 'https://github.com/pangju666/java-pangju-framework-spring-boot-starter',
                    }
                ]
            },
            {
                text: 'Github',
                items: [
                    {
                        text: 'Dependencies',
                        link: 'https://github.com/pangju666/java-pangju-dependencies',
                    },
                    {
                        text: 'Commons',
                        link: 'https://github.com/pangju666/java-pangju-commons',
                    },
                    {
                        text: 'Framework',
                        link: 'https://github.com/pangju666/java-pangju-framework',
                    },
                    {
                        text: 'Framework Spring Boot Starter',
                        link: 'https://github.com/pangju666/java-pangju-framework-spring-boot-starter',
                    }
                ]
            }
        ],
        sidebar: [
            {
                text: '依赖管理',
                collapsed: true,
                items: [
                    {text: '快速上手', link: '/dependencies/getting-started'},
                    {text: 'Runtime API Examples', link: '/dependencies/getting-started2'}
                ]
            }
        ],
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: '搜索文档',
                        buttonAriaLabel: '搜索文档'
                    },
                    modal: {
                        noResultsText: '无法找到相关结果',
                        resetButtonTitle: '清除查询条件',
                        footer: {
                            selectText: '选择',
                            navigateText: '切换'
                        }
                    }
                }
            }
        },
        lastUpdated: {
            text: '最后更新于'
        },
        outline: {
            label: "页面导航"
        },
        lightModeSwitchTitle: "切换到浅色模式",
        darkModeSwitchTitle: '切换到深色模式',
        externalLinkIcon: true,
        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        },
        footer: {
            message: '基于 Apache 许可发布',
            copyright: '版权所有 © 2025-至今 pangju666'
        }
    }
})
