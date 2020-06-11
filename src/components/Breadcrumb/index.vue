<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
      <router-link :to="item.path">{{ item.name ? item.name:"首页" }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.breadcrumb {
  padding: 10px;
}
</style>
