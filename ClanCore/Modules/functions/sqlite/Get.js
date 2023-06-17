
// Require SQLite and Databases
const SQLite = require("better-sqlite3");
const sql_Config = new SQLite('./Database/sqlite/config/config.sqlite');
const sql_OnOff = new SQLite('./Database/sqlite/config/onoff.sqlite');
const sql_Logs = new SQLite('./Database/sqlite/config/logs.sqlite');
const sql_ChannelRole = new SQLite('./Database/sqlite/channelrole/channelRole.sqlite');
const sql_Reaction = new SQLite('./Database/sqlite/reaction/reaction.sqlite');
const sql_TwitchRequest = new SQLite('./Database/sqlite/twitch/twitch.sqlite');
const sql_Birthday = new SQLite('./Database/sqlite/calender/birthdays.sqlite');
const sql_AuditLogs = new SQLite('./Database/sqlite/moderation/auditlog.sqlite');
// const sql_Profile = new SQLite('./Database/sqlite/member/profile.sqlite');
// const sql_Achievements = new SQLite('./Database/sqlite/member/achievements.sqlite');

class Get {
    // Regular
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
    // Twitch
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
    // Member
    // static profile(id) {
    //     let data;
    //     globalclient.getProfile = sql_Profile.prepare("SELECT * FROM members WHERE ProfileID = ?");
    //     data = globalclient.getProfile.get(id);
    //     return data;
    // };
    // static scores(id) {
    //     let data;
    //     globalclient.getScore = sql_Profile.prepare("SELECT * FROM scores WHERE ProfileID = ?");
    //     data = globalclient.getScore.get(id);
    //     return data;
    // };
    // static achievements(id) {
    //     let data;
    //     globalclient.getAchievements = sql_Achievements.prepare("SELECT * FROM achievements WHERE AchievementsID = ?");
    //     data = globalclient.getAchievements.get(id);
    //     return data;
    // };


    
    // By Guild
    // Config by Guild
    static botConfigByGuild(id) {
        let data;
        globalclient.getConfigByGuild = sql_Config.prepare("SELECT * FROM config WHERE GuildID = ?");
        data = globalclient.getConfigByGuild.get(id);
        return data;
    };
    // OnOff by Guild
    static onOffForCommandAdminByGuild(id) {
        let data;
        globalclient.getOnOffCommandAdminByGuild = sql_OnOff.prepare("SELECT * FROM command_admin WHERE OnOffID = ?");
        data = globalclient.getOnOffCommandAdminByGuild.get(id);
        return data;
    };
    static onOffForCommandMemberByGuild(id) {
        let data;
        globalclient.getOnOffCommandMemberByGuild = sql_OnOff.prepare("SELECT * FROM command_member WHERE OnOffID = ?");
        data = globalclient.getOnOffCommandMemberByGuild.get(id);
        return data;
    };
    static onOffForDatabaseByGuild(id) {
        let data;
        globalclient.getOnOffDatabaseByGuild = sql_OnOff.prepare("SELECT * FROM database WHERE OnOffID = ?");
        data = globalclient.getOnOffDatabaseByGuild.get(id);
        return data;
    };
    static onOffForMiscByGuild(id) {
        let data;
        globalclient.getOnOffMiscByGuild = sql_OnOff.prepare("SELECT * FROM misc WHERE OnOffID = ?");
        data = globalclient.getOnOffMiscByGuild.get(id);
        return data;
    };
    static onOffForReactionByGuild(id) {
        let data;
        globalclient.getOnOffReactionByGuild = sql_OnOff.prepare("SELECT * FROM reaction WHERE OnOffID = ?");
        data = globalclient.getOnOffReactionByGuild.get(id);
        return data;
    };
    static onOffForTwitchByGuild(id) {
        let data;
        globalclient.getOnOffTwitchByGuild = sql_OnOff.prepare("SELECT * FROM twitch WHERE OnOffID = ?");
        data = globalclient.getOnOffTwitchByGuild.get(id);
        return data;
    };
    // Logs by Guild
    static logsForBanByGuild(id) {
        let data;
        globalclient.getLogsBanByGuild = sql_Logs.prepare("SELECT * FROM ban WHERE LogsID = ?");
        data = globalclient.getLogsBanByGuild.get(id);
        return data;
    };
    static logsForChannelByGuild(id) {
        let data;
        globalclient.getLogsChannelByGuild = sql_Logs.prepare("SELECT * FROM channel WHERE LogsID = ?");
        data = globalclient.getLogsChannelByGuild.get(id);
        return data;
    };
    static logsForEmojiByGuild(id) {
        let data;
        globalclient.getLogsEmojiByGuild = sql_Logs.prepare("SELECT * FROM emoji WHERE LogsID = ?");
        data = globalclient.getLogsEmojiByGuild.get(id);
        return data;
    };
    static logsForEventByGuild(id) {
        let data;
        globalclient.getLogsEventByGuild = sql_Logs.prepare("SELECT * FROM event WHERE LogsID = ?");
        data = globalclient.getLogsEventByGuild.get(id);
        return data;
    };
    static logsForGuildByGuild(id) {
        let data;
        globalclient.getLogsGuildByGuild = sql_Logs.prepare("SELECT * FROM guild WHERE LogsID = ?");
        data = globalclient.getLogsGuildByGuild.get(id);
        return data;
    };
    static logsForInviteByGuild(id) {
        let data;
        globalclient.getLogsInviteByGuild = sql_Logs.prepare("SELECT * FROM invite WHERE LogsID = ?");
        data = globalclient.getLogsInviteByGuild.get(id);
        return data;
    };
    static logsForMemberByGuild(id) {
        let data;
        globalclient.getLogsMemberByGuild = sql_Logs.prepare("SELECT * FROM member WHERE LogsID = ?");
        data = globalclient.getLogsMemberByGuild.get(id);
        return data;
    };
    static logsForMessageByGuild(id) {
        let data;
        globalclient.getLogsMessageByGuild = sql_Logs.prepare("SELECT * FROM message WHERE LogsID = ?");
        data = globalclient.getLogsMessageByGuild.get(id);
        return data;
    };
    static logsForMiscByGuild(id) {
        let data;
        globalclient.getLogsMiscByGuild = sql_Logs.prepare("SELECT * FROM misc WHERE LogsID = ?");
        data = globalclient.getLogsMiscByGuild.get(id);
        return data;
    };
    static logsForRolesByGuild(id) {
        let data;
        globalclient.getLogsRolesByGuild = sql_Logs.prepare("SELECT * FROM roles WHERE LogsID = ?");
        data = globalclient.getLogsRolesByGuild.get(id);
        return data;
    };
    // Channel by Guild
    static channelForAdminByGuild(id) {
        let data;
        globalclient.getChannelAdminByGuild = sql_ChannelRole.prepare("SELECT * FROM channel_admin WHERE GuildID = ?");
        data = globalclient.getChannelAdminByGuild.get(id);
        return data;
    };
    static channelForBirthdayByGuild(id) {
        let data;
        globalclient.getChannelBirthdayByGuild = sql_ChannelRole.prepare("SELECT * FROM channel_birthday WHERE GuildID = ?");
        data = globalclient.getChannelBirthdayByGuild.get(id);
        return data;
    };
    static channelForLogByGuild(id) {
        let data;
        globalclient.getChannelLogByGuild = sql_ChannelRole.prepare("SELECT * FROM channel_log WHERE GuildID = ?");
        data = globalclient.getChannelLogByGuild.get(id);
        return data;
    };
    // static channelForNsfwByGuild(id) {
    //     let data;
    //     globalclient.getChannelNsfwByGuild = sql_ChannelRole.prepare("SELECT * FROM channel_nsfw WHERE GuildID = ?");
    //     data = globalclient.getChannelNsfwByGuild.get(id);
    //     return data;
    // };
    static channelForReactionByGuild(id) {
        let data;
        globalclient.getChannelReactionByGuild = sql_ChannelRole.prepare("SELECT * FROM channel_reaction WHERE GuildID = ?");
        data = globalclient.getChannelReactionByGuild.get(id);
        return data;
    };
    static channelForUserByGuild(id) {
        let data;
        globalclient.getChannelUserByGuild = sql_ChannelRole.prepare("SELECT * FROM channel_user WHERE GuildID = ?");
        data = globalclient.getChannelUserByGuild.get(id);
        return data;
    };
    // Role by Guild
    static roleForAdminByGuild(id) {
        let data;
        globalclient.getRoleAdminByGuild = sql_ChannelRole.prepare("SELECT * FROM role_admin WHERE GuildID = ?");
        data = globalclient.getRoleAdminByGuild.get(id);
        return data;
    };
    static roleForNsfwByGuild(id) {
        let data;
        globalclient.getRoleNsfwByGuild = sql_ChannelRole.prepare("SELECT * FROM role_nsfw WHERE GuildID = ?");
        data = globalclient.getRoleNsfwByGuild.get(id);
        return data;
    };
    static roleForUserByGuild(id) {
        let data;
        globalclient.getRoleUserByGuild = sql_ChannelRole.prepare("SELECT * FROM role_user WHERE GuildID = ?");
        data = globalclient.getRoleUserByGuild.get(id);
        return data;
    };
    // Reaction by Guild
    static reactionByGuild(id) {
        let data;
        globalclient.getReactionByGuild = sql_Reaction.prepare("SELECT * FROM reaction WHERE GuildID = ?");
        data = globalclient.getReactionByGuild.get(id);
        return data;
    };
    // static reactionForPollByGuild(id) {
    //     let data;
    //     globalclient.getPollByGuild = sql_Reaction.prepare("SELECT * FROM poll WHERE GuildID = ?");
    //     data = globalclient.getPollByGuild.get(id);
    //     return data;
    // };
    // Twitch by Guild
    static twitchTokenRequestByGuild(id) {
        let data;
        globalclient.getTwitchTokenByGuild = sql_TwitchRequest.prepare("SELECT * FROM twitchrequest WHERE GuildID = ?");
        data = globalclient.getTwitchTokenByGuild.get(id);
        return data;
    };
    // Calender by Guild
    static calenderForBirthdaysByGuild(id) {
        let data;
        globalclient.getBirthdaysByGuild = sql_Birthday.prepare("SELECT * FROM birthdays WHERE GuildID = ?");
        data = globalclient.getBirthdaysByGuild.get(id);
        return data;
    };
    // AuditLog by Guild
    static auditLogsByGuild(id) {
        let data;
        globalclient.getAuditLogsByGuild = sql_AuditLogs.prepare("SELECT * FROM auditlog WHERE GuildID = ?");
        data = globalclient.getAuditLogsByGuild.get(id);
        return data;
    };
    static auditLogsMsgDelByGuild(id) {
        let data;
        globalclient.getMessageDelByGuild = sql_AuditLogs.prepare("SELECT * FROM messagedel WHERE GuildID = ?");
        data = globalclient.getMessageDelByGuild.get(id);
        return data;
    };
    // Member by Guild
    // static profileByGuild(id) {
    //     let data;
    //     globalclient.getProfileByGuild = sql_Profile.prepare("SELECT * FROM member WHERE GuildID = ?");
    //     data = globalclient.getProfileByGuild.get(id);
    //     return data;
    // };
    // static scoresByGuild(id) {
    //     let data;
    //     globalclient.getScoreByGuild = sql_Profile.prepare("SELECT * FROM scores WHERE GuildID = ?");
    //     data = globalclient.getScoreByGuild.get(id);
    //     return data;
    // };
    // static achievementsByGuild(id) {
    //     let data;
    //     globalclient.getAchievementsByGuild = sql_Achievements.prepare("SELECT * FROM achievements WHERE GuildID = ?");
    //     data = globalclient.getAchievementsByGuild.get(id);
    //     return data;
    // };



    // All
    // All Config
    static allBotConfig(id) {
        let data;
        globalclient.getAllConfig = sql_Config.prepare("SELECT * FROM config WHERE GuildID = ?");
        data = globalclient.getAllConfig.get(id);
        return data;
    };
    // All OnOff
    static allOnOffForCommandAdmin(id) {
        let data;
        globalclient.getAllOnOffCommandAdmin = sql_OnOff.prepare("SELECT * FROM command_admin WHERE GuildID = ?");
        data = globalclient.getAllOnOffCommandAdmin.get(id);
        return data;
    };
    static allOnOffForCommandMember(id) {
        let data;
        globalclient.getAllOnOffCommandMember = sql_OnOff.prepare("SELECT * FROM command_member WHERE GuildID = ?");
        data = globalclient.getAllOnOffCommandMember.get(id);
        return data;
    };
    static allOnOffForDatabase(id) {
        let data;
        globalclient.getAllOnOffDatabase = sql_OnOff.prepare("SELECT * FROM database WHERE GuildID = ?");
        data = globalclient.getAllOnOffDatabase.get(id);
        return data;
    };
    static allOnOffForMisc(id) {
        let data;
        globalclient.getAllOnOffMisc = sql_OnOff.prepare("SELECT * FROM misc WHERE GuildID = ?");
        data = globalclient.getAllOnOffMisc.get(id);
        return data;
    };
    static allOnOffForReaction(id) {
        let data;
        globalclient.getAllOnOffReaction = sql_OnOff.prepare("SELECT * FROM reaction WHERE GuildID = ?");
        data = globalclient.getAllOnOffReaction.get(id);
        return data;
    };
    static allOnOffForTwitch(id) {
        let data;
        globalclient.getAllOnOffTwitch = sql_OnOff.prepare("SELECT * FROM twitch WHERE GuildID = ?");
        data = globalclient.getAllOnOffTwitch.get(id);
        return data;
    };
    // All Logs
    static allLogsForBan(id) {
        let data;
        globalclient.getAllLogsBan = sql_Logs.prepare("SELECT * FROM ban WHERE GuildID = ?");
        data = globalclient.getAllLogsBan.get(id);
        return data;
    };
    static allLogsForChannel(id) {
        let data;
        globalclient.getAllLogsChannel = sql_Logs.prepare("SELECT * FROM channel WHERE GuildID = ?");
        data = globalclient.getAllLogsChannel.get(id);
        return data;
    };
    static allLogsForEmoji(id) {
        let data;
        globalclient.getAllLogsEmoji = sql_Logs.prepare("SELECT * FROM emoji WHERE GuildID = ?");
        data = globalclient.getAllLogsEmoji.get(id);
        return data;
    };
    static allLogsForEvent(id) {
        let data;
        globalclient.getAllLogsEvent = sql_Logs.prepare("SELECT * FROM event WHERE GuildID = ?");
        data = globalclient.getAllLogsEvent.get(id);
        return data;
    };
    static allLogsForGuild(id) {
        let data;
        globalclient.getAllLogsGuild = sql_Logs.prepare("SELECT * FROM guild WHERE GuildID = ?");
        data = globalclient.getAllLogsGuild.get(id);
        return data;
    };
    static allLogsForInvite(id) {
        let data;
        globalclient.getAllLogsInvite = sql_Logs.prepare("SELECT * FROM invite WHERE GuildID = ?");
        data = globalclient.getAllLogsInvite.get(id);
        return data;
    };
    static allLogsForMember(id) {
        let data;
        globalclient.getAllLogsMember = sql_Logs.prepare("SELECT * FROM member WHERE GuildID = ?");
        data = globalclient.getAllLogsMember.get(id);
        return data;
    };
    static allLogsForMessage(id) {
        let data;
        globalclient.getAllLogsMessage = sql_Logs.prepare("SELECT * FROM message WHERE GuildID = ?");
        data = globalclient.getAllLogsMessage.get(id);
        return data;
    };
    static allLogsForMisc(id) {
        let data;
        globalclient.getAllLogsMisc = sql_Logs.prepare("SELECT * FROM misc WHERE GuildID = ?");
        data = globalclient.getAllLogsMisc.get(id);
        return data;
    };
    static allLogsForRoles(id) {
        let data;
        globalclient.getAllLogsRoles = sql_Logs.prepare("SELECT * FROM roles WHERE GuildID = ?");
        data = globalclient.getAllLogsRoles.get(id);
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
    // All Reaction
    static allReactionForAction(id) {
        let data;
        globalclient.getAllReaction = sql_Reaction.prepare("SELECT * FROM reaction WHERE GuildID = ?");
        data = globalclient.getAllReaction.all(id);
        return data;
    };
    static allReactionForPoll(id) {
        let data;
        globalclient.getAllPoll = sql_Reaction.prepare("SELECT * FROM poll WHERE GuildID = ?");
        data = globalclient.getAllPoll.all(id);
        return data;
    };
    // All Twitch
    static allTwitchTokenRequest(id) {
        let data;
        globalclient.getAllTwitchToken = sql_TwitchRequest.prepare("SELECT * FROM twitchrequest WHERE GuildID = ?");
        data = globalclient.getAllTwitchToken.get(id);
        return data;
    };
    // All Calender
    static allCalenderForBirthdays(id) {
        let data;
        globalclient.getAllBirthdays = sql_Birthday.prepare("SELECT * FROM birthdays WHERE GuildID = ?");
        data = globalclient.getAllBirthdays.get(id);
        return data;
    };
    // All AuditLog
    static allAuditLogs(id) {
        let data;
        globalclient.getAllAuditLogs = sql_AuditLogs.prepare("SELECT * FROM auditlog WHERE Type = ? ORDER BY Date ASC LIMIT 5");
        data = globalclient.getAllAuditLogs.all(id);
        return data;
    };
    static allAuditLogsMsgDel(id) {
        let data;
        globalclient.getAllMessageDel = sql_AuditLogs.prepare("SELECT * FROM messagedel WHERE Type = ? ORDER BY Date ASC LIMIT 5");
        data = globalclient.getAllMessageDel.all(id);
        return data;
    };
    // All Member
    // static allProfile(id) {
    //     let data;
    //     globalclient.getAllProfile = sql_Profile.prepare("SELECT * FROM member WHERE GuildID = ?");
    //     data = globalclient.getAllProfile.get(id);
    //     return data;
    // };
    // static allScores(id) {
    //     let data;
    //     globalclient.getAllScore = sql_Profile.prepare("SELECT * FROM scores WHERE GuildID = ?");
    //     data = globalclient.getAllScore.get(id);
    //     return data;
    // };
    // static allAchievements(id) {
    //     let data;
    //     globalclient.getAllAchievements = sql_Achievements.prepare("SELECT * FROM achievements WHERE GuildID = ?");
    //     data = globalclient.getAllAchievements.get(id);
    //     return data;
    // };
};

exports.Get = Get;