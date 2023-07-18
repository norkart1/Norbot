function loadCommands(client) {
  const ascii = require('ascii-table');
  const fs = require('fs');
  const table = new ascii().setHeading('Events', 'Status');

  
  
  let commandsArray = [];

  const folders = fs.readdirSync('./Events');
  for (folder of folders) {
    const files = fs.readdirSync(`./Events/${folder}`).filter((file) => file.endsWith(".js"));
    for (file of files) {
      const event = require(`../Events/${folder}/${file}`);

      
      client.commands.set(commandFile.data.name, commandFile);
commandsArray.push(commandFile.data.toJSON);
      
      table.addRow(file, "loaded");
continue;
    }
  }
  client.application.commands.set(commandsArray);

  return console.log(table.toString(), "\nLoaded events");

}
module.exports = {loadCommands};
                     