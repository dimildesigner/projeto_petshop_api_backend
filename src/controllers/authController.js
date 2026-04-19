// ✅ authController.js correto
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // 🔥 usuário mock (temporário)
    if (email !== "admin@petshop.com" || password !== "123456") {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: 1, role: "admin" },
      SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no login" });
  }
};