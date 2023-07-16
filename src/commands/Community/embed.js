const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('This is an embed guide'),
  
  async execute(interaction) {
    // Add your code for the 'embed' command execution here
  

 const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('NORK SERVER ANNOUNCEMENT')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Nork ', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC72S35nf5-rTL_1TNyhxeXZ89IUNc60MocA&usqp=CAU')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC72S35nf5-rTL_1TNyhxeXZ89IUNc60MocA&usqp=CAU')
	.setTimestamp()
	.setFooter({ text: '© nork ', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

await interaction.reply({ embeds: [embed] });
}
}
