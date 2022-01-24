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
        },
        {
          name: "slug",
          label: "Slug",
          type: "text",
        },
        {
          name: "pricing",
          label: "Pricing",
          type: "text",
        },
        {
          name: "website",
          label: "Website",
          type: "text",
        },
        {
          name: "tags",
          label: "Tags",
          type: "list",
        },
        {
          name: "isAffiliateLink",
          label: "Is Affiliate Link",
          type: "boolean",
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
        },
        {
          name: "published",
          label: "Published",
          type: "boolean",
        },
        {
          name: "tags",
          label: "Tags",
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
