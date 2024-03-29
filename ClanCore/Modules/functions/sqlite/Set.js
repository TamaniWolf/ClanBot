
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

class Set {
    // Config
    static botConfig(id) {
        let data;
        globalclient.setConfig = sql_Config.prepare("INSERT OR REPLACE INTO config (ConfigID, GuildID, ShardID, BotID, Lang) VALUES (@ConfigID, @GuildID, @ShardID, @BotID, @Lang);");
        data = globalclient.setConfig.run(id);
        return data;
    };
    // OnOff
    static onOffForCommandAdmin(id) {
        let data;
        globalclient.setOnOffCommandAdmin = sql_OnOff.prepare("INSERT OR REPLACE INTO command_admin (OnOffID, GuildID, Channels, Config, Language, Reaction, Roles, Info, Patchnotes, Reload, Restart, Shutdown, Ban, Kick, Mute, Unmute, Adminhelp, Clear, Ping) VALUES (@OnOffID, @GuildID, @Channels, @Config, @Language, @Reaction, @Roles, @Info, @Patchnotes, @Reload, @Restart, @Shutdown, @Ban, @Kick, @Mute, @Unmute, @Adminhelp, @Clear, @Ping);");
        data = globalclient.setOnOffCommandAdmin.run(id);
        return data;
    };
    static onOffForCommandMember(id) {
        let data;
        globalclient.setOnOffCommandMember = sql_OnOff.prepare("INSERT OR REPLACE INTO command_member (OnOffID, GuildID, Convert, Eval, Birthday, Blush, Grouphug, Growl, Hug, Hydrate, Slap, Help) VALUES (@OnOffID, @GuildID, @Convert, @Eval, @Birthday, @Blush, @Grouphug, @Growl, @Hug, @Hydrate, @Slap, @Help);");
        data = globalclient.setOnOffCommandMember.run(id);
        return data;
    };
    static onOffForDatabase(id) {
        let data;
        globalclient.setOnOffDatabase = sql_OnOff.prepare("INSERT OR REPLACE INTO database (OnOffID, GuildID, CreateDatabase, Birthdays) VALUES (@OnOffID, @GuildID, @CreateDatabase, @Birthdays);");
        data = globalclient.setOnOffDatabase.run(id);
        return data;
    };
    static onOffForMisc(id) {
        let data;
        globalclient.setOnOffMisc = sql_OnOff.prepare("INSERT OR REPLACE INTO misc (OnOffID, GuildID, Botaction, Commandaction, AutoUpdate) VALUES (@OnOffID, @GuildID, @Botaction, @Commandaction, @AutoUpdate);");
        data = globalclient.setOnOffMisc.run(id);
        return data;
    };
    static onOffForReaction(id) {
        let data;
        globalclient.setOnOffReaction = sql_OnOff.prepare("INSERT OR REPLACE INTO reaction (OnOffID, GuildID, Reaction_True, Words_True, Words_Meep, Words_Easteregg, Words_Gay, Words_Slap) VALUES (@OnOffID, @GuildID, @Reaction_True, @Words_True, @Words_Meep, @Words_Easteregg, @Words_Gay, @Words_Slap);");
        data = globalclient.setOnOffReaction.run(id);
        return data;
    };
    static onOffForTwitch(id) {
        let data;
        globalclient.setOnOffTwitch = sql_OnOff.prepare("INSERT OR REPLACE INTO twitch (OnOffID, GuildID, Twitch, Setup, Request) VALUES (@OnOffID, @GuildID, @Twitch, @Setup, @Request);");
        globalclient.setOnOffTwitch.run(id);
        return data;
    };
    // Logs
    static logsForBan(id) {
        let data;
        globalclient.setLogsBan = sql_Logs.prepare("INSERT OR REPLACE INTO ban (LogsID, GuildID, Adding, Removing) VALUES (@LogsID, @GuildID, @Adding, @Removing);");
        data = globalclient.setLogsBan.run(id);
        return data;
    };
    static logsForChannel(id) {
        let data;
        globalclient.setLogsChannel = sql_Logs.prepare("INSERT OR REPLACE INTO channel (LogsID, GuildID, Creating, Deleting, Updating, Pins_Update) VALUES (@LogsID, @GuildID, @Creating, @Deleting, @Updating, @Pins_Update);");
        data = globalclient.setLogsChannel.run(id);
        return data;
    };
    static logsForEmoji(id) {
        let data;
        globalclient.setLogsEmoji = sql_Logs.prepare("INSERT OR REPLACE INTO emoji (LogsID, GuildID, Creating, Deleting, Updating) VALUES (@LogsID, @GuildID, @Creating, @Deleting, @Updating);");
        data = globalclient.setLogsEmoji.run(id);
        return data;
    };
    static logsForEvent(id) {
        let data;
        globalclient.setLogsEvent = sql_Logs.prepare("INSERT OR REPLACE INTO event (LogsID, GuildID, Creating, Deleting, Updating, User_Add, User_Remove) VALUES (@LogsID, @GuildID, @Creating, @Deleting, @Updating, @User_Add, @User_Remove);");
        data = globalclient.setLogsEvent.run(id);
        return data;
    };
    static logsForGuild(id) {
        let data;
        globalclient.setLogsGuild = sql_Logs.prepare("INSERT OR REPLACE INTO guild (LogsID, GuildID, Creating, Deleting, Updating) VALUES (@LogsID, @GuildID, @Creating, @Deleting, @Updating);");
        data = globalclient.setLogsGuild.run(id);
        return data;
    };
    static logsForInvite(id) {
        let data;
        globalclient.setLogsInvite = sql_Logs.prepare("INSERT OR REPLACE INTO invite (LogsID, GuildID, Creating, Deleting) VALUES (@LogsID, @GuildID, @Creating, @Deleting);");
        data = globalclient.setLogsInvite.run(id);
        return data;
    };
    static logsForMember(id) {
        let data;
        globalclient.setLogsMember = sql_Logs.prepare("INSERT OR REPLACE INTO member (LogsID, GuildID, Adding, Removing, Updating) VALUES (@LogsID, @GuildID, @Adding, @Removing, @Updating);");
        data = globalclient.setLogsMember.run(id);
        return data;
    };
    static logsForMessage(id) {
        let data;
        globalclient.setLogsMessage = sql_Logs.prepare("INSERT OR REPLACE INTO message (LogsID, GuildID, Deleting, Bulk_Delete, Updating) VALUES (@LogsID, @GuildID, @Deleting, @Bulk_Delete, @Updating);");
        data = globalclient.setLogsMessage.run(id);
        return data;
    };
    static logsForMisc(id) {
        let data;
        globalclient.setLogsMisc = sql_Logs.prepare("INSERT OR REPLACE INTO misc (LogsID, GuildID, Integrations_Update, Command_Permissions_Update) VALUES (@LogsID, @GuildID, @Integrations_Update, @Command_Permissions_Update);");
        data = globalclient.setLogsMisc.run(id);
        return data;
    };
    static logsForRoles(id) {
        let data;
        globalclient.setLogsRoles = sql_Logs.prepare("INSERT OR REPLACE INTO roles (LogsID, GuildID, Creating, Deleting, Updating) VALUES (@LogsID, @GuildID, @Creating, @Deleting, @Updating);");
        data = globalclient.setLogsRoles.run(id);
        return data;
    };
    // Channel
    static channelForAdmin(id) {
        let data;
        globalclient.setChannelAdmin = sql_ChannelRole.prepare("INSERT OR REPLACE INTO channel_admin (ChannelRoleID, GuildID, ChannelID, BotID) VALUES (@ChannelRoleID, @GuildID, @ChannelID, @BotID);");
        data = globalclient.setChannelAdmin.run(id);
        return data;
    };
    static channelForBirthday(id) {
        let data;
        globalclient.setChannelBirthday = sql_ChannelRole.prepare("INSERT OR REPLACE INTO channel_birthday (ChannelRoleID, GuildID, BotID, ChannelID) VALUES (@ChannelRoleID, @GuildID, @BotID, @ChannelID);");
        data = globalclient.setChannelBirthday.run(id);
        return data;
    };
    static channelForLog(id) {
        let data;
        globalclient.setChannelLog = sql_ChannelRole.prepare("INSERT OR REPLACE INTO channel_log (ChannelRoleID, GuildID, BotID, ChannelID) VALUES (@ChannelRoleID, @GuildID, @BotID, @ChannelID);");
        data = globalclient.setChannelLog.run(id);
        return data;
    };
    // static channelForNsfw(id) {
    //     let data;
    //     globalclient.setChannelNsfw = sql_ChannelRole.prepare("INSERT OR REPLACE INTO channel_nsfw (ChannelRoleID, GuildID, ChannelID, BotID) VALUES (@ChannelRoleID, @GuildID, @ChannelID, @BotID);");
    //     data = globalclient.setChannelNsfw.run(id);
    //     return data;
    // };
    static channelForReaction(id) {
        let data;
        globalclient.setChannelReaction = sql_ChannelRole.prepare("INSERT OR REPLACE INTO channel_reaction (ChannelRoleID, GuildID, ChannelID, BotID) VALUES (@ChannelRoleID, @GuildID, @ChannelID, @BotID);");
        data = globalclient.setChannelReaction.run(id);
        return data;
    };
    static channelForUser(id) {
        let data;
        globalclient.setChannelUser = sql_ChannelRole.prepare("INSERT OR REPLACE INTO channel_user (ChannelRoleID, GuildID, ChannelID, BotID) VALUES (@ChannelRoleID, @GuildID, @ChannelID, @BotID);");
        data = globalclient.setChannelUser.run(id);
        return data;
    };
    // Role
    static roleForAdmin(id) {
        let data;
        globalclient.setRoleAdmin = sql_ChannelRole.prepare("INSERT OR REPLACE INTO role_admin (ChannelRoleID, GuildID, RoleID, BotID) VALUES (@ChannelRoleID, @GuildID, @RoleID, @BotID);");
        data = globalclient.setRoleAdmin.run(id);
        return data;
    };
    static roleForNsfw(id) {
        let data;
        globalclient.setRoleNsfw = sql_ChannelRole.prepare("INSERT OR REPLACE INTO role_nsfw (ChannelRoleID, GuildID, RoleID, BotID) VALUES (@ChannelRoleID, @GuildID, @RoleID, @BotID);");
        data = globalclient.setRoleNsfw.run(id);
        return data;
    };
    static roleForUser(id) {
        let data;
        globalclient.setRoleUser = sql_ChannelRole.prepare("INSERT OR REPLACE INTO role_user (ChannelRoleID, GuildID, RoleID, BotID) VALUES (@ChannelRoleID, @GuildID, @RoleID, @BotID);");
        data = globalclient.setRoleUser.run(id);
        return data;
    };
    // Reaction
    static reactionForAction(id) {
        let data;
        globalclient.setReaction = sql_Reaction.prepare("INSERT OR REPLACE INTO reaction (ReactionID, GuildID, MessageID, ChannelID, RoleID, Type, Emoji, Action, Name) VALUES (@ReactionID, @GuildID, @MessageID, @ChannelID, @RoleID, @Type, @Emoji, @Action, @Name);");
        data = globalclient.setReaction.run(id);
        return data;
    };
    // static reactionForPoll(id) {
    //     let data;
    //     globalclient.setPoll = sql_Reaction.prepare("INSERT OR REPLACE INTO poll (ReactionID, GuildID, MessageID, ChannelID, RoleID, Type, Emoji, Action, Name) VALUES (@ReactionID, @GuildID, @MessageID, @ChannelID, @RoleID, @Type, @Emoji, @Action, @Name);");
    //     data = globalclient.setPoll.run(id);
    //     return data;
    // };
    // Twitch
    static twitchTokenRequest(id) {
        let data;
        globalclient.setTwitchToken = sql_TwitchRequest.prepare("INSERT OR REPLACE INTO twitchrequest (TwitchRequestID, GuildID, Token, Cooldown) VALUES (@TwitchRequestID, @GuildID, @Token, @Cooldown);");
        data = globalclient.setTwitchToken.run(id);
        return data;
    };
    // Calender
    static calenderForBirthdays(id) {
        let data;
        globalclient.setBirthdays = sql_Birthday.prepare("INSERT OR REPLACE INTO birthdays (BirthdayID, GuildID, MemberID, Date, Timestamp, Month, Day, TimeZone, DatePublic, Announcement, Announced) VALUES (@BirthdayID, @GuildID, @MemberID, @Date, @Timestamp, @Month, @Day, @TimeZone, @DatePublic, @Announcement, @Announced);");
        data = globalclient.setBirthdays.run(id);
        return data;
    };
    // AuditLog
    static auditLogs(id) {
        let data;
        globalclient.setAuditLogs = sql_AuditLogs.prepare("INSERT OR REPLACE INTO auditlog (AuditLogID, GuildID, Type, Date) VALUES (@AuditLogID, @GuildID, @Type, @Date);");
        data = globalclient.setAuditLogs.run(id);
        return data;
    };
    static auditLogsMsgDel(id) {
        let data;
        globalclient.setMessageDel = sql_AuditLogs.prepare("INSERT OR REPLACE INTO messagedel (AuditLogID, GuildID, Type, Count, Date) VALUES (@AuditLogID, @GuildID, @Type, @Count, @Date);");
        data = globalclient.setMessageDel.run(id);
        return data;
    };
    // Member
    // static profile(id) {
    //     let data;
    //     globalclient.setProfile = sql_Profile.prepare("INSERT OR REPLACE INTO members (ProfileID, GuildID, MemberID, DisplayName, Nickname, Consent) VALUES (@ProfileID, @GuildID, @MemberID, @DisplayName, @Nickname, @Consent);");
    //     data = globalclient.setProfile.run(id);
    //     return data;
    // };
    // static scores(id) {
    //     let data;
    //     globalclient.setScores = sql_Profile.prepare("INSERT OR REPLACE INTO scores (ProfileID, GuildID, MemberID, Exp, Level) VALUES (@ProfileID, @GuildID, @MemberID, @Exp, @Level);");
    //     data = globalclient.setScores.run(id);
    //     return data;
    // };
    // static achievements(id) {
    //     let data;
    //     globalclient.setAchievements = sql_Achievements.prepare("INSERT OR REPLACE INTO achievements (ProfileID, GuildID, Bitfield, Background, Icon, Rarity) VALUES (@ProfileID, @GuildID, @Bitfield, @Background, @Icon, @Rarity);");
    //     data = globalclient.setAchievements.run(id);
    //     return data;
    // };
};

exports.Set = Set;