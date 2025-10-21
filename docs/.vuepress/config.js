import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'

export default defineUserConfig({
    lang: 'zh-CN',
    title: "胖橘Java生态",
    description: '包含了从依赖管理、工具库、Spring Boot 等方面的业务开发辅助生态',
    theme: defaultTheme({
        logo: 'https://vuejs.press/images/hero.png',
        navbar: [
            {
                text: '指南',
                children: [
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
                children: [
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
                text: '参考',
                children: [
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
                text: `v1.0.0`,
                children: [
                    {
                        text: '更新日志',
                        link: 'https://github.com/vuepress/core/blob/main/CHANGELOG.md',
                    },
                    {
                        text: 'v1.0.0',
                        link: 'https://v1.vuepress.vuejs.org/zh/',
                    },
                ],
            },
            {
                text: 'Github',
                children: [
                    {
                        text: 'Pangju Dependencies',
                        link: 'https://github.com/pangju666/java-pangju-dependencies',
                    },
                    {
                        text: 'Pangju Commons',
                        link: 'https://github.com/pangju666/java-pangju-commonsjava-pangju-commons',
                    },
                    {
                        text: 'Pangju Framework',
                        link: 'https://github.com/pangju666/java-pangju-commonsjava-pangju-framework',
                    },
                    {
                        text: 'Pangju Framework Spring Boot Starter',
                        link: 'https://github.com/pangju666/java-pangju-framework-spring-boot-starter',
                    }
                ]
            }
        ],
        sidebar: [
            {
                prefix: '/guide/',
                text: 'Typescript 学习',
                collapsable: true,
                children: [
                    'getting-started.md',
                    'getting-started2.md'
                ]
            }
        ]
    }),
    bundler: viteBundler(),
})
