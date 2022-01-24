<template>
  <div class="rounded-lg bg-slate-100 p-4 ring-1 ring-slate-300">
    <h2 class="mb-4 font-medium">Upload a file to {{ bucket }} / {{ path }}</h2>
    <input type="file" name="file" id="file" @change="handleChange" />
    <img class="mt-4" width="200" :src="previewUrl" alt="" />
    <pre v-if="file">
File will be uploaded to: {{ bucket }}/{{ file.name }}</pre
    >
    <div class="flex justify-end gap-4">
      <button class="mt-4">Clear</button>
      <button @click="uploadFile" class="btn-primary mt-4">Upload</button>
    </div>
  </div>
</template>
<script>
import { supa } from "../supabase";

export default {
  props: {
    path: {
      type: String,
      required: true,
      default: "",
    },
    bucket: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      file: null,
      previewUrl: null,
    };
  },
  methods: {
    handleChange(e) {
      this.file = e.target.files[0];

      this.previewUrl = URL.createObjectURL(this.file);
    },
    async uploadFile() {
      const { data, error } = await supa.storage
        .from(this.bucket)
        .upload(this.file.name, this.file, {
          cacheControl: "3600",
          upsert: false,
        });
      console.log(data, error);
      this.$emit("submit");
    },
  },
};
</script>
