const configmain = require('../../../config/config.json');
const configchannel = require('../../../config/channels.json');
const configonoff = require('../../../config/onoff.json');
const configrole = require('../../../config/roles.json');
const lang = require('../../.' + configmain.lang);
const chalk = require('chalk');
var moment = require('moment');
require('dotenv').config();

module.exports = {
    name: 'edit',
    description: 'editing stuff',
    guildOnly: true,
    async execute(client, message, args, Discord) {
        if(configonoff.command.admin.admin.edit === true) {
            const adminchannel1 = configchannel.admin.admin1;
            const adminchannel2 = configchannel.admin.admin2;
            const adminchannel3 = configchannel.admin.admin3;
            const admin1 = configrole.admin.admin1;
            const admin2 = configrole.admin.admin2;
            const admin3 = configrole.admin.admin3;
            if(message.channel.id === adminchannel1 || message.channel.id === adminchannel2 || message.channel.id === adminchannel3) {
                if (message.member.roles.cache.has(admin1) || message.member.roles.cache.has(admin2) || message.member.roles.cache.has(admin3)) {
                    
                    if(!args[0]) {
                        message.channel.send(`What do you want to edit? You can't edit just thin air.`)
                    }
                    if(args[0] === 'config') {
                        if(!args[1]) {
                            message.channel.send(`config \n.env \nchannel \nonoff \nroles`)
                        }
                        if(args[1] === 'config') {
                            //.
                        }
                        if(args[1] === '.env') {
                            //.
                        }
                        if(args[1] === 'channel') {
                            //.
                        }
                        if(args[1] === 'onoff') {
                            //.
                        }
                        if(args[1] === 'roles') {
                            //.
                        }
                    }

                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.ping.log)));
                } else {
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.ping.errorperms)));
                }
            } else {
                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.ping.errorchannel)));
            }
        }
    }
}
