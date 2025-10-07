// server.js
import express from "express";
import pkg from "pg";
import cors from "cors";

const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());

// 🔒 coloque aqui sua string do Neon
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:SENHA_AQUI@ep-purple-tooth-ad5odjhw-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require",
});

// Teste de conexão
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ status: "Conectado ao banco!", hora: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exemplo de rota para listar dados
app.get("/clientes", async (req, res) => {
  const result = await pool.query("SELECT * FROM clientes");
  res.json(result.rows);
});

// Exemplo de rota para adicionar dados
app.post("/clientes", async (req, res) => {
  const { nome, telefone } = req.body;
  await pool.query("INSERT INTO clientes (nome, telefone) VALUES ($1, $2)", [
    nome,
    telefone,
  ]);
  res.json({ message: "Cliente adicionado com sucesso!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
