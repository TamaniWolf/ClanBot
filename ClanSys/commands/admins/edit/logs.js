
const Discord = require('discord.js');
const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = Discord;
require('dotenv').config();
module.exports = {
    data: new SlashCommandBuilder()
        .setName('logs')
        .setDescription('Setting Logs')
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
                .setDescription('list')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('channel')
                .setDescription('Channel')
                .addStringOption(option =>
                    option
                        .setName('channel')
                        .setDescription('Channel')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Create.', value: 'Creating' },
                            { name: 'Delete', value: 'Deleting' },
                            { name: 'Update', value: 'Updating' },
                            { name: 'Pins Update', value: 'Pins_Update' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('onoff')
                        .setDescription('ON/OFF')
                        .setRequired(true)
                        .addChoices(
                            { name: 'ON', value: 'true' },
                            { name: 'OFF', value: 'false' },
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('emoji')
                .setDescription('Emoji')
                .addStringOption(option =>
                    option
                        .setName('emoji')
                        .setDescription('Emoji')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Create', value: 'Creating'},
                            { name: 'Delete', value: 'Deleting'},
                            { name: 'Update', value: 'Updating'},
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('onoff')
                        .setDescription('ON/OFF')
                        .setRequired(true)
                        .addChoices(
                            { name: 'ON', value: 'true' },
                            { name: 'OFF', value: 'false' },
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('message')
                .setDescription('Message')
                .addStringOption(option =>
                    option
                        .setName('message')
                        .setDescription('Message')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Delete', value: 'Deleting' },
                            { name: 'Bulk Delete', value: 'Bulk_Delete' },
                            { name: 'Update', value: 'Updating' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('onoff')
                        .setDescription('ON/OFF')
                        .setRequired(true)
                        .addChoices(
                            { name: 'ON', value: 'true' },
                            { name: 'OFF', value: 'false' },
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('roles')
                .setDescription('Roles')
                .addStringOption(option =>
                    option
                        .setName('roles')
                        .setDescription('Roles')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Create', value: 'Creating' },
                            { name: 'Delete', value: 'Deleting' },
                            { name: 'Update', value: 'Updating' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('onoff')
                        .setDescription('ON/OFF')
                        .setRequired(true)
                        .addChoices(
                            { name: 'ON', value: 'true' },
                            { name: 'OFF', value: 'false' },
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('invite')
                .setDescription('Invite')
                .addStringOption(option =>
                    option
                        .setName('invite')
                        .setDescription('Invite')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Create', value: 'Creating' },
                            { name: 'Delete', value: 'Deteling' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('onoff')
                        .setDescription('ON/OFF')
                        .setRequired(true)
                        .addChoices(
                            { name: 'ON', value: 'true' },
                            { name: 'OFF', value: 'false' },
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('event')
                .setDescription('Event')
                .addStringOption(option =>
                    option
                        .setName('event')
                        .setDescription('Event')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Create', value: 'Creating' },
                            { name: 'Delete', value: 'Deteling' },
                            { name: 'Update', value: 'Updating' },
                            { name: 'User Add', value: 'User_Add' },
                            { name: 'User Remove', value: 'User_Remove' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('onoff')
                        .setDescription('ON/OFF')
                        .setRequired(true)
                        .addChoices(
                            { name: 'ON', value: 'true' },
                            { name: 'OFF', value: 'false' },
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('member')
                .setDescription('Member')
                .addStringOption(option =>
                    option
                        .setName('member')
                        .setDescription('Member')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Add', value: 'Adding' },
                            { name: 'Remove', value: 'Removing' },
                            { name: 'Update', value: 'Updating' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('onoff')
                        .setDescription('ON/OFF')
                        .setRequired(true)
                        .addChoices(
                            { name: 'ON', value: 'true' },
                            { name: 'OFF', value: 'false' },
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban')
                .setDescription('Ban')
                .addStringOption(option =>
                    option
                        .setName('ban')
                        .setDescription('Ban')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Add', value: 'Adding' },
                            { name: 'Remove', value: 'Removing' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('onoff')
                        .setDescription('ON/OFF')
                        .setRequired(true)
                        .addChoices(
                            { name: 'ON', value: 'true' },
                            { name: 'OFF', value: 'false' },
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('guild')
                .setDescription('Server')
                .addStringOption(option =>
                    option
                        .setName('guild')
                        .setDescription('Server')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Add', value: 'Adding' },
                            { name: 'Remove', value: 'Removing' },
                            { name: 'Update', value: 'Updating' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('onoff')
                        .setDescription('ON/OFF')
                        .setRequired(true)
                        .addChoices(
                            { name: 'ON', value: 'true' },
                            { name: 'OFF', value: 'false' },
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('misc')
                .setDescription('Misc')
                .addStringOption(option =>
                    option
                        .setName('misc')
                        .setDescription('Misc')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Integrations Update', value: 'integrations_update' },
                            { name: 'Command Permissions Update', value: 'command_permissions_update' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('onoff')
                        .setDescription('ON/OFF')
                        .setRequired(true)
                        .addChoices(
                            { name: 'ON', value: 'true' },
                            { name: 'OFF', value: 'false' },
                        )
                )
        )
        ,
    prefix: 'true',    // Prefix = 'true', No Prefix = 'false', Slash Command = '/'.
    nsfw: 'false',       // NSFW variable = 'true', No NSFW variable = 'false'.
    admin: 'true',      // Admin Command = 'true', No Admin Command = 'false'.
    guildOnly: true,
    async execute(interaction) {
        if (interaction != null || interaction.channel.id != null) {
            // SQLite
            const { Get, Set, Del } = require('../../../../ClanCore/Modules/functions/sqlite/prepare');
            // Data Null
            let dataChannelAdmin;
            let dataChannelAdminGuild;
            let dataLogsChannel;
            let dataLogsEmoji;
            let dataLogsMessage;
            let dataLogsRoles;
            let dataLogsInvite;
            let dataLogsEvent;
            let dataLogsMember;
            let dataLogsBan;
            let dataLogsGuild;
            let dataLogsMisc;
            // Data Get
            let getGuildID = `${interaction.guild.id}`;
            let getBotConfigID = `${interaction.guild.id}-${interaction.guild.shardId}`;
            let getClientID = `${interaction.client.user.id}`;
            let getShardID = `${interaction.guild.shard.id}`;
            let getChannelID = `${interaction.channel.id}`;
            let getChannelLogID = `${getGuildID}-${getShardID}`;
            let getChannelRoleID = `${getGuildID}-${getShardID}-${getChannelID}`;
            dataLang = Get.botConfig(getBotConfigID);
            dataCommandAdmin = Get.onOffForCommandAdmin(getBotConfigID);
            dataChannelAdmin = Get.channelForAdmin(getChannelRoleID);
            dataChannelAdminGuild = Get.channelForAdminByGuild(getGuildID);
            // Data Check
            if (dataLang === null) { dataLang = { Lang: `./Database/lang/en_US.json` }; };
            if (dataCommandAdmin == null) { dataCommandAdmin = { Config: 'true' }; };
            if (dataChannelAdminGuild == null) { dataChannelAdmin = { ChannelID: `${getChannelID}` }; };
            // Context
            dataCommandAdmin = { Logs: 'true' };
            if (dataCommandAdmin.Logs === 'true') {
                let lang = require('../../../.' + dataLang.Lang);
                let permissions = interaction.member.permissions;
                if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                    if (dataChannelAdmin != null && interaction.channel.id === dataChannelAdmin.ChannelID) {
                        const configembed = new EmbedBuilder()
                        .setColor('DarkGreen')
                        .setTitle('Logs')
                        // 
                        // Help
                        if(interaction.options.getSubcommand() === 'help') {
                            configembed.addFields(
                                { name: 'Commands', value: '`logs` - Commands relating to logs.\n`  ⤷ help`    - Displays this help text.\n`  ⤷ channel` - Set\'s Create, Delete, Update for channel \'ON\' or \'OFF\'.\n`  ⤷ emoji`   - Set\'s Create, Delete, Update for emoji \'ON\' or \'OFF\'.\n`  ⤷ message` - Set\'s Delete, Bulk Delete, Update for message \'ON\' or \'OFF\'.\n`  ⤷ roles`   - Set\'s Create, Delete, Update for roles \'ON\' or \'OFF\'.\n`  ⤷ invite`  - Set\'s Create, Delete for invite \'ON\' or \'OFF\'.\n`  ⤷ event`   - Set\'s Create, Delete, Update, User Add, User Remove for event \'ON\' or \'OFF\'.\n`  ⤷ member`  - Set\'s Add, Remove, Update for member \'ON\' or \'OFF\'.\n`  ⤷ Ban`     - Set\'s Add, Remove for Ban \'ON\' or \'OFF\'.\n`  ⤷ guild`   - Set\'s Add, Remove, Update for guild \'ON\' or \'OFF\'.\n`  ⤷ misc`    - Set\'s Integrations Update, Command Permissions Update for misc \'ON\' or \'OFF\'.', inline: false },
                            );
                            await interaction.reply({embeds: [configembed]});
                        };
                        // 
                        // Channel
                        if (interaction.options.getSubcommand() === 'channel') {
                            const stringGetChannel = interaction.options.getString('channel');
                            const stringGetOnOff = interaction.options.getString('onoff');
                            dataLogsChannel = Get.logsForChannel(getChannelLogID);
                            if (dataLogsChannel == null) {
                                dataLogsChannel = { LogsID: `${getChannelLogID}`, GuildID: `${getGuildID}`, Creating: 'true', Deleting: 'true', Updating: 'true', Pins_Update: 'true' };
                            };
                            if (stringGetOnOff === 'true') {
                                if (dataLogsChannel[stringGetChannel] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                dataLogsChannel[stringGetChannel] = 'true';
                                Set.logsForChannel(dataLogsChannel);
                                await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                            } else if (stringGetOnOff === 'false') {
                                if (dataLogsChannel[stringGetChannel] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                dataLogsChannel[stringGetChannel] = 'false';
                                Set.logsForChannel(dataLogsChannel);
                                await interaction.reply({ content: 'Now set to \`OFF\`', ephemeral: true});
                            };
                        };
                        //
                        // Emoji
                        if (interaction.options.getSubcommand() === 'emoji') {
                            const stringGetOnOff = interaction.options.getString('onoff');
                            const stringGetEmoji = interaction.options.getString('emoji');
                            dataLogsEmoji = Get.logsForEmoji(getChannelLogID);
                            if (dataLogsEmoji === undefined || dataLogsEmoji === null) {
                                dataLogsEmoji = { LogsID: `${getChannelLogID}`, GuildID: `${getGuildID}`, Creating: 'true', Deleting: 'true', Updating: 'true' }
                            };
                            if (stringGetOnOff === 'true') {
                                if (dataLogsEmoji[stringGetEmoji] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                dataLogsEmoji[stringGetEmoji] = 'true';
                                Set.logsForEmoji(dataLogsEmoji);
                                await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                            } else if (stringGetOnOff === 'false') {
                                if (dataLogsEmoji[stringGetEmoji] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                dataLogsEmoji[stringGetEmoji] = 'false';
                                Set.logsForEmoji(dataLogsEmoji);
                                await interaction.reply({ content: 'Now set to \`OFF\`', ephemeral: true});
                            };
                        };
                        //
                        // Message
                        if (interaction.options.getSubcommand() === 'message') {
                            const stringGetOnOff = interaction.options.getString('onoff');
                            const stringGetMessage = interaction.options.getString('message');
                            dataLogsMessage = Get.logsForMessage(getChannelLogID);
                            if (dataLogsMessage === undefined || dataLogsMessage === null) {
                                dataLogsMessage = { LogsID: `${getChannelLogID}`, GuildID: `${getGuildID}`, Deleting: 'true', Bulk_Delete: 'true', Updating: 'true' };
                            };
                            if (stringGetOnOff === 'true') {
                                if (dataLogsMessage[stringGetMessage] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                dataLogsMessage[stringGetMessage] = 'true';
                                Set.logsForMessage(dataLogsMessage);
                                await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                            } else if (stringGetOnOff === 'false') {
                                if (dataLogsMessage[stringGetMessage] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                dataLogsMessage[stringGetMessage] = 'false';
                                Set.logsForMessage(dataLogsMessage);
                                await interaction.reply({ content: 'Now set to \`OFF\`', ephemeral: true});
                            };
                        };
                        //
                        // Roles
                        if (interaction.options.getSubcommand() === 'roles') {
                            const stringGetOnOff = interaction.options.getString('onoff');
                            const stringGetRoles = interaction.options.getString('roles');
                            dataLogsRoles = Get.logsForRoles(getChannelLogID);
                            if (dataLogsRoles === undefined || dataLogsRoles == null) {
                                dataLogsRoles = { LogsID: `${getChannelLogID}`, GuildID: `${getGuildID}`, Creating: 'true', Deleting: 'true', Updating: 'true' };
                            };
                            if (stringGetOnOff === 'true') {
                                if (dataLogsRoles[stringGetRoles] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                dataLogsRoles[stringGetRoles] = 'true';
                                Set.logsForRoles(dataLogsRoles);
                                await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                            } else if (stringGetOnOff === 'false') {
                                if (dataLogsRoles[stringGetRoles] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                dataLogsRoles[stringGetRoles] = 'false';
                                Set.logsForRoles(dataLogsRoles);
                                await interaction.reply({ content: 'Now set to \`OFF\`', ephemeral: true});
                            };
                        };
                        //
                        // Invite
                        if (interaction.options.getSubcommand() === 'invite') {
                            const stringGetOnOff = interaction.options.getString('onoff');
                            const stringGetInvite = interaction.options.getString('invite');
                            dataLogsInvite = Get.logsForInvite(getChannelLogID);
                            if (dataLogsInvite === undefined || dataLogsInvite === null) {
                                dataLogsInvite = { LogsID: `${getChannelLogID}`, GuildID: `${getGuildID}`, Creating: 'true', Deleting: 'true' };
                            };
                            if (stringGetOnOff === 'true') {
                                if (dataLogsInvite[stringGetInvite] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                dataLogsInvite[stringGetInvite] = 'true';
                                Set.logsForInvite(dataLogsInvite);
                                await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                            } else if (stringGetOnOff === 'false') {
                                if (dataLogsInvite[stringGetInvite] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                dataLogsInvite[stringGetInvite] = 'false';
                                Set.logsForInvite(dataLogsInvite);
                                await interaction.reply({ content: 'Now set to \`OFF\`', ephemeral: true});
                            };
                        };
                        //
                        // Event
                        if (interaction.options.getSubcommand() === 'event') {
                            const stringGetOnOff = interaction.options.getString('onoff');
                            const stringGetEvent = interaction.options.getString('event');
                            dataLogsEvent = Get.logsForEvent(getChannelLogID);
                            if (dataLogsEvent === undefined || dataLogsEvent === null) {
                                dataLogsEvent = { LogsID: `${getChannelLogID}`, GuildID: `${getGuildID}`, Creating: 'true', Deleting: 'true', Updating: 'true', User_Add: 'true', User_Remove: 'true' };
                            };
                            if (stringGetOnOff === 'true') {
                                if (dataLogsEvent[stringGetEvent] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                dataLogsEvent[stringGetEvent] = 'true';
                                Set.logsForEvent(dataLogsEvent);
                                await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                            } else if (stringGetOnOff === 'false') {
                                if (dataLogsEvent[stringGetEvent] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                dataLogsEvent[stringGetEvent] = 'false';
                                Set.logsForEvent(dataLogsEvent);
                                await interaction.reply({ content: 'Now set to \`OFF\`', ephemeral: true});
                            };
                        };
                        // 
                        // Member
                        if (interaction.options.getSubcommand() === 'member') {
                            const stringGetOnOff = interaction.options.getString('onoff');
                            const stringGetMember = interaction.options.getString('member');
                            dataLogsMember = Get.logsForMember(getChannelLogID);
                            if (dataLogsMember === undefined || dataLogsMember === null) {
                                dataLogsMember = { LogsID: `${getChannelLogID}`, GuildID: `${getGuildID}`, Adding: 'true', Removing: 'true', Updating: 'true' };
                            };
                            if (stringGetOnOff === 'true') {
                                if (dataLogsMember[stringGetMember] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                dataLogsMember[stringGetMember] = 'true';
                                Set.logsForMember(dataLogsMember);
                                await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                            } else if (stringGetOnOff === 'false') {
                                if (dataLogsMember[stringGetMember] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                dataLogsMember[stringGetMember] = 'false';
                                Set.logsForMember(dataLogsMember);
                                await interaction.reply({ content: 'Now set to \`OFF\`', ephemeral: true});
                            };
                        };
                        // 
                        // Ban
                        if (interaction.options.getSubcommand() === 'ban') {
                            const stringGetOnOff = interaction.options.getString('onoff');
                            const stringGetBan = interaction.options.getString('ban');
                            dataLogsBan = Get.logsForBan(getChannelLogID);
                            if (dataLogsBan === undefined || dataLogsBan === null) {
                                dataLogsBan = { LogsID: `${getChannelLogID}`, GuildID: `${getGuildID}`, Adding: 'true', Removing: 'true' };
                            };
                            if (stringGetOnOff === 'true') {
                                if (dataLogsBan[stringGetBan] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                dataLogsBan[stringGetBan] = 'true';
                                Set.logsForBan(dataLogsBan);
                                await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                            } else if (stringGetOnOff === 'false') {
                                if (dataLogsBan[stringGetBan] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                dataLogsBan[stringGetBan] = 'false';
                                Set.logsForBan(dataLogsBan);
                                await interaction.reply({ content: 'Now set to \`OFF\`', ephemeral: true});
                            };
                        };
                        // 
                        // Guild
                        if (interaction.options.getSubcommand() === 'guild') {
                            const stringGetOnOff = interaction.options.getString('onoff');
                            const stringGetGuild = interaction.options.getString('guild');
                            dataLogsGuild = Get.logsForGuild(getChannelLogID);
                            if (dataLogsGuild === undefined || dataLogsGuild === null) {
                                dataLogsGuild = { LogsID: `${getChannelLogID}`, GuildID: `${getGuildID}`, Adding: 'true', Removing: 'true', Updating: 'true' };
                            };
                            if (stringGetOnOff === 'true') {
                                if (dataLogsGuild[stringGetGuild] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                dataLogsGuild[stringGetGuild] = 'true';
                                Set.logsForGuild(dataLogsGuild);
                                await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                            } else if (stringGetOnOff === 'false') {
                                if (dataLogsGuild[stringGetGuild] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                dataLogsGuild[stringGetGuild] = 'false';
                                Set.logsForGuild(dataLogsGuild);
                                await interaction.reply({ content: 'Now set to \`OFF\`', ephemeral: true});
                            };
                        };
                        // 
                        // Misc
                        if (interaction.options.getSubcommand() === 'misc') {
                            const stringGetOnOff = interaction.options.getString('onoff');
                            const stringGetMisc = interaction.options.getString('misc');
                            dataLogsMisc = Get.logsForMisc(getChannelLogID);
                            if (dataLogsMisc === undefined || dataLogsMisc === null) {
                                dataLogsMisc = { LogsID: `${getChannelLogID}`, GuildID: `${getGuildID}`, Integrations_Update: 'true', Command_Permissions_Update: 'true' };
                            };
                            if (stringGetOnOff === 'true') {
                                if (dataLogsMisc[stringGetMisc] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                dataLogsMisc[stringGetMisc] = 'true';
                                Set.logsForMisc(dataLogsMisc);
                                await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                            } else if (stringGetOnOff === 'false') {
                                if (dataLogsMisc[stringGetMisc] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                dataLogsMisc[stringGetMisc] = 'false';
                                Set.logsForMisc(dataLogsMisc);
                                await interaction.reply({ content: 'Now set to \`OFF\`', ephemeral: true});
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
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'config\' returned \'null / undefined\'.`);
        };
    },
};