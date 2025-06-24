const { create, Client } = require('@open-wa/wa-automate');
require('dotenv').config();

const SESSION_ID = process.env.SESSION_ID;
const PREFIX = process.env.PREFIX || '.';
const OWNER_NUMBER = process.env.OWNER_NUMBER || '';

const start = (client = new Client()) => {
  console.log('Bot started successfully...');

  client.onMessage(async (message) => {
    if (!message.body.startsWith(PREFIX)) return;
    
    const command = message.body.slice(PREFIX.length).trim().split(/ +/).shift().toLowerCase();

    if (command === 'ping') {
      client.sendText(message.from, 'Pong! Bot is alive.');
    }

    if (command === 'owner') {
      client.sendText(message.from, `Owner number is: ${OWNER_NUMBER}`);
    }

    if (command === 'menu') {
      const menu = `
┏▣ ◈ *RAHEEM-CMD* ◈
┃ *Commands*
┃ ${PREFIX}ping - Ping the bot
┃ ${PREFIX}owner - Show owner number
┃ ${PREFIX}menu - Show this menu
┗▣
      `;
      client.sendText(message.from, menu);
    }
  });
};

create({
  sessionId: SESSION_ID,
  multiDevice: true,
  authTimeout: 60,
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  qrTimeout: 90,
}).then(client => start(client))
  .catch(err => console.log(err));
