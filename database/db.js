const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "postgres://assinatura_digital_user:e8IW4N9B578x33c4h0C17JWBEIrSbFDk@dpg-cos288nsc6pc73dvkv5g-a.oregon-postgres.render.com/assinatura_digital",
  {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = sequelize;
