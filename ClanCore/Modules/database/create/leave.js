
require('dotenv').config();

module.exports = (guild) => {
    // SQLite
    const { Del } = require('../../functions/sqlite/prepare');
    let getClientGuildId = guild.id;
    if (getClientGuildId === '100000000000000000') {
        return;
    };
    // CONFIG
    // Config
    Del.botConfig(getClientGuildId);
    // Logs
    // Logs
    Del.logsBanByGuild(getClientGuildId);
    Del.logsForChannelByGuild(getClientGuildId);
    Del.logsForEmojiByGuild(getClientGuildId);
    Del.logsForEventByGuild(getClientGuildId);
    Del.logsForGuildByGuild(getClientGuildId);
    Del.logsForInviteByGuild(getClientGuildId);
    Del.logsForMemberByGuild(getClientGuildId);
    Del.logsForMessageByGuild(getClientGuildId);
    Del.logsForMiscByGuild(getClientGuildId);
    Del.logsForRolesByGuild(getClientGuildId);
    // OnOff
    // Commands
    Del.onOffForCommandAdminByGuild(getClientGuildId);
    Del.onOffForCommandMemberByGuild(getClientGuildId);
    // Misc
    Del.onOffForDatabaseByGuild(getClientGuildId);
    Del.onOffForMiscByGuild(getClientGuildId);
    // Reaction
    Del.onOffForReactionByGuild(getClientGuildId);
    // Twitch
    Del.onOffForTwitchByGuild(getClientGuildId);
    // ChannelRole
    // Channel
    Del.channelForAdminByGuild(getClientGuildId);
    Del.channelForBirthdayByGuild(getClientGuildId);
    Del.channelForLogByGuild(getClientGuildId);
    Del.channelForReactionByGuild(getClientGuildId);
    Del.channelForUserByGuild(getClientGuildId);
    // Role
    Del.roleForAdminByGuild(getClientGuildId);
    Del.roleForNsfwByGuild(getClientGuildId);
    Del.roleForUserByGuild(getClientGuildId);
    // REACTION
    // Reaction
    // Del.reactionForPollByGuild(getClientGuildId);
    Del.reactionForActionByGuild(getClientGuildId);
    // Moderation
    Del.auditLogsByGuild(getClientGuildId);
    Del.auditLogsMsgDelByGuild(getClientGuildId);
    // Calender
    // Birthdays
    Del.calenderForBirthdaysByGuild(getClientGuildId);
    // // Profile
    // Del.memberProfileByGuild(getClientGuildId);
    // Del.memberScoresByGuild(getClientGuildId);
    // Twitch
    Del.twitchTokenRequestByGuild(getClientGuildId);
};
