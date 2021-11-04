export default {
  appName: "🚀 SupaCMS",
  tables: [
    {
      name: "users",
      label: "Users",
      cols: [
        {
          name: "name",
          label: "Name",
        },
        {
          name: "created_at",
          label: "Date",
        },
      ],
    },
    {
      name: "articles",
      label: "Articles",
      cols: [
        {
          name: "title",
          label: "Title",
        },
        {
          name: "created_at",
          label: "Date",
        },
      ],
    },
  ],
};
