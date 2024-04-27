// scripts.js
function handleFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const base64Data = event.target.result.split(",")[1];
      const encryptedData = encryptData(base64Data, "meu-cu");
      document.getElementById("result").textContent = encryptedData;
    };
    reader.readAsDataURL(file);
  }
}

function encryptData(data, key) {
  return CryptoJS.AES.encrypt(data, key).toString();
}

function handleDecryption() {
  const encryptedData = document.getElementById("result").textContent;
  const secretKey = "meu-cu";

  try {
    const decryptedText = decryptData(encryptedData, secretKey);
    console.log("Dados descriptografados:", decryptedText);

    const decodedData = atob(decryptedText);

    const docDefinition = {
      content: [
        { text: "Assinatura Digital Descriptografada", style: "header" },
        { text: decodedData, margin: [0, 10] },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
  } catch (error) {
    console.error("Erro ao descriptografar:", error.message);
  }
}

function decryptData(data, key) {
  const decryptedBytes = CryptoJS.AES.decrypt(data, key);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
}
