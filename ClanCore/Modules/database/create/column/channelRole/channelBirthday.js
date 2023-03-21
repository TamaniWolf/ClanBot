
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Channel Birthday.
    const guildID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('channel_birthday') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE channel_birthday ADD COLUMN GuildID TEXT;").run();
    };
    const channelID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('channel_birthday') WHERE name = 'ChannelID';").get();
    if (!channelID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE channel_birthday ADD COLUMN ChannelID TEXT;").run();
    };
    const botID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('channel_birthday') WHERE name = 'BotID';").get();
    if (!botID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE channel_birthday ADD COLUMN BotID TEXT;").run();
    };
};
