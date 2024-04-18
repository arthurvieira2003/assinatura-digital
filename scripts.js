const formulario = document.getElementById('loginForm');
const mensagem = document.getElementById('mensagem');

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (data.erro) {
            mensagem.textContent = data.erro;
        } else {
            // Redirecionar para página de sucesso ou realizar outra ação
            window.location.href = '/sucesso';
        }
    } catch (error) {
        console.error(error);
        mensagem.textContent = 'Erro ao logar.';
    }
});
