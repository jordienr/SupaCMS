<script>
import { supa, config } from "./supabase";
export default {
  mounted() {},
  computed: {
    isLoggedIn() {
      return supa.auth.user();
    },
    showSidebar() {
      return this.$route.meta.showSidebar;
    },
    tables() {
      return config.tables;
    },
    buckets() {
      return config.buckets;
    },
    appName() {
      return config.appName;
    },
  },
};
</script>

<template>
  <div class="">
    <div class="flex">
      <aside
        v-if="showSidebar"
        class="w-56 bg-gradient-to-b from-slate-900 to-slate-800 text-slate-200 font-medium flex flex-col min-h-screen fixed border-r"
      >
        <h2
          class="p-4 text-center font-semibold text-lg border-b border-slate-700"
        >
          <router-link class="logo" to="/">{{ appName }}</router-link>
        </h2>

        <div class="flex flex-col mt-6">
          <h3
            class="text-xs font-semibold px-4 my-3 text-slate-400 uppercase tracking-widest"
          >
            Content
          </h3>
          <router-link
            v-for="t in tables"
            class="router-link"
            :key="t.name"
            :to="'/content/' + t.name"
          >
            {{ t.label }}
          </router-link>
        </div>

        <div>
          <h3
            class="text-xs font-semibold px-4 mb-3 mt-6 text-slate-400 uppercase tracking-widest"
          >
            Files
          </h3>
          <div v-for="bucket in buckets">
            <router-link class="router-link" :to="`/files/${bucket.name}`">
              {{ bucket.label }}
            </router-link>
          </div>
        </div>

        <div class="mt-auto border-t py-4 border-slate-600">
          <router-link to="/settings" class="router-link text-center"
            >Settings</router-link
          >
        </div>
      </aside>
      <main
        class="w-full"
        :class="{
          'ml-56': showSidebar,
        }"
      >
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

body {
  font-family: "Inter", sans-serif;
  background-color: theme("colors.gray.50");
}

a,
button {
  @apply transition-colors;
}

a.router-link {
  @apply block px-4 py-2 my-1 mx-4 rounded-lg font-normal hover:bg-slate-700/30 text-slate-300 hover:text-slate-100;
}

a.router-link-active:not(.logo) {
  @apply bg-slate-700/40 text-slate-100 highlight-slate-300/20 font-medium;
}
</style>
