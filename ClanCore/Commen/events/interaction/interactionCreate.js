
// Require discord.js, fs, Luxon.
const { Integration } = require('discord.js');
// Require dotenv as config (.env).
require('dotenv').config();
module.exports = {
    name: 'interactionCreate',
    /**
     * @param {Integration} interaction
     */
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.slashCommands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            };
        };
        // if (interaction.isButton()) {
        //     //
        // };
    },
};
