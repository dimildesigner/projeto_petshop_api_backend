export const getStatusEstoque = (produto) => {
  if (produto.estoque_atual <= produto.estoque_minimo) {
    return "CRITICO";
  }
  if (produto.estoque_atual <= produto.estoque_minimo * 1.5) {
    return "ATENCAO";
  }
  return "NORMAL";
};