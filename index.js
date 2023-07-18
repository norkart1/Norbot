
require('dotenv').config();
const {  Client, IntentsBitField, Collection } = require("discord.js");


const {loadEvents} = require('./Handlers/eventHandler');

const {loadCommands} = require('./Handlers/commandHandler');
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.config = require('./config.json');
client.commands = new Collection();


client.login(client.config.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});
