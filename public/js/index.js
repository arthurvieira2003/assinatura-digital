$(document).ready(function () {
  var tiposAcesso = ["Diretor", "Gerente"];
  var select = $("#registerTipoacesso");
  tiposAcesso.forEach(function (tipo) {
    select.append(new Option(tipo, tipo));
  });

  $("#showRegisterForm").click(function (e) {
    e.preventDefault();
    $("#loginForm").hide();
    $("#registerForm").show();
  });

  $("#showLoginForm").click(function (e) {
    e.preventDefault();
    $("#registerForm").hide();
    $("#loginForm").show();
  });
});

document.getElementById("registerButton").addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.getElementById("registerEmail").value;
  const nickname = document.getElementById("registerNickname").value;
  const senha = document.getElementById("registerSenha").value;
  const tipoacesso = document.getElementById("registerTipoacesso").value;

  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      nickname: nickname,
      senha: senha,
      tipoacesso: tipoacesso,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("registerMessage").textContent = data.message;
    });
});

document.getElementById("loginButton").addEventListener("click", (e) => {
  e.preventDefault();

  const nickname = document.getElementById("loginNickname").value;
  const senha = document.getElementById("loginSenha").value;

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname: nickname, senha: senha }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("loginMessage").textContent = data.message;
      if (data.user) {
        localStorage.setItem("userId", data.user.id);
        window.location.href = "pages/assinatura.html";
      }
    });
});
