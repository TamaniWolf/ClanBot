const configmain = require('../../config/config.json');
const configchannel = require('../../config/channels.json');
const configonoff = require('../../config/onoff.json');
const configrole = require('../../config/roles.json');
const lang = require('../.' + configmain.lang);
const chalk = require('chalk');
const fs = require( 'fs' );
const path = require( 'path' );
var moment = require('moment');
require('dotenv').config();

module.exports = {
    name: 'adminhelp',
    aliases: ['ahelp'],
    description: 'admin help',
    guildOnly: true,
    async execute(client, message, args) {
        if(configonoff.command.admin.adminhelp === true) {
            const adminchannel1 = configchannel.admin.admin1;
            const adminchannel2 = configchannel.admin.admin2;
            const adminchannel3 = configchannel.admin.admin3;
            const adminchannel4 = configchannel.admin.admin4;
            const adminchannel5 = configchannel.admin.admin5;
            const admin1 = configrole.admin.admin1;
            const admin2 = configrole.admin.admin2;
            const admin3 = configrole.admin.admin3;
            const admin4 = configrole.admin.admin4;
            const admin5 = configrole.admin.admin5;
            if(message.channel.id === adminchannel1 || message.channel.id === adminchannel2 || message.channel.id === adminchannel3 || message.channel.id === adminchannel4 || message.channel.id === adminchannel5) {
                if(message.member.roles.cache.has(admin1) || message.member.roles.cache.has(admin2) || message.member.roles.cache.has(admin3) || message.member.roles.cache.has(admin4) || message.member.roles.cache.has(admin5)) {
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.help.log)));
                    message.channel.send(`***__${lang.admin.help.title}__***
    ${process.env.PREFIX}${lang.admin.help.text1}
    ${process.env.PREFIX}${lang.admin.help.text2}
    ${process.env.PREFIX}${lang.admin.help.text3}
    ${process.env.PREFIX}${lang.admin.help.text4}
    ${process.env.PREFIX}${lang.admin.help.text5}
    ${process.env.PREFIX}${lang.admin.help.text6}
    ${process.env.PREFIX}${lang.admin.help.text7}
    ${process.env.PREFIX}${lang.admin.help.text8}
    ${process.env.PREFIX}${lang.admin.help.text9}
    ${process.env.PREFIX}${lang.admin.help.text10}`);
    // ${process.env.PREFIX}${lang.admin.help.text11}
    // ${process.env.PREFIX}${lang.admin.help.text12}
    // ${process.env.PREFIX}${lang.admin.help.text13}
    // ${process.env.PREFIX}${lang.admin.help.text14}
    // ${process.env.PREFIX}${lang.admin.help.text15}
    // ${process.env.PREFIX}${lang.admin.help.text16}
    // ${process.env.PREFIX}${lang.admin.help.text17}
    // ${process.env.PREFIX}${lang.admin.help.text18}
    // ${process.env.PREFIX}${lang.admin.help.text19}
    // ${process.env.PREFIX}${lang.admin.help.text20}
    // ${process.env.PREFIX}${lang.admin.help.text21}
    // ${process.env.PREFIX}${lang.admin.help.text22}
    // ${process.env.PREFIX}${lang.admin.help.text23}
                } else {

                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.help.errorperms)));
                }
            } else {

                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.help.errorchannel)));
            }
        }
    }
}
