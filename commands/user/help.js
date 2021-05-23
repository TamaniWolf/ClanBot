const lang = require('../../lang/en_US.json');
const configonoff = require('../../config/onoff.json');
const chalk = require('chalk');
var moment = require('moment');
require('dotenv').config();

module.exports = {
    name: 'help',
    aliases: ['commands'],
    description: 'help',
    guildOnly: true,
    async execute(client, message, args) {
        if(configonoff.command.user.help === true) {
            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.help.log)));
            message.channel.send(
        `***__All Commands You can use.__***
    **${process.env.PREFIX}help** ${lang.help.text1} 
    **${process.env.PREFIX}mcserver** ${lang.help.text2} 
    **${process.env.PREFIX}slap** ${lang.help.text4} 
    **${process.env.PREFIX}hydrate** ${lang.help.text5} 
    **${process.env.PREFIX}german** ${lang.help.text7} 
    **${process.env.PREFIX}blush** ${lang.help.text8} 
    **${process.env.PREFIX}grouphug** ${lang.help.text9} 
    **${process.env.PREFIX}hug** ${lang.help.text10} 
    **${process.env.PREFIX}growl** ${lang.help.text11}`);
        }
    }
};
