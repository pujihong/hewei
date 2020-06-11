<template>
  <article v-html="content" />
</template>

<script>
export default {
  name: "ArticleContent",
  data() {
    return {
      content: ""
    };
  }
};
</script>

<style scoped></style>
