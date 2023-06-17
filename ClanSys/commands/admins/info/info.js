
// Require and set
const Discord = require('discord.js');
const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = Discord;
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
const versions = require('../../../../Database/updates/versions.json');
require('dotenv').config();

module.exports = {
	cooldown: 5,
	admin: 'true',
	nsfw: 'false',
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get Information on an subject.')
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
                .setDescription('Infos on You and other Members.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('bot')
                .setDescription('Infos to this bot.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('member')
                .setDescription('Infos on You and other Members.')
                .addUserOption(option =>
                    option
                        .setName('member')
                        .setDescription('The Member')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Infos on This Server.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('channel')
                .setDescription('Infos on this and other Channel.')
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('The Channel')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('message')
                .setDescription('Infos on this and other Message.')
                .addStringOption(option =>
                    option
                        .setName('message')
                        .setDescription('The Message')
                        .setRequired(true)
                )
        )
    ,
    async execute(interaction) {
        if (interaction != null || interaction.channel.id != null || interaction.guild.id != null) {
            // SQLite
            const { Get } = require('../../../../ClanCore/Modules/functions/sqlite/prepare');
            // Data Null
            let dataLang;
            let dataCommandAdmin;
            let dataChannelAdmin;
            let dataChannelAdminGuild;
            // Data Get
            let getGuildID = `${interaction.guild.id}`;
            let getBotConfigID = `${interaction.guild.id}-${interaction.guild.shardId}`;
            let getChannelRoleID = `${getGuildID}-${interaction.guild.shardId}-${interaction.channel.id}`;
            dataLang = Get.botConfig(getBotConfigID);
            dataCommandAdmin = Get.onOffForCommandAdmin(getBotConfigID);
            dataChannelAdmin = Get.channelForAdmin(getChannelRoleID);
            dataChannelAdminGuild = Get.channelForAdminByGuild(getGuildID);
            // Data Check
            if (dataLang == null) { dataLang = { Lang: `./Database/lang/en_US.json` }; };
            if (dataCommandAdmin == null) { dataCommandAdmin = { Channels: 'true' }; };
            if (dataChannelAdminGuild == null) { dataChannelAdmin = { ChannelID: `${interaction.channel.id}` }; };
            // Context

            let lang = require(`../../../.${dataLang.Lang}`);
            if (dataCommandAdmin.Info === 'true') {
                let permissions = interaction.member.permissions;
                if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                    if (dataChannelAdmin != null && interaction.channel.id === dataChannelAdmin.ChannelID) {
                        const configEmbed = new EmbedBuilder()
                        .setColor('DarkGreen')
                        if (interaction.options.getSubcommand() === 'help') {
                            configEmbed.setTitle(`${lang.admin.info.titlehelp}`)
                            .addFields([
                                { name: `${lang.admin.info.helpfield1}`, value: `${lang.admin.info.helpfield2}`, inline: false },
                            ]);
                            await interaction.reply({ embeds: [configEmbed] });
                        };
                        if (interaction.options.getSubcommand() === 'bot') {
                            let p = versions.update.dependencies;
                            let t = p.replace(/, /gi, '\n');
                            configEmbed.setTitle(`${lang.admin.info.titlebot}`)
                            .addFields([
                                { name: `${lang.admin.info.botfield1}`, value: `${lang.admin.info.botfield4}` },
                                { name: `${lang.admin.info.botfield2}`, value: `${versions.update.id}`, inline: true },
                                { name: `${lang.admin.info.botfield3}`, value: `${versions.update.name}`, inline: true },
                                // { name: '\u200B', value: '\u200B' },
                            // ])
                            // .addFields([
                                { name: `${lang.admin.info.botfield5}`, value: `ㅤ/`, inline: true },
                                { name: `${lang.admin.info.id}`, value: `${interaction.user.id}`, inline: true },
                                // { name: 'Dependencies', value: `${t}`, inline: false },
                            ]);
                            await interaction.reply({ embeds: [configEmbed] });
                        };
                        if (interaction.options.getSubcommand() === 'member') {
                            const infoUserEmbed = new EmbedBuilder()
                            .setColor('DarkGreen')
                            .setTitle(`${lang.admin.info.titleuser}`)
                            const stringGetUser = interaction.options.getUser('member');
                            // console.log(stringGetUser);
                            if (stringGetUser) {
                                // const taggedUser = interaction.mentions.users.first();
                                let guild = interaction.client.guilds.cache.get(getGuildID);
                                let memberTagged = guild.members.cache.get(stringGetUser.id);
                                infoUserEmbed
                                .setAuthor({name: memberTagged.user.tag, iconURL: memberTagged.user.avatarURL({dynamic: true, size: 512})})
                                .setThumbnail(memberTagged.user.avatarURL({dynamic: true, size: 512}))
                                .addFields([
                                    { name: `${lang.admin.info.id}`, value: `${memberTagged.user.id}` },
                                    { name: `${lang.admin.info.userfield1}`, value: `${memberTagged.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || `${lang.admin.info.none}`}` },
                                    { name: `${lang.admin.info.userfield2}`, value: `<t:${parseInt(memberTagged.joinedTimestamp / 1000)}:R>`, inline: true },
                                    { name: `${lang.admin.info.userfield3}`, value: `<t:${parseInt(memberTagged.user.createdTimestamp / 1000)}:R>` },
                                ]);
                                await interaction.reply({embeds: [infoUserEmbed] });
                            };
                        };
                        if (interaction.options.getSubcommand() === 'server') {
                            const infoServerEmbed = new EmbedBuilder()
                            .setColor('DarkGreen')
                            .setTitle(`${lang.admin.info.titleserver}`)
                                let guild = interaction.client.guilds.cache.get(getGuildID);
                                let owner = guild.members.cache.get(guild.ownerId);
                                infoServerEmbed
                                .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true, size: 512})})
                                .setThumbnail(guild.iconURL({dynamic: true, size: 512}))
                                .addFields([
                                    { name: `${lang.admin.info.id}`, value: `${guild.id}` },
                                    { name: `${lang.admin.info.serverfield1}`, value: `${owner.user.username} ${owner.user.discriminator}` },
                                    { name: `${lang.admin.info.serverfield2}`, value: `${guild.memberCount}` },
                                    { name: `${lang.admin.info.serverfield3}`, value: `<t:${parseInt(guild.createdTimestamp / 1000)}:R>` },
                                ]);
                                await interaction.reply({embeds: [infoServerEmbed] });
                        };
                        if (interaction.options.getSubcommand() === 'channel') {
                            const infoChannelEmbed = new EmbedBuilder()
                            .setColor('DarkGreen')
                            .setTitle(`${lang.admin.info.titlechannel}`)
                            const stringGetChannel = interaction.options.getChannel('channel');
                            let channelId = stringGetChannel;
                            let guild = interaction.client.guilds.cache.get(getGuildID);
                            let category = guild.channels.cache.get(channelId.parentId);
                            infoChannelEmbed.setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true, size: 512})})
                            .setThumbnail(guild.iconURL({dynamic: true, size: 512}))
                            .addFields([
                                { name: `${lang.admin.info.id}`, value: `${channelId.id}` },
                                { name: `${lang.admin.info.channelfield1}`, value: `<#${channelId.id}>` },
                            ]);
                            if (category) {
                                infoChannelEmbed.addFields([
                                    { name: `${lang.admin.info.channelfield2}`, value: `${category.name}` },
                                ]);
                            };
                            infoChannelEmbed.addFields([
                                { name: `${lang.admin.info.channelfield3}`, value: `${channelId.topic || `${lang.admin.info.none}`}` },
                                { name: `${lang.admin.info.channelfield4}`, value: `${channelId.nsfw}` },
                                { name: `${lang.admin.info.channelfield5}`, value: `<t:${parseInt(channelId.createdTimestamp / 1000)}:R>` },
                            ]);
                            await interaction.reply({embeds: [infoChannelEmbed] });
                        };
                        if (interaction.options.getSubcommand() === 'message') {
                            const infoMessageEmbed = new EmbedBuilder()
                            .setColor('DarkGreen')
                            .setTitle(`${lang.admin.info.titlemessage}`)
                            const stringGetMessage = interaction.options.getString('message');
                            if (!isNaN(stringGetMessage)) {
                                let channelInfoId = interaction.channel.id;
                                let guild = interaction.client.guilds.cache.get(getGuildID);
                                let channelInfo = guild.channels.cache.get(channelInfoId);
                                let messageInfo = channelInfo.messages.fetch(stringGetMessage);
                                let messageAwait = await messageInfo;
                                infoMessageEmbed
                                .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true, size: 512})})
                                .setThumbnail(guild.iconURL({dynamic: true, size: 512}))
                                .addFields([
                                    { name: `${lang.admin.info.id}`, value: `${messageAwait.id}` },
                                    { name: `${lang.admin.info.messagefield1}`, value: `${messageAwait.author.username} ${messageAwait.author.discriminator}` },
                                    { name: `${lang.admin.info.messagefield2}`, value: `<#${messageAwait.channelId}>` },
                                    { name: `${lang.admin.info.messagefield3}`, value: `${messageAwait.content || `${lang.admin.info.noneembed}`}` },
                                    { name: `${lang.admin.info.messagefield4}`, value: `<t:${parseInt(messageAwait.createdTimestamp / 1000)}:R>` },
                                ]);
                                await interaction.reply({embeds: [infoMessageEmbed] });
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
            console.log(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'info\' returned \'null / undefined\'.`);
        };
    },
};