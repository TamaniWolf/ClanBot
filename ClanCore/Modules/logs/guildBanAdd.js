
const { EmbedBuilder, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'guildBanAdd',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(ban) {
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        const fetchedLogs = await ban.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberBanAdd,
        });
        const log = fetchedLogs.entries.first();
        let dataChannellog;
        let getBotConfigID = `${ban.guild.id}-${ban.guild.shardId}`;
        dataChannellog = Get.channelForLog(getBotConfigID);
        if (!dataChannellog) {
            console.log('No logging Channel in database')
            return;
        };
        if (dataChannellog.ChannelID === '100000000000000000') {
            return;
        };
        const { reason, executor, target } = log;
        let dataLogs;
        dataLogs = Get.logsForBan(getBotConfigID);
        if (dataLogs == null) {return};
        if (dataLogs.Adding === 'true') {
            let icon2 = executor.avatarURL();
            if(executor.avatar == null) {
                icon2 = 'attachment://discord_logo_gray.png';
            };
            
            const embedBanAdd = new EmbedBuilder()
                .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                .setColor('Red')
                .setDescription(`**${target} got banned by ${executor}**`)
                .setFooter({text: `MemberID: ${target.id}`})
                .setTimestamp(new Date())
            if (target.id === ban.user.id && reason != null) {
                embedBanAdd.addFields(
                    { name: '**Reason:**', value: `${reason}` },
                )
            };
            if (target.id === ban.user.id) {
                globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embedBanAdd]});
            };
        };
    },
};