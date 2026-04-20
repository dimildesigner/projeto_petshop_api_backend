import { Product } from "../models/Product.js";
import { getStatusEstoque } from "../services/productService.js";

export const createProduct = async (req, res) => {
  try {
    const { nome, preco, estoque_atual, estoque_minimo } = req.body || {};

    const produto = new Product({
      nome,
      preco: Number(preco),
      estoque_atual: Number(estoque_atual),
      estoque_minimo: Number(estoque_minimo),
      image: req.file ? req.file.path : null,
    });

    await produto.save();
    res.status(201).json(produto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const produtos = await Product.find();
    const lista = produtos.map((p) => ({
      ...p._doc,
      status: getStatusEstoque(p),
    }));
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { nome, preco, estoque_atual, estoque_minimo } = req.body || {};

    const updates = {
      ...(nome && { nome }),
      ...(preco && { preco: Number(preco) }),
      ...(estoque_atual && { estoque_atual: Number(estoque_atual) }),
      ...(estoque_minimo && { estoque_minimo: Number(estoque_minimo) }),
      ...(req.file && { image: req.file.path }),
    };

    const produto = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { returnDocument: "after" }
    );

    if (!produto) return res.sendStatus(404);
    res.json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const produto = await Product.findByIdAndDelete(req.params.id);
    if (!produto) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};