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
  <div class="app-container mx-auto">
    <div class="">
      <aside
        v-if="showSidebar"
        class="fixed z-10 flex min-h-screen w-56 flex-col border-r bg-gradient-to-b from-slate-900 to-slate-800 font-medium text-slate-200"
      >
        <h2
          class="border-b border-slate-700 p-4 text-center text-lg font-semibold"
        >
          <router-link class="logo" to="/">{{ appName }}</router-link>
        </h2>

        <div class="mt-6 flex flex-col">
          <h3
            class="my-3 px-4 text-xs font-semibold uppercase tracking-widest text-slate-400"
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
            class="mb-3 mt-6 px-4 text-xs font-semibold uppercase tracking-widest text-slate-400"
          >
            Files
          </h3>
          <div v-for="bucket in buckets">
            <router-link class="router-link" :to="'/files/' + bucket.name">
              {{ bucket.label }}
            </router-link>
          </div>
        </div>

        <div class="mt-auto border-t border-slate-600 py-4">
          <router-link to="/settings" class="router-link text-center"
            >Settings</router-link
          >
        </div>
      </aside>
      <main
        class=""
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
  @apply my-1 mx-4 block rounded-lg px-4 py-2 font-normal text-slate-300 hover:bg-slate-700/30 hover:text-slate-100;
}

a.router-link-active:not(.logo) {
  @apply highlight-slate-300/20 bg-slate-700/40 font-medium text-slate-100;
}
</style>
