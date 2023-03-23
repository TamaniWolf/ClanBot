
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
const { DateTime } = require('luxon');
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../functions/sqlite/prepare');
    // CONFIG
    // Config
    // Check if the table config exists.
    const tableConfig = DB.config().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'config';").get();
    if (!tableConfig['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.config().prepare("CREATE TABLE config (ConfigID TEXT PRIMARY KEY, GuildID TEXT, ShardID TEXT, BotID TEXT, Lang TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.config().prepare("CREATE UNIQUE INDEX idx_config_id ON config (ConfigID);").run();
        DB.config().pragma("synchronous = 1");
        DB.config().pragma("journal_mode = wal");
    } else if (tableConfig['count(*)']) {
        require('./column/config/config')();
    };
    //
    // ChannelRole
    // Check if the table channel_admin exists.
    const tableChannelAdmin = DB.channelRole().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'channel_admin';").get();
    if (!tableChannelAdmin['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.channelRole().prepare("CREATE TABLE channel_admin (ChannelRoleID VARCHAR PRIMARY KEY, GuildID VARCHAR, ChannelID VARCHAR, BotID VARCHAR);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.channelRole().prepare("CREATE UNIQUE INDEX idx_channeladmin_id ON channel_admin (ChannelRoleID);").run();
        DB.channelRole().pragma("synchronous = 1");
        DB.channelRole().pragma("journal_mode = wal");
    } else if (tableChannelAdmin['count(*)']) {
        require('./column/channelRole/channelAdmin')();
    };
    // Check if the table channel_birthday exists.
    const tableChannelBirthday = DB.channelRole().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'channel_birthday';").get();
    if (!tableChannelBirthday['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.channelRole().prepare("CREATE TABLE channel_birthday (ChannelRoleID VARCHAR PRIMARY KEY, GuildID VARCHAR, ChannelID VARCHAR, BotID VARCHAR);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.channelRole().prepare("CREATE UNIQUE INDEX idx_channelbirthday_id ON channel_birthday (ChannelRoleID);").run();
        DB.channelRole().pragma("synchronous = 1");
        DB.channelRole().pragma("journal_mode = wal");
    } else if (tableChannelBirthday['count(*)']) {
        require('./column/channelRole/channelBirthday')();
    };
    // Check if the table channel_log exists.
    const tableChannelLog = DB.channelRole().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'channel_log';").get();
    if (!tableChannelLog['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.channelRole().prepare("CREATE TABLE channel_log (ChannelRoleID VARCHAR PRIMARY KEY, GuildID VARCHAR, ChannelID VARCHAR, BotID VARCHAR);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.channelRole().prepare("CREATE UNIQUE INDEX idx_channellog_id ON channel_log (ChannelRoleID);").run();
        DB.channelRole().pragma("synchronous = 1");
        DB.channelRole().pragma("journal_mode = wal");
    } else if (tableChannelLog['count(*)']) {
        require('./column/channelRole/channelLog')();
    };
    // Check if the table channel_nsfw exists.
    const tableChannelNsfw = DB.channelRole().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'channel_nsfw';").get();
    if (!tableChannelNsfw['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.channelRole().prepare("CREATE TABLE channel_nsfw (ChannelRoleID VARCHAR PRIMARY KEY, GuildID VARCHAR, ChannelID VARCHAR, BotID VARCHAR);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.channelRole().prepare("CREATE UNIQUE INDEX idx_channelnsfw_id ON channel_nsfw (ChannelRoleID);").run();
        DB.channelRole().pragma("synchronous = 1");
        DB.channelRole().pragma("journal_mode = wal");
    } else if (tableChannelNsfw['count(*)']) {
        require('./column/channelRole/channelNsfw')();
    };
    // Check if the table channel_reaction exists.
    const tableChannelReaction = DB.channelRole().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'channel_reaction';").get();
    if (!tableChannelReaction['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.channelRole().prepare("CREATE TABLE channel_reaction (ChannelRoleID VARCHAR PRIMARY KEY, GuildID VARCHAR, ChannelID VARCHAR, BotID VARCHAR);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.channelRole().prepare("CREATE UNIQUE INDEX idx_channelreaction_id ON channel_reaction (ChannelRoleID);").run();
        DB.channelRole().pragma("synchronous = 1");
        DB.channelRole().pragma("journal_mode = wal");
    } else if (tableChannelReaction['count(*)']) {
        require('./column/channelRole/channelReaction')();
    };
    // Check if the table channel_user exists.
    const tableChannelUser = DB.channelRole().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'channel_user';").get();
    if (!tableChannelUser['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.channelRole().prepare("CREATE TABLE channel_user (ChannelRoleID VARCHAR PRIMARY KEY, GuildID VARCHAR, ChannelID VARCHAR, BotID VARCHAR);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.channelRole().prepare("CREATE UNIQUE INDEX idx_channeluser_id ON channel_user (ChannelRoleID);").run();
        DB.channelRole().pragma("synchronous = 1");
        DB.channelRole().pragma("journal_mode = wal");
    } else if (tableChannelUser['count(*)']) {
        require('./column/channelRole/channelMember')();
    };
    // Check if the table role_admin exists.
    const tableRoleAdmin = DB.channelRole().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'role_admin';").get();
    if (!tableRoleAdmin['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.channelRole().prepare("CREATE TABLE role_admin (ChannelRoleID VARCHAR PRIMARY KEY, GuildID VARCHAR, RoleID VARCHAR, BotID VARCHAR);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.channelRole().prepare("CREATE UNIQUE INDEX idx_roleadmin_id ON role_admin (ChannelRoleID);").run();
        DB.channelRole().pragma("synchronous = 1");
        DB.channelRole().pragma("journal_mode = wal");
    } else if (tableRoleAdmin['count(*)']) {
        require('./column/channelRole/roleAdmin')();
    };
    // Check if the table role_nsfw exists.
    const tableRoleNsfw = DB.channelRole().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'role_nsfw';").get();
    if (!tableRoleNsfw['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.channelRole().prepare("CREATE TABLE role_nsfw (ChannelRoleID VARCHAR PRIMARY KEY, GuildID VARCHAR, RoleID VARCHAR, BotID VARCHAR);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.channelRole().prepare("CREATE UNIQUE INDEX idx_rolensfw_id ON role_nsfw (ChannelRoleID);").run();
        DB.channelRole().pragma("synchronous = 1");
        DB.channelRole().pragma("journal_mode = wal");
    } else if (tableRoleNsfw['count(*)']) {
        require('./column/channelRole/roleNsfw')();
    };
    // Check if the table role_user exists.
    const tableRoleUser = DB.channelRole().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'role_user';").get();
    if (!tableRoleUser['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.channelRole().prepare("CREATE TABLE role_user (ChannelRoleID VARCHAR PRIMARY KEY, GuildID VARCHAR, RoleID VARCHAR, BotID VARCHAR);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.channelRole().prepare("CREATE UNIQUE INDEX idx_roleuser_id ON role_user (ChannelRoleID);").run();
        DB.channelRole().pragma("synchronous = 1");
        DB.channelRole().pragma("journal_mode = wal");
    } else if (tableRoleUser['count(*)']) {
        require('./column/channelRole/roleMember')();
    };
    //
    // Logs
    // Check if the table ban exists.
    const tableLogsBan = DB.logs().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'ban';").get();
    if (!tableLogsBan['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.logs().prepare("CREATE TABLE ban (LogsID VARCHAR PRIMARY KEY, GuildID VARCHAR, Adding VARCHAR, Removing VARCHAR);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.logs().prepare("CREATE UNIQUE INDEX idx_logsban_id ON ban (LogsID);").run();
        DB.logs().pragma("synchronous = 1");
        DB.logs().pragma("journal_mode = wal");
    } else if (tableLogsBan['count(*)']) {
        require('./column/logs/ban')();
    };
    // Check if the table channel exists.
    const tableLogsChannel = DB.logs().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'channel';").get();
    if (!tableLogsChannel['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.logs().prepare("CREATE TABLE channel (LogsID VARCHAR PRIMARY KEY, GuildID VARCHAR, Creating TEXT, Deleting TEXT, Updating TEXT, Pins_Update);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.logs().prepare("CREATE UNIQUE INDEX idx_logschannel_id ON channel (LogsID);").run();
        DB.logs().pragma("synchronous = 1");
        DB.logs().pragma("journal_mode = wal");
    } else if (tableLogsChannel['count(*)']) {
        require('./column/logs/channel')();
    };
    // Check if the table emoji exists.
    const tableLogsEmoji = DB.logs().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'emoji';").get();
    if (!tableLogsEmoji['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.logs().prepare("CREATE TABLE emoji (LogsID VARCHAR PRIMARY KEY, GuildID VARCHAR, Creating TEXT, Deleting TEXT, Updating TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.logs().prepare("CREATE UNIQUE INDEX idx_logsemoji_id ON emoji (LogsID);").run();
        DB.logs().pragma("synchronous = 1");
        DB.logs().pragma("journal_mode = wal");
    } else if (tableLogsEmoji['count(*)']) {
        require('./column/logs/emoji')();
    };
    // Check if the table event exists.
    const tableLogsEvent = DB.logs().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'event';").get();
    if (!tableLogsEvent['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.logs().prepare("CREATE TABLE event (LogsID VARCHAR PRIMARY KEY, GuildID VARCHAR, Creating TEXT, Deleting TEXT, Updating TEXT, User_Add TEXT, User_Remove TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.logs().prepare("CREATE UNIQUE INDEX idx_logsevent_id ON event (LogsID);").run();
        DB.logs().pragma("synchronous = 1");
        DB.logs().pragma("journal_mode = wal");
    } else if (tableLogsEvent['count(*)']) {
        require('./column/logs/event')();
    };
    // Check if the table guild exists.
    const tableLogsGuild = DB.logs().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'guild';").get();
    if (!tableLogsGuild['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.logs().prepare("CREATE TABLE guild (LogsID VARCHAR PRIMARY KEY, GuildID VARCHAR, Creating TEXT, Deleting TEXT, Updating TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.logs().prepare("CREATE UNIQUE INDEX idx_logsguild_id ON guild (LogsID);").run();
        DB.logs().pragma("synchronous = 1");
        DB.logs().pragma("journal_mode = wal");
    } else if (tableLogsGuild['count(*)']) {
        require('./column/logs/guild')();
    };
    // Check if the table invite exists.
    const tableLogsInvite = DB.logs().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'invite';").get();
    if (!tableLogsInvite['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.logs().prepare("CREATE TABLE invite (LogsID VARCHAR PRIMARY KEY, GuildID VARCHAR, Creating TEXT, Deleting TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.logs().prepare("CREATE UNIQUE INDEX idx_logsinvite_id ON invite (LogsID);").run();
        DB.logs().pragma("synchronous = 1");
        DB.logs().pragma("journal_mode = wal");
    } else if (tableLogsInvite['count(*)']) {
        require('./column/logs/invite')();
    };
    // Check if the table member exists.
    const tableLogsMember = DB.logs().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'member';").get();
    if (!tableLogsMember['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.logs().prepare("CREATE TABLE member (LogsID VARCHAR PRIMARY KEY, GuildID VARCHAR, Adding TEXT, Removing TEXT, Updating TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.logs().prepare("CREATE UNIQUE INDEX idx_logsmember_id ON member (LogsID);").run();
        DB.logs().pragma("synchronous = 1");
        DB.logs().pragma("journal_mode = wal");
    } else if (tableLogsMember['count(*)']) {
        require('./column/logs/member')();
    };
    // Check if the table message exists.
    const tableLogsMessage = DB.logs().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'message';").get();
    if (!tableLogsMessage['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.logs().prepare("CREATE TABLE message (LogsID VARCHAR PRIMARY KEY, GuildID VARCHAR, Deleting TEXT, Bulk_Delete TEXT, Updating TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.logs().prepare("CREATE UNIQUE INDEX idx_logsmessage_id ON message (LogsID);").run();
        DB.logs().pragma("synchronous = 1");
        DB.logs().pragma("journal_mode = wal");
    } else if (tableLogsMessage['count(*)']) {
        require('./column/logs/message')();
    };
    // Check if the table misc exists.
    const tableLogsMisc = DB.logs().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'misc';").get();
    if (!tableLogsMisc['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.logs().prepare("CREATE TABLE misc (LogsID VARCHAR PRIMARY KEY, GuildID VARCHAR, Integrations_Update TEXT, Command_Permissions_Update TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.logs().prepare("CREATE UNIQUE INDEX idx_logsmisc_id ON misc (LogsID);").run();
        DB.logs().pragma("synchronous = 1");
        DB.logs().pragma("journal_mode = wal");
    } else if (tableLogsMisc['count(*)']) {
        require('./column/logs/misc')();
    };
    // Check if the table roles exists.
    const tableLogsRoles = DB.logs().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'roles';").get();
    if (!tableLogsRoles['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.logs().prepare("CREATE TABLE roles (LogsID VARCHAR PRIMARY KEY, GuildID VARCHAR, Creating TEXT, Deleting TEXT, Updating TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.logs().prepare("CREATE UNIQUE INDEX idx_logsroles_id ON roles (LogsID);").run();
        DB.logs().pragma("synchronous = 1");
        DB.logs().pragma("journal_mode = wal");
    } else if (tableLogsRoles['count(*)']) {
        require('./column/logs/roles')();
    };
    // 
    // OnOff
    // Check if the table command_admin exists.
    const tableOnOffCommandAdmin = DB.onOff().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'command_admin';").get();
    if (!tableOnOffCommandAdmin['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.onOff().prepare("CREATE TABLE command_admin (OnOffID VARCHAR PRIMARY KEY, GuildID VARCHAR, Channels TEXT, Config TEXT, Language TEXT, Reaction TEXT, Roles TEXT, Info TEXT, Patchnotes TEXT, Reload TEXT, Restart TEXT, Shutdown TEXT, Updating TEXT, Ban TEXT, Kick TEXT, Mute TEXT, Unmute TEXT, Adminhelp TEXT, Clear TEXT, Ping TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.onOff().prepare("CREATE UNIQUE INDEX idx_commandadmin_id ON command_admin (OnOffID);").run();
        DB.onOff().pragma("synchronous = 1");
        DB.onOff().pragma("journal_mode = wal");
    } else if (tableOnOffCommandAdmin['count(*)']) {
        require('./column/onOff/commandAdmin')();
    };
    // Check if the table command_member exists.
    const tableOnOffCommandMember = DB.onOff().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'command_member';").get();
    if (!tableOnOffCommandMember['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.onOff().prepare("CREATE TABLE command_member (OnOffID VARCHAR PRIMARY KEY, GuildID VARCHAR, Convert TEXT, Birthday TEXT, Blush TEXT, Grouphug TEXT, Growl TEXT, Hug TEXT, Hydrate TEXT, Slap TEXT, Help TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.onOff().prepare("CREATE UNIQUE INDEX idx_commandmember_id ON command_member (OnOffID);").run();
        DB.onOff().pragma("synchronous = 1");
        DB.onOff().pragma("journal_mode = wal");
    } else if (tableOnOffCommandMember['count(*)']) {
        require('./column/onOff/commandMember')();
    };
    // Check if the table database exists.
    const tableOnOffDatabase = DB.onOff().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'database';").get();
    if (!tableOnOffDatabase['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.onOff().prepare("CREATE TABLE database (OnOffID VARCHAR PRIMARY KEY, GuildID VARCHAR, CreateDatabase TEXT, Birthdays TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.onOff().prepare("CREATE UNIQUE INDEX idx_database_id ON database (OnOffID);").run();
        DB.onOff().pragma("synchronous = 1");
        DB.onOff().pragma("journal_mode = wal");
    } else if (tableOnOffDatabase['count(*)']) {
        require('./column/onOff/database')();
    };
    // Check if the table misc exists.
    const tableOnOffMisc = DB.onOff().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'misc';").get();
    if (!tableOnOffMisc['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.onOff().prepare("CREATE TABLE misc (OnOffID VARCHAR PRIMARY KEY, GuildID VARCHAR, Botaction TEXT, Commandaction TEXT, AutoUpdate TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.onOff().prepare("CREATE UNIQUE INDEX idx_misc_id ON misc (OnOffID);").run();
        DB.onOff().pragma("synchronous = 1");
        DB.onOff().pragma("journal_mode = wal");
    } else if (tableOnOffMisc['count(*)']) {
        require('./column/onOff/misc')();
    };
    // Check if the table reaction exists.
    const tableOnOffReaction = DB.onOff().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'reaction';").get();
    if (!tableOnOffReaction['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.onOff().prepare("CREATE TABLE reaction (OnOffID VARCHAR PRIMARY KEY, GuildID VARCHAR, Reaction_True TEXT, Words_True TEXT, Words_Meep TEXT, Words_Easteregg TEXT, Words_Gay TEXT, Words_Slap);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.onOff().prepare("CREATE UNIQUE INDEX idx_reaction_id ON reaction (OnOffID);").run();
        DB.onOff().pragma("synchronous = 1");
        DB.onOff().pragma("journal_mode = wal");
    } else if (tableOnOffReaction['count(*)']) {
        require('./column/onOff/reaction')();
    };
    // Check if the table twitch exists.
    const tableOnOffTwitch = DB.onOff().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'twitch';").get();
    if (!tableOnOffTwitch['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.onOff().prepare("CREATE TABLE twitch (OnOffID VARCHAR PRIMARY KEY, GuildID VARCHAR, Twitch TEXT, Setup TEXT, Request TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.onOff().prepare("CREATE UNIQUE INDEX idx_twitch_id ON twitch (OnOffID);").run();
        DB.onOff().pragma("synchronous = 1");
        DB.onOff().pragma("journal_mode = wal");
    } else if (tableOnOffTwitch['count(*)']) {
        require('./column/onOff/twitch')();
    };
    //
    // Reaction
    // Check if the table reaction exists.
    const tableReaction = DB.reaction().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'reaction';").get();
    if (!tableReaction['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.reaction().prepare("CREATE TABLE reaction (ReactionID VARCHAR PRIMARY KEY, GuildID VARCHAR, MessageID VARCHAR, ChannelID VARCHAR, RoleID VARCHAR, Type VARCHAR, Emoji VARCHAR, Action VARCHAR, Name VARCHAR);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.reaction().prepare("CREATE UNIQUE INDEX idx_reaction_id ON reaction (ReactionID);").run();
        DB.reaction().pragma("synchronous = 1");
        DB.reaction().pragma("journal_mode = wal");
    } else if (tableReaction['count(*)']) {
        require('./column/reaction/reaction')();
    };
    //
    // MODERATION
    // AuditLog
    // Check if the table auditlog exists.
    const tableAuditLog = DB.auditLogs().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'auditlog';").get();
    if (!tableAuditLog['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.auditLogs().prepare("CREATE TABLE auditlog (AuditLogID VARCHAR PRIMARY KEY, GuildID VARCHAR, Type VARCHAR, Date VARCHAR);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.auditLogs().prepare("CREATE UNIQUE INDEX idx_auditlog_id ON auditlog (AuditLogID);").run();
        DB.auditLogs().pragma("synchronous = 1");
        DB.auditLogs().pragma("journal_mode = wal");
    } else if (tableAuditLog['count(*)']) {
        require('./column/auditLog/auditlog')();
    };
    // Check if the table msgdel exists.
    const tableMsgDel = DB.auditLogs().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'messagedel';").get();
    if (!tableMsgDel['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.auditLogs().prepare("CREATE TABLE messagedel (AuditLogID VARCHAR PRIMARY KEY, GuildID VARCHAR, Type VARCHAR, Count VARCHAR, Date VARCHAR);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.auditLogs().prepare("CREATE UNIQUE INDEX idx_messagedel_id ON messagedel (AuditLogID);").run();
        DB.auditLogs().pragma("synchronous = 1");
        DB.auditLogs().pragma("journal_mode = wal");
    } else if (tableMsgDel['count(*)']) {
        require('./column/auditLog/messageDel')();
    };
    //
    // Calender
    // Birthdays
    const tableBirthdays = DB.birthday().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'birthdays';").get();
    if (!tableBirthdays['count(*)']) {
        // If the table isn't there, create it and setup the databse correctly.
        DB.birthday().prepare("CREATE TABLE birthdays (BirthdayID VARCHAR PRIMARY KEY, GuildID VARCHAR, MemberID VARCHAR, Date VARCHAR, Timestamp VARCHAR, Month VARCHAR, Day VARCHAR, TimeZone VARCHAR, DatePublic VARCHAR, Announcement VARCHAR, Announced VARCHAR)").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.birthday().prepare("CREATE UNIQUE INDEX idx_birthdays_id ON birthdays (BirthdayID);").run();
        DB.birthday().pragma("synchronous = 1");
        DB.birthday().pragma("journal_mode = wal");
    } else if (tableBirthdays['count(*)']) {
        require('./column/birthdays/birthdays')();
    };
    //
    // Twitch
    // Check if the table twitchrequest exists.
    const tableTwitchRequest = DB.twitchRequest().prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'twitchrequest';").get();
    if (!tableTwitchRequest['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        DB.twitchRequest().prepare("CREATE TABLE twitchrequest (TwitchRequestID TEXT PRIMARY KEY, GuildID TEXT, Token TEXT, Cooldown TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        DB.twitchRequest().prepare("CREATE UNIQUE INDEX idx_twitchrequest_id ON twitchrequest (TwitchRequestID);").run();
        DB.twitchRequest().pragma("synchronous = 1");
        DB.twitchRequest().pragma("journal_mode = wal");
    } else if (tableTwitchRequest['count(*)']) {
        require('./column/twitch/twitchrequest')();
    };
    let guildsCache = globalclient.guilds.cache.size;
    if (guildsCache != 0) {
        require('./startData.js')();
    };
    console.log(`[${DateTime.utc().toFormat(timeFormat)}][Discord] Database created.`);
};