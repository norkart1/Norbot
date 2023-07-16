const { SlashCommandBuilder } = require('discord.js');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modal')
        .setDescription('nork server '),
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setTitle('modal')
            .setCustomId('modal');
        const name = new TextInputBuilder()
            .setCustomId('name')
            .setRequired(true)
            .setLabel('Enter your full name')
            .setStyle('Short'); // Use string value for style
        const about = new TextInputBuilder()
            .setCustomId('about')
            .setRequired(true)
            .setLabel(' Write two words about yourself ')
            .setStyle('Paragraph');
        const firstActionRow = new ActionRowBuilder().addComponents(name);
        const secondActionRow = new ActionRowBuilder().addComponents(about);

        modal.addComponents(firstActionRow, secondActionRow );

        interaction.showModal(modal);

    }

};

