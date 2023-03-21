
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('invite') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.logs().prepare("ALTER TABLE invite ADD COLUMN GuildID TEXT;").run();
    };
    const create = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('invite') WHERE name = 'Creating';").get();
    if (!create['count(*)']) {
        DB.logs().prepare("ALTER TABLE invite ADD COLUMN Creating TEXT;").run();
    };
    const del = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('invite') WHERE name = 'Deleting';").get();
    if (!del['count(*)']) {
        DB.logs().prepare("ALTER TABLE invite ADD COLUMN Deleting TEXT;").run();
    };
};
