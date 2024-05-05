const Sequelize = require("sequelize");
const database = require("./db");

// Definir modelo Funcionario usando Sequelize
const Funcionario = database.define("funcionario", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  nickname: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  tipoacesso: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  chaveassinatura: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Definir modelo Relatorio usando Sequelize
const Relatorio = database.define("relatorio", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  funcionario_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "funcionarios",
      key: "id",
    },
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  valor: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  arquivo_pdf: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

// Definir os relacionamentos entre os modelos
Funcionario.hasMany(Relatorio, { foreignKey: "funcionario_id" });
Relatorio.belongsTo(Funcionario, { foreignKey: "funcionario_id" });

module.exports = {
  Funcionario,
  Relatorio,
};
