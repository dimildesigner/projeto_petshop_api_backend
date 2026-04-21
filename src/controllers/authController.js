import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    const user = await User.findOne({ email, ativo: true });
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const senhaCorreta = await user.verificarSenha(password);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, nome: user.nome },
      SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no login" });
  }
};

export const seed = async (req, res) => {
  try {
    const existe = await User.findOne({ email: "admin@petshop.com" });
    if (existe) {
      return res.status(400).json({ error: "Admin já existe no banco" });
    }

    const admin = new User({
      nome: "Admin",
      email: "admin@petshop.com",
      senha: "123456",
      role: "admin",
    });

    await admin.save();
    res.status(201).json({ message: "Admin criado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
