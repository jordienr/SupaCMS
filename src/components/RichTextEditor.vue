<template>
  <div>
    <textarea id="markdown-editor" class="w-full"></textarea>
  </div>
</template>

<script>
import EasyMDE from "easymde";

export default {
  data() {
    return {
      editor: null,
    };
  },
  props: {
    content: {
      type: String,
      required: false,
    },
  },
  mounted() {
    this.editor = new EasyMDE({
      element: document.getElementById("markdown-editor"),
      spellChecker: false,
      initialValue: this.content,
    });

    this.editor.codemirror.on("change", () => {
      this.$emit("change", this.editor.value());
    });
  },
};
</script>

<style lang="scss"></style>
