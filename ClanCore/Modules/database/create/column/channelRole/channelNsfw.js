
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Channel Nsfw
    const guilfID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('channel_nsfw') WHERE name = 'GuildID';").get();
    if (!guilfID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE channel_nsfw ADD COLUMN GuildID TEXT;").run();
    };
    const channelID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('channel_nsfw') WHERE name = 'ChannelID';").get();
    if (!channelID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE channel_nsfw ADD COLUMN ChannelID TEXT;").run();
    };
    const botID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('channel_nsfw') WHERE name = 'BotID';").get();
    if (!botID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE channel_nsfw ADD COLUMN BotID TEXT;").run();
    };
};
