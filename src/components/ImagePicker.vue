<template>
  <div class="relative flex flex-col">
    <label>Image URL</label>
    <div class="flex items-center justify-center gap-4">
      <input
        disabled
        v-model="imgUrl"
        class="flex-grow"
        type="text"
        name=""
        id=""
      />
      <button v-if="imgUrl.length" @click="clear" class="btn-secondary">
        Clear
      </button>
      <button @click="browseClick" class="btn-primary">Browse</button>
    </div>
    <img class="m-4" width="200" v-if="imgUrl.length" :src="imgUrl" alt="" />
  </div>
  <transition name="fade">
    <div
      v-if="showMenu"
      @click.self="showMenu = false"
      class="absolute left-0 right-0 top-0 bottom-0 z-10 flex items-center justify-center overflow-hidden bg-slate-800 bg-opacity-80 p-12 backdrop-blur-sm"
    >
      <div
        class="z-10 h-full max-w-4xl flex-grow overflow-auto rounded-lg border bg-white p-4 shadow-md"
      >
        <FileBrowser @select="selectImg" />
      </div>
    </div>
  </transition>
</template>

<script>
import FileBrowser from "./FileBrowser.vue";
export default {
  props: {
    url: {
      type: String,
      required: false,
    },
  },
  emits: ["select"],
  data() {
    return {
      imgUrl: "",
      showMenu: false,
    };
  },
  mounted() {
    console.log("URL", this.url);
    if (this.url) {
      this.imgUrl = this.url;
    }
  },
  methods: {
    clear() {
      this.imgUrl = "";
      this.$emit("select", "");
    },
    selectImg(url) {
      this.imgUrl = url;
      this.showMenu = false;
      this.$emit("select", url);
    },
    browseClick() {
      this.showMenu = true;
      console.log("browseClick");
    },
  },
  components: { FileBrowser },
};
</script>
