/*
const { SlashCommandBuilder } =require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } =require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
  .setName('removewelchannel')
  .setDescription("This disable the  welcome channel "),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You must have admin to disable a welcome channel", ephemeral: true })


const embed = new EmbedBuilder()
    .setColor('Green')
    .setDescription(`:white_check_mark: Your Welcome Channel has been removed `)

await db.set(`welchannel_${interaction.guild.id}`, channel.id)

await interaction.reply({ embeds: [embed] });
  }
}
*/

const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removewelcomechannel')
        .setDescription('Remove the welcome channel'),
    async execute(interaction) {
        // Remove the welcome channel from the database or file
        // Here, we'll just simulate removing it by setting it to null in memory
        const savedData = {
            channelId: null,
            guildId: interaction.guild.id,
        };

        const embed = new  EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Welcome Channel Removed')
            .setDescription('The welcome channel has been removed.');

        await interaction.reply({ embeds: [embed] });
    },
};