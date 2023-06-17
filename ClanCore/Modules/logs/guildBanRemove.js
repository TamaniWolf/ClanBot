
const { EmbedBuilder, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'guildBanRemove',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(ban) {
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        const fetchedLogs = await ban.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberBanRemove,
        });
        const banLog = fetchedLogs.entries.first();
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
        const { reason, executor, target } = banLog;
        let dataLogs;
        dataLogs = Get.logsForBan(getBotConfigID);
        if (dataLogs == null) {return};
        if (dataLogs.Removing === 'true') {
            let icon2 = executor.avatarURL();
            if(executor.avatar == null) {
                icon2 = 'attachment://discord_logo_gray.png';
            };
            
            const embedBanRemove = new EmbedBuilder()
                .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                .setColor('DarkGreen')
                .setDescription(`${target} got **Unbanned** by ${executor}`)
                .setFooter({text: `MemberID: ${target.id}`})
                .setTimestamp(new Date());
            if (target.id === ban.user.id && reason != null) {
                embedBanRemove.addFields(
                    { name: '**Reason:**', value: `${reason}` },
                )
            };
            if (target.id === ban.user.id) {
                globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embedBanRemove]});
            };
        };
    },
};