<template>
  <div class="container">
    <Aside></Aside>
    <Header></Header>
    <Main></Main>
  </div>
</template>

<script>
import Aside from "./container/Aside";
import Header from "./container/Header";
import Main from "./container/Main";

export default {
  components: {
    Aside,
    Header,
    Main
  }
};
</script>

<style scoped lang="scss">
.container {
}
</style>
