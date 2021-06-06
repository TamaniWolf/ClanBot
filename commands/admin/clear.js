const configmain = require('../../config/config.json');
const configchannel = require('../../config/channels.json');
const configonoff = require('../../config/onoff.json');
const configrole = require('../../config/roles.json');
const lang = require('../.' + configmain.lang);
const chalk = require('chalk');
require('dotenv').config();
var moment = require('moment');

module.exports = {
    name: 'clear',
    aliases: ['clean'],
    description: 'clearing messages, min 1 - max 100, up to 14 days back',
    guildOnly: true,
    async execute(client, message, args) {
        if(configonoff.command.admin.clear === true) {
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
                    if(!args[0]) return message.reply(lang.admin.clear.numbermiss);
                    if(isNaN(args[0])) return message.reply(lang.admin.clear.numberreal);

                    if(args[0] > 100) return message.reply(lang.admin.clear.notmore);
                    if(args[0] < 1) return message.reply(lang.admin.clear.notless);

                    await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
                        message.channel.bulkDelete(messages);
                    });
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.clear.log)));
                } else {
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.clear.errorperms)));
                }
            }
        }
    }
}
