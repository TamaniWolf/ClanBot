
// Require and set
const Discord = require('discord.js');
const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = Discord;
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();

module.exports = {
	cooldown: 5,
	admin: 'true',
	nsfw: 'false',
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clear up to 1000 messages of the past two weeks')
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

            let lang = require(`../../../.${dataLang.Lang}`);
            if (dataCommandAdmin.Clear === 'true') {
                let permissions = interaction.member.permissions;
                if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                    const stringAmount = interaction.options.getInteger('amount');
                    const stringUser = interaction.options.getUser('member');
                    let guild = await interaction.client.guilds.fetch(getGuildID);
                    let channel = await guild.channels.fetch(getChannelID);
                    if (stringAmount > 100) {
                        await interaction.reply({ content: `${lang.admin.clear.max100}`, ephemeral: true })
                    } else
                    if (stringAmount <= 100) {
                        let messages  = await channel.messages.fetch({ limit: stringAmount });
                        let embedMsg = `${messages.size} ${lang.admin.clear.msgclear1}`
                        // Delete user messages
                        if (stringUser) {
                            messages = await channel.messages.fetch({ limit: 100 })
                            messages = messages.filter((m) => m.author.id == stringUser.id);
                            messages = messages.map(function(obj){return obj;});
                            messages = messages.slice(0, stringAmount);
                            embedMsg = `${messages.length} ${lang.admin.clear.msgfrom} ${stringUser} ${lang.admin.clear.msgclear2}`;
                        };
                        // Delete the message
                        await channel.bulkDelete(messages, true);
                        const embed = new EmbedBuilder()
                            .addFields(
                                { name: `${lang.admin.clear.clearedtitle}`, value: `${embedMsg}` }
                            )
                        await interaction.reply({ embeds: [embed], ephemeral: true });
                        // let embedLogMsg = `${messages.length} ${lang.admin.clear.msgfrom} ${stringUser} ${lang.admin.clear.msgclear2} ${channel}.`
                        // const embedLog = new EmbedBuilder()
                        //     .addFields(
                        //         { name: `${lang.admin.clear.clearedtitle}`, value: `${embedLogMsg}` }
                        //     )
                        // globalclient.channels.cache.get(dataChannellog.ChannelID).send({embeds: [embedLog]});
                    };
                // Error Messages
                } else {
                    await interaction.reply({ content: `${lang.error.noadminperms}`, ephemeral: true });
                };
            } else {
                await interaction.reply({ content: `${lang.error.cmdoff}`, ephemeral: true });
            };
        } else {
            console.log(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'clear\' returned \'null / undefined\'.`);
        };
    },
};