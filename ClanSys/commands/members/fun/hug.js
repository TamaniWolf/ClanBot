
const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('A command to hug other users.')
        .setDMPermission(false)
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The Member to be mentioned.')
                .setRequired(true)),
    nsfw: 'true',       // NSFW variable = 'true', No NSFW variable = 'false'.
    admin: 'false',      // Admin Command = 'true', No Admin Command = 'false'.
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
            if (dataCommandMember == null) { dataCommandMember = { Hug: 'true' }; };
            // Context
            if (dataCommandMember.Hug === 'true') {
                let lang = require(`../../../.${dataLang.Lang}`);
                const stringGetUser = interaction.options.getUser('member');
                await interaction.reply(`Hey! ${stringGetUser}, <@${interaction.user.id}> hugged You!`);
            } else {
                await interaction.reply({ content: 'This command is not available right now.', ephemeral: true });
            };
        } else {
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'hug\' returned \'null / undefined\'.`);
        };
    },
};