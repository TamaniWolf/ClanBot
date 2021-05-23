const lang = require('../../../lang/en_US.json');
const chalk = require('chalk');
const configonoff = require('../../../config/onoff.json');
const channelconfig = require('../../../config/channels.json');
const roleconfig = require('../../../config/roles.json');
var moment = require('moment');
require('dotenv').config();

module.exports = {
    name: 'shutdown',
    aliases: ['gagball'],
    //permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES", "CONNECT"],
    description: "shutdown the bot",
    guildOnly: true,
    async execute(client, message, args) {
        if(configonoff.command.admin.boot.shutdown === true) {
            const adminchannel1 = channelconfig.admin.admin1;
            const adminchannel2 = channelconfig.admin.admin2;
            const adminchannel3 = channelconfig.admin.admin3;
            const admin1 = roleconfig.admin.admin1;
            const admin2 = roleconfig.admin.admin2;
            const admin3 = roleconfig.admin.admin3;
            if(message.channel.id === adminchannel1 || message.channel.id === adminchannel2 || message.channel.id === adminchannel3) {
                if (message.member.roles.cache.has(admin1) || message.member.roles.cache.has(admin2) || message.member.roles.cache.has(admin3)) {
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.shutdown.log)));
                    message.channel.send(lang.admin.shutdown.text)
                    const { exec } = require("child_process");

                    exec("pm2 stop royalbot", (error, stdout, stderr) => {
                        if (error) {
                            console.log(`error: ${error.message}`);
                            return;
                        }
                        if (stderr) {
                            console.log(`stderr: ${stderr}`);
                            return;
                        }
                        console.log(`stdout: ${stdout}`);
                    });
                } else {
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.shutdown.errorperms)));
                }
            } else {
                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.shutdown.errorchannel)));
            }
        }
    }
}
