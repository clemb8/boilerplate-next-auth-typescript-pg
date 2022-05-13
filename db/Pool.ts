import { Pool } from 'pg';

export default new Pool({
  max: 20,
  connectionString: 'postgres://postgres:postgres@localhost:5433/postgres',
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});