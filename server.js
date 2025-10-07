import express from "express";
import cors from "cors";
import clientesRoutes from "./routes/clientes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// 🔧 Configurações básicas
app.use(cors());
app.use(express.json());

// 🌐 Rotas
app.use("/api/clientes", clientesRoutes);

// 🏠 Teste rápido da API
app.get("/", (req, res) => {
  res.send("API do Consultório Odontológico está rodando 🦷");
});

// 🚀 Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
