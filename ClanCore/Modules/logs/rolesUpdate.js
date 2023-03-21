
const { EmbedBuilder, PermissionsBitField, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'roleUpdate',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(oldRole, newRole) {
        const { DateTime } = require('luxon');
        const PermissionConvert = require('../functions/permissionConvert.js');
        const ColorConvert = require('../functions/colorConvert.js');
        // SQLite
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        // AuditLog Fetch
        const fetchedLogs = await newRole.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.RoleUpdate,
        });
        const botLog = fetchedLogs.entries.first();
        // Data Null
        let dataChannellog;
        let dataAuditLogID;
        // Data Get
        let getBotConfigID = `${newRole.guild.id}-${newRole.guild.shardId}`;
        dataChannellog = Get.channelForLog(getBotConfigID);
        dataAuditLogID = Get.auditLogs(botLog.id);
        // Data Check
        if (dataChannellog == null) {
            console.log('No logging Channel in database')
            return;
        };
        // Context
        let dataLogs;
        dataLogs = Get.logsForChannel(getBotConfigID);
        if (dataLogs == null) {return};
        if (dataLogs.Updating === 'true') {
            const { targetType, actionType, action, reason, executor, changes, id, extra, target } = botLog;
            let createdTimestampLog = botLog.createdTimestamp;
            let dt = DateTime.now().minus({ seconds: 5 });
            let time = dt.toMillis();
            if (time > createdTimestampLog) {
                dataAuditLogID = { AuditLogID: `${id}`, GuildID: `${newRole.guild.id}`, Type: 'Role_Update', Date: `${botLog.createdTimestamp}` };
            };
            if(targetType === 'Role' || actionType === 'Update') {
                let changeName = changes.filter(function(obj) {
                    return obj.key === 'name';
                });
                let changeHoist = changes.filter(function(obj) {
                    return obj.key === 'hoist';
                });
                let changeMention = changes.filter(function(obj) {
                    return obj.key === 'mentionable';
                });
                let changeColor = changes.filter(function(obj) {
                    return obj.key === 'color';
                });
                let changePermissions = changes.filter(function(obj) {
                    return obj.key === 'permissions';
                });
                let ruo = ''; // Role Update Old
                let runew = ''; // Role Update New
                // Embed
                let icon2 = executor.avatarURL();
                if(executor.avatar == null) {
                    icon2 = 'attachment://discord_logo_gray.png';
                };
                const embedCU = new EmbedBuilder()
                    .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                    .setColor('Blue')
                    .setDescription(`${executor} **Changed** Role ${target}'s settings`)
                // Old
                if (changeName && changeName.length !== 0) { ruo += `**Name:** ${changeName[0].old}\n`; };
                if (changeColor && changeColor.length !== 0) {
                    let colorOld = await ColorConvert.IntToHex(changeColor[0].old);
                    ruo += `**Color:** ${colorOld}\n`;
                };
                if (changeHoist && changeHoist.length !== 0) { ruo += `**Display:** ${changeHoist[0].old}\n`; };
                if (changeMention && changeMention.length !== 0) { ruo += `**Mentionable:** ${changeMention[0].old}\n`; };
                if (changePermissions && changePermissions.length !== 0) {
                    let permOld = await PermissionConvert.permissionsBitField(changePermissions[0].old);
                    ruo += `**Permissions:**\n${permOld}\n`;
                    // ruo += `**Permissions:** ${changePermissions[0].old}\n`;
                };
                // New
                if (changeName && changeName.length !== 0) { runew += `**Name:** ${changeName[0].new}\n`; };
                if (changeColor && changeHoist.length !== 0) {
                    let colorNew = await ColorConvert.IntToHex(changeColor[0].new);
                    runew += `**Color:** ${colorNew}\n`;
                };
                if (changeHoist && changeHoist.length !== 0) { runew += `**Display:** ${changeHoist[0].new}\n`; };
                if (changeMention && changeMention.length !== 0) { runew += `**Mentionable:** ${changeMention[0].new}\n`; };
                if (changePermissions && changePermissions.length !== 0) {
                    let permNew = await PermissionConvert.permissionsBitField(changePermissions[0].new);
                    runew += `**Permissions:**\n${permNew}\n`;
                    // runew += `**Permissions:** ${changePermissions[0].new}\n`;
                };
                // AddFileds
                if (ruo && ruo.length !== 0) {
                    embedCU.addFields(
                        { name: 'Old:', value: `${ruo}`, inline: true },
                    )
                };
                if (runew && runew.length !== 0) {
                    embedCU.addFields(
                        { name: 'New:', value: `${runew}`, inline: true },
                    )
                };
                if (dataAuditLogID == null) {
                    // Bot
                    if (executor.bot === true) {
                        embedCU.setFooter({text: `BotID: ${executor.id}`})
                        .setTimestamp(new Date());
                        dataAuditLogID = { AuditLogID: `${id}`, GuildID: `${newRole.guild.id}`, Type: 'Role_Update', Date: `${botLog.createdTimestamp}` };
                        Set.auditLogs(dataAuditLogID);
                        globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embedCU]});
                    } else
                    // Member
                    if (executor.bot != true) {
                        embedCU.setFooter({text: `MemberID: ${executor.id}`})
                        .setTimestamp(new Date());
                        dataAuditLogID = { AuditLogID: `${id}`, GuildID: `${newRole.guild.id}`, Type: 'Role_Update', Date: `${botLog.createdTimestamp}` };
                        Set.auditLogs(dataAuditLogID);
                        globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embedCU]});
                    };
                };
            };
            let dataAuditLogDate;
            dataAuditLogDate = Get.allAuditLogs('Role_Update');
            if (dataAuditLogDate != null && dataAuditLogDate.length < 4) {
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

/*
2199023255551
*/