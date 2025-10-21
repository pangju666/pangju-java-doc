import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'

export default defineUserConfig({
    lang: 'zh-CN',
    title: "Pangju 生态",
    description: '包含了从依赖管理、工具库、Spring Boot 等方面的业务开发辅助生态',
    theme: defaultTheme({
        logo: 'https://vuejs.press/images/hero.png',
        navbar: [
            {
                text: '生态',
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
        ]
    }),
    bundler: viteBundler(),
})
