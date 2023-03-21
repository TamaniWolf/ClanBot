
const { PermissionsBitField } = require('discord.js');
require('dotenv').config;

// const permissionsBitField = ;

// const permissionsNameField = ;
class ColorConvert {
    // Int to Hex
    static IntToHex(integer) {
        return new Promise((resolve, reject) => {
            try {
                let colorHexInt;
                colorHexInt = Number(integer).toString(16);
                if (colorHexInt === '0') {colorHexInt = '#000000'};
                const colorHex = colorHexInt;
                resolve(colorHex || '');
            } catch(err) {
                reject(err);
            };
        });
    };
    // Hex to Int
    static HexToInt(hexadecimal) {
        return new Promise((resolve, reject) => {
            try {
                let colorIntHex;
                colorIntHex = parseInt(hexadecimal, 16);
                if (isNaN(colorIntHex)) {colorIntHex = '0'};
                const colorInt = colorIntHex;
                resolve(colorInt || '');
            } catch(err) {
                reject(err);
            };
        });
    };
};

module.exports = ColorConvert;

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