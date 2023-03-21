
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Role Member
    const guildID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('role_user') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE role_user ADD COLUMN GuildID TEXT;").run();
    };
    const roleID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('role_user') WHERE name = 'RoleID';").get();
    if (!roleID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE role_user ADD COLUMN RoleID TEXT;").run();
    };
    const botID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('role_user') WHERE name = 'BotID';").get();
    if (!botID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE role_user ADD COLUMN BotID TEXT;").run();
    };
};
