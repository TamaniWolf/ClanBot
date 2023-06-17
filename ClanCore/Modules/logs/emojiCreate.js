
const { EmbedBuilder, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'emojiCreate',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(emoji) {
        // SQLite
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        let guild = await globalclient.guilds.fetch(emoji.guild.id);
        const fetchedLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.EmojiCreate,
        });
        const log = fetchedLogs.entries.first();
        // Data Null
        let dataLogs;
        let dataChannellog;
        // Data Get
        let getBotConfigID = `${guild.id}-${guild.shardId}`;
        dataLogs = Get.logsForChannel(getBotConfigID);
        dataChannellog = Get.channelForLog(getBotConfigID);
        // Data Check
        if (dataLogs == null) {return};
        if (!dataChannellog) {
            console.log('No logging Channel in database')
            return;
        };
        if (dataChannellog.ChannelID === '100000000000000000') {
            return;
        };
        // Context
        if (dataLogs.Creating === 'true') {
            if (log == null) {
                // console.log('EmojiCreate');
                // console.log(emoji);
                return;
            };
            const { actionType, executor, target } = log;
            let icon2 = executor.avatarURL();
            if(executor.avatar == null) {
                icon2 = 'attachment://discord_logo_gray.png';
            };
            if(actionType === 'Create') {
                let emoji = await guild.emojis.fetch(target.id);
                const channelName = new EmbedBuilder()
                    .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                    .setColor('Blue')
                    .setDescription(`${executor} **Added** Emoji ${emoji} to the server`)
                    .setFooter({text: `MemberID: ${executor.id}`})
                    .setTimestamp(new Date());
                    globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [channelName]});
            };
        };
    },
};