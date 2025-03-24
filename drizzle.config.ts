import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
<<<<<<< HEAD
    connectionString: 
      process.env.DATABASE_URL || 
      "postgres://postgres:postgres@localhost:5432/postgres"
    
  },
} satisfies Config;
=======
    connectionString:
      process.env.DATABASE_URL ||
      "postgres://postgres:postgres@localhost:5432/postgres",
    ssl: { rejectUnauthorized: false }, // ✅ Fix for Supabase SSL
  },
} satisfies Config;
>>>>>>> recovered-history
