<template>
  <form
    class="flex flex-col max-w-xs mx-auto my-32 bg-white p-4 rounded-lg shadow-lg"
    @submit.prevent="submit"
  >
    <label for="email">Email</label>
    <input v-model="email" type="text" name="email" id="email" />
    <button class="btn-primary mt-4" type="submit">Submit</button>
    <p class="text-red-500 mt-4">{{ error }}</p>
    <p v-if="success" class="text-green-500 mt-4">Email sent</p>
  </form>
</template>

<script>
import { supa } from "../supabase";

export default {
  data: () => ({
    email: "",
    error: "",
    success: false,
  }),
  methods: {
    async submit() {
      this.success = false;
      this.error = "";
      const { error, data } = await supa.auth.api.resetPasswordForEmail(
        this.email
      );
      if (error) {
        this.error = error.message;
      } else {
        this.success = true;
      }
    },
  },
};
</script>
