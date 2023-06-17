
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_member') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_member ADD COLUMN GuildID VARCHAR;").run();
    };
    const convert = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_member') WHERE name = 'Convert';").get();
    if (!convert['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_member ADD COLUMN Convert TEXT;").run();
    };
    const eval = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_member') WHERE name = 'Eval';").get();
    if (!eval['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_member ADD COLUMN Eval TEXT;").run();
    };
    const birthday = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_member') WHERE name = 'Birthday';").get();
    if (!birthday['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_member ADD COLUMN Birthday TEXT;").run();
    };
    const blush = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_member') WHERE name = 'Blush';").get();
    if (!blush['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_member ADD COLUMN Blush TEXT;").run();
    };
    const grouphug = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_member') WHERE name = 'Grouphug';").get();
    if (!grouphug['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_member ADD COLUMN Grouphug TEXT;").run();
    };
    const growl = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_member') WHERE name = 'Growl';").get();
    if (!growl['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_member ADD COLUMN Growl TEXT;").run();
    };
    const hug = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_member') WHERE name = 'Hug';").get();
    if (!hug['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_member ADD COLUMN Hug TEXT;").run();
    };
    const hydrate = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_member') WHERE name = 'Hydrate';").get();
    if (!hydrate['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_member ADD COLUMN Hydrate TEXT;").run();
    };
    const slap = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_member') WHERE name = 'Slap';").get();
    if (!slap['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_member ADD COLUMN Slap TEXT;").run();
    };
    const help = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_member') WHERE name = 'Help';").get();
    if (!help['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_member ADD COLUMN Help TEXT;").run();
    };
};
