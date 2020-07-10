<template>
  <div class="main-container"
    :class="$store.state.sys.collapse ? 'position-collapse-left' : 'position-left'">
    <!-- 面包屑 这个有待完善，可参考vue-element-admin-->
 <!--   <Breadcrumb />-->
    <!-- 主内容区域 -->
    <div class="main-content">
      <HeaderTabs v-if="this.$store.state.tab.mainTabs.length > 0"/>
      <keep-alive>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
// import Breadcrumb from "@/components/Breadcrumb";
import HeaderTabs from "@/components/HeaderTabs";
export default {
  components: {
    // Breadcrumb,
    HeaderTabs
  }
};
</script>

<style scoped lang="scss">
.main-container {
  box-sizing: border-box;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(247, 248, 246, 0.55);
}
</style>
