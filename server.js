import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});