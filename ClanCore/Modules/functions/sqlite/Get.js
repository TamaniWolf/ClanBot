
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

class Get {
    // Config
    static botConfig(id) {
        let data;
        globalclient.getConfig = sql_Config.prepare("SELECT * FROM config WHERE ConfigID = ?");
        data = globalclient.getConfig.get(id);
        return data;
    };
    static botConfigByClient(id) {
        let data;
        globalclient.getConfigClient = sql_Config.prepare("SELECT * FROM config WHERE BotID = ?");
        data = globalclient.getConfigClient.get(id);
        return data;
    };
    // OnOff
    static onOffForCommandAdmin(id) {
        let data;
        globalclient.getOnOffCommandAdmin = sql_OnOff.prepare("SELECT * FROM command_admin WHERE OnOffID = ?");
        data = globalclient.getOnOffCommandAdmin.get(id);
        return data;
    };
    static onOffForCommandMember(id) {
        let data;
        globalclient.getOnOffCommandMember = sql_OnOff.prepare("SELECT * FROM command_member WHERE OnOffID = ?");
        data = globalclient.getOnOffCommandMember.get(id);
        return data;
    };
    static onOffForDatabase(id) {
        let data;
        globalclient.getOnOffDatabase = sql_OnOff.prepare("SELECT * FROM database WHERE OnOffID = ?");
        data = globalclient.getOnOffDatabase.get(id);
        return data;
    };
    static onOffForMisc(id) {
        let data;
        globalclient.getOnOffMisc = sql_OnOff.prepare("SELECT * FROM misc WHERE OnOffID = ?");
        data = globalclient.getOnOffMisc.get(id);
        return data;
    };
    static onOffForReaction(id) {
        let data;
        globalclient.getOnOffReaction = sql_OnOff.prepare("SELECT * FROM reaction WHERE OnOffID = ?");
        data = globalclient.getOnOffReaction.get(id);
        return data;
    };
    static onOffForTwitch(id) {
        let data;
        globalclient.getOnOffTwitch = sql_OnOff.prepare("SELECT * FROM twitch WHERE OnOffID = ?");
        data = globalclient.getOnOffTwitch.get(id);
        return data;
    };
    // Logs
    static logsForBan(id) {
        let data;
        globalclient.getLogsBan = sql_Logs.prepare("SELECT * FROM ban WHERE LogsID = ?");
        data = globalclient.getLogsBan.get(id);
        return data;
    };
    static logsForChannel(id) {
        let data;
        globalclient.getLogsChannel = sql_Logs.prepare("SELECT * FROM channel WHERE LogsID = ?");
        data = globalclient.getLogsChannel.get(id);
        return data;
    };
    static logsForEmoji(id) {
        let data;
        globalclient.getLogsEmoji = sql_Logs.prepare("SELECT * FROM emoji WHERE LogsID = ?");
        data = globalclient.getLogsEmoji.get(id);
        return data;
    };
    static logsForEvent(id) {
        let data;
        globalclient.getLogsEvent = sql_Logs.prepare("SELECT * FROM event WHERE LogsID = ?");
        data = globalclient.getLogsEvent.get(id);
        return data;
    };
    static logsForGuild(id) {
        let data;
        globalclient.getLogsGuild = sql_Logs.prepare("SELECT * FROM guild WHERE LogsID = ?");
        data = globalclient.getLogsGuild.get(id);
        return data;
    };
    static logsForInvite(id) {
        let data;
        globalclient.getLogsInvite = sql_Logs.prepare("SELECT * FROM invite WHERE LogsID = ?");
        data = globalclient.getLogsInvite.get(id);
        return data;
    };
    static logsForMember(id) {
        let data;
        globalclient.getLogsMember = sql_Logs.prepare("SELECT * FROM member WHERE LogsID = ?");
        data = globalclient.getLogsMember.get(id);
        return data;
    };
    static logsForMessage(id) {
        let data;
        globalclient.getLogsMessage = sql_Logs.prepare("SELECT * FROM message WHERE LogsID = ?");
        data = globalclient.getLogsMessage.get(id);
        return data;
    };
    static logsForMisc(id) {
        let data;
        globalclient.getLogsMisc = sql_Logs.prepare("SELECT * FROM misc WHERE LogsID = ?");
        data = globalclient.getLogsMisc.get(id);
        return data;
    };
    static logsForRoles(id) {
        let data;
        globalclient.getLogsRoles = sql_Logs.prepare("SELECT * FROM roles WHERE LogsID = ?");
        data = globalclient.getLogsRoles.get(id);
        return data;
    };
    // ChannelRole
    // Channel
    static channelForAdmin(id) {
        let data;
        globalclient.getChannelAdmin = sql_ChannelRole.prepare("SELECT * FROM channel_admin WHERE ChannelRoleID = ?");
        data = globalclient.getChannelAdmin.get(id);
        return data;
    };
    static channelForBirthday(id) {
        let data;
        globalclient.getChannelBirthday = sql_ChannelRole.prepare("SELECT * FROM channel_birthday WHERE ChannelRoleID = ?");
        data = globalclient.getChannelBirthday.get(id);
        return data;
    };
    static channelForLog(id) {
        let data;
        globalclient.getChannelLog = sql_ChannelRole.prepare("SELECT * FROM channel_log WHERE ChannelRoleID = ?");
        data = globalclient.getChannelLog.get(id);
        return data;
    };
    // static channelForNsfw(id) {
    //     let data;
    //     globalclient.getChannelNsfw = sql_ChannelRole.prepare("SELECT * FROM channel_nsfw WHERE ChannelRoleID = ?");
    //     data = globalclient.getChannelNsfw.get(id);
    //     return data;
    // };
    static channelForReaction(id) {
        let data;
        globalclient.getChannelReaction = sql_ChannelRole.prepare("SELECT * FROM channel_reaction WHERE ChannelRoleID = ?");
        data = globalclient.getChannelReaction.get(id);
        return data;
    };
    static channelForUser(id) {
        let data;
        globalclient.getChannelUser = sql_ChannelRole.prepare("SELECT * FROM channel_user WHERE ChannelRoleID = ?");
        data = globalclient.getChannelUser.get(id);
        return data;
    };
    // Role
    static roleForAdmin(id) {
        let data;
        globalclient.getRoleAdmin = sql_ChannelRole.prepare("SELECT * FROM role_admin WHERE ChannelRoleID = ?");
        data = globalclient.getRoleAdmin.get(id);
        return data;
    };
    static roleForNsfw(id) {
        let data;
        globalclient.getRoleNsfw = sql_ChannelRole.prepare("SELECT * FROM role_nsfw WHERE ChannelRoleID = ?");
        data = globalclient.getRoleNsfw.get(id);
        return data;
    };
    static roleForUser(id) {
        let data;
        globalclient.getRoleUser = sql_ChannelRole.prepare("SELECT * FROM role_user WHERE ChannelRoleID = ?");
        data = globalclient.getRoleUser.get(id);
        return data;
    };
    // All Channel
    static allChannelForAdmin(id) {
        let data;
        globalclient.getAllChannelAdmin = sql_ChannelRole.prepare("SELECT * FROM channel_admin WHERE GuildID = ?");
        data = globalclient.getAllChannelAdmin.all(id);
        return data;
    };
    static allChannelForBirthday(id) {
        let data;
        globalclient.getAllChannelBirthday = sql_ChannelRole.prepare("SELECT * FROM channel_birthday WHERE ChannelRoleID = ?");
        data = globalclient.getAllChannelBirthday.all(id);
        return data;
    };
    static allChannelForLog(id) {
        let data;
        globalclient.getAllChannelLog = sql_ChannelRole.prepare("SELECT * FROM channel_log WHERE GuildID = ?");
        data = globalclient.getAllChannelLog.all(id);
        return data;
    };
    // static allChannelForNsfw(id) {
    //     let data;
    //     globalclient.getAllChannelNsfw = sql_ChannelRole.prepare("SELECT * FROM channel_nsfw WHERE GuildID = ?");
    //     data = globalclient.getAllChannelNsfw.all(id);
    //     return data;
    // };
    static allChannelForReaction(id) {
        let data;
        globalclient.getAllChannelReaction = sql_ChannelRole.prepare("SELECT * FROM channel_reaction WHERE GuildID = ?");
        data = globalclient.getAllChannelReaction.all(id);
        return data;
    };
    static allChannelForUser(id) {
        let data;
        globalclient.getAllChannelUser = sql_ChannelRole.prepare("SELECT * FROM channel_user WHERE GuildID = ?");
        data = globalclient.getAllChannelUser.all(id);
        return data;
    };
    // All Role
    static allRoleForAdmin(id) {
        let data;
        globalclient.getAllRoleAdmin = sql_ChannelRole.prepare("SELECT * FROM role_admin WHERE GuildID = ?");
        data = globalclient.getAllRoleAdmin.all(id);
        return data;
    };
    static allRoleForNsfw(id) {
        let data;
        globalclient.getAllRoleNsfw = sql_ChannelRole.prepare("SELECT * FROM role_nsfw WHERE GuildID = ?");
        data = globalclient.getAllRoleNsfw.all(id);
        return data;
    };
    static allRoleForUser(id) {
        let data;
        globalclient.getAllRoleUser = sql_ChannelRole.prepare("SELECT * FROM role_user WHERE GuildID = ?");
        data = globalclient.getAllRoleUser.all(id);
        return data;
    };
    // Channel by Guild
    static channelForAdminByGuild(id) {
        let data;
        globalclient.getAllChannelAdmin = sql_ChannelRole.prepare("SELECT * FROM channel_admin WHERE GuildID = ?");
        data = globalclient.getAllChannelAdmin.get(id);
        return data;
    };
    static channelForBirthdayByGuild(id) {
        let data;
        globalclient.getAllChannelBirthday = sql_ChannelRole.prepare("SELECT * FROM channel_birthday WHERE GuildID = ?");
        data = globalclient.getAllChannelBirthday.get(id);
        return data;
    };
    static channelForLogByGuild(id) {
        let data;
        globalclient.getAllChannelLog = sql_ChannelRole.prepare("SELECT * FROM channel_log WHERE GuildID = ?");
        data = globalclient.getAllChannelLog.get(id);
        return data;
    };
    // static channelForNsfwByGuild(id) {
    //     let data;
    //     globalclient.getAllChannelNsfw = sql_ChannelRole.prepare("SELECT * FROM channel_nsfw WHERE GuildID = ?");
    //     data = globalclient.getAllChannelNsfw.get(id);
    //     return data;
    // };
    static channelForReactionByGuild(id) {
        let data;
        globalclient.getAllChannelReaction = sql_ChannelRole.prepare("SELECT * FROM channel_reaction WHERE GuildID = ?");
        data = globalclient.getAllChannelReaction.get(id);
        return data;
    };
    static channelForUserByGuild(id) {
        let data;
        globalclient.getAllChannelUser = sql_ChannelRole.prepare("SELECT * FROM channel_user WHERE GuildID = ?");
        data = globalclient.getAllChannelUser.get(id);
        return data;
    };
    // Role by Guild
    static roleForAdminByGuild(id) {
        let data;
        globalclient.getAllRoleAdmin = sql_ChannelRole.prepare("SELECT * FROM role_admin WHERE GuildID = ?");
        data = globalclient.getAllRoleAdmin.get(id);
        return data;
    };
    static roleForNsfwByGuild(id) {
        let data;
        globalclient.getAllRoleNsfw = sql_ChannelRole.prepare("SELECT * FROM role_nsfw WHERE GuildID = ?");
        data = globalclient.getAllRoleNsfw.get(id);
        return data;
    };
    static roleForUserByGuild(id) {
        let data;
        globalclient.getAllRoleUser = sql_ChannelRole.prepare("SELECT * FROM role_user WHERE GuildID = ?");
        data = globalclient.getAllRoleUser.get(id);
        return data;
    };
    // Reactions
    // Reaction
    static reactionForAction(id) {
        let data;
        globalclient.getReaction = sql_Reaction.prepare("SELECT * FROM reaction WHERE ReactionID = ?");
        data = globalclient.getReaction.get(id);
        return data;
    };
    static reactionForRole(id) {
        let data;
        globalclient.getReaction = sql_Reaction.prepare("SELECT * FROM reaction WHERE RoleID = ?");
        data = globalclient.getReaction.get(id);
        return data;
    };
    static reactionForName(id) {
        let data;
        globalclient.getReaction = sql_Reaction.prepare("SELECT * FROM reaction WHERE Name = ?");
        data = globalclient.getReaction.get(id);
        return data;
    };
    // static reactionForPoll(id) {
    //     let data;
    //     globalclient.getPoll = sql_Reaction.prepare("SELECT * FROM poll WHERE ReactionID = ?");
    //     data = globalclient.getPoll.get(id);
    //     return data;
    // };
    // All Reaction
    static allReactionForAction(id) {
        let data;
        globalclient.getReaction = sql_Reaction.prepare("SELECT * FROM reaction WHERE GuildID = ?");
        data = globalclient.getReaction.all(id);
        return data;
    };
    static allReactionForRole(id) {
        let data;
        globalclient.getReaction = sql_Reaction.prepare("SELECT * FROM reaction WHERE RoleID = ?");
        data = globalclient.getReaction.all(id);
        return data;
    };
    static allReactionForName(id) {
        let data;
        globalclient.getReaction = sql_Reaction.prepare("SELECT * FROM reaction WHERE Name = ?");
        data = globalclient.getReaction.all(id);
        return data;
    };
    static allReactionForPoll(id) {
        let data;
        globalclient.getPoll = sql_Reaction.prepare("SELECT * FROM poll WHERE GuildId = ?");
        data = globalclient.getPoll.all(id);
        return data;
    };
    // Twitchrequest
    static twitchTokenRequest(id) {
        let data;
        globalclient.getTwitchToken = sql_TwitchRequest.prepare("SELECT * FROM twitchrequest WHERE TwitchRequestID = ?");
        data = globalclient.getTwitchToken.get(id);
        return data;
    };
    // Calender
    static calenderForBirthdays(id) {
        let data;
        globalclient.getBirthdays = sql_Birthday.prepare("SELECT * FROM birthdays WHERE BirthdayID = ?");
        data = globalclient.getBirthdays.get(id);
        return data;
    };
    // AuditLog
    static auditLogs(id) {
        let data;
        globalclient.getAuditLogs = sql_AuditLogs.prepare("SELECT * FROM auditlog WHERE AuditLogID = ?");
        data = globalclient.getAuditLogs.get(id);
        return data;
    };
    static auditLogsMsgDel(id) {
        let data;
        globalclient.getMessageDel = sql_AuditLogs.prepare("SELECT * FROM messagedel WHERE AuditLogID = ?");
        data = globalclient.getMessageDel.get(id);
        return data;
    };
    // All AuditLog
    static allAuditLogs(id) {
        let data;
        globalclient.getAuditLogs = sql_AuditLogs.prepare("SELECT * FROM auditlog WHERE Type = ? ORDER BY Date ASC LIMIT 5");
        data = globalclient.getAuditLogs.all(id);
        return data;
    };
    static allAuditLogsMsgDel(id) {
        let data;
        globalclient.getMessageDel = sql_AuditLogs.prepare("SELECT * FROM messagedel WHERE Type = ? ORDER BY Date ASC LIMIT 5");
        data = globalclient.getMessageDel.all(id);
        return data;
    };
    // // Member
    // static memberProfile(id) {
    //     let data;
    //     globalclient.getMemberProfile = sql_MemberProfile.prepare("SELECT * FROM member WHERE ProfileID = ?");
    //     data = globalclient.getMemberProfile.get(id);
    //     return data;
    // };
    // static memberScores(id) {
    //     let data;
    //     globalclient.getMemberScore = sql_MemberProfile.prepare("SELECT * FROM scores WHERE ProfileID = ?");
    //     data = globalclient.getMemberScore.get(id);
    //     return data;
    // };
};

exports.Get = Get;