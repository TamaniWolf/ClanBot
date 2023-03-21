
const { EmbedBuilder, AuditLogEvent, Events } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'guildIntegrationsUpdate',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(guild) {
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        try {
            let guilds = await globalclient.guilds.fetch(guild.id);
            const createLogs = await guilds.fetchAuditLogs({
                limit: 1,
                type: AuditLogEvent.IntegrationCreate,
            });
            const deleteLogs = await guilds.fetchAuditLogs({
                limit: 1,
                type: AuditLogEvent.IntegrationDelete,
            });
            const updateLogs = await guilds.fetchAuditLogs({
                limit: 1,
                type: AuditLogEvent.IntegrationUpdate,
            });
            let createLog = createLogs.entries.first();
            let deleteLog = deleteLogs.entries.first();
            let updateLog = updateLogs.entries.first();
            if (createLog == null) { createLog = { createdTimestamp: 1 }; };
            if (deleteLog == null) { deleteLog = { createdTimestamp: 1 }; };
            if (updateLog == null) { updateLog = { createdTimestamp: 1 }; };
            let dataChannellog;
            let getBotConfigID = `${guild.id}-${guild.shardId}`;
            dataChannellog = Get.channelForLog(getBotConfigID);
            if (!dataChannellog) {
                console.log('No logging Channel in database')
                return;
            };
            if (dataChannellog.ChannelID === '100000000000000000') {
                return;
            };
            let dataLogs;
            dataLogs = Get.logsForChannel(getBotConfigID);
            if (dataLogs == null) {return};
            if (dataLogs.Updating === 'true') {
                if (createLog.createdTimestamp > updateLog.createdTimestamp && createLog.createdTimestamp > deleteLog.createdTimestamp) {
                    const { targetType, actionType, action, reason, executor, changes, id, extra, target } = createLog;
                    let icon2 = executor.avatarURL();
                    if(executor.avatar == null) {
                        icon2 = 'attachment://discord_logo_gray.png';
                    };
                    var embed = new EmbedBuilder()
                    .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                    .setTimestamp(new Date())
                    .setColor('Red')
                    .setDescription(`Integration for \`${target.name}\` got **Added** by ${executor}`)
                    .setFooter({text: `MemberID: ${target.id}`})
                    .setTimestamp(new Date());
                    globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embed]});
                };
                if (deleteLog.createdTimestamp > createLog.createdTimestamp && deleteLog.createdTimestamp > updateLog.createdTimestamp) {
                    const { targetType, actionType, action, reason, executor, changes, id, extra, target } = deleteLog;
                    let icon2 = executor.avatarURL();
                    if(executor.avatar == null) {
                        icon2 = 'attachment://discord_logo_gray.png';
                    };
                    var embed = new EmbedBuilder()
                    .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                    .setTimestamp(new Date())
                    .setColor('Red')
                    .setDescription(`Integration for \`${target.name}\` got **Removed** by ${executor}`)
                    .setFooter({text: `MemberID: ${target.id}`})
                    .setTimestamp(new Date());
                    globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embed]});
                };
                if (updateLog.createdTimestamp > createLog.createdTimestamp && updateLog.createdTimestamp > deleteLog.createdTimestamp) {
                    const { targetType, actionType, action, reason, executor, changes, id, extra, target } = updateLog;
                    let icon2 = executor.avatarURL();
                    if(executor.avatar == null) {
                        icon2 = 'attachment://discord_logo_gray.png';
                    };
                    var embed = new EmbedBuilder()
                    .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                    .setTimestamp(new Date())
                    .setColor('Red')
                    .setDescription(`Integration for \`${target.name}\` got **Updated** by ${executor}`)
                    .setFooter({text: `MemberID: ${target.id}`})
                    .setTimestamp(new Date());
                    globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embed]});
                };
            };
        } catch(err) {
            let errData;
            if (err.code === 50013) {errData = `${err}\n[Client] Ether the Bot/Member is Missing the requiered Permission or the Bot left a Server.`};
            if (err.code !== 50013) {errData = err};
            console.log(errData);
        };
    },
};