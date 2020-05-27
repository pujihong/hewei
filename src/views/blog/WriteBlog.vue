<template>
  <div>
    <div class="flex flex-row flex-col-center">
      <div class="mg-r-10 icon-home" @click="backHome">
        <i class="iconfont icon-shouye font24" />
      </div>
      <el-input
        type="text"
        placeholder="输入文章标题"
        v-model="title"
        maxlength="30"
        show-word-limit
      >
      </el-input>
      <el-select
        v-if="labelList.length > 0"
        v-model="labelId"
        placeholder="请选择"
        class="mg-l-10"
      >
        <el-option
          v-for="item in labelList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <div class="mg-l-20">
        <button class="btn btn-save" @click="saveBlogArticle(0)">保存草稿</button>
      </div>
      <div class="mg-l-10">
        <button class="btn btn-publish" @click="saveBlogArticle(1)">发布文章</button>
      </div>
    </div>

    <Markdown
      :value="content"
      v-on:getContent="getContent"
      v-bind:height="580"
    />
    <div>{{ content }}</div>
  </div>
</template>

<script>
import Markdown from "@/components/Markdown/index";

export default {
  name: "WriteBlog",
  components: {
    Markdown
  },
  data() {
    return {
      title: "",
      content: "",
      htmlContent: "",
      labelList: [],
      labelId: "",
      labelName: ""
    };
  },
  mounted() {
    // 查询自己所有的标签
    this.$api.blog.getUserBlogLabelList().then(res => {
      if (res.code === 0) {
        this.labelList = res.data;
      } else {
        this.$message.error({
          message: res.message
        });
      }
    });
  },
  methods: {
    saveBlogArticle(boolPublish) {
      if (this.title === "") {
        this.$message.error("请输入标题");
        return;
      }
      if (this.content === "") {
        this.$message.error("请输入内容");
        return;
      }
      let articleInfo = {
        title: this.title,
        labelId: this.labelId,
        content: this.content,
        htmlContent: this.htmlContent,
        boolMarkdown: 1,
        boolPublish: boolPublish
      };
      this.$api.blog.saveBlogArticle(articleInfo).then(res => {
        if (res.code === 0) {
          this.$router.go(-1);
        } else {
          this.$message.error({
            message: res.message
          });
        }
      });
    },

    backHome() {
      // 判断是否有输入
      this.$router.go(-1);
    },
    getContent(value, render) {
      this.content = value;
      this.htmlContent = render;
    }
  }
};
</script>

<style scoped lang="scss">
.btn-save {
  color: #ca0c16;
  border: 1px solid #ca0c16;
  border-radius: 4px;
  background-color: $white;
}

.btn {
  width: 100px;
  height: 38px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  color: #ca0c16;
  outline: none;
}

.btn-save:hover {
  background-color: #fde3e4;
  border: 1px solid #ca0c16;
  color: #ca0c16;
}

.btn-publish {
  color: #fff;
  border: none;
  border-radius: 4px;
  white-space: nowrap;
  background-color: #ca0c16;
}

.btn-publish:hover {
  background-color: #b60b14;
}

.icon-home {
  cursor: pointer;
}
</style>
