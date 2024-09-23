import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    // host: 'aws-0-ap-south-1.pooler.supabase.com',
    // user: 'postgres.qvttckdksocigumizffu',
    // password: 'ZKIfaz248@*#',
    // database: 'postgres',
  },
});