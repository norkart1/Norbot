const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, interactionBitField } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
  for (file of functions) {
    require(`./functions/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./src/events");
  client.handleCommands(commandFolders, "./src/commands");
  client.login(process.env.token)
})();

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === 'modal') {
    await interaction.reply({ content: "good modal", ephemeral: true });

    const namereport = interaction.fields.getTextInputValue('name')
    const aboutreport = interaction.fields.getTextInputValue('about')



  }
});
/*

const { QuickDB } = require('quickdb');
const db = new QuickDB();

client.on(Events.GuildMemberAdd, async (member) => {
  const channelId = await db.get(`welchannel_${member_guild_id}`)

  const channel = member.guild.channels.cache.get(channelID)

  const message = `**Welcome to the server, ${member}!**`

  if (channelID == null) return;

  channel.send(message)

})*/
const { QuickDB } = require('quickdb');
const db = new QuickDB();
  

client.on('guildMemberAdd', async member => {

    
    const savedData = {
        channelId: '1127458747585937408',
        guildId: member.guild.id,
    };

    const { channelId, guildId } = savedData;

    if (!channelId || member.guild.id !== guildId) return;

    const welcomeChannel = member.guild.channels.cache.get(channelId);

    if (!welcomeChannel) return;

    const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('Welcome!')
        .setDescription(`Welcome to the server, ${member.user}!`);

    try {
        await welcomeChannel.send({ content: `Welcome, ${member.user}!`, embeds: [embed] });
    } catch (error) {
        console.error('Failed to send welcome message:', error);
    }
});






client.on(Events.GuildMemberAdd, async (member) => {

    const role = await db.get(`autorole_${member.guild.id}`);

    const givenRole = await member.guild.roles.cache.get(role);



    member.roles.add(givenRole);

})