import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

// this is needed for pushing
dotenv.config({ path: ".env.local" });

const config: Config = {
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!
  }
};

export default config;
