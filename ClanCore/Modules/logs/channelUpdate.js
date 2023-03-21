
const { EmbedBuilder, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'channelUpdate',
    description: 't',
    call: 'on',
    async execute(oldChannel, newChannel) {
        // console.log('start');
        const { DateTime } = require('luxon');
        // SQLite
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        // AuditLog Fetch
        let guild = await globalclient.guilds.fetch(newChannel.guild.id);
        const fetchedLogsCU = await guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.ChannelUpdate,
        });
        const fetchedLogsCOU = await guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.ChannelOverwriteUpdate,
        });
        // const fetchedLogsCOC = await guild.fetchAuditLogs({
        //     limit: 1,
        //     type: AuditLogEvent.ChannelOverwriteCreate,
        // });
        // const fetchedLogsCOD = await guild.fetchAuditLogs({
        //     limit: 1,
        //     type: AuditLogEvent.ChannelOverwriteDelete,
        // });
        const channelUpdateLog = fetchedLogsCU.entries.first();
        const channelOverwriteUpdate = fetchedLogsCOU.entries.first();
        // const ChannelOverwriteCreate = fetchedLogsCOC.entries.first();
        // const ChannelOverwriteDelete = fetchedLogsCOD.entries.first();
        // Data Null
        let dataLogs;
        let dataChannellog;
        let dataAuditLogIDCU;
        let dataAuditLogIDCOU;
        // Data Get
        let getBotConfigID = `${guild.id}-${guild.shardId}`;
        dataLogs = Get.logsForChannel(getBotConfigID);
        dataChannellog = Get.channelForLog(getBotConfigID);
        // if (channelUpdateLog != null) {
        //     dataAuditLogIDCU = Get.auditLogs(channelUpdateLog.id);
        // };
        // Data Check
        if (dataLogs == null) {return};
        if (dataChannellog == null) {
            console.log('No logging Channel in database')
            return;
        };
        // Context
        if (dataLogs.Updating === 'true') {
            // console.log(ChannelOverwriteCreate);
            // return;
            let culogs = 2;
            if (channelUpdateLog != null) {
                culogs = channelUpdateLog.createdTimestamp;
            };
            let coulogs = 2;
            if (channelOverwriteUpdate != null) {
                coulogs = channelOverwriteUpdate.createdTimestamp;
            };
            if (culogs > coulogs) {
                if (channelUpdateLog != null) {
                    dataAuditLogIDCU = Get.auditLogs(channelUpdateLog.id);
                };
                const { targetType, actionType, action, reason, executor, changes, id, extra, target } = channelUpdateLog;
                // console.log('CU');
                // console.log(changes);
                // return;
                // let createdTimestampLog = channelUpdateLog.createdTimestamp;
                // let dt = DateTime.now().minus({ seconds: 5 });
                // let time = dt.toMillis();
                // if (time > createdTimestampLog) {
                //     // dataAuditLogIDCU = { AuditLogID: `${id}`, GuildID: `${newChannel.guild.id}`, Type: 'Channel_Update', Date: `${channelUpdateLog.createdTimestamp}` };
                //     return;
                // };
                // if (dataAuditLogIDCU == null) { dataAuditLogIDCU = { AuditLogID: 1 } };
                if (dataAuditLogIDCU == null || id !== dataAuditLogIDCU.AuditLogID) {
                    if(targetType === 'Channel' && actionType === 'Update') {
                        let changeName = changes.filter(function(obj) {
                            return obj.key === 'name';
                        });
                        let changeTopic = changes.filter(function(obj) {
                            return obj.key === 'topic';
                        });
                        let changeType = changes.filter(function(obj) {
                            return obj.key === 'type';
                        });
                        let changeNsfw = changes.filter(function(obj) {
                            return obj.key === 'nsfw';
                        });
                        let changeRLPU = changes.filter(function(obj) {
                            return obj.key === 'rate_limit_per_user';
                        });
                        let changeDAAD = changes.filter(function(obj) {
                            return obj.key === 'default_auto_archive_duration';
                        });
                        let cuo = ''; // Channel Update Old
                        let cun = ''; // Channel Update New
                        // Embed
                        let icon2 = executor.avatarURL();
                        if(executor.avatar == null) {
                            icon2 = 'attachment://discord_logo_gray.png';
                        };
                        const embedCU = new EmbedBuilder()
                            .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                            .setColor('Blue')
                            .setDescription(`${executor} **Changed** Channel ${target}'s settings`)
                        const ChannelTypeConvert = require('./../functions/channelTypeConvert.js');
                        let chaTypeOld;
                        if (changeType && changeType.length !== 0) {
                            chaTypeOld = await ChannelTypeConvert.channelTypeNumber(changeType[0].old);
                        };
                        let chaTypeNew;
                        if (changeType && changeType.length !== 0) {
                            chaTypeNew = await ChannelTypeConvert.channelTypeNumber(changeType[0].new);
                        };
                        // Old
                        if (changeName && changeName.length !== 0) { cuo += `**Name:** ${changeName[0].old}\n`; };
                        if (changeTopic && changeTopic.length !== 0) { cuo += `**Topic:** ${changeTopic[0].old}\n`; };
                        if (changeType && changeType.length !== 0) { cuo += `**Type:** ${chaTypeOld}\n`; };
                        if (changeNsfw && changeNsfw.length !== 0) { cuo += `**Nsfw:** ${changeNsfw[0].old}\n`; };
                        if (changeRLPU && changeRLPU.length !== 0) { cuo += `**Slowmode:** ${changeRLPU[0].old}s\n`; };
                        if (changeDAAD && changeDAAD.length !== 0) {
                            let dAAD_Old = '';
                            if (changeDAAD[0].old === 60) { dAAD_Old += '1 Hour' };
                            if (changeDAAD[0].old === 1440) { dAAD_Old += '24 Hours' };
                            if (changeDAAD[0].old === 4320) { dAAD_Old += '3 Days' };
                            if (changeDAAD[0].old === 10080) { dAAD_Old += '1 Week' };
                            cuo += `**Hide Inactive Threads:** ${dAAD_Old}\n`;
                        };
                        // New
                        if (changeName && changeName.length !== 0) { cun += `**Name:** ${changeName[0].new}\n`; };
                        if (changeTopic && changeTopic.length !== 0) { cun += `**Topic:** ${changeTopic[0].new}\n`; };
                        if (changeType && changeType.length !== 0) { cun += `**Type:** ${chaTypeNew}\n`; };
                        if (changeNsfw && changeNsfw.length !== 0) { cun += `**Nsfw:** ${changeNsfw[0].new}\n`; };
                        if (changeRLPU && changeRLPU.length !== 0) { cun += `**Slowmode:** ${changeRLPU[0].new}s\n`; };
                        if (changeDAAD && changeDAAD.length !== 0) {
                            let dAAD_New = '';
                            if (changeDAAD[0].new === 60) { dAAD_New += '1 Hour' };
                            if (changeDAAD[0].new === 1440) { dAAD_New += '24 Hours' };
                            if (changeDAAD[0].new === 4320) { dAAD_New += '3 Days' };
                            if (changeDAAD[0].new === 10080) { dAAD_New += '1 Week' };
                            cun += `**Hide Inactive Threads:** ${dAAD_New}\n`;
                        };
                        // AddFileds
                        if (cuo && cuo.length !== 0) {
                            embedCU.addFields(
                                { name: 'Old:', value: `${cuo}`, inline: true },
                            )
                        };
                        if (cun && cun.length !== 0) {
                            embedCU.addFields(
                                { name: 'New:', value: `${cun}`, inline: true },
                            )
                        };
                        if (dataAuditLogIDCU == null) {
                            // Bot
                            if (executor.bot === true) {
                                embedCU.setFooter({text: `BotID: ${executor.id}`})
                                .setTimestamp(new Date());
                                dataAuditLogIDCU = { AuditLogID: `${id}`, GuildID: `${newChannel.guild.id}`, Type: 'Channel_Update', Date: `${channelUpdateLog.createdTimestamp}` };
                                Set.auditLogs(dataAuditLogIDCU);
                                globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embedCU]});
                            } else
                            // Member
                            if (executor.bot != true) {
                                embedCU.setFooter({text: `MemberID: ${executor.id}`})
                                .setTimestamp(new Date());
                                dataAuditLogIDCU = { AuditLogID: `${id}`, GuildID: `${newChannel.guild.id}`, Type: 'Channel_Update', Date: `${channelUpdateLog.createdTimestamp}` };
                                Set.auditLogs(dataAuditLogIDCU);
                                globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embedCU]});
                            };
                        };
                    };
                };
            };
            if (coulogs > culogs) {
                if (channelOverwriteUpdate != null) {
                    dataAuditLogIDCOU = Get.auditLogs(channelOverwriteUpdate.id);
                };
                const { targetType, actionType, action, reason, executor, changes, id, extra, target } = channelOverwriteUpdate;
                // console.log('COU');
                // console.log(changes);
                // console.log(channelOverwriteUpdate);
                // return;
                // let createdTimestampLog = channelOverwriteUpdate.createdTimestamp;
                // let dt = DateTime.now().minus({ seconds: 5 });
                // let time = dt.toMillis();
                // if (time > createdTimestampLog) {
                //     // dataAuditLogIDCOU = { AuditLogID: `${id}`, GuildID: `${newChannel.guild.id}`, Type: 'Channel_Update', Date: `${channelOverwriteUpdate.createdTimestamp}` };
                //     return;
                // };
                if (dataAuditLogIDCOU == null || id != dataAuditLogIDCOU.AuditLogID) {
                    if(targetType === 'Channel' && actionType === 'Update') {
                        let changeCOUAllow = changes.filter(function(obj) {
                            return obj.key === 'allow';
                        });
                        let changeCOUDeny = changes.filter(function(obj) {
                            return obj.key === 'deny';
                        });
                        const PermissionConvert = require('../functions/permissionConvert.js');
                        let coua = await PermissionConvert.permissionsBitField(changeCOUAllow[0].new); // Channel Update Allow
                        let coud = await PermissionConvert.permissionsBitField(changeCOUDeny[0].new); // Channel Update Deny
                        // Embed
                        let icon2 = executor.avatarURL();
                        if(executor.avatar == null) {
                            icon2 = 'attachment://discord_logo_gray.png';
                        };
                        const embedCOU = new EmbedBuilder()
                            .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                            .setColor('Blue')
                            .setDescription(`${executor} **Changed** Permissions for ${extra} in Channel ${target}`)
                        // AddFileds
                        if (coua && coua.length !== 0) {
                            embedCOU.addFields(
                                { name: 'Granted:', value: `${coua}`, inline: true },
                            )
                        };
                        if (coud && coud.length !== 0) {
                            embedCOU.addFields(
                                { name: 'Revoked:', value: `${coud}`, inline: true },
                            )
                        };
                        if (changeCOUAllow[0].new === 0 || changeCOUDeny[0].new === 0) {
                            embedCOU.addFields(
                                { name: 'Resetted to Default:', value: `.`, inline: true },
                            )
                        };
                        if (dataAuditLogIDCOU == null) {
                            // Bot
                            if (executor.bot === true) {
                                embedCOU.setFooter({text: `BotID: ${executor.id}`})
                                .setTimestamp(new Date());
                                dataAuditLogIDCOU = { AuditLogID: `${id}`, GuildID: `${newChannel.guild.id}`, Type: 'Channel_Update', Date: `${channelOverwriteUpdate.createdTimestamp}` };
                                Set.auditLogs(dataAuditLogIDCOU);
                                globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embedCOU]});
                            } else
                            // Member
                            if (executor.bot != true) {
                                embedCOU.setFooter({text: `MemberID: ${executor.id}`})
                                .setTimestamp(new Date());
                                dataAuditLogIDCOU = { AuditLogID: `${id}`, GuildID: `${newChannel.guild.id}`, Type: 'Channel_Update', Date: `${channelOverwriteUpdate.createdTimestamp}` };
                                Set.auditLogs(dataAuditLogIDCOU);
                                globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embedCOU]});
                            };
                        };
                    };
                };
            };
            let dataAuditLogDate;
            dataAuditLogDate = Get.allAuditLogs('Channel_Update');
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