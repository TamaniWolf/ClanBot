
const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blush')
        .setDescription('You or someone else made someone else Blush.')
        .setDMPermission(false)
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The Member to be mentioned.')
                .setRequired(false)),
    nsfw: 'true',       // NSFW variable = 'true', No NSFW variable = 'false'.
    admin: 'false',      // Admin Command = 'true', No Admin Command = 'false'.
    async execute(interaction) {
        if (interaction != null || interaction.channel.id != null || interaction.guild.id != null) {
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
            if (dataCommandMember.Blush === 'true') {
                const stringGetUser = interaction.options.getUser('member');
                if (!stringGetUser) {
                    // Send Message.
                    await interaction.reply(`Nooo! You made <@${interaction.user.id}> blush!`);
                } else if (stringGetUser) {
                    // Send Message.
                    await interaction.reply(`Nooo! <@${interaction.user.id}> You made ${stringGetUser} blush!`);
                };
            } else {
                await interaction.reply({ content: 'This command is not available right now.', ephemeral: true });
            };
        } else {
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'blush\' returned \'null / undefined\'.`);
        };
    },
};