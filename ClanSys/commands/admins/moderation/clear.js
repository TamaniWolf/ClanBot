
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();
module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clear up to 1000 messages of the past two weeks')
        .setDMPermission(false)
        .setDefaultMemberPermissions(
            PermissionsBitField.Flags.ViewAuditLog
            | PermissionsBitField.Flags.KickMembers
            | PermissionsBitField.Flags.ManageChannels
            | PermissionsBitField.Flags.ManageEmojisAndStickers
            | PermissionsBitField.Flags.ManageGuild
            | PermissionsBitField.Flags.ManageMessages
            | PermissionsBitField.Flags.ManageRoles
            | PermissionsBitField.Flags.ModerateMembers
            | PermissionsBitField.Flags.ManageThreads
            | PermissionsBitField.Flags.ManageWebhooks
        )
        .addIntegerOption(option =>
            option
                .setName('amount')
                .setDescription('how many messages to be deleted')
                .setMinValue(2)
                .setMaxValue(1000)
                .setRequired(true),
        )
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('the member')
                .setRequired(false),
        )
    ,
    nsfw: 'false',       // NSFW variable = 'true', No NSFW variable = 'false'.
    admin: 'true',      // Admin Command = 'true', No Admin Command = 'false'.
    async execute(interaction) {
        if (interaction != null || interaction.channel.id != null || interaction.guild.id != null) {
            // SQLite
            const { Get } = require('../../../../ClanCore/Modules/functions/sqlite/prepare');
            // Data Null
            let dataLang;
            let dataCommandAdmin;
            let dataChannellog;
            // Data Get
            let getGuildID = `${interaction.guild.id}`;
            let getBotConfigID = `${interaction.guild.id}-${interaction.guild.shardId}`;
            let getChannelID = `${interaction.channel.id}`;
            dataLang = Get.botConfig(getBotConfigID);
            dataCommandAdmin = Get.onOffForCommandAdmin(getBotConfigID);
            dataChannellog = Get.channelForLog(getBotConfigID);
            // Data Check
            if (dataLang == null) { dataLang = { Lang: `./Database/lang/en_US.json` }; };
            if (dataCommandAdmin == null) { dataCommandAdmin = { Clear: 'true' }; };
            if (dataChannellog == null) {console.log('No logging Channel in database');return;};
            // Context
            if (dataCommandAdmin.Clear === 'true') {
                const stringAmount = interaction.options.getInteger('amount');
                const stringUser = interaction.options.getUser('member');
                let guild = await interaction.client.guilds.fetch(getGuildID);
                let channel = await guild.channels.fetch(getChannelID);
                if (stringAmount > 100) {
                    await interaction.reply({ content: 'Sorry I only can do 100 at a time.', ephemeral: true })
                } else
                if (stringAmount <= 100) {
                    let messages  = await channel.messages.fetch({ limit: stringAmount });
                    let embedMsg = `${messages.size} Messages from the past Two weeks got cleared.`
                    // Delete user messages
                    if (stringUser) {
                        messages = await channel.messages.fetch({ limit: 100 })
                        messages = messages.filter((m) => m.author.id == stringUser.id);
                        messages = messages.map(function(obj){return obj;});
                        messages = messages.slice(0, stringAmount);
                        embedMsg = `${messages.length} Messages from ${stringUser} from the past Two weeks got cleared.`;
                    };
                    // Delete the message
                    await channel.bulkDelete(messages, true);
                    const embed = new EmbedBuilder()
                        .addFields(
                            { name: 'Cleard Messages:', value: `${embedMsg}` }
                        )
                    await interaction.reply({ embeds: [embed], ephemeral: true });
                    let embedLogMsg = `${messages.length} Messages from ${stringUser} from the past Two weeks got cleared in ${channel}.`
                    const embedLog = new EmbedBuilder()
                        .addFields(
                            { name: 'Cleard Messages:', value: `${embedLogMsg}` }
                        )
                    globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embedLog]});
                };
            } else {
                await interaction.reply({ content: 'This command is not available right now.', ephemeral: true });
            };
        } else {
            console.log(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'clear\' returned \'null / undefined\'.`);
        };
    },
};