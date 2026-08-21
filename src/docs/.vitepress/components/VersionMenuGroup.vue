<script setup>
import {computed} from 'vue'
import {useData} from 'vitepress'
import VPFlyout from 'vitepress/dist/client/theme-default/components//VPFlyout.vue'
import {isActive} from "vitepress/dist/client/shared";

const props = defineProps({
    button: {
        type: String,
        required: true,
    },
    item: {
        type: Object,
    }
})

const {page} = useData()

const isChildActive = (navItem) => {
    if ('component' in navItem) return false

    if ('link' in navItem) {
        return isActive(
            page.value.relativePath,
            navItem.link,
            !!props.item.activeMatch
        )
    }

    return navItem.items.some(isChildActive)
}

const childrenActive = computed(() => isChildActive(props.item))
</script>

<template>
    <VPFlyout
        :class="{
      VPNavBarMenuGroup: true,
      active:
        isActive(page.relativePath, item.activeMatch, !!item.activeMatch) ||
        childrenActive
    }"
        :button="button"
        :items="item.items"
    />
</template>
