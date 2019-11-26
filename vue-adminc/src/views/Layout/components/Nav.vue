<template>
  <div id="nav-wrap">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers" >
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
          <!-- 一级菜单 -->
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >{{ subItem.meta.name }}</el-menu-item>
        </el-submenu>
      </template>>
    </el-menu>
  </div>
</template>
<script>
import { reactive, ref, onMounted, root } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    /**
     * data数据
     */

    const isCollapse = ref(false);
    const routers = reactive(root.$router.options.routes);

    /**
     * 函数
     */
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    return {
      isCollapse,
      handleOpen,
      handleClose,
      routers
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMeau;
  height: 100vh;
  background-color: #344a5f;
}
</style>