export default {
  appName: "🚀 SupaCMS",
  supabaseUrl: 'https://gitzljhscwbaduvntpjr.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNTk1NDE4OSwiZXhwIjoxOTUxNTMwMTg5fQ.51SbJOXQgmDQT7Y71fcbuDkZ5l_5sgoSzRedYHSajLE',
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
