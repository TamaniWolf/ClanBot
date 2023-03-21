
const { EmbedBuilder, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'guildMemberRemove',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(member) {
        // SQLite
        const { DateTime } = require('luxon');
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        // Fetch Auditlog
        if (member.user.id === globalclient.user.id) return;
        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberKick,
        });
        const kickLog = fetchedLogs.entries.first();
        // Data Null
        let dataChannellog;
        let dataAuditLogID;
        // Data Get
        let getBotConfigID = `${member.guild.id}-${member.guild.shardId}`;
        dataChannellog = Get.channelForLog(getBotConfigID);
        dataAuditLogID = Get.auditLogs(kickLog.id);
        // Data Check
        if (dataChannellog == null) {
            console.log('No logging Channel in database')
            return;
        };
        // Context
        let dataLogs;
        dataLogs = Get.logsForMember(getBotConfigID);
        if (dataLogs == null) {return};
        if (dataLogs.Removing === 'true') {
            const { targetType, actionType, action, reason, executor, changes, id, extra, target } = kickLog;
            let createdTimestampLog = kickLog.createdTimestamp;
            let dt = DateTime.now().minus({ seconds: 5 });
            let time = dt.toMillis();
            if (time > createdTimestampLog) {
                dataAuditLogID = { AuditLogID: `${id}`, GuildID: `${member.guild.id}`, Type: 'Kick', Date: `${kickLog.createdTimestamp}` };
            };
            // Embed
            const memberLeave = new EmbedBuilder()
                .setColor('Orange')
                .setTimestamp(new Date());
            
            // Member
            if (target.id !== member.user.id || dataAuditLogID != null) {
                let icon2 = member.user.avatarURL();
                if(member.user.avatar == null) {
                    icon2 = 'attachment://discord_logo_gray.png';
                };
                memberLeave.setAuthor({name: `${member.user.username}${member.user.discriminator}`, iconURL: `${icon2}`})
                    .setDescription(`<@${member.user.id}> **Left** the server`)
                    .setFooter({text: `MemberID: ${member.user.id}`})
                globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [memberLeave]});
            };
            if (target.id === member.user.id && dataAuditLogID == null) {
                let icon2 = executor.avatarURL();
                if(executor.avatar == null) {
                    icon2 = 'attachment://discord_logo_gray.png';
                };
                memberLeave.setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                    .setDescription(`${target} got **Kicked** out by ${executor}`)
                    .setFooter({text: `MemberID: ${target.id}`})
                if (target.id === member.user.id && reason != null) {
                    memberLeave.addFields(
                        { name: '**Reason:**', value: `${reason}` },
                    )
                };
                globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [memberLeave]});
                dataAuditLogID = { AuditLogID: `${id}`, GuildID: `${member.guild.id}`, Type: 'Kick', Date: `${kickLog.createdTimestamp}` };
                Set.auditLogs(dataAuditLogID);
            };
            let dataAuditLogDate;
            dataAuditLogDate = Get.allAuditLogs('Kick');
            if (dataAuditLogDate.length < 4) {
                return;
            } else {
                dataAuditLogDate.forEach(date => {
                    let dtRemove = DateTime.now().minus({ days: 20 });
                    let timeNew = dtRemove.toMillis();
                    if (timeNew >= date.Date) {
                        Del.auditLogs(date.AuditLogID);
                    };
                });
            };
        };
    },
};