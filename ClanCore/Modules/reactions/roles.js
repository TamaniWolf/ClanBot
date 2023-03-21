
const { EmbedBuilder, AuditLogEvent, Events } = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'messageReactionAdd',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(messageReaction, user) {
        console.log('mra');
        // console.log(messageReaction);
        // console.log(user);
        // SQLite
        const { Get, Set, Del } = require('../functions/sqlite/prepare');
        // Reaction Partial
        if (messageReaction == null || messageReaction.message == null || messageReaction.message.guildId == null) { return; };
        if (user == null || user.username == null) { return; };
        if (messageReaction.partial) {
            try {
                await messageReaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            };
        };
        // Data Null
        let dataConfig;
        let dataChannelReaction;
        let dataReaction;
        // Data Get
        let getGuildID = messageReaction.message.guildId;
        // let getBotConfigID = `${getGuildID}-${messageReaction.message}`;
        let getChannelID = messageReaction.message.channelId;
        let getChannelReactionID = `${getGuildID}-${getChannelID}`;
        dataConfig = globalclient.getConfig.get(getGuildID);
        dataChannelReaction = globalclient.getChannelReaction.get(getChannelReactionID);
        // Data Check
        if (dataChannelReaction == null) {
            return;
        };
        if (dataConfig == null) {
            dataConfig = { LangFile: './Database/lang/en_US.json'};
        };
        // Context
        if (dataChannelReaction.ChannelID === getChannelID) {
            //
        };
    },
};

module.exports = {
    name: 'messageReactionRemove',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(messageReaction, user) {
        console.log('mrr');
        // console.log(messageReaction);
        // console.log(user);
        // SQLite
        const SQLite = require("better-sqlite3");
        const sql_Config = new SQLite('./Database/sqlite/config/config.sqlite');
        const sql_ChannelRole = new SQLite('./Database/sqlite/channelrole/channelRole.sqlite');
        const sql_Reaction = new SQLite('./Database/sqlite/reaction/reaction.sqlite');
        // Get
        globalclient.getConfig = sql_Config.prepare("SELECT * FROM config WHERE ConfigID = ?");
        globalclient.getChannelReaction = sql_ChannelRole.prepare("SELECT * FROM channel_reaction WHERE ChannelRoleID = ?");
        globalclient.getReaction = sql_Reaction.prepare("SELECT * FROM reaction WHERE ReactionID = ?");
        globalclient.setReaction = sql_Reaction.prepare("INSERT OR REPLACE INTO reaction (ReactionID, MessageID, ChannelID, RoleID, Type, Emoji, Action, Name) VALUES (@ReactionID, @MessageID, @ChannelID, @RoleID, @Type, @Emoji, @Action, @Name);");
        globalclient.delReaction = sql_Reaction.prepare("DELETE FROM reaction WHERE ReactionID = ?");
        // Reaction Partial
        if (messageReaction == null || messageReaction.message == null || messageReaction.message.guildId == null) { return; };
        if (user == null || user.username == null) { return; };
        if (messageReaction.partial) {
            try {
                await messageReaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            };
        };
        // Data Null
        let dataConfig;
        let dataChannelReaction;
        let dataReaction;
        // Data Get
        let getGuildID = messageReaction.message.guildId;
        let getChannelID = messageReaction.message.channelId;
        let getChannelReactionID = `${getGuildID}-${getChannelID}`;
        dataConfig = globalclient.getConfig.get(getGuildID);
        dataChannelReaction = globalclient.getChannelReaction.get(getChannelReactionID);
        // Data Check
        if (dataChannelReaction == null) {
            return;
        };
        if (dataConfig == null) {
            dataConfig = { LangFile: './Database/lang/en_US.json'};
        };
        // Context
        if (dataChannelReaction.ChannelID === getChannelID) {
            //
        };
    },
};
    
    // globalclient.on('messageReactionAdd', async (reaction, user) => { 
    //     if(user.bot) return;
    //     if (reaction.partial) {
    //         try {
    //             await reaction.fetch();
    //         } catch (error) {
    //             console.error('Something went wrong when fetching the message:', error);
    //             return;
    //         };
    //     };
    //     let getChannelReactionId = `${reaction.message.guildId}-${reaction.message.channelId}`;
    //     let dataChannelReaction;
    //     dataChannelReaction = globalclient.getChannelReaction.get(getChannelReactionId);
    //     if (dataChannelReaction == null) {
    //         return;
    //     };
    //     if (dataChannelReaction.ChannelID === reaction.message.channelId) {
    //         let react;
    //         react = globalclient.getReactionSFW.get(`${reaction.message.guildId}-${reaction.message.id}-${reaction.emoji.name}`);

    //         if (!react) {
    //             return;
    //         };

    //         if (react.Action === 'ADD-ROLE') {
    //             let eUserID = user.id;
    //             let member = await getMember(eUserID);
    //             let rId = react.Role;
    //             member.roles.add(rId);
    //         };
            
    //         async function getMember(eUserID) {
    //             return new Promise(async (resolve) => {
    //                 var member = {};
    //                 await globalclient.guilds.cache.get(reaction.message.guildId).members.fetch();
    //                 member = globalclient.guilds.cache.get(reaction.message.guildId).members.cache.get(eUserID);
    //                 if (!member) {
    //                     return;
    //                 };
    //                 return resolve(member);
    //             });
    //         };
    //     };
    // });
    
    // globalclient.on('messageReactionRemove', async (reaction, user) => {
    //     let getChannelReactionId = `${reaction.message.guildId}-${reaction.message.channelId}`;
    //     let dataChannelReaction;
    //     dataChannelReaction = globalclient.getChannelReaction.get(getChannelReactionId);
    //     if (dataChannelReaction == null) {
    //         return;
    //     };
    //     if (dataChannelReaction.ChannelID === reaction.message.channelId) {
    //         let react;
    //         react = globalclient.getReactionSFW.get(`${reaction.message.guildId}-${reaction.message.id}-${reaction.emoji.name}`);

    //         if (!react) {
    //             return;
    //         };

    //         if (react.Action === 'ADD-ROLE') {
    //             let eUserID = user.id;
    //             let member = await getMember(eUserID);
    //             let rId = react.Role;
    //             member.roles.remove(rId);
    //         };
            
    //         async function getMember(eUserID) {
    //             return new Promise(async (resolve) => {
    //                 var member = {};
    //                 await globalclient.guilds.cache.get(reaction.message.guildId).members.fetch();
    //                 member = globalclient.guilds.cache.get(reaction.message.guildId).members.cache.get(eUserID);
    //                 if (!member) {
    //                     return;
    //                 };
    //                 return resolve(member);
    //             });
    //         };
    //     };
    // });