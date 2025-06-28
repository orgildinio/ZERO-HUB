import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URI!,
  
  max: 20,  
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,
  
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  
  statement_timeout: 30000,   // 30 second query timeout
  query_timeout: 30000,       // 30 second total timeout
  
  application_name: 'analytics-api'
});

export const db = drizzle(pool);

export { pool };