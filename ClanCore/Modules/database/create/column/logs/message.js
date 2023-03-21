
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('message') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.logs().prepare("ALTER TABLE message ADD COLUMN GuildID TEXT;").run();
    };
    const del = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('message') WHERE name = 'Deleting';").get();
    if (!del['count(*)']) {
        DB.logs().prepare("ALTER TABLE message ADD COLUMN Deleting TEXT;").run();
    };
    const bulkDel = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('message') WHERE name = 'Bulk_Delete';").get();
    if (!bulkDel['count(*)']) {
        DB.logs().prepare("ALTER TABLE message ADD COLUMN Bulk_Delete TEXT;").run();
    };
    const update = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('message') WHERE name = 'Updating';").get();
    if (!update['count(*)']) {
        DB.logs().prepare("ALTER TABLE message ADD COLUMN Updating TEXT;").run();
    };
};
