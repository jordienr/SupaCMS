<script>
import { supa, config } from "./supabase";
export default {
  mounted() {
    console.log(supa);
  },
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
        class="w-56 bg-white font-medium flex flex-col min-h-screen fixed border-r"
      >
        <h2 class="p-4 font-medium border-b">
          <router-link to="/">{{ appName }}</router-link>
        </h2>
        <div class="flex flex-col mt-6">
          <router-link
            v-for="t in tables"
            class="px-6 py-2 my-1 mx-2 rounded-lg text-gray-500 hover:text-gray-900 hover:border-gray-400 border hover:bg-gray-50"
            :key="t.name"
            :to="'t/' + t.name"
          >
            {{ t.label }}
          </router-link>
        </div>

        <div class="mt-auto border-t">
          <router-link
            to="/settings"
            class="m-4 text-center py-2 px-4 hover:bg-gray-100 block rounded-lg"
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
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");

body {
  font-family: "Source Sans Pro", sans-serif;
  background-color: theme("colors.gray.50");
}

a,
button {
  @apply transition-colors;
}

a.router-link-active {
  @apply bg-gray-100 text-gray-800 font-medium border-gray-400;
}
</style>
