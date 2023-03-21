
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('misc') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.logs().prepare("ALTER TABLE misc ADD COLUMN GuildID TEXT;").run();
    };
    const integrationUpdate = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('misc') WHERE name = 'Integration_Update';").get();
    if (!integrationUpdate['count(*)']) {
        DB.logs().prepare("ALTER TABLE misc ADD COLUMN Integration_Update TEXT;").run();
    };
    const commandPermissionsUpdate = DB.logs().prepare("SELECT count(*) FROM pragma_table_info('misc') WHERE name = 'Command_Permissions_Update';").get();
    if (!commandPermissionsUpdate['count(*)']) {
        DB.logs().prepare("ALTER TABLE misc ADD COLUMN Command_Permissions_Update TEXT;").run();
    };
};
