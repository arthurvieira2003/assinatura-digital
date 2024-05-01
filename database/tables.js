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

// Definir modelo Assinatura usando Sequelize
const Assinatura = database.define("assinatura", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  relatorio_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "relatorios",
      key: "id",
    },
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
  assinatura: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Definir os relacionamentos entre os modelos
Funcionario.hasMany(Relatorio, { foreignKey: "funcionario_id" });
Relatorio.belongsTo(Funcionario, { foreignKey: "funcionario_id" });

Relatorio.hasMany(Assinatura, { foreignKey: "relatorio_id" });
Assinatura.belongsTo(Relatorio, { foreignKey: "relatorio_id" });

Funcionario.hasMany(Assinatura, { foreignKey: "funcionario_id" });
Assinatura.belongsTo(Funcionario, { foreignKey: "funcionario_id" });

module.exports = {
  Funcionario,
  Relatorio,
  Assinatura,
};
