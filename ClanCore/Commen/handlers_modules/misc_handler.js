
const fs = require('fs');
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';

module.exports = (client, Discord) =>{
    // Letting the Functions be called.
    calender()
    birthdays()
    mcping()
    status()

    // Handler Function.
    function mcping() {
        // Checks if file exists and requires it if yes.
        if (fs.existsSync('./ClanCore/Modules/misc/mcping.js') === true) {
            require(`../../Modules/misc/mcping.js`)(client, Discord);
        };
        // Watches for changes of this file, checks for existens and requires it if yes.
        fs.watchFile('./ClanCore/Modules/misc/mcping.js', () => {
            if (fs.existsSync('./ClanCore/Modules/misc/mcping.js') === true) {
                require(`../../Modules/misc/mcping.js`)(client, Discord);
            };
            // Checks if file is not existing (anymore).
            if (fs.existsSync('./ClanCore/Modules/misc/mcping.js') === false) {
                return;
            };
        });
    };
    // Same for the other Functions.
    function status() {
        if (fs.existsSync('./ClanCore/Modules/misc/status.js') === true) {
            require(`../../Modules/misc/status.js`)(client, Discord);
        };
        fs.watchFile('./ClanCore/Modules/misc/status.js', () => {
            if (fs.existsSync('./ClanCore/Modules/misc/status.js') === true) {
                require(`../../Modules/misc/status.js`)(client, Discord);
            };
            if (fs.existsSync('./ClanCore/Modules/misc/status.js') === false) {
                return;
            };
        });
    };
    function calender() {
        if (fs.existsSync('./ClanCore/Modules/misc/calender.js') === true) {
            require(`../../Modules/misc/calender.js`)(client, Discord);
        };
        fs.watchFile('./ClanCore/Modules/misc/calender.js', () => {
            if (fs.existsSync('./ClanCore/Modules/misc/calender.js') === true) {
                require(`../../Modules/misc/calender.js`)(client, Discord);
            };
            if (fs.existsSync('./ClanCore/Modules/misc/calender.js') === false) {
                return;
            };
        });
    };
    function birthdays() {
        if (fs.existsSync('./ClanCore/Modules/misc/birthday.js') === true) {
            require(`../../Modules/misc/birthday.js`)(client, Discord);
        };
        fs.watchFile('./ClanCore/Modules/misc/birthday.js', () => {
            if (fs.existsSync('./ClanCore/Modules/misc/birthday.js') === true) {
                require(`../../Modules/misc/birthday.js`)(client, Discord);
            };
            if (fs.existsSync('./ClanCore/Modules/misc/birthday.js') === false) {
                return;
            };
        });
    };

    console.log('[' + DateTime.utc().toFormat(timeFormat) + '][Discord]', 'Misc Heandler loaded');
}