/*
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quickdb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setautorole')
    .setDescription('This sets a auto join role ')
    .addRoleOption(option => option.setName('role').setDescription('This is the role you want as as your autorole ').setRequired(true)),

  async execute(interaction) {

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: 'You cannot set an auto role role ', ephemeral: true });

    const role = interaction.options.getRole('role');

    await db.set(`autorole_${interaction.guild.id}`, role.id);

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription(`:white_check_mark: Your auto role has been set to ${role}`)

    await interaction.reply({ embeds: [embed] });
  }
}*/
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB()

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set')
    .setDescription('Assign automatic roles to newly joined users')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('autorole')
        .setDescription('Assign automatic roles to newly joined users')
        .addRoleOption((option) =>
          option
            .setName('role')
            .setDescription('Set the role you want as your autorole')
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
      return await interaction.reply({
        content: 'Sorry, but you do not have permission to use this command',
        ephemeral: true,
      });

    const role = interaction.options.getRole('role');

    await db.set(`autorole_${interaction.guild.id}`, role.id);

    const embed = new EmbedBuilder()
      .setColor('Green')
/*      .setDescription(`<:check:1127445040449470555> Successfully assigned the autorole to ${role}`);
*/
    
      .setDescription(`:white_check_mark: Your auto role has been set to ${role}`)
    
    switch (subcommand) {
      case 'autorole':
        await interaction.reply({ embeds: [embed] });
        break;
    }
  },
};
      