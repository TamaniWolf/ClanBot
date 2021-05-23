const lang = require('../../lang/en_US.json');
const chalk = require('chalk');
const configonoff = require('../../config/onoff.json');
const channelconfig = require('../../config/channels.json');
const roleconfig = require('../../config/roles.json');
var moment = require('moment');
require('dotenv').config();

module.exports = {
    name: 'consolecolors',
    aliases: ['ccolor'],
    cooldown: 300,
    description: "Shows avalable colors for Console",
    guildOnly: true,
    async execute(client, message, args) {
        if(configonoff.command.admin.consolecolors === true) {
            const adminchannel1 = channelconfig.admin.admin1;
            const adminchannel2 = channelconfig.admin.admin2;
            const adminchannel3 = channelconfig.admin.admin3;
            const admin1 = roleconfig.admin.admin1;
            const admin2 = roleconfig.admin.admin2;
            const admin3 = roleconfig.admin.admin3;
            if(message.channel.id === adminchannel1 || message.channel.id === adminchannel2 || message.channel.id === adminchannel3) {
                if (message.member.roles.cache.has(admin1) || message.member.roles.cache.has(admin2) || message.member.roles.cache.has(admin3)) {

                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white('A Test to see the colors in the Console')));
                    try {
                        message.channel.send('A Test to see the colors in the Console')
                        //Red

                        console.log((chalk.red('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, 'Red'), chalk.white('.')))
                        //Green

                        console.log((chalk.green('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, 'Green'), chalk.white('.')))
                        //Yellow

                        console.log((chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, 'Yellow'), chalk.white('.')))
                        //Blue

                        console.log((chalk.blue('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, 'Blue'), chalk.white('.')))
                        //Magenta

                        console.log((chalk.magenta('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, 'Magenta'), chalk.white('.')))
                        //Cyan

                        console.log((chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, 'Cyan'), chalk.white('.')))
                        //White

                        console.log((chalk.white('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, 'White')))
                        //Gray

                        console.log((chalk.gray('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, 'Gray'), chalk.white('.')))
                        //Black

                        console.log((chalk.black('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, 'Black'), chalk.white('.')))

                        //Bold

                        console.log((chalk.bold('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, 'Bold'), chalk.gray('.')))
                        //Dim

                        console.log((chalk.dim('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, 'Dim'), chalk.gray('.')))
                        //Italic

                        console.log((chalk.italic('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, 'Italic'), chalk.gray('.')))
                        //Underline

                        console.log((chalk.underline('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, 'Underline'), chalk.gray('.')))
                        //Inverse

                        console.log((chalk.inverse('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, 'Inverse'), chalk.gray('.')))

                    } catch(e) {

                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(e.message)));
                    }
                } else {

                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.shutdown.errorperms)));
                }
            } else {

                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.shutdown.errorchannel)));
            }
        }
    }
}
