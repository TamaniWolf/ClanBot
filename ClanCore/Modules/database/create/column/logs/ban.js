
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('ban') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.logs().prepare("ALTER TABLE ban ADD COLUMN GuildID VARCHAR;").run();
    };
    const add = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('ban') WHERE name = 'Adding';").get();
    if (!add['count(*)']) {
        DB.logs().prepare("ALTER TABLE ban ADD COLUMN Adding TEXT;").run();
    };
    const remove = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('ban') WHERE name = 'Removing';").get();
    if (!remove['count(*)']) {
        DB.logs().prepare("ALTER TABLE ban ADD COLUMN Removing TEXT;").run();
    };
};
