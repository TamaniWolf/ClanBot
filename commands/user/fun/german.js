const lang = require('../../../lang/en_US.json');
const chalk = require('chalk');
const channelconfig = require('../../../config/channels.json');
const configonoff = require('../../../config/onoff.json');
const fs = require('fs');
var moment = require('moment');
require('dotenv').config();

module.exports = {
    name: 'german',
    aliases: ['deutsch'],
    //cooldown: 30000, // = 30 seconds. The 
    description: 'german',
    guildOnly: true,
    async execute(client, message, args) {
        if(configonoff.command.user.fun.german === true) {
            const nsfw1 = channelconfig.nsfw.nsfw1
            const nsfw2 = channelconfig.nsfw.nsfw2
            const nsfw3 = channelconfig.nsfw.nsfw3
            const nsfw4 = channelconfig.nsfw.nsfw4
            const nsfw5 = channelconfig.nsfw.nsfw5
            if (message.channel.id === nsfw1 || message.channel.id === nsfw2 || message.channel.id === nsfw3 || message.channel.id === nsfw4 || message.channel.id === nsfw5) {
                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.german.log)));

                let rawdata = fs.readFileSync('./db/count/german.json');
                let germanread = JSON.parse(rawdata);
                // console.log(student.age);

                let dbcount = germanread.count
                let sumcount = dbcount + 1
                let germanwrite = { 
                    count: sumcount
                };
                
                let data = JSON.stringify(germanwrite, null, 2);
                fs.writeFileSync('./db/count/german.json', data);
                message.channel.send(lang.german.text1 + sumcount + lang.german.nsfw);
            } else {
                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.german.log)));

                let rawdata = fs.readFileSync('./db/count/german.json');
                let germanread = JSON.parse(rawdata);
                // console.log(student.age);

                let dbcount = germanread.count
                let sumcount = dbcount + 1
                let germanwrite = { 
                    count: sumcount
                };
                
                let data = JSON.stringify(germanwrite, null, 2);
                fs.writeFileSync('./db/count/german.json', data);
                message.channel.send(lang.german.text1 + sumcount + lang.german.text2);
            }
        }
    }
}
