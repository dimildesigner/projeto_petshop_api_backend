export const calcularPromocao = (produto) => {
  if (!produto.data_validade) return null;

  const hoje = new Date();
  const validade = new Date(produto.data_validade);
  const diasRestantes = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24));

  if (diasRestantes > 90) return null;

  let desconto = 0;
  let status = "";
  let urgencia = "";

  if (diasRestantes > 60) {
    desconto = 10;
    status = "atencao";
    urgencia = "Atenção";
  } else if (diasRestantes > 30) {
    desconto = 25;
    status = "urgente";
    urgencia = "Urgente";
  } else if (diasRestantes > 15) {
    desconto = 45;
    status = "critico";
    urgencia = "Crítico";
  } else if (diasRestantes > 0) {
    desconto = 65;
    status = "vencendo";
    urgencia = "Vence em breve";
  } else {
    return {
      diasRestantes,
      desconto: 0,
      status: "vencido",
      urgencia: "Vencido",
      precoOriginal: produto.preco,
      precoPromocional: produto.preco,
    };
  }

  const precoPromocional = produto.preco * (1 - desconto / 100);

  return {
    diasRestantes,
    desconto,
    status,
    urgencia,
    precoOriginal: produto.preco,
    precoPromocional: Math.round(precoPromocional * 100) / 100,
  };
};
