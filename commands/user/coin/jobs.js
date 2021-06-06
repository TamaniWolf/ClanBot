const configmain = require('../../../config/config.json');
const configchannel = require('../../../config/channels.json');
const configonoff = require('../../../config/onoff.json');
const configrole = require('../../../config/roles.json');
const lang = require('../../.' + configmain.lang);
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
require('dotenv').config();

module.exports = {
	name: "jobs",
	aliases: ['job'],
	description: "jobs",
	guildOnly: true,
	async execute(client, message, args, Discord) {
        if(configonoff.command.user.eco.jobs === true) {
            const member = message.member
            const profileData = `./db/economy/profiles/${member.id}.json`;

            // DB Number count
            let rawdata = fs.readFileSync(profileData);
            let profiledataread = JSON.parse(rawdata);
            let memberhasjob = profiledataread.hasjob;
            let memberjobs = profiledataread.jobs

            if (!args[0]) {
                message.reply('Type __c.jobs list__ for a list and information about jobs.')
            }

            if (args[0] === "list") {
                message.channel.send(
    `       ***__Jobs Board.__***
        To obtain a job, type __c.jobs <job-name>__.
        To leave a job, type __c.jobs leave__.
        To work as your job, type __c.work__.
        --------------------
        **Hunter**: Hunts Animals and Monsters.
        **Fisher**: Fishes Fish.
        **Assassine**: ???`)
            } else
            if (args[0] === "leave") {
                if (memberhasjob === true) {
                    let memberleavejob = {
                        dbNumber: profiledataread.dbNumber,
                        version: profiledataread.version,
                        member: profiledataread.member,
                        coins: profiledataread.coins,
                        gamble: profiledataread.gamble,
                        job: {
                            hasjob: false,
                            jobs: "none",
                            jobexp: profiledataread.jobexp,
                            jobworked: profiledataread.jobworked
                        },
                        experience: profiledataread.experience,
                        inventory: profiledataread.inventory
                    }

                    let datacount = JSON.stringify(memberleavejob, null, 2);
                    fs.writeFileSync(profileData, datacount);
                    message.reply(`You left your job as a ${memberjobs}, you are free to pick a new one or stay this way!`)
                } else {
                    message.reply(`You don't have any jobs right now.`)
                }
            } else
            if (args[0] === "hunter" || args[0] === "Hunter") {
                if (memberhasjob === false) {
                    let membergotjob = {
                        dbNumber: profiledataread.dbNumber,
                        version: profiledataread.version,
                        member: profiledataread.member,
                        coins: profiledataread.coins,
                        gamble: profiledataread.gamble,
                        job: {
                            hasjob: true,
                            jobs: "Hunter",
                            jobexp: profiledataread.jobexp,
                            jobworked: profiledataread.jobworked
                        },
                        experience: profiledataread.experience,
                        inventory: profiledataread.inventory
                    }

                    let datacount = JSON.stringify(membergotjob, null, 2);
                    fs.writeFileSync(profileData, datacount);
                    message.reply(`You are now a Hunter!`)
                } else {
                    message.reply(`You currently are ${memberjobs}. Use '!jobs leave' first to get the Hunters job.`)
                }
            } else
            if (args[0] === "fisher" || args[0] === "Fisher") {
                if (memberhasjob === false) {
                    let membergotjob = {
                        dbNumber: profiledataread.dbNumber,
                        version: profiledataread.version,
                        member: profiledataread.member,
                        coins: profiledataread.coins,
                        gamble: profiledataread.gamble,
                        job: {
                            hasjob: true,
                            jobs: "Fisher",
                            jobexp: profiledataread.jobexp,
                            jobworked: profiledataread.jobworked
                        },
                        experience: profiledataread.experience,
                        inventory: profiledataread.inventory
                    }

                    let datacount = JSON.stringify(membergotjob, null, 2);
                    fs.writeFileSync(profileData, datacount);
                    message.reply(`You are now a Fisher!`)
                } else {
                    message.reply(`You currently are ${memberjobs}. Use '!jobs leave' first to get the Fishers job.`)
                }
            } else
            if (args[0] === "assassine" || args[0] === "Assassine") {
                if (memberhasjob === false) {
                    let membergotjob = {
                        dbNumber: profiledataread.dbNumber,
                        version: profiledataread.version,
                        member: profiledataread.member,
                        coins: profiledataread.coins,
                        gamble: profiledataread.gamble,
                        job: {
                            hasjob: true,
                            jobs: "Assassine",
                            jobexp: profiledataread.jobexp,
                            jobworked: profiledataread.jobworked
                        },
                        experience: profiledataread.experience,
                        inventory: profiledataread.inventory
                    }

                    let datacount = JSON.stringify(membergotjob, null, 2);
                    fs.writeFileSync(profileData, datacount);
                    message.reply(`You are now a Assassine!`)
                } else {
                    message.reply(`You currently are ${memberjobs}. Use '!jobs leave' first to get the Assasine job.`)
                }
            }
        }
    }
}
