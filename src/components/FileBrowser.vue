<template>
  <div class="border-b pb-4">
    <h2 class="font-medium">File Browser</h2>
  </div>
  <div class="my-4">
    <pre v-if="loading">Loading...</pre>
    <div v-else-if="buckets.length">
      <!-- SELECTED BUCKET -->
      <div v-if="selectedBucket">
        <button @click="selectedBucket = null">Go back</button>
        <h3 class="py-4 font-medium">{{ selectedBucket.name }}</h3>
        <div v-for="file in bucketFiles" class="flex gap-4 border-y py-4">
          <img width="100" v-if="isImg(file)" :src="file.publicURL" alt="" />
          <label for="">Name</label>
          <pre>{{ file.name }}</pre>
          <div class="ml-auto flex items-end">
            <button class="btn-secondary" @click="selectUrl(file.publicURL)">
              Select
            </button>
          </div>
        </div>
        <div class="mt-4">
          <FileUploader
            @submit="onSubmit"
            :bucket="selectedBucket.name"
            :path="path"
          />
        </div>
      </div>

      <!-- BUCKET PICKER -->
      <button
        v-else
        v-for="bucket in buckets"
        class="mb-4 flex w-full items-center rounded-md border py-2 px-4 text-left"
        @click="selectBucket(bucket)"
      >
        <div class="flex-grow">
          <h3 class="font-medium">{{ bucket.name }}</h3>
          <p class="text-xs">{{ bucket.public ? "public" : "private" }}</p>
        </div>
      </button>
    </div>
    <pre v-else>
No buckets found. Make sure you have created a bucket and have SELECT permissions for your user.

Read more at:
<a class="text-blue-500" href="https://supabase.com/docs/reference/javascript/storage-listbuckets">https://supabase.com/docs/reference/javascript/storage-listbuckets</a>
    </pre>
  </div>
</template>

<script>
import { fetchBuckets, fetchBucketFiles } from "../core";
import FileUploader from "./FileUploader.vue";

export default {
  data() {
    return {
      loading: true,
      buckets: [],
      selectedBucket: "",
      bucketFiles: [],
      path: "",
    };
  },
  async mounted() {
    this.buckets = await fetchBuckets();
    this.loading = false;
  },
  methods: {
    async onSubmit() {
      console.log("SUBMIT!!!");
      this.loading = true;
      this.bucketFiles = await fetchBucketFiles(this.selectedBucket.name);
      this.loading = false;
    },
    isImg(file) {
      return file.metadata?.mimetype?.startsWith("image/");
    },
    selectBucket(bucket) {
      this.selectedBucket = bucket;
      this.fetchBucketFiles(bucket);
    },
    selectUrl(url) {
      this.$emit("select", url);
    },
    async fetchBucketFiles(bucket) {
      this.bucketFiles = await fetchBucketFiles(bucket.name);
    },
  },
  components: { FileUploader },
};
</script>
