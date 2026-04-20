import mongoose from "mongoose";

const movementSchema = new mongoose.Schema({
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  tipo: {
    type: String,
    enum: ["entrada", "saida"],
    required: true,
  },
  motivo: {
    type: String,
    enum: ["Venda", "Reposição", "Perda", "Ajuste"],
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
    min: 1,
  },
  estoque_antes: Number,
  estoque_depois: Number,
  observacao: String,
}, {
  timestamps: true,
});

export const Movement = mongoose.model("Movement", movementSchema);