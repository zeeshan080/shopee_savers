import "dotenv/config";
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
neonConfig.fetchConnectionCache = true;
const sql = neon(process.env.POSTGRES_URL!);
export const db = drizzle(sql);
