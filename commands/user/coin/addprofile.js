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
    name: 'addprofile',
    aliases: ['addp'],
    description: 'Add Profile',
    guildOnly: true,
    async execute(client, message, args) {
        if(configonoff.command.user.eco.addprofile === true) {
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
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.help.log)));
                        const member = message.member
                    
                    if (configonoff.command.user.eco.addprofile === true) {
                        // console.log(lang.prefix.clan, `UserID ${member.id}, ${member.displayName}`)
                        // profile to check if exists
                        const profile = `./db/economy/profiles/${member.id}.json`;
                        // check if profile exists
                        if (fs.existsSync(profile)) {
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, `Rejoined '${member.displayName} : ${member.id}'.`));
                            return;
                        } else {
                            // DB Number count
                            let rawdata = fs.readFileSync('./db/count/dbnumber.json');
                            let dbnumberread = JSON.parse(rawdata);
                    
                            let dbnumber = dbnumberread.count
                            let dbnumbercount = dbnumber + 1
                            let dbnumberwrite = { 
                                count: dbnumbercount
                            };
                            let datacount = JSON.stringify(dbnumberwrite, null, 2);
                            fs.writeFileSync('./db/count/dbnumber.json', datacount);
                            // Create new Profile if not exists
                            // console.log(chalk.cyan('[' + moment().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, `Profile of '${member.displayName}' not found.`));
                            let profilewrite = {
                                dbNumber: dbnumbercount,
                                version: 1,
                                member,
                                coins: 100,
                                gamble: {
                                    gambleToken: 5,
                                    gambleCooldown: false
                                },
                                job: {
                                    hasjob: false,
                                    jobs: "None",
                                    jobexp: {
                                        hunter: 0,
                                        fischer: 0,
                                        assassine: 0,
                                    },
                                    jobworked: 5
                                },
                                experience: {
                                    exp: 0,
                                    level: 0,
                                    stars: 0
                                },
                                inventory: true
                            }
                            let dataprofile = JSON.stringify(profilewrite, null, 2);
                            fs.appendFile(`./db/economy/profiles/${member.id}.json`, dataprofile, function (err){
                                if (err) throw err;
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, `Profile file '${member.id}.json' is creacted.`));
                            });
                
                            let newjointime = moment.utc(member.joinedTimestamp).add(4, 'days').format('MM/DD/YYYY-hh:mm:ss-a')
                            let cooldownwrite = {
                                dbNumber: dbnumbercount,
                                member,
                                cooldown: {
                                    newjoin: newjointime,
                                    gamble: "01/01/2121-00:01:00-am",
                                    job: "01/01/2121-00:01:00-am"
                                }
                            }
                            
                            let datacooldown = JSON.stringify(cooldownwrite, null, 2);
                            fs.appendFile(`./db/cooldown/${member.id}.json`, datacooldown, function (err){
                                if (err) throw err;
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, `Cooldown file '${member.is}.json' is creacted.`));
                            });
                        }
                    } else {
                        return;
                    }
                
            } else {

                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.help.errorchannel)));
            }
        }
    }
}
