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
<div class="container mx-auto">
  <div class="flex">
    <aside class="py-4 w-64 min-w-max m-4 border rounded-md bg-white">
      <router-link to="/" class="p-2 px-6 text-xl font-medium">
        {{ appName }}
      </router-link>
      <div class="flex flex-col mt-6">
        <router-link
          v-for="t in tables"
          class="px-6 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          :class="{
            'bg-gray-100 text-gray-900 font-medium border-l-2 border-gray-800': this.$route.path.includes(t.name)
          }"
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
</div>
</template>

<style>
body {
  background-color: theme('colors.gray.100')
}
</style>
