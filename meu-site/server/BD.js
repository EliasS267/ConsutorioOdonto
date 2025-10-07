import pkg from "pg";
const { Pool } = pkg;

// 🔧 Dados de conexão — você pode mudar depois se quiser
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // variável do Railway
  ssl: { rejectUnauthorized: false },
});

export default pool;
