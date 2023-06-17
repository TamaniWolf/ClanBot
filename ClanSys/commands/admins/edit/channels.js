
// Require and set
const Discord = require('discord.js');
const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = Discord;
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();

module.exports = {
	cooldown: 5,
	admin: 'true',
	nsfw: 'false',
    data: new SlashCommandBuilder()
        .setName('channels')
        .setDescription('Setting/Removing Channels from Database.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(
            PermissionsBitField.Flags.ViewAuditLog
            | PermissionsBitField.Flags.KickMembers
            | PermissionsBitField.Flags.ManageChannels
            | PermissionsBitField.Flags.ManageGuildExpressions
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
        )
    ,
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

            let lang = require(`../../../.${dataLang.Lang}`);
            let channel = lang.admin.channel;
            if (dataCommandAdmin.Channels === 'true') {
                let permissions = interaction.member.permissions;
                if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                    if (dataChannelAdmin != null && getChannelID === dataChannelAdmin.ChannelID) {
                        const configembed = new EmbedBuilder()
                        .setColor('DarkGreen')
                        .setTitle(`${channel.titlehelp}`)
                        if(interaction.options.getSubcommand() === 'help') {
                            // \nc.channels edit <channel> <admin|nsfw|user|reaction|all>
                            configembed.addFields(
                                { name: `${channel.helpfield1}`, value: `${channel.helpfield2}`, inline: false},
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
                                newStringUser = { User: `${channel.nodata}` };
                            };
                            if (newStringAdmin == null || newStringAdmin.Admin === '<#>' || newStringAdmin.User === '<#100000000000000000>' || newStringAdmin.User === '<#200000000000000000>') {
                                newStringAdmin = { Admin: `${channel.nodata}` };
                            };
                            // if (newStringNsfw == null || newStringNsfw.Nsfw === '<#>' || newStringNsfw.Nsfw === '<#100000000000000000>' || newStringNsfw.Nsfw === '<#200000000000000000>') {
                            //     newStringNsfw = { Nsfw: `${channel.nodata}` };
                            // };
                            if (newStringLog == null || newStringLog.Log === '<#>' || newStringLog.Log === '<#100000000000000000>' || newStringLog.Log === '<#200000000000000000>') {
                                newStringLog = { Log: `${channel.nodata}` };
                            };
                            if (newStringBirthday == null || newStringBirthday.Birthday === '<#>' || newStringBirthday.Birthday === '<#100000000000000000>' || newStringBirthday.Birthday === '<#200000000000000000>') {
                                newStringBirthday = { Birthday: `${channel.nodata}` };
                            };
                            if (newStringReaction == null || newStringReaction.Reaction === '<#>' || newStringReaction.Reaction === '<#100000000000000000>' || newStringReaction.Reaction === '<#200000000000000000>') {
                                newStringReaction = { Reaction: `${channel.nodata}` };
                            };
                            const channellistembed = new EmbedBuilder()
                                .setColor('DarkGreen')
                                .setTitle(`${channel.titlelist}`)
                                .setDescription(`<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>`)
                                .addFields([
                                    { name: `${channel.user}`, value: `${newStringUser.User}`, inline: true },
                                    { name: `${channel.admin}`, value: `${newStringAdmin.Admin}`, inline: true },
                                    // { name: `${channel.nsfw}`, value: `${newStringNsfw.Nsfw}`, inline: true },
                                    { name: `${channel.log}`, value: `${newStringLog.Log}`, inline: true },
                                    { name: `${channel.birthday}`, value: `${newStringBirthday.Birthday}`, inline: true },
                                    { name: `${channel.reaction}`, value: `${newStringReaction.Reaction}`, inline: true },
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
                                channelembed.setDescription(`${channel.nochannelinserver}`)
                                await interaction.reply({embeds: [channelembed]});
                            };
                            let cmdSetChannelRoleID = `${getGuildID}-${getShardID}-${channelString}`;
                            let channelId = channelString;
                            // Admin
                            if (stringChoicesValueSet === 'admin') {
                                let dataAddChannelAdmin;
                                dataAddChannelAdmin = Get.channelForAdmin(cmdSetChannelRoleID);
                                if (dataAddChannelAdmin != null) {
                                    channelembed.setDescription(`${channel.isset} ${channel.admin} ${channel.channel}`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataAddChannelAdmin == null) {
                                    dataAddChannelAdmin = { ChannelRoleID: `${cmdSetChannelRoleID}`, GuildID: `${getGuildID}`, ChannelID: `${channelId}`, BotID: `${getClientID}` };
                                    Set.channelForAdmin(dataAddChannelAdmin);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`${channel.thechannel} ${stringGetChannel} ${channel.added} ${channel.admin} ${channel.channels}`)
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
                                    channelembed.setDescription(`${channel.isset} ${channel.user} ${channel.channel}`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataAddChannelUser == null) {
                                    dataAddChannelUser = { ChannelRoleID: `${cmdSetChannelRoleID}`, GuildID: `${getGuildID}`, ChannelID: `${channelId}`, BotID: `${getClientID}` };
                                    Set.channelForUser(dataAddChannelUser);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`${channel.thechannel} ${stringGetChannel} ${channel.added} ${channel.user} ${channel.channels}`)
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
                            //         channelembed.setDescription(`${channel.isset} ${channel.nsfw} ${channel.channel}`)
                            //         await interaction.reply({embeds: [channelembed]});
                            //     } else if (dataAddChannelNsfw == null) {
                            //         dataAddChannelNsfw = { ChannelRoleID: `${cmdSetChannelRoleID}`, GuildID: `${getGuildID}`, ChannelID: `${channelId}`, BotID: `${getClientID}` };
                            //         Set.channelForNsfw(dataAddChannelNsfw);
                            //         channelembed.setColor('DarkGreen')
                            //             .setDescription(`${channel.thechannel} ${stringGetChannel} h${channel.added} ${channel.nsfw} ${channel.channels}`)
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
                                    channelembed.setDescription(`${channel.isset} ${channel.log} ${channel.channel}`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataAddChannelLog == null) {
                                    dataAddChannelLog = { ChannelRoleID: `${getGuildID}-${getShardID}`, GuildID: `${getGuildID}`, ChannelID: `${channelId}`, BotID: `${getClientID}` };
                                    Set.channelForLog(dataAddChannelLog);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`${channel.thechannel} ${stringGetChannel} ${channel.added} ${channel.log} ${channel.channels}`)
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
                                    channelembed.setDescription(`${channel.isset} ${channel.birthday} ${channel.channel}`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataAddChannelBirthday == null) {
                                    dataAddChannelBirthday = { ChannelRoleID: `${getGuildID}-${getShardID}-command`, GuildID: `${getGuildID}`, ChannelID: `${channelId}`, BotID: `${getClientID}` };
                                    Set.channelForBirthday(dataAddChannelBirthday);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`${channel.thechannel} ${stringGetChannel} ${channel.added} ${channel.birthday} ${channel.channels}`)
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
                                    channelembed.setDescription(`${channel.isset} ${channel.birthdayannounce} ${channel.channel}`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataAddChannelBirthday == null) {
                                    dataAddChannelBirthday = { ChannelRoleID: `${getGuildID}-${getShardID}-announcement`, GuildID: `${getGuildID}`, ChannelID: `${channelId}`, BotID: `${getClientID}` };
                                    Set.channelForBirthday(dataAddChannelBirthday);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`${channel.thechannel} ${stringGetChannel} ${channel.added} ${channel.birthdayannounce} ${channel.channels}`)
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
                                    channelembed.setDescription(`${channel.isset} ${channel.reaction} ${channel.channel}`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataAddChannelReaction == null) {
                                    dataAddChannelReaction = { ChannelRoleID: `${cmdSetChannelRoleID}`, GuildID: `${getGuildID}`, ChannelID: `${channelId}`, BotID: `${getClientID}` };
                                    Set.channelForReaction(dataAddChannelReaction);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`${channel.thechannel} ${stringGetChannel} ${channel.added} ${channel.reaction} ${channel.channels}`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem adding an Reaction Channel to the database: dataAddChannelReaction could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                                };
                            };
                            // All
                            if (stringChoicesValueSet === 'all') {
                                channelembed.setColor('Red')
                                    .setDescription(`${channel.noaddall}`)
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
                                channelembed.setDescription(`${channel.nochannelinlist}`)
                                await interaction.reply({ embeds: [channelembed] });
                            };
                            // let channelObj = await guild.channels.fetch(channelString);
                            let cmdRemoveChannelRoleID = `${getGuildID}-${getShardID}-${channelString}`;
                            // Admin
                            if (stringChoicesValueRemove === 'admin') {
                                let dataRemoveChannelAdmin;
                                dataRemoveChannelAdmin = Get.channelForAdmin(cmdRemoveChannelRoleID);
                                if (dataRemoveChannelAdmin == null) {
                                    channelembed.setDescription(`${channel.nochannelinlist}`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataRemoveChannelAdmin != null) {
                                    Del.channelForAdmin(cmdRemoveChannelRoleID);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`${channel.thechannel} ${stringGetChannel} ${channel.removed} ${channel.admin} ${channel.channels}`)
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
                                    channelembed.setDescription(`${channel.nochannelinlist}`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataRemoveChannelUser != null) {
                                    Del.channelForUser(cmdRemoveChannelRoleID);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`${channel.thechannel} ${stringGetChannel} ${channel.removed} ${channel.user} ${channel.channels}`)
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
                            //         channelembed.setDescription(`${channel.nochannelinlist}`)
                            //         await interaction.reply({embeds: [channelembed]});
                            //     } else if (dataRemoveChannelNsfw != null) {
                            //         Del.channelForNsfw(cmdRemoveChannelRoleID);
                            //         channelembed.setColor('DarkGreen')
                            //             .setDescription(`${channel.thechannel} ${stringGetChannel} ${channel.removed} ${channel.nsfw} ${channel.channels}`)
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
                                    channelembed.setDescription(`${channel.nochannelinlist}`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataRemoveChannelLog != null) {
                                    Del.channelForLog(cmdRemoveChannelRoleID);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`${channel.thechannel} ${stringGetChannel} ${channel.removed} ${channel.log} ${channel.channels}`)
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
                                    channelembed.setDescription(`${channel.nochannelinlist}`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataRemoveChannelBirthday != null) {
                                    Del.channelForBirthday(`${getGuildID}-${getShardID}-command`);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`${channel.thechannel} ${stringGetChannel} ${channel.removed} ${channel.birthday} ${channel.channels}`)
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
                                    channelembed.setDescription(`${channel.nochannelinlist}`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataRemoveChannelBirthday != null) {
                                    Del.channelForBirthday(`${getGuildID}-${getShardID}-announcement`);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`${channel.thechannel} ${stringGetChannel} ${channel.removed} ${channel.birthdayannounce} ${channel.channels}`)
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
                                    channelembed.setDescription(`${channel.nochannelinlist}`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else if (dataRemoveChannelReaction != null) {
                                    Del.channelForReaction(cmdRemoveChannelRoleID);
                                    channelembed.setColor('DarkGreen')
                                        .setDescription(`${channel.thechannel} ${stringGetChannel} ${channel.removed} ${channel.reaction} ${channel.channels}`)
                                    await interaction.reply({embeds: [channelembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem removing an Reaction Channel from the database: dataRemoveChannelReaction could not return "undefined / null" nor "no undefined / no null" in "... /edit/channels.js"`)
                                };
                            };
                            // All
                            if (stringChoicesValueRemove === 'all') {
                                channelembed.setColor('DarkGreen')
                                    .setDescription(`${channel.noremoveall}`)
                                await interaction.reply({embeds: [channelembed]});
                            };
                        };
                    // Error Messages
                    } else {
                        await interaction.reply({ content: `${lang.error.adminchannel}`, ephemeral: true });
                    };
                } else {
                    await interaction.reply({ content: `${lang.error.noadminperms}`, ephemeral: true });
                };
            } else {
                await interaction.reply({ content: `${lang.error.cmdoff}`, ephemeral: true });
            };
        } else {
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'channel\' returned \'null / undefined\'.`);
        };
    },
};
