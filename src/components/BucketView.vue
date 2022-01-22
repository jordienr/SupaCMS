<template>
  <div>
    <h1 class="p-4 font-medium text-lg">Bucket: {{ $route.params.bucket }}</h1>

    <div
      v-for="file in files"
      class="m-4 border border-slate-500 rounded-lg p-4"
    >
      <div v-if="file.id">
        <img v-if="file.isImage" width="300" :src="file.publicURL" alt="" />
        <pre>{{ file }}</pre>
        <button
          class="px-3 py-2 border border-slate-400 rounded-lg m-4"
          @click="deleteFile(file.id)"
        >
          Delete
        </button>
      </div>
      <div v-else>folder: {{ file.name }}</div>
    </div>
  </div>
</template>
<script>
import { supa } from "../supabase";

export default {
  data() {
    return {
      bucketData: {},
      files: [],
    };
  },
  computed: {},
  mounted() {
    this.fetchBucketFiles();
  },
  methods: {
    isImage(f) {
      return f.metadata?.mimetype?.includes("image") || false;
    },
    async fetchBucketFiles() {
      const { data, error } = await supa.storage
        .from(this.$route.params.bucket)
        .list(undefined, {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });
      this.bucketData = data;
      data.forEach(async (file) => {
        const url = await supa.storage
          .from(this.$route.params.bucket)
          .getPublicUrl(file.name);

        this.files.push({
          ...file,
          ...url,
          isImage: this.isImage(file) || false,
        });
      });
    },
  },
};
</script>
