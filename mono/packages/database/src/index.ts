import dotenv from 'dotenv';

import {
    drizzle
} from 'drizzle-orm/node-postgres';

import {
    Pool
} from 'pg';

import { eq } from "drizzle-orm";
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.DATABASE_URI) {
    throw new Error('DATABASE_URI environment variable is required');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URI!,

    min: 2,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000,

    keepAlive: true,
    keepAliveInitialDelayMillis: 10000,

    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,

    statement_timeout: 30000,
    query_timeout: 30000,

    application_name: 'analytics-api'
});

export const db = drizzle(pool);

export { pool };

export { eq };