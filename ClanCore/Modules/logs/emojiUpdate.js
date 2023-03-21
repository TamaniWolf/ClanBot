
const { EmbedBuilder, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'emojiUpdate',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(oldEmoji, newEmoji) {
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        let guild = await globalclient.guilds.fetch(newEmoji.guild.id);
        const fetchedLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.EmojiUpdate,
        });
        const log = fetchedLogs.entries.first();
        let dataChannellog;
        let getBotConfigID = `${newEmoji.guild.id}-${newEmoji.guild.shardId}`;
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
        if (dataLogs.Updating === 'true') {
            const { targetType, actionType, action, reason, executor, changes, id, extra, target } = log;
            let icon2 = executor.avatarURL();
            if(executor.avatar == null) {
                icon2 = 'attachment://discord_logo_gray.png';
            };
            if(actionType === 'Create') {
                let emoji = await guild.emojis.fetch(target.id);
                if (target.animated === false) {
                    const channelName = new EmbedBuilder()
                        .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                        .setColor('Blue')
                        .setDescription(`${executor} **Updated** the Name of Emoji ${emoji}\nFrom \`:${oldEmoji.name}:\` to \`:${newEmoji.name}:\``)
                        .setFooter({text: `MemberID: ${executor.id}`})
                        .setTimestamp(new Date());
                        globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [channelName]});
                };
                if (target.animated === true) {
                    const channelName = new EmbedBuilder()
                        .setAuthor({name: `${executor.tag}`, iconURL: `${icon2}`})
                        .setColor('Blue')
                        .setDescription(`${executor} **Updated** the Name of Animated Emoji ${emoji}\nFrom \`:${oldEmoji.name}:\` to \`:${newEmoji.name}:\``)
                        .setFooter({text: `MemberID: ${executor.id}`})
                        .setTimestamp(new Date());
                        globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [channelName]});
                };
            };
        };
    },
};