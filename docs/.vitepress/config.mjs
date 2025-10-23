import {defineConfig} from 'vitepress'
import navbar from "./navbar.js"
import sidebar from "./sidebar.js"

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: "zh-CN",
    title: "Pangju Java",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: navbar,
        sidebar: sidebar,
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
            label: "页面导航",
            level: [2, 3],
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
    },
    plugins: [
        {
            name: 'markdown-dynamic-replace',
            enforce: 'pre', // 在其他处理前执行
            transform(code, id) {
                if (!id.endsWith('.md')) return null

                // 动态替换内容
                let content = code

                const dependenciesVersion = process.env.VITE_DEPENDENCIES_VERSION
                content = content.replace(/\{\{__DEPENDENCIES_VERSION__}}/g, dependenciesVersion)

                const commonsVersion = process.env.VITE_COMMONS_VERSION
                content = content.replace(/\{\{__COMMONS_VERSION__}}/g, commonsVersion)

                const frameworkVersion = process.env.VITE_FRAMEWORK_VERSION
                content = content.replace(/\{\{__FRAMEWORK_VERSION__}}/g, frameworkVersion)

                const frameworkSpringBootStarterVersion = process.env.VITE_FRAMEWORK_SPRING_BOOT_STARTER_VERSION
                content = content.replace(/\{\{__FRAMEWORK_SPRING_BOOT_STARTER_VERSION__}}/g, frameworkSpringBootStarterVersion)

                const viteSpringBootVersion = process.env.VITE_SPRING_BOOT_VERSION
                content = content.replace(/\{\{__SPRING_BOOT_VERSION__}}/g, viteSpringBootVersion)

                return content
            }
        }
    ]
})
