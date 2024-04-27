const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:Pg@123@0.tcp.sa.ngrok.io:18877/assinatura-digital"
);

const Funcionario = sequelize.define("funcionario", {
    email: Sequelize.STRING,
    nickname: Sequelize.STRING,
    senha: Sequelize.STRING,
    tipoacesso: Sequelize.STRING,
  });

  Funcionario.update(
    { email: 'ROLA', nickname: 'MEU OVO', senha: 'MEU CU', tipoacesso: 'MERDA' },
    { where: { nickname: 'teste.teste' } }
  )
