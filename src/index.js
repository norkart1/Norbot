const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, interactionBitField } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [Object.keys(GatewayIntentBits)] });

const modLogChannelId = '1130022902608179211';

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

// MOD LOGS
/*
client.on(Events.ChannelCreate, async channel => {
  channel.guild.fetchAuditLogs({
    type: AuditLogEvent.ChannelCreate,
  })
  .then(async audit => {
    const { executer } = audit.entries.first()

    const name = channel.name;
    const id = channel.id;
    let type = channel.type;

    if (type == 0) type = 'Text' 
    if (type == 2) type = 'Voice' 
    if (type == 13) type = 'Stage' 
    if (type == 15) type = 'Form' 
    if (type == 4) type = 'Announcement' 
    if (type == 4) type = 'Catagory' 

    const channelId = '1130022902608179211';
    const mChannel = await channels.guild.channels.cache.get(channelID);

    const embed = new EmbedBuilder()
    .setColor('Red')
    .setTitel("Channel Created")
    .addFields({ name: "Channel Name", value: `${name} (<#${id}>)`, inline: false })
        
    .addFields({ name: "Channel Type", value: `${type}`, inline: false })

               
    .addFields({ name: "Channel Id", value: `${id}`, inline: false })

   
    .addFields({ name: "Created By", value: `${executer.tag}`, inline: false })

    .setTimestamo()
    .setFooter({ text: "Mod Logging System"})

    mChannel.send({ embeds: [embed] })

    
  })
})*/
/*
client.on('Events.ChannelCreate', async (channel) => {
  if (!channel.guild) return;

  channel.guild.fetchAuditLogs({
    type: Constants.AuditLogEvent.ChannelCreate,
  }).then(async (audit) => {
    const { executor } = audit.entries.first();

    const name = channel.name;
    const id = channel.id;
    let type = channel.type;

    if (type === 'GUILD_TEXT') type = 'Text';
    else if (type === 'GUILD_VOICE') type = 'Voice';
    else if (type === 'GUILD_STAGE_VOICE') type = 'Stage';
    else if (type === 'GUILD_NEWS') type = 'News';
    else if (type === 'GUILD_CATEGORY') type = 'Category';
    else if (type === 'GUILD_STORE') type = 'Store';

    const channelId = '1130022902608179211';
    const mChannel = await channel.guild.channels.cache.get(channelId);

    const embed = new EmbedBuilder()
      .setColor('RED')
      .setTitle('Channel Created')
      .addFields({ name: 'Channel Name', value: `${name} (<#${id}>)`, inline: false })
      .addFields({ name: 'Channel Type', value: `${type}`, inline: false })
      .addFields({ name: 'Channel Id', value: `${id}`, inline: false })
      .addFields({ name: 'Created By', value: `${executor.tag}`, inline: false })
      .setTimestamp()
      .setFooter('Mod Logging System');

    mChannel.send({ embeds: [embed] });
  });
});
*/
client.on('messageDelete', async (message) => {
  if (!message.partial) {
    const embed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('Message Deleted')
      .setDescription(`A message was deleted in ${message.channel} by ${message.author.tag}`)
      .addField('Content', message.content)
      .setTimestamp();

    const modLogChannel = await client.channels.fetch(modLogChannelId);
    if (modLogChannel && modLogChannel.isText()) {
      modLogChannel.send({ embeds: [embed] });
    }
  }
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (!oldMessage.partial && !newMessage.partial && oldMessage.content !== newMessage.content) {
    const embed = new EmbedBuilder()
      .setColor('#FFFF00')
      .setTitle('Message Edited')
      .setDescription(`A message was edited in ${newMessage.channel} by ${newMessage.author.tag}`)
      .addField('Before', oldMessage.content)
      .addField('After', newMessage.content)
      .setTimestamp();

    const modLogChannel = await client.channels.fetch(modLogChannelId);
    if (modLogChannel && modLogChannel.isText()) {
      modLogChannel.send({ embeds: [embed] });
    }
  }
});

client.on('guildBanAdd', async (ban) => {
  const embed = new EmbedBuilder()
    .setColor('#FF0000')
    .setTitle('Member Banned')
    .setDescription(`${ban.user.tag} was banned from the server.`)
    .setTimestamp();

  const modLogChannel = await client.channels.fetch(modLogChannelId);
  if (modLogChannel && modLogChannel.isText()) {
    modLogChannel.send({ embeds: [embed] });
  }
});

client.on('guildBanRemove', async (ban) => {
  const embed = new EmbedBuilder()
    .setColor('#00FF00')
    .setTitle('Member Unbanned')
    .setDescription(`${ban.user.tag} was unbanned from the server.`)
    .setTimestamp();

  const modLogChannel = await client.channels.fetch(modLogChannelId);
  if (modLogChannel && modLogChannel.isText()) {
    modLogChannel.send({ embeds: [embed] });
  }
});