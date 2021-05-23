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
const timeHours6 = timeHours * 6;
var moment = require('moment');
require('dotenv').config();

module.exports = {
	name: "work",
	aliases: ['working'],
	description: "work",
	guildOnly: true,
	async execute(client, message, args, Discord) {
        if(configonoff.command.user.eco.work === true) {
            const member = message.member;
            memberID = member.id
            const profileData = `./db/economy/profiles/${member.id}.json`;
            const cooldownData = `/db/cooldown/${member.id}.json`;

            if (fs.existsSync(profileData)) {
                // DB Number count
                let rawdata = fs.readFileSync(profileData);
                let profiledataread = JSON.parse(rawdata);
                let cooldownrawdata = fs.readFileSync(cooldownData);
                let cooldowndataread = Json.parse(cooldownrawdata)
                
                let memberhasjob = profiledataread.hasjob;
                let memberjobs = profiledataread.jobs;
                let memberjobexphunter = Math.add(profiledataread.jobexp.hunter, 100);
                let memberjobexpfisher = Math.add(profiledataread.jobexp.fisher, 100);
                let memberjobexpassassine = Math.add(profiledataread.jobexp.assassine, 100);

                let memberworked = profiledataread.jobworked;
                let jobworkedminus = Math.subtract(profiledataread.jobworked, 1);
                if (memberhasjob === true) {
                    if (!usedCommandRecently.has(message.author.id)) {
                        if (memberworked < 1) {
                            if (profiledataread.jobworked === 0) {
                                message.reply(`You are to exhausted to continue working. You need to rest 6 hours.`)
                                console.log(`${member.displayName}'s Work power is out. Added to Cooldown.`)
                                // DB Number count
                                let cooldownset = moment.utc().add(6, 'hours').format('MM/DD/YYYY-h:mm:ss-A')
                                let memberworkedsetwrite = { 
                                    dbNumber: cooldowndataread.dbNumber,
                                    version: cooldowndataread.version,
                                    member: cooldowndataread.member,
                                    cooldown: {
                                        newjoin: cooldowndataread.newjoin,
                                        gamble: cooldowndataread.gamble,
                                        job: cooldownset
                                    }
                                };
                                let datacount = JSON.stringify(memberworkedsetwrite, null, 2);
                                fs.writeFileSync(profileData, datacount);
                                console.log(`${member.displayName}'s Work power has been refilled.`)
                            } else {
                                console.log(`${member.displayName}'s Work power is out. Cooldown still on going.`)
                                message.reply(`You are still to exhausted to continue working. You need to rest!`)
                            }
                        } else if (!memberworked < 1) {
                                if (memberjobs === "Hunter") {
                                    let memberwork = {
                                        dbNumber: profiledataread.dbNumber,
                                        version: profiledataread.version,
                                        member: profiledataread.member,
                                        coins: profiledataread.coins,
                                        gamble: profiledataread.gamble,
                                        job: {
                                            hasjob: profiledataread.hasjob,
                                            jobs: profiledataread.jobs,
                                            jobexp: {
                                                hunter: memberjobexphunter,
                                                fisher: profiledataread.jobexp.fisher,
                                                assassine: profiledataread.jobexp.assassine,
                                            },
                                            jobworked: jobworkedminus
                                        },
                                        experience: profiledataread.experience,
                                        inventory: profiledataread.inventory
                                    }
                                    let datacount = JSON.stringify(memberwork, null, 2);
                                    fs.writeFileSync(profileData, datacount);
                                    message.reply(`You hunting and got 100exp in hunting.`)
                                    if (memberworked < 2) {
                                        message.reply(`You are to exhausted to continue working. You need to rest 6 hours.`)
                                        console.log(`${member.displayName}'s Work power is out. Added to Cooldown.`)
                                        // DB Number count
                                        let cooldownset = moment.utc().add(6, 'hours').format('MM/DD/YYYY-h:mm:ss-A')
                                        let memberworkedsetwrite = { 
                                            dbNumber: cooldowndataread.dbNumber,
                                            version: cooldowndataread.version,
                                            member: cooldowndataread.member,
                                            cooldown: {
                                                newjoin: cooldowndataread.newjoin,
                                                gamble: cooldowndataread.gamble,
                                                job: cooldownset
                                            }
                                        };
                                        let datacount = JSON.stringify(memberworkedsetwrite, null, 2);
                                        fs.writeFileSync(profileData, datacount);
                                        console.log(`${member.displayName}'s Work power has been refilled.`)
                                    }
                                }
                        } else if (!memberworked < 1) {
                            if (memberjobs === "Fisher") {
                                let memberwork = {
                                    dbNumber: profiledataread.dbNumber,
                                    version: profiledataread.version,
                                    member: profiledataread.member,
                                    coins: profiledataread.coins,
                                    gamble: profiledataread.gamble,
                                    job: {
                                        hasjob: profiledataread.hasjob,
                                        jobs: profiledataread.jobs,
                                        jobexp: {
                                            hunter: profiledataread.jobexp.hunter,
                                            fisher: memberjobexpfisher,
                                            assassine: profiledataread.jobexp.assassine,
                                        },
                                        jobworked: jobworkedminus
                                    },
                                    experience: profiledataread.experience,
                                    inventory: profiledataread.inventory
                                }
                                let datacount = JSON.stringify(memberwork, null, 2);
                                fs.writeFileSync(profileData, datacount);
                                message.reply(`You finished and got 100exp in fishing.`)
                                if (memberworked < 2) {
                                    message.reply(`You are to exhausted to continue working. You need to rest 6 hours.`)
                                    console.log(`${member.displayName}'s Work power is out. Added to Cooldown.`)
                                    // DB Number count
                                    let cooldownset = moment.utc().add(6, 'hours').format('MM/DD/YYYY-h:mm:ss-A')
                                    let memberworkedsetwrite = { 
                                        dbNumber: cooldowndataread.dbNumber,
                                        version: cooldowndataread.version,
                                        member: cooldowndataread.member,
                                        cooldown: {
                                            newjoin: cooldowndataread.newjoin,
                                            gamble: cooldowndataread.gamble,
                                            job: cooldownset
                                        }
                                    };
                                    let datacount = JSON.stringify(memberworkedsetwrite, null, 2);
                                    fs.writeFileSync(profileData, datacount);
                                    console.log(`${member.displayName}'s Work power has been refilled.`)
                                }
                            }
                        } else if (!memberworked < 1) {
                            if (memberjobs === "Assassine") {
                                let memberwork = {
                                    dbNumber: profiledataread.dbNumber,
                                    version: profiledataread.version,
                                    member: profiledataread.member,
                                    coins: profiledataread.coins,
                                    gamble: profiledataread.gamble,
                                    job: {
                                        hasjob: profiledataread.hasjob,
                                        jobs: profiledataread.jobs,
                                        jobexp: {
                                            hunter: profiledataread.jobexp.hunter,
                                            fisher: profiledataread.jobexp.fisher,
                                            assassine: memberjobexpassassine,
                                        },
                                        jobworked: jobworkedminus
                                    },
                                    experience: profiledataread.experience,
                                    inventory: profiledataread.inventory
                                }
                                let datacount = JSON.stringify(memberwork, null, 2);
                                fs.writeFileSync(profileData, datacount);
                                message.reply(`You assassine and got 100exp in assassining.`)
                                if (memberworked < 2) {
                                    message.reply(`You are to exhausted to continue working. You need to rest 6 hours.`)
                                    console.log(`${member.displayName}'s Work power is out. Added to Cooldown.`)
                                    // DB Number count
                                    let cooldownset = moment.utc().add(6, 'hours').format('MM/DD/YYYY-h:mm:ss-A')
                                    let memberworkedsetwrite = { 
                                        dbNumber: cooldowndataread.dbNumber,
                                        version: cooldowndataread.version,
                                        member: cooldowndataread.member,
                                        cooldown: {
                                            newjoin: cooldowndataread.newjoin,
                                            gamble: cooldowndataread.gamble,
                                            job: cooldownset
                                        }
                                    };
                                    let datacount = JSON.stringify(memberworkedsetwrite, null, 2);
                                    fs.writeFileSync(profileData, datacount);
                                    console.log(`${member.displayName}'s Work power has been refilled.`)
                                }
                            }
                        }
                    } else {
                        message.reply(`You are still to exhausted to continue working. You need to rest!`)
                    }
                }
            }
        }
    }
}
