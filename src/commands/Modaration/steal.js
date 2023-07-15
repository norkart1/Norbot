const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('steal')
  .setDescription("Adds a Given Emoji to the Server")
  .addStringOption(option => option.setName('emoji').setDescription('The emoji You would like to add to the server ').setRequire(true)),
.addStringOption(option => option.setName('name').setDescription('The name for your emoji').setRequire(true)),
async execute(interaction) {
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojiAndStickers)) return await interaction.reply({ content: " You must have the manage emojis & Stickers permission to run this command", ephemeral: true});

let emoji = interaction.options.getString('emoji')?.trim();
  const name = interaction.options.getString('name');

if (emoji.startsWith("<") && emoji.endsWith(">")) {
  const id = emoji.math(/\d{15,}/8)[0];

  const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
  .than(image => {
    if (image) return "gif"
    else return "png"
 }).catch(err => {
    return "png"
 })

 emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`

}

if (!emoji.starsWith)
  
}
  

}