
const fs = require('fs');
require('dotenv').config();

module.exports = () => {
    if (!fs.existsSync('./Database/sqlite')){
        fs.mkdirSync('./Database/sqlite');
    };
    if (!fs.existsSync('./Database/sqlite/calender')){
        fs.mkdirSync('./Database/sqlite/calender');
    };
    if (!fs.existsSync('./Database/sqlite/channelrole')){
        fs.mkdirSync('./Database/sqlite/channelrole');
    };
    if (!fs.existsSync('./Database/sqlite/config')){
        fs.mkdirSync('./Database/sqlite/config');
    };
    // if (!fs.existsSync('./Database/sqlite/member')){
    //     fs.mkdirSync('./Database/sqlite/member');
    // };
    if (!fs.existsSync('./Database/sqlite/moderation')){
        fs.mkdirSync('./Database/sqlite/moderation');
    };
    if (!fs.existsSync('./Database/sqlite/reaction')){
        fs.mkdirSync('./Database/sqlite/reaction');
    };
    if (!fs.existsSync('./Database/sqlite/twitch')){
        fs.mkdirSync('./Database/sqlite/twitch');
    };
    if (fs.existsSync('./Database/sqlite/calender/birthdays.sqlite') && fs.existsSync('./Database/sqlite/channelrole/channelRole.sqlite')
        && fs.existsSync('./Database/sqlite/config/config.sqlite') && fs.existsSync('./Database/sqlite/config/onOff.sqlite') 
        && fs.existsSync('./Database/sqlite/config/logs.sqlite') && fs.existsSync('./Database/sqlite/member/profile.sqlite')
        && fs.existsSync('./Database/sqlite/moderation/auditlog.sqlite') && fs.existsSync('./Database/sqlite/reaction/reaction.sqlite')
        && fs.existsSync('./Database/sqlite/twitch/twitch.sqlite')) {
        return;
    } else {
        // Tables
        const tablesJS = require('./tables.js')();
        tablesJS;
    };
};
