<template>
  <div class="bg-gray-100 p-4 min-h-full block">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-medium">{{ tableConfig.label }}</h1>
      <button class="px-4 py-2 border bg-white rounded-md">Add row</button>
    </div>
    <pre v-if="loading">loading...</pre>
    <pre v-if="error" class="bg-red-50">{{ error }}</pre>
    <div
      v-if="!loading"
      class="mt-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
    >
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
              v-for="cl in colLabels"
              :key="cl"
            >
              {{ cl }}
            </th>
            <th></th>
          </tr>
        </thead>
        <tr class="bg-white" v-for="(row, ind) in tableData" :key="ind">
          <td class="px-6 py-3" v-for="td in row" :key="td">{{ td }}</td>
          <td class="">
            <button class="font-medium text-blue-500 px-6">Edit</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { supabase, config } from "../supabase";

export default {
  data() {
    return {
      loading: true,
      tableData: [],
      error: undefined,
    };
  },
  computed: {
    table() {
      return this.$route.params.table;
    },
    tableConfig() {
      return config.tables.find((t) => t.name === this.table);
    },
    cols() {
      return this.tableConfig.cols;
    },
    colLabels() {
      return this.cols.map((c) => c.label);
    },
    colSelect() {
      return this.cols.map((c) => c.name).join();
    },
  },
  methods: {
    async fetchTableData() {
      this.loading = true;
      const { data, error } = await supabase
        .from(this.table)
        .select(this.colSelect);
      this.tableData = data;
      this.error = error;
      this.loading = false;
    },
  },
  mounted() {
    this.fetchTableData();
  },
  watch: {
    table() {
      this.fetchTableData();
    },
  },
};
</script>

<style></style>
