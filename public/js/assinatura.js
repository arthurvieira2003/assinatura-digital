document.addEventListener("DOMContentLoaded", () => {
  const documentoForm = document.getElementById("documentoForm");
  const documentosTable = document.getElementById("documentosTable");

  // Carregar destinatários no formulário
  fetch("https://assinatura-digital-sage.vercel.app/destinatarios")
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

    // Ler o conteúdo do arquivo PDF como array buffer
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;

      // Converter o array buffer em base64
      const arquivo_pdf = arrayBufferToBase64(arrayBuffer);

      const descricao = document.getElementById("descricao").value;
      const valor = document.getElementById("valor").value;
      const data = document.getElementById("data").value;
      const funcionario_id = document.getElementById("destinatario").value;

      try {
        const response = await fetch(
          "https://assinatura-digital-sage.vercel.app/enviar-documento",
          {
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
          }
        );
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

        window.location.reload();
      } catch (error) {
        console.error("Erro ao enviar documento:", error);
      }
    };

    // Ler o arquivo PDF selecionado como array buffer
    if (arquivo) {
      reader.readAsArrayBuffer(arquivo);
    }
  });

  // Função para converter array buffer em base64
  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  // Carregar documentos na tabela
  fetch("https://assinatura-digital-sage.vercel.app/documentos")
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

        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Visualizar Documento";

        downloadButton.addEventListener("click", async () => {
          try {
            const response = await fetch(
              `https://assinatura-digital-sage.vercel.app/documentos/pdf/${documento.id}`
            );
            if (!response.ok) {
              throw new Error("Erro ao baixar PDF");
            }
            const data = await response.blob();
            const blobUrl = URL.createObjectURL(data);

            // Abrir o PDF em uma nova aba para visualização
            window.open(blobUrl);
          } catch (error) {
            console.error("Erro ao baixar PDF:", error);
            // Tratar o erro ou exibir uma mensagem de erro ao usuário
          }
        });

        buttonCell.appendChild(downloadButton);

        if (documento.status !== "Assinado") {
          const assinarButton = document.createElement("button");
          assinarButton.textContent = "Assinar Documento";

          const userId = Number(localStorage.getItem("userId"));

          if (userId !== documento.funcionario_id) {
            assinarButton.disabled = true;
            assinarButton.title =
              "Você não tem permissão para assinar este documento";
          }

          // Adicionar evento de clique ao botão
          assinarButton.addEventListener("click", () => {
            fetch(
              `https://assinatura-digital-sage.vercel.app/documentos/assinar/${documento.id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Erro ao assinar documento");
                }
                return response.json();
              })
              .then((data) => {
                window.location.reload();
                console.log("Documento assinado com sucesso:", data);
                // Aqui você pode atualizar a interface ou fazer outras ações após assinar o documento
              })
              .catch((error) => {
                console.error("Erro ao assinar documento:", error);
                // Tratar o erro ou exibir uma mensagem de erro ao usuário
              });
          });

          // Adicionar o botão à célula da tabela
          buttonCell.appendChild(assinarButton);
        }
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar documentos:", error);
    });
});

document.getElementById("logoutButton").addEventListener("click", () => {
  // Limpar o ID do usuário do localStorage
  localStorage.removeItem("userId");

  // Redirecionar o usuário para a página de login
  window.location.href = "../index.html";
});
