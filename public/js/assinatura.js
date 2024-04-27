// scripts.js
function handleFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const base64Data = event.target.result.split(",")[1];
      const encryptedData = encryptData(base64Data, "sua-chave-secreta");
      document.getElementById("result").textContent = encryptedData;
    };
    reader.readAsDataURL(file);
  }
}

function encryptData(data, key) {
  return CryptoJS.AES.encrypt(data, key).toString();
}
