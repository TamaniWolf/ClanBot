
const { Events } = require('discord.js');
module.exports = {
    name: Events.GuildCreate,
    description: 'Loggin bot\'s beeing added to the server.',
    once: true,
    async execute(guild) {
        ['join'].forEach(systemHandler =>{
            require(`../../../Modules/database/create/${systemHandler}.js`)(guild);
        });
        const { Get, Set, Del } = require('../../../Modules/functions/sqlite/prepare');
        let getBotConfigID = `${guild.id}-${guild.shardId}`;
        let dataLogs;
        dataLogs = Get.logsForGuild(getBotConfigID);
        if (dataLogs == null) {return;};
        if (dataLogs.Creating === 'true') {
            console.log(`The Bot Joined a new server: ${guild.name}`);
        };
    },
};
