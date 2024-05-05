const Sequelize = require("sequelize");
const sequelize = new Sequelize("assinatura-digital", "postgres", "Pg@123", {
  dialect: "postgresql",
  host: "0.tcp.sa.ngrok.io",
  port: 18152,
});

module.exports = sequelize;
