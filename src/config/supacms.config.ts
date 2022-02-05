import { Config } from "./config";

const config: Config = {
  appName: "MyCMS",
  supabaseUrl: "https://···.supabase.co",
  supabaseAnonKey: "···.···.···",
  tables: [
    {
      name: "blog",
      label: "Blog",
      cols: [
        {
          name: "title",
          label: "Title",
          type: "text",
        },
        {
          name: "image",
          type: "image",
          label: "Image",
          bucket: "blog",
        },
        {
          name: "content",
          label: "Content",
          type: "markdown",
          hideInTable: true,
        },
        {
          name: "tags",
          label: "Tags",
          type: "list",
        },
        {
          name: "published",
          label: "Published",
          type: "boolean",
          align: "right",
        },
      ],
    },
  ],
  buckets: [
    {
      name: "blog",
      label: "Blog",
    },
  ],
};

export default config;
