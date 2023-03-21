
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('guild') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.logs().prepare("ALTER TABLE guild ADD COLUMN GuildID TEXT;").run();
    };
    const add = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('guild') WHERE name = 'Creating';").get();
    if (!add['count(*)']) {
        DB.logs().prepare("ALTER TABLE guild ADD COLUMN Creating TEXT;").run();
    };
    const remove = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('guild') WHERE name = 'Deleting';").get();
    if (!remove['count(*)']) {
        DB.logs().prepare("ALTER TABLE guild ADD COLUMN Deleting TEXT;").run();
    };
    const update = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('guild') WHERE name = 'Updating';").get();
    if (!update['count(*)']) {
        DB.logs().prepare("ALTER TABLE guild ADD COLUMN Updating TEXT;").run();
    };
};
