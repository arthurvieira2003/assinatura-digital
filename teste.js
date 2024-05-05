const { Funcionario, Relatorio } = require("./database/tables");

async function getDocumento() {
  try {
    const documento = await Relatorio.findByPk(1, {
      include: { model: Funcionario, attributes: ["chaveassinatura"] },
    });

    console.log(documento.funcionario.dataValues.chaveassinatura);
  } catch (error) {
    console.error("Erro ao buscar o relatório:", error);
  }
}

getDocumento();
