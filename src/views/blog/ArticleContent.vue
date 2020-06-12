<template>
  <div class="text-left">
    <article v-html="content" />
  </div>
</template>

<script>
export default {
  name: "ArticleContent",
  data() {
    return {
      content: "",
      title: "",
    };
  },
  mounted() {
    let articleId = this.$route.params.articleId;
    if (articleId) {
      this.articleId = articleId;
      this.$api.blog.getBlogArticleById({ articleId }).then(res => {
        if (res.code === 0) {
          if (res.data != null) {
            let article = res.data;
            this.content = article.htmlContent;
            this.title = article.title;
          }
        } else {
          this.$message.error({
            message: res.message
          });
        }
      });
    }
  },
};
</script>

<style scoped></style>
