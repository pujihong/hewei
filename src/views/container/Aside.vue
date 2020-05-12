<template>
  <div class="menu-bar-container">
    <!-- logo -->
    <div
      class="logo"
      :style="{ 'background-color': themeColor }"
      :class="collapse ? 'menu-bar-collapse-width' : 'menu-bar-width'"
      @click="$router.push('/')"
    >
      <img alt="logo" v-if="collapse" src="@/assets/logo.png" />
      <div>{{ collapse ? "" : sysName }}</div>
    </div>
    <!-- 导航菜单 -->
    <el-menu
      default-active="1"
      :class="collapse ? 'menu-bar-collapse-width' : 'menu-bar-width'"
      :collapse="collapse"
      :collapse-transition="false"
      :unique-opened="true"
    >
      <!-- 导航菜单树组件，动态加载菜单 -->
      <!-- Maximum call stack size exceeded 当鼠标hover，会循环调用mouseenter事件报错 我的版本2.13.1 -->
      <MenuTree v-for="item in asideTree" :key="item.id" :menu="item" />
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MenuTree from "@/components/MenuTree";

export default {
  name: "Aside",
  components: {
    MenuTree
  },
  computed: {
    ...mapState({
      sysName: state => state.sys.sysName,
      themeColor: state => state.sys.themeColor,
      collapse: state => state.sys.collapse,
      asideTree: state => state.sys.asideTree
    })
  },
  /*watch: {
    $route: "handleRoute"
  },*/
  /* created() {
    this.handleRoute(this.$route);
  },*/
  methods: {
    // 路由操作处理
    handleRoute(route) {
      console.log(route);
    }
  }
};
</script>

<style scoped lang="scss">
.menu-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1020;

  .el-menu {
    position: absolute;
    top: 60px;
    bottom: 0;
    text-align: left;
    // background-color: #2968a30c;
  }

  .logo {
    position: absolute;
    top: 0;
    height: 60px;
    line-height: 60px;
    background: #545c64;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
      border-radius: 0;
      margin: 10px 10px 10px 10px;
      float: left;
    }

    div {
      font-size: 25px;
      color: white;
    }
  }

  .menu-bar-width {
    width: 200px;
  }

  .menu-bar-collapse-width {
    width: 65px;
  }
}
</style>
