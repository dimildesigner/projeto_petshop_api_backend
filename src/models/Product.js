import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nome: String,
  categoria: {
    type: String,
    enum: ["Ração", "Petiscos", "Higiene e Beleza", "Acessórios", "Brinquedos", "Medicamentos"],
  },
  especie: {
    type: String,
    enum: ["Cães", "Gatos", "Pássaros", "Peixes", "Roedores"],
  },
  porte: {
    type: String,
    enum: ["Pequeno", "Médio", "Grande", "Único"],
  },
  fase: {
    type: String,
    enum: ["Filhote", "Adulto", "Idoso"],
  },
  preco: Number,
  estoque_atual: Number,
  estoque_minimo: Number,
  image: String,
}, {
  timestamps: true
});

export const Product = mongoose.model("Product", productSchema);