<template>
  <div class="">
    <div
      class="flex w-full flex-grow items-center justify-between bg-white p-4 sticky top-0 border-b z-20 backdrop-blur-md bg-opacity-50"
    >
      <h1 class="font-medium">
        {{ tableConfig.label }} - {{ tableData.length }} items
      </h1>
      <div class="ml-auto flex gap-4">
        <input
          type="text"
          name="search"
          id="search"
          v-model="search"
          autocomplete="off"
          placeholder="Search..."
        />
        <button @click="refresh" class="btn">Refresh</button>
        <button class="btn-primary" @click="addDataHandler">Add data</button>
      </div>
    </div>
    <pre v-if="loading">loading...</pre>
    <pre v-if="error" class="bg-red-50">{{ error }}</pre>
    <pre v-if="!loading && tableData.length === 0">No data found</pre>
    <div
      v-if="!loading && tableData.length > 0"
      class="min-h-screen overflow-auto"
    >
      <table
        class="mt-4 mb-48 min-w-full divide-y divide-gray-200 overflow-x-auto"
      >
        <thead class="bg-opacity-80 backdrop-blur-sm backdrop-filter">
          <tr>
            <th
              class="px-5 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 bg-transparent"
              v-for="h in tableHeaders"
              :key="h.name"
              :class="{ 'text-right': h.align === 'right' }"
            >
              {{ h.label || h.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="max-w-sm cursor-pointer truncate border-t bg-white font-mono ring-inset transition-colors hover:bg-blue-50"
            v-for="(row, ind) in tableDataSearch"
            :key="ind"
            @click="editRow(row)"
          >
            <td
              class="max-w-md overflow-x-hidden overflow-ellipsis px-6 py-3"
              v-for="(td, name) in normalizeRow(row)"
              :key="td"
              :class="{ ...getTdClasses(name) }"
            >
              <span v-if="name === 'id'"></span>
              <span v-else-if="checkIfItsImg(td)">
                <img :src="td" class="h-8 w-8" />
              </span>
              <span v-else-if="Array.isArray(td)">{{ td.join(", ") }}</span>
              <span v-else-if="typeof td === 'boolean'">
                <span
                  class="rounded-lg bg-green-100 px-2 py-1 text-green-600"
                  v-if="td"
                  >✔</span
                >
                <span
                  class="rounded-lg bg-red-100 px-2 py-1 text-red-600"
                  v-else
                  >✖</span
                >
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
      class="fixed top-0 left-0 z-20 flex h-screen w-full items-center justify-center bg-gray-800 bg-opacity-70 p-8 backdrop-blur-sm"
    >
      <transition name="slide-fade">
        <div
          v-if="showModal"
          @click.stop
          class="mx-auto h-full w-full max-w-screen-lg rounded-xl bg-white shadow-md"
        >
          <AddDataForm
            v-if="modalType === 'add'"
            :row="selectedRow"
            @submit="
              () => {
                showModal = false;
                refresh();
              }
            "
            @cancel="showModal = false"
          ></AddDataForm>
          <EditDataForm
            v-else
            @cancel="showModal = false"
            @submit="
              () => {
                showModal = false;
                refresh();
              }
            "
            :row="selectedRow"
          >
          </EditDataForm>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { supa, config } from "../supabase";
import AddDataForm from "./AddDataForm.vue";
import EditDataForm from "./EditDataForm.vue";

export default {
  components: { AddDataForm, EditDataForm },
  data() {
    return {
      loading: true,
      tableData: [],
      error: undefined,
      showModal: false,
      selectedRow: {},
      search: "",
    };
  },
  beforeRouteLeave(to, from, next) {
    this.search = "";
    next();
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
    tableHeaders() {
      return this.tableConfig.cols.filter((c) => c.hideInTable !== true);
    },
    colLabels() {
      return this.cols.map((c) => c.label);
    },
    colSelect() {
      return this.cols.map((c) => c.name).join() + ", id";
    },
    tableDataSearch() {
      return this.tableData.filter((row) => {
        return this.cols.some((col) => {
          return row[col.name]
            .toString()
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      });
    },
  },
  methods: {
    getTdClasses(name) {
      const classes = {};

      const col = this.cols.find((c) => c.name === name);

      if (col?.align) {
        classes[`text-${col.align}`] = true;
      }
      return classes;
    },
    normalizeRow(row) {
      const copy = { ...row };
      // only keep cols that don't have hideInTable set to true
      this.cols.forEach((c) => {
        if (c.hideInTable) {
          delete copy[c.name];
        }
      });
      return copy;
    },
    refresh() {
      this.fetchTableData();
    },
    async fetchTableData() {
      this.loading = true;
      const { data, error } = await supa
        .from(this.table)
        .select(this.colSelect)
        .order("created_at", {
          ascending: false,
        });
      this.tableData = data || [];
      this.error = error;
      this.loading = false;
    },
    async addRow() {
      this.showModal = true;
    },
    editRow(row) {
      this.selectedRow = row;
      this.modalType = "edit";
      this.showModal = true;
    },
    addDataHandler() {
      this.modalType = "add";
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
