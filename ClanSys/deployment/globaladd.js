
const fs = require('node:fs');
const { REST, Routes } = require('discord.js');
require('dotenv').config();

module.exports = (message, args) => {
    let getGuildID = message.guild.id;
    let getClientID = globalclient.user.id;
    const slashCommands = [];
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    // Member
    // Getting Directory name from list and filter out .js filesin to a string.
    const load_dir = (dirs) => {
        const commandFilesMember = fs.readdirSync(`./ClanSys/commands/members/${dirs}`).filter(file => file.endsWith('.js'));
        // Grabs files out of the string, one by one (for loop) and Sets Command in the Collection.
        for (const file of commandFilesMember) {
            const commandMember = require(`../commands/members/${dirs}/${file}`);
            if (commandMember == null) {
                return;
            };
            if (commandMember.data.name) {
                slashCommands.push(commandMember.data.toJSON());
            } else {
                // If Name is undefined and/or Admin False, continue (for loop).
                continue;
            };
        };
    };
    // Directory name array list.
    const dirsMember = fs.readdirSync(`./ClanSys/commands/members`);
    dirsMember.forEach(c => load_dir(c));
    // Admin
    // Getting Directory name from list and filter out .js filesin to a string.
    const load_dir2 = (dirs) => {
        const commandFilesAdmin = fs.readdirSync(`./ClanSys/commands/admins/${dirs}`).filter(file => file.endsWith('.js'));
        // Grabs files out of the string, one by one (for loop) and Sets Command in the Collection.
        for (const file of commandFilesAdmin) {
            const commandAdmin = require(`../commands/admins/${dirs}/${file}`);
            if (commandAdmin == null) {
                return;
            };
            if (commandAdmin.data.name) {
                slashCommands.push(commandAdmin.data.toJSON());
            } else {
                // If Name is undefined and/or Admin False, continue (for loop).
                continue;
            };
        };
    };
    // Directory name array list.
    const dirsAdmin = fs.readdirSync(`./ClanSys/commands/admins`);
    dirsAdmin.forEach(c => load_dir2(c));
    (async () => {
        try {
            console.log(`Started refreshing ${slashCommands.length} application (/) commands.`);
            const data = await rest.put(
                // Local commands
                Routes.applicationCommands(getClientID),
                { body: slashCommands },
            );
            let replyMsg = `Successfully reloaded ${data.length} application (/) commands.`;
            console.log(replyMsg);
            message.reply({ content: replyMsg, ephemeral: true });
        } catch (error) {
            console.error(error);
        };
    })();
};
