<template>
  <div class="flex flex-col p-4 h-full">
    <h2 class="text-lg font-medium px-4 py-2 border-b">Add data</h2>
    <div class="flex-grow overflow-y-auto">
      <div
        v-for="input in tableConfig.cols"
        class="flex flex-col max-w-4xl mx-auto mt-4"
      >
        <div v-if="input.type === 'markdown'" class="">
          <RichTextEditor
            @change="(e) => onChange(e, input.name, input.type)"
            ref="richTextEditor"
            :content="row.content"
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
import ImagePicker from "./ImagePicker.vue";

export default {
  components: {
    RichTextEditor,
    ImagePicker,
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

      this.$emit("submitted");

      console.log("Submit", data, error);
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
      };

      handlers[type](e);
    },
  },
};
</script>
