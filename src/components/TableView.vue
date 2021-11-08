<template>
  <div class="bg-gray-100 p-4 min-h-full w-full block">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-medium">{{ tableConfig.label }}</h1>
      <button class="px-4 py-2 border bg-white rounded-md" @click="addRow">Add row</button>
    </div>
    <pre v-if="loading">loading...</pre>
    <pre v-if="error" class="bg-red-50">{{ error }}</pre>
    <div
      v-if="!loading"
      class="mt-4 overflow-hidden border border-gray-200 rounded-md"
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
                w-52
              "
              v-for="cl in colLabels"
              :key="cl"
            >
              {{ cl }}
            </th>
            <th></th>
          </tr>
        </thead>
        <tr class="bg-white truncate max-w-sm" v-for="(row, ind) in tableData" :key="ind">
          <td class="px-6 py-3 max-w-md overflow-x-hidden overflow-ellipsis" v-for="td in row" :key="td">{{ td }}</td>
          <td class="text-right">
            <button class="font-medium text-blue-500 px-6 py-2 rounded-md transition-colors hover:bg-blue-50">Edit</button>
            <button class="font-medium text-red-500 px-6 py-2 rounded-md transition-colors hover:bg-red-50">Delete</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
  <div v-if="showAddRow" @click.stop="showAddRow = false" class="bg-gray-800 fixed top-0 left-0 z-index-1 w-full bg-opacity-70 h-screen flex justify-center items-end">
    <div @click.stop class="bg-white container mx-auto mb-8 p-6 rounded-md">
      showAddRow
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
      showAddRow: false
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
    addRowForm() {
    }
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
    async addRow() {
      console.log('addRow')
      this.showAddRow = true
    }
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
