
// Require and set
const Discord = require('discord.js');
const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = Discord;
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();

module.exports = {
	cooldown: 5,
	admin: 'false',
	nsfw: 'false',
    data: new SlashCommandBuilder()
        .setName('grouphug')
        .setDescription('Grouphug all or just some.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.SendMessages)
        // .addUserOption(option =>
        //     option
        //        .setName('user')
        //        .setDescription('The input to echo back')
        //        .setRequired(true))
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
                await interaction.reply(`${lang.default.grouphug.time} <@${interaction.user.id}> ${lang.default.grouphug.want}`);
            } else {
                await interaction.reply({ content: `${lang.error.cmdoff}`, ephemeral: true });
            };
        } else {
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'grouphug\' returned \'null / undefined\'.`);
        };
    },
};