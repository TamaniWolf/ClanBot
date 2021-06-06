const configmain = require('../config/config.json')
const lang = require('.' + configmain.lang);
const chalk = require('chalk');
const fs = require('fs');
var moment = require('moment');

module.exports = (client, Discord) =>{
    const command_files = fs.readdirSync('./commands/word-reaction/').filter(file => file.endsWith('.js'));

    for(const file of command_files){
        const command = require(`../commands/word-reaction/${file}`);
        if(command.name){
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
    console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]', chalk.white('word-reaction Heandler loaded')));
}
