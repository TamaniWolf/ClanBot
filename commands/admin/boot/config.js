const lang = require('../../../lang/en_US.json');
const chalk = require('chalk');
const configjson = require('../../../config/config.json');
const configchannel = require('../../../config/channels.json');
const configrole = require('../../../config/roles.json');
const configonoff = require('../../../config/onoff.json');
const fs = require('fs');
var moment = require('moment');
require('dotenv').config();

module.exports = {
    name: 'config',
    aliases: ['con'],
    description: 'editing config',
    async execute(client, message, args) {
        if(configonoff.command.admin.editconfig === true) {
            //read config data
            let configrawdata = fs.readFileSync('./config/config.json');
            let configread = JSON.parse(configrawdata);
            let onoffrawdata = fs.readFileSync('./config/onoff.json');
            let onoffread = JSON.parse(onoffrawdata);
            // let channelrawdata = fs.readFileSync('./config/channels.json');
            // let channelread = JSON.parse(channelrawdata);
            // let rolesrawdata = fs.readFileSync('./config/roles.json');
            // let rolesread = JSON.parse(rolesrawdata);
            //shorten config.json data
            let main1 = configread;
            // let main2 = configread.discord_mentions;
            let main3 = configread.set;
            let prefix = process.env.PREFIX;
            //shorten onoff.json data
            let onoffadmin1 = onoffread.command.admin.boot;
            // let onoffadmin2 = onoffread.command.admin.eco;
            let onoffadmin3 = onoffread.command.admin;
            let onoffuser1 = onoffread.command.user.eco;
            let onoffuser2 = onoffread.command.user.fun;
            // let onoffuser3 = onoffread.command.user.level;
            let onoffuser4 = onoffread.command.user;
            let wordreaction = onoffread.command.wordreaction;
            //shorten channels.json data
            // let channeladmin = channelread.admin;
            // let channelreact = channelread.reaction;
            // let channelmsg = channelread.reaction.message;
            // let channels = channelread.channels;
            // let channelnsfw = channelread.nsfw;
            // //shorten roles.json data
            // let rolesuser = rolesread.roles;
            // let roelsadmin = rolesread.admin;
            // let rolesbot = rolesread.bot;

            // Lol i have to do this to have it work


            // End

            //code start
                const adminchannel1 = configchannel.admin.admin1;
                const adminchannel2 = configchannel.admin.admin2;
                const adminchannel3 = configchannel.admin.admin3;
                const admin1 = configrole.admin.admin1;
                const admin2 = configrole.admin.admin2;
                const admin3 = configrole.admin.admin3;

                if(message.channel.id === adminchannel1 || message.channel.id === adminchannel2 || message.channel.id === adminchannel3) {
                    if (message.member.roles.cache.has(admin1) || message.member.roles.cache.has(admin2) || message.member.roles.cache.has(admin3)) {
                        if(!args[0]) {
                            message.channel.send(`What do you want? You can't just edit thin air. \nGo on, let's start with \`${prefix}config list\` shall we.`);
                            console.log('config');
                        }
                        if(args[0] === 'help' || args[0] === 'command' || args[0] === 'commands' || args[0] === 'list') {
                            message.channel.send('Commands and list of Arguments: https://github.com/TamaniWolf/RoyalBot/blob/main/Wiki.md#config');
                            console.log('config list');
                        }
                        //
                        //
                        //Main Config
                        if(args[0] === 'joinprofile') {
                            if(args[1] === "true") {
                                main3.profilenewjoin = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/config.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("joinprofile in Config config.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                main3.profilenewjoin = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/config.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("joinprofile in Config config.json set 'false'")));
                            }
                        }
                        if(args[0] === 'commandprofile') {
                            if(args[1] === "true") {
                                main3.profilenewcommand = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/config.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("commandprofile in Config config.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                main3.profilenewnewcommand = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/config.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("commandprofile in Config config.json set 'false'")));
                            }
                        }
                        if(args[0] === 'twitchboxart') {
                            if(args[1] === "true") {
                                main1.twitch_use_boxart = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/config.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("twitchboxart in Config config.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                main1.twitch_use_boxart = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/config.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("twitchboxart in Config config.json set 'false'")));
                            }
                        }
                        //onoff Config
                        if(args[0] === 'twitch') {
                            if(args[1] === "true") {
                                onoffread.twitch = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("twitch in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffread.twitch = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("twitch in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'reaction') {
                            if(args[1] === "true") {
                                onoffread.reaction = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("reaction in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffread.reaction = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("reaction in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'cooldown') {
                            if(args[1] === "true") {
                                onoffread.cooldown = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("cooldown in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffread.cooldown = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("cooldown in Config onoff.json set 'false'")));
                            }
                        }
                        //
                        //
                        //Admin
                        if(args[0] === 'reload') {
                            if(args[1] === "true") {
                                onoffadmin1.reload = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("reload in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffadmin1.reload = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("reload in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'restart') {
                            if(args[1] === "true") {
                                onoffadmin1.restart = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("restart in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffadmin1.restart = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("restart in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'shutdown') {
                            if(args[1] === "true") {
                                onoffadmin1.shutdown = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("shutdown in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffadmin1.shutdown = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("shutdown in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'add') {
                            if(args[1] === "true") {
                                onoffadmin3.add = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("add in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffadmin3.add = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("add in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'adminhelp') {
                            if(args[1] === "true") {
                                onoffadmin3.adminhelp = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("adminhelp in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffadmin3.adminhelp = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("adminhelp in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'botinfo') {
                            if(args[1] === "true") {
                                onoffadmin3.botinfo = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("botinfo in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffadmin3.botinfo = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("botinfo in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'changelog') {
                            if(args[1] === "true") {
                                onoffadmin3.changelog = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("changelog in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffadmin3.changelog = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("changelog in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'clear') {
                            if(args[1] === "true") {
                                onoffadmin3.clear = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("clear in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffadmin3.clear = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("clear in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'consolecolors') {
                            if(args[1] === "true") {
                                onoffadmin3.consolecolors = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("consolecolors in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffadmin3.consolecolors = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("consolecolors in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'editconfig') {
                            if(args[1] === "true") {
                                onoffadmin3.editconfig = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("editconfig in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffadmin3.editconfig = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("editconfig in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'mute') {
                            if(args[1] === "true") {
                                onoffadmin3.mute = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("mute in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffadmin3.mute = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("mute in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'ping') {
                            if(args[1] === "true") {
                                onoffadmin3.ping = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("ping in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffadmin3.ping = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("ping in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'react') {
                            if(args[1] === "true") {
                                onoffadmin3.react = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("react in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffadmin3.react = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("react in Config onoff.json set 'false'")));
                            }
                        }
                        //
                        //
                        //User
                        if(args[0] === 'addprofile') {
                            if(args[1] === "true") {
                                onoffuser1.addprofile = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("addprofile in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffuser1.addprofile = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("addprofile in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'balance') {
                            if(args[1] === "true") {
                                onoffuser1.balance = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("balance in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffuser1.balance = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("balance in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'gamble') {
                            if(args[1] === "true") {
                                onoffuser1.gamble = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("gamble in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffuser1.gamble = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("gamble in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'jobs') {
                            if(args[1] === "true") {
                                onoffuser1.jobs = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("jobs in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffuser1.jobs = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("jobs in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'test') {
                            if(args[1] === "true") {
                                onoffuser1.test = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("test in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffuser1.test = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("test in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'work') {
                            if(args[1] === "true") {
                                onoffuser1.work = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("work in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffuser1.work = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("work in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'blush') {
                            if(args[1] === "true") {
                                onoffuser2.blush = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("blush in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffuser2.blush = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("blush in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'german') {
                            if(args[1] === "true") {
                                onoffuser2.german = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("german in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffuser2.german = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("german in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'grouphug') {
                            if(args[1] === "true") {
                                onoffuser2.grouphug = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("grouphug in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffuser2.grouphug = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("grouphug in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'growl') {
                            if(args[1] === "true") {
                                onoffuser2.growl = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("growl in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffuser2.growl = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("growl in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'hug') {
                            if(args[1] === "true") {
                                onoffuser2.hug = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("hug in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffuser2.hug = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("hug in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'hydrate') {
                            if(args[1] === "true") {
                                onoffuser2.hydrate = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("hydrate in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffuser2.hydrate = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("hydrate in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'slap') {
                            if(args[1] === "true") {
                                onoffuser2.slap = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("slap in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffuser2.slap = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("slap in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'help') {
                            if(args[1] === "true") {
                                onoffuser4.help = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("help in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffuser4.help = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("help in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'mcserver') {
                            if(args[1] === "true") {
                                onoffuser4.mcserver = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("mcserver in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                onoffuser4.mcserver = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("mcserver in Config onoff.json set 'false'")));
                            }
                        }
                        //
                        //
                        //Wordreaction
                        if(args[0] === 'reactionrole') {
                            if(args[1] === "true") {
                                wordreaction.reactionrole = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("reactionrole in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                wordreaction.reactionrole = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("reactionrole in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'royalnsfw') {
                            if(args[1] === "true") {
                                wordreaction.royalnsfw = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("royalnsfw in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                wordreaction.royalnsfw = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("royalnsfw in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'royalsfw') {
                            if(args[1] === "true") {
                                wordreaction.royalsfw = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("royalsfw in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                wordreaction.royalsfw = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("royalsfw in Config onoff.json set 'false'")));
                            }
                        }
                        if(args[0] === 'wordreact') {
                            if(args[1] === "true") {
                                wordreaction.wordreact = true;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("wordreact in Config onoff.json set 'true'")));
                            }
                            if(args[1] === "false") {
                                wordreaction.wordreact = false;
                                let dataconfig = JSON.stringify(configread, null, 2);
                                fs.writeFileSync('./config/onoff.json', dataconfig);
                                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white("wordreact in Config onoff.json set 'false'")));
                            }
                        }

                        // console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.ping.log)));
                    } else {
                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.ping.errorperms)));
                    }
                } else {
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white(lang.admin.ping.errorchannel)));
                }
        }
    }
}
