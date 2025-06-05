# Chatbot para WhatsApp - Box das Verduras

## Descrição

Este é um chatbot simples para WhatsApp desenvolvido em Node.js, projetado para automatizar as interações iniciais com os clientes do "Box das Verduras". Ele ajuda a fornecer respostas imediatas a perguntas comuns, guiar os clientes através de opções de serviço e melhorar o engajamento geral do cliente.

Este bot pode ser útil para:
* Fornecer atendimento ao cliente 24/7 para consultas básicas.
* Direcionar os clientes para informações importantes como horário de funcionamento e localização.
* Coletar solicitações iniciais para falar com um atendente humano.
* Reduzir o tempo de espera do cliente e aumentar a satisfação.

## Funcionalidades Principais

* **Saudação e Menu Principal:** O bot responde a palavras-chave de saudação (como "olá", "menu", "oi") exibindo um menu interativo.
* **Opções do Menu:**
    * **1️⃣ Ver horário de funcionamento:** Informa o horário de funcionamento do estabelecimento.
        * Resposta: "🕒 Nosso horário de funcionamento:\n\n🟢 Funcionamos *todos os dias*, das *6h às 21h*."
    * **2️⃣ Falar com um atendente:** Informa ao cliente que um atendente entrará em contato e oferece opções para retornar ao menu ou encerrar.
        * Resposta: "👨‍💼 Um de nossos atendentes irá falar com você em breve.\nEnquanto isso, digite *menu* para voltar ou *9* para encerrar."
    * **3️⃣ Ver nossa localização:** Envia um cartão de localização via WhatsApp e uma mensagem de confirmação.
        * Localização: Latitude -6.812888, Longitude -35.077697 (Nome: 'Box das Verduras').
        * Resposta: "📍 Essa é a localização do *Box das Verduras*! Estamos esperando por você. 😊\n\nDigite *menu* para voltar ou *9* para encerrar."
    * **9️⃣ Encerrar atendimento:** Finaliza a conversa com uma mensagem de despedida e remove os dados da conversa do banco de dados.
        * Resposta: "🛑 Atendimento encerrado. Obrigado por falar com o Box das Verduras!"
* **Comando de Menu Rápido:** Digitar `#` a qualquer momento (exceto durante um fluxo específico) exibe o menu principal novamente.
* **Persistência Básica:** Utiliza um banco de dados SQLite (`conversas.db`) para registrar o número do cliente e gerenciar o estado inicial da conversa. Novos usuários são adicionados automaticamente.
* **Resposta Padrão:** Se o bot não entender a mensagem do cliente, ele envia: "❌ Não entendi sua mensagem. Por favor, digite *menu* para ver as opções ou *9* para sair."

## Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 16.x ou mais recente recomendada)
* npm (geralmente instalado com o Node.js)
* Uma conta WhatsApp ativa para ser usada pelo bot.
* Google Chrome instalado (o script especifica um caminho para o executável do Chrome no Windows. Se você estiver em outro sistema operacional ou tiver o Chrome em um local diferente/no PATH do sistema, ajuste ou remova a linha `executablePath` no arquivo `chatbot.js`).

## Instalação

1.  **Obtenha o código:**
    * Faça o download do arquivo `chatbot.js` (e outros arquivos do projeto, se houver) para um diretório em seu computador.

2.  **Navegue até o diretório do projeto:**
    Abra seu terminal ou prompt de comando e use o comando `cd` para navegar até a pasta onde você salvou o arquivo `chatbot.js`.
    ```bash
    cd caminho/para/seu/projeto
    ```

3.  **Instale as dependências:**
    Execute o seguinte comando no terminal para instalar as bibliotecas necessárias:
    ```bash
    npm install whatsapp-web.js qrcode-terminal sqlite3
    ```

4.  **Configuração do `executablePath` (se necessário):**
    No arquivo `chatbot.js`, a linha `executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',` é específica para Windows.
    * Se você estiver no Windows e o Chrome estiver em outro local, atualize este caminho.
    * Se você estiver no Linux ou macOS, geralmente você pode remover esta linha ou comentá-la (`// executablePath: ...`), pois o `puppeteer` tentará encontrar o Chrome automaticamente se ele estiver instalado de forma padrão.
    * Se você optar por rodar em modo `headless: true` (recomendado para servidores), o `executablePath` ainda pode ser relevante dependendo da configuração do seu sistema.

## Executando o Bot

1.  **Inicie o bot:**
    No terminal, dentro do diretório do projeto, execute:
    ```bash
    node chatbot.js
    ```

2.  **Escaneie o QR Code:**
    * Na primeira vez que você executar o bot (ou se a sessão de autenticação anterior for perdida), um QR code será exibido diretamente no seu terminal.
    * Abra o aplicativo WhatsApp no seu celular.
    * Vá para:
        * No Android: Toque nos três pontos (⋮) > Aparelhos conectados > Conectar um aparelho.
        * No iPhone: Vá em Configurações > Aparelhos conectados > Conectar um aparelho.
    * Escaneie o QR code exibido no seu terminal com a câmera do seu celular.

3.  **Bot Pronto:**
    * Após escanear o QR code com sucesso, você deverá ver a mensagem "Bot do Box das Verduras está pronto!" no terminal.
    * O bot agora está conectado e pronto para responder às mensagens enviadas para o número do WhatsApp que você usou para escanear.

## Visão Geral do Código

* **`whatsapp-web.js`**: Biblioteca principal para interagir com o WhatsApp Web.
* **`qrcode-terminal`**: Usada para gerar o QR code de autenticação no terminal.
* **`sqlite3`**: Usada para o banco de dados SQLite local que armazena informações básicas da conversa.
* **`new LocalAuth()`**: Estratégia de autenticação que salva os detalhes da sessão localmente, para que você não precise escanear o QR code toda vez que reiniciar o bot (a menos que a sessão expire ou seja invalidada).
* **`client.on('message', ...)`**: O coração do bot, onde toda a lógica de processamento de mensagens recebidas e envio de respostas acontece.

---

Este README deve ajudar qualquer pessoa a configurar e entender o seu chatbot!
