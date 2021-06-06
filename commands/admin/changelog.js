const configmain = require('../../config/config.json');
const configchannel = require('../../config/channels.json');
const configonoff = require('../../config/onoff.json');
const configrole = require('../../config/roles.json');
const lang = require('../.' + configmain.lang);
const chalk = require('chalk');
const fs = require('fs');
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
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.changelog.log)));

                    let rawdata = fs.readFileSync(`./db/changelogs/${args[0]}.json`);
                    let changeRead = JSON.parse(rawdata);

                    let changeEmbed = changeRead.embed
                    let changeDate = changeRead.date
                    
                    try {
                        if (args[0]) {
                            const clanEmbedChangelog = new Discord.MessageEmbed().attachFiles(['./db/image/Image1.png']).setTitle(
                                lang.admin.changelog.title).setColor(embedColor).setDescription(
                                `**__${changeDate}__**\n \n   ${changeEmbed}`).setThumbnail('attachment://Image1.png')
                            message.channel.send(clanEmbedChangelog);
                        }
                    } catch(e) {
                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(e)));
                    }
                } else {
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.changelog.errorperms)));
                }
            } else {
                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.changelog.errorchannel)));
            }
        }
    }
}
