
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN GuildID VARCHAR;").run();
    };
    const channels = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Channels';").get();
    if (!channels['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Channels TEXT;").run();
    };
    const config = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Config';").get();
    if (!config['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Config TEXT;").run();
    };
    const language = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Language';").get();
    if (!language['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Language TEXT;").run();
    };
    const reaction = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Reaction';").get();
    if (!reaction['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Reaction TEXT;").run();
    };
    const roles = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Roles';").get();
    if (!roles['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Roles TEXT;").run();
    };
    const info = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Info';").get();
    if (!info['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Info TEXT;").run();
    };
    const patchnotes = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Patchnotes';").get();
    if (!patchnotes['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Patchnotes TEXT;").run();
    };
    const reload = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Reload';").get();
    if (!reload['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Reload TEXT;").run();
    };
    const restart = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Restart';").get();
    if (!restart['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Restart TEXT;").run();
    };
    const shutdown = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Shutdown';").get();
    if (!shutdown['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Shutdown TEXT;").run();
    };
    const updating = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Updating';").get();
    if (!updating['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Updating TEXT;").run();
    };
    const ban = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Ban';").get();
    if (!ban['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Ban TEXT;").run();
    };
    const kick = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Kick';").get();
    if (!kick['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Kick TEXT;").run();
    };
    const mute = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Mute';").get();
    if (!mute['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Mute TEXT;").run();
    };
    const unmute = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Unmute';").get();
    if (!unmute['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Unmute TEXT;").run();
    };
    const adminhelp = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Adminhelp';").get();
    if (!adminhelp['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Adminhelp TEXT;").run();
    };
    const clear = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Clear';").get();
    if (!clear['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Clear TEXT;").run();
    };
    const ping = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('command_admin') WHERE name = 'Ping';").get();
    if (!ping['count(*)']) {
        DB.onOff().prepare("ALTER TABLE command_admin ADD COLUMN Ping TEXT;").run();
    };
};
