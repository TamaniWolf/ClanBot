
const { EmbedBuilder, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'applicationCommandPermissionsUpdate',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(data) {
        // SQLite
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        // ACPU
        let guild = await globalclient.guilds.fetch(data.guildId);
        const fetchedLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.ApplicationCommandPermissionUpdate,
        });
        const requestLog = fetchedLogs.entries.first();
        // Data null
        let dataLogs;
        let dataChannellog;
        // Data Get
        let getBotConfigID = `${guild.id}-${guild.shardId}`;
        dataLogs = Get.logsForMisc(getBotConfigID);
        dataChannellog = Get.channelForLog(getBotConfigID);
        // Data Check
        if (dataLogs == null) {return};
        if (!dataChannellog || dataChannellog.ChannelID === '100000000000000000') {
            console.log('No logging Channel in database');
            return;
        };
        // Context
        if (dataLogs.ApplicationCommandPermissionUpdate === 'true') {
            let channel = await guild.channels.fetch(dataChannellog.ChannelID);

            const logembed = new EmbedBuilder()
                .setColor('Blue')
                .setTimestamp(new Date());

            const { executor, changes, target } = requestLog;

            let oldChange = changes.find((c) => c.old != undefined);
            let newChange = changes.find((c) => c.new != undefined);
            // Message
            let iconmember = executor.avatarURL();
            if(executor.avatar == null) {
                iconmember = 'attachment://discord_logo_gray.png';
            };
            if (oldChange == null) {
                logembed.setAuthor({name: `${executor.tag}`, iconURL: `${iconmember}`})
                    .setColor('Green')
                    .setDescription(`Command </${target.id}> got **Added**`)
                    .setFooter({text: `MemberID: ${executor.id}`})
                    .setTimestamp(new Date());
                channel.send({ embeds: [logembed] });
            } else if (oldChange != null) {
                logembed.setAuthor({name: `${executor.tag}`, iconURL: `${iconmember}`})
                    .setColor('Green')
                    .setDescription(`Command </${target.id}> got **Updated**`)
                    .setFooter({text: `MemberID: ${executor.id}`})
                    .setTimestamp(new Date());
                channel.send({ embeds: [logembed] });
            } else if (newChange == null) {
                return;
            };
        };
    },
};