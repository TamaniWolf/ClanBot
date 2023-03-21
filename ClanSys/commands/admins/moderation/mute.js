
const { PermissionsBitField, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('mute someone')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('user')
                .setRequired(true)
        )
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
        ,
    nsfw: 'false',       // NSFW variable = 'true', No NSFW variable = 'false'.
    admin: 'true',      // Admin Command = 'true', No Admin Command = 'false'.
    async execute(interaction) {
        if (interaction != null || interaction.channel.id != null || interaction.guild.id != null) {
            // SQLite
            const { Get } = require('../../../../ClanCore/Modules/functions/sqlite/prepare');
            // Data Null
            let dataLang;
            let dataCommandAdmin;
            let dataChannelAdminGuild;
            // Data Get
            let getGuildID = `${interaction.guild.id}`;
            let getBotConfigID = `${interaction.guild.id}-${interaction.guild.shardId}`;
            let getChannelRoleID = `${getGuildID}-${interaction.guild.shardId}-${interaction.channel.id}`;
            dataLang = Get.botConfig(getGuildID);
            dataCommandAdmin = Get.onOffForCommandAdmin(getBotConfigID);
            dataChannelAdmin = Get.channelForAdmin(getChannelRoleID);
            dataChannelAdminGuild = Get.channelForAdminByGuild(getGuildID);
            // Data Check
            if (dataLang == null) { dataLang = { Lang: `./Database/lang/en_US.json` }; };
            if (dataCommandAdmin == null) { dataCommandAdmin = { Mute: 'true' }; };
            if (dataChannelAdminGuild == null) { dataChannelAdmin = { ChannelID: `${interaction.channel.id}` }; };
            // Context
            if (dataCommandAdmin.Mute === 'true') {
                let permissions = interaction.member.permissions;
                if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                    // Channel Admin
                    let dataRoleUser;
                    let getRoleID = `${getBotConfigID}-mute`;
                    dataRoleUser = Get.roleForUser(getRoleID);
                    if (dataRoleUser == null) {
                        await interaction.reply({ content: 'The Mute Role is not set yet.', ephemeral: true });
                        return;
                    };
                    const stringUserOption = interaction.options.getUser('user');
                    let guild = interaction.client.guilds.cache.get(getGuildID);
                    let member = guild.members.cache.get(stringUserOption.id);
                    member.roles.add(dataRoleUser.RoleID);
                    await interaction.reply({ content: `You just muted ${stringUserOption}.`, ephemeral: true });
                // Error Messages
                } else {
                    await interaction.reply({ content: 'You are either not an Admin or you have not enought permissions.', ephemeral: true });
                };
            } else {
                await interaction.reply({ content: 'This command is not available right now.', ephemeral: true });
            };
        } else {
            console.log(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'mute\' returned \'null / undefined\'.`);
        };
    },
};