
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
        .setName('restart')
        .setDescription('restarting the bot')
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
    ,
    async execute(interaction) {
        if (interaction != null || interaction.channel.id != null) {
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
            if (dataLang == null) { dataLang = { Lang: './Database/lang/en_US.json' } };
            if (dataCommandAdmin == null) {return;};
            if (dataCommandAdmin.Restart === 'false') { dataCommandAdmin = { Restart: 'true' }; };
            if (dataChannelAdminGuild == null) { dataChannelAdmin = { ChannelID: `${interaction.channel.id}` }; };
            // Context

            let lang = require(`../../../.${dataLang.Lang}`)
            if (dataCommandAdmin.Restart === 'true') {
                let permissions = interaction.member.permissions;
                if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                    if (dataChannelAdmin != null && interaction.channel.id === dataChannelAdmin.ChannelID) {
                        // console.log('[' + DateTime.utc().toFormat(timeFormat) + '] Restarting...');
                        // await interaction.reply({ content: 'Restarting...' });
                        await interaction.reply({ content: `${lang.admin.restart.nope}`, ephemeral: true });
                        // running the script to start the bot.
                        //
                        // Stop the bot so it can be started by the script.
                        // process.exit(0);
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
            console.log(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'restart\' returned \'null / undefined\'.`);
        };
    },
};