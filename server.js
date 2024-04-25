const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize(
  "postgres://postgres:Pg@123@0.tcp.sa.ngrok.io:12699/assinatura-digital"
);

const Funcionario = sequelize.define("funcionario", {
  email: Sequelize.STRING,
  nickname: Sequelize.STRING,
  senha: Sequelize.STRING,
  tipoacesso: Sequelize.STRING,
});

app.post("/register", (req, res) => {
  const { email, nickname, senha, tipoacesso } = req.body;

  // Verifique se todos os campos estão preenchidos
  if (!email || !nickname || !senha || !tipoacesso) {
    return res
      .status(400)
      .send({ message: "Todos os campos são obrigatórios!" });
  }

  Funcionario.findOne({ where: { email: email } }).then((user) => {
    if (user) {
      res.send({ message: "Email já está em uso!" });
    } else {
      Funcionario.findOne({ where: { nickname: nickname } }).then((user) => {
        if (!user) {
          Funcionario.create({
            email: email,
            nickname: nickname,
            senha: senha,
            tipoacesso: tipoacesso,
          }).then(() => {
            res.send({ message: "Usuário criado com sucesso!" });
          });
        } else {
          res.send({ message: "Nickname já está em uso!" });
        }
      });
    }
  });
});

app.post("/login", (req, res) => {
  const { nickname, senha } = req.body;

  Funcionario.findOne({ where: { nickname: nickname, senha: senha } }).then(
    (user) => {
      if (user) {
        res.send({ message: "Login bem-sucedido!", user: user });
      } else {
        res.send({ message: "Nickname ou senha incorretos!" });
      }
    }
  );
});

app.get("/users", (req, res) => {
  Funcionario.findAll({
    attributes: ["email", "nickname", "tipoacesso"],
  })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Erro ao buscar usuários." });
    });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
