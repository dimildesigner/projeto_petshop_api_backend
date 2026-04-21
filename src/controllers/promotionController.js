import { Product } from "../models/Product.js";
import { calcularPromocao } from "../services/promotionService.js";

export const getPromotions = async (req, res) => {
  try {
    const produtos = await Product.find({ data_validade: { $ne: null } });

    const promocoes = produtos
      .map((p) => {
        const promo = calcularPromocao(p);
        if (!promo) return null;
        return {
          ...p._doc,
          promocao: promo,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.promocao.diasRestantes - b.promocao.diasRestantes);

    res.json(promocoes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const updateDiscount = async (req, res) => {
  try {
    const { descontoManual } = req.body;
    const produto = await Product.findById(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });

    res.json({
      ...produto._doc,
      promocao: {
        ...calcularPromocao(produto),
        desconto: descontoManual,
        precoPromocional: Math.round(produto.preco * (1 - descontoManual / 100) * 100) / 100,
        ajustadoManualmente: true,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
