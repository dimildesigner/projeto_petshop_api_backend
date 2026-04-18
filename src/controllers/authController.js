import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { users } from "../models/userModel.js";

const SECRET = "segredo";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Senha inválida" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};