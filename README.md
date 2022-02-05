# SupaCMS Alpha

DISCLAIMER: SupaCMS is not an active open source project, it's just a prototype. You can play with it but don't expect it to work flawlessly or have all the features you want.

SupaCMS is a schema-based CMS for supabase projects. It aims to make it easy to generate a CMS for your supabase project so you can manage your data like in a regular CMS.

SupaCMS requires that you setup your RLS well in the Supabase Admin Dashboard. Do not leave RLS open or anyone with an account in your project could log into the CMS and manage the data.

## Deploying SupaCMS

You can deploy SupaCMS in Vercel or Netlify.

Step 1. Clone repository  
Step 2. Fill the SupaCMS schema at `./src/config/supacms.config.ts`  
Step 3. Try it out with `yarn dev --mode production`.  
Step 4. Push your changes to your cloned repository  
Step 5. Deploy the repository to Vercel.

## How to fill the Schema

You'll find the config schema at `src/config/supacms.config.ts`

```ts
// Config schema
{
    appName: string; // Name of your app. Will be used as a logo.
    supabaseUrl: string; // URL of your supabase project.
    supabaseAnonKey: string; // Anonymous key of your supabase project. It's perfectly safe to have it in the config file.
    tables: Table[]; // List of tables to be included in the CMS.
    buckets: Bucket[]; // List of buckets to be included in the CMS.
}

// Table
{
    name: string; // Name of the table in Supabase.
    label: string; // Label you want to show in the CMS for this table.
    cols: Column[]; // List of columns to be included in the CMS.
}

// Column
{
  name: string; // Name of the column in Supabase.
  type: ColumnType; // "text" | "image" | "boolean" | "list" | "date" | "markdown"
  label?: string; // Label you want to show in the CMS for this column.
  hideInTable?: boolean; // Hide this column in the table view.
  align?: "left" | "right" | "center"; // Align the column in the table view.
  bucket?: string; // Name of the bucket this column belongs to in case it's a file/image.
}

// Bucket
{
  name: string; // Name of the bucket in Supabase.
  label: string; // Label you want to show in the CMS for this bucket.
}

```
