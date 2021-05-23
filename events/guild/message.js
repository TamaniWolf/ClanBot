const lang = require('../../lang/en_US.json');
const chalk = require('chalk');
const fs = require('fs');
var moment = require('moment');
require('dotenv').config();

module.exports = async (Discord, client, message) => {
    const prefix = process.env.PREFIX;

    if(!message.content.startsWith(prefix) || message.author.bot) return;
            if (!message.author.bot) {
                if (message.content) {
                    
                }
            }

    //Args + Command + ALiases
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd)
                    || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    //
    
    
    //Execute
    try{
    if(command) command.execute(client, message, args, Discord);
    } catch (error){
        message.reply(lang.error.errorcommand);
        console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(error)));
    }

}
