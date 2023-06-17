
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
        .setName('reaction')
        .setDescription('Add/Edit/Remove reactions')
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
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('.')
        )
        .addSubcommandGroup(subcommandgroup =>
            subcommandgroup
                .setName('set')
                .setDescription('Edit the config in the Database.')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('role')
                        .setDescription('.')
                        .addChannelOption(option =>
                            option
                                .setName('channel')
                                .setDescription('channel')
                                .setRequired(true)
                        )
                        .addStringOption(option =>
                            option
                                .setName('message')
                                .setDescription('message')
                                .setRequired(true)
                        )
                        .addStringOption(option =>
                            option
                                .setName('emoji')
                                .setDescription('emoji')
                                .setRequired(true)
                        )
                        .addRoleOption(option =>
                            option
                                .setName('role')
                                .setDescription('role')
                                .setRequired(true)
                        )
                        .addStringOption(option =>
                            option
                                .setName('name')
                                .setDescription('name')
                                .setRequired(true)
                        )
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('reactions')
                        .setDescription('reactions')
                        .addChannelOption(option =>
                            option
                                .setName('channel')
                                .setDescription('channel')
                                .setRequired(true)
                        )
                        .addStringOption(option =>
                            option
                                .setName('message')
                                .setDescription('message')
                                .setRequired(true)
                        )
                        .addStringOption(option =>
                            option
                                .setName('emoji')
                                .setDescription('emoji')
                                .setRequired(true)
                        )
                )
        )
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('edit')
        //         .setDescription('.')
        //         .addChannelOption(option =>
        //             option
        //                 .setName('channel')
        //                 .setDescription('channel')
        //                 .setRequired(true)
        //         )
        //         .addStringOption(option =>
        //             option
        //                 .setName('message')
        //                 .setDescription('message')
        //                 .setRequired(true)
        //         )
        //         .addStringOption(option =>
        //             option
        //                 .setName('emoji')
        //                 .setDescription('emoji')
        //                 .setRequired(true)
        //         )
        //         .addRoleOption(option =>
        //             option
        //                 .setName('role')
        //                 .setDescription('role')
        //                 .setRequired(true)
        //         )
        //         .addStringOption(option =>
        //             option
        //                 .setName('name')
        //                 .setDescription('name')
        //                 .setRequired(true)
        //         )
        // )
        .addSubcommandGroup(subcommandgroup =>
            subcommandgroup
                .setName('remove')
                .setDescription('remove')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('role')
                        .setDescription('role')
                        .addRoleOption(option =>
                            option
                                .setName('role')
                                .setDescription('role')
                                .setRequired(true)
                        )
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('name')
                        .setDescription('name')
                        .addStringOption(option =>
                            option
                                .setName('name')
                                .setDescription('name')
                                .setRequired(true)
                        )
                )
                .addSubcommand(subcommand =>
                    subcommand
                    .setName('reactions')
                    .setDescription('reactions')
                    .addChannelOption(option =>
                        option
                            .setName('channel')
                            .setDescription('channel')
                            .setRequired(true)
                    )
                    .addStringOption(option =>
                        option
                            .setName('message')
                            .setDescription('message')
                            .setRequired(true)
                    )
                    .addStringOption(option =>
                        option
                            .setName('emoji')
                            .setDescription('emoji')
                            .setRequired(true)
                    )
                )
        )
    ,
    async execute(interaction) {
        if (interaction != null || interaction.channel.id != null) {
            // SQLite
            const { Get, Set, Del } = require('../../../../ClanCore/Modules/functions/sqlite/prepare');
            // Data Null
            let dataLang;
            let dataCommandAdmin;
            let dataChannelAdmin;
            let dataChannelAdminGuild;
            // Data Get
            let getGuildID = `${interaction.guild.id}`;
            let getBotConfigID = `${interaction.guild.id}-${interaction.guild.shardId}`;
            let getShardID = `${interaction.guild.shard.id}`;
            let getChannelID = `${interaction.channel.id}`;
            let getChannelRoleID = `${getGuildID}-${getShardID}-${getChannelID}`;
            dataLang = Get.botConfig(getBotConfigID);
            dataCommandAdmin = Get.onOffForCommandAdmin(getBotConfigID);
            dataChannelAdmin = Get.channelForAdmin(getChannelRoleID);
            dataChannelAdminGuild = Get.channelForAdminByGuild(getGuildID);
            // Data Check
            if (dataLang == null) { dataLang = { Lang: `./Database/lang/en_US.json` }; };
            if (dataCommandAdmin == null) { dataCommandAdmin = { Reaction: 'true' }; };
            if (dataChannelAdminGuild == null) { dataChannelAdmin = { ChannelID: `${getChannelID}` }; };
            // Context

            let lang = require(`../../../.${dataLang.Lang}`);
            if (dataCommandAdmin.Reaction === 'true') {
                let permissions = interaction.member.permissions;
                if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                    if (dataChannelAdmin != null && getChannelID === dataChannelAdmin.ChannelID) {
                        const configembed = new EmbedBuilder()
                        .setColor('DarkGreen')
                        .setTitle(`${lang.admin.reaction.titlehelp}`)
                        if(interaction.options.getSubcommand() === 'help') {
                            configembed.addFields(
                                { name: `${lang.admin.reaction.helpfield1}`, value: `${lang.admin.reaction.helpfield2}`, inline: false },
                            );
                            await interaction.reply({embeds: [configembed]});
                        };
                        if (interaction.options.getSubcommand() === 'list') {
                            // Getting Database
                            let dataReactionRoleList;
                            dataReactionRoleList = Get.allReactionForAction();
                            // Return if Data is 'undefined' or 'null'.
                            if (dataReactionRoleList == null) {
                                dataReactionRoleList = { ReactionID: `${getBotConfigID}-200000000000000000-0` , Message: '200000000000000000', Channel: '200000000000000000', Emoji: '0' , Role: '200000000000000000', Action: 'NO-ACTION', Name: 'None2' }
                            };
                            const list = dataReactionRoleList;
                            var arrayOfStrings1 = list.map(function(obj) {
                                return obj.Name;
                            });
                            var arrayOfStrings2 = list.map(function(obj) {
                                return obj.Emoji;
                            });
                            var arrayOfStrings4 = list.map(function(obj) {
                                return obj.Action;
                            });
                            var arrayOfStrings5 = list.map(function(obj) {
                                return obj.Role;
                            });
                            let stringName = arrayOfStrings1.toString();
                            let stringEmoji = arrayOfStrings2.toString();
                            let stringAction = arrayOfStrings4.toString();
                            let stringRole = arrayOfStrings5.toString();
                            let replaceName = stringName.replace(/[,]/gi, '\n');
                            let replaceEmoji = stringEmoji.replace(/[,]/gi, '\n');
                            let replaceAction = stringAction.replace(/[,]/gi, '\n');
                            let replaceRole = stringRole.replace(/[,]/gi, '>\n<@&');
                            let replaceRole2 = replaceRole.replace(/[abcdefghijklmnopqrstuvwxyz]/gi, '100000000000000000');
                            let resultName = `${lang.admin.reaction.nodata}`;
                            let resultEmoji = `${lang.admin.reaction.nodata}`;
                            let resultAction = `${lang.admin.reaction.nodata}`;
                            let resultRole = `${lang.admin.reaction.nodata}`;
                            if (replaceName) {resultName = replaceName;};
                            if (replaceEmoji) {resultEmoji = replaceEmoji;};
                            if (replaceAction) {resultAction = replaceAction;};
                            if (replaceRole2) {resultRole = `<@&${replaceRole2}`;};
                            const reactionroleembed = new EmbedBuilder()
                                .setColor('DarkGreen')
                                .setTitle(`${lang.admin.reaction.titlelist}`)
                                .setDescription(`<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>..<<..>>`)
                                .addFields([
                                    { name: `${lang.admin.reaction.listfield1}`, value: `${resultName}`, inline: true },
                                    { name: `${lang.admin.reaction.listfield2}`, value: `${resultEmoji}`, inline: true },
                                    { name: `${lang.admin.reaction.listfield3}`, value: `${resultAction}`, inline: true },
                                    { name: `${lang.admin.reaction.listfield4}`, value: `${resultRole}`, inline: true },
                                ]);
                            await interaction.reply({embeds: [reactionroleembed]});
                        };
                        if (interaction.options.getSubcommandGroup() === 'set') {
                            if (interaction.options.getSubcommand() === 'role') {
                                const stringGetChannel = interaction.options.getChannel('channel');
                                const stringGetMessage = interaction.options.getString('message');
                                const stringGetEmoji = interaction.options.getString('emoji');
                                const stringGetRole = interaction.options.getRole('role');
                                const stringGetName = interaction.options.getString('name');
                                // Check if MessageId is a Number and valid ID
                                if (isNaN(stringGetMessage) === false && stringGetMessage != '100000000000000000' && stringGetMessage != '200000000000000000') {
                                    // Check if MessageId exists.
                                    let messageObject = await stringGetChannel.messages.fetch(stringGetMessage);
                                    if (messageObject) {
                                        // Check if argument is an Emoji
                                        const emotes = (str) => str.match(/<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu);
                                        let emojis = emotes(stringGetEmoji);
                                        if (emojis != null) {
                                            // Getting Database row by name.
                                            let dataReactionRoleAdd;
                                            dataReactionRoleAdd = Get.reactionForName(stringGetName);
                                            // Return if Data is 'undefined' or 'null'.
                                            // if (dataReactionRoleAdd == null) {
                                            //     dataReactionRoleAdd = { Name: '' }
                                            // };
                                            // Check if name is already in use.
                                            // console.log(stringGetName);
                                            // console.log(dataReactionRoleAdd);
                                            if (dataReactionRoleAdd && stringGetName === dataReactionRoleAdd.Name) {
                                                await interaction.reply(`${lang.admin.reaction.inuse}`);
                                                return;
                                            } else {
                                                // React on to Message.
                                                messageObject.react(stringGetEmoji);
                                                dataReactionRoleAdd = { ReactionID: `${getBotConfigID}-${stringGetMessage}-${stringGetEmoji}`, GuildID: `${getGuildID}`, MessageID: `${stringGetMessage}`, ChannelID: `${stringGetChannel.id}`, RoleID: `${stringGetRole.id}`, Type: `Role_Reaction`, Emoji: `${stringGetEmoji}`, Action: `ADD-ROLE`, Name: `${stringGetName}` }
                                                Set.reactionForAction(dataReactionRoleAdd);
                                                await interaction.reply(`${lang.admin.reaction.rradded}`);
                                            };
                                        } else {
                                            await interaction.reply(`${lang.admin.reaction.emoji404}`);
                                        };
                                    };
                                };
                            };
                            if (interaction.options.getSubcommand() === 'reactions') {
                                const stringGetChannel = interaction.options.getChannel('channel');
                                const stringGetMessage = interaction.options.getString('message');
                                const stringGetEmoji = interaction.options.getString('emoji');
                                // Check if MessageId is a Number and valid ID
                                if (isNaN(stringGetMessage) === false && stringGetMessage != '100000000000000000' && stringGetMessage != '200000000000000000') {
                                    // Check if MessageId exists.
                                    let messageObject = await stringGetChannel.messages.fetch(stringGetMessage);
                                    if (messageObject) {
                                        // Check if argument is an Emoji
                                        const emotes = (str) => str.match(/<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu);
                                        let emojis = emotes(stringGetEmoji);
                                        let serverEmojis = await interaction.guild.emojis.cache.get('725692349690282014');
                                        if (emojis != null) {
                                            let reaction = await messageObject.reactions.cache.get(stringGetEmoji);
                                            if (reaction != null) {
                                                if (reaction.me === true) {
                                                    await interaction.reply({ content: `${lang.admin.reaction.reactionis} ${stringGetEmoji}.`, ephemeral: true });
                                                    return;
                                                };
                                            };
                                            let interactionReply2 = await interaction.reply({ content: `${lang.admin.reaction.reacted} ${stringGetEmoji}.`, ephemeral: true });
                                            messageObject.react(stringGetEmoji)
                                                .then(() => { interactionReply2 })
                                                .catch(() => {});
                                        } else if (serverEmojis != null) {
                                            let interactionReply = await interaction.reply({ content: `${lang.admin.reaction.semoji404}`, ephemeral: true });
                                            messageObject.react(stringGetEmoji)
                                                .catch(error => interactionReply);
                                        };
                                    };
                                };
                            };
                        };
                        if (interaction.options.getSubcommand() === 'edit') {
                            await interaction.reply(`${lang.admin.reaction.cmdnouse}`);
                            return;
                            const stringGetChannel = interaction.options.getChannel('channel');
                            const stringGetMessage = interaction.options.getString('message');
                            const stringGetEmoji = interaction.options.getString('emoji');
                            const stringGetRole = interaction.options.getRole('role');
                            const stringGetName = interaction.options.getString('name');
                                    // Check if MessageId is a Number and valid ID.
                                    if (isNaN(stringGetMessage) === false && stringGetMessage != '100000000000000000' && stringGetMessage != '200000000000000000') {
                                            // Check if argument is an Emoji.
                                            const emotes = (str) => str.match(/<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu);
                                            let emojis = emotes(stringGetEmoji);
                                            if (emojis != null) {
                                                // Check if Name is given.
                                                if (!stringGetName) {
                                                    await interaction.reply(`${lang.admin.reaction.mustname}`);
                                                };
                                                // Getting Database row by name.
                                                let dataReactionRoleEdit;
                                                dataReactionRoleEdit = Get.reactionForName(stringGetRole);
                                                // Return if Data is 'undefined' or 'null'.
                                                if (dataReactionRoleEdit == null) {
                                                    dataReactionRoleEdit = { ReactionID: '720746186788831323-0-200000000000000000-0' , Message: '200000000000000000', Channel: '200000000000000000', Emoji: '0' , Role: '200000000000000000', Action: 'NO-ACTION', Name: 'None2' }
                                                };
                                                // Check if name is already in use.
                                                if (stringGetName === dataReactionRoleEdit.Name) {
                                                    await interaction.reply(`${lang.admin.reaction.inuse}`);
                                                };
                                                // Check if name is not in use.
                                                if (stringGetName != dataReactionRoleEdit.Name) {

                                                    // Get Channel and Message by id and remove reaction and Database Entry
                                                    let getOldGuildChannel = interaction.client.channels.cache.get(dataReactionRoleEdit.Channel);
                                                    let getOldChannelMessage = await getOldGuildChannel.messages.fetch(dataReactionRoleEdit.Message);
                                                    let getOldMessageReaction = getOldChannelMessage.reactions.cache.get(dataReactionRoleEdit.Emoji);
                                                    if (getOldMessageReaction != null) {
                                                        getOldMessageReaction.remove();
                                                        Del.reactionForAction(dataReactionRoleEdit.Role);
                                                    };
                                                    // Get Channel and Message by id and react on it
                                                    let getNewGuildChannel = interaction.client.channels.cache.get(stringGetChannel.id);
                                                    let getNewChannelMessage = await getNewGuildChannel.messages.fetch(stringGetMessage);

                                                    getNewChannelMessage.react(stringGetEmoji);
                                                    // Remove data from Database
                                                    Del.reactionForAction(stringGetRole.id);
                                                    // Insert data in to Database
                                                    let getGuild = interaction.client.guilds.cache.get(interaction.guild.id);
                                                    let getGuildRole = getGuild.roles.cache.get(stringGetRole.id);
                                                    let dataReactionRoleEditNew;
                                                    dataReactionRoleEditNew = { ReactionID: `${getGuildID}-${stringGetMessage}-${stringGetEmoji}` , Message: `${stringGetMessage}`, Channel: `${stringGetChannel.id}`, Emoji: `${stringGetEmoji}` , Role: `${stringGetRole.id}`, Action: `ADD-ROLE`, Name: `${getGuildRole.name}` }
                                                    Set.reactionForAction(dataReactionRoleEditNew);
                                                    await interaction.reply(`${lang.admin.reaction.rrchange}`);
                                                };
                                            } else {
                                                await interaction.reply(`${lang.admin.reaction.emoji404}`);
                                            };
                                    };
                        };
                        if (interaction.options.getSubcommandGroup() === 'remove') {
                            if (interaction.options.getSubcommand() === 'role') {
                                console.log('0');
                                const stringGetRole = interaction.options.getRole('role');
                                // Getting Database row by Role.
                                let dataReactionRoleRemove;
                                dataReactionRoleRemove = Get.reactionForRole(stringGetRole.id);
                                // Return if Data is 'undefined' or 'null'.
                                if (dataReactionRoleRemove == null) {
                                    await interaction.reply(`${lang.admin.reaction.nodbentry}`)
                                };
                                // Get Channel and Message by id and remove reaction and Database Entry
                                let getGuildChannel = interaction.client.channels.cache.get(dataReactionRoleRemove.ChannelID);
                                let getChannelMessage = await getGuildChannel.messages.fetch(dataReactionRoleRemove.MessageID);
                                // Check if argument is an Emoji
                                const emotes = (str) => str.match(/<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu);
                                let emojis = emotes(dataReactionRoleRemove.Emoji);
                                let newEmojis = emojis.toString();
                                if (!newEmojis.startsWith('<') && emojis != null) {
                                    let reaction = await getChannelMessage.reactions.cache.get(dataReactionRoleRemove.Emoji);
                                    if (reaction != null) {
                                        reaction.remove()
                                            .catch(error => console.error('Failed to remove reactions.', error));
                                    } else if (reaction == null) {  };
                                } else if (newEmojis.startsWith('<') || emojis == null) {
                                    let reactions = getChannelMessage.reactions.cache.filter(reaction => reaction._emoji.id);
                                    for (const reaction of reactions.values()) {
                                        if (newEmojis.includes(reaction._emoji.id)) {
                                            reaction.remove()
                                                .catch(error => console.error('Failed to remove reactions.', error));
                                        }
                                    };
                                };
                                Del.reactionForAction(dataReactionRoleRemove.ReactionID);
                                await interaction.reply({ content: `${lang.admin.reaction.raremoved}`, ephemeral: true});
                            };
                            if (interaction.options.getSubcommand() === 'name') {
                                const stringGetName = interaction.options.getString('name');
                                // Getting Database row by Role.
                                let dataReactionRoleRemove;
                                dataReactionRoleRemove = Get.reactionForName(stringGetName);
                                // Return if Data is 'undefined' or 'null'.
                                if (dataReactionRoleRemove == null) {
                                    await interaction.reply(`${lang.admin.reaction.nodbentry}`)
                                };
                                // Get Channel and Message by id and remove reaction and Database Entry
                                let getGuildChannel = await interaction.client.channels.fetch(dataReactionRoleRemove.ChannelID);
                                let getChannelMessage = await getGuildChannel.messages.fetch(dataReactionRoleRemove.MessageID);
                                // Check if argument is an Emoji
                                const emotes = (str) => str.match(/<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu);
                                let emojis = emotes(dataReactionRoleRemove.Emoji);
                                let newEmojis = emojis.toString();
                                if (!newEmojis.startsWith('<') && emojis != null) {
                                    let reaction = getChannelMessage.reactions.cache.get(newEmojis);
                                    if (reaction != undefined || reaction != null) {
                                        reaction.remove()
                                            .catch(error => console.error('Failed to remove reactions.', error));
                                    } else if (reaction == null) {  };
                                } else if (newEmojis.startsWith('<') || emojis == null) {
                                    let reactions = getChannelMessage.reactions.cache.filter(reaction => reaction._emoji.id);
                                    for (const reaction of reactions.values()) {
                                        if (newEmojis.includes(reaction._emoji.id)) {
                                            reaction.remove()
                                                .catch(error => console.error('Failed to remove reactions.', error));
                                        }
                                    };
                                };
                                Del.reactionForAction(dataReactionRoleRemove.ReactionID);
                                await interaction.reply({ content: `${lang.admin.reaction.raremoved}`, ephemeral: true});
                            };
                            if (interaction.options.getSubcommand() === 'reactions') {
                                const stringGetChannel = interaction.options.getChannel('channel');
                                const stringGetMessage = interaction.options.getString('message');
                                const stringGetEmoji = interaction.options.getString('emoji');
                                // Check if MessageId is a Number and valid ID
                                if (isNaN(stringGetMessage) === false && stringGetMessage != '100000000000000000' && stringGetMessage != '200000000000000000') {
                                    // Check if MessageId exists.
                                    let messageObject = await stringGetChannel.messages.fetch(stringGetMessage);
                                    if (messageObject) {
                                        // Check if argument is an Emoji
                                        const emotes = (str) => str.match(/<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu);
                                        let emojis = emotes(stringGetEmoji);
                                        let newEmojis = emojis.toString();
                                        if (!newEmojis.startsWith('<') && emojis != null) {
                                            let reaction = await messageObject.reactions.fetch(stringGetEmoji);

                                            if (reaction != null) {
                                                let interactionReply2 = await interaction.reply({ content: `${lang.admin.reaction.with} ${stringGetEmoji} ${lang.admin.reaction.gotdeleted}`, ephemeral: true });
                                                reaction.remove()
                                                    .then(() => { interactionReply2 })
                                                    .catch(error => console.error('Failed to remove reactions.', error));
                                            } else if (reaction == null) {
                                                await interaction.reply({ content: `${lang.admin.reaction.noremoji}`, ephemeral: true });
                                            };
                                        } else if (newEmojis.startsWith('<') || emojis == null) {
                                            let newMessageObject = messageObject;
                                            let reactions = newMessageObject.reactions.cache.filter(reaction => reaction._emoji.id);
                                            for (const reaction of reactions.values()) {
                                                if (newEmojis.includes(reaction._emoji.id)) {
                                                    let interactionReply = await interaction.reply({ content: `${lang.admin.reaction.with} ${stringGetEmoji} ${lang.admin.reaction.gotdeleted}`, ephemeral: true });
                                                    reaction.remove()
                                                        .then(() => { interactionReply })
                                                        .catch(error => console.error('Failed to remove reactions.', error));
                                                }
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    // Error Messages
                    } else {
                        await interaction.reply({ content: `${lang.error.adminchannel}`, ephemeral: true });
                    };
                } else {
                    await interaction.reply({ content: `${lang.error.noadminperms}`, ephemeral: true });
                };
            } else {
                await interaction.reply({ content: `${lang.error.cmdoff}`, ephemeral: true });
            };
        } else {
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'reaction\' returned \'null / undefined\'.`);
        };
    },
};