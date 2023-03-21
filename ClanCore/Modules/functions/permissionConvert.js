
const { PermissionsBitField } = require('discord.js');
require('dotenv').config;

class PermissionConvert {
    static permissionsBitField(bitfield) {
        return new Promise((resolve, reject) => {
            try {
                let permBitfield = '';
                if (bitfield != 0) {
                    // console.log(bitfield);
                    let bitfieldIn = new PermissionsBitField(bitfield);
                    // console.log('1');
                    // General Server Permissions
                    if (bitfieldIn.has(PermissionsBitField.Flags.ViewChannel) === true) {
                        permBitfield += 'View Channels\n';
                        // console.log('2');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.ManageChannels) === true) {
                        permBitfield += 'Manage Channels\n';
                        // console.log('3');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.ManageRoles) === true) {
                        permBitfield += 'Manage Roles\n';
                        // console.log('4');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.ManageEmojisAndStickers) === true) {
                        permBitfield += 'Manage Emojis And Stickers\n';
                        // console.log('5');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.ViewAuditLog) === true) {
                        permBitfield += 'View Audit Log\n';
                        // console.log('6');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.ViewGuildInsights) === true) {
                        permBitfield += 'View Server Insights\n';
                        // console.log('7');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.ManageWebhooks) === true) {
                        permBitfield += 'Manage Webhooks\n';
                        // console.log('8');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.ManageGuild) === true) {
                        permBitfield += 'Manage Server\n';
                        // console.log('9');
                    };
                    // Membership Permissions
                    if (bitfieldIn.has(PermissionsBitField.Flags.CreateInstantInvite) === true) {
                        permBitfield += 'Create Invite\n';
                        // console.log('10');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.ChangeNickname) === true) {
                        permBitfield += 'Change Nickname\n';
                        // console.log('11');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.ManageNicknames) === true) {
                        permBitfield += 'Manage Nicknames\n';
                        // console.log('12');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.KickMembers) === true) {
                        permBitfield += 'Kick Members\n';
                        // console.log('13');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.BanMembers) === true) {
                        permBitfield += 'Ban Members\n';
                        // console.log('14');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.ModerateMembers) === true) {
                        permBitfield += 'Timeout Members\n';
                        // console.log('15');
                    };
                    // Text Channel Permissions
                    if (bitfieldIn.has(PermissionsBitField.Flags.SendMessages) === true) {
                        permBitfield += 'Send Messages and Create Posts\n';
                        // console.log('16');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.SendMessagesInThreads) === true) {
                        permBitfield += 'Send Messages in Threads and Posts\n';
                        // console.log('17');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.CreatePublicThreads) === true) {
                        permBitfield += 'Create Public Threads\n';
                        // console.log('18');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.CreatePrivateThreads) === true) {
                        permBitfield += 'Create Private Threads\n';
                        // console.log('19');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.EmbedLinks) === true) {
                        permBitfield += 'Embed Links\n';
                        // console.log('20');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.AttachFiles) === true) {
                        permBitfield += 'Attach Files\n';
                        // console.log('21');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.AddReactions) === true) {
                        permBitfield += 'Add Reactions\n';
                        // console.log('22');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.UseExternalEmojis) === true) {
                        permBitfield += 'Use External Emojis\n';
                        // console.log('23');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.UseExternalStickers) === true) {
                        permBitfield += 'Use External Stickers\n';
                        // console.log('24');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.MentionEveryone) === true) {
                        permBitfield += 'Mention @everyone, @here, and All Roles\n';
                        // console.log('25');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.ManageMessages) === true) {
                        permBitfield += 'Manage Messages\n';
                        // console.log('26');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.ManageThreads) === true) {
                        permBitfield += 'Manage Threads and Posts\n';
                        // console.log('27');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.ReadMessageHistory) === true) {
                        permBitfield += 'Read Message History\n';
                        // console.log('28');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.SendTTSMessages) === true) {
                        permBitfield += 'Send Text-to-Speech Messages\n';
                        // console.log('29');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.UseApplicationCommands) === true) {
                        permBitfield += 'Use Application Commands\n';
                        // console.log('30');
                    };
                    // Voice Channel Permissions
                    if (bitfieldIn.has(PermissionsBitField.Flags.Connect) === true) {
                        permBitfield += 'Connect\n';
                        // console.log('31');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.Speak) === true) {
                        permBitfield += 'Speak\n';
                        // console.log('32');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.Stream) === true) {
                        permBitfield += 'Video\n';
                        // console.log('33');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.UseEmbeddedActivities) === true) {
                        permBitfield += 'User Activities\n';
                        // console.log('34');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.UseVAD) === true) {
                        permBitfield += 'Use Voice Activity\n';
                        // console.log('35');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.PrioritySpeaker) === true) {
                        permBitfield += 'Priority Speaker\n';
                        // console.log('36');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.MuteMembers) === true) {
                        permBitfield += 'Mute Members\n';
                        // console.log('37');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.DeafenMembers) === true) {
                        permBitfield += 'Deafe nMembers\n';
                        // console.log('38');
                    };
                    if (bitfieldIn.has(PermissionsBitField.Flags.MoveMembers) === true) {
                        permBitfield += 'Move Members\n';
                        // console.log('39');
                    };
                    // Stage Channel Permissions
                    if (bitfieldIn.has(PermissionsBitField.Flags.RequestToSpeak) === true) {
                        permBitfield += 'Request to Speak\n';
                        // console.log('40');
                    };
                    // Events Permissions
                    if (bitfieldIn.has(PermissionsBitField.Flags.ManageEvents) === true) {
                        permBitfield += 'Manage Events\n';
                        // console.log('41');
                    };
                    // Advanced Permissions
                    if (bitfieldIn.has(PermissionsBitField.Flags.Administrator) === true) {
                        permBitfield += 'Administrator\n';
                        // console.log('42');
                    };
                    // console.log('43');
                };
                const permNew = permBitfield;
                resolve(permNew || '');
                // console.log('46');
            } catch(err) {
                reject(err);
                // console.log('47');
            };
            // 41
            // axios.get(`/games?id=${gameIds.join('&id=')}`, this.requestOptions)
            //     .then((res) => {
            //         resolve(res.data.data || []);
            //     })
            //     .catch((err) => {
            //         this.handleApiError(err);
            //         reject(err);
            //     });
        });
    };
    // static permissionsNameField(namefield) {
    //     //
    // };
};

module.exports = PermissionConvert;

/**
    1  AddReactions: 
    2  Administrator: 
    3  AttachFiles: 
    4  BanMembers: 
    5  ChangeNickname: 
    6  Connect: 
    7  CreateInstantInvite: 
    8  CreatePrivateThreads: 
    9  CreatePublicThreads: 
    10 DeafenMembers: 
    11 EmbedLinks: 
    12 KickMembers: 
    13 ManageChannels: 
    14 ManageEmojisAndStickers: 
    15 ManageEvents: 
    16 ManageGuild: 
    17 ManageMessages: 
    18 ManageNicknames: 
    19 ManageRoles: 
    20 ManageThreads: 
    21 ManageWebhooks: 
    22 MentionEveryone: 
    23 ModerateMembers: 
    24 MoveMembers: 
    25 MuteMembers: 
    26 PrioritySpeaker: 
    27 ReadMessageHistory: 
    28 RequestToSpeak: 
    29 SendMessages: 
    30 SendMessagesInThreads: 
    31 SendTTSMessages: 
    32 Speak: 
    33 Stream: 
    34 UseApplicationCommands: 
    35 UseEmbeddedActivities: 
    36 UseExternalEmojis: 
    37 UseExternalStickers: 
    38 UseVAD: 
    39 ViewAuditLog: 
    40 ViewChannel: 
    42 ViewGuildInsights: 
 */