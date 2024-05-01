const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/db");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors");
const path = require("path");
const { Funcionario, Relatorio, Assinatura } = require("./database/tables");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/pages")));

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Rota de registro de novo usuário
app.post("/register", async (req, res) => {
  const { email, nickname, senha, tipoacesso } = req.body;

  try {
    const userWithEmail = await Funcionario.findOne({
      where: { email: email },
    });
    if (userWithEmail) {
      return res.status(400).json({ message: "Email já está em uso!" });
    }

    const userWithNickname = await Funcionario.findOne({
      where: { nickname: nickname },
    });
    if (userWithNickname) {
      return res.status(400).json({ message: "Nickname já está em uso!" });
    }

    const newUser = await Funcionario.create({
      email: email,
      nickname: nickname,
      senha: senha,
      tipoacesso: tipoacesso,
    });

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso!", user: newUser });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Rota de login
app.post("/login", async (req, res) => {
  const { nickname, senha } = req.body;

  try {
    const user = await Funcionario.findOne({
      where: { nickname: nickname, senha: senha },
    });
    if (user) {
      res.status(200).json({ message: "Login bem-sucedido!", user: user });
    } else {
      res.status(401).json({ message: "Nickname ou senha incorretos!" });
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Rota para obter todos os usuários
app.get("/users", async (req, res) => {
  try {
    const users = await Funcionario.findAll({
      attributes: ["id", "email", "nickname", "tipoacesso"],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Rota para atualizar informações do usuário
app.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { email, nickname, tipoacesso } = req.body;

  try {
    const user = await Funcionario.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await user.update({
      email: email,
      nickname: nickname,
      tipoacesso: tipoacesso,
    });

    res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Rota para excluir usuário
app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await Funcionario.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await user.destroy();
    res.status(200).json({ message: "Usuário excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.get("/destinatarios", async (req, res) => {
  try {
    const destinatarios = await Funcionario.findAll({
      attributes: ["id", "nickname"],
    });
    res.json(destinatarios);
  } catch (error) {
    console.error("Erro ao obter destinatários:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.post("/enviar-documento", async (req, res) => {
  const { descricao, valor, arquivo_pdf, funcionario_id, data } = req.body;

  try {
    const newRelatorio = await Relatorio.create({
      descricao: descricao,
      valor: valor,
      arquivo_pdf: arquivo_pdf,
      status: "Não assinado",
      funcionario_id: funcionario_id,
      data: data,
    });

    res.status(201).json({
      message: "Documento enviado com sucesso!",
      relatorio: newRelatorio,
    });
  } catch (error) {
    console.error("Erro ao enviar documento:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Rota para obter todos os documentos
app.get("/documentos", async (req, res) => {
  try {
    const documentos = await Relatorio.findAll({
      attributes: ["id", "descricao", "valor", "status", "funcionario_id"],
    });

    res.status(200).json(documentos);
  } catch (error) {
    console.error("Erro ao obter documentos:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.post("/documentos/assinar/:idDocumento", async (req, res) => {
  const idDocumento = req.params.idDocumento;

  try {
    // Aqui você fará a lógica para encontrar o documento no banco de dados por ID
    const documento = await Documento.findByPk(idDocumento);

    if (!documento) {
      return res.status(404).json({ message: "Documento não encontrado" });
    }

    // Simulação de assinatura (substitua com sua lógica real de assinatura)
    const documentoAssinado = {
      ...documento.toJSON(),
      assinado: true,
      dataAssinatura: new Date(),
    };

    // Retorne o documento assinado como resposta
    return res.status(200).json(documentoAssinado);
  } catch (error) {
    console.error("Erro ao assinar documento:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = app;
