import express from "express";
import pool from "../db.js";

const router = express.Router();

// 📋 Listar todos os clientes
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clientes ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar clientes" });
  }
});

// ➕ Adicionar novo cliente
router.post("/", async (req, res) => {
  const { nome, telefone } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO clientes (nome, telefone) VALUES ($1, $2) RETURNING *",
      [nome, telefone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao adicionar cliente" });
  }
});
router.post("/", async (req, res) => {
  const { nome, telefone, idade } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO clientes (nome, telefone, idade) VALUES ($1, $2, $3) RETURNING *",
      [nome, telefone, idade]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao adicionar cliente" });
  }
});

// ✏️ Atualizar cliente
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, telefone } = req.body;
  try {
    const result = await pool.query(
      "UPDATE clientes SET nome = $1, telefone = $2 WHERE id = $3 RETURNING *",
      [nome, telefone, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
});

// ❌ Deletar cliente
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM clientes WHERE id = $1", [id]);
    res.json({ message: "Cliente removido com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir cliente" });
  }
});

export default router;
