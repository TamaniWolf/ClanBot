
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('member') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.logs().prepare("ALTER TABLE member ADD COLUMN GuildID TEXT;").run();
    };
    const add = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('member') WHERE name = 'Adding';").get();
    if (!add['count(*)']) {
        DB.logs().prepare("ALTER TABLE member ADD COLUMN Adding TEXT;").run();
    };
    const remove = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('member') WHERE name = 'Removing';").get();
    if (!remove['count(*)']) {
        DB.logs().prepare("ALTER TABLE member ADD COLUMN Removing TEXT;").run();
    };
    const update = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('member') WHERE name = 'Updating';").get();
    if (!update['count(*)']) {
        DB.logs().prepare("ALTER TABLE member ADD COLUMN Updating TEXT;").run();
    };
};
