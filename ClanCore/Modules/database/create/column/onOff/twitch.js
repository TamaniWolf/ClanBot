
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('twitch') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.onOff().prepare("ALTER TABLE twitch ADD COLUMN GuildID VARCHAR;").run();
    };
    const twitch = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('twitch') WHERE name = 'Twitch';").get();
    if (!twitch['count(*)']) {
        DB.onOff().prepare("ALTER TABLE twitch ADD COLUMN Twitch TEXT;").run();
    };
    const setup = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('twitch') WHERE name = 'Setup';").get();
    if (!setup['count(*)']) {
        DB.onOff().prepare("ALTER TABLE twitch ADD COLUMN Setup TEXT;").run();
    };
    const request = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('twitch') WHERE name = 'Request';").get();
    if (!request['count(*)']) {
        DB.onOff().prepare("ALTER TABLE twitch ADD COLUMN Request TEXT;").run();
    };
};
