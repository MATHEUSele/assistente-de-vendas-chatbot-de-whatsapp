// Descrição: Esse código é um chatbot para WhatsApp que responde a mensagens de texto com base em palavras-chave. Ele usa a biblioteca whatsapp-web.js para se conectar ao WhatsApp e enviar mensagens. 
// O bot responde a perguntas sobre planos, benefícios e como aderir, além de fornecer informações adicionais quando solicitado. O código inclui um serviço de leitura de QR code para conectar o bot à conta do WhatsApp e simula digitação antes de enviar as respostas
//istrução para rodar o bot:
// 1 - Instalar o Node.js versão 14.21.3
// abra o terminal e digite o seguinte comando: npm install whatsapp-web.js qrcode-terminal
// ainda no terminal digite o seguinte comando: node chatbot.js
// escar o qr code no whatsapp para conectar o bot a conta




// gera o qr code para conectar o bot a conta do whatsapp
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();
// serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
// E inicializa tudo 
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil
// menu do bot
client.on('message', async msg => {
// Verifica se a mensagem contém palavras-chave e se é de um número de telefone
    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'Olá! '+ name.split(" ")[0] + ' sou o assistente virtual de matheus, Como posso ajudá-lo(a) hoje?, Por favor digite uma das opções abaixo:\n\n1 - falar com matheus\n2 - falar sobre a loja\n'); //Primeira mensagem de texto
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(4000); //Delay de 4 segundos
    
        
    }



// case 1 - falar com matheus 
    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'não estou disponivel no momento, retorno o mais breve possivel');

    }


// case 2 - falar sobre a loja 

    if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(2000); //Delay de 2000 milisegundos mais conhecido como 2 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'caso seja dia semana o atedimento não esta sendo realidado por mim\n \n entre em contado com a loja pelo telefone +55 83 9130-2996 contato (neli eleoterio)\n');

        await delay(2000); //delay de 2 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'caso seja final de semana, aguarde que retorno o mais breve possivel');
    }

    

});