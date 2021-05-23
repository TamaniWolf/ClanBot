const lang = require('../../lang/en_US.json');
const chalk = require('chalk');
const configonoff = require('../../config/onoff.json');
const configchannel = require('../../config/channels.json');
const configrole = require('../../config/roles.json');
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
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.help.log)));
                    message.channel.send(
                `***__All Admin Commands__***
    **${process.env.PREFIX}ahelp** ${lang.admin.help.text1}
    **${process.env.PREFIX}shutdown** ${lang.admin.help.text2}
    **${process.env.PREFIX}restart** ${lang.admin.help.text10}
    **${process.env.PREFIX}ping** ${lang.admin.help.text3}
    **${process.env.PREFIX}reload** ${lang.admin.help.text5}
    **${process.env.PREFIX}clear** ${lang.admin.help.text6}
    **${process.env.PREFIX}react** ${lang.admin.help.text7}
    **${process.env.PREFIX}botinfo** ${lang.admin.help.text8}
    **${process.env.PREFIX}changelog** ${lang.admin.help.text9}`);
                } else {

                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.help.errorperms)));
                }
            } else {

                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.help.errorchannel)));
            }
        }
    }
}
