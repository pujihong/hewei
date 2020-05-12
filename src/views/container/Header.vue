<template>
  <div
    class="headbar"
    :style="{ background: themeColor }"
    :class="
      this.$store.state.sys.collapse
        ? 'position-collapse-left'
        : 'position-left'
    "
  >
    <!-- 导航收缩 -->
    <div class="flex flex-row space-between">
      <div class="flex-row">
        <div class="font24 pd-l-10 pd-r-10 cursor-pointer" @click="onCollapse">
          <i v-if="!this.$store.state.sys.collapse" class="el-icon-s-fold white" />
          <i v-if="this.$store.state.sys.collapse" class="el-icon-s-unfold white" />
        </div>
        <!-- 导航菜单 -->
        <el-menu
          :default-active="activeIndex"
          :background-color="themeColor"
          text-color="#fff"
          active-text-color="#ffd04b"
          mode="horizontal"
          @select="selectNavBar()"
        >
          <el-menu-item index="1" @click="$router.push('/blog/index')"
            >{{ $t("common.blog") }}
          </el-menu-item>
        </el-menu>
      </div>
      <!-- 工具栏 -->
      <el-menu
        :background-color="themeColor"
        :text-color="themeColor"
        :active-text-color="themeColor"
        mode="horizontal"
      >
        <el-menu-item index="1">
          <el-color-picker v-model="themeColor" @change="onThemeChange" />
        </el-menu-item>
        <el-menu-item index="2" v-popover:popover-lang>
          <!-- 语言切换 -->
          <div class="white">切换</div>
          <el-popover
            ref="popover-lang"
            placement="bottom-start"
            trigger="click"
            v-model="langVisible"
          >
            <div class="lang-item" @click="changeLanguage('zh-CN')">
              简体中文
            </div>
            <div class="lang-item" @click="changeLanguage('en-US')">
              English
            </div>
          </el-popover>
        </el-menu-item>
        <el-menu-item index="5" v-popover:popover-personal>
          <!-- 用户信息 -->
          <span class="user-info"
            ><img alt="头像" :src="user.avatar" />{{ user.name }}</span
          >
          <el-popover
            ref="popover-personal"
            placement="bottom-end"
            trigger="click"
            :visible-arrow="false"
          >
            <PersonalPanel :user="user" />
          </el-popover>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PersonalPanel from "@/components/PersonalPanel/index";

export default {
  components: {
    PersonalPanel
  },
  data() {
    return {
      user: {
        name: "hewei",
        avatar: "",
        role: "超级管理员",
        registeInfo: "注册时间：2018-12-20 "
      },
      activeIndex: "1",
      langVisible: false
    };
  },
  methods: {
    openWindow(url) {
      window.open(url);
    },
    selectNavBar(key, keyPath) {
      console.log(key, keyPath);
    },
    // 折叠导航栏
    onCollapse: function() {
      this.$store.commit("onCollapse");
    },
    // 切换主题
    onThemeChange: function(themeColor) {
      this.$store.commit("setThemeColor", themeColor);
    },
    // 语言切换
    changeLanguage(lang) {
      lang = lang === "" ? "zh-CN" : lang;
      this.$i18n.locale = lang;
      this.langVisible = false;
    }
  },
  mounted() {
    /* let user = JSON.parse(sessionStorage.getItem("user"));
                             if (user) {
                               this.user.name = user.name;
                             }*/
    this.user.name = "pujihong";
    this.user.avatar = require("@/assets/user.png");
  },
  computed: {
    ...mapState({
      themeColor: state => state.sys.themeColor,
      collapse: state => state.sys.collapse
    })
  }
};
</script>

<style scoped lang="scss">
.headbar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1030;
  height: 60px;
  line-height: 60px;
  border-color: rgba(180, 190, 190, 0.8);
  border-left-width: 1px;
  border-left-style: solid;
}

.lang-item {
  font-size: 16px;
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}

.lang-item:hover {
  font-size: 18px;
  background: #b0d6ce4d;
}

.user-info {
  font-size: 20px;
  color: #fff;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin: 10px 0 10px 10px;
    float: right;
  }
}

.badge {
  line-height: 18px;
}

.position-left {
  left: 200px;
}

.position-collapse-left {
  left: 65px;
}
</style>
