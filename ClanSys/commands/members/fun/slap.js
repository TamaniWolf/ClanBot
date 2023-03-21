
const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slaps someone.')
        .setDMPermission(false)
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The Member to be mentioned.')
                .setRequired(false)),
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
            if (dataCommandMember == null) { dataCommandMember = { Slap: 'true' }; };
            // Context
            if (dataCommandMember.Slap === 'true') {
                let lang = require(`../../../.${dataLang.Lang}`);
                const stringGetUser = interaction.options.getUser('member');
                if (!stringGetUser) {
                    // Send Message.
                    await interaction.reply(`Bap, bap bap! <@${interaction.user.id}> is bapping them self!`);
                } else if (stringGetUser) {
                    // Send Message.
                    await interaction.reply(`${stringGetUser} bap, bap bap! Your are been baped by <@${interaction.user.id}>!`);
                };
            } else {
                await interaction.reply({ content: 'This command is not available right now.', ephemeral: true });
            };
        } else {
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'slap\' returned \'null / undefined\'.`);
        };
    },
};
