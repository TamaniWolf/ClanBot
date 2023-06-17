
const { EmbedBuilder, PermissionsBitField, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'roleCreate',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(role) {
        const { DateTime } = require('luxon');
        // const PermissionConvert = require('../functions/permissionConvert.js');
        // SQLite
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        // AuditLog Fetch
        const fetchedLogs = await role.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.RoleCreate,
        });
        const roleLog = fetchedLogs.entries.first();
        // Data Null
        let dataChannellog;
        let dataAuditLogID;
        // Data Get
        let getBotConfigID = `${role.guild.id}-${role.guild.shardId}`;
        dataChannellog = Get.channelForLog(getBotConfigID);
        // Data check
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
        if (dataLogs.Creating === 'true') {
            const { targetType, actionType, executor, id, target } = roleLog;
            if(dataAuditLogID == null) {
                if(targetType === 'Role' && actionType === 'Create') {
                    let icon2 = executor.avatarURL();
                    if(executor.avatar == null) {
                        icon2 = 'attachment://discord_logo_gray.png';
                    };
                    // const bitPermissions = new PermissionsBitField(roleLog.target.permissions.bitfield);
                    // const permissionsNames = await PermissionConvert.permissionsBitField(bitPermissions);
                    // Embed
                    const roleChanges = new EmbedBuilder()
                        .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                        .setColor('Yellow')
                        .setDescription(`${executor} **Created** the Role ${target}`)
                    // if (permissionsNames != null || permissionsNames != '') {
                    //     console.log('rc-5');
                    //     roleChanges.addFields(
                    //         { name: `ID`, value: `${target.id}`, inline: true },
                    //         { name: `Color`, value: `${target.color}`, inline: true },
                    //         // { name: `Others`, value: `${othersArray.list}`, inline: true },
                    //         { name: `Permissions`, value: `${permissionsNames}` },
                    //     );
                    // };
                    roleChanges.setFooter({text: `MemberID: ${executor.id}`})
                        .setTimestamp(new Date());
                        dataAuditLogID = { AuditLogID: `${id}`, GuildID: `${role.guild.id}`, Type: `Role_Create`, Date: `${roleLog.createdTimestamp}` };
                        Set.auditLogs(dataAuditLogID);
                        globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [roleChanges]});
                };
            };
            let dataAuditLogDate;
            dataAuditLogDate = Get.allAuditLogs('Role_Create');
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