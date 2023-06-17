
require('dotenv').config();

class SQLiteMemberData {
    static data(member, guild) {
        // SQLite
        const { Get, Set } = require('../../functions/sqlite/prepare');
        // Get/Set
        if (globalclient) {
            let getGuildId = guild.id;
            let getShardId = guild.shard.id;
            let getUser = member.user;
            if (getGuildId == null) {return;};
            let getMemberId = `${getGuildId}-${getShardId}-${getUser.id}`;
            let getConfigId = `${getGuildId}-${getShardId}-${globalclient.user.id}`;
            //
            // Members
            // let dataProfile;
            // dataProfile = Get.profile(getMemberId);
            // if (dataProfile == null) {
            //     dataProfile = { ProfileID: `${getMemberId}`, GuildID: `${getGuildId}`, MemberID: `${getUser.id}`, DisplayName: `${getUser.username}`, Nickname: `${getUser.nickname}`, Consent: `false` };
            //     Set.profile(dataProfile);
            // };
            // let dataScores;
            // dataScores = Get.scores(getMemberId);
            // if (dataScores == null) {
            //     dataScores = { ProfileID: `${getMemberId}`, GuildID: `${getGuildId}`, MemberID: `${getUser.id}`, Exp: `0`, Level: `0` };
            //     Set.scores(dataMemberScores);
            // };
            // let dataAchievements;
            // dataAchievements = Get.achievements(getConfigId);
            // if (dataAchievements == null) {
            //     dataAchievements = { AchievementsID: `${getConfigId}`, GuildID: `${getGuildId}`, Bitfield: `${getUser.id}`, Background: `${getUser.username}`, Icon: `${getUser.nickname}`, Rarity: `false` };
            //     Set.achievements(dataAchievements);
            // };
        };
    };
};
exports.SQLiteMemberData = SQLiteMemberData;
