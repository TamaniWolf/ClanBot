
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.reaction().prepare("SELECT count(*) FROM pragma_table_info('poll') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.reaction().prepare("ALTER TABLE poll ADD COLUMN GuildID VARCHAR;").run();
    };
    const messageID = DB.reaction().prepare("SELECT count(*) FROM pragma_table_info('poll') WHERE name = 'MessageID';").get();
    if (!messageID['count(*)']) {
        DB.reaction().prepare("ALTER TABLE poll ADD COLUMN MessageID VARCHAR;").run();
    };
    const channelID = DB.reaction().prepare("SELECT count(*) FROM pragma_table_info('poll') WHERE name = 'ChannelID';").get();
    if (!channelID['count(*)']) {
        DB.reaction().prepare("ALTER TABLE poll ADD COLUMN ChannelID VARCHAR;").run();
    };
    const roleID = DB.reaction().prepare("SELECT count(*) FROM pragma_table_info('poll') WHERE name = 'RoleID';").get();
    if (!roleID['count(*)']) {
        DB.reaction().prepare("ALTER TABLE poll ADD COLUMN RoleID VARCHAR;").run();
    };
    const type = DB.reaction().prepare("SELECT count(*) FROM pragma_table_info('poll') WHERE name = 'Type';").get();
    if (!type['count(*)']) {
        DB.reaction().prepare("ALTER TABLE poll ADD COLUMN Type VARCHAR;").run();
    };
    const emoji = DB.reaction().prepare("SELECT count(*) FROM pragma_table_info('poll') WHERE name = 'Emoji';").get();
    if (!emoji['count(*)']) {
        DB.reaction().prepare("ALTER TABLE poll ADD COLUMN Emoji VARCHAR;").run();
    };
    const action = DB.reaction().prepare("SELECT count(*) FROM pragma_table_info('poll') WHERE name = 'Action';").get();
    if (!action['count(*)']) {
        DB.reaction().prepare("ALTER TABLE poll ADD COLUMN Action VARCHAR;").run();
    };
    const name = DB.reaction().prepare("SELECT count(*) FROM pragma_table_info('poll') WHERE name = 'Name';").get();
    if (!name['count(*)']) {
        DB.reaction().prepare("ALTER TABLE poll ADD COLUMN Name VARCHAR;").run();
    };
};
