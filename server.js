// server.js
import express from "express";
import pkg from "pg";
import cors from "cors";

const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// 🔒 String de conexão com o banco (Neon)
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_9GNeBgjhP8MK@ep-fancy-hill-aduwokua-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

// ✅ Rota de teste (principal)
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ status: "Conectado ao banco!", hora: result.rows[0].now });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao conectar ao banco", detalhes: err.message });
  }
});

// ✅ Rota para listar clientes
app.get("/clientes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clientes");
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao buscar clientes", detalhes: err.message });
  }
});

// ✅ Rota para adicionar cliente
app.post("/clientes", async (req, res) => {
  const { nome, telefone } = req.body;

  if (!nome || !telefone) {
    return res.status(400).json({ error: "Nome e telefone são obrigatórios" });
  }

  try {
    await pool.query("INSERT INTO clientes (nome, telefone) VALUES ($1, $2)", [
      nome,
      telefone,
    ]);
    res.json({ message: "Cliente adicionado com sucesso!" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao adicionar cliente", detalhes: err.message });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
