
require('dotenv').config();

module.exports = () => {
    const { DB } = require('../../../../functions/sqlite/prepare');
    // Config.
    const guildID = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('reaction') WHERE name = 'GuildID';").get();
    if (!guildID['count(*)']) {
        DB.onOff().prepare("ALTER TABLE reaction ADD COLUMN GuildID VARCHAR;").run();
    };
    const reaction_True = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('reaction') WHERE name = 'Reaction_True';").get();
    if (!reaction_True['count(*)']) {
        DB.onOff().prepare("ALTER TABLE reaction ADD COLUMN Reaction_True TEXT;").run();
    };
    const words_True = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('reaction') WHERE name = 'Words_True';").get();
    if (!words_True['count(*)']) {
        DB.onOff().prepare("ALTER TABLE reaction ADD COLUMN Words_True TEXT;").run();
    };
    const words_Meep = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('reaction') WHERE name = 'Words_Meep';").get();
    if (!words_Meep['count(*)']) {
        DB.onOff().prepare("ALTER TABLE reaction ADD COLUMN Words_Meep TEXT;").run();
    };
    const words_Easteregg = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('reaction') WHERE name = 'Words_Easteregg';").get();
    if (!words_Easteregg['count(*)']) {
        DB.onOff().prepare("ALTER TABLE reaction ADD COLUMN Words_Easteregg TEXT;").run();
    };
    const words_Gay = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('reaction') WHERE name = 'Words_Gay';").get();
    if (!words_Gay['count(*)']) {
        DB.onOff().prepare("ALTER TABLE reaction ADD COLUMN Words_Gay TEXT;").run();
    };
    const words_Slap = DB.onOff().prepare("SELECT count(*) FROM pragma_table_info('reaction') WHERE name = 'Words_Slap';").get();
    if (!words_Slap['count(*)']) {
        DB.onOff().prepare("ALTER TABLE reaction ADD COLUMN Words_Slap TEXT;").run();
    };
};
