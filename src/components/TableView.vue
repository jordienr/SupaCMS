<template>
  <div class="">
    <div
      class="flex justify-between items-center bg-white sticky top-0 backdrop-filter backdrop-blur-sm p-4 bg-opacity-90"
    >
      <h1 class="font-medium">
        {{ tableConfig.label }} - {{ tableData.length }} items
      </h1>
      <button
        class="px-3 py-2 bg-blue-500 text-white font-medium text-sm shadow-md rounded-lg hover:bg-blue-400"
        @click="addDataHandler"
      >
        Add data
      </button>
    </div>
    <pre v-if="loading">loading...</pre>
    <pre v-if="error" class="bg-red-50">{{ error }}</pre>
    <pre v-if="!loading && tableData.length === 0">    No data found</pre>
    <div v-else>
      <table class="min-w-full divide-y divide-gray-200">
        <thead
          class="bg-white bg-opacity-80 backdrop-blur-sm backdrop-filter sticky top-16 shadow-md"
        >
          <tr>
            <th
              class="px-5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              v-for="cl in colLabels"
              :key="cl"
            >
              {{ cl }}
            </th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white truncate border-t font-mono max-w-sm hover:bg-gray-50 transition-colors cursor-pointer"
            v-for="(row, ind) in tableData"
            :key="ind"
            @click="editRow(row)"
          >
            <td
              class="px-6 py-3 max-w-md overflow-x-hidden overflow-ellipsis"
              v-for="td in row"
              :key="td"
            >
              <span v-if="checkIfItsImg(td)">
                <img :src="td" class="h-8 w-8" />
              </span>
              <span v-else>
                {{ td }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <transition name="fade">
    <div
      v-if="showModal"
      @click.stop="showModal = false"
      class="bg-gray-800 fixed top-0 left-0 z-index-1 w-full bg-opacity-70 h-screen flex justify-center items-center p-8"
    >
      <transition name="slide-fade">
        <div
          v-if="showModal"
          @click.stop
          class="bg-white h-full w-full max-w-screen-lg mx-auto rounded-md"
        >
          <AddDataForm
            :row="selectedRow"
            @cancel="showModal = false"
          ></AddDataForm>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { supa, config } from "../supabase";
import AddDataForm from "./AddDataForm.vue";

export default {
  components: { AddDataForm },
  data() {
    return {
      loading: true,
      tableData: [],
      error: undefined,
      showModal: false,
      selectedRow: {},
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
      return this.cols.map((c) => c.name).join() + ", id";
    },
    addRowForm() {},
  },
  methods: {
    async fetchTableData() {
      this.loading = true;
      const { data, error } = await supa
        .from(this.table)
        .select(this.colSelect);
      this.tableData = data || [];
      this.error = error;
      this.loading = false;
    },
    async addRow() {
      this.showModal = true;
    },
    editRow(row) {
      this.selectedRow = row;
      this.showModal = true;
    },
    addDataHandler() {
      this.showModal = true;
    },
    checkIfItsImg(uri) {
      if (typeof uri !== "string") {
        return false;
      }
      uri = uri.split("?")[0];
      //moving on, split the uri into parts that had dots before them
      const parts = uri.split(".");
      //get the last part ( should be the extension )
      const extension = parts.at(-1);
      //define some image types to test against
      const imageTypes = ["jpg", "jpeg", "tiff", "png", "gif", "bmp", "svg"];
      //check if the extension matches anything in the list.
      if (imageTypes.indexOf(extension) !== -1) {
        return true;
      }
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
