const configmain = require('../../config/config.json');
const configchannel = require('../../config/channels.json');
const configonoff = require('../../config/onoff.json');
const configrole = require('../../config/roles.json');
const lang = require('../.' + configmain.lang);
const chalk = require('chalk');
var moment = require('moment');
require('dotenv').config();
var hasIcon = 'yes';
const botVersion = require('../../package.json');

module.exports = {
    name: 'botinfo',
    aliases: ['binfo'],
    description: "Information about the Bot.",
    guildOnly: true,
    async execute(client, message, args, Discord) {
        if(configonoff.command.admin.botinfo === true) {
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

                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.botinfo.logs)));
                    try {
                        if (hasIcon === 'yes') {
                            
                            const serverEmbedicon = new Discord.MessageEmbed().attachFiles(['./db/image/clan_Evil_Smile.png']).setTitle(
                                'clan').setColor(embedColor).setDescription(
                                'Information about the Bot \'clan\'').setThumbnail('attachment://clan_Evil_Smile.png'
                                ).addField("Created on 4/5th/2020 as the core of later multible bots.").addField("Prefix:",
                                process.env.PREFIX).addField(
                                "Version:", botVersion.version)
                            message.channel.send(serverEmbedicon);
                        }
                    } catch(e) {

                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(e.message)));
                    }
                } else {

                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.botinfo.errorperms)));
                }
            } else {

                console.log(chalk.cyan(lang.prefix.clan + chalk.white(lang.admin.botinfo.errorchannel)));
            }
        }
    }
}
