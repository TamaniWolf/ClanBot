
module.exports = {
    name: 'guildDelete',
    description: 'Loggin bot\'s beeing added to the server.',
    once: true,
    async execute(guild) {
        const { Get, Set, Del } = require('../../../Modules/functions/sqlite/prepare');
        let getBotConfigID = `${guild.id}-${guild.shardId}`;
        let dataLogs;
        dataLogs = Get.logsForGuild(getBotConfigID);
        if (dataLogs == null) {return;};
        if (dataLogs.Deleting === 'true') {
            console.log(`The Bot left a server: ${guild.name}`);
        };
        ['leave'].forEach(systemHandler =>{
            require(`../../../Modules/database/create/${systemHandler}.js`)(guild);
        });
    },
};
