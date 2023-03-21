
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';

module.exports = (fs) =>{
    // Letting the Functions be called.
    systemstart()
    updatescall()

    // Handler Function.
    function systemstart() {
        // Checks if file exists and requires it if yes.
        if (fs.existsSync('./ClanCore/Commen/bot/systemstart.js') === true) {
            require(`../bot/systemstart.js`)(fs);
        };
        // Watches for changes of this file, checks for existens and requires it if yes.
        fs.watchFile('./ClanCore/Commen/bot/systemstart.js', () => {
            if (fs.existsSync('./ClanCore/Commen/bot/systemstart.js') === true) {
                require(`../bot/systemstart.js`)(fs);
            };
            // Checks if file is not existing (anymore).
            if (fs.existsSync('./ClanCore/Commen/bot/systemstart.js') === false) {
                return;
            };
        });
    };
    // Same for the other Functions.
    function updatescall() {
        if (fs.existsSync('./ClanCore/Commen/bot/updatescall.js') === true) {
            require(`../../Commen/bot/updatescall.js`)(fs);
        };
        fs.watchFile('./ClanCore/Commen/bot/updatescall.js', () => {
            if (fs.existsSync('./ClanCore/Commen/bot/updatescall.js') === true) {
                require(`../../Commen/bot/updatescall.js`)(fs);
            };
            if (fs.existsSync('./ClanCore/Commen/bot/updatescall.js') === false) {
                return;
            };
        });
    };

    // console.log('[' + DateTime.utc().toFormat(timeFormat) + '][Discord]', 'System handler loaded');
};