import { Product } from "../models/Product.js";
import { getStatusEstoque } from "../services/productService.js";

export const getDashboard = async (req, res) => {
  try {
    const produtos = await Product.find();

    const comStatus = produtos.map((p) => ({
      ...p._doc,
      status: getStatusEstoque(p),
    }));

    // Totais por status
    const total = comStatus.length;
    const criticos = comStatus.filter((p) => p.status === "CRITICO");
    const atencao  = comStatus.filter((p) => p.status === "ATENCAO");
    const ok       = comStatus.filter((p) => p.status === "NORMAL");

    // Por categoria
    const porCategoria = {};
    comStatus.forEach((p) => {
      const cat = p.categoria || "Sem categoria";
      porCategoria[cat] = (porCategoria[cat] || 0) + 1;
    });

    // Por espécie
    const porEspecie = {};
    comStatus.forEach((p) => {
      const esp = p.especie || "Sem espécie";
      porEspecie[esp] = (porEspecie[esp] || 0) + 1;
    });

    // Valor total do estoque
    const valorTotalEstoque = comStatus.reduce((acc, p) => {
      return acc + (p.preco || 0) * (p.estoque_atual || 0);
    }, 0);

    res.json({
      total,
      criticos: criticos.length,
      atencao: atencao.length,
      ok: ok.length,
      valorTotalEstoque,
      porCategoria,
      porEspecie,
      listaCriticos: criticos.slice(0, 5),
      listaAtencao: atencao.slice(0, 5),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};