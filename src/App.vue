<script>
import { supabase, config } from "./supabase";
export default {
  mounted() {
    console.log(supabase);
  },
  computed: {
    tables() {
      return config.tables;
    },
    appName() {
      return config.appName;
    },
  },
};
</script>

<template>
  <div class="flex min-h-screen">
    <aside class="pt-6 px-4 w-64 bg-gray-800 text-white">
      <router-link to="/" class="p-2 text-xl font-medium">
        {{ appName }}
      </router-link>
      <div class="flex flex-col gap-2 mt-6">
        <router-link
          v-for="t in tables"
          class="px-6 py-2 rounded-md hover:bg-gray-900"
          :key="t.name"
          :to="'t/' + t.name"
        >
          {{ t.label }}
        </router-link>
      </div>
    </aside>
    <main class="w-full">
      <router-view></router-view>
    </main>
  </div>
</template>

<style></style>
