const lang = require('../../../lang/en_US.json');
const configonoff = require('../../../config/onoff.json');
const configg = require('../../../config/config.json');
const chalk = require('chalk');
const Math = require('mathjs');
const fs = require('fs');
const usedCommandRecently = new Set();

const timeSeconds = 1000; //1 Second = 1000 Milliseconds
const timeMinutes = timeSeconds * 60;
const timeHours = timeMinutes * 60;
const timeDays = timeHours * 24;
const timeWeeks = timeDays * 7;
const timeMonthes = timeDays * 30; //Does it comes really to this 3 and every 4 years to this 4 days?
const timeYears = timeDays * 356;
var moment = require('moment');
var timeNow = moment.utc().format('MM/DD/YYYY-hh:mm:ss-a');
require('dotenv').config();

module.exports = {
	name: "gamble",
	aliases: ['play'],
	description: "gamble",
	guildOnly: true,
	async execute(client, message, args, Discord) {
		if(configonoff.command.user.eco.gamble === true) {
			//code to run when command is sent
			//console.log(message.member.user.id)
			const member = message.member
			//const memberID = member.id
			const profileData = `./db/economy/profiles/${member.id}.json`;
			const cooldownData = `./db/cooldown/${member.id}.json`;
			// check if profile exists
			try {
				// if (!usedCommandRecently.has(message.author.id)){
					if (fs.existsSync(profileData)) {
						// DB Number count
						let rawdata = fs.readFileSync(profileData);
						let profiledataread = JSON.parse(rawdata);
						let rawcooldown = fs.readFileSync(cooldownData);
						let cooldowndataread = JSON.parse(rawcooldown);
						let cooldowngamble = cooldowndataread.cooldown.gamble
						let onedaycooldown = moment.utc().add(1, 'days').format('MM/DD/YYYY-hh:mm:ss-a')
						memberID = member.id
						let gambleTokenReset = 5

						if (timeNow > cooldowngamble) {
							let memberGambleCooldown = profiledataread.gambleCooldown
							let memberGambleToken = profiledataread.gambleToken
							if (!memberGambleToken < 1) {
								if (!isNaN(args[0])){
									let membercoins = profiledataread.coins
									if (args[0] < membercoins) {
										let gambleTokenMinus = Math.subtract(memberGambleToken, 1)
										let gambleMath = Math.floor(Math.random() * 2)
										if (gambleMath === 0) {
											gambleNumberMinus = Math.subtract(membercoins, args[0])
											let gambleMinuswrite = { 
												dbNumber: profiledataread.dbNumber,
												version: profiledataread.version,
												member: profiledataread.member,
												coins: gambleNumberMinus,
												gamble: {
													gambleToken: gambleTokenMinus,
													gambleCooldown: false
												},
												job: profiledataread.job,
												experience: profiledataread.experience,
												inventory: profiledataread.inventory
											};
											let datacount = JSON.stringify(gambleMinuswrite, null, 2);
											fs.writeFileSync(profileData, datacount);
											message.reply(`You lost ${args[0]} Meepies. Now has ${gambleNumberMinus}.`)
											if (memberGambleToken < 2) {
												message.reply(`You used all your 5 Gamble Tokens. Wait 1 Day for refill.`)
												console.log(`${member.id} : ${member.displayName}'s Gamble Tokens are out. Added to Cooldown.`)
												// DB Number count
												let gamblecoolddownwrite = { 
													dbNumber: cooldowndataread.dbNumber,
													version: cooldowndataread.version,
													member: cooldowndataread.member,
													cooldown: {
														newjoin: cooldowndataread.cooldown.newjoin,
														gamble: onedaycooldown,
														job: cooldowndataread.cooldown.job
													}
												};
												let datacount = JSON.stringify(gamblecoolddownwrite, null, 2);
												fs.writeFileSync(cooldownData, datacount);
											}
										} else if (gambleMath === 1) {
											gambleNumberPlus = Math.add(membercoins, args[0])
											let gamblePluswrite = { 
												dbNumber: profiledataread.dbNumber,
												version: profiledataread.version,
												member: profiledataread.member,
												coins: gambleNumberPlus,
												gamble: {
													gambleToken: gambleTokenMinus,
													gambleCooldown: false
												},
												job: profiledataread.job,
												experience: profiledataread.experience,
												inventory: profiledataread.inventory
											};
											let datacount = JSON.stringify(gamblePluswrite, null, 2);
											fs.writeFileSync(profileData, datacount);
											message.reply(`You won ${args[0]} Meepies. Now has ${gambleNumberPlus}.`)
											if (memberGambleToken < 2) {
												message.reply(`You used all your 5 Gamble Tokens. Wait 1 Day for refill.`)
												console.log(`${member.id} : ${member.displayName}'s Gamble Tokens are out. Added to Cooldown.`)
												// DB Number count
												let gamblecoolddownwrite = { 
													dbNumber: cooldowndataread.dbNumber,
													version: cooldowndataread.version,
													member: cooldowndataread.member,
													cooldown: {
														newjoin: cooldowndataread.cooldown.newjoin,
														gamble: onedaycooldown,
														job: cooldowndataread.cooldown.job
													}
												};
												let datacount = JSON.stringify(gamblecoolddownwrite, null, 2);
												fs.writeFileSync(cooldownData, datacount);
											}
										}
									} else {
										message.reply('Not enough Meepies.')
									}
								} else {
									message.reply('You must type a number!')
								}
							} else {
								console.log(`${member.id} : ${member.displayName}'s Gamble Tokens are out. Cooldown still on going1.`)
								message.reply(`You used your 5 Gamble Tokens already1.`)
							}
						} else {
							console.log(`${member.id} : ${member.displayName}'s Gamble Tokens are out. Cooldown still on going.`)
							message.reply(`You used your 5 Gamble Tokens already.`)
						}
					} else {
						console.log(`${member.displayname}'s Profile is not existing.`)
					}
				// } else {
				// 	console.log(`${member.id} : ${member.displayName}'s Gamble Tokens are out. Cooldown still on going.`)
				// 	message.reply(`You used your 5 Gamble Tokens already.`)
				// }
			} catch(error) {
				console.log(error)
			}
		}
	}
}
