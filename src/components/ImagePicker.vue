<template>
  <div class="flex flex-col relative">
    <label>Image URL</label>
    <div class="flex gap-4 justify-center items-center">
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
      class="absolute z-10 bg-slate-800 bg-opacity-80 backdrop-blur-sm left-0 right-0 top-0 bottom-0 p-12 flex items-center justify-center overflow-hidden"
    >
      <div
        class="bg-white flex-grow z-10 p-4 border shadow-md rounded-lg h-full"
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
