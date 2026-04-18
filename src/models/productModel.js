import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nome: String,
  preco: Number,
  estoque_atual: Number,
  estoque_minimo: Number,
  image: String // 🔥 AQUI fica a imagem
}, {
  timestamps: true
});

export const Product = mongoose.model("Product", productSchema);