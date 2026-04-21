import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  nome:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "almoxarifado", "comercial", "marketing"],
    default: "comercial",
  },
  ativo: { type: Boolean, default: true },
}, {
  timestamps: true,
});

userSchema.pre("save", async function () {
  if (!this.isModified("senha")) return;
  this.senha = await bcrypt.hash(this.senha, 10);
});

userSchema.methods.verificarSenha = async function (senha) {
  return bcrypt.compare(senha, this.senha);
};

export const User = mongoose.model("User", userSchema);
