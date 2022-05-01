import { Pool } from 'pg';

export default new Pool({
  max: 20,
  connectionString: 'postgres://postgres:postgres@localhost:3000/postgres',
  idleTimeoutMillis: 30000
});