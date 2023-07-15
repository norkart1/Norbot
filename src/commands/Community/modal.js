const { SlashCommandBuilder } = require('discord.js');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modal')
        .setDescription('learn modal'),
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setTitle('modal')
            .setCustomId('modal');
        const name = new TextInputBuilder()
            .setCustomId('name')
            .setRequired(true)
            .setLabel('Jak masz na Imię?')
            .setStyle('Short'); // Use string value for style
        const about = new TextInputBuilder()
            .setCustomId('about')
            .setRequired(true)
            .setLabel('Send me Song link <3')
            .setStyle('Paragraph'); // Use string value for style
        const firstActionRow = new ActionRowBuilder().addComponents(name);
        const secondActionRow = new ActionRowBuilder().addComponents(about);

        modal.addComponents(firstActionRow, secondActionRow );

        interaction.showModal(modal);

    }

};

