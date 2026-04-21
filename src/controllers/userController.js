import { User } from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-senha").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    const user = new User({ nome, email, senha, role });
    await user.save();

    res.status(201).json({
      id: user._id,
      nome: user.nome,
      email: user.email,
      role: user.role,
      ativo: user.ativo,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { nome, email, role, ativo, senha } = req.body;

    const updates = {};
    if (nome)  updates.nome  = nome;
    if (email) updates.email = email;
    if (role)  updates.role  = role;
    if (ativo !== undefined) updates.ativo = ativo;

    if (senha) {
      const user = await User.findById(req.params.id);
      if (!user) return res.sendStatus(404);
      user.nome  = updates.nome  || user.nome;
      user.email = updates.email || user.email;
      user.role  = updates.role  || user.role;
      if (ativo !== undefined) user.ativo = ativo;
      user.senha = senha;
      await user.save();
      return res.json({ id: user._id, nome: user.nome, email: user.email, role: user.role, ativo: user.ativo });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    ).select("-senha");

    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.sendStatus(404);

    if (user.role === "admin") {
      const admins = await User.countDocuments({ role: "admin", ativo: true });
      if (admins <= 1) {
        return res.status(400).json({ error: "Não é possível remover o único admin do sistema" });
      }
    }

    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
