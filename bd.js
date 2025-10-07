import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://usuario:senha@localhost:5432/seubanco",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

export default pool;
