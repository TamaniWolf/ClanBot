
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Twitch Request
    const guildID = DB.twitchRequest().prepare("SELECT count(*) FROM pragma_table_info('twitchrequest') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.twitchRequest().prepare("ALTER TABLE twitchrequest ADD COLUMN GuildID VARCHAR;").run();
    };
    const token = DB.twitchRequest().prepare("SELECT count(*) FROM pragma_table_info('twitchrequest') WHERE name = 'Token';").get();
    if (!token['count(*)']) {
        DB.twitchRequest().prepare("ALTER TABLE twitchrequest ADD COLUMN Token VARCHAR;").run();
    };
    const cooldown = DB.twitchRequest().prepare("SELECT count(*) FROM pragma_table_info('twitchrequest') WHERE name = 'Cooldown';").get();
    if (!cooldown['count(*)']) {
        DB.twitchRequest().prepare("ALTER TABLE twitchrequest ADD COLUMN Cooldown VARCHAR;").run();
    };
};
