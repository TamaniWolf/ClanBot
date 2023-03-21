
const fs = require('fs');
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';

module.exports = (client, Discord) =>{
    // Letting the Functions be called.
    autoban()
    autokick()
    serverSpam()

    // Handler Function.
    function autoban() {
        // Checks if file exists and requires it if yes.
        if (fs.existsSync('./ClanCore/Modules/moderation/autoban.js') === true) {
            require(`../../Modules/moderation/autoban.js`)(client, Discord);
        };
        // Watches for changes of this file, checks for existens and requires it if yes.
        fs.watchFile('./ClanCore/Modules/moderation/autoban.js', () => {
            if (fs.existsSync('./ClanCore/Modules/moderation/autoban.js') === true) {
                require(`../../Modules/moderation/autoban.js`)(client, Discord);
            };
            // Checks if file is not existing (anymore).
            if (fs.existsSync('./ClanCore/Modules/moderation/autoban.js') === false) {
                return;
            };
        });
    };
    // Same for the other Functions.
    function autokick() {
        if (fs.existsSync('./ClanCore/Modules/moderation/autokick.js') === true) {
            require(`../../Modules/moderation/autokick.js`)(client, Discord);
        };
        fs.watchFile('./ClanCore/Modules/moderation/autokick.js', () => {
            if (fs.existsSync('./ClanCore/Modules/moderation/autokick.js') === true) {
                require(`../../Modules/moderation/autokick.js`)(client, Discord);
            };
            if (fs.existsSync('./ClanCore/Modules/moderation/autokick.js') === false) {
                return;
            };
        });
    };

    function serverSpam() {
        if (fs.existsSync('./ClanCore/Modules/moderation/serverSpam.js') === true) {
            require(`../../Modules/moderation/serverSpam.js`)(client, Discord);
        };
        fs.watchFile('./ClanCore/Modules/moderation/serverSpam.js', () => {
            if (fs.existsSync('./ClanCore/Modules/moderation/serverSpam.js') === true) {
                require(`../../Modules/moderation/serverSpam.js`)(client, Discord);
            };
            if (fs.existsSync('./ClanCore/Modules/moderation/serverSpam.js') === false) {
                return;
            };
        });
    };

    console.log('[' + DateTime.utc().toFormat(timeFormat) + '][Discord]', 'Moderation Heandler loaded');
}