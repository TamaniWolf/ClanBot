
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('lang') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.onOff().prepare("ALTER TABLE lang ADD COLUMN GuildID VARCHAR;").run();
    };
    const langFile = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('lang') WHERE name = 'LangFile';").get();
    if (!langFile['count(*)']) {
        DB.onOff().prepare("ALTER TABLE lang ADD COLUMN LangFile TEXT;").run();
    };
};
