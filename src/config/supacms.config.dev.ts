import { Config } from "./config";

// ?: This file is used for development, you can ignore it.

const config: Config = {
  appName: "Toolhunt Admin",
  supabaseUrl: "https://jxcnfvxwqmeuomyvekfo.supabase.co",
  supabaseAnonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODU0Nzk5MSwiZXhwIjoxOTU0MTIzOTkxfQ.IDkHBcS4YasquJ12_RoXz5SLtX7tXCay0RpnWpODpb0",
  tables: [
    {
      name: "newsletter",
      label: "Newsletter",
      cols: [
        {
          name: "email",
          label: "Email",
          type: "text",
        },
        {
          name: "created_at",
          label: "Created at",
          type: "date",
        },
      ],
    },
    {
      name: "tools",
      label: "Tools",
      cols: [
        {
          name: "logo",
          type: "image",
          bucket: "logos",
        },
        {
          name: "name",
          type: "text",
        },
        {
          name: "desc",
          label: "Description",
          type: "text",
          hideInTable: true,
        },
        {
          name: "slug",
          type: "text",
          hideInTable: true,
        },
        {
          name: "website",
          type: "text",
          hideInTable: false,
        },
        {
          name: "pricing",
          type: "text",
          hideInTable: false,
        },
        {
          name: "tags",
          type: "list",
          hideInTable: true,
        },
        {
          name: "isAffiliateLink",
          label: "Affiliate",
          type: "boolean",
          align: "right",
          hideInTable: false,
        },
      ],
    },
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
    {
      name: "collections",
      label: "Collections",
      cols: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "slug",
          type: "text",
        },
        {
          name: "desc",
          label: "Description",
          type: "text",
          hideInTable: true,
        },
        {
          name: "tools",
          type: "list",
        },
      ],
    },
  ],
  buckets: [
    {
      name: "logos",
      label: "Logos",
    },
    {
      name: "blog",
      label: "Blog",
    },
  ],
};

export default config;
