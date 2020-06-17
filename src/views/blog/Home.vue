<template>
  <el-row>
    <el-col :span="18">
      <div>
        <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
        <el-divider></el-divider>
      </div>
      <el-row>
        <el-col :span="6">
          <div class="my-profile-box">
            这块用来做什么呢？
          </div>

          <div class="my-profile-box mg-t-20">
            这块又用来做什么呢？
          </div>
        </el-col>
        <el-col :span="18" class="pd-10">
          <div>
            这个用来展示记录列表
            <article v-if="value" v-html="value"></article>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6" class="pd-l-40">
      <div>
        这块做啥呢
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      articleList: [],
      value: ""
    };
  },
  mounted() {
    this.$api.blog.getUserBlogArticleList().then(res => {
      if (res.code === 0) {
        let dateList = res.data.records;
        this.articleList = dateList;
        if (dateList && dateList.length > 0) {
          this.value = dateList[0].htmlContent;
        }
      } else {
        this.$message.error({
          message: res.message
        });
      }
    });
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.my-profile-box {
  box-sizing: border-box;
  height: 400px;
  border: 1px solid #eaeaea;
  box-shadow: 0 2px 5px 0 rgba(33, 22, 22, 0.2),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 15px;
}
</style>
