<template>
    <div name="layout" :class = "[menuStatus ? 'close' : 'open']">
        主页
        <LayoutHeader />
        <LayoutMain />
        <LayoutNav />
    </div>
</template>
<script>
import { root, computed } from "@vue/composition-api";
import LayoutHeader from "./components/Header"
import LayoutMain from "./components/Main"
import LayoutNav from "./components/Nav"
export default {
    name: "layout",
    components: {LayoutHeader, LayoutMain, LayoutNav},
    setup(props, { root }){
        const menuStatus = computed(() => root.$store.state.isCollapse)
        return {
            menuStatus
        }
    }
    
}
</script>
<style lang="scss" scoped>

</style>