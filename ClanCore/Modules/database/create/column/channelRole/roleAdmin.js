
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Role Admin
    const guildID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('role_admin') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE role_admin ADD COLUMN GuildID TEXT;").run();
    };
    const roleID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('role_admin') WHERE name = 'RoleID';").get();
    if (!roleID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE role_admin ADD COLUMN RoleID TEXT;").run();
    };
    const botID = DB.channelRole().prepare("SELECT count(*) FROM pragma_table_info('role_admin') WHERE name = 'BotID';").get();
    if (!botID['count(*)']) {
        DB.channelRole().prepare("ALTER TABLE role_admin ADD COLUMN BotID TEXT;").run();
    };
};
