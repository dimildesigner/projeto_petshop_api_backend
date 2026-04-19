import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(); // 🔥 AGUARDA conexão

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
  }
};

startServer();