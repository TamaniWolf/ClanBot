
// Require and set
const Discord = require('discord.js');
const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = Discord;
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
const fs = require('node:fs');
require('dotenv').config();

module.exports = {
	cooldown: 5,
	admin: 'true',
	nsfw: 'false',
    data: new SlashCommandBuilder()
        .setName('language')
        .setDescription('editing lang')
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
                .setDescription('A List of Languages.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Set the language.')
                .addStringOption(option =>
                    option
                        .setName('code')
                        .setDescription('The language code')
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
            let getChannelRoleID = `${getGuildID}-${getShardID}-${getChannelID}`;
            dataLang = Get.botConfig(getBotConfigID);
            dataCommandAdmin = Get.onOffForCommandAdmin(getBotConfigID);
            dataChannelAdmin = Get.channelForAdmin(getChannelRoleID);
            dataChannelAdminGuild = Get.channelForAdminByGuild(getGuildID);
            // Data Check
            if (dataLang == null) { dataLang = { Lang: './Database/lang/en_US.json' }; };
            if (dataChannelAdminGuild == null) { dataChannelAdmin = { ChannelID: `${interaction.channel.id}` }; };
            // Context

            let lang = require(`../../../.${dataLang.Lang}`);
            if (dataCommandAdmin.Language === 'true') {
                let permissions = interaction.member.permissions;
                if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                    if (dataChannelAdmin != null && interaction.channel.id === dataChannelAdmin.ChannelID) {
                        const configembed = new EmbedBuilder()
                        .setColor('DarkGreen')
                        if(interaction.options.getSubcommand() === 'help') {
                            configembed.setTitle(`${lang.admin.language.titlehelp}`)
                            .addFields(
                                { name: `${lang.admin.language.helpfield1}`, value: `${lang.admin.language.helpfield2}`, inline: false},
                            );
/**
language - Commands relating to language.\n  ⤷ help - Displays this help text.\n  ⤷ list - A list of set Languages.\n  ⤷ set  - Set's a supported language for text output.\n
 */
                            await interaction.reply({ embeds: [configembed] });
                        };
                        let lang_files = fs.readdirSync('./Database/lang/').filter(file => file.endsWith('.json'));
                        let langName = [];
                        let langCode = [];
                        if (interaction.options.getSubcommand() === 'list') {
                            for (const file of lang_files) {
                                let rawData = fs.readFileSync(`./Database/lang/${file}`);
                                let langRead = JSON.parse(rawData);
                                // console.log(langRead.name);
                                langName.push(langRead.name);
                                langCode.push(langRead.code);
                            };
                            let stringLangName = langName.toString();
                            let stringLangCode = langCode.toString();
                            let replaceLangName = stringLangName.replace(/[,]/gi, '\n');
                            let replaceLangCode = stringLangCode.replace(/[,]/gi, '\n');
                            let rln = replaceLangName.replace(/[\n]/gi, '');
                            let rlc = replaceLangCode.replace(/[\n]/gi, '');
                            if (!rln) {replaceLangName = `${lang.admin.language.nodate}`;};
                            if (!rlc) {replaceLangCode = `${lang.admin.language.nodate}`;};
                            configembed.setTitle(`${lang.admin.language.titlelist}`)
                                .setDescription(`${lang.admin.language.desclist}`)
                                .addFields(
                                    { name: `${lang.admin.language.listfield1}`, value: `\`\`\`${replaceLangName}\`\`\``, inline: true },
                                    { name: `${lang.admin.language.listfield2}`, value: `\`\`\`${replaceLangCode}\`\`\``, inline: true },
                                );
                            await interaction.reply({ embeds: [configembed] });
                        };
                        if (interaction.options.getSubcommand() === 'set') {
                            const stringChoicesValueset = interaction.options.getString('code');
                            let langFile;
                            lang_files.forEach(file => {if (file === `${stringChoicesValueset}.json`) {langFile = true;};});
                            if (langFile) {
                                if (dataLang.Lang === `./Database/lang/${stringChoicesValueset}.json`) {await interaction.reply({ content: `${lang.admin.language.isset}`, ephemeral: true });return;};
                                dataLang = { ConfigID: `${getBotConfigID}`, GuildID: `${getGuildID}`, ShardID, BotID: `${globalclient.user.id}`, Lang: `./Database/lang/${stringChoicesValueset}.json` };
                                Set.botConfig(dataLang);
                                let jsonlang = `${lang.admin.language}.` + `${stringChoicesValueset}`;
                                console.log('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, jsonlang);
                                configembed.setDescription(`${jsonlang}`);
                                await interaction.reply({ embeds: [configembed] });
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
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'lanuage\' returned \'null / undefined\'.`);
        };
    },
};