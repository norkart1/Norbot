/*
const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('steal')
    .setDescription("Adds a Given Emoji to the Server")
    .addStringOption(option => option.setName('emoji').setDescription('The emoji You would like to add to the server ').setRequire(true))
.addStringOption(option => option.setName('name').setDescription('The name for your emoji').setRequire(true)),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojiAndStickers)) return await interaction.reply({ content: " You must have the manage emojis & Stickers permission to run this command", ephemeral: true });

    let emoji = interaction.options.getString('emoji')?.trim();
    const name = interaction.options.getString('name');

if (emoji.startsWith("<") && emoji.endsWith(">")) {
  const id = emoji.match(/\d{15,}/)[0];
  // Rest of the code...
}

      const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
        .than(image => {
          if (image) return "gif"
          else return "png"
        }).catch(err => {
          return "png"
        })

      emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`

    }

  if (!emoji.startsWith('http')) {
  return await interaction.reply({ content: "You cannot steal default emojis!", ephemeral: true });
}


     if (!emoji.startsWith('https')) {
      return await interaction.reply({ content: "You cannot Steal default emojis!", ephemeral: true})
}
  interaction.guild.emoji.create({ attachment: `${emoji}`, name: `${name}`})
  .then(emoji => {
    const embed  = new EmbedBuilder()
    .setColor('Blue')
    .setDescription(` Added ${emoji}, with the name "**${name}**"`)

    return interaction.reply({ embeds: [embed] });
  }).catch(err => {
    interaction.reply({ content: "You Cannot add this emoji you have reached your server emoji limit", ephemeral: true})
  })
  
}


}*/

const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('steal')
    .setDescription('Adds a given emoji to the server')
    .addStringOption(option => option.setName('emoji').setDescription('The emoji you would like to add to the server').setRequired(true))
    .addStringOption(option => option.setName('name').setDescription('The name for your emoji').setRequired(true)),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojiAndStickers))
      return await interaction.reply({
        content: 'You must have the Manage Emojis & Stickers permission to run this command',
        ephemeral: true
      });

    let emoji = interaction.options.getString('emoji')?.trim();
    const name = interaction.options.getString('name');

    if (emoji.startsWith('<') && emoji.endsWith('>')) {
      const id = emoji.match(/\d{15,}/)[0];

      const type = await axios
        .get(`https://cdn.discordapp.com/emojis/${id}.gif`)
        .then(image => (image ? 'gif' : 'png'))
        .catch(() => 'png');

      emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`;
    }

    if (!emoji.startsWith('http') || !emoji.startsWith('https')) {
      return await interaction.reply({ content: 'You cannot steal default emojis!', ephemeral: true });
    }

    interaction.guild.emojis
      .create(`${emoji}`, `${name}`)
      .then(emoji => {
        const embed = new EmbedBuilder().setColor('Blue').setDescription(`Added ${emoji}, with the name "**${name}**"`);

        return interaction.reply({ embeds: [embed] });
      })
      .catch(err => {
        interaction.reply({ content: 'You cannot add this emoji. You have reached your server emoji limit.', ephemeral: true });
      });
  }
};