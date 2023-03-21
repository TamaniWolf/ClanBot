
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('roles') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.logs().prepare("ALTER TABLE roles ADD COLUMN GuildID TEXT;").run();
    };
    const create = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('roles') WHERE name = 'Creating';").get();
    if (!create['count(*)']) {
        DB.logs().prepare("ALTER TABLE roles ADD COLUMN Creating TEXT;").run();
    };
    const del = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('roles') WHERE name = 'Deleting';").get();
    if (!del['count(*)']) {
        DB.logs().prepare("ALTER TABLE roles ADD COLUMN Deleting TEXT;").run();
    };
    const update = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('roles') WHERE name = 'Updating';").get();
    if (!update['count(*)']) {
        DB.logs().prepare("ALTER TABLE roles ADD COLUMN Updating TEXT;").run();
    };
};
