<template>
  <div class="mt-36">
    <h1 class="text-center text-xl font-medium">{{ appName }}</h1>
    <form
      @submit.prevent="login"
      class="flex flex-col items-center mx-auto bg-white border shadow-lg rounded-lg max-w-xs m-8 p-4"
    >
      <h2 class="font-medium my-4">Log in with magic link</h2>
      <div v-if="!success">
        <label class="my-2 w-full" for="email">Email </label>
        <input
          class="border px-3 py-2 w-full rounded-lg"
          v-model="email"
          type="text"
          name="email"
          id="email"
          autocomplete="email"
        />
        <button
          class="px-3 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md w-full mt-4 hover:bg-blue-400"
          type="submit"
        >
          Log In
        </button>
      </div>
      <div v-else>
        <p
          class="font-medium bg-green-100 p-2 px-4 rounded border border-green-300 text-green-800"
        >
          Email sent
        </p>
      </div>
      <p class="text-red-500">
        {{ error }}
      </p>
    </form>
  </div>
</template>

<script>
import supacmsConfig from "@/config/";
import { supa } from "../supabase";
export default {
  data: () => ({
    email: "",
    error: "",
    success: false,
  }),
  methods: {
    async login() {
      this.error = "";
      const { error } = await supa.auth.signIn({
        email: this.email,
      });

      if (error) {
        this.error = error.message;
      } else {
        this.success = true;
      }
    },
  },
  mounted() {
    if (supa.auth.user()) {
      this.$router.push("/");
    }
  },
  computed: {
    appName() {
      return supacmsConfig.appName;
    },
    user() {
      return supa.auth.user();
    },
  },
};
</script>

<style></style>
