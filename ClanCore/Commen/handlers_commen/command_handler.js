
const fs = require('fs');
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';

module.exports = (client) => {
    // Member
    // Getting Directory name from list and filter out .js filesin to a string.
    const load_dir = (dirs) =>{
        const commandFilesMember = fs.readdirSync(`./ClanSys/commands/members/${dirs}`).filter(file => file.endsWith('.js'));
        // Grabs files out of the string, one by one (for loop) and Sets Command in the Collection.
        for(const file of commandFilesMember){
            const commandMember = require(`../../../ClanSys/commands/members/${dirs}/${file}`);
            if (commandMember == null) {
                return;
            };
            if(commandMember.data.name){
                client.slashCommands.set(commandMember.data.name, commandMember);
            } else {
                // If Name is undefined and/or Admin False, continue (for loop).
                continue;
            };
        }
    };
    // Directory name array list.
    const dirsMember = fs.readdirSync(`./ClanSys/commands/members`);
    dirsMember.forEach(c => load_dir(c));
    // Admin
    // Getting Directory name from list and filter out .js filesin to a string.
    const load_dir2 = (dirs) =>{
        const commandFilesAdmin = fs.readdirSync(`./ClanSys/commands/admins/${dirs}`).filter(file => file.endsWith('.js'));
        // Grabs files out of the string, one by one (for loop) and Sets Command in the Collection.
        for(const file of commandFilesAdmin){
            const commandAdmin = require(`../../../ClanSys/commands/admins/${dirs}/${file}`);
            if (commandAdmin == null) {
                return;
            };
            if(commandAdmin.data.name){
                client.slashCommands.set(commandAdmin.data.name, commandAdmin);
            } else {
                // If Name is undefined and/or Admin False, continue (for loop).
                continue;
            };
        }
    };
    // Directory name array list.
    const dirsAdmin = fs.readdirSync(`./ClanSys/commands/admins`);
    dirsAdmin.forEach(c => load_dir2(c));
    console.log('[' + DateTime.utc().toFormat(timeFormat) + '][Discord]', 'Command Heandler loaded');
}