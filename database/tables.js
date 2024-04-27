const Sequelize = require("sequelize");
const database = require("./db");

const Funcionarios = database.define("funcionarios", {
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

const Relatorios = database.define("relatorios", {
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

const Assinaturas = database.define("assinaturas", {
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

Relatorios.belongsTo(Funcionarios, { foreignKey: "funcionario_id" });
Assinaturas.belongsTo(Relatorios, { foreignKey: "relatorio_id" });
Assinaturas.belongsTo(Relatorios, { foreignKey: "funcionario_id" });

Funcionarios.hasMany(Relatorios, { foreignKey: "funcionario_id" });
Relatorios.hasMany(Assinaturas, { foreignKey: "relatorio_id" });
Relatorios.hasMany(Assinaturas, { foreignKey: "funcionario_id" });

Funcionarios.sync()
  .then(() => {
    Relatorios.sync();
  })
  .then(() => {
    Assinaturas.sync();
  })
  .catch((error) => {
    console.error("An error occurred while creating tables:", error);
  });
