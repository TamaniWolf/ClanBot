
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.auditLogs().prepare("SELECT count(*) FROM pragma_table_info('auditlog') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.auditLogs().prepare("ALTER TABLE auditlog ADD COLUMN GuildID VARCHAR;").run();
    };
    const type = DB.auditLogs().prepare("SELECT count(*) FROM pragma_table_info('auditlog') WHERE name = 'Type';").get();
    if (!type['count(*)']) {
        DB.auditLogs().prepare("ALTER TABLE auditlog ADD COLUMN Type VARCHAR;").run();
    };
    const date = DB.auditLogs().prepare("SELECT count(*) FROM pragma_table_info('auditlog') WHERE name = 'Date';").get();
    if (!date['count(*)']) {
        DB.auditLogs().prepare("ALTER TABLE auditlog ADD COLUMN Date VARCHAR;").run();
    };
};
