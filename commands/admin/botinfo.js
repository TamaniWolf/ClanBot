const lang = require('../../lang/en_US.json');
const config = require('../../config/config.json');
const chalk = require('chalk');
const configonoff = require('../../config/onoff.json');
const channelconfig = require('../../config/channels.json');
const roleconfig = require('../../config/roles.json');
var moment = require('moment');
require('dotenv').config();
var hasIcon = 'yes';
const botVersion = require('../../package.json');

module.exports = {
    name: 'botinfo',
    aliases: ['binfo'],
    description: "Information about the Bot.",
    guildOnly: true,
    async execute(client, message, args) {
        if(configonoff.command.admin.botinfo === true) {
            const adminchannel1 = channelconfig.admin.admin1;
            const adminchannel2 = channelconfig.admin.admin2;
            const adminchannel3 = channelconfig.admin.admin3;
            const admin1 = roleconfig.admin.admin1;
            const admin2 = roleconfig.admin.admin2;
            const admin3 = roleconfig.admin.admin3;
            if(message.channel.id === adminchannel1 || message.channel.id === adminchannel2 || message.channel.id === adminchannel3) {
                if (message.member.roles.cache.has(admin1) || message.member.roles.cache.has(admin2) || message.member.roles.cache.has(admin3)) {

                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.botinfo.logs)));
                    try {
                        if (hasIcon === 'yes') {
                            
                            const serverEmbedicon = new Discord.MessageEmbed().attachFiles(['./db/image/royal_Evil_Smile.png']).setTitle(
                                'Royal').setColor(embedColor).setDescription(
                                'Information about the Bot \'Royal\'').setThumbnail('attachment://royal_Evil_Smile.png'
                                ).addField("Created on 4/5th/2020 as the core of later multible bots.").addField("Prefix:",
                                process.env.PREFIX).addField(
                                "Version:", botVersion.version)
                            message.channel.send(serverEmbedicon);
                        }
                    } catch(e) {

                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(e.message)));
                    }
                } else {

                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.botinfo.errorperms)));
                }
            } else {

                console.log(chalk.cyan(lang.prefix.royal + chalk.white(lang.admin.botinfo.errorchannel)));
            }
        }
    }
}
