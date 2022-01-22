<template>
  <div id="rich-text-editor" class="w-full"></div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

export default {
  data() {
    return {
      editor: null,
    };
  },
  props: {
    content: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    this.editor = new EditorJS({
      holderId: "rich-text-editor",
      placeholder: "Start writing...",
      data: { blocks: this.content },
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: List,
      },
    });
    console.log("<<<>>", this.content);
  },

  beforeDestroy() {
    this.editor = null;
  },
};
</script>

<style lang="scss">
.ce-paragraph {
  font-size: 1rem;
}
.ce-header {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
