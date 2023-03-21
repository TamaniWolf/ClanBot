
const { EmbedBuilder, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'guildMemberAdd',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(member) {
        // SQLite
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        // BotAdd
        const fetchedBotAddLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.BotAdd,
        });
        const botAddLog = fetchedBotAddLogs.entries.first();

        // Context
        let dataChannellog;
        let getBotConfigID = `${member.guild.id}-${member.guild.shardId}`;
        dataChannellog = Get.channelForLog(getBotConfigID);
        if (!dataChannellog || dataChannellog.ChannelID === '100000000000000000') {
            console.log('No logging Channel in database');
            return;
        };
        let dataLogs;
        dataLogs = Get.logsForMember(getBotConfigID);
        if (dataLogs == null) {return};
        if (dataLogs.Adding === 'true') {
            let guild = await globalclient.guilds.fetch(member.guild.id);
            let channel = await guild.channels.fetch(dataChannellog.ChannelID);

            const logembed = new EmbedBuilder()
                .setColor('Green')
                .setTimestamp(new Date());
            
            const { targetType, actionType, action, reason, executor, changes, id, extra, target } = botAddLog;
            // Bot
            if (target.id === member.id) {
                let iconbot = executor.avatarURL();
                if(executor.avatar == null) {
                    iconbot = 'attachment://discord_logo_gray.png';
                };
                logembed.setAuthor({name: `${executor.tag}`, iconURL: `${iconbot}`})
                    .setDescription(`Bot ${target} was **Added** to the server by ${executor}`)
                    .setFooter({text: `BotID: ${executor.id}`})
                channel.send({ embeds: [logembed] });
            };
            // Member
            if (target.id !== member.id) {
                let iconmember = member.user.avatarURL();
                if(member.user.avatar == null) {
                    iconmember = 'attachment://discord_logo_gray.png';
                };
                logembed.setAuthor({name: `${member.user.username}${member.user.discriminator}`, iconURL: `${iconmember}`})
                    .setDescription(`User <@${member.user.id}> **Joined** the server`)
                    .setFooter({text: `MemberID: ${member.user.id}`})
                channel.send({ embeds: [logembed] });
            };
        };
    },
};