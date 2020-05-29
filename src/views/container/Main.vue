<template>
  <div class="main-container"
    :class="$store.state.sys.collapse ? 'position-collapse-left' : 'position-left'">
    <!-- 面包屑 -->
    <Breadcrumb />
    <HeaderTabs />
    <!-- 主内容区域 -->
    <div class="main-content">
      <keep-alive>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import HeaderTabs from "@/components/HeaderTabs";
export default {
  components: {
    Breadcrumb,
    HeaderTabs
  }
};
</script>

<style scoped lang="scss">
.main-container {
  padding: 0 5px 5px;
  position: absolute;
  top: 60px;
  left: 1px;
  right: 1px;
  bottom: 0;

  .main-content {
    padding: 5px;
  }
}

.position-left {
  left: 200px;
}

.position-collapse-left {
  left: 85px;
}
</style>
