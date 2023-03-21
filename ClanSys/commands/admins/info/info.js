
const Discord = require('discord.js');
const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = Discord;
const versions = require('../../../../Database/updates/versions.json');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get Information on an subject.')
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
        ),
    prefix: 'true',    // Prefix = 'true', No Prefix = 'false', Slash Command = '/'.
    nsfw: 'false',       // NSFW variable = 'true', No NSFW variable = 'false'.
    admin: 'true',      // Admin Command = 'true', No Admin Command = 'false'.
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
            if (dataCommandAdmin.Info === 'true') {
                let lang = require('../../../.' + dataLang.Lang);
                let permissions = interaction.member.permissions;
                if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                    if (dataChannelAdmin != null && interaction.channel.id === dataChannelAdmin.ChannelID) {
                        const configEmbed = new EmbedBuilder()
                        .setColor('DarkGreen')
                        if (interaction.options.getSubcommand() === 'help') {
                            configEmbed.setTitle('Info - Help')
                            .addFields([
                                { name: 'Commands', value: '`info` - Commands relating to infoss.\n` ⤷help` - Displays this help text.\n` ⤷bot` - Get infos about the Bot.\n` ⤷member` - Get info about a Member.\n` ⤷server` - Get info about the Server.\n` ⤷channel` - Get info about a Channel.\n` ⤷message` - Get info about a Message.', inline: false },
                            ]);
                            await interaction.reply({ embeds: [configEmbed] });
                        };
                        if (interaction.options.getSubcommand() === 'bot') {
                            let p = versions.update.dependencies;
                            let t = p.replace(/, /gi, '\n');
                            configEmbed.setTitle('Bot Info')
                            .addFields([
                                { name: 'Created', value: 'Bot created on April the 5th of 2020.' },
                                { name: 'Release:', value: `${versions.update.id}`, inline: true },
                                { name: 'Version:', value: `${versions.update.name}`, inline: true },
                                // { name: '\u200B', value: '\u200B' },
                            // ])
                            // .addFields([
                                { name: 'Prefix:', value: `ㅤ/`, inline: true },
                                { name: 'ID', value: `${interaction.user.id}`, inline: true },
                                // { name: 'Dependencies', value: `${t}`, inline: false },
                            ]);
                            await interaction.reply({ embeds: [configEmbed] });
                        };
                        if (interaction.options.getSubcommand() === 'member') {
                            const infoUserEmbed = new EmbedBuilder()
                            .setColor('DarkGreen')
                            .setTitle('User Info')
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
                                    { name: "ID", value: `${memberTagged.user.id}` },
                                    { name: "Roles", value: `${memberTagged.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "None"}` },
                                    { name: "Joined as Member", value: `<t:${parseInt(memberTagged.joinedTimestamp / 1000)}:R>`, inline: true },
                                    { name: "Joined as Discord User", value: `<t:${parseInt(memberTagged.user.createdTimestamp / 1000)}:R>` },
                                ]);
                                await interaction.reply({embeds: [infoUserEmbed] });
                            };
                        };
                        if (interaction.options.getSubcommand() === 'server') {
                            const infoServerEmbed = new EmbedBuilder()
                            .setColor('DarkGreen')
                            .setTitle('Server Info')
                                let guild = interaction.client.guilds.cache.get(getGuildID);
                                let owner = guild.members.cache.get(guild.ownerId);
                                infoServerEmbed
                                .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true, size: 512})})
                                .setThumbnail(guild.iconURL({dynamic: true, size: 512}))
                                .addFields([
                                    { name: "ID", value: `${guild.id}` },
                                    { name: "Owner", value: `${owner.user.username} ${owner.user.discriminator}` },
                                    { name: "Member Count", value: `${guild.memberCount}` },
                                    { name: "Server Created", value: `<t:${parseInt(guild.createdTimestamp / 1000)}:R>` },
                                ]);
                                await interaction.reply({embeds: [infoServerEmbed] });
                        };
                        if (interaction.options.getSubcommand() === 'channel') {
                            const infoChannelEmbed = new EmbedBuilder()
                            .setColor('DarkGreen')
                            .setTitle('Channel Info')
                            const stringGetChannel = interaction.options.getChannel('channel');
                            let channelId = stringGetChannel;
                            let guild = interaction.client.guilds.cache.get(getGuildID);
                            let category = guild.channels.cache.get(channelId.parentId);
                            infoChannelEmbed.setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true, size: 512})})
                            .setThumbnail(guild.iconURL({dynamic: true, size: 512}))
                            .addFields([
                                { name: "ID", value: `${channelId.id}` },
                                { name: "Name", value: `<#${channelId.id}>` },
                            ]);
                            if (category) {
                                infoChannelEmbed.addFields([
                                    { name: "In Category", value: `${category.name}` },
                                ]);
                            };
                            infoChannelEmbed.addFields([
                                { name: "Topic", value: `${channelId.topic || "None"}` },
                                { name: "NSFW", value: `${channelId.nsfw}` },
                                { name: "Channel Created", value: `<t:${parseInt(channelId.createdTimestamp / 1000)}:R>` },
                            ]);
                            await interaction.reply({embeds: [infoChannelEmbed] });
                        };
                        if (interaction.options.getSubcommand() === 'message') {
                            const infoMessageEmbed = new EmbedBuilder()
                            .setColor('DarkGreen')
                            .setTitle('Message Info')
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
                                    { name: "ID", value: `${messageAwait.id}` },
                                    { name: "Author", value: `${messageAwait.author.username} ${messageAwait.author.discriminator}` },
                                    { name: "In Channel", value: `<#${messageAwait.channelId}>` },
                                    { name: "Content", value: `${messageAwait.content || "None/Embed"}` },
                                    { name: "Message Created", value: `<t:${parseInt(messageAwait.createdTimestamp / 1000)}:R>` },
                                ]);
                                await interaction.reply({embeds: [infoMessageEmbed] });
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
            console.log(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'info\' returned \'null / undefined\'.`);
        };
    },
};