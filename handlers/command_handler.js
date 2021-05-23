const lang = require('../lang/en_US.json');
const chalk = require('chalk');
const fs = require('fs');
var moment = require('moment');

module.exports = (client, Discord) =>{
    const command_files = fs.readdirSync(`./commands/user/`).filter(file => file.endsWith('.js'));

    for(const file of command_files){
        const command = require(`../commands/user/${file}`);
        if(command.name){
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
    const load_dir = (dirs) =>{
        const command_files2 = fs.readdirSync(`./commands/user/${dirs}`).filter(file => file.endsWith('.js'));

        for(const file2 of command_files2){
            const command2 = require(`../commands/user/${dirs}/${file2}`);

            if(command2.name){
                client.commands.set(command2.name, command2);
            } else {
                continue;
            }
        }
    }
    ['coin', 'fun', 'level'].forEach(c => load_dir(c));
    console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]', chalk.white('Command Heandler loaded')));
}
