const lang = require('../../lang/en_US.json');
const chalk = require('chalk');
const fs = require('fs');
const configonoff = require('../../config/onoff.json');
const channelconfig = require('../../config/channels.json');
const roleconfig = require('../../config/roles.json');
var moment = require('moment');
require('dotenv').config();
var hasIcon = 'yes';
const botVersion = require('../../package.json');

module.exports = {
    name: 'changelog',
    aliases: ['clog'],
    description: "Displays what has been changed in the Bot.",
    guildOnly: true,
    async execute(client, message, args, Discord) {
        if(configonoff.command.admin.changelog === true) {
            const adminchannel1 = channelconfig.admin.admin1;
            const adminchannel2 = channelconfig.admin.admin2;
            const adminchannel3 = channelconfig.admin.admin3;
            const admin1 = roleconfig.admin.admin1;
            const admin2 = roleconfig.admin.admin2;
            const admin3 = roleconfig.admin.admin3;
            if(message.channel.id === adminchannel1 || message.channel.id === adminchannel2 || message.channel.id === adminchannel3) {
                if (message.member.roles.cache.has(admin1) || message.member.roles.cache.has(admin2) || message.member.roles.cache.has(admin3)) {
                    const changelog_files = fs.readdirSync('./db/changelogs/').filter(file => file.endsWith('.json'));

                    for(const file of changelog_files){
                        const changelog = require(`../../db/changelogs/${file}`);
                        if(changelog.name){
                            client.commands.set(changelog.name, changelog);
                        } else {
                            continue;
                        }
                    }
                    if(!args[0]) return message.channel.send(changelog_files);
                    let changeName = args[0].toLowerCase()

                    delete require.cache[require.resolve(`../../db/changelogs/${changeName}.json`)]
                    client.commands.delete(changeName)
                    const pull = require(`../../db/changelogs/${changeName}.json`)
                    client.commands.set(changeName, pull)
                    // message.channel.send(`${args[0]}`)
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.changelog.log)));

                    let rawdata = fs.readFileSync(`./db/changelogs/${args[0]}.json`);
                    let changeRead = JSON.parse(rawdata);
                    // console.log(changeRead.embed)

                    let changeEmbed = changeRead.embed
                    let changeDate = changeRead.date
                    
                    try {
                        if (args[0]) {
                            
                            const royalEmbedChangelog = new Discord.MessageEmbed().attachFiles(['./db/image/royal_Evil_Smile.png']).setTitle(
                                'Royal\'s Changelog from:').setColor(embedColor).setDescription(
                                `**__${changeDate}__**\n \n   ${changeEmbed}`).setThumbnail('attachment://royal_Evil_Smile.png')
                            message.channel.send(royalEmbedChangelog);
                        }
                    } catch(e) {
                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(e)));
                    }
                } else {
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.changelog.errorperms)));
                }
            } else {
                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.changelog.errorchannel)));
            }
        }
    }
}
