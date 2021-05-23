const lang = require('../../../lang/en_US.json');
const chalk = require('chalk');
const configchannel = require('../../../config/channels.json');
const configonoff = require('../../../config/onoff.json');
var moment = require('moment');
require('dotenv').config();

module.exports = {
    name: 'blush',
    aliases: ['tomato'],
    description: 'blush',
    guildOnly: true,
    async execute(client, message, args) {
        if (configonoff.command.user.fun.blush === true) {
            const nsfw1 = configchannel.nsfw.nsfw1
            const nsfw2 = configchannel.nsfw.nsfw2
            const nsfw3 = configchannel.nsfw.nsfw3
            const nsfw4 = configchannel.nsfw.nsfw4
            const nsfw5 = channelconfig.nsfw.nsfw5
            if (message.channel.id === nsfw1 || message.channel.id === nsfw2 || message.channel.id === nsfw3 || message.channel.id === nsfw4 || message.channel.id === nsfw5) {
                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.blush.log)));
                //const taggedUser = message.mentions.users.first();
                message.channel.send(lang.blush.nsfw);
            } else {
                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.blush.log)));
                //const taggedUser = message.mentions.users.first();
                message.channel.send(lang.blush.text);
            }
        }
    }
}
