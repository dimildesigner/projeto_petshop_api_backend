import { Product } from "../models/Product.js";
import { Movement } from "../models/Movement.js";
import { getStatusEstoque } from "../services/productService.js";

export const getStockProducts = async (req, res) => {
  try {
    const produtos = await Product.find().sort({ nome: 1 });
    const lista = produtos.map((p) => ({
      ...p._doc,
      status: getStatusEstoque(p),
    }));
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerMovement = async (req, res) => {
  try {
    const { produtoId, tipo, motivo, quantidade, observacao } = req.body;

    const produto = await Product.findById(produtoId);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });

    const qtd = Number(quantidade);
    if (qtd <= 0) return res.status(400).json({ error: "Quantidade inválida" });

    const estoque_antes = produto.estoque_atual;

    if (tipo === "saida" && produto.estoque_atual < qtd) {
      return res.status(400).json({ error: "Estoque insuficiente para esta saída" });
    }

    const estoque_depois = tipo === "entrada"
      ? estoque_antes + qtd
      : estoque_antes - qtd;

    await Product.findByIdAndUpdate(produtoId, { estoque_atual: estoque_depois });

    const movement = new Movement({
      produto: produtoId,
      tipo,
      motivo,
      quantidade: qtd,
      estoque_antes,
      estoque_depois,
      observacao,
    });

    await movement.save();
    res.status(201).json(movement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getMovementsByProduct = async (req, res) => {
  try {
    const movimentos = await Movement.find({ produto: req.params.produtoId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(movimentos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
