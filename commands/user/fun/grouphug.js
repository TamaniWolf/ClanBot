const configmain = require('../../../config/config.json');
const configchannel = require('../../../config/channels.json');
const configonoff = require('../../../config/onoff.json');
const configrole = require('../../../config/roles.json');
const lang = require('../../.' + configmain.lang);
const chalk = require('chalk');
var moment = require('moment');
require('dotenv').config();

module.exports = {
    name: 'grouphug',
    aliases: ['masshug'],
    description: 'grouphug',
    guildOnly: true,
    async execute(client, message, args) {
        if(configonoff.command.user.fun.grouphug === true) {
            const nsfw1 = configchannel.nsfw.nsfw1
            const nsfw2 = configchannel.nsfw.nsfw2
            const nsfw3 = configchannel.nsfw.nsfw3
            const nsfw4 = configchannel.nsfw.nsfw4
            const nsfw5 = configchannel.nsfw.nsfw5
            const nsfwVoice1 = configchannel.nsfwVoice1
            const nsfwVoice2 = configchannel.nsfwVoice2
            const nsfwVoice3 = configchannel.nsfwVoice3
            if (message.channel.id === nsfw1 || message.channel.id === nsfw2 || message.channel.id === nsfw3 || message.channel.id === nsfw4 || message.channel.id === nsfw5) {
                //console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.grouphug.log)));
                //const taggedUser = message.mentions.users.map(user => {
                //    return `${user.username}`;
                //});
                const taggedUser = ` `
                message.reply(lang.grouphug.nsfw + [taggedUser]);
            } else {
                //console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.grouphug.log)));
                //const taggedUser = message.mentions.users.map(user => {
                //    return `${user.username}`;
                //});
                const taggedUser = ` `
                message.reply(lang.grouphug.text + [taggedUser]);
            }
        }
    }
}
