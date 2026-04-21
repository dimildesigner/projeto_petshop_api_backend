import { Product } from "../models/Product.js";
import { getStatusEstoque } from "../services/productService.js";

export const createProduct = async (req, res) => {
  try {
    const {
      nome, categoria, especie, porte, fase,
      preco, estoque_atual, estoque_minimo, data_validade
    } = req.body || {};

    const produto = new Product({
      nome,
      categoria,
      especie,
      porte,
      fase,
      preco: Number(preco),
      estoque_atual: Number(estoque_atual),
      estoque_minimo: Number(estoque_minimo),
      image: req.file ? req.file.path : null,
      data_validade: data_validade ? new Date(data_validade) : null,
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
    const {
      nome,
      categoria,
      especie,
      porte,
      fase,
      preco,
      estoque_atual,
      estoque_minimo,
      data_validade,
    } = req.body || {};

    const updates = {};
    if (nome) updates.nome = nome;
    if (categoria) updates.categoria = categoria;
    if (especie) updates.especie = especie;
    if (porte) updates.porte = porte;
    if (fase) updates.fase = fase;
    if (preco) updates.preco = Number(preco);
    if (estoque_atual) updates.estoque_atual = Number(estoque_atual);
    if (estoque_minimo) updates.estoque_minimo = Number(estoque_minimo);
    if (req.file) updates.image = req.file.path;

    // data_validade pode ser string vazia para limpar o campo
    if (data_validade !== undefined) {
      updates.data_validade =
        data_validade === "" ? null : new Date(data_validade);
    }

    const produto = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true },
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
