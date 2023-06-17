
const { EmbedBuilder, AuditLogEvent, Events } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'guildScheduledEventDelete',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(guildScheduledEvent) {
        // console.log(guildScheduledEvent);
        // SQLite
        const { DateTime } = require('luxon');
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        // Fetch Auditlog
        const fetchedLogs = await guildScheduledEvent.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.GuildScheduledEventDelete,
        });
        const botLog = fetchedLogs.entries.first();
        // console.log(botLog);
        // Data Null
        let dataChannellog;
        // let dataAuditLogID;
        // Data Get
        let getBotConfigID = `${guildScheduledEvent.guild.id}-${guildScheduledEvent.guild.shardId}`;
        dataChannellog = Get.channelForLog(getBotConfigID);
        // dataAuditLogID = globalclient.getAuditLogID.get(kickLog.id);
        // Data Check
        if (dataChannellog == null) {
            console.log('No logging Channel in database')
            return;
        };
        let dataLogs;
        dataLogs = Get.logsForEvent(getBotConfigID);
        if (dataLogs == null) {return};
        if (dataLogs.Deleting === 'true') {
            const { targetType, actionType, executor, target } = botLog;

            if (targetType === 'GuildScheduledEvent' && actionType === 'Delete') {
                let icon2 = executor.avatarURL();
                if(executor.avatar == null) {
                    icon2 = 'attachment://discord_logo_gray.png';
                };
                let location;
                // STAGE_INSTANCE
                if (target.entityType === 1) {
                    let channel = await globalclient.channels.fetch(target.channelId);
                    location = channel;
                } else
                // VOICE
                if (target.entityType === 2) {
                    let channel = await globalclient.channels.fetch(target.channelId);
                    location = channel;
                } else
                // EXTERNAL
                if (target.entityType === 3) {
                    location = 'External Event.'
                };
                const memberLeave = new EmbedBuilder()
                    .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                    .setColor('Blue')
                    .setDescription(`${executor} **Canceled** the Event \`${target.name}\``)
                    .addFields(
                        { name: 'Description:', value: `${target.description}` },
                        { name: 'Location:', value: `${location}` },
                    )
                    .setFooter({text: `MemberID: ${target.id}`})
                    .setTimestamp(new Date());
                    globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [memberLeave]});
            };
        };
    },
};