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
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});


client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Bot do Box das Verduras está pronto!');
});

// Palavras que ativam o bot
const palavrasChave = ["bom", "dia", "ola", "olá", "começar", "oi", "oii", "menu", "Menu"];

const menu = `
🍃 *Bem-vindo ao Box das Verduras!* 🍅

Escolha uma opção digitando o número correspondente:

1️⃣ Ver horário de funcionamento  
2️⃣ Falar com um atendente  
3️⃣ Ver nossa localização  
9️⃣ Encerrar atendimento  
`;

client.on('message', async message => {
  const numero = message.from;
  const texto = message.body.trim().toLowerCase();

  // Verifica se é uma saudação ou palavra-chave para iniciar o menu
  if (palavrasChave.some(palavra => texto.includes(palavra))) {
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
    return;
  }

  // Comandos de navegação
  if (texto === '9') {
    client.sendMessage(numero, "🛑 Atendimento encerrado. Obrigado por falar com o Box das Verduras!");
    db.run("DELETE FROM conversas WHERE numero = ?", [numero]);
    return;
  }

  if (texto === '#') {
    client.sendMessage(numero, menu);
    return;
  }

  // Resposta às opções do menu
  switch (texto) {
    case '1':
      client.sendMessage(numero, "🕒 Nosso horário de funcionamento:\n\n🟢 Funcionamos *todos os dias*, das *6h às 21h*.");
      break;

    case '2':
      client.sendMessage(numero, "👨‍💼 Um de nossos atendentes irá falar com você em breve.\nEnquanto isso, digite *menu* para voltar ou *9* para encerrar.");
      break;

    case '3':
      const localizacao = new Location(-6.812888, -35.077697, 'Box das Verduras');
      client.sendMessage(numero, localizacao);
      client.sendMessage(numero, "📍 Essa é a localização do *Box das Verduras*! Estamos esperando por você. 😊\n\nDigite *menu* para voltar ou *9* para encerrar.");
      break;

    default:
      client.sendMessage(numero, "❌ Não entendi sua mensagem. Por favor, digite *menu* para ver as opções ou *9* para sair.");
  }
});

client.initialize();
