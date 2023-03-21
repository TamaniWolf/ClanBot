
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Role Nsfw
    const guildID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('role_nsfw') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE role_nsfw ADD COLUMN GuildID TEXT;").run();
    };
    const roleID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('role_nsfw') WHERE name = 'RoleID';").get();
    if (!roleID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE role_nsfw ADD COLUMN RoleID TEXT;").run();
    };
    const botID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('role_nsfw') WHERE name = 'BotID';").get();
    if (!botID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE role_nsfw ADD COLUMN BotID TEXT;").run();
    };
};
