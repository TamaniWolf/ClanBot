
const { EmbedBuilder, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'roleDelete',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(role) {
        const { DateTime } = require('luxon');
        // SQLite
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        // AuditLog Fetch
        if (role.tags.botId === globalclient.user.id) return;
        const fetchedLogs = await role.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.RoleDelete,
        });
        const roleLog = fetchedLogs.entries.first();
        // Data Null
        let dataChannellog;
        let dataAuditLogID;
        // Data Get
        let getBotConfigID = `${role.guild.id}-${role.guild.shardId}`;
        dataChannellog = Get.channelForLog(getBotConfigID);
        // Data Check
        if (dataChannellog == null) {
            console.log('No logging Channel in database')
            return;
        };
        if (roleLog == null) {return;};
        dataAuditLogID = Get.auditLogs(roleLog.id);
        // Context
        let dataLogs;
        dataLogs = Get.logsForChannel(getBotConfigID);
        if (dataLogs == null) {return;};
        if (dataLogs.Deleting === 'true') {
            const { targetType, actionType, executor, changes, id } = roleLog;
            if(dataAuditLogID == null) {
                if(targetType === 'Role' && actionType === 'Delete') {
                    var key = changes.filter(function(obj) {
                        return obj.key === 'name';
                    });
                    let icon2 = executor.avatarURL();
                    if(executor.avatar == null) {
                        icon2 = 'attachment://discord_logo_gray.png';
                    };
                    const roleChanges = new EmbedBuilder()
                        .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                        .setColor('Yellow')
                        .setDescription(`${executor} **Deleted** Role \`${key[0].old}\``)
                        .setFooter({text: `MemberID: ${executor.id}`})
                        .setTimestamp(new Date());
                        dataAuditLogID = { AuditLogID: `${id}`, GuildID: `${role.guild.id}`, Type: `Role_Delete`, Date: `${roleLog.createdTimestamp}` };
                        Set.auditLogs(dataAuditLogID);
                        globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [roleChanges]});
                };
            };
            let dataAuditLogDate;
            dataAuditLogDate = Get.allAuditLogs('Role_Delete');
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