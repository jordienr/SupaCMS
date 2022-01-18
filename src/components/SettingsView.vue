<template>
  <h2 class="p-4 font-medium border-b bg-white">Settings</h2>
  <div class="max-w-2xl mx-auto p-2 px-4">
    <h3>User</h3>
    <p>{{ user.email }}</p>
    <pre class="text-gray-200 bg-gray-800 rounded overflow-scroll h-96 my-4">{{
      user
    }}</pre>
    <h3>Session</h3>
    <pre class="text-gray-200 bg-gray-800 rounded overflow-scroll h-96 my-4">{{
      session
    }}</pre>

    <h3>Theme</h3>
    <!-- Theme select -->
    <select name="theme" id="theme">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>

    <button
      class="border block w-full p-2 bg-red-50 border-red-300 text-red-500 font-medium rounded-lg mt-4 hover:bg-red-100"
      @click="$router.push('/logout')"
    >
      Sign out
    </button>
  </div>
</template>

<script>
import { supa } from "../supabase";

export default {
  data() {
    return {
      user: "",
      session: "",
    };
  },
  mounted() {
    this.user = supa.auth.user();
    this.session = supa.auth.session();
  },
};
</script>
