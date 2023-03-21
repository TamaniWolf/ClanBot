
const Discord = require('discord.js');
const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = Discord;
require('dotenv').config();
module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('editing config')
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
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('list')
        //         .setDescription('list')
        // )
        .addSubcommandGroup(subcommandgroup =>
            subcommandgroup
                .setName('command')
                .setDescription('commands')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('admin')
                        .setDescription('Admin commands')
                        .addStringOption(option =>
                            option
                                .setName('admin-command1')
                                .setDescription('Admin command')
                                .setRequired(true)
                                .addChoices(
                                    { name: 'None.', value: 'admin1-None' },
                                    { name: 'Channels', value: 'admin1-Channels' },
                                    { name: 'Config', value: 'admin1-Config' },
                                    { name: 'Language', value: 'admin1-Language' },
                                    { name: 'Reaction', value: 'admin1-Reaction' },
                                    { name: 'Roles', value: 'admin1-Roles' },
                                    { name: 'Info', value: 'admin1-Info' },
                                    { name: 'Patchnotes', value: 'admin1-Patchnotes' },
                                    { name: 'Reload', value: 'admin1-Reload' },
                                    { name: 'Restart', value: 'admin1-Restart' },
                                    { name: 'Shutdown', value: 'admin1-Shutdown' },
                                    { name: 'Ban', value: 'admin1-Ban' },
                                    { name: 'Kick', value: 'admin1-Kick' },
                                    { name: 'Mute', value: 'admin1-Mute' },
                                    { name: 'Unmute', value: 'admin1-Unmute' },
                                    { name: 'Adminhelp', value: 'admin1-Adminhelp' },
                                    { name: 'Clear', value: 'admin1-Clear' },
                                    { name: 'Ping', value: 'admin1-Ping' },
                                )
                        )
                        .addStringOption(option =>
                            option
                                .setName('admin-command2')
                                .setDescription('Admin command')
                                .setRequired(true)
                                .addChoices(
                                    { name: 'None.', value: 'admin2-None' },
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
                        .setDescription('Member commands')
                        .addStringOption(option =>
                            option
                                .setName('member-command1')
                                .setDescription('Member command')
                                .setRequired(true)
                                .addChoices(
                                    { name: 'None', value: 'member1-None' },
                                    { name: 'Convert', value: 'member1-Convert' },
                                    { name: 'Birthday', value: 'member1-Birthday' },
                                    { name: 'Blush', value: 'member1-Blush' },
                                    { name: 'Grouphug', value: 'member1-Grouphug' },
                                    { name: 'Growl', value: 'member1-Growl' },
                                    { name: 'Hug', value: 'member1-Hug' },
                                    { name: 'Hydrate', value: 'member1-Hydrate' },
                                    { name: 'Slap', value: 'member1-Slap' },
                                    { name: 'Help', value: 'member1-Help' },
                                )
                        )
                        .addStringOption(option =>
                            option
                                .setName('member-command2')
                                .setDescription('Member command')
                                .setRequired(true)
                                .addChoices(
                                    { name: 'None', value: 'member2-None' },
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
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('database')
                .setDescription('database')
                .addStringOption(option =>
                    option
                        .setName('databases')
                        .setDescription('databases')
                        .setRequired(true)
                        .addChoices(
                            { name: 'CreateDatabase', value: 'database1-Createdatabase'},
                            { name: 'Birthdays', value: 'database1-Birthdays'},
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
                .setDescription('Some Config for the misc.')
                .addStringOption(option =>
                    option
                        .setName('misc')
                        .setDescription('misc')
                        .setRequired(true)
                        .addChoices(
                            { name: 'BotAction', value: 'misc1-Botaction' },
                            { name: 'CommandAction', value: 'misc1-Commandaction' },
                            { name: 'AutoUpdate', value: 'misc1-Autoupdate' },
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
                .setName('reaction')
                .setDescription('reactions')
                .addStringOption(option =>
                    option
                        .setName('reactions')
                        .setDescription('reactions')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Reactions', value: 'reaction1-Reaction_True' },
                            { name: 'Words', value: 'reaction1-Words_True' },
                            { name: 'Words_meep', value: 'reaction1-Words_Meep' },
                            { name: 'Words_haha', value: 'reaction1-Words_Haha' },
                            { name: 'Words_easteregg', value: 'reaction1-Words_Easteregg' },
                            { name: 'Words_gay', value: 'reaction1-Words_Gay' },
                            { name: 'Words_slap', value: 'reaction1-Words_Slap' },
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
                .setName('twitch')
                .setDescription('twitch')
                .addStringOption(option =>
                    option
                        .setName('twitch-handler')
                        .setDescription('Twitch Handler')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Twitch', value: 'twitch1-Twitch' },
                            { name: 'Setup', value: 'twitch1-Setup' },
                            { name: 'Request', value: 'twitch1-Request' },
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
            const { Get, Set } = require('../../../../ClanCore/Modules/functions/sqlite/prepare');
            // Data Null
            let dataLang;
            let dataCommandAdmin;
            let dataChannelAdmin;
            let dataChannelAdminGuild;
            // Data Get
            let getGuildID = `${interaction.guild.id}`;
            let getBotConfigID = `${interaction.guild.id}-${interaction.guild.shardId}`;
            let getChannelID = `${interaction.channel.id}`;
            let getChannelRoleID = `${getBotConfigID}-${getChannelID}`;
            dataLang = Get.botConfig(getBotConfigID);
            dataCommandAdmin = Get.onOffForCommandAdmin(getBotConfigID);
            dataChannelAdmin = Get.channelForAdmin(getChannelRoleID);
            dataChannelAdminGuild = Get.channelForAdminByGuild(getGuildID);
            // Data Check
            if (dataLang == null) { dataLang = { Lang: `./Database/lang/en_US.json` }; };
            if (dataCommandAdmin == null) { dataCommandAdmin = { Config: 'true' }; };
            if (dataChannelAdminGuild == null) { dataChannelAdmin = { ChannelID: `${interaction.channel.id}` }; };
            // Context
            if (dataCommandAdmin.Config === 'true') {
                let lang = require('../../../.' + dataLang.Lang);
                let permissions = interaction.member.permissions;
                if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                    if (dataChannelAdmin != null && interaction.channel.id === dataChannelAdmin.ChannelID) {
                        const configembed = new EmbedBuilder()
                        .setColor('DarkGreen')
                        .setTitle('Configs')
                        if(interaction.options.getSubcommand() === 'help') {
                            configembed.addFields(
                                { name: 'Commands', value: '`config` - Commands relating to config.\n`  ⤷ help`           - Displays this help text.\n`  ⤷ list`           - A list of set Configurations.\n`  ⤷ command admin`  - Set\'s the configs and commands for admins \'ON\' or \'OFF\'.\n`  ⤷ command member` - Set\'s the configs and commands for members \'ON\' or \'OFF\'.\n`  ⤷ database`       - Set\'s the database functions \'ON\' or \'OFF\'.\n`  ⤷ logs`           - Set\'s the logging for bots and commands \'ON\' or \'OFF\'.\n`  ⤷ reaction`       - Set\'s the word and emoji reactions \'ON\' or \'OFF\'.\n`  ⤷ twitch`         - Set\'s the twitch handler and functions \'ON\' or \'OFF\'.\n', inline: false},
                            );
                            await interaction.reply({embeds: [configembed]});
                        };
                        // if(interaction.options.getSubcommand() === 'list') {
                        //     let fullString;
                        //     configembed.setDescription(' ')
                        //     .addFields(
                        //         { name: 'Admin Commands', value: 'a', inline: true },
                        //         { name: 'On/Off', value: 't', inline: true },
                        //         { name: 'Member Commands', value: 'm', inline: true },
                        //         { name: 'On/Off', value: 't', inline: true },
                        //     )
                        //     await interaction.reply({embeds: [configembed]});
                        // };
                        // Command
                        if (interaction.options.getSubcommandGroup() === 'command') {
                            // Admin
                            if (interaction.options.getSubcommand() === 'admin') {
                                const stringGetOnOff = interaction.options.getString('onoff');
                                let dataCommandAdmin;
                                dataCommandAdmin = Get.onOffForCommandAdmin(getBotConfigID);
                                if (dataCommandAdmin.GuildID !== getGuildID) {
                                    dataCommandAdmin = { OnOffID: `${getBotConfigID}`, GuildID: `${getGuildID}`, Channels: 'true', Config: 'true', Language: 'false', Reaction: 'true', Roles: 'true', Info: 'true', Patchnotes: 'true', Reload: 'true', Restart: 'true', Shutdown: 'true', Ban: 'true', Kick: 'true', Mute: 'true', Unmute: 'true', Adminhelp: 'true', Clear: 'true', Ping: 'true' };
                                };
                                const stringGetCommandAdmin1 = interaction.options.getString('admin-command1');
                                const stringGetCommandAdmin2 = interaction.options.getString('admin-command2');
                                let stringGCA = stringGetCommandAdmin1;
                                if (stringGetCommandAdmin1 === 'none') {if(stringGetCommandAdmin2 === 'none'){await interaction.reply({ content: 'Editing Config Canceled', ephemeral: true});return;};stringGCA = stringGetCommandAdmin2};
                                let splitSGCA = stringGCA.split('-');
                                if (stringGetOnOff === 'true') {
                                    if (dataCommandAdmin[splitSGCA[1]] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                    dataCommandAdmin[splitSGCA[1]] = 'true';
                                    Set.onOffForCommandAdmin(dataCommandAdmin);
                                    await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                                } else if (stringGetOnOff === 'false') {
                                    if (dataCommandAdmin[splitSGCA[1]] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                    dataCommandAdmin[splitSGCA[1]] = 'false';
                                    Set.onOffForCommandAdmin(dataCommandAdmin);
                                    await interaction.reply({ content: 'Now set to \`OFF\`', ephemeral: true});
                                };
                            };
                            //
                            // Member
                            if (interaction.options.getSubcommand() === 'member') {
                                const stringGetOnOff = interaction.options.getString('onoff');
                                const stringGetCommandMember1 = interaction.options.getString('member-command1');
                                const stringGetCommandMember2 = interaction.options.getString('member-command2');
                                let dataCommandMember;
                                dataCommandMember = Get.onOffForCommandMember(getBotConfigID);
                                if (dataCommandMember == null) {
                                    dataCommandMember = { Convert: 'true', Birthday: 'true', Blush: 'true', Grouphug: 'true', Growl: 'true', Hug: 'true', Hydrate: 'true', Slap: 'true', Help: 'true' }
                                };
                                let stringGCM = stringGetCommandMember1;
                                if (stringGetCommandMember1 === 'none') {if(stringGetCommandMember2 === 'none'){await interaction.reply({ content: 'Editing Config Canceled', ephemeral: true});return;};stringGCM = stringGetCommandMember2};
                                let splitSGCM = stringGCM.split('-');
                                if (stringGetOnOff === 'true') {
                                    if (dataCommandMember[splitSGCM[1]] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                    dataCommandMember[splitSGCM[1]] = 'true';
                                    Set.onOffForCommandMember(dataCommandMember);
                                    await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                                } else if (stringGetOnOff === 'false') {
                                    if (dataCommandMember[splitSGCM[1]] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                    dataCommandMember[splitSGCM[1]] = 'false';
                                    Set.onOffForCommandMember(dataCommandMember);
                                    await interaction.reply({ content: 'Now set to \`OFF\`', ephemeral: true});
                                };
                            };
                        };
                        //
                        // Database
                        if (interaction.options.getSubcommand() === 'database') {
                            const stringGetOnOff = interaction.options.getString('onoff');
                            const stringGetDatabase = interaction.options.getString('database');
                            let datadatabase;
                            datadatabase = Get.onOffForDatabase(getBotConfigID);
                            if (datadatabase == null) {
                                datadatabase = { CreateDatabase: 'true', Birthdays: 'true' };
                            };
                            let splitSGD = stringGetDatabase.split('-');
                            if (stringGetOnOff === 'true') {
                                if (datadatabase[splitSGD[1]] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                datadatabase[splitSGD[1]] = 'true';
                                Set.onOffForDatabase(datadatabase);
                                await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                            } else if (stringGetOnOff === 'false') {
                                if (datadatabase[splitSGD[1]] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                datadatabase[splitSGD[1]] = 'false';
                                Set.onOffForDatabase(datadatabase);
                                await interaction.reply({ content: 'Now set to \`OFF\`', ephemeral: true});
                            };
                        };
                        //
                        // Config
                        if (interaction.options.getSubcommand() === 'misc') {
                            const stringGetOnOff = interaction.options.getString('onoff');
                            const stringGetLog = interaction.options.getString('misc');
                            let datamisc;
                            datamisc = Get.onOffForMisc(getBotConfigID);
                            if (datamisc == null) {
                                datamisc = { Botaction: 'true', Commandaction: 'true', AutoUpdate: 'true' };
                            };
                            let splitSGM = stringGetLog.split('-');
                            if (stringGetOnOff === 'true') {
                                if (datamisc[splitSGM[1]] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                datamisc[splitSGM[1]] = 'true';
                                Set.onOffForMisc(datamisc);
                                await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                            } else if (stringGetOnOff === 'false') {
                                if (datamisc[splitSGM[1]] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                datamisc[splitSGM[1]] = 'false';
                                Set.onOffForMisc(datamisc);
                                await interaction.reply({ content: 'Now set to \`OFF\`', ephemeral: true});
                            };
                        };
                        //
                        // Reaction
                        if (interaction.options.getSubcommand() === 'reaction') {
                            const stringGetOnOff = interaction.options.getString('onoff');
                            const stringGetReaction = interaction.options.getString('reaction');
                            let datareaction;
                            datareaction = Get.onOffForReaction(getBotConfigID);
                            if (datareaction == null) {
                                datareaction = { Reaction_True: 'true', Words_True: 'true', Words_Meep: 'true', Words_Haha: 'true', Words_Easteregg: 'true', Words_Gay: 'true', Words_Slap: 'true' };
                            };
                            let splitSGR = stringGetReaction.split('-');
                            if (stringGetOnOff === 'true') {
                                if (datareaction[splitSGR[1]] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                datareaction[splitSGR[1]] = 'true';
                                Set.onOffForReaction(datareaction);
                                await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                            } else if (stringGetOnOff === 'false') {
                                if (datareaction[splitSGR[1]] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                datareaction[splitSGR[1]] = 'false';
                                Set.onOffForReaction(datareaction);
                                await interaction.reply({ content: 'Now set to \`OFF\`', ephemeral: true});
                            };
                        };
                        //
                        //Twitch
                        if (interaction.options.getSubcommand() === 'twitch') {
                            const stringGetOnOff = interaction.options.getString('onoff');
                            const stringGetTwitch = interaction.options.getString('twitch-handler');
                            let datatwitch;
                            datatwitch = Get.onOffForTwitch(getBotConfigID);
                            if (datatwitch == null) {
                                datatwitch = { Twitch: 'true', Setup: 'true', Request: 'true' };
                            };
                            let splitSGT = stringGetTwitch.split('-');
                            if (stringGetOnOff === 'true') {
                                if (datatwitch[splitSGT[1]] === 'true') {await interaction.reply({ content: 'This is already set to \`ON\`', ephemeral: true}); return;};
                                datatwitch[splitSGT[1]] = 'true';
                                Set.onOffForTwitch(datatwitch);
                                await interaction.reply({ content: 'Now set to \`ON\`', ephemeral: true});
                            } else if (stringGetOnOff === 'false') {
                                if (datatwitch[splitSGT[1]] === 'false') {await interaction.reply({ content: 'This is already set to \`OFF\`', ephemeral: true}); return;};
                                datatwitch[splitSGT[1]] = 'false';
                                Set.onOffForTwitch(datatwitch);
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