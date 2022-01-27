<template>
  <div>
    <h1 class="p-4 font-medium text-lg">{{ files.length }} files</h1>

    <div v-for="file in files" class="m-2">
      <div
        v-if="file.id"
        class="bg-white hover:shadow-md transition-shadow ring-1 ring-slate-300 rounded-lg flex justify-between"
      >
        <div class="flex gap-4">
          <img
            class="rounded-md object-contain bg-slate-200 m-1 ring-1 ring-slate-300"
            v-if="file.isImage"
            width="100"
            :src="file.publicURL"
            alt=""
          />
          <!-- <pre>{{ file }}</pre> -->
          <div class="my-4">
            <p class="font-medium">
              {{ file.name }}
            </p>
            <p class="text-xs font-mono overflow-hidden">
              {{ formatSize(file.metadata.size) }}
            </p>
            <p
              class="overflow-hidden max-w-md text-xs font-mono tracking-tighter"
            >
              {{ file.publicURL }}
            </p>
          </div>
        </div>
        <div class="flex items-end m-4">
          <button class="btn-cancel" @click="deleteFile(file.id)">
            Delete
          </button>
        </div>
      </div>
      <div v-else class="">
        <span class="text-6xl">📂</span>
        <span>
          {{ file.name || "" }}
        </span>
      </div>
      <!-- <pre class="h-24 overflow-auto bg-slate-800 text-white p-2 rounded-lg">{{
        file
      }}</pre> -->
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
    deleteFile(id) {
      console.log(id);
    },
    isImage(f) {
      return f.metadata?.mimetype?.includes("image");
    },
    formatSize(size) {
      return (size / 1024 / 1024).toFixed(2) + " MB" || "0 MB";
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
