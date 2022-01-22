<template>
  <div class="flex flex-col p-4 h-full">
    <h2 class="text-lg font-medium px-4 py-2 border-b">Add data</h2>
    <div class="flex-grow overflow-y-auto">
      <div
        v-for="input in tableConfig.cols"
        class="flex flex-col max-w-4xl mx-auto mt-4"
      >
        <div
          v-if="input.type === 'rich-text'"
          class="focus-within:border-blue-500 hover:border-blue-500 focus-within:ring-1 ring-offset-2 border border-gray-300 p-4 rounded-lg my-4"
        >
          <RichTextEditor ref="richTextEditor" />
        </div>
        <div v-else-if="input.type === 'boolean'">
          <label :for="input.label">{{ input.label }}</label>
          <input
            type="checkbox"
            :name="input.label"
            :id="input.label"
            @change="(e) => onChange(e, input.name, input.type)"
            class="mx-auto"
          />
        </div>
        <div v-else class="flex flex-col">
          <label :for="input.label">{{ input.label }}</label>
          <input
            :ref="input.name"
            :id="input.label"
            :name="input.name"
            :placeholder="formData[input.name]"
            :type="getInputType(input.type)"
            @change="(e) => onChange(e, input.name, input.type)"
          />
        </div>
        <img
          class="border mx-auto mt-4"
          v-if="input.type === 'image' && formData[input.name + '_preview']"
          width="140"
          :src="formData[input.name + '_preview']"
          alt=""
        />
      </div>
      <pre
        >{{ formData }}
      </pre>
    </div>
    <div
      class="border-t pt-4 flex mt-auto justify-self-end justify-end gap-4 items-center"
    >
      <button class="font-medium px-4" @click="$emit('cancel')">Cancel</button>
      <button @click="submit" class="btn-primary">Submit</button>
    </div>
  </div>
</template>
<script>
import config from "../../supacms.config";
import { supa } from "../supabase";
import RichTextEditor from "./RichTextEditor.vue";

export default {
  components: {
    RichTextEditor,
  },
  props: {},
  mounted() {},
  data() {
    return {
      formData: {},
    };
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
    getInputType(type) {
      const inputTypes = {
        text: "text",
        number: "number",
        date: "date",
        image: "file",
      };

      return inputTypes[type];
    },
    async submit() {
      console.log("SUBMIT!!");
      const data = {};

      for (const col of this.tableConfig.cols) {
        if (col.type === "rich-text") {
          data[col.name] = (
            await this.$refs.richTextEditor.editor.save()
          ).blocks;
        } else if (col.type === "image" || col.type === "file") {
          // UPLOAD FILE TO BUCKET AND SAVE URL TO DATA
          await supa.storage
            .from(col.bucket)
            .upload(this.formData[col.name + "_name"], this.formData[col.name]);

          const { publicURL } = await supa.storage
            .from(col.bucket)
            .getPublicUrl(this.formData[col.name + "_name"]);

          data[col.name] = publicURL;
        } else {
          data[col.name] = this.formData[col.name];
        }
      }

      const { error } = await supa.from(this.tableConfig.name).insert(data);

      console.log(error);
    },
    onChange(e, name, type) {
      if (type === "image") {
        const file = e.target.files[0];
        this.formData[name + "_preview"] = URL.createObjectURL(file);
        this.formData[name + "_name"] = file.name;
        this.formData[name] = e.target.files[0];
      } else if (type === "boolean") {
        this.formData[name] = e.target.checked;
      } else {
        this.formData[name] = e.target.value;
      }
    },
  },
};
</script>
