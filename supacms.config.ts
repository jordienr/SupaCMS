const config = {
  appName: "SupaCMS",
  supabaseUrl: "https://jxcnfvxwqmeuomyvekfo.supabase.co",
  // schema: "/rest/v1/?apikey=${anon.value}",
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
          type: "text",
        },
      ],
    },
    {
      name: "tools",
      label: "Tools",
      cols: [
        {
          name: "logo",
          label: "Logo",
          type: "image",
          bucket: "logos",
        },
        {
          name: "name",
          label: "Name",
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
          label: "Slug",
          type: "text",
          hideInTable: true,
        },
        {
          name: "website",
          label: "Website",
          type: "text",
          hideInTable: false,
        },
        {
          name: "pricing",
          label: "Pricing",
          type: "text",
          hideInTable: false,
        },
        {
          name: "tags",
          label: "Tags",
          type: "list",
          hideInTable: true,
        },
        {
          name: "isAffiliateLink",
          label: "Affiliate",
          type: "boolean",
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
