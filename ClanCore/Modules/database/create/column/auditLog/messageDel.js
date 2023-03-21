
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.auditLogs().prepare("SELECT count(*) FROM pragma_table_info('messagedel') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.auditLogs().prepare("ALTER TABLE messagedel ADD COLUMN GuildID VARCHAR;").run();
    };
    const type = DB.auditLogs().prepare("SELECT count(*) FROM pragma_table_info('messagedel') WHERE name = 'Type';").get();
    if (!type['count(*)']) {
        DB.auditLogs().prepare("ALTER TABLE messagedel ADD COLUMN Type VARCHAR;").run();
    };
    const count = DB.auditLogs().prepare("SELECT count(*) FROM pragma_table_info('messagedel') WHERE name = 'Count';").get();
    if (!count['count(*)']) {
        DB.auditLogs().prepare("ALTER TABLE messagedel ADD COLUMN Count VARCHAR;").run();
    };
    const date = DB.auditLogs().prepare("SELECT count(*) FROM pragma_table_info('messagedel') WHERE name = 'Date';").get();
    if (!date['count(*)']) {
        DB.auditLogs().prepare("ALTER TABLE messagedel ADD COLUMN Date VARCHAR;").run();
    };
};
