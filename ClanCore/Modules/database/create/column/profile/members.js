
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.profile().prepare("SELECT count(*) FROM pragma_table_info('members') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.profile().prepare("ALTER TABLE members ADD COLUMN GuildID TEXT;").run();
    };
    const memberID = DB.profile().prepare("SELECT count(*) FROM pragma_table_info('members') WHERE name = 'MemberID';").get();
    if (!memberID['count(*)']) {
        DB.profile().prepare("ALTER TABLE members ADD COLUMN MemberID TEXT;").run();
    };
    const displayName = DB.profile().prepare("SELECT count(*) FROM pragma_table_info('members') WHERE name = 'DisplayName';").get();
    if (!displayName['count(*)']) {
        DB.profile().prepare("ALTER TABLE members ADD COLUMN DisplayName TEXT;").run();
    };
    const nickname = DB.profile().prepare("SELECT count(*) FROM pragma_table_info('members') WHERE name = 'Nickname';").get();
    if (!nickname['count(*)']) {
        DB.profile().prepare("ALTER TABLE members ADD COLUMN Nickname TEXT;").run();
    };
    const consent = DB.profile().prepare("SELECT count(*) FROM pragma_table_info('members') WHERE name = 'Consent';").get();
    if (!consent['count(*)']) {
        DB.profile().prepare("ALTER TABLE members ADD COLUMN Consent TEXT;").run();
    };
    const achievementsID = DB.profile().prepare("SELECT count(*) FROM pragma_table_info('members') WHERE name = 'AchievementsID';").get();
    if (!achievementsID['count(*)']) {
        DB.profile().prepare("ALTER TABLE members ADD COLUMN AchievementsID TEXT;").run();
    };
};