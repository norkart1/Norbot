/*
const {commandInteraction} = require('discord.js');

module.exports = {
  name: "interactionCreate",

  execut(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      interaction.reply({ content: " outdated command!"});
      
      
    }
    command.execute(interaction, client);
    
  },
};*/

const { CommandInteraction } = require('discord.js');

module.exports = {
  name: "interactionCreate",

  execute(interaction, client) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      return interaction.reply({ content: "Unknown command!" });
    }

    command.execute(interaction, client);
  },
};