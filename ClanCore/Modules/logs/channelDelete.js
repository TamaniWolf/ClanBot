
const { EmbedBuilder, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'channelDelete',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(channel) {
        // SQLite
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        // AuditLog Fetch
        const FetchedLogs = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.ChannelDelete,
        });
        const channelDeleteLog = FetchedLogs.entries.first();
        // Data Null
        let dataLogs;
        let dataChannellog;
        let dataAuditLogID;
        // Data Get
        let getBotConfigID = `${channel.guild.id}-${channel.guild.shardId}`;
        dataLogs = Get.logsForChannel(getBotConfigID);
        dataChannellog = Get.channelForLog(getBotConfigID);
        dataAuditLogID = Get.auditLogs(channelDeleteLog.id);
        // Data Check
        if (dataLogs == null) {return};
        if (dataChannellog == null) {
            console.log('No logging Channel in database')
            return;
        };
        // Context
        if (dataLogs.Creating === 'true') {
            const { targetType, actionType, executor, target } = channelDeleteLog;
            if(targetType === 'Channel' && actionType === 'Delete') {
                // Embed
                let icon2 = executor.avatarURL();
                if(executor.avatar == null) {
                    icon2 = 'attachment://discord_logo_gray.png';
                };
                const channelCreateEmbed = new EmbedBuilder()
                    .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                    .setColor('Blue')
                // Bot/Member
                if (executor.bot === false) {
                    channelCreateEmbed.setFooter({text: `MemberID: ${executor.id}`});
                } else
                if (executor.bot === true) {
                    channelCreateEmbed.setFooter({text: `BotID: ${executor.id}`});
                };
                // Channel Type
                const ChannelTypeConvert = require('./../functions/channelTypeConvert.js');
                let chaTypeNew = await ChannelTypeConvert.channelTypeNumber(target.type);
                if(chaTypeNew !== '') {
                    channelCreateEmbed.setDescription(`${executor} **Deleted** ${chaTypeNew} \`${target.name}\``)
                    // AddFields
                    channelCreateEmbed.setTimestamp(new Date());
                    globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [channelCreateEmbed]});
                };
            };
        };
    },
};