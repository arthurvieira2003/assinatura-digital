Sisteminha de assinatura eletrônica com JavaScript.

Como usar:

Para rodar a aplicação, basta rodar o comando

    node server.js

Após isso, basta acessar o site [clicando aqui](http://localhost:3000/) e criar o seu usuário, acessando a página de cadastro por meio do link "Cadastre-se". Depois de criar o seu usuário, uma mensagem será exibida confirmando o cadastro, basta clicar no link "Voltar ao login" e logar-se no sistema com o seu Nickname e Senha.

![Cadastro](https://github.com/arthurvieira2003/assinatura_digital/assets/145725765/3e8b4813-e48a-4898-b6f7-aa13482d65e0)

Para fazer o upload de um documento para assinatura, basta anexar um arquivo PDF e preencher os dados necessários, depois clicar em Enviar. O documento será apresentado na GRID com dois botÕes, de assinatura e visualização. Apenas o usuário destinatário será capaz de assinar o documento, mas todos podem visualizar. Depois de assinado, uma nova página será inserida ao arquivo PDF, confirmando a assinatura e exibindo o e-mail de quem assinou.

![Upload](https://github.com/arthurvieira2003/assinatura_digital/assets/145725765/4ba6bb3a-d003-45a5-8e9b-3d835619ce24)

Clicando no botão no canto superior direito, "Dashboard", irá ser exibida uma GRID para visualizar todos os funcionários cadastrados no sistema, bem como suas informações. Aqui podemos alterar os dados ou excluir os cadastros, utilizando os botões de ação à direita de cada linha da GRID. É possível retornar à tela de documentos clicando no botão "Documentos", no canto superior direito da página de Dashboard.

![Dashboard](https://github.com/arthurvieira2003/assinatura_digital/assets/145725765/88ba93cb-ee6f-4bfd-81ab-c0f555501182)

Na página de Documentos, também é possível realizar o Logout do sistema clicando no botão "Logout", ao lado do botão "Dashboard".
