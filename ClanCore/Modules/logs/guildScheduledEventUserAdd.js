
const { EmbedBuilder, AuditLogEvent, Events } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'guildScheduledEventUserAdd',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(guildScheduledEvent, user) {
        // SQLite
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        let dataChannellog;
        let getBotConfigID = `${guildScheduledEvent.guild.id}-${guildScheduledEvent.guild.shardId}`;
        dataChannellog = Get.channelForLog(getBotConfigID);
        if (dataChannellog == null) {
            console.log('No logging Channel in database')
            return;
        };
        let dataLogs;
        dataLogs = Get.logsForEvent(getBotConfigID);
        if (dataLogs == null) {return};
        if (dataLogs.User_Add === 'true') {
            let icon2 = user.avatarURL();
            if(user.avatar == null) {
                icon2 = 'attachment://discord_logo_gray.png';
            };
            const memberLeave = new EmbedBuilder()
                .setAuthor({name: `${user.tag}`, iconURL: `${icon2}`})
                .setColor('Blue')
                .setDescription(`${user} is **interested** in Event \`${guildScheduledEvent.name}\``)
                .setFooter({text: `MemberID: ${user.id}`})
                .setTimestamp(new Date());
                globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [memberLeave]});
        };
    },
};