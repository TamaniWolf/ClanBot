const lang = require('../../../lang/en_US.json');
const chalk = require('chalk');
const channelconfig = require('../../../config/channels.json');
const configonoff = require('../../../config/onoff.json');
var moment = require('moment');
require('dotenv').config();

module.exports = {
	name: 'hydrate',
	aliases: ['water'],
    description: 'water',
	guildOnly: true,
	async execute(client, message, args) {
		if(configonoff.command.user.fun.hydrate === true) {
			const nsfw1 = channelconfig.nsfw.nsfw1
			const nsfw2 = channelconfig.nsfw.nsfw2
			const nsfw3 = channelconfig.nsfw.nsfw3
			const nsfw4 = channelconfig.nsfw.nsfw4
            const nsfw5 = channelconfig.nsfw.nsfw5
            if (message.channel.id === nsfw1 || message.channel.id === nsfw2 || message.channel.id === nsfw3 || message.channel.id === nsfw4 || message.channel.id === nsfw5) {
				const taggedUser = message.mentions.users.map(user => {
						return `${user.username}`;
					});
					console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.hydrate.log)));
					message.channel.send(lang.hydrate.nsfw + [taggedUser])
			} else {
				const taggedUser = message.mentions.users.map(user => {
					return `${user.username}`;
				});
				console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.hydrate.log)));
				message.channel.send(lang.hydrate.text + [taggedUser])
			}
		}
	}
}
