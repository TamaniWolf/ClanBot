
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('misc') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.onOff().prepare("ALTER TABLE misc ADD COLUMN GuildID VARCHAR;").run();
    };
    const botaction = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('misc') WHERE name = 'Botaction';").get();
    if (!botaction['count(*)']) {
        DB.onOff().prepare("ALTER TABLE misc ADD COLUMN Botaction TEXT;").run();
    };
    const commandaction = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('misc') WHERE name = 'Commandaction';").get();
    if (!commandaction['count(*)']) {
        DB.onOff().prepare("ALTER TABLE misc ADD COLUMN Commandaction TEXT;").run();
    };
    const autoUpdate = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('misc') WHERE name = 'AutoUpdate';").get();
    if (!autoUpdate['count(*)']) {
        DB.onOff().prepare("ALTER TABLE misc ADD COLUMN AutoUpdate TEXT;").run();
    };
};
