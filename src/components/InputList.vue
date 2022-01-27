<template>
  <div class="flex flex-col">
    <input type="text" v-model="vList" @change="onChange" />
    <small>Separate items with a comma.</small>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: false,
      default: [],
    },
  },

  data() {
    return {
      vList: "",
    };
  },
  mounted() {
    if (this.list?.length > 0) {
      this.vList = this.list.join(", ");
    }
  },
  methods: {
    onChange() {
      this.$emit("change", this.listArray);
    },
  },
  computed: {
    listArray() {
      const arr = this.vList.split(",").map((item) => item.trim());
      return arr;
    },
  },
};
</script>
