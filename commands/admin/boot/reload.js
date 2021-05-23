const lang = require('../../../lang/en_US.json');
const chalk = require('chalk');
const channelconfig = require('../../../config/channels.json');
const roleconfig = require('../../../config/roles.json');
const commanddirs = './commands/';
const fs = require( 'fs' );
const path = require( 'path' );
var moment = require('moment');
require('dotenv').config();

module.exports = {
    name: 'reload',
    aliases: ['loadnew'],
    description: "Reloads a commands",
    guildOnly: true,
    async execute(client, message, args) {
        const adminchannel1 = channelconfig.admin.admin1;
        const adminchannel2 = channelconfig.admin.admin2;
        const adminchannel3 = channelconfig.admin.admin3;
        const admin1 = roleconfig.admin.admin1;
        const admin2 = roleconfig.admin.admin2;
        const admin3 = roleconfig.admin.admin3;
        if(message.channel.id === adminchannel1 || message.channel.id === adminchannel2 || message.channel.id === adminchannel3) {
            if (message.member.roles.cache.has(admin1) || message.member.roles.cache.has(admin2) || message.member.roles.cache.has(admin3)) {
                const commandName2 = args[0].toLowerCase();
                if(!commandName === 'royal-nsfw' || !commandName === 'royal-sfw' || !commandName === 'eliza'
                || !commandName === 'royalnsfw' || !commandName === 'royalsfw'){
                    if(!args[0]) return message.channel.send(lang.admin.reload.nocommand);
                    if (!args.length) return message.channel.send(`You didn't pass any command to reload!`);
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.reload.log)));
                    try{
                        const commandName = args[0].toLowerCase();
                        const command1 = message.client.commands.get(commandName) ||
                        message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

                            const getAllFiles = function(dirPath, arrayOfFiles) {
                                files = fs.readdirSync(dirPath);
                                    arrayOfFiles = arrayOfFiles || []
                                    files.forEach(function(file) {
                                        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                                            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
                                        } else {
                                            // arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
                                            arrayOfFiles.push(path.join(dirPath, "/", file))
                                        }
                                    })
                                return arrayOfFiles
                            }
                            const results = getAllFiles("./commands/")
                            //console.log(result)
                            //resolve(result === command1)
                            let filterjs = results.filter(result => result.endsWith('.js'))
                            let filterjs2 = filterjs.filter(result => result.includes(`${commandName}.js`))

                            const arr = filterjs2;
                            const index = arr.filter((el) => el === '\\');
                            arr[index] = '/';
                            arr;

                            delete require.cache[require.resolve(`../../../${arr}`)];
                            const newCommand = require(`../../../${arr}`);
                            message.client.commands.set(commandName, newCommand);
                            message.channel.send("Command `" + commandName+ "` was reloaded!");

                    } catch (error) {
                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(error)));
                    }
                } else {
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white('No Command found.')));
                }
            } else {
                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.reload.errorperms)));
            }
        } else {
            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.reload.errorchannel)));
        }
    }
}
