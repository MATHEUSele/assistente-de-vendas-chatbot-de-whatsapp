
-----

# Chatbot de Atendimento para APA Barra de Mamanguape (WhatsApp)

Este projeto é um chatbot para WhatsApp desenvolvido em Node.js, projetado para automatizar o atendimento inicial e fornecer informações importantes sobre a Área de Proteção Ambiental (APA) Barra de Mamanguape.

## ✨ Funcionalidades

  - ✅ **Resposta automática** a saudações para iniciar a interação.
  - ✅ **Menu de opções interativo** para guiar o usuário.
  - ✅ **Ignora mensagens em grupos**, respondendo apenas em conversas privadas.
  - ✅ **Fornecimento de informações** como horário, localização, redes sociais e detalhes sobre a APA.
  - ✅ **Armazenamento de estado** básico da conversa utilizando um banco de dados SQLite.

## 🛠️ Tecnologias Utilizadas

  - **Node.js:** Ambiente de execução do JavaScript no servidor.
  - **whatsapp-web.js:** Biblioteca para interagir com o WhatsApp Web e automatizar mensagens.
  - **qrcode-terminal:** Ferramenta para exibir o QR Code de login diretamente no terminal.
  - **sqlite3:** Driver para o banco de dados SQLite, usado para persistir dados das conversas.

## ⚙️ Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:

  - [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
  - [NPM](https://www.npmjs.com/) (geralmente instalado junto com o Node.js)
  - Um número de WhatsApp ativo para conectar o bot.

## 🚀 Instalação e Execução

Siga os passos abaixo para rodar o projeto em sua máquina local.

1.  **Clone o repositório ou baixe os arquivos**
    Se você estiver usando Git, clone o repositório. Caso contrário, apenas certifique-se de que os arquivos `chatbot.js` e `package.json` estejam na mesma pasta.

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2.  **Navegue até o diretório do projeto**

    ```bash
    cd seu-repositorio
    ```

3.  **Instale as dependências**
    Execute o comando abaixo para instalar todas as bibliotecas listadas no `package.json`.

    ```bash
    npm install
    ```

4.  **Execute o bot**
    Inicie o bot com o seguinte comando:

    ```bash
    node chatbot.js
    ```

5.  **Escaneie o QR Code**

      - Ao executar o comando acima, um QR Code aparecerá no seu terminal.
      - Abra o WhatsApp em seu celular, vá em **Configurações \> Aparelhos conectados \> Conectar um aparelho**.
      - Escaneie o QR Code exibido no terminal.
      - Após a autenticação, você verá a mensagem "Bot da APA Barra de Mamanguape está pronto\!" e ele começará a responder às mensagens.

## 🗂️ Estrutura do Projeto

```
/
├── chatbot.js        # Arquivo principal com toda a lógica do bot
├── package.json      # Define as dependências e metadados do projeto
├── package-lock.json # Mantém um registro das versões exatas das dependências
└── conversas.db      # Banco de dados SQLite gerado automaticamente
```

## 📝 Funcionalidades do Menu

O bot responde aos seguintes comandos numéricos:

  - `1️⃣ Ver horário de funcionamento`: Informa os dias e horários de operação.
  - `2️⃣ Falar com um atendente`: Envia uma mensagem informando que um atendente humano entrará em contato.
  - `3️⃣ Ver nossa localização`: Envia um card de localização do Google Maps com o endereço da APA.
  - `4️⃣ Redes sociais`: Fornece o link para o perfil do Instagram.
  - `5️⃣ Informações sobre a APA`: Envia um texto descritivo sobre a Área de Proteção Ambiental.
  - `6️⃣ Próximas ações`: Informa sobre os próximos eventos ou ações (atualmente com uma mensagem padrão).
  - `9️⃣ Encerrar atendimento`: Finaliza a conversa e remove os dados da sessão do banco de dados.
  - `menu` ou `#`: Exibe o menu principal a qualquer momento.

## 📄 Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais informações.

-----
