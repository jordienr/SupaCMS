<template>
  <div class="pb-4 border-b">
    <h2 class="font-medium">File Browser</h2>
  </div>
  <div class="my-4">
    <pre v-if="loading">Loading...</pre>
    <div v-else-if="buckets.length">
      <!-- SELECTED BUCKET -->
      <div v-if="selectedBucket">
        <button @click="selectedBucket = null">Go back</button>
        <h3 class="py-4 font-medium">{{ selectedBucket.name }}</h3>
        <div v-for="file in bucketFiles" class="flex flex-col border-y py-4">
          <label for="">Name</label>
          <pre>{{ file.name }}</pre>

          <label class="mt-2" for="">URL</label>
          <pre>{{ file.publicURL }}</pre>
          <div class="flex justify-end">
            <button class="btn-primary" @click="selectUrl(file.publicURL)">
              Select
            </button>
          </div>
        </div>
      </div>

      <!-- BUCKET PICKER -->
      <div
        v-else
        v-for="bucket in buckets"
        class="flex items-center mb-4 py-2 px-4 border rounded-md"
        @click="selectBucket(bucket)"
      >
        <div class="flex-grow">
          <h3 class="font-medium">{{ bucket.name }}</h3>
          <p class="text-xs">{{ bucket.public ? "public" : "private" }}</p>
        </div>
      </div>
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

export default {
  data() {
    return {
      loading: true,
      buckets: [],
      selectedBucket: "",
      bucketFiles: [],
    };
  },
  async mounted() {
    this.buckets = await fetchBuckets();
    this.loading = false;
  },
  methods: {
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
};
</script>
