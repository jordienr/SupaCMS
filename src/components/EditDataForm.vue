<template>
  <div class="flex h-full flex-col p-4">
    <h2 class="border-b px-4 py-2 text-lg font-medium">Add data</h2>
    <div class="flex-grow overflow-y-auto">
      <div
        v-for="input in tableConfig.cols"
        class="mx-auto mt-4 flex max-w-4xl flex-col"
      >
        <div v-if="input.type === 'markdown'" class="">
          <RichTextEditor
            @change="(e) => onChange(e, input.name, input.type)"
            ref="richTextEditor"
            :content="row.content"
          />
        </div>
        <div v-else-if="input.type === 'list'">
          <InputList
            :list="formData[input.name]"
            @change="(e) => onChange(e, input.name, input.type)"
          />
        </div>
        <div v-else-if="input.type === 'image'">
          <ImagePicker
            :url="formData[input.name]"
            @select="(e) => onChange(e, input.name, input.type)"
          />
        </div>
        <div
          v-else-if="input.type === 'boolean'"
          class="flex items-center gap-3"
        >
          <input
            type="checkbox"
            :name="input.label"
            :id="input.label"
            v-model="formData[input.name]"
            @change="(e) => onChange(e, input.name, input.type)"
            class="h-6 w-6"
          />
          <label class="text-md" :for="input.label">{{ input.label }}</label>
        </div>
        <div v-else class="flex flex-col">
          <label :for="input.label">{{ input.label }}</label>
          <input
            :ref="input.name"
            :id="input.label"
            :name="input.name"
            v-model="formData[input.name]"
            :placeholder="formData[input.name]"
            :type="getInputType(input.type)"
            @change="(e) => onChange(e, input.name, input.type)"
          />
        </div>
        <img
          class="mx-auto mt-4 border"
          v-if="input.type === 'image' && formData[input.name + '_preview']"
          width="140"
          :src="formData[input.name + '_preview']"
          alt=""
        />
      </div>
      <pre
        class="m-4 mt-12 overflow-auto rounded-lg border-t bg-slate-800 p-4 pt-12 text-gray-100"
        >{{ formData }}
      </pre>
    </div>
    <div
      class="mt-auto flex items-center justify-between gap-4 justify-self-end border-t pt-4"
    >
      <button class="btn-cancel" @click="deleteRow">Delete</button>
      <div class="flex gap-4">
        <button class="btn-secondary" @click="$emit('cancel')">Cancel</button>
        <button @click="submit" class="btn-primary">Submit</button>
      </div>
    </div>
  </div>
</template>
<script>
import config from "../../supacms.config";
import { supa } from "../supabase";
import RichTextEditor from "./RichTextEditor.vue";
import ImagePicker from "./ImagePicker.vue";
import InputList from "./InputList.vue";

export default {
  components: {
    RichTextEditor,
    ImagePicker,
    InputList,
  },
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  created() {
    if (this.row.id) {
      this.formData = { ...this.row };
    }
  },

  computed: {
    table() {
      return this.$route.params.table;
    },
    tableConfig() {
      return config.tables.find((t) => t.name === this.table);
    },
  },
  methods: {
    async deleteRow() {
      if (confirm("Are you sure you want to delete this row?")) {
        await supa.from(this.table).delete().match({
          id: this.row.id,
        });
        this.$emit("submit");
      }
    },
    getInputType(type) {
      const inputTypes = {
        text: "text",
        number: "number",
        date: "date",
        image: "text",
      };

      return inputTypes[type];
    },
    async submit() {
      const { data, error } = await supa
        .from(this.table)
        .update(this.formData)
        .match({ id: this.row.id });

      this.$emit("submit");
    },
    onChange(e, name, type) {
      const handlers = {
        image: () => {
          this.formData[name] = e;
        },
        boolean: () => {
          this.formData[name] = e.target.checked;
        },
        default: () => {
          this.formData[name] = e.target.value;
        },
        markdown: () => {
          if (typeof e === "string") {
            this.formData[name] = e;
          }
        },
        list: () => {
          if (e.length > 0) {
            this.formData[name] = e;
          }
        },
      };
      handlers[type](e);
    },
  },
};
</script>
