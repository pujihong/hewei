<template>
  <div>
    <template>
      <el-form
        :model="loginForm"
        :rules="fieldRules"
        ref="loginForm"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
      >
        <h3 class="title">系统登录</h3>
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            auto-complete="off"
            placeholder="账号"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            auto-complete="off"
            placeholder="密码"
          />
        </el-form-item>
        <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
        <el-form-item style="width:100%;">
          <el-button
            type="primary"
            style="width:48%;"
            @click.native.prevent="reset"
            >重 置</el-button
          >
          <el-button
            type="primary"
            style="width:48%;"
            @click.native.prevent="login"
            :loading="logining"
            >登 录
          </el-button>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      logining: false,
      loginForm: {
        username: "",
        password: ""
      },
      fieldRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  methods: {
    login() {
      let userInfo = {
        username: this.loginForm.username,
        password: this.loginForm.password
      };
      this.$api.sys.login(userInfo).then(res => {
        if (res.code === 0) {
          sessionStorage.setItem("token", res.data.token); // 保存用户到本地会话
          this.$store.commit("menuRouteLoaded", false); // 要求重新加载导航菜单
          this.$router.push("/"); // 登录成功，跳转到主页
        } else {
          this.$message.error({
            message: res.message
          });
        }
      });
    },
    reset() {
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 150px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .remember {
    margin: 0 0 35px 0;
  }
}
</style>
