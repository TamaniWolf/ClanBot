
const SQLite = require("better-sqlite3");
const sql_Config = new SQLite('./Database/sqlite/config/config.sqlite');
const sql_OnOff = new SQLite('./Database/sqlite/config/onoff.sqlite');
const sql_Logs = new SQLite('./Database/sqlite/config/logs.sqlite');
const sql_ChannelRole = new SQLite('./Database/sqlite/channelrole/channelRole.sqlite');
const sql_Reaction = new SQLite('./Database/sqlite/reaction/reaction.sqlite');
const sql_TwitchRequest = new SQLite('./Database/sqlite/twitch/twitch.sqlite');
const sql_Birthday = new SQLite('./Database/sqlite/calender/birthdays.sqlite');
const sql_AuditLogs = new SQLite('./Database/sqlite/moderation/auditlog.sqlite');
// const sql_MemberProfile = new SQLite('./Database/sqlite/member/profile.sqlite');

class Del {
    // Config
    static botConfig(id) {
        let data;
        globalclient.delConfig = sql_Config.prepare("DELETE FROM config WHERE ConfigID = ?");
        data = globalclient.delConfig.run(id);
        return data;
    };
    // OnOff
    static onOffForCommandAdmin(id) {
        let data;
        globalclient.delOnOffCommandAdmin = sql_OnOff.prepare("DELETE FROM command_admin WHERE OnOffID = ?");
        data = globalclient.delOnOffCommandAdmin.run(id);
        return data;
    };
    static onOffForCommandMember(id) {
        let data;
        globalclient.delOnOffCommandMember = sql_OnOff.prepare("DELETE FROM command_member WHERE OnOffID = ?");
        data = globalclient.delOnOffCommandMember.run(id);
        return data;
    };
    static onOffForDatabase(id) {
        let data;
        globalclient.delOnOffDatabase = sql_OnOff.prepare("DELETE FROM database WHERE OnOffID = ?");
        data = globalclient.delOnOffDatabase.run(id);
        return data;
    };
    static onOffForMisc(id) {
        let data;
        globalclient.delOnOffMisc = sql_OnOff.prepare("DELETE FROM misc WHERE OnOffID = ?");
        data = globalclient.delOnOffMisc.run(id);
        return data;
    };
    static onOffForReaction(id) {
        let data;
        globalclient.delOnOffReaction = sql_OnOff.prepare("DELETE FROM reaction WHERE OnOffID = ?");
        data = globalclient.delOnOffReaction.run(id);
        return data;
    };
    static onOffForTwitch(id) {
        let data;
        globalclient.delOnOffTwitch = sql_OnOff.prepare("DELETE FROM twitch WHERE OnOffID = ?");
        data = globalclient.delOnOffTwitch.run(id);
        return data;
    };
    // Logs
    static logsForBan(id) {
        let data;
        globalclient.delLogsBan = sql_Logs.prepare("DELETE FROM ban WHERE LogsID = ?");
        data = globalclient.delLogsBan.run(id);
        return data;
    };
    static logsForChannel(id) {
        let data;
        globalclient.delLogsChannel = sql_Logs.prepare("DELETE FROM channel WHERE LogsID = ?");
        data = globalclient.delLogsChannel.run(id);
        return data;
    };
    static logsForEmoji(id) {
        let data;
        globalclient.delLogsEmoji = sql_Logs.prepare("DELETE FROM emoji WHERE LogsID = ?");
        data = globalclient.delLogsEmoji.run(id);
        return data;
    };
    static logsForEvent(id) {
        let data;
        globalclient.delLogsEvent = sql_Logs.prepare("DELETE FROM event WHERE LogsID = ?");
        data = globalclient.delLogsEvent.run(id);
        return data;
    };
    static logsForGuild(id) {
        let data;
        globalclient.delLogsGuild = sql_Logs.prepare("DELETE FROM guild WHERE LogsID = ?");
        data = globalclient.delLogsGuild.run(id);
        return data;
    };
    static logsForInvite(id) {
        let data;
        globalclient.delLogsInvite = sql_Logs.prepare("DELETE FROM invite WHERE LogsID = ?");
        data = globalclient.delLogsInvite.run(id);
        return data;
    };
    static logsForMember(id) {
        let data;
        globalclient.delLogsMember = sql_Logs.prepare("DELETE FROM member WHERE LogsID = ?");
        data = globalclient.delLogsMember.run(id);
        return data;
    };
    static logsForMessage(id) {
        let data;
        globalclient.delLogsMessage = sql_Logs.prepare("DELETE FROM message WHERE LogsID = ?");
        data = globalclient.delLogsMessage.run(id);
        return data;
    };
    static logsForMisc(id) {
        let data;
        globalclient.delLogsMisc = sql_Logs.prepare("DELETE FROM misc WHERE LogsID = ?");
        data = globalclient.delLogsMisc.run(id);
        return data;
    };
    static logsForRoles(id) {
        let data;
        globalclient.delLogsRole = sql_Logs.prepare("DELETE FROM roles WHERE LogsID = ?");
        data = globalclient.delLogsRoles.run(id);
        return data;
    };
    // ChannelRole
    // Channel
    static channelForAdmin(id) {
        let data;
        globalclient.delChannelAdmin = sql_ChannelRole.prepare("DELETE FROM channel_admin WHERE ChannelRoleID = ?");
        data = globalclient.delChannelAdmin.run(id);
        return data;
    };
    static channelForBirthday(id) {
        let data;
        globalclient.delChannelBirthday = sql_ChannelRole.prepare("DELETE FROM channel_birthday WHERE ChannelRoleID = ?");
        data = globalclient.delChannelBirthday.run(id);
        return data;
    };
    static channelForLog(id) {
        let data;
        globalclient.delChannelLog = sql_ChannelRole.prepare("DELETE FROM channel_log WHERE ChannelRoleID = ?");
        data = globalclient.delChannelLog.run(id);
        return data;
    };
    // static channelForNsfw(id) {
    //     let data;
    //     globalclient.delChannelNsfw = sql_ChannelRole.prepare("DELETE FROM channel_nsfw WHERE ChannelRoleID = ?");
    //     data = globalclient.delChannelNsfw.run(id);
    //     return data;
    // };
    static channelForReaction(id) {
        let data;
        globalclient.delChannelReaction = sql_ChannelRole.prepare("DELETE FROM channel_reaction WHERE ChannelRoleID = ?");
        data = globalclient.delChannelReaction.run(id);
        return data;
    };
    static channelForUser(id) {
        let data;
        globalclient.delChannelUser = sql_ChannelRole.prepare("DELETE FROM channel_user WHERE ChannelRoleID = ?");
        data = globalclient.delChannelUser.run(id);
        return data;
    };
    // Role
    static roleForAdmin(id) {
        let data;
        globalclient.delRoleAdmin = sql_ChannelRole.prepare("DELETE FROM role_admin WHERE ChannelRoleID = ?");
        data = globalclient.delRoleAdmin.run(id);
        return data;
    };
    static roleForNsfw(id) {
        let data;
        globalclient.delRoleNsfw = sql_ChannelRole.prepare("DELETE FROM role_nsfw WHERE ChannelRoleID = ?");
        data = globalclient.delRoleNsfw.run(id);
        return data;
    };
    static roleForUser(id) {
        let data;
        globalclient.delRoleUser = sql_ChannelRole.prepare("DELETE FROM role_user WHERE ChannelRoleID = ?");
        data = globalclient.delRoleUser.run(id);
        return data;
    };
    // Reaction
    static reactionForAction(id) {
        let data;
        globalclient.delReaction = sql_Reaction.prepare("DELETE FROM reaction WHERE ReactionID = ?");
        data = globalclient.delReaction.run(id);
        return data;
    };
    // static reactionForPoll(id) {
    //     let data;
    //     globalclient.delPoll = sql_Reaction.prepare("DELETE FROM poll WHERE ReactionID = ?");
    //     data = globalclient.delPoll.run(id);
    //     return data;
    // };
    // Twitchrequest
    static twitchTokenRequest(id) {
        let data;
        globalclient.delTwitchToken = sql_TwitchRequest.prepare("DELETE FROM twitchrequest WHERE TwitchRequestID = ?");
        data = globalclient.delTwitchToken.run(id);
        return data;
    };
    // Calender
    static calenderForBirthdays(id) {
        let data;
        globalclient.delBirthdays = sql_Birthday.prepare("DELETE FROM birthdays WHERE BirthdayID = ?");
        data = globalclient.delBirthdays.run(id);
        return data;
    };
    // AuditLog
    static auditLogs(id) {
        let data;
        globalclient.delAuditLogs = sql_AuditLogs.prepare("DELETE FROM auditlog WHERE AuditLogID = ?");
        data = globalclient.delAuditLogs.run(id);
        return data;
    };
    static auditLogsMsgDel(id) {
        let data;
        globalclient.delMessageDel = sql_AuditLogs.prepare("DELETE FROM messagedel WHERE AuditLogID = ?");
        data = globalclient.delMessageDel.run(id);
        return data;
    };
    // All AuditLog
    static allAuditLogs(id) {
        let data;
        globalclient.delAuditLogs = sql_AuditLogs.prepare("DELETE FROM auditlog WHERE AuditLogID = ?");
        data = globalclient.delAuditLogs.run(id);
        return data;
    };
    static allAuditLogsMsgDel(id) {
        let data;
        globalclient.delMessageDel = sql_AuditLogs.prepare("DELETE FROM messagedel WHERE AuditLogID = ?");
        data = globalclient.delMessageDel.run(id);
        return data;
    };
    // Member
    static memberProfile(id) {
        let data;
        globalclient.delMemberProfile = sql_MemberProfile.prepare("DELETE FROM member WHERE ProfileID = ?");
        data = globalclient.delMemberProfile.run(id);
        return data;
    };
    static memberScore(id) {
        let data;
        globalclient.delMemberScore = sql_MemberProfile.prepare("DELETE FROM score WHERE ProfileID = ?");
        data = globalclient.delMemberScore.run(id);
        return data;
    };
    // 
    // 
    // 
    // 
    // By Guild
    // Config
    static botConfigByGuild(id) {
        let data;
        globalclient.delConfigByGuild = sql_Config.prepare("DELETE FROM config WHERE GuildID = ?");
        data = globalclient.delConfigByGuild.run(id);
        return data;
    };
    // OnOff
    static onOffForCommandAdminByGuild(id) {
        let data;
        globalclient.delOnOffCommandAdminByGuild = sql_OnOff.prepare("DELETE FROM command_admin WHERE GuildID = ?");
        data = globalclient.delOnOffCommandAdminByGuild.run(id);
        return data;
    };
    static onOffForCommandMemberByGuild(id) {
        let data;
        globalclient.delOnOffCommandMemberByGuild = sql_OnOff.prepare("DELETE FROM command_member WHERE GuildID = ?");
        data = globalclient.delOnOffCommandMemberByGuild.run(id);
        return data;
    };
    static onOffForDatabaseByGuild(id) {
        let data;
        globalclient.delOnOffDatabaseByGuild = sql_OnOff.prepare("DELETE FROM database WHERE GuildID = ?");
        data = globalclient.delOnOffDatabaseByGuild.run(id);
        return data;
    };
    static onOffForMiscByGuild(id) {
        let data;
        globalclient.delOnOffMiscByGuild = sql_OnOff.prepare("DELETE FROM misc WHERE GuildID = ?");
        data = globalclient.delOnOffMiscByGuild.run(id);
        return data;
    };
    static onOffForReactionByGuild(id) {
        let data;
        globalclient.delOnOffReactionByGuild = sql_OnOff.prepare("DELETE FROM reaction WHERE GuildID = ?");
        data = globalclient.delOnOffReactionByGuild.run(id);
        return data;
    };
    static onOffForTwitchByGuild(id) {
        let data;
        globalclient.delOnOffTwitchByGuild = sql_OnOff.prepare("DELETE FROM twitch WHERE GuildID = ?");
        data = globalclient.delOnOffTwitchByGuild.run(id);
        return data;
    };
    // Logs
    static logsBanByGuild(id) {
        let data;
        globalclient.delLogsBanByGuild = sql_Logs.prepare("DELETE FROM ban WHERE GuildID = ?");
        data = globalclient.delLogsBanByGuild.run(id);
        return data;
    };
    static logsForChannelByGuild(id) {
        let data;
        globalclient.delLogsChannelByGuild = sql_Logs.prepare("DELETE FROM channel WHERE GuildID = ?");
        data = globalclient.delLogsChannelByGuild.run(id);
        return data;
    };
    static logsForEmojiByGuild(id) {
        let data;
        globalclient.delLogsEmojiByGuild = sql_Logs.prepare("DELETE FROM emoji WHERE GuildID = ?");
        data = globalclient.delLogsEmojiByGuild.run(id);
        return data;
    };
    static logsForEventByGuild(id) {
        let data;
        globalclient.delLogsEventByGuild = sql_Logs.prepare("DELETE FROM event WHERE GuildID = ?");
        data = globalclient.delLogsEventByGuild.run(id);
        return data;
    };
    static logsForGuildByGuild(id) {
        let data;
        globalclient.delLogsGuildByGuild = sql_Logs.prepare("DELETE FROM guild WHERE GuildID = ?");
        data = globalclient.delLogsGuildByGuild.run(id);
        return data;
    };
    static logsForInviteByGuild(id) {
        let data;
        globalclient.delLogsInviteByGuild = sql_Logs.prepare("DELETE FROM invite WHERE GuildID = ?");
        data = globalclient.delLogsInviteByGuild.run(id);
        return data;
    };
    static logsForMemberByGuild(id) {
        let data;
        globalclient.delLogsMemberByGuild = sql_Logs.prepare("DELETE FROM member WHERE GuildID = ?");
        data = globalclient.delLogsMemberByGuild.run(id);
        return data;
    };
    static logsForMessageByGuild(id) {
        let data;
        globalclient.delLogsMessageByGuild = sql_Logs.prepare("DELETE FROM message WHERE GuildID = ?");
        data = globalclient.delLogsMessageByGuild.run(id);
        return data;
    };
    static logsForMiscByGuild(id) {
        let data;
        globalclient.delLogsMiscByGuild = sql_Logs.prepare("DELETE FROM misc WHERE GuildID = ?");
        data = globalclient.delLogsMiscByGuild.run(id);
        return data;
    };
    static logsForRolesByGuild(id) {
        let data;
        globalclient.delLogsRoleByGuild = sql_Logs.prepare("DELETE FROM roles WHERE GuildID = ?");
        data = globalclient.delLogsRoleByGuild.run(id);
        return data;
    };
    // ChannelRole
    // Channel
    static channelForAdminByGuild(id) {
        let data;
        globalclient.delChannelAdminByGuild = sql_ChannelRole.prepare("DELETE FROM channel_admin WHERE GuildID = ?");
        data = globalclient.delChannelAdminByGuild.run(id);
        return data;
    };
    static channelForBirthdayByGuild(id) {
        let data;
        globalclient.delChannelBirthdayByGuild = sql_ChannelRole.prepare("DELETE FROM channel_birthday WHERE GuildID = ?");
        data = globalclient.delChannelBirthdayByGuild.run(id);
        return data;
    };
    static channelForLogByGuild(id) {
        let data;
        globalclient.delChannelLogByGuild = sql_ChannelRole.prepare("DELETE FROM channel_log WHERE GuildID = ?");
        data = globalclient.delChannelLogByGuild.run(id);
        return data;
    };
    // static channelForNsfwByGuild(id) {
    //     let data;
    //     globalclient.delChannelNsfwByGuild = sql_ChannelRole.prepare("DELETE FROM channel_nsfw WHERE GuildID = ?");
    //     data = globalclient.delChannelNsfwByGuild.run(id);
    //     return data;
    // };
    static channelForReactionByGuild(id) {
        let data;
        globalclient.delChannelReactionByGuild = sql_ChannelRole.prepare("DELETE FROM channel_reaction WHERE GuildID = ?");
        data = globalclient.delChannelReactionByGuild.run(id);
        return data;
    };
    static channelForUserByGuild(id) {
        let data;
        globalclient.delChannelUserByGuild = sql_ChannelRole.prepare("DELETE FROM channel_user WHERE GuildID = ?");
        data = globalclient.delChannelUserByGuild.run(id);
        return data;
    };
    // Role
    static roleForAdminByGuild(id) {
        let data;
        globalclient.delRoleAdminByGuild = sql_ChannelRole.prepare("DELETE FROM role_admin WHERE GuildID = ?");
        data = globalclient.delRoleAdminByGuild.run(id);
        return data;
    };
    static roleForNsfwByGuild(id) {
        let data;
        globalclient.delRoleNsfwByGuild = sql_ChannelRole.prepare("DELETE FROM role_nsfw WHERE GuildID = ?");
        data = globalclient.delRoleNsfwByGuild.run(id);
        return data;
    };
    static roleForUserByGuild(id) {
        let data;
        globalclient.delRoleUserByGuild = sql_ChannelRole.prepare("DELETE FROM role_user WHERE GuildID = ?");
        data = globalclient.delRoleUserByGuild.run(id);
        return data;
    };
    // Reaction
    static reactionForActionByGuild(id) {
        let data;
        globalclient.delReactionByGuild = sql_Reaction.prepare("DELETE FROM reaction WHERE GuildID = ?");
        data = globalclient.delReactionByGuild.run(id);
        return data;
    };
    static reactionForPollByGuild(id) {
        let data;
        globalclient.delPollByGuild = sql_Reaction.prepare("DELETE FROM poll WHERE GuildID = ?");
        data = globalclient.delPollByGuild.run(id);
        return data;
    };
    // Twitchrequest
    static twitchTokenRequestByGuild(id) {
        let data;
        globalclient.delTwitchTokenByGuild = sql_TwitchRequest.prepare("DELETE FROM twitchrequest WHERE GuildID = ?");
        data = globalclient.delTwitchTokenByGuild.run(id);
        return data;
    };
    // Calender
    static calenderForBirthdaysByGuild(id) {
        let data;
        globalclient.delBirthdaysByGuild = sql_Birthday.prepare("DELETE FROM birthdays WHERE GuildID = ?");
        data = globalclient.delBirthdaysByGuild.run(id);
        return data;
    };
    // AuditLog
    static auditLogsByGuild(id) {
        let data;
        globalclient.delAuditLogsByGuild = sql_AuditLogs.prepare("DELETE FROM auditlog WHERE GuildID = ?");
        data = globalclient.delAuditLogsByGuild.run(id);
        return data;
    };
    static auditLogsMsgDelByGuild(id) {
        let data;
        globalclient.delMessageDelByGuild = sql_AuditLogs.prepare("DELETE FROM messagedel WHERE GuildID = ?");
        data = globalclient.delMessageDelByGuild.run(id);
        return data;
    };
    // // Member
    // static memberProfileByGuild(id) {
    //     let data;
    //     globalclient.delMemberProfileByGuild = sql_MemberProfile.prepare("DELETE FROM member WHERE GuildID = ?");
    //     data = globalclient.delMemberProfileByGuild.run(id);
    //     return data;
    // };
    // static memberScoresByGuild(id) {
    //     let data;
    //     globalclient.delMemberScoreByGuild = sql_MemberProfile.prepare("DELETE FROM scores WHERE GuildID = ?");
    //     data = globalclient.delMemberScoreByGuild.run(id);
    //     return data;
    // };
};

exports.Del = Del;