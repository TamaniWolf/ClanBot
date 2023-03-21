
const Discord = require('discord.js');
const { PermissionsBitField, SlashCommandBuilder } = Discord;

const fs = require('node:fs');
require('dotenv').config;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('Updater')
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
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Help text')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('Information to Update')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription('Check for Updates')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('run')
                .setDescription('Run Update')
        )
    ,
    permissions: ['VIEW_AUDIT_LOG'],
    prefix: '/',
    admin: 'true',
    nsfw: 'false',
    async execute(interaction) {
        if (interaction != null || interaction.channel.id != null || interaction.guild.id != null) {
            // SQLite
            const { Get } = require('../../../../ClanCore/Modules/functions/sqlite/prepare');
            // Data Null
            let dataLang;
            let dataCommandAdmin;
            let dataChannelAdmin;
            let dataChannelAdminGuild;
            // Data Get
            let getGuildID = `${interaction.guild.id}`;
            let getBotConfigID = `${interaction.guild.id}-${interaction.guild.shardId}`;
            let getChannelRoleID = `${getGuildID}-${interaction.guild.shardId}-${interaction.channel.id}`;
            dataLang = Get.botConfig(getBotConfigID);
            dataCommandAdmin = Get.onOffForCommandAdmin(getBotConfigID);
            dataChannelAdmin = Get.channelForAdmin(getChannelRoleID);
            dataChannelAdminGuild = Get.channelForAdminByGuild(getGuildID);
            // Data Check
            if (dataLang == null) { dataLang = { Lang: './Database/lang/en_US.json' } };
            if (dataCommandAdmin == null) { dataCommandAdmin = { Updating: 'true' } };
            if (dataChannelAdminGuild == null) { dataChannelAdmin = { ChannelID: `${interaction.channel.id}` }; };
            // Context
            if (dataCommandAdmin.Updating === 'true') {
                let lang = require('../../../.' + dataLang.Lang);
                let permissions = interaction.member.permissions;
                if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                    if (dataChannelAdmin != null && interaction.channel.id === dataChannelAdmin.ChannelID) {
                        let getPackageJSON = fs.readFileSync('./package.json');
                        let getVersionsJSON = fs.readFileSync('./Database/updates/versions.json');
                        let packageJSON = JSON.parse(getPackageJSON).version;
                        let versionsJSON = JSON.parse(getVersionsJSON).update;
                        if (interaction.options.getSubcommand() === 'help') {
                            await interaction.reply({ content: `\`\`\`\nupdate: ${versionsJSON.id}\nVersion: ${versionsJSON.name}\n\n\n\`\`\`` });
                        };
                        if (interaction.options.getSubcommand() === 'info') {
                            if (packageJSON === versionsJSON.name) { await interaction.reply({ content: 'No new Infos' }); } else
                            if (packageJSON != versionsJSON.name) { await interaction.reply({ content: `\`\`\`\nUpdate: ${versionsJSON.id}\nVersion: ${versionsJSON.name}\n\n\n\`\`\`` }); };
                        };
                        if (interaction.options.getSubcommand() === 'check') {
                            const { Octokit } = require('octokit');
                            // Check if newer update file is existing and require if so.
                            // The Update filenames are composed of the <namespace> and the <versionnumber>, if the update is for Bot version 4.1.2 then the file will look alike this "update040102.js".
                            const octokit = new Octokit()
                            const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}{?ref}', {
                                owner: 'TamaniWolf',
                                repo: 'ClanBot',
                                mediaType: {
                                    format: "raw",
                                },
                                path: 'Database/updates/versions.json',
                                ref: 'master'
                            })
                            const botVersions = fs.readFileSync('./Database/updates/versions.json');
                            let newVersionJSON = JSON.parse(data).update;
                            let currentVersionJSON = JSON.parse(botVersions).update;
                            if (newVersionJSON.id >= currentVersionJSON.id) {
                                let dataMisc;
                                dataMisc = Get.onOffForMisc(getBotConfigID);
                                if (dataMisc === undefined || dataMisc === null) {};
                                let updateJS = `update${newVersionJSON.id}`;
                                if (fs.existsSync(`./Database/updates/${updateJS}.js`) === true) {
                                    await interaction.reply('Your Bot is already up to date.');
                                } else {
                                    const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}{?ref}', {
                                        owner: 'TamaniWolf',
                                        repo: 'ClanBot',
                                        mediaType: {
                                            format: "raw",
                                        },
                                        path: `Database/updates/${updateJS}.js`,
                                        ref: 'master'
                                    })
                                    let newVersionJS = data;
                                    fs.appendFile(`./Database/updates/${updateJS}.js`, newVersionJS, function (err){
                                        if (err) throw err;
                                    });
                                };
                            };
                        };
                        if (interaction.options.getSubcommand() === 'run') {
                            if (packageJSON === versionsJSON.name) {
                                await interaction.reply({ content: 'Your Bot is already up to date.' });
                            } else if (packageJSON != versionsJSON.name) {
                                if (fs.existsSync(`./Database/updates/update${versionsJSON.id}.js`) === true) {
                                    require(`../../../../Database/updates/update${versionsJSON.id}.js`)(versionsJSON);
                                };
                            };
                        };
                    // Error Messages
                    } else {
                        await interaction.reply({ content: 'Admin Commands can only be used in Admin Channels.', ephemeral: true });
                    };
                } else {
                    await interaction.reply({ content: 'You are either not an Admin or you have not enought permissions.', ephemeral: true });
                };
            } else {
                await interaction.reply({ content: 'This command is not available right now.', ephemeral: true });
            };
        } else {
            console.log(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'update\' returned \'null / undefined\'.`);
        };
    },
};