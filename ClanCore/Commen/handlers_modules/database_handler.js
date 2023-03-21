
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';

module.exports = (fs) =>{
    // Letting the Functions be called.
    // startcreate()
    level()
    update()

    // Handler Function.    
    // function startcreate() {
    //     // Checks if file exists and requires it if yes.
    //     if (fs.existsSync('./ClanCore/Modules/database/createdatabase/startcreate.js') === true) {
    //         require(`../../Modules/database/createdatabase/startcreate.js`)(client, Discord);
    //     };
    //     // Watches for changes of this file, checks for existens and requires it if yes.
    //     fs.watchFile('./ClanCore/Modules/database/createdatabase/startcreate.js', () => {
    //         if (fs.existsSync('./ClanCore/Modules/database/createdatabase/startcreate.js') === true) {
    //             require(`../../Modules/database/createdatabase/startcreate.js`)(client, Discord);
    //         };
    //         // Checks if file is not existing (anymore).
    //         if (fs.existsSync('./ClanCore/Modules/database/createdatabase/startcreate.js') === false) {
    //             return;
    //         };
    //     });
    // };
    // Same for the other Functions.
    function level() {
        if (fs.existsSync('./ClanCore/Modules/database/level/level.js') === true) {
            require(`../../Modules/database/level/level.js`)(fs);
        };
        fs.watchFile('./ClanCore/Modules/database/level/level.js', () => {
            if (fs.existsSync('./ClanCore/Modules/database/level/level.js') === true) {
                require(`../../Modules/database/level/level.js`)(fs);
            };
            if (fs.existsSync('./ClanCore/Modules/database/level/level.js') === false) {
                return;
            };
        });
    };
    function update() {
        if (fs.existsSync('./ClanCore/Modules/database/update/updateSelf.js') === true) {
            require(`../../Modules/database/update/updateSelf.js`)(fs);
        };
        fs.watchFile('./ClanCore/Modules/database/update/updateSelf.js', () => {
            if (fs.existsSync('./ClanCore/Modules/database/update/updateSelf.js') === true) {
                require(`../../Modules/database/update/updateSelf.js`)(fs);
            };
            if (fs.existsSync('./ClanCore/Modules/database/update/updateSelf.js') === false) {
                return;
            };
        });
    };
    console.log('[' + DateTime.utc().toFormat(timeFormat) + '][Discord]', 'Database Heandler loaded');
};