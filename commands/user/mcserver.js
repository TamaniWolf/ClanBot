const configmain = require('../../config/config.json');
const configchannel = require('../../config/channels.json');
const configonoff = require('../../config/onoff.json');
const configrole = require('../../config/roles.json');
const lang = require('../.' + configmain.lang);
const chalk = require('chalk');
var moment = require('moment');
require('dotenv').config();

module.exports = {
    name: 'help',
    aliases: ['commands'],
    description: 'help',
    guildOnly: true,
    async execute(client, message, args) {
        if(configonoff.command.user.help === true) {
            //console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.help.log)));
            message.channel.send(
        `***__All Commands You can use.__***
    ${process.env.PREFIX}${lang.help.text1}
    ${process.env.PREFIX}${lang.help.text2}
    ${process.env.PREFIX}${lang.help.text3}
    ${process.env.PREFIX}${lang.help.text4}
    ${process.env.PREFIX}${lang.help.text5}
    ${process.env.PREFIX}${lang.help.text6}
    ${process.env.PREFIX}${lang.help.text7}
    ${process.env.PREFIX}${lang.help.text8}`);
    // ${process.env.PREFIX}${lang.help.text9}
    // ${process.env.PREFIX}${lang.help.text10}
    // ${process.env.PREFIX}${lang.help.text11}
    // ${process.env.PREFIX}${lang.help.text12}
    // ${process.env.PREFIX}${lang.help.text13}
    // ${process.env.PREFIX}${lang.help.text14}
    // ${process.env.PREFIX}${lang.help.text15}
    // ${process.env.PREFIX}${lang.help.text16}
    // ${process.env.PREFIX}${lang.help.text17}
    // ${process.env.PREFIX}${lang.help.text18}
    // ${process.env.PREFIX}${lang.help.text19}
    // ${process.env.PREFIX}${lang.help.text20}
    // ${process.env.PREFIX}${lang.help.text21}
    // ${process.env.PREFIX}${lang.help.text22}
    // ${process.env.PREFIX}${lang.help.text23}
        }
    }
};
