
const { EmbedBuilder, AuditLogEvent, Events } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'guildScheduledEventCreate',
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
            type: AuditLogEvent.GuildScheduledEventCreate,
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
        if (dataLogs.Creating === 'true') {
            const { targetType, actionType, executor, target } = botLog;

            if (targetType === 'GuildScheduledEvent' && actionType === 'Create') {
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
                    location = target.entityMetadata.location;
                };
                // ENDING TIME
                let a1 = target.scheduledStartTimestamp / 1000;
                let startTsInSec = a1.toString().split('.');
                let a2 = target.scheduledEndTimestamp / 1000;
                let endTsInSec = a2.toString().split('.');
                let end = `<t:${endTsInSec[0]}:f>`;
                if (target.scheduledEndTimestamp == null) {
                    end = 'Up to the Hoste.'
                };
                // IMAGE
                let coverImage = target.coverImageURL();
                if (target.image == null) {
                    coverImage = 'attachment://discord_logo_gray.png';
                };
                const memberLeave = new EmbedBuilder()
                    .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                    .setColor('Blue')
                    .setDescription(`${executor} **Created** the Event \`${target.name}\``)
                    .addFields(
                        { name: 'Title:', value: `${target.name}` },
                        { name: 'Description:', value: `${target.description}` },
                        { name: 'Start:', value: `<t:${startTsInSec[0]}:f>`, inline: true },
                        { name: 'End', value: end, inline: true },
                        { name: 'Location:', value: `${location}` },
                    )
                    .setImage(coverImage)
                    .setFooter({text: `MemberID: ${target.id}`})
                    .setTimestamp(new Date());
                    globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [memberLeave]});
            };
        };
    },
};