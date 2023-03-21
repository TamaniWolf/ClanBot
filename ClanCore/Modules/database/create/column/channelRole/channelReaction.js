
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Channel Reaction
    const reaction = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('channel_reaction') WHERE name = 'GuildID';").get();
    if (!reaction['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE channel_reaction ADD COLUMN GuildID TEXT;").run();
    };
    const channelID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('channel_reaction') WHERE name = 'ChannelID';").get();
    if (!channelID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE channel_reaction ADD COLUMN ChannelID TEXT;").run();
    };
    const botID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('channel_reaction') WHERE name = 'BotID';").get();
    if (!botID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE channel_reaction ADD COLUMN BotID TEXT;").run();
    };
};
