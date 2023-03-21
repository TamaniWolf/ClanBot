
const Discord = require('discord.js');
const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = Discord;
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();
module.exports = {
    data: new SlashCommandBuilder()
        .setName('channels')
        .setDescription('Setting/Removing Channels from Database.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(
            PermissionsBitField.Flags.ViewAuditLog
            | PermissionsBitField.Flags.KickMembers
            | PermissionsBitField.Flags.ManageChannels
            | PermissionsBitField.Flags.ManageEmojisAndStickers
            | PermissionsBitField.Flags.ManageGuild
            | PermissionsBitField.Flags.ManageMessages
            | PermissionsBitField.Flags.ManageRoles
            | PermissionsBitField.Flags.ModerateMembers
            | PermissionsBitField.Flags.ManageThreads
            | PermissionsBitField.Flags.ManageWebhooks
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('A Help text.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('List set Channels.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Set a Channel.')
                .addStringOption(option =>
                    option
                        .setName('setoptions')
                        .setDescription('Set Options.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Admin', value: 'admin' },
                            { name: 'Log', value: 'log' },
                            { name: 'Birthday', value: 'birthdaycmd' },
                            { name: 'Birthday Announcement', value: 'birthday' },
                            // { name: 'Nsfw', value: 'nsfw' },
                            { name: 'Reaction', value: 'reaction' },
                            { name: 'User', value: 'user' },
                        )
                )
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('The Channel')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a Channel.')
                .addStringOption(option =>
                    option
                        .setName('removeoptions')
                        .setDescription('Remove Options.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Admin', value: 'admin' },
                            { name: 'Log', value: 'log' },
                            { name: 'Birthday', value: 'birthdaycmd' },
                            { name: 'Birthday Announcement', value: 'birthday' },
                            // { name: 'Nsfw', value: 'nsfw' },
                            { name: 'Reaction', value: 'reaction' },
                            { name: 'User', value: 'user' },
                        )
                )
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('The Channel')
                        .setRequired(true)
                )
        ),
    prefix: 'true',    // Prefix = 'true', No Prefix = 'false', Slash Command = '/'.
    nsfw: 'false',       // NSFW variable = 'true', No NSFW variable = 'false'.
    admin: 'true',      // Admin Command = 'true', No Admin Command = 'false'.
    guildOnly: true,
    async execute(interaction) {
        if (interaction != null || interaction.channel.id != null || interaction.guild.id != null) {
            // SQLite
            const { Get, Set, Del } = require('../../../../ClanCore/Modules/functions/sqlite/prepare');
            // Data Null
            let dataLang;
            let dataCommandAdmin;
            let dataChannelAdmin;
            let dataChannelAdminGuild;
            // Data Get
            let getGuildID = `${interaction.guild.id}`;
            let getBotConfigID = `${interaction.guild.id}-${interaction.guild.shardId}`;
            let getClientID = `${interaction.client.user.id}`;
            let getShardID = `${interaction.guild.shard.id}`;
            let getChannelID = `${interaction.channel.id}`;
            let getChannelRoleID = `${getGuildID}-${getShardID}-${getChannelID}`;
            dataLang = Get.botConfig(getBotConfigID);
            dataCommandAdmin = Get.onOffForCommandAdmin(getBotConfigID);
            dataChannelAdmin = Get.channelForAdmin(getChannelRoleID);
            dataChannelAdminGuild = Get.channelForAdminByGuild(getGuildID);
            // Data Check
            if (dataLang == null) { dataLang = { Lang: `./Database/lang/en_US.json` }; };
            if (dataCommandAdmin == null) { dataCommandAdmin = { Channels: 'true' }; };
            if (dataChannelAdminGuild == null) { dataChannelAdmin = { ChannelID: `${getChannelID}` }; };
            // Context
            if (dataCommandAdmin.Channels === 'true') {
                let lang = require('../../../.' + dataLang.Lang);
                let permissions = interaction.member.permissions;
                if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                    if (dataChannelAdmin != null && getChannelID === dataChannelAdmin.ChannelID) {
                        const configembed = new EmbedBuilder()
                        .setColor('DarkGreen')
                        .setTitle('Set/Remove/Edit Channels in the Database')
                        if(interaction.options.getSubcommand() === 'help') {
                            // \nc.channels edit <channel> <admin|nsfw|user|reaction|all>
                            configembed.addFields(
                                { name: 'Commands', value: '`channels` - Commands relating to info.\n`  ⤷ help`   - Displays this help text.\n`  ⤷ list`   - A list of set Channels.\n`  ⤷ set`    - Set\'s the Channel in one of Five Category\'s.\n`  ⤷ remove` - Removes the Channel from it\'s Category\'s.', inline: false},
                            );
                            await interaction.reply({embeds: [configembed]});
                        };
                        if (interaction.options.getSubcommand() === 'list') {
                            // Getting Database
                            let dataChannelUserList;
                            let dataChannelAdminList;
                            // let dataChannelNsfwList;
                            let dataChannelLogList;
                            let dataChannelBirthdayCmdList;
                            let dataChannelBirthdayList;
                            let dataChannelReactionList;
                            dataChannelUserList = Get.allChannelForUser(getGuildID);
                            dataChannelAdminList = Get.allChannelForAdmin(getGuildID);
                            // dataChannelNsfwList = Get.allChannelForNsfw(getGuildID);
                            dataChannelLogList = Get.allChannelForLog(getGuildID);
                            dataChannelBirthdayCmdList = Get.allChannelForBirthday(`${getGuildID}-${getShardID}-command`);
                            dataChannelBirthdayList = Get.allChannelForBirthday(`${getGuildID}-${getShardID}-announcement`);
                            dataChannelReactionList = Get.allChannelForReaction(getGuildID);
                            // Return if Data is 'undefined' or 'null'.
                            if (dataChannelUserList == null) {
                                dataChannelUserList = { ChannelRoleID: `${getGuildID}-${getShardID}-200000000000000000` , GuildID: '200000000000000000', ChannelID: '200000000000000000', BotID: '200000000000000000' }
                            };
                            if (dataChannelAdminList == null) {
                                dataChannelAdminList = { ChannelRoleID: `${getGuildID}-${getShardID}-200000000000000000` , GuildID: '200000000000000000', ChannelID: '200000000000000000', BotID: '200000000000000000' }
                            };
                            // if (dataChannelNsfwList == null) {
                            //     dataChannelNsfwList = { ChannelRoleID: `${getGuildID}-${getShardID}-200000000000000000` , GuildID: '200000000000000000', ChannelID: '200000000000000000', BotID: '200000000000000000' }
                            // };
                            if (dataChannelLogList == null) {
                                dataChannelLogList = { ChannelRoleID: `${getGuildID}-${getShardID}-200000000000000000` , GuildID: '200000000000000000', ChannelID: '200000000000000000', BotID: '200000000000000000' }
                            };
                            if (dataChannelBirthdayCmdList == null) {
                                dataChannelBirthdayCmdList = dataChannelBirthdayList
                            };
                            if (dataChannelBirthdayCmdList == null) {
                                dataChannelBirthdayCmdList = { ChannelRoleID: `${getGuildID}-${getShardID}-200000000000000000` , GuildID: '200000000000000000', ChannelID: '200000000000000000', BotID: '200000000000000000' }
                            };
                            if (dataChannelReactionList == null) {
                                dataChannelReactionList = { ChannelRoleID: `${getGuildID}-${getShardID}-200000000000000000` , GuildID: '200000000000000000', ChannelID: '200000000000000000', BotID: '200000000000000000' }
                            };
                            const listUser = dataChannelUserList;
                            const listAdmin = dataChannelAdminList;
                            // const listNsfw = dataChannelNsfwList;
                            const listLog = dataChannelLogList;
                            const listBirthday = dataChannelBirthdayCmdList;
                            const listReaction = dataChannelReactionList;
                            var arrayOfStringsUser = listUser.map(function(obj) {
                                return obj.ChannelID;
                            });
                            var arrayOfStringsAdmin = listAdmin.map(function(obj) {
                                return obj.ChannelID;
                            });
                            // var arrayOfStringsNsfw = listNsfw.map(function(obj) {
                            //     return obj.ChannelID;
                            // });
                            var arrayOfStringsLog = listLog.map(function(obj) {
                                return obj.ChannelID;
                            });
                            var arrayOfStringsBirthday = listBirthday.map(function(obj) {
                                return obj.ChannelID;
                            });
                            var arrayOfStringsReaction = listReaction.map(function(obj) {
                                return obj.ChannelID;
                            });
                            let stringUser = arrayOfStringsUser.toString();
                            let stringAdmin = arrayOfStringsAdmin.toString();
                            // let stringNsfw = arrayOfStringsNsfw.toString();
                            let stringLog = arrayOfStringsLog.toString();
                            let stringBirthday = arrayOfStringsBirthday.toString();
                            let stringReaction = arrayOfStringsReaction.toString();
                            let replaceStringUser = stringUser.replace(/[,]/gi, '>\n<#');
                            let replaceStringAdmin = stringAdmin.replace(/[,]/gi, '>\n<#');
                            // let replaceStringNsfw = stringNsfw.replace(/[,]/gi, '>\n<#');
                            let replaceStringLog = stringLog.replace(/[,]/gi, '>\n<#');
                            let replaceStringBirthday = stringBirthday.replace(/[,]/gi, '>\n<#');
                            let replaceStringReaction = stringReaction.replace(/[,]/gi, '>\n<#');
                            let newStringUser = { User: `<#${replaceStringUser}>` };
                            let newStringAdmin = { Admin: `<#${replaceStringAdmin}>` };
                            // let newStringNsfw = { Nsfw: `<#${replaceStringNsfw}>` };
                            let newStringLog = { Log: `<#${replaceStringLog}>` };
                            let newStringBirthday = { Birthday: `<#${replaceStringBirthday}>` };
                            let newStringReaction = { Reaction: `<#${replaceStringReaction}>` };
                            if (newStringUser == null || newStringUser.User === '<#>' || newStringUser.User === '<#100000000000000000>' || newStringUser.User === '<#200000000000000000>') {
                                newStringUser = { User: 'No Channel found.' };
                            };
                            if (newStringAdmin == null || newStringAdmin.Admin === '<#>' || newStringAdmin.User === '<#100000000000000000>' || newStringAdmin.User === '<#200000000000000000>') {
                                newStringAdmin = { Admin: 'No Channel found.' };
                            };
                            // if (newStringNsfw == null || newStringNsfw.Nsfw === '<#>' || newStringNsfw.Nsfw === '<#100000000000000000>' || newStringNsfw.Nsfw === '<#200000000000000000>') {
                            //     newStringNsfw = { Nsfw: 'No Channel found.' };
                            // };
                            if (newStringLog == null || newStringLog.Log === '<#>' || newStringLog.Log === '<#100000000000000000>' || newStringLog.Log === '<#200000000000000000>') {
                                newStringLog = { Log: 'No Channel found.' };
                            };
                            if (newStringBirthday == null || newStringBirthday.Birthday === '<#>' || newStringBirthday.Birthday === '<#100000000000000000>' || newStringBirthday.Birthday === '<#200000000000000000>') {
                                newStringBirthday = { Birthday: 'No Channel found.' };
                            };
                            if (newStringReaction == null || newStringReaction.Reaction === '<#>' || newStringReaction.Reaction === '<#100000000000000000>' || newStringReaction.Reaction === '<#200000000000000000>') {
                                newStringReaction = { Reaction: 'No Channel found.' };
                            };
                            const channellistembed = new EmbedBuilder()
                                .setColor('DarkGreen')
                                .setTitle('Channel List')
                                .setDescription(`<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>`)
                                .addFields([
                                    { name: `User`, value: `${newStringUser.User}`, inline: true },
                                    { name: `Admin`, value: `${newStringAdmin.Admin}`, inline: true },
                                    // { name: `Nsfw`, value: `${newStringNsfw.Nsfw}`, inline: true },
                                    { name: `Log`, value: `${newStringLog.Log}`, inline: true },
                                    { name: `Birthday`, value: `${newStringBirthday.Birthday}`, inline: true },
                                    { name: `Reaction`, value: `${newStringReaction.Reaction}`, inline: true },
                                ]);
                            await interaction.reply({embeds: [channellistembed]});
                        };
                        const channelembed = new EmbedBuilder()
                        .setColor('Red')
                        // Get Guild Object usable
                        let guild = interaction.client.guilds.cache.get(getGuildID);
                        //
                        // Add
                        if(interaction.options.getSubcommand() === 'set') {
                            // Check if Channel exists in Server
                            const stringChoicesValueSet = interaction.options.getString('setoptions');
                            const stringGetChannel = interaction.options.getChannel('channel');
                            let newStringGetChannel = stringGetChannel.id;
                            let channelString = newStringGetChannel.replace(/[/</>/#]/gi, '');
                            let channelObj = await guild.channels.fetch(channelString);
                            if (channelObj === undefined || channelObj === null || isNaN(channelString)) {
                                channelembed.setDescription(`There is no Channel with this Name nor ID on this Server.`)
                                await interaction.reply({embeds: [channelembed]});
                            };
                            let cmdSetChannelRoleID = `${getGuildID}-${getShardID}-${channelString}`;
                            let channelId = channelString;
                            // Admin
                            if (stringChoicesValueSet === 'admin') {
                                let dataAddChannelAdmin;
                                dataAddChannelAdmin = Get.channelForAdmin(cmdSetChannelRoleID);
                                if (dataAddChannelAdmin != null) {
                                    channelembed.setDescription('This Channel is already set as an Admin Channel.')
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataAddChannelAdmin == null) {
                                    dataAddChannelAdmin = { ChannelRoleID: `${cmdSetChannelRoleID}`, GuildID: `${getGuildID}`, ChannelID: `${channelId}`, BotID: `${getClientID}` };
                                    Set.channelForAdmin(dataAddChannelAdmin);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`The Channel ${stringGetChannel} has been added to the Admin Channels.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem adding an Admin Channel to the database: dataAddChannelAdmin could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                                };
                            };
                            // User
                            if (stringChoicesValueSet === 'user') {
                                let dataAddChannelUser;
                                dataAddChannelUser = Get.channelForUser(cmdSetChannelRoleID);
                                if (dataAddChannelUser != null) {
                                    channelembed.setDescription('This Channel is already set as an User Channel.')
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataAddChannelUser == null) {
                                    dataAddChannelUser = { ChannelRoleID: `${cmdSetChannelRoleID}`, GuildID: `${getGuildID}`, ChannelID: `${channelId}`, BotID: `${getClientID}` };
                                    Set.channelForUser(dataAddChannelUser);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`The Channel ${stringGetChannel} has been added to the User Channels.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem adding an User Channel to the database: dataAddChannelUser could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                                };
                            };
                            // Nsfw
                            // if (stringChoicesValueSet === 'nsfw') {
                            //     let dataAddChannelNsfw;
                            //     dataAddChannelNsfw = Get.channelForNsfw(cmdSetChannelRoleID);
                            //     if (dataAddChannelNsfw != null) {
                            //         channelembed.setDescription('This Channel is already set as an Nsfw Channel.')
                            //         await interaction.reply({embeds: [channelembed]});
                            //     } else if (dataAddChannelNsfw == null) {
                            //         dataAddChannelNsfw = { ChannelRoleID: `${cmdSetChannelRoleID}`, GuildID: `${getGuildID}`, ChannelID: `${channelId}`, BotID: `${getClientID}` };
                            //         Set.channelForNsfw(dataAddChannelNsfw);
                            //         channelembed.setColor('DarkGreen')
                            //             .setDescription(`The Channel ${stringGetChannel} has been added to the Nsfw Channels.`)
                            //         await interaction.reply({embeds: [channelembed]});
                            //     } else {
                            //         return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem adding an Nsfw Channel to the database: dataAddChannelNsfw could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                            //     };
                            // };
                            // Log
                            if (stringChoicesValueSet === 'log') {
                                let dataAddChannelLog;
                                dataAddChannelLog = Get.channelForLog(getGuildID);
                                if (dataAddChannelLog != null) {
                                    channelembed.setDescription('This Channel is already set as an Log Channel.')
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataAddChannelLog == null) {
                                    dataAddChannelLog = { ChannelRoleID: `${getGuildID}-${getShardID}`, GuildID: `${getGuildID}`, ChannelID: `${channelId}`, BotID: `${getClientID}` };
                                    Set.channelForLog(dataAddChannelLog);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`The Channel ${stringGetChannel} has been added to the Log Channels.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem adding an Log Channel to the database: dataAddChannelLog could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                                };
                            };
                            // Birthday
                            if (stringChoicesValueSet === 'birthdaycmd') {
                                let dataAddChannelBirthday;
                                dataAddChannelBirthday = Get.channelForBirthday(`${getGuildID}-${getShardID}-command`);
                                if (dataAddChannelBirthday != null) {
                                    channelembed.setDescription('This Channel is already set as an Birthday Channel.')
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataAddChannelBirthday == null) {
                                    dataAddChannelBirthday = { ChannelRoleID: `${getGuildID}-${getShardID}-command`, GuildID: `${getGuildID}`, ChannelID: `${channelId}`, BotID: `${getClientID}` };
                                    Set.channelForBirthday(dataAddChannelBirthday);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`The Channel ${stringGetChannel} has been added to the Birthday Channels.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem adding an Birthday Channel to the database: dataAddChannelBirthday could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                                };
                            };
                            // Birthday announcement
                            if (stringChoicesValueSet === 'birthday') {
                                let dataAddChannelBirthday;
                                dataAddChannelBirthday = Get.channelForBirthday(`${getGuildID}-${getShardID}-announcement`);
                                if (dataAddChannelBirthday != null) {
                                    channelembed.setDescription('This Channel is already set as an Birthday Announcement Channel.')
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataAddChannelBirthday == null) {
                                    dataAddChannelBirthday = { ChannelRoleID: `${getGuildID}-${getShardID}-announcement`, GuildID: `${getGuildID}`, ChannelID: `${channelId}`, BotID: `${getClientID}` };
                                    Set.channelForBirthday(dataAddChannelBirthday);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`The Channel ${stringGetChannel} has been added to the Birthday Announcement Channels.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem adding an Birthday Announcement Channel to the database: dataAddChannelBirthday could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                                };
                            };
                            // Reaction
                            if (stringChoicesValueSet === 'reaction') {
                                let dataAddChannelReaction;
                                dataAddChannelReaction = Get.channelForReaction(cmdSetChannelRoleID);
                                if (dataAddChannelReaction != null) {
                                    channelembed.setDescription('This Channel is already set as an Reaction Channel.')
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataAddChannelReaction == null) {
                                    dataAddChannelReaction = { ChannelRoleID: `${cmdSetChannelRoleID}`, GuildID: `${getGuildID}`, ChannelID: `${channelId}`, BotID: `${getClientID}` };
                                    Set.channelForReaction(dataAddChannelReaction);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`The Channel ${stringGetChannel} has been added to the Reaction Channels.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem adding an Reaction Channel to the database: dataAddChannelReaction could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                                };
                            };
                            // All
                            if (stringChoicesValueSet === 'all') {
                                channelembed.setColor('Red')
                                    .setDescription(`You can't add ALL Channels at once to the lists, plus i don't know to which list to begin with. 🤨 `)
                                await interaction.reply({embeds: [channelembed]});
                            };
                        };
                        //
                        // Remove
                        if(interaction.options.getSubcommand() === 'remove') {
                            // Check if Channel exists in Server
                            const stringChoicesValueRemove = interaction.options.getString('removeoptions');
                            const stringGetChannel = interaction.options.getChannel('channel');
                            let newStringGetChannel = stringGetChannel.id;
                            let channelString = newStringGetChannel.replace(/[/</>/@/#]/gi, '');
                            if (channelString == null || isNaN(channelString)) {
                                channelembed.setDescription(`There is no Channel with this Name nor ID on this List.`)
                                await interaction.reply({ embeds: [channelembed] });
                            };
                            // let channelObj = await guild.channels.fetch(channelString);
                            let cmdRemoveChannelRoleID = `${getGuildID}-${getShardID}-${channelString}`;
                            // Admin
                            if (stringChoicesValueRemove === 'admin') {
                                let dataRemoveChannelAdmin;
                                dataRemoveChannelAdmin = Get.channelForAdmin(cmdRemoveChannelRoleID);
                                if (dataRemoveChannelAdmin == null) {
                                    channelembed.setDescription(`There is no Channel with this Name nor ID on this List.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataRemoveChannelAdmin != null) {
                                    Del.channelForAdmin(cmdRemoveChannelRoleID);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`The Channel ${stringGetChannel} has been removed from the Admin Channels.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem removing an Admin Channel from the database: dataRemoveChannelAdmin could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                                };
                            };
                            // User
                            if (stringChoicesValueRemove === 'user') {
                                let dataRemoveChannelUser;
                                dataRemoveChannelUser = Get.channelForUser(cmdRemoveChannelRoleID);
                                if (dataRemoveChannelUser == null) {
                                    channelembed.setDescription(`There is no Channel with this Name nor ID on this List.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataRemoveChannelUser != null) {
                                    Del.channelForUser(cmdRemoveChannelRoleID);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`The Channel ${stringGetChannel} has been removed from the User Channels.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem removing an User Channel from the database: dataRemoveChannelUser could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                                };
                            };
                            // Nsfw
                            // if (stringChoicesValueRemove === 'nsfw') {
                            //     let dataRemoveChannelNsfw;
                            //     dataRemoveChannelNsfw = Get.channelForNsfw(cmdRemoveChannelRoleID);
                            //     if (dataRemoveChannelNsfw == null) {
                            //         channelembed.setDescription(`There is no Channel with this Name nor ID on this List.`)
                            //         await interaction.reply({embeds: [channelembed]});
                            //     } else if (dataRemoveChannelNsfw != null) {
                            //         Del.channelForNsfw(cmdRemoveChannelRoleID);
                            //         channelembed.setColor('DarkGreen')
                            //             .setDescription(`The Channel ${stringGetChannel} has been removed from the Nsfw Channels.`)
                            //         await interaction.reply({embeds: [channelembed]});
                            //     } else {
                            //         return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem removing an Nsfw Channel from the database: dataRemoveChannelNsfw could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                            //     };
                            // };
                            // Log
                            if (stringChoicesValueRemove === 'log') {
                                let dataRemoveChannelLog;
                                dataRemoveChannelLog = Get.channelForLog(cmdRemoveChannelRoleID);
                                if (dataRemoveChannelLog == null) {
                                    channelembed.setDescription(`There is no Channel with this Name nor ID on this List.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataRemoveChannelLog != null) {
                                    Del.channelForLog(cmdRemoveChannelRoleID);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`The Channel ${stringGetChannel} has been removed from the Log Channels.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem removing an Log Channel from the database: dataRemoveChannelLog could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                                };
                            };
                            // Birthday
                            if (stringChoicesValueRemove === 'birthdaycmd') {
                                let dataRemoveChannelBirthday;
                                dataRemoveChannelBirthday = Get.channelForBirthday(`${getGuildID}-${getShardID}-command`);
                                if (dataRemoveChannelBirthday == null) {
                                    channelembed.setDescription(`There is no Channel with this Name nor ID on this List.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataRemoveChannelBirthday != null) {
                                    Del.channelForBirthday(`${getGuildID}-${getShardID}-command`);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`The Channel ${stringGetChannel} has been removed from the Birthday Channels.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem removing an Birthday Channel from the database: dataRemoveChannelBirthday could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                                };
                            };
                            // Birthday Announcement
                            if (stringChoicesValueRemove === 'birthday') {
                                let dataRemoveChannelBirthday;
                                dataRemoveChannelBirthday = Get.channelForBirthday(`${getGuildID}-${getShardID}-announcement`);
                                if (dataRemoveChannelBirthday == null) {
                                    channelembed.setDescription(`There is no Channel with this Name nor ID on this List.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataRemoveChannelBirthday != null) {
                                    Del.channelForBirthday(`${getGuildID}-${getShardID}-announcement`);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`The Channel ${stringGetChannel} has been removed from the Birthday Announcement Channels.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem removing an Birthday Announcement Channel from the database: dataRemoveChannelBirthday could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                                };
                            };
                            // Reaction
                            if (stringChoicesValueRemove === 'reaction') {
                                let dataRemoveChannelReaction;
                                dataRemoveChannelReaction = Get.channelForReaction(cmdRemoveChannelRoleID);
                                if (dataRemoveChannelReaction == null) {
                                    channelembed.setDescription(`There is no Channel with this Name nor ID on this List.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataRemoveChannelReaction != null) {
                                    Del.channelForReaction(cmdRemoveChannelRoleID);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`The Channel ${stringGetChannel} has been removed from the Reaction Channels.`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem removing an Reaction Channel from the database: dataRemoveChannelReaction could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                                };
                            };
                            // All
                            if (stringChoicesValueRemove === 'all') {
                                channelembed.setColor('DarkGreen')
                                    .setDescription(`You can't remove ALL Channels at once from the lists, plus i don't know to which list to begin with. 🤨 `)
                                await interaction.reply({embeds: [channelembed]});
                            };
                        };
                    // Error Messages
                    } else {
                        await interaction.reply({ content: 'Admin Commands can only be used in Admin Channels.', ephemeral: true });
                    };
                } else {
                    await interaction.reply({ content: 'You are either not an Admin or you have not enought permissions.', ephemeral: true });
                };
            } else {
                await interaction.reply({ content: 'This command is not available right now.', ephemeral: true });
            };
        } else {
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'channel\' returned \'null / undefined\'.`);
        };
    },
};
