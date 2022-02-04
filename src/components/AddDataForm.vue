<template>
  <div class="flex flex-col h-full">
    <h2 class="text-lg font-medium py-4 px-6 border-b">Add data</h2>
    <div class="flex-grow overflow-y-auto px-4">
      <div
        v-for="input in tableConfig.cols"
        class="flex flex-col max-w-4xl mx-auto mt-4"
      >
        <div v-if="input.type === 'markdown'" class="">
          <RichTextEditor
            @change="(e) => onChange(e, input.name, input.type)"
            ref="richTextEditor"
          />
        </div>
        <div v-else-if="input.type === 'list'">
          <label :for="input.name">{{ input.label || input.name }}</label>
          <InputList @change="(e) => onChange(e, input.name, input.type)" />
        </div>
        <div v-else-if="input.type === 'image'">
          <ImagePicker @select="(e) => onChange(e, input.name, input.type)" />
        </div>
        <div v-else-if="input.type === 'boolean'">
          <label :for="input.label">{{ input.label || input.name }}</label>
          <input
            type="checkbox"
            :name="input.label"
            :id="input.label"
            @change="(e) => onChange(e, input.name, input.type)"
            class="mx-auto"
          />
        </div>
        <div v-else class="flex flex-col">
          <label :for="input.label">{{ input.label || input.name }}</label>
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
      <pre class="overflow-x-auto p-4 rounded-lg bg-slate-800 text-white mt-12"
        >{{ formData }}
      </pre>
    </div>
    <div
      class="border-t p-4 flex mt-auto justify-self-end justify-end gap-4 items-center"
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
import InputList from "./InputList.vue";

export default {
  components: {
    RichTextEditor,
    ImagePicker,
    InputList,
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
      const { error } = await supa
        .from(this.tableConfig.name)
        .insert(this.formData);

      this.$emit("submit");

      console.log(error);
    },
    onChange(e, name, type) {
      if (type === "image") {
        this.formData[name] = e;
      } else if (type === "markdown") {
        if (typeof e === "string") {
          this.formData[name] = e;
        }
      } else if (type === "boolean") {
        this.formData[name] = e.target.checked;
      } else if (type === "list") {
        if (Array.isArray(e)) {
          this.formData[name] = e;
        }
      } else {
        this.formData[name] = e.target.value;
      }
    },
  },
};
</script>
