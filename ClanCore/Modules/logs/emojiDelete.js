
const { EmbedBuilder, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'emojiDelete',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(emoji) {
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        let guild = await globalclient.guilds.fetch(emoji.guild.id);
        const fetchedLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.EmojiDelete,
        });
        const log = fetchedLogs.entries.first();
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
        if (dataLogs.Deleting === 'true') {
            const { targetType, actionType, action, reason, executor, changes, id, extra, target } = log;
            let icon2 = executor.avatarURL();
            if(executor.avatar == null) {
                icon2 = 'attachment://discord_logo_gray.png';
            };
            if(actionType === 'Create') {
                const channelName = new EmbedBuilder()
                    .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                    .setColor('Blue')
                    .setDescription(`${executor} **Deleted** Emoji \`:${target.name}:\` from the server`)
                    .setFooter({text: `MemberID: ${executor.id}`})
                    .setTimestamp(new Date());
                    globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [channelName]});
            };
        };
    },
};