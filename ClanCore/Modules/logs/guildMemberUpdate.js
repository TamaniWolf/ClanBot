
const { EmbedBuilder, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'guildMemberUpdate',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(oldMember, newMember) {
        // SQLite
        const { DateTime } = require('luxon');
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        // Member Update
        if (newMember.user.id === globalclient.user.id && typeof newMember._roles == 'undefined' || newMember.user.id === globalclient.user.id && newMember._roles.length <= 0) return;
        const memberUpdateFetchedLogs = await newMember.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberUpdate,
        });
        const memberUpdateLog = memberUpdateFetchedLogs.entries.first();
        const memberRoleUpdateFetchedLogs = await newMember.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberRoleUpdate,
        });
        const memberRoleUpdateLog = memberRoleUpdateFetchedLogs.entries.first();
        // console.log(memberUpdateLog);
        // Data Null
        let dataChannellog;
        let dataAuditLogID;
        // Data Get
        let getBotConfigID = `${newMember.guild.id}-${newMember.guild.shardId}`;
        dataChannellog = Get.channelForLog(getBotConfigID);

        // Data Check
        if (dataChannellog == null) {
            console.log('No logging Channel in database')
            return;
        };
        let dataLogs;
        dataLogs = Get.logsForMember(getBotConfigID);
        if (dataLogs == null) {return};
        if (dataLogs.Updating === 'true') {
            if (memberUpdateLog && memberRoleUpdateLog == null || memberUpdateLog && memberRoleUpdateLog) {
                if (memberUpdateLog.createdTimestamp > memberRoleUpdateLog.createdTimestamp) {
                    if (memberUpdateLog != null) {
                        dataAuditLogID = Get.auditLogs(memberUpdateLog.id);
                    };
                    const { targetType, actionType, action, reason, executor, changes, id, extra, target } = memberUpdateLog;
                    let createdTimestampLog = memberUpdateLog.createdTimestamp;
                    let dt = DateTime.now().minus({ seconds: 5 });
                    let time = dt.toMillis();
                    if (dataAuditLogID != null && dataAuditLogID.AuditLogID === id) {
                        return;
                    } else if (time > createdTimestampLog) {
                        dataAuditLogID = { AuditLogID: `${id}`, GuildID: `${newMember.guild.id}`, Type: 'Member_Update', Date: `${memberUpdateLog.createdTimestamp}` };
                        Set.auditLogs(dataAuditLogID);
                    } else {
                        dataAuditLogID = { AuditLogID: `${id}`, GuildID: `${newMember.guild.id}`, Type: 'Member_Update', Date: `${memberUpdateLog.createdTimestamp}` };
                        Set.auditLogs(dataAuditLogID);
                    };
                    if(targetType === 'User' && actionType === 'Update') {
                        var arrayOfKey = changes.map(function(obj) {
                            return obj.key;
                        });
                        var arrayOfOld = changes.map(function(obj) {
                            return obj.old;
                        });
                        var arrayOfNew = changes.map(function(obj) {
                            return obj.new;
                        });
                        let stringKey = arrayOfKey.toString()
                        let stringOld = arrayOfOld.toString()
                        let stringNew = arrayOfNew.toString()
                        let icon2 = executor.avatarURL();
                        if(executor.avatar == null) {
                            icon2 = 'attachment://discord_logo_gray.png';
                        };
                        const embedsMemberUpdate = new EmbedBuilder()
                        if(stringKey === 'nick') {
                            if(executor.id === target.id) {
                                embedsMemberUpdate.setColor('Blue')
                                if(stringOld === '') {
                                    embedsMemberUpdate.setDescription(`${executor} added they Nickname \`${stringNew}\``)
                                } else if(stringNew === '') {
                                    embedsMemberUpdate.setDescription(`${executor} removed they Nickname \`${stringOld}\``)
                                } else {
                                    embedsMemberUpdate.setDescription(`${executor} changed they Nickname \`${stringOld}\` to \`${stringNew}\``)
                                };
                            } else {
                                embedsMemberUpdate.setColor('Yellow')
                                if(stringOld === '') {
                                    embedsMemberUpdate.setDescription(`${executor} added the Nickname \`${stringNew}\` to ${target}`)
                                } else if(stringNew === '') {
                                    embedsMemberUpdate.setDescription(`${executor} removed the Nickname \`${stringOld}\` from ${target}`)
                                } else {
                                    embedsMemberUpdate.setDescription(`${executor} changed the Nickname of ${target} from \`${stringOld}\` to \`${stringNew}\``)
                                };
                            };
                            embedsMemberUpdate.setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                                .setFooter({text: `MemberID: ${target.id}`})
                                .setTimestamp(new Date());
                            globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embedsMemberUpdate]});
                        };
                    };
                };
            };
            if (memberRoleUpdateLog && memberUpdateLog == null || memberRoleUpdateLog && memberUpdateLog) {
                if (memberRoleUpdateLog.createdTimestamp > memberUpdateLog.createdTimestamp) {
                    if (memberRoleUpdateLog != null) {
                        dataAuditLogID = Get.auditLogs(memberRoleUpdateLog.id);
                    };
                    const { targetType, actionType, action, reason, executor, changes, id, extra, target } = memberRoleUpdateLog;
                    let createdTimestampLog = memberRoleUpdateLog.createdTimestamp;
                    let dt = DateTime.now().minus({ seconds: 5 });
                    let time = dt.toMillis();
                    if (dataAuditLogID != null && dataAuditLogID.AuditLogID === id) {
                        return;
                    } else if (time > createdTimestampLog) {
                        dataAuditLogID = { AuditLogID: `${id}`, GuildID: `${newMember.guild.id}`, Type: 'Member_Update', Date: `${memberRoleUpdateLog.createdTimestamp}` };
                        Set.auditLogs(dataAuditLogID);
                    } else {
                        dataAuditLogID = { AuditLogID: `${id}`, GuildID: `${newMember.guild.id}`, Type: 'Member_Update', Date: `${memberRoleUpdateLog.createdTimestamp}` };
                        Set.auditLogs(dataAuditLogID);
                    };
                    if(targetType === 'User' && actionType === 'Update') {
                        var arrayOfKey = changes.map(function(obj) {
                            return obj.key;
                        });
                        var arrayOfOld = changes.map(function(obj) {
                            return obj.old;
                        });
                        var arrayOfNew = changes.map(function(obj) {
                            return obj.new;
                        });
                        var arrayOfNewName = changes.map(function(obj) {
                            return obj.new.map(function(obj) {
                                return obj.name;
                            });
                        });
                        let stringKey = arrayOfKey.toString()
                        let stringNewName = arrayOfNewName.toString()
                        let name2 = executor.tag;
                        let icon2 = executor.avatarURL();
                        if(executor.avatar == null) {
                            icon2 = 'attachment://discord_logo_gray.png';
                        };
                        const embedsMemberUpdate = new EmbedBuilder()
                        if (stringKey === '$add') {
                            embedsMemberUpdate.setColor('Yellow')
                            if (executor.id === target.id) {
                                name2 = target.tag;
                                icon2 = target.avatarURL();
                                if(target.avatar == null) {
                                    icon2 = 'attachment://discord_logo_gray.png';
                                };
                                embedsMemberUpdate.setDescription(`${target} was given the \`${stringNewName}\` role by them self.`)
                            } else {
                                embedsMemberUpdate.setDescription(`${target} was given the \`${stringNewName}\` role by ${executor}.`)
                            }
                            embedsMemberUpdate.setAuthor({name: `${name2}`, iconURL: `${icon2}`})
                                .setFooter({text: `MemberID: ${target.id}`})
                                .setTimestamp(new Date());
                            globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embedsMemberUpdate]});
                        };
                        if (stringKey === '$remove') {
                            embedsMemberUpdate.setColor('Yellow')
                            if (executor.id === target.id) {
                                name2 = target.tag;
                                icon2 = target.avatarURL();
                                if(target.avatar == null) {
                                    icon2 = 'attachment://discord_logo_gray.png';
                                };
                                embedsMemberUpdate.setDescription(`${target} removed them self from the \`${stringNewName}\` role.`)
                            } else {
                                embedsMemberUpdate.setDescription(`${executor} removed ${target} from the \`${stringNewName}\` role.`)
                            }
                            embedsMemberUpdate.setAuthor({name: `${name2}`, iconURL: `${icon2}`})
                                .setFooter({text: `MemberID: ${target.id}`})
                                .setTimestamp(new Date());
                            globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embedsMemberUpdate]});
                        };
                    };
                };
            };
            let dataAuditLogDate;
            dataAuditLogDate = Get.allAuditLogs('Member_Update');
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