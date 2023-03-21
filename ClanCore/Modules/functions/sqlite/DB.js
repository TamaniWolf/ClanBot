
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

class DB {
    // Config
    static config() {
        let data;
        data = sql_Config;
        return data;
    };
    static onOff() {
        let data;
        data = sql_OnOff;
        return data;
    };
    static logs() {
        let data;
        data = sql_Logs;
        return data;
    };
    static channelRole() {
        let data;
        data = sql_ChannelRole;
        return data;
    };
    static reaction() {
        let data;
        data = sql_Reaction;
        return data;
    };
    static twitchRequest() {
        let data;
        data = sql_TwitchRequest;
        return data;
    };
    static birthday() {
        let data;
        data = sql_Birthday;
        return data;
    };
    static auditLogs() {
        let data;
        data = sql_AuditLogs;
        return data;
    };
    // static memberProfile() {
    //     let data;
    //     data = sql_MemberProfile;
    //     return data;
    // };
};

exports.DB = DB;