
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('database') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.onOff().prepare("ALTER TABLE database ADD COLUMN GuildID VARCHAR;").run();
    };
    const createDatabase = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('database') WHERE name = 'CreateDatabase';").get();
    if (!createDatabase['count(*)']) {
        DB.onOff().prepare("ALTER TABLE database ADD COLUMN CreateDatabase TEXT;").run();
    };
    const birthdays = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('database') WHERE name = 'Birthdays';").get();
    if (!birthdays['count(*)']) {
        DB.onOff().prepare("ALTER TABLE database ADD COLUMN Birthdays TEXT;").run();
    };
};
