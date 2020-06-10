<template>
  <el-container class="blog">
    <el-header class="header flex flex-col-center" :height="headerHeight">
      <div class="pd-l-20">
        <el-avatar>hewei</el-avatar>
      </div>
      <span class="pd-l-20">hewei</span>
      <div class="mg-l-40">
        <el-button icon="el-icon-s-home" class="btn-link">首页</el-button>
      </div>
      <div class="header-right-box" @click="writeBlog">
        <el-button class="btn-link">写博客</el-button>
      </div>
    </el-header>
    <el-main class="text-left">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      headerHeight: "50px"
    };
  },
  methods: {
    writeBlog() {
      let token = sessionStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
      } else {
        this.$router.push("/blog/writeBlog");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.blog {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.header {
  background-color: $white;
  color: $black0;
  border-bottom-style: solid;
  border-bottom-color: $color-c;
  border-bottom-width: 2px;

  .header-right-box {
    box-sizing: border-box;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 20px;
    cursor: pointer;
  }
  .header-right-box:hover {
    background-color: $color-f5;
  }
}

.el-main {
  background-color: $white;
  color: $black0;
}

.btn-link {
  border: none;
  height: 48px;
  font-size: 16px;
}

.btn-link:hover {
  background-color: $color-f5;
}
</style>
