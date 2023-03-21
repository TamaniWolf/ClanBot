
require('dotenv').config();

class SQLiteTableData {
    static data(guild) {
        // SQLite
        const { Get, Set } = require('../../functions/sqlite/prepare');
        // Get/Set
        if (globalclient) {
            let getClientGuildId = guild.id;
            let getClientShardId = guild.shard.id;
            let getClientUserId = globalclient.user.id;
            if (getClientGuildId == null) {return;};
            let getBotConfigId = `${getClientGuildId}-${getClientShardId}`;
            let getBirthdayID = `${getBotConfigId}-${getClientUserId}`;
            // let getMemberId = `${getClientGuildId}-${getClientShardId}-${getClientUserId}`;
            let getChannelLogId = `${getClientGuildId}-${getClientShardId}`;
            // CONFIG
            // Config
            let dataConfig;
            dataConfig = Get.botConfig(getBotConfigId);
            if (dataConfig == null) {
                dataConfig = { ConfigID: `${getBotConfigId}`, GuildID: `${getClientGuildId}`, ShardID: `${getClientShardId}`, BotID: `${getClientUserId}`, Lang: `./Database/lang/en_US.json` };
                Set.botConfig(dataConfig);
            };
            // LOGS
            // Logs
            let dataLogsBan;
            dataLogsBan = Get.logsForBan(getChannelLogId);
            if (dataLogsBan == null) {
                dataLogsBan = { LogsID: `${getChannelLogId}`, GuildID: `${getClientGuildId}`, Adding: 'true', Removing: 'true' };
                Set.logsForBan(dataLogsBan);
            };
            let dataLogsChannel;
            dataLogsChannel = Get.logsForChannel(getChannelLogId);
            if (dataLogsChannel == null) {
                dataLogsChannel = { LogsID: `${getChannelLogId}`, GuildID: `${getClientGuildId}`, Creating: 'true', Deleting: 'true', Updating: 'true', Pins_Update: 'true' };
                Set.logsForChannel(dataLogsChannel);
            };
            let dataLogsEmoji;
            dataLogsEmoji = Get.logsForEmoji(getChannelLogId);
            if (dataLogsEmoji == null) {
                dataLogsEmoji = { LogsID: `${getChannelLogId}`, GuildID: `${getClientGuildId}`, Creating: 'true', Deleting: 'true', Updating: 'true' };
                Set.logsForEmoji(dataLogsEmoji);
            };
            let dataLogsEvent;
            dataLogsEvent = Get.logsForEvent(getChannelLogId);
            if (dataLogsEvent == null) {
                dataLogsEvent = { LogsID: `${getChannelLogId}`, GuildID: `${getClientGuildId}`, Creating: 'true', Deleting: 'true', Updating: 'true', User_Add: 'true', User_Remove: 'true' };
                Set.logsForEvent(dataLogsEvent);
            };
            let dataLogsGuild;
            dataLogsGuild = Get.logsForGuild(getChannelLogId);
            if (dataLogsGuild == null) {
                dataLogsGuild = { LogsID: `${getChannelLogId}`, GuildID: `${getClientGuildId}`, Creating: 'true', Deleting: 'true', Updating: 'true' };
                Set.logsForGuild(dataLogsGuild);
            };
            let dataLogsInvite;
            dataLogsInvite = Get.logsForInvite(getChannelLogId);
            if (dataLogsInvite == null) {
                dataLogsInvite = { LogsID: `${getChannelLogId}`, GuildID: `${getClientGuildId}`, Creating: 'true', Deleting: 'true' };
                Set.logsForInvite(dataLogsInvite);
            };
            let dataLogsMember;
            dataLogsMember = Get.logsForMember(getChannelLogId);
            if (dataLogsMember == null) {
                dataLogsMember = { LogsID: `${getChannelLogId}`, GuildID: `${getClientGuildId}`, Adding: 'true', Removing: 'true', Updating: 'true' };
                Set.logsForMember(dataLogsMember);
            };
            let dataLogsMessage;
            dataLogsMessage = Get.logsForMessage(getChannelLogId);
            if (dataLogsMessage == null) {
                dataLogsMessage = { LogsID: `${getChannelLogId}`, GuildID: `${getClientGuildId}`, Deleting: 'true', Bulk_Delete: 'true', Updating: 'true' };
                Set.logsForMessage(dataLogsMessage);
            };
            let dataLogsMisc;
            dataLogsMisc = Get.logsForMisc(getChannelLogId);
            if (dataLogsMisc == null) {
                dataLogsMisc = { LogsID: `${getChannelLogId}`, GuildID: `${getClientGuildId}`, Integrations_Update: 'true', Command_Permissions_Update: 'true' };
                Set.logsForMisc(dataLogsMisc);
            };
            let dataLogsRoles;
            dataLogsRoles = Get.logsForRoles(getChannelLogId);
            if (dataLogsRoles == null) {
                dataLogsRoles = { LogsID: `${getChannelLogId}`, GuildID: `${getClientGuildId}`, Creating: 'true', Deleting: 'true', Updating: 'true' };
                Set.logsForRoles(dataLogsRoles);
            };
            // OnOff
            // Commands
            let dataOnOffCommandAdmin;
            dataOnOffCommandAdmin = Get.onOffForCommandAdmin(getBotConfigId);
            if (dataOnOffCommandAdmin == null) {
                dataOnOffCommandAdmin = { OnOffID: `${getBotConfigId}`, GuildID: `${getClientGuildId}`, Channels: `true`, Config: `true`, Language: `true`, Reaction: `true`, Roles: `true`, Info: `true`, Patchnotes: `true`, Reload: `false`, Restart: `false`, Shutdown: `false`, Updating: `true`, Ban: `false`, Kick: `false`, Mute: `true`, Unmute: `true`, Adminhelp: `true`, Clear: `true`, Ping: `true` };
                Set.onOffForCommandAdmin(dataOnOffCommandAdmin);
            };
            let dataOnOffCommandMember;
            dataOnOffCommandMember = Get.onOffForCommandMember(getBotConfigId);
            if (dataOnOffCommandMember == null) {
                dataOnOffCommandMember = { OnOffID: `${getBotConfigId}`, GuildID: `${getClientGuildId}`, Convert: `true`, Birthday: `false`, Blush: `true`, Grouphug: `true`, Growl: `true`, Hug: `true`, Hydrate: `true`, Slap: `true`, Help: `true` };
                Set.onOffForCommandMember(dataOnOffCommandMember);
            };
            // Misc
            let dataOnOffDatabase;
            dataOnOffDatabase = Get.onOffForDatabase(getBotConfigId);
            if (dataOnOffDatabase == null) {
                dataOnOffDatabase = { OnOffID: `${getBotConfigId}`, GuildID: `${getClientGuildId}`, CreateDatabase: `true`, Birthdays: `false` };
                Set.onOffForDatabase(dataOnOffDatabase);
            };
            let dataOnOffMisc;
            dataOnOffMisc = Get.onOffForMisc(getBotConfigId);
            if (dataOnOffMisc == null) {
                dataOnOffMisc = { OnOffID: `${getBotConfigId}`, GuildID: `${getClientGuildId}`, Botaction: `false`, Commandaction: `false`, AutoUpdate: `false` };
                Set.onOffForMisc(dataOnOffMisc);
            };
            // Reaction
            let dataOnOffReaction;
            dataOnOffReaction = Get.onOffForReaction(getBotConfigId);
            if (dataOnOffReaction == null) {
                dataOnOffReaction = { OnOffID: `${getBotConfigId}`, GuildID: `${getClientGuildId}`, Reaction_True: `false`, Words_True: `false`, Words_Meep: `false`, Words_Easteregg: `false`, Words_Gay: `false`, Words_Slap: `false` };
                Set.onOffForReaction(dataOnOffReaction);
            };
            // Twitch
            let dataOnOffTwitch;
            dataOnOffTwitch = Get.onOffForTwitch(getBotConfigId);
            if (dataOnOffTwitch == null) {
                dataOnOffTwitch = { OnOffID: `${getBotConfigId}`, GuildID: `${getClientGuildId}`, Twitch: `false`, Setup: `false`, Request: `false` };
                Set.onOffForTwitch(dataOnOffTwitch);
            };
            // Calender
            // Birthdays
            let dataCalenderBirthdays;
            dataCalenderBirthdays = Get.calenderForBirthdays(getBirthdayID);
            if (dataCalenderBirthdays == null) {
                dataCalenderBirthdays = { BirthdayID: `${getBirthdayID}`, GuildID: `${getClientGuildId}`, MemberID: `${globalclient.user.id}`, Date: `Apr-05`, Timestamp: `8118001`, Month: `04`, Day: `05`, TimeZone: 'UTC', DatePublic: 'false', Announcement: 'false', Announced: 'false' };
                Set.calenderForBirthdays(dataCalenderBirthdays);
            };
            // // Profile
            // let dataMemberProfile;
            // dataMemberProfile = Get.memberProfile(getMemberId);
            // if (dataMemberProfile == null) {
            //     dataMemberProfile = { ProfileID: `${getMemberId}`, GuildID: `${getClientGuildId}`, JoinTimestamp: `${globalclient.user.jointimestamp}`, PremiumTimestamp: `${globalclient.user.premiumtimestamp}`, Nickname: `${globalclient.user.nickname}`, MemberID: `${getClientUserId}`, DisplayName: `${globalclient.user.username}` };
            //     Set.memberProfile(dataMemberProfile);
            // };
            // let dataMemberScores;
            // dataMemberScores = Get.memberScores(getMemberId);
            // if (dataMemberScores == null) {
            //     dataMemberScores = { ProfileID: `${getMemberId}`, MemberID: `${getClientUserId}`, GuildID: `${getClientGuildId}`, Exp: `0`, Level: `0` };
            //     Set.memberScores(dataMemberScores);
            // };
            // Twitch
            let dataTwitchTokenRequest;
            dataTwitchTokenRequest = Get.twitchTokenRequest(getBotConfigId);
            if (dataTwitchTokenRequest == null) {
                dataTwitchTokenRequest = { TwitchRequestID: `${getBotConfigId}`, GuildID: `${getClientGuildId}`, Token: `0`, Cooldown: `2022-02-09T04:05:35.364Z` };
                Set.twitchTokenRequest(dataTwitchTokenRequest);
            };
        };
    };
};
exports.SQLiteTableData = SQLiteTableData;
