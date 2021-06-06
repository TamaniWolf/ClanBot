const configmain = require('../../../config/config.json');
const configchannel = require('../../../config/channels.json');
const configonoff = require('../../../config/onoff.json');
const configrole = require('../../../config/roles.json');
const lang = require('../../.' + configmain.lang);
const chalk = require('chalk');
const fs = require('fs');
var moment = require('moment');
require('dotenv').config();

module.exports = {
	name: "balance",
	aliases: ['bal', 'bl', 'money', 'coin', 'coins'],
	description: "Coin balance of you.",
	guildOnly: true,
	async execute(client, message, args, Discord) {
		if(configonoff.command.user.eco.balance === true) {
			//code to run when command is sent
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
			if (!message.member.roles.cache.has(admin1) || message.member.roles.cache.has(admin2) || message.member.roles.cache.has(admin3) || message.member.roles.cache.has(admin4) || message.member.roles.cache.has(admin5)) {
				const member = message.member
				const profileData = `./db/economy/profiles/${member.id}.json`;
				// check if profile exists
				if (fs.existsSync(profileData)) {
					// DB Number count
					let rawdata = fs.readFileSync(profileData);
					let profiledataread = JSON.parse(rawdata);
			
					let membercoins = profiledataread.coins
				message.reply(lang.balance.text + membercoins)
				console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.balance.log)));
				}
			} else if (message.member.roles.cache.has(lupi) || message.member.roles.cache.has(mod) || message.member.roles.cache.has(wolf)) {
				if (!message.mentions.users.size) {
					console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.balance.error)));
					return message.reply(lang.error.taggs);
				}
				const taggedUserID = message.mentions.users.first();
				const taggedUser = message.mentions.users.map(user => {
					return `${user.username}`;
				});
				if (taggedUserID.id) {
					const memberTag = message.member
					const profileDataTag = `./db/economy/profiles/${memberTag.id}.json`;
					// check if profile exists
					if (fs.existsSync(profileDataTag)) {
						// DB Number count
						let rawdataTag = fs.readFileSync(profileData);
						let profiledatareadTag = JSON.parse(rawdataTag);
						let membercoinsTag = profiledatareadTag.coins
					message.channel.send([taggedUser] + lang.balance.admin + membercoinsTag)
					}
				}
			}
		}
    }
}
