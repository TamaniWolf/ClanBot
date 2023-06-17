
// Require and set
const Discord = require('discord.js');
const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = Discord;
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();
const cmdPrefix = process.env.PREFIX;

module.exports = {
	cooldown: 5,
	admin: 'false',
	nsfw: 'false',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('help')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.SendMessages)
    ,
    async execute(interaction) {
        if (interaction != null || interaction.channel.id != null) {
            // SQLite
            const { Get } = require('../../../../ClanCore/Modules/functions/sqlite/prepare');
            // Data Null
            let dataLang;
            let dataCommandMember;
            // Data Get
            let getBotConfigID = `${interaction.guild.id}-${interaction.guild.shardId}`;
            dataLang = Get.botConfig(getBotConfigID);
            dataCommandMember = Get.onOffForCommandMember(getBotConfigID);
            // Data Check
            if (dataLang == null) { dataLang = { Lang: './Database/lang/en_US.json' }; };
            if (dataCommandMember == null) { dataCommandMember = { Grouphug: 'true' }; };
            // Context

            let lang = require(`../../../.${dataLang.Lang}`);
            if (dataCommandMember.Grouphug === 'true') {
                let dataNew = interaction.client.slashCommands.filter(f => f.admin === 'false');
                let dataPcName = dataNew.map(cmd =>{
                    return `${cmd.data.name}`;
                });
                let dataPcDescription = dataNew.map(cmd =>{
                    return `${cmd.data.description}`;
                });
                let dataPcPrefix = dataNew.map(cmd =>{
                    return `/`;
                });
                let stringPcName = dataPcName.toString();
                let stringPcDescription = dataPcDescription.toString();
                let stringPcPrefix = dataPcPrefix.toString();
                let replacePcName = stringPcName.replace(/[,]/gi, '\n');
                let replacePcDescrition = stringPcDescription.replace(/[,]/gi, '\n');
                let replaceCommaPcPrefix = stringPcPrefix.replace(/[,]/gi, '\n');
                let replaceTruePcPrefix = replaceCommaPcPrefix.replaceAll('true', `${cmdPrefix}`);
                let replacePcPrefix = replaceTruePcPrefix.replaceAll('false', '/'); /**replaceFalsePcPRefix */
                const cmdembed = new EmbedBuilder()
                .setTitle(`${lang.default.help.title}`)
                .setColor('Orange')
                .setDescription(`<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>`)
                .addFields([
                    { name: `${lang.default.help.field1}`, value: `${replacePcPrefix}`, inline: true },
                    { name: `${lang.default.help.field2}`, value: `${replacePcName}`, inline: true },
                    { name: `${lang.default.help.field3}`, value: `${replacePcDescrition}`, inline: true },
                ]);
                await interaction.reply({ embeds: [cmdembed] });
            } else {
                await interaction.reply({ content: `${lang.error.cmdoff}`, ephemeral: true });
            };
        } else {
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'help\' returned \'null / undefined\'.`);
        };
    },
};

/** Colors: 30
 * Aqua = AQUA
 * Blue = BLUE
 * Blurple = BLURPLE
 * DarkAqua = DARK_AQUA
 * DarkBlue = DARK_BLUE
 * DarkButNotBlack = DARK_BUT_NOT_BLACK
 * DarkGold = DARK_GOLD
 * DarkGreen = DARK_GREEN
 * DarkGrey = DARK_GREY
 * DarkNavy = DARK_NAVY
 * DarkOrange = DARK_ORANGE
 * DarkPurple = DARK_PURPLE
 * DarkRed = DARK_RED
 * DarkVividPink = DARK_VIVID_PINK
 * DarkerGrey = DARKER_GREY
 * Default = DEFAULT
 * Fuchsia = FUCHSIA
 * Gold = GOLD
 * Green = GREEN
 * Grey = GREY
 * Greyple = GREYPLE
 * LightGrey = LIGHT_GREY
 * LuminousVividPink = LUMINOUS_VIVID_PINK
 * Navy = NAVY
 * NotQuiteBlack = NOT_QUITE_BLACK
 * Orange = ORANGE
 * Purple = PURPLE
 * Random = RANDOM
 * Red = RED
 * White = WHITE
 * Yellow = YELLOW
 */
