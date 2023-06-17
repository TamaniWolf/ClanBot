
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
        .setName('blush')
        .setDescription('You or someone else made someone else Blush.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.SendMessages)
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The Member to be mentioned.')
                .setRequired(false))
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
            if (dataCommandMember == null) { dataCommandMember = { Blush: 'true' }; };
            // Context

            let lang = require(`../../../.${dataLang.Lang}`);
            if (dataCommandMember.Blush === 'true') {
                const stringGetUser = interaction.options.getUser('member');
                if (!stringGetUser) {
                    // Send Message.
                    await interaction.reply(`${lang.default.blush.no} <@${interaction.user.id}> ${lang.default.blush.blush}`);
                } else if (stringGetUser) {
                    // Send Message.
                    await interaction.reply(`${lang.default.blush.no} ${stringGetUser} ${lang.default.blush.blush}`);
                };
            } else {
                await interaction.reply({ content: `${lang.error.cmdoff}`, ephemeral: true });
            };
        } else {
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'blush\' returned \'null / undefined\'.`);
        };
    },
};