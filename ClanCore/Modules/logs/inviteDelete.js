
const { EmbedBuilder, AuditLogEvent, Events } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'inviteDelete',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(invite) {
        // console.log(invite);
        // SQLite
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        const fetchedLogs = await invite.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.InviteDelete,
        });
        const botLog = fetchedLogs.entries.first();
        let dataChannellog;
        let getBotConfigID = `${invite.guild.id}-${invite.guild.shardId}`;
        dataChannellog = Get.channelForLog(getBotConfigID);
        if (dataChannellog == null) {
            console.log('No logging Channel in database')
            return;
        };
        let dataLogs;
        dataLogs = Get.logsForChannel(getBotConfigID);
        if (dataLogs == null) {return};
        if (dataLogs.Deleting === 'true') {
            const { executor, target } = botLog;
            // console.log(botLog);
            let channel = await invite.guild.channels.fetch(target.channelId);
            let icon2 = executor.avatarURL();
            if(executor.avatar == null) {
                icon2 = 'attachment://discord_logo_gray.png';
            };
            const memberLeave = new EmbedBuilder()
            .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
            .setColor('Blue')
            .setDescription(`${executor} **Deleted** an Invite from This Server`)
            .addFields(
                { name: 'Code:', value: `${target.code}`, inline: true },
                { name: 'Channel:', value: `${channel}`, inline: true },
                // { name: 'Expires on:', value: ``, inline: true },
                // { name: 'More:', value: `` },
            )
            .setFooter({text: `MemberID: ${target.inviterId}`})
            .setTimestamp(new Date());
            globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [memberLeave]});
        };
    },
};