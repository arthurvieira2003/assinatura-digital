document.addEventListener("DOMContentLoaded", () => {
  const documentoForm = document.getElementById("documentoForm");
  const documentosTable = document.getElementById("documentosTable");

  // Carregar destinatários no formulário
  fetch("/destinatarios")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar destinatários");
      }
      return response.json();
    })
    .then((destinatarios) => {
      const destinatarioSelect = documentoForm.querySelector(
        'select[name="destinatario"]'
      );

      // Limpar opções existentes
      destinatarioSelect.innerHTML = "";

      destinatarios.forEach((destinatario) => {
        const option = document.createElement("option");
        option.value = destinatario.id;
        option.textContent = destinatario.nickname;
        destinatarioSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar destinatários:", error);
    });

  // Enviar documento para assinatura
  documentoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const arquivoInput = document.querySelector('input[type="file"]');
    const arquivo = arquivoInput.files[0];

    // Ler o conteúdo do arquivo PDF como base64
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arquivo_pdf = event.target.result;

      const descricao = document.getElementById("descricao").value;
      const valor = document.getElementById("valor").value;
      const data = document.getElementById("data").value;
      const funcionario_id = document.getElementById("destinatario").value;

      try {
        const response = await fetch("http://localhost:3000/enviar-documento", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descricao: descricao,
            valor: valor,
            data: data,
            funcionario_id: funcionario_id,
            arquivo_pdf: arquivo_pdf,
          }),
        });
        if (!response.ok) {
          throw new Error("Erro ao enviar documento");
        }
        const newDocumento = await response.json();

        // Adicionar nova linha na tabela com os dados do novo documento
        const newRow = documentosTable.insertRow();
        newRow.innerHTML = `
          <td>${newDocumento.descricao}</td>
          <td>${newDocumento.destinatario}</td>
          <td>${newDocumento.status}</td>
        `;
      } catch (error) {
        console.error("Erro ao enviar documento:", error);
      }
    };

    // Ler o arquivo PDF selecionado como base64
    if (arquivo) {
      reader.readAsDataURL(arquivo);
    }
  });

  // Carregar documentos na tabela
  fetch("http://localhost:3000/documentos")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar documentos");
      }
      return response.json();
    })
    .then((documentos) => {
      documentos.forEach((documento) => {
        const row = documentosTable.insertRow();
        row.innerHTML = `
          <td>${documento.descricao}</td>
          <td>${documento.valor}</td>
          <td>${documento.status}</td>
        `;

        const buttonCell = row.insertCell();
        const assinarButton = document.createElement("button");
        assinarButton.textContent = "Assinar Documento";

        // Adicionar evento de clique ao botão
        assinarButton.addEventListener("click", () => {
          // Lógica para assinar o documento aqui
          console.log(`Assinar documento ID: ${documento.id}`);
          // Aqui você pode chamar uma função para assinar o documento, por exemplo
        });

        // Adicionar o botão à célula da tabela
        buttonCell.appendChild(assinarButton);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar documentos:", error);
    });
});

function assinarDocumento(idDocumento) {
  fetch(`http://localhost:3000/documentos/assinar/${idDocumento}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao assinar documento");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Documento assinado com sucesso:", data);
      // Aqui você pode atualizar a interface ou fazer outras ações após assinar o documento
    })
    .catch((error) => {
      console.error("Erro ao assinar documento:", error);
      // Tratar o erro ou exibir uma mensagem de erro ao usuário
    });
}
