
// Require and set
const Discord = require('discord.js');
const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = Discord;
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
let cmdPrefix;
require('dotenv').config();

module.exports = {
	cooldown: 5,
	admin: 'true',
	nsfw: 'false',
    data: new SlashCommandBuilder()
        .setName('adminhelp')
        .setDescription('admin help')
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
            if (dataLang == null) { dataLang = { Lang: './Database/lang/en_US.json' } };
            if (dataCommandAdmin == null) { dataCommandAdmin = { Adminhelp: 'true' } };
            if (dataChannelAdminGuild == null) { dataChannelAdmin = { ChannelID: `${interaction.channel.id}` }; };
            // Context

            let lang = require(`../../../.${dataLang.Lang}`);
            if (dataCommandAdmin.Adminhelp === 'true') {
                let permissions = interaction.member.permissions;
                if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                    cmdPrefix = process.env.PREFIX;
                    if (cmdPrefix === undefined || cmdPrefix === null) { cmdPrefix = '/' };
                    if(dataChannelAdmin != null && interaction.channel.id === dataChannelAdmin.ChannelID) {
                        let dataNew = interaction.client.slashCommands.filter(f => f.admin === 'true');
                        let dataPcName = dataNew.map(cmd =>{
                            return `${cmd.data.name}`;
                        });
                        let dataPcDescription = dataNew.map(cmd =>{
                            return `${cmd.data.description}`;
                        });
                        let dataPcPrefix = dataNew.map(cmd =>{
                            return 'ㅤ/';
                        });
                        let stringPcName = dataPcName.toString();
                        let stringPcDescription = dataPcDescription.toString();
                        let stringPcPrefix = dataPcPrefix.toString();
                        let replacePcName = stringPcName.replace(/[,]/gi, '\n');
                        let replacePcDescrition = stringPcDescription.replace(/[,]/gi, '\n');
                        let replaceCommaPcPrefix = stringPcPrefix.replace(/[,]/gi, '\n');
                        let replaceTruePcPrefix = replaceCommaPcPrefix.replaceAll('true', `ㅤ${cmdPrefix}`);
                        let replacePcPrefix;
                        replacePcPrefix = replaceTruePcPrefix.replaceAll('false', 'ㅤ/'); /**replaceFalsePcPRefix */
                        if (replacePcPrefix === undefined || replacePcPrefix === null) {
                            replacePcPrefix = 'ㅤ/';
                        }
                        const cmdembed = new EmbedBuilder()
                        .setTitle(`${lang.admin.help.title}`)
                        .setColor('Orange')
                        .setDescription(`<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>`)
                        .addFields(
                            { name: `${lang.admin.help.helpfield1}`, value: `${replacePcPrefix}`, inline: true },
                            { name: `${lang.admin.help.helpfield2}`, value: `${replacePcName}`, inline: true },
                            { name: `${lang.admin.help.helpfield3}`, value: `${replacePcDescrition}`, inline: true },
                        );
                        await interaction.reply({ embeds: [cmdembed] });
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
            console.log(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'adminhelp\' returned \'null / undefined\'.`);
        };
    },
};
