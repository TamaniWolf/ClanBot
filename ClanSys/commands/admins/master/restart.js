
const Discord = require('discord.js');
const { PermissionsBitField, SlashCommandBuilder } = Discord;
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('restarting the bot')
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
        ,
    nsfw: 'false',       // NSFW variable = 'true', No NSFW variable = 'false'.
    admin: 'true',      // Admin Command = 'true', No Admin Command = 'false'.
    async execute(interaction) {
        // code start
        // console.log('[' + DateTime.utc().toFormat(timeFormat) + '] Restarting...');
        // await interaction.reply({ content: 'Restarting...' });
        await interaction.reply({ content: 'Please stop and start the bot manualy.', ephemeral: true });
        // running the script to start the bot.
        //
        // Stop the bot so it can be started by the script.
        // process.exit(0);
    },
};