// MongoDB

import { Product } from "../models/Product.js";
import { getStatusEstoque } from "../services/productService.js";

// CREATE

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
      { new: true, returnDocument: "after" }, // ← corrige o warning do mongoose também
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

// GET
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

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    const produto = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!produto) return res.sendStatus(404);

    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    const produto = await Product.findByIdAndDelete(req.params.id);

    if (!produto) return res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Array

// import { products } from "../models/productModel.js";
// import { getStatusEstoque } from "../services/productService.js";

// export const createProduct = (req, res) => {
//   const produto = {
//     id: Date.now(),
//     ...req.body,
//     estoque_atual: req.body.estoque_atual || 0
//   };

//   products.push(produto);

//   res.status(201).json(produto);
// };

// export const getProducts = (req, res) => {
//   const lista = products.map(p => ({
//     ...p,
//     status: getStatusEstoque(p)
//   }));

//   res.json(lista);
// };

// export const updateProduct = (req, res) => {
//   const { id } = req.params;

//   const index = products.findIndex(p => p.id == id);

//   if (index === -1) return res.sendStatus(404);

//   products[index] = { ...products[index], ...req.body };

//   res.json(products[index]);
// };

// export const deleteProduct = (req, res) => {
//   const { id } = req.params;

//   const index = products.findIndex(p => p.id == id);

//   if (index === -1) return res.sendStatus(404);

//   products.splice(index, 1);

//   res.sendStatus(204);
// };
