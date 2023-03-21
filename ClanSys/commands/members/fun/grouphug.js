
const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('grouphug')
        .setDescription('Grouphug all or just some.')
        .setDMPermission(false)
        // .addUserOption(option =>
        //     option
        //        .setName('user')
        //        .setDescription('The input to echo back')
        //        .setRequired(true))
        ,
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
            if (dataCommandMember == null) { dataCommandMember = { Grouphug: 'true' }; };
            // Context
            if (dataCommandMember.Grouphug === 'true') {
                let lang = require(`../../../.${dataLang.Lang}`);
                await interaction.reply(`Grouphug time! <@${interaction.user.id}> wants all the hugs and hugs everyone!`);
            } else {
                await interaction.reply({ content: 'This command is not available right now.', ephemeral: true });
            };
        } else {
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'grouphug\' returned \'null / undefined\'.`);
        };
    },
};