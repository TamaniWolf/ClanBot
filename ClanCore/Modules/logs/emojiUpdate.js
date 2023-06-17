
const { EmbedBuilder, AuditLogEvent } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'emojiUpdate',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(oldEmoji, newEmoji) {
        // SQLite
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        let guild = await globalclient.guilds.fetch(newEmoji.guild.id);
        const fetchedLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.EmojiUpdate,
        });
        const log = fetchedLogs.entries.first();
        // Data Null
        let dataLogs;
        let dataChannellog;
        // Data Get
        let getBotConfigID = `${newEmoji.guild.id}-${newEmoji.guild.shardId}`;
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
        if (dataLogs.Updating === 'true') {
            if (log == null) {
                // console.log('EmojiUpdate');
                // console.log(oldEmoji);
                // console.log(newEmoji);
                return;
            };
            const { actionType, executor, target } = log;
            let icon2 = executor.avatarURL();
            if(executor.avatar == null) {
                icon2 = 'attachment://discord_logo_gray.png';
            };
            if(actionType === 'Update') {
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