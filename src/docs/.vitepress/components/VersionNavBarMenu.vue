<script setup>
import {useData, useRouter} from 'vitepress'
import VPNavBarMenuLink from 'vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue'
import VPNavBarMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue'
import VersionMenuGroup from './VersionMenuGroup.vue'
import {ref} from "vue";

const {theme, site} = useData()

const currentVersion = ref(sessionStorage.getItem('version') ?? "v2");

const versionNavbarItem = {
    items: [
        {
            text: 'v1',
            link: '/v1',
        },
        {
            text: 'v2',
            link: '/v2',
        }
    ]
}

const dependenciesNavbarItemText = ref(`依赖管理 v${import.meta.env.VITE_V2_DEPENDENCIES_VERSION}`)
const dependenciesNavbarItem = ref({
    items: [
        {
            text: '指南',
            link: '/dependencies/getting-started',
        },
        {
            text: '更新日志',
            link: 'https://github.com/pangju666/java-pangju-dependencies/blob/master/CHANGELOG.md',
        },
        {
            text: 'Github',
            link: 'https://github.com/pangju666/java-pangju-dependencies',
        },
    ]
})

const commonsNavbarItemText = ref(`工具库 v${import.meta.env.VITE_V2_COMMONS_VERSION}`)
const commonsNavbarItem = ref({
    items: [
        {
            text: '指南',
            link: '/commons/getting-started',
        },
        {
            text: '更新日志',
            link: 'https://github.com/pangju666/java-pangju-commons/blob/master/CHANGELOG.md',
        },
        {
            text: 'Github',
            link: 'https://github.com/pangju666/java-pangju-commons',
        },
    ]
})

const frameworkNavbarItemText = ref(`Framework v${import.meta.env.VITE_V2_FRAMEWORK_VERSION}`)
const frameworkNavbarItem = ref({
    items: [
        {
            text: '指南',
            link: '/framework/getting-started',
        },
        {
            text: '更新日志',
            link: 'https://github.com/pangju666/java-pangju-framework/blob/master/CHANGELOG.md',
        },
        {
            text: 'Github',
            link: 'https://github.com/pangju666/java-pangju-framework',
        },
    ]
})

const starterNavbarItemText = ref(`Framework Starter v${import.meta.env.VITE_V2_FRAMEWORK_STARTER_VERSION}`)
const starterNavbarItem = ref({
    items: [
        {
            text: '指南',
            link: '/starter/getting-started',
        },
        {
            text: '更新日志',
            link: 'https://github.com/pangju666/java-pangju-framework-spring-boot-starter/blob/master/CHANGELOG.md',
        },
        {
            text: 'Github',
            link: 'https://github.com/pangju666/java-pangju-framework-spring-boot-starter',
        },
    ]
})

const router = useRouter()

router.onBeforeRouteChange = (to) => {
    switch (to) {
        case `${site.value.base}v2.html`:
            currentVersion.value = 'v2'
            sessionStorage.setItem('version', currentVersion.value)

            dependenciesNavbarItemText.value = `依赖管理 v${import.meta.env.VITE_V2_DEPENDENCIES_VERSION}`
            dependenciesNavbarItem.value = {
                text: '依赖管理',
                items: [
                    {
                        text: '指南',
                        link: '/dependencies/getting-started',
                    },
                    {
                        text: '更新日志',
                        link: 'https://github.com/pangju666/java-pangju-dependencies/blob/master/CHANGELOG.md',
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/pangju666/java-pangju-dependencies',
                    },
                ]
            }

            commonsNavbarItemText.value = `工具库 v${import.meta.env.VITE_V2_COMMONS_VERSION}`
            commonsNavbarItem.value = {
                items: [
                    {
                        text: '指南',
                        link: '/commons/getting-started',
                    },
                    {
                        text: '更新日志',
                        link: 'https://github.com/pangju666/java-pangju-commons/blob/master/CHANGELOG.md',
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/pangju666/java-pangju-commons',
                    },
                ]
            }

            frameworkNavbarItemText.value = `Framework v${import.meta.env.VITE_V2_FRAMEWORK_VERSION}`
            frameworkNavbarItem.value = {
                items: [
                    {
                        text: '指南',
                        link: '/framework/getting-started',
                    },
                    {
                        text: '更新日志',
                        link: 'https://github.com/pangju666/java-pangju-framework/blob/master/CHANGELOG.md',
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/pangju666/java-pangju-framework',
                    },
                ]
            }

            starterNavbarItemText.value = `Framework Starter v${import.meta.env.VITE_V2_FRAMEWORK_STARTER_VERSION}`
            starterNavbarItem.value = {
                items: [
                    {
                        text: '指南',
                        link: '/starter/getting-started',
                    },
                    {
                        text: '更新日志',
                        link: 'https://github.com/pangju666/java-pangju-framework-spring-boot-starter/blob/master/CHANGELOG.md',
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/pangju666/java-pangju-framework-spring-boot-starter',
                    },
                ]
            }

            router.go(`${site.value.base}index`)
            return false
        case `${site.value.base}v1.html`:
            currentVersion.value = 'v1'
            sessionStorage.setItem('version', currentVersion.value)

            dependenciesNavbarItemText.value = `依赖管理 v${import.meta.env.VITE_V1_DEPENDENCIES_VERSION}`
            dependenciesNavbarItem.value = {
                items: [
                    {
                        text: '指南',
                        link: '/dependencies/getting-started',
                    },
                    {
                        text: '更新日志',
                        link: 'https://github.com/pangju666/java-pangju-dependencies/blob/v1/CHANGELOG.md',
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/pangju666/java-pangju-dependencies/tree/v1',
                    },
                ]
            }

            commonsNavbarItemText.value = `工具库 v${import.meta.env.VITE_V1_COMMONS_VERSION}`
            commonsNavbarItem.value = {
                items: [
                    {
                        text: '指南',
                        link: '/commons/getting-started',
                    },
                    {
                        text: '更新日志',
                        link: 'https://github.com/pangju666/java-pangju-commons/blob/v1/CHANGELOG.md',
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/pangju666/java-pangju-commons/tree/v1',
                    },
                ]
            }

            frameworkNavbarItemText.value = `Framework v${import.meta.env.VITE_V1_FRAMEWORK_VERSION}`
            frameworkNavbarItem.value = {
                items: [
                    {
                        text: '指南',
                        link: '/framework/getting-started',
                    },
                    {
                        text: '更新日志',
                        link: 'https://github.com/pangju666/java-pangju-framework/blob/v1/CHANGELOG.md',
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/pangju666/java-pangju-framework/tree/v1',
                    },
                ]
            }

            starterNavbarItemText.value = `Framework Starter v${import.meta.env.VITE_V1_FRAMEWORK_STARTER_VERSION}`
            starterNavbarItem.value = {
                items: [
                    {
                        text: '指南',
                        link: '/starter/getting-started',
                    },
                    {
                        text: '更新日志',
                        link: 'https://github.com/pangju666/java-pangju-framework-spring-boot-starter/blob/v1/CHANGELOG.md',
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/pangju666/java-pangju-framework-spring-boot-starter/tree/v1',
                    },
                ]
            }

            router.go(`${site.value.base}index`)
            return false
        default:
            break
    }

    if (to === site.value.base || to.startsWith(`${site.value.base}${currentVersion.value}`)) {
        return true
    }

    router.go(`${site.value.base}${currentVersion.value}/${to.substring(site.value.base.length, to.length - 5)}`)
    return false
}
</script>

<template>
    <nav
        aria-labelledby="main-nav-aria-label"
        class="VPNavBarMenu"
    >
    <span id="main-nav-aria-label" class="visually-hidden">
      Main Navigation
    </span>
        <VersionMenuGroup :item="dependenciesNavbarItem" :button="dependenciesNavbarItemText"/>
        <VersionMenuGroup :item="commonsNavbarItem" :button="commonsNavbarItemText"/>
        <VersionMenuGroup :item="frameworkNavbarItem" :button="frameworkNavbarItemText"/>
        <VersionMenuGroup :item="starterNavbarItem" :button="starterNavbarItemText"/>
        <VersionMenuGroup :item="versionNavbarItem" button="切换版本" />

        <template v-for="item in theme.nav" :key="JSON.stringify(item)">
            <VPNavBarMenuLink v-if="'link' in item" :item="item"/>
            <component
                v-else-if="'component' in item"
                :is="item.component"
                v-bind="item.props"
            />
            <VPNavBarMenuGroup v-else :item="item"/>
        </template>
    </nav>
</template>

<style scoped>
.VPNavBarMenu {
    display: none;
}

@media (min-width: 768px) {
    .VPNavBarMenu {
        display: flex;
    }
}
</style>
