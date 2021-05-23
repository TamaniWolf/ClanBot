const lang = require('../../lang/en_US.json');
const chalk = require('chalk');
var moment = require('moment');
const configonoff = require('../../config/onoff.json');
const channelconfig = require('../../config/channels.json');
const roleconfig = require('../../config/roles.json');
require('dotenv').config();

module.exports = {
    name: 'react',
    aliases: ['reaction'],
    description: 'Reacting on the reaction message for self assign Roles',
    guildOnly: true,
    async execute(client, message, args) {
        if(configonoff.command.admin.react === true) {
            const adminchannel1 = channelconfig.admin.admin1;
            const adminchannel2 = channelconfig.admin.admin2;
            const adminchannel3 = channelconfig.admin.admin3;
            const roleChannel1 = channelconfig.reaction.channel1;
            const rolemessage1 = channelconfig.reaction.message.message1;
            const admin1 = roleconfig.admin.admin1;
            const admin2 = roleconfig.admin.admin2;
            const admin3 = roleconfig.admin.admin3;
            if(message.channel.id === adminchannel1 || message.channel.id === adminchannel2) {
                if (message.member.roles.cache.has(admin1) || message.member.roles.cache.has(admin2) || message.member.roles.cache.has(admin3)) {
                    message.royal.channels.fetch(roleChannel1).then(channel => {
                        channel.messages.fetch(rolemessage1).then(message => {
                            message.react("⛏️");
                            message.react("<:EmoteSus:810274377098199050>");
                            message.react("<:EmotePhasmo:810274402422882345>");
                            // message.react("🍵");
                        })
                    })
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.ping.log)));
                } else {
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.ping.errorperms)));
                }
            } else {
                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.ping.errorchannel)));
            }
        }
    }
}
