/*
const { SlashCommandBuilder } =require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } =require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
  .setName('setwelchannel')
  .addChannelOption(option => option.setName('channel').setDescription('This is the channel whre you want the welcome messages to be send').setRequired(true))
  .setDescription("This sets a welcome channel "),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You must have admin to set a welcome channel", ephemeral: true })

    const channel = interaction.options.getChannel('channel');

const embed = new EmbedBuilder()
    .setColor('Green')
    .setDescription(`:white_check_mark: Your Welcome Channel has been set to ${channel} `)

await db.set(`welchannel_${interaction.guild.id}`, channel.id)

await interaction.reply({ embeds: [embed] });
  }
}
*/
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder }= require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setwelcomechannel')
        .setDescription('Set the welcome channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to set as the welcome channel')
                .setRequired(true)),
    async execute(interaction) {
        const welcomeChannel = interaction.options.getChannel('channel');

        // Save the welcome channel ID and guild ID to a database or file
        // Here, we'll just simulate saving it by storing it in memory
        const savedData = {
            channelId: welcomeChannel.id,
            guildId: interaction.guild.id,
        };

        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('Welcome Channel Set')
            .setDescription(`The welcome channel has been set to ${welcomeChannel}`);

        await interaction.reply({ embeds: [embed] });
    },
};
