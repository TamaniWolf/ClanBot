const configmain = require('../config/config.json')
const lang = require('.' + configmain.lang);
const chalk = require('chalk');
const fs = require('fs');
var moment = require('moment');

module.exports = (client, Discord) =>{
    const command_files = fs.readdirSync('./commands/admin/').filter(file => file.endsWith('.js'));

    for(const file of command_files){
        const command = require(`../commands/admin/${file}`);
        if(command.name){
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
    const load_dir = (dirs) =>{
        const command_files2 = fs.readdirSync(`./commands/admin/${dirs}`).filter(file2 => file2.endsWith('.js'));

        for(const file2 of command_files2){
            const command2 = require(`../commands/admin/${dirs}/${file2}`);
            
            if(command2.name){
                client.commands.set(command2.name, command2);
            } else {
                continue;
            }
        }
    }
    ['boot', 'eco', 'edit'].forEach(c => load_dir(c));
    console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]', chalk.white('Admin Command Heandler loaded')));
}
