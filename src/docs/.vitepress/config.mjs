import {defineConfig} from 'vitepress'
import sidebar from "./sidebar.js"
import { fileURLToPath, URL } from 'node:url'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve('.env') })

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: "zh-CN",
    title: "Pangju Java",
    base: '/pangju-java-doc',
    outDir: "../../docs",
    vite: {
        resolve: {
            alias: [
                {
                    find: /^.*\/VPNavBarMenu\.vue$/,
                    replacement: fileURLToPath(
                        new URL('./components/VersionNavBarMenu.vue', import.meta.url)
                    )
                }
            ]
        }
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
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
            level: 'deep',
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
            copyright: '版权所有 © 2026-至今 pangju666'
        }
    }
})
