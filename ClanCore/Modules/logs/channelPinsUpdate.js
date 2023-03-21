
const { EmbedBuilder, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'channelPinsUpdate',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(channel, time) {
        // SQLite
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        // MessagePin
        const pinLogs = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MessagePin,
        });
        const firstEntriePin = pinLogs.entries.first();
        // MessageUnpin
        const unpinLogs = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MessageUnpin,
        });
        const firstEntrieUnpin = unpinLogs.entries.first();
        // Data Null
        let dataLogs;
        let dataChannellog;
        // Data Get
        let getBotConfigID = `${channel.guild.id}-${channel.guild.shardId}`;
        dataLogs = Get.logsForChannel(getBotConfigID);
        dataChannellog = Get.channelForLog(getBotConfigID);
        // Data Check
        if (dataLogs == null) {return};
        if (!dataChannellog || dataChannellog.ChannelID === '100000000000000000') {
            console.log('No logging Channel in database');
            return;
        };
        // Context
        if (dataLogs.Pins_Update === 'true') {
            let guild = await globalclient.guilds.fetch(channel.guild.id);
            let logChannel = await guild.channels.fetch(dataChannellog.ChannelID);

            const logembed = new EmbedBuilder()
                .setColor('Blue')
                .setTimestamp(new Date());
            
            let cpup;
            let cpuup;
            if (firstEntriePin != null) {cpup = 0;} else {cpup = firstEntriePin;};
            if (firstEntrieUnpin != null) {cpuup = 0;} else {cpuup = firstEntrieUnpin;};

            if (firstEntriePin.createdTimestamp > firstEntrieUnpin.createdTimestamp) {
                // const { targetType, actionType, action, reason, executor, changes, id, extra, target } = firstEntriePin;
                const { executor, extra, target } = firstEntriePin;
                let iconPin = executor.avatarURL();
                if(executor.avatar == null) {
                    iconPin = 'attachment://discord_logo_gray.png';
                };
                logembed.setAuthor({name: `${executor.tag}`, iconURL: `${iconPin}`})
                    .setDescription(`${executor} **Pinned** a [Message](https://discord.com/channels/${channel.guild.id}/${extra.channel.id}/${extra.messageId}) by ${target}`)
                    .setFooter({text: `MemberID: ${executor.id}`});
                    logChannel.send({ embeds: [logembed] });
            };
            if (firstEntriePin.createdTimestamp < firstEntrieUnpin.createdTimestamp) {
                const { executor, extra, target } = firstEntrieUnpin;
                let iconUnpin = executor.avatarURL();
                if(executor.avatar === undefined) {
                    iconUnpin = 'attachment://discord_logo_gray.png';
                };
                if(executor.avatar === null) {
                    iconUnpin = 'attachment://discord_logo_gray.png';
                };
                logembed.setAuthor({name: `${executor.tag}`, iconURL: `${iconUnpin}`})
                    .setDescription(`${executor} **Unpinned** a [Message](https://discord.com/channels/${channel.guild.id}/${extra.channel.id}/${extra.messageId}) by ${target}`)
                    .setFooter({text: `MemberID: ${executor.id}`});
                    logChannel.send({ embeds: [logembed] });
            };
        };
    },
};