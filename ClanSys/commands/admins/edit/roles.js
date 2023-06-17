
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
        .setName('roles')
        .setDescription('editing stuff')
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
                .setDescription('List of set roles')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Set a role.')
                .addStringOption(option =>
                    option
                        .setName('setoptions')
                        .setDescription('Set Options')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Admin', value: 'admin' },
                            { name: 'User', value: 'user' },
                            { name: 'Nsfw', value: 'nsfw' },
                            { name: 'Mute', value: 'mute' },
                        )
                )
                .addRoleOption(option =>
                    option
                        .setName('roleid')
                        .setDescription('Role ID')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a role.')
                .addStringOption(option =>
                    option
                        .setName('removeoptions')
                        .setDescription('Remove Options')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Admin', value: 'admin' },
                            { name: 'User', value: 'user' },
                            { name: 'Nsfw', value: 'nsfw' },
                            { name: 'Mute', value: 'mute' },
                        )
                )
                .addRoleOption(option =>
                    option
                        .setName('roleid')
                        .setDescription('Role ID')
                        .setRequired(true)
                )
        )
    ,
    async execute(interaction) {
        if (interaction != null || interaction.channel.id != null) {
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
            let getChannelRoleID = `${getGuildID}-${interaction.guild.shardId}-${getChannelID}`;
            dataLang = Get.botConfig(getBotConfigID);
            dataCommandAdmin = Get.onOffForCommandAdmin(getBotConfigID);
            dataChannelAdmin = Get.channelForAdmin(getChannelRoleID);
            dataChannelAdminGuild = Get.channelForAdminByGuild(getGuildID);
            // Data Check
            if (dataLang == null) { dataLang = { Lang: './Database/lang/en_US.json' }; };
            if (dataCommandAdmin == null) { dataCommandAdmin = { Roles: 'true' }; };
            if (dataChannelAdminGuild == null) { dataChannelAdmin = { ChannelID: `${getChannelID}` }; console.log(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Command \'channel\' executed outside the admin channels.`); };
            // Context

            let lang = require(`../../../.${dataLang.Lang}`);
            if (dataCommandAdmin.Roles === 'true') {
                let permissions = interaction.member.permissions;
                if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                if (dataChannelAdmin != null && getChannelID === dataChannelAdmin.ChannelID) {
                        const configembed = new EmbedBuilder()
                        .setColor('DarkGreen')
                        .setTitle(`${lang.admin.roles.titlehelp}`)
                        if(interaction.options.getSubcommand() === 'help') {
                            configembed.addFields(
                                { name: `${lang.admin.roles.helpfield1}`, value: `${lang.admin.roles.helpfield2}`, inline: false },
                            );
                            await interaction.reply({embeds: [configembed]});
                        };
                        if (interaction.options.getSubcommand() === 'list') {
                            // Getting Database
                            let dataRoleUserList;
                            let dataRoleAdminList;
                            let dataRoleNsfwList;
                            dataRoleUserList = Get.allRoleForUser(getGuildID);
                            dataRoleAdminList = Get.allRoleForAdmin(getGuildID);
                            dataRoleNsfwList = Get.allRoleForNsfw(getGuildID);
                            // Return if Data is 'undefined' or 'null'.
                            if (dataRoleUserList === undefined || dataRoleUserList === null) {
                                dataRoleUserList = { ChannelRoleID: `${getBotConfigID}-200000000000000000` , GuildID: '200000000000000000', RoleID: '200000000000000000', BotID: '200000000000000000' }
                            };
                            if (dataRoleAdminList === undefined || dataRoleAdminList === null) {
                                dataRoleAdminList = { ChannelRoleID: `${getBotConfigID}-200000000000000000` , GuildID: '200000000000000000', RoleID: '200000000000000000', BotID: '200000000000000000' }
                            };
                            if (dataRoleNsfwList === undefined || dataRoleNsfwList === null) {
                                dataRoleNsfwList = { ChannelRoleID: `${getBotConfigID}-200000000000000000` , GuildID: '200000000000000000', RoleID: '200000000000000000', BotID: '200000000000000000' }
                            };
                            const listUser = dataRoleUserList;
                            const listAdmin = dataRoleAdminList;
                            const listNsfw = dataRoleNsfwList;
                            var arrayOfStringsUser = listUser.map(function(obj) {
                                return obj.RoleID;
                            });
                            var arrayOfStringsAdmin = listAdmin.map(function(obj) {
                                return obj.RoleID;
                            });
                            var arrayOfStringsNsfw = listNsfw.map(function(obj) {
                                return obj.RoleID;
                            });
                            let stringUser = arrayOfStringsUser.toString();
                            let stringAdmin = arrayOfStringsAdmin.toString();
                            let stringNsfw = arrayOfStringsNsfw.toString();
                            let replaceStringUser = stringUser.replace(/[,]/gi, '>\n<@&');
                            let replaceStringAdmin = stringAdmin.replace(/[,]/gi, '>\n<@&');
                            let replaceStringNsfw = stringNsfw.replace(/[,]/gi, '>\n<@&');
                            let newStringUser = { User: `<@&${replaceStringUser}>` };
                            let newStringAdmin = { Admin: `<@&${replaceStringAdmin}>` };
                            let newStringNsfw = { Nsfw: `<@&${replaceStringNsfw}>` };
                            if (newStringUser === undefined || newStringUser === null || newStringUser.User === '<@&>' || newStringUser.User === '<@&100000000000000000>' || newStringUser.User === '<@&200000000000000000>') {
                                newStringUser = { User: `${lang.admin.roles.nodata}` };
                            };
                            if (newStringAdmin === undefined || newStringAdmin === null || newStringAdmin.Admin === '<@&>' || newStringAdmin.Admin === '<@&100000000000000000>' || newStringUser.User === '<@&200000000000000000>') {
                                newStringAdmin = { Admin: `${lang.admin.roles.nodata}` };
                            };
                            if (newStringNsfw === undefined || newStringNsfw === null || newStringNsfw.Nsfw === '<@&>' || newStringNsfw.Nsfw === '<@&100000000000000000>' || newStringUser.User === '<@&200000000000000000>') {
                                newStringNsfw = { Nsfw: `${lang.admin.roles.nodata}` };
                            };
                            const roleembed = new EmbedBuilder()
                                .setColor('DarkGreen')
                                .setTitle(`${lang.admin.roles.titlelist}`)
                                .setDescription(`<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>`)
                                .addFields([
                                    { name: `${lang.admin.roles.listfield1}`, value: `${newStringUser.User}`, inline: true },
                                    { name: `${lang.admin.roles.listfield2}`, value: `${newStringAdmin.Admin}`, inline: true },
                                    { name: `${lang.admin.roles.listfield3}`, value: `${newStringNsfw.Nsfw}`, inline: true },
                                ]);
                                await interaction.reply({embeds: [roleembed]});
                        };
                        const roleembed = new EmbedBuilder()
                        .setColor('Red')
                        const stringGetRole = interaction.options.getRole('roleid');
                        // Add
                        if (interaction.options.getSubcommand() === 'set') {
                            // Check if argument is a Role
                            // Check if Role exists in Server.
                            let mewStringGetRole = stringGetRole.id;
                            let roleString = mewStringGetRole.replace(/[/</>/@/&]/gi, '');
                            let channelRoleId = `${getBotConfigID}-${roleString}`;
                            if (channelRoleId === undefined || channelRoleId === null) {
                                roleembed.setDescription(`${lang.admin.roles.noroleserver}`)
                                await interaction.reply({embeds: [roleembed]});
                            };
                            //Check if argument is Admin.
                            const stringChoicesValueSet = interaction.options.getString('setoptions');
                            if (stringChoicesValueSet === 'admin') {
                                let dataAddRolesAdmin;
                                dataAddRolesAdmin = Get.roleForAdmin(`${channelRoleId}`);
                                if (dataAddRolesAdmin != undefined || dataAddRolesAdmin != null) {
                                    roleembed.setDescription(`${lang.admin.roles.issetadmin}`)
                                    await interaction.reply({embeds: [roleembed]});
                                }else if (dataAddRolesAdmin === undefined || dataAddRolesAdmin === null) {
                                    dataAddRolesAdmin = { ChannelRoleID: `${channelRoleId}`, GuildID: `${getGuildID}`, RoleID: `${stringGetRole.id}`, BotID: `${getClientID}` }
                                    Set.roleForAdmin(dataAddRolesAdmin);
                                    roleembed.setColor('DarkGreen')
                                        .setDescription(`${lang.admin.roles.therole} ${stringGetRole} ${lang.admin.roles.hasaddadmin}`)
                                    await interaction.reply({embeds: [roleembed]});
                                } else {
                                    return console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] There was a problem adding an Admin Role to the database: dataAddRolesAdmin could not return "undefined / null" nor "no undefined / no null" in "... /edit/roles.js"`)
                                };
                            };
                            //Check if argument is User.
                            if (stringChoicesValueSet === 'user') {
                                let dataAddRolesUser;
                                dataAddRolesUser = Get.roleForUser(`${channelRoleId}`);
                                if (dataAddRolesUser != undefined || dataAddRolesUser != null) {
                                    roleembed.setDescription(`${lang.admin.roles.issetuser}`)
                                    await interaction.reply({embeds: [roleembed]});
                                } else if (dataAddRolesUser === undefined || dataAddRolesUser === null) {
                                    dataAddRolesUser = { ChannelRoleID: `${channelRoleId}`, GuildID: `${getGuildID}`, RoleID: `${stringGetRole.id}`, BotID: `${getClientID}` }
                                    Set.roleForUser(dataAddRolesUser);
                                    roleembed.setColor('DarkGreen')
                                        .setDescription(`${lang.admin.roles.therole} ${stringGetRole} ${lang.admin.roles.hasadduser}`)
                                    await interaction.reply({embeds: [roleembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem adding an User Role to the database: dataAddRolesUser could not return "undefined / null" nor "no undefined / no null" in "... /edit/roles.js"`)
                                };
                            };
                            //Check if argument is Nsfw.
                            if (stringChoicesValueSet === 'nsfw') {
                                let dataAddRolesNsfw;
                                dataAddRolesNsfw = Get.roleForNsfw(`${channelRoleId}`);
                                if (dataAddRolesNsfw != undefined || dataAddRolesNsfw != null) {
                                    roleembed.setDescription(`${lang.admin.roles.issetnsfw}`)
                                    await interaction.reply({embeds: [roleembed]});
                                } else if (dataAddRolesNsfw === undefined || dataAddRolesNsfw === null) {
                                    dataAddRolesNsfw = { ChannelRoleID: `${channelRoleId}`, GuildID: `${getGuildID}`, RoleID: `${stringGetRole.id}`, BotID: `${getClientID}` }
                                    Set.roleForNsfw(dataAddRolesNsfw);
                                    roleembed.setColor('DarkGreen')
                                        .setDescription(`${lang.admin.roles.therole} ${stringGetRole} ${lang.admin.roles.hasaddnsfw}`)
                                    await interaction.reply({embeds: [roleembed]});
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem adding an Nsfw Role to the database: dataAddRolesNsfw could not return "undefined / null" nor "no undefined / no null" in "... /edit/roles.js"`)
                                };
                            };
                            //Check if argument is Mute.
                            if (stringChoicesValueSet === 'mute') {
                                let dataAddRolesMute;
                                dataAddRolesMute = Get.roleForUser(`${getBotConfigID}-mute`);
                                if (dataAddRolesMute != undefined || dataAddRolesMute != null) {
                                    roleembed.setDescription(`${lang.admin.roles.issetmute}`)
                                    await interaction.reply({embeds: [roleembed]});
                                } else if (dataAddRolesMute === undefined || dataAddRolesMute === null) {
                                    dataAddRolesMute = { ChannelRoleID: `${getBotConfigID}-mute`, GuildID: `${getGuildID}`, RoleID: `${stringGetRole.id}`, BotID: `${getClientID}` }
                                    Set.roleForUser(dataAddRolesMute);
                                    roleembed.setColor('DarkGreen')
                                        .setDescription(`${lang.admin.roles.therole} ${stringGetRole} ${lang.admin.roles.hasadduser}`)
                                    await interaction.reply({ embeds: [roleembed] });
                                } else {
                                    return console.error('[' + DateTime.utc().toFormat(timeFormat) + `] There was a problem adding an the Mute Role to the database: dataAddRolesUser could not return "undefined / null" nor "no undefined / no null" in "... /edit/roles.js"`)
                                };
                            };
                            //Check if argument is All.
                            if (stringChoicesValueSet === 'all') {
                                roleembed.setDescription(`${lang.admin.roles.nomassadd}`)
                                await interaction.reply({embeds: [roleembed]});
                            };
                        };
                        // Remove
                        if (interaction.options.getSubcommand() === 'remove') {
                            // Check if argument is a Role
                            // Check if Role is in database.
                            // console.log(stringGetRole);
                            let newStringGetRole = stringGetRole.id;
                            let roleString = newStringGetRole.replace(/[/</>/@/&]/gi, '');
                            let channelRoleId = `${getGuildID}-${getShardID}-${roleString}`;
                            //Check if argument is Admin.
                            const stringChoicesValueRemove = interaction.options.getString('removeoptions');
                            if (stringChoicesValueRemove === 'admin') {
                                let dataRemoveRoleAdmin;
                                dataRemoveRoleAdmin = Get.roleForAdmin(channelRoleId);
                                if (dataRemoveRoleAdmin === undefined || dataRemoveRoleAdmin == null) {
                                    roleembed.setDescription(`${lang.admin.roles.norolelist}`)
                                    await interaction.reply({embeds: [roleembed]});
                                } else if (dataRemoveRoleAdmin != undefined || dataRemoveRoleAdmin != null) {
                                    Del.roleForAdmin(channelRoleId);
                                    roleembed.setColor('DarkGreen')
                                        .setDescription(`${lang.admin.roles.therole} ${stringGetRole} ${lang.admin.roles.removeadmin}`)
                                    await interaction.reply({embeds: [roleembed]});
                                };
                            };
                            //Check if argument is User.
                            if (stringChoicesValueRemove === 'user') {
                                let dataRemoveRoleUser;
                                dataRemoveRoleUser = Get.roleForUser(channelRoleId);
                                if (dataRemoveRoleUser === undefined || dataRemoveRoleUser == null) {
                                    roleembed.setDescription(`${lang.admin.roles.norolelist}`)
                                    await interaction.reply({embeds: [roleembed]});
                                } else if (dataRemoveRoleUser != undefined || dataRemoveRoleUser != null) {
                                    Del.roleForUser(channelRoleId);
                                    roleembed.setColor('DarkGreen')
                                        .setDescription(`${lang.admin.roles.therole} ${stringGetRole} ${lang.admin.roles.removeuser}`)
                                    await interaction.reply({embeds: [roleembed]});
                                };
                            };
                            //Check if argument is Nsfw.
                            if (stringChoicesValueRemove === 'nsfw') {
                                let dataRemoveRoleNsfw;
                                dataRemoveRoleNsfw = Get.roleForNsfw(channelRoleId)
                                if (dataRemoveRoleNsfw === undefined || dataRemoveRoleNsfw == null) {
                                    roleembed.setDescription(`${lang.admin.roles.norolelist}`)
                                    await interaction.reply({embeds: [roleembed]});
                                } else if (dataRemoveRoleNsfw != undefined || dataRemoveRoleNsfw != null) {
                                    Del.roleForNsfw(channelRoleId);
                                    roleembed.setColor('DarkGreen')
                                        .setDescription(`${lang.admin.roles.therole} ${stringGetRole} ${lang.admin.roles.removensfw}`)
                                    await interaction.reply({embeds: [roleembed]});
                                };
                            };
                            //Check if argument is Mute.
                            if (stringChoicesValueRemove === 'mute') {
                                let dataRemoveRoleMute;
                                dataRemoveRoleMute = Get.roleForNsfw(`${getBotConfigID}-mute`)
                                if (dataRemoveRoleMute === undefined || dataRemoveRoleMute == null) {
                                    roleembed.setDescription(`${lang.admin.roles.norolelist}`)
                                    await interaction.reply({embeds: [roleembed]});
                                } else if (dataRemoveRoleMute != undefined || dataRemoveRoleMute != null) {
                                    Del.roleForUser(`${getBotConfigID}-mute`);
                                    roleembed.setColor('DarkGreen')
                                        .setDescription(`${lang.admin.roles.therole} ${stringGetRole} ${lang.admin.roles.removeuser}`)
                                    await interaction.reply({embeds: [roleembed]});
                                };
                            };
                            //Check if argument is All.
                            if (stringChoicesValueRemove === 'all') {
                                roleembed.setColor('Red')
                                    .setDescription(`${lang.admin.roles.nomassremove}`)
                                await interaction.reply({embeds: [roleembed]});
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
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'roles\' returned \'null / undefined\'.`);
        };
    }
};