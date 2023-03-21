
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.birthday().prepare("SELECT count(*) FROM pragma_table_info('birthdays') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.birthday().prepare("ALTER TABLE birthdays ADD COLUMN GuildID VARCHAR;").run();
    };
    const memberID = DB.birthday().prepare("SELECT count(*) FROM pragma_table_info('birthdays') WHERE name = 'MemberID';").get();
    if (!memberID['count(*)']) {
        DB.birthday().prepare("ALTER TABLE birthdays ADD COLUMN MemberID VARCHAR;").run();
    };
    const date = DB.birthday().prepare("SELECT count(*) FROM pragma_table_info('birthdays') WHERE name = 'Date';").get();
    if (!date['count(*)']) {
        DB.birthday().prepare("ALTER TABLE birthdays ADD COLUMN Date VARCHAR;").run();
    };
    const timestamp = DB.birthday().prepare("SELECT count(*) FROM pragma_table_info('birthdays') WHERE name = 'Timestamp';").get();
    if (!timestamp['count(*)']) {
        DB.birthday().prepare("ALTER TABLE birthdays ADD COLUMN Timestamp VARCHAR;").run();
    };
    const month = DB.birthday().prepare("SELECT count(*) FROM pragma_table_info('birthdays') WHERE name = 'Month';").get();
    if (!month['count(*)']) {
        DB.birthday().prepare("ALTER TABLE birthdays ADD COLUMN Month VARCHAR;").run();
    };
    const day = DB.birthday().prepare("SELECT count(*) FROM pragma_table_info('birthdays') WHERE name = 'Day';").get();
    if (!day['count(*)']) {
        DB.birthday().prepare("ALTER TABLE birthdays ADD COLUMN Day VARCHAR;").run();
    };
    const timeZone = DB.birthday().prepare("SELECT count(*) FROM pragma_table_info('birthdays') WHERE name = 'TimeZone';").get();
    if (!timeZone['count(*)']) {
        DB.birthday().prepare("ALTER TABLE birthdays ADD COLUMN TimeZone VARCHAR;").run();
    };
    const datePublic = DB.birthday().prepare("SELECT count(*) FROM pragma_table_info('birthdays') WHERE name = 'DatePublic';").get();
    if (!datePublic['count(*)']) {
        DB.birthday().prepare("ALTER TABLE birthdays ADD COLUMN DatePublic VARCHAR;").run();
    };
    const announcement = DB.birthday().prepare("SELECT count(*) FROM pragma_table_info('birthdays') WHERE name = 'Announcement';").get();
    if (!announcement['count(*)']) {
        DB.birthday().prepare("ALTER TABLE birthdays ADD COLUMN Announcement VARCHAR;").run();
    };
    const announced = DB.birthday().prepare("SELECT count(*) FROM pragma_table_info('birthdays') WHERE name = 'Announced';").get();
    if (!announced['count(*)']) {
        DB.birthday().prepare("ALTER TABLE birthdays ADD COLUMN Announced VARCHAR;").run();
    };
};
