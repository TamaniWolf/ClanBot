
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.config().prepare("SELECT count(*) FROM pragma_table_info('config') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.config().prepare("ALTER TABLE config ADD COLUMN GuildID TEXT;").run();
    };
    const shardID = DB.config().prepare("SELECT count(*) FROM pragma_table_info('config') WHERE name = 'ShardID';").get();
    if (!shardID['count(*)']) {
        DB.config().prepare("ALTER TABLE config ADD COLUMN ShardID TEXT;").run();
    };
    const botID = DB.config().prepare("SELECT count(*) FROM pragma_table_info('config') WHERE name = 'BotID';").get();
    if (!botID['count(*)']) {
        DB.config().prepare("ALTER TABLE config ADD COLUMN BotID TEXT;").run();
    };
    const lang = DB.config().prepare("SELECT count(*) FROM pragma_table_info('config') WHERE name = 'Lang';").get();
    if (!lang['count(*)']) {
        DB.config().prepare("ALTER TABLE config ADD COLUMN Lang TEXT;").run();
    };
};
