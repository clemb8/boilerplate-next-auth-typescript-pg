import { Pool } from 'pg';

export default new Pool({
  max: 20,
  connectionString: process.env.DATABASE_URL,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});