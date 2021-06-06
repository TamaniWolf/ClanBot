const configmain = require('../../../config/config.json');
const configchannel = require('../../../config/channels.json');
const configonoff = require('../../../config/onoff.json');
const configrole = require('../../../config/roles.json');
const lang = require('../../.' + configmain.lang);
const chalk = require('chalk');
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
                const commandName = args[0].toLowerCase();
                if(commandName === 'clan-nsfw' || commandName === 'clan-sfw' || commandName === 'eliza' || commandName === 'clannsfw' || commandName === 'clansfw'){
                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.reload.nocommandfound)));
                } else {
                    if(!args[0]) return message.channel.send(lang.admin.reload.nocommand);
                    if (!args.length) return message.channel.send(lang.admin.reload.nocommand2);
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
                        let filterjs = results.filter(result => result.endsWith(`\\${commandName}.js`))
                        if(!filterjs === []) {
                            const arr = filterjs;
                            const index = arr.filter((el) => el === '\\');
                            arr[index] = '/';
                            arr;
                            delete require.cache[require.resolve(`../../../${arr}`)];
                            const newCommand = require(`../../../${arr}`);
                            message.client.commands.set(commandName, newCommand);
                            message.channel.send(lang.admin.reload.text1 + commandName + lang.admin.reload.text2);
                            console.log(lang.admin.reload.text1 + commandName + lang.admin.reload.text2);
                        } else {}
                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.reload.nocommandfound)));
                    } catch (error) {
                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(error)));
                    }
                }
            } else {
                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.reload.errorperms)));
            }
        } else {
            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.reload.errorchannel)));
        }
    }
}
