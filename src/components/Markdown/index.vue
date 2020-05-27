<template>
  <div id="editor">
    <mavon-editor
      :style="{ height: height + 'px' }"
      v-model="content"
      :toolbars="markdownOption"
      @change="inputChange"
    />
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import toolbars from "./toolbars";

export default {
  name: "Markdown",
  components: {
    mavonEditor
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      required: false,
      default: 580
    }
  },
  data() {
    return {
      markdownOption: toolbars,
      content: this.value
    };
  },
  methods: {
    inputChange(value, render) {
      this.$emit("getContent", value, render);
    }
  }
};
</script>

<style scoped lang="scss">
#editor {
  margin: auto;
  height: 580px;
}
</style>
