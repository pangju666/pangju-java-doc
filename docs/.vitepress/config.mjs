import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Pangju Java",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {
                text: '指南',
                items: [
                    {
                        text: '快速上手',
                        link: '/guide/getting-started',
                    },
                    {
                        text: '快速上手2',
                        link: '/guide/getting-started2',
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
                text: '指南',
                collapsed: true,
                items: [
                    {text: 'Markdown Examples', link: '/guide/getting-started'},
                    {text: 'Runtime API Examples', link: '/guide/getting-started2'}
                ]
            }
        ],
        search: {
            provider: 'local'
        },
        footer: {
            message: '基于 Apache 许可发布',
            copyright: '版权所有 © 2025-至今 pangju666'
        }
    }
})
