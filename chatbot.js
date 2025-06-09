const { Client, LocalAuth, Location } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./conversas.db');

db.run(`
  CREATE TABLE IF NOT EXISTS conversas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero TEXT,
    perguntaAtual INTEGER,
    historico TEXT
  )
`);

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true, // Mude para 'false' se precisar ver o navegador
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Bot da APA Barra de Mamanguape está pronto!');
});

// Palavras que ativam o bot
const palavrasChave = ["bom", "dia", "ola", "olá", "começar", "oi", "oii", "menu", "Menu"];

const menu = `
olá! 👋 Bem-vindo a APA Barra de Mamanguape👋

Escolha uma opção digitando o número correspondente:

1️⃣ Ver horário de funcionamento  
2️⃣ Falar com um atendente  
3️⃣ Ver nossa localização 
4️⃣ redes sociais
5️⃣ Informações sobre a APA
6️⃣ proximas ações
9️⃣ Encerrar atendimento  
`;

client.on('message', async message => {
  // =================================================================
  // NOVA VERIFICAÇÃO PARA IGNORAR GRUPOS
  // =================================================================
  const chat = await message.getChat();
  if (chat.isGroup) {
    // Se a mensagem veio de um grupo, a função para aqui.
    return;
  }
  // =================================================================

  const numero = message.from;
  const texto = message.body.trim().toLowerCase();

  // 1. Verifica se é uma palavra-chave para iniciar ou se o usuário pediu para voltar ao menu
  if (palavrasChave.some(palavra => texto.includes(palavra)) || texto === '#') {
    db.get("SELECT * FROM conversas WHERE numero = ?", [numero], (err, row) => {
      if (err) {
        console.error(err);
        return;
      }
      if (!row) {
        db.run("INSERT INTO conversas (numero, perguntaAtual, historico) VALUES (?, ?, ?)", [numero, 0, ""]);
      }
      client.sendMessage(numero, menu);
    });
  }
  // 2. SENÃO, verifica se é o comando para encerrar
  else if (texto === '9') {
    client.sendMessage(numero, "🛑 Atendimento encerrado. Obrigado por falar com a APA Barra de Mamanguape!");
    db.run("DELETE FROM conversas WHERE numero = ?", [numero]);
  }
  // 3. SENÃO, verifica as opções do menu
  else if (texto === '1') {
    client.sendMessage(numero, "🕒 Nosso horário de funcionamento:\n\n🟢 Funcionamos *todos os dias*, das *6h às 21h*.\n\nDigite *menu* para voltar ou *9* para encerrar.");
  }
  else if (texto === '2') {
    client.sendMessage(numero, "👨‍💼 Um de nossos atendentes irá falar com você em breve.\n\nDigite *menu* para voltar ou *9* para encerrar.");
  }
  else if (texto === '3') {
    const localizacao = new Location(-6.77613, -34.92650, 'APA Barra de Mamanguape');
    client.sendMessage(numero, localizacao);
    client.sendMessage(numero, "📍 Essa é a localização da Área de Proteção Ambiental. Estamos esperando por você. 😊\n\nDigite *menu* para voltar ou *9* para encerrar.");
  }
  else if (texto === '4') {
    client.sendMessage(numero, "🌐 Siga-nos nas redes sociais:\n\n📸 Instagram: https://www.instagram.com/apaeariedomamanguape?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==\n\nDigite *menu* para voltar ou *9* para encerrar.");
  }
  else if (texto === '5') {
    client.sendMessage(numero, "📚 A APA Barra de Mamanguape é uma área de proteção ambiental localizada na Paraíba, Brasil. Ela abrange uma rica biodiversidade e é um importante espaço para a conservação da natureza.\n\nPara mais informações, visite nosso site ou entre em contato com nossos atendentes.\n\nDigite *menu* para voltar ou *9* para encerrar.");
  }
  else if (texto === '6') {
    client.sendMessage(numero, "📅 Nossas próximas ações ainda serão divulgadas. Fique de olho em nossas redes sociais!\n\nDigite *menu* para voltar ou *9* para encerrar.");
  }
  // 4. SENÃO, se não for nenhuma das opções acima, envia a mensagem de erro
  else {
    client.sendMessage(numero, "❌ Não entendi sua mensagem. Por favor, digite *menu* para ver as opções ou *9* para sair.");
  }
});

client.initialize();