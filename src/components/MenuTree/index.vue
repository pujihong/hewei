<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="'' + menu.id" >
    <template slot="title">
      <i v-if="menu.icon" :class="menu.icon" />
      <span slot="title">{{ menu.name }}</span>
    </template>
    <MenuTree v-for="item in menu.children" :key="item.id" :menu="item" />
  </el-submenu>
  <el-menu-item v-else :index="'' + menu.id" @click="handleRoute(menu)">
    <i :class="menu.icon" />
    <span slot="title">{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: "MenuTree",
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleRoute(menu) {
      let path = menu.url;
      // 通过菜单URL跳转至指定路由
      this.$router.push(path);
    }
  }
};
</script>

<style scoped lang="scss" />
