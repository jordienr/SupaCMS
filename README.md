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
