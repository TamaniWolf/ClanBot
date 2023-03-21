
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('event') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.logs().prepare("ALTER TABLE event ADD COLUMN GuildID TEXT;").run();
    };
    const create = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('event') WHERE name = 'Creating';").get();
    if (!create['count(*)']) {
        DB.logs().prepare("ALTER TABLE event ADD COLUMN Creating TEXT;").run();
    };
    const del = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('event') WHERE name = 'Deleting';").get();
    if (!del['count(*)']) {
        DB.logs().prepare("ALTER TABLE event ADD COLUMN Deleting TEXT;").run();
    };
    const update = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('event') WHERE name = 'Updating';").get();
    if (!update['count(*)']) {
        DB.logs().prepare("ALTER TABLE event ADD COLUMN Updating TEXT;").run();
    };
    const userAdd = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('event') WHERE name = 'User_Add';").get();
    if (!userAdd['count(*)']) {
        DB.logs().prepare("ALTER TABLE event ADD COLUMN User_Add TEXT;").run();
    };
    const userRemove = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('event') WHERE name = 'User_Remove';").get();
    if (!userRemove['count(*)']) {
        DB.logs().prepare("ALTER TABLE event ADD COLUMN User_Remove TEXT;").run();
    };
};
