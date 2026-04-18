import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nome: String,
  categoria: String,
  porte: String,
  fase: String,
  preco: Number,
  estoque_atual: Number,
  estoque_minimo: Number,
  imagens: [String]
}, {
  timestamps: true
});

const [image, setImage] = useState(null);

export const Product = mongoose.model("Product", productSchema);