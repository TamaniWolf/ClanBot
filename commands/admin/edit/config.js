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
    name: 'config',
    aliases: ['con'],
    description: 'editing config',
    async execute(client, message, args) {
        if(configonoff.command.admin.editconfig === true) {
            //read config data
            // let configrawdata = fs.readFileSync('./config/config.json');
            // let configread = JSON.parse(configrawdata);
            // let onoffrawdata = fs.readFileSync('./config/onoff.json');
            // let onoffread = JSON.parse(onoffrawdata);
            // let channelrawdata = fs.readFileSync('./config/channels.json');
            // let channelread = JSON.parse(channelrawdata);
            // let rolesrawdata = fs.readFileSync('./config/roles.json');
            // let rolesread = JSON.parse(rolesrawdata);
            //shorten config.json data
            // let main1 = configread;
            // let main2 = configread.discord_mentions;
            // let main3 = configread.set;
            let prefix = process.env.PREFIX;
            //shorten onoff.json data
            // let onoffadmin1 = onoffread.command.admin.boot;
            // let onoffadmin2 = onoffread.command.admin.eco;
            // let onoffadmin3 = onoffread.command.admin;
            // let onoffuser1 = onoffread.command.user.eco;
            // let onoffuser2 = onoffread.command.user.fun;
            // let onoffuser3 = onoffread.command.user.level;
            // let onoffuser4 = onoffread.command.user;
            // let wordreaction = onoffread.command.wordreaction;
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

            //code start
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
                    if(!args[0]) {
                        message.channel.send(lang.admin.config.noargs1 + `\`${prefix}config list\`` + lang.admin.config.noargs2);
                        //console.log('config');
                    }
                    if(args[0] === 'help' || args[0] === 'command' || args[0] === 'commands' || args[0] === 'list') {
                        message.channel.send(lang.admin.config.list);
                        //console.log('config list');
                    }
                    //
                    //
                    //Main Config
                    if(args[0] === 'profile_on_join') {
                        if(args[1] === "on") {
                            let configrawdata = fs.readFileSync('./config/config.json');
                            let configread = JSON.parse(configrawdata);
                            let main3 = configread.set;
                            main3.profilenewjoin = true;
                            let dataconfig = JSON.stringify(configread, null, 2);
                            fs.writeFileSync('./config/config.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("profile_on_join" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let configrawdata = fs.readFileSync('./config/config.json');
                            let configread = JSON.parse(configrawdata);
                            let main3 = configread.set;
                            main3.profilenewjoin = false;
                            let dataconfig = JSON.stringify(configread, null, 2);
                            fs.writeFileSync('./config/config.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("profile_on_join" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'profile_on_command') {
                        if(args[1] === "on") {
                            let configrawdata = fs.readFileSync('./config/config.json');
                            let configread = JSON.parse(configrawdata);
                            let main3 = configread.set;
                            main3.profilenewcommand = true;
                            let dataconfig = JSON.stringify(configread, null, 2);
                            fs.writeFileSync('./config/config.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("profile_on_command" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let configrawdata = fs.readFileSync('./config/config.json');
                            let configread = JSON.parse(configrawdata);
                            let main3 = configread.set;
                            main3.profilenewnewcommand = false;
                            let dataconfig = JSON.stringify(configread, null, 2);
                            fs.writeFileSync('./config/config.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("profile_on_command" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'twitch_boxart') {
                        if(args[1] === "on") {
                            let configrawdata = fs.readFileSync('./config/config.json');
                            let configread = JSON.parse(configrawdata);
                            let main1 = configread
                            main1.twitch_use_boxart = true;
                            let dataconfig = JSON.stringify(configread, null, 2);
                            fs.writeFileSync('./config/config.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("twitch_boxart" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let configrawdata = fs.readFileSync('./config/config.json');
                            let configread = JSON.parse(configrawdata);
                            let main1 = configread
                            main1.twitch_use_boxart = false;
                            let dataconfig = JSON.stringify(configread, null, 2);
                            fs.writeFileSync('./config/config.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("twitch_boxart" + lang.admin.config.setoff)));
                        }
                    }
                    //onoff Config
                    if(args[0] === 'twitch') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            onoffread.twitch = true
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("twitch" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            onoffread.twitch = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("twitch" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'reaction') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            onoffread.reaction = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            onoffread.reaction = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'cooldown') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            onoffread.cooldown = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            onoffread.cooldown = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.setoff)));
                        }
                    }
                    //
                    //
                    //Admin
                    if(args[0] === 'reload') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin1 = onoffread.command.admin.boot
                            onoffadmin1.reload = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("reload" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin1 = onoffread.command.admin.boot
                            onoffadmin1.reload = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("reload" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'restart') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin1 = onoffread.command.admin.boot
                            onoffadmin1.restart = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("restart" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin1 = onoffread.command.admin.boot
                            onoffadmin1.restart = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("restart" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'shutdown') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin1 = onoffread.command.admin.boot
                            onoffadmin1.shutdown = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("shutdown" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin1 = onoffread.command.admin.boot
                            onoffadmin1.shutdown = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("shutdown" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'add') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.add = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("add" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.add = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("add" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'adminhelp') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.adminhelp = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("adminhelp" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.adminhelp = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("adminhelp" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'botinfo') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.botinfo = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("botinfo" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.botinfo = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("botinfo" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'changelog') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.changelog = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("changelog" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.changelog = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("changelog" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'clear') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.clear = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("clear" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.clear = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("clear" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'consolecolors') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.consolecolors = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("consolecolors" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.consolecolors = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("consolecolors" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'config') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.editconfig = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("config" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.editconfig = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("config" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'mute') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.mute = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("mute" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.mute = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("mute" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'ping') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.ping = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("ping" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.ping = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("ping" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'react') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.react = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("react" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffadmin3 = onoffread.command.admin;
                            onoffadmin3.react = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("react" + lang.admin.config.setoff)));
                        }
                    }
                    //
                    //
                    //User
                    if(args[0] === 'addprofile') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser1 = onoffread.command.user.eco;
                            onoffuser1.addprofile = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("addprofile" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser1 = onoffread.command.user.eco;
                            onoffuser1.addprofile = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("addprofile" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'balance') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser1 = onoffread.command.user.eco;
                            onoffuser1.balance = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("balance" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser1 = onoffread.command.user.eco;
                            onoffuser1.balance = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("balance" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'gamble') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser1 = onoffread.command.user.eco;
                            onoffuser1.gamble = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("gamble" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser1 = onoffread.command.user.eco;
                            onoffuser1.gamble = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("gamble" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'jobs') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser1 = onoffread.command.user.eco;
                            onoffuser1.jobs = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("jobs" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser1 = onoffread.command.user.eco;
                            onoffuser1.jobs = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("jobs" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'test') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser1 = onoffread.command.user.eco;
                            onoffuser1.test = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("test" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser1 = onoffread.command.user.eco;
                            onoffuser1.test = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("test" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'work') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser1 = onoffread.command.user.eco;
                            onoffuser1.work = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("work" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser1 = onoffread.command.user.eco;
                            onoffuser1.work = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("work" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'blush') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser2 = onoffread.command.user.fun;
                            onoffuser2.blush = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("blush" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser2 = onoffread.command.user.fun;
                            onoffuser2.blush = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("blush" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'german') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser2 = onoffread.command.user.fun;
                            onoffuser2.german = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("german" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser2 = onoffread.command.user.fun;
                            onoffuser2.german = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("german" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'grouphug') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser2 = onoffread.command.user.fun;
                            onoffuser2.grouphug = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("grouphug" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser2 = onoffread.command.user.fun;
                            onoffuser2.grouphug = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("grouphug" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'growl') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser2 = onoffread.command.user.fun;
                            onoffuser2.growl = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("growl" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser2 = onoffread.command.user.fun;
                            onoffuser2.growl = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("growl" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'hug') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser2 = onoffread.command.user.fun;
                            onoffuser2.hug = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("hug" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser2 = onoffread.command.user.fun;
                            onoffuser2.hug = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("hug" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'hydrate') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser2 = onoffread.command.user.fun;
                            onoffuser2.hydrate = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("hydrate" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser2 = onoffread.command.user.fun;
                            onoffuser2.hydrate = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("hydrate" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'slap') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser2 = onoffread.command.user.fun;
                            onoffuser2.slap = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("slap" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser2 = onoffread.command.user.fun;
                            onoffuser2.slap = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("slap" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'help') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser4 = onoffread.command.user;
                            onoffuser4.help = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("help" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser4 = onoffread.command.user;
                            onoffuser4.help = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("help" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'mcserver') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser4 = onoffread.command.user;
                            onoffuser4.mcserver = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("mcserver" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let onoffuser4 = onoffread.command.user;
                            onoffuser4.mcserver = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("mcserver" + lang.admin.config.setoff)));
                        }
                    }
                    //
                    //
                    //Wordreaction
                    if(args[0] === 'reactionrole') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let wordreaction = onoffread.command.wordreaction
                            wordreaction.reactionrole = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("reactionrole" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let wordreaction = onoffread.command.wordreaction
                            wordreaction.reactionrole = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("reactionrole" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'clannsfw') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let wordreaction = onoffread.command.wordreaction
                            wordreaction.clannsfw = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("clannsfw" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let wordreaction = onoffread.command.wordreaction
                            wordreaction.clannsfw = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("clannsfw" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'clansfw') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let wordreaction = onoffread.command.wordreaction
                            wordreaction.clansfw = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("clansfw" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let wordreaction = onoffread.command.wordreaction
                            wordreaction.clansfw = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("clansfw" + lang.admin.config.setoff)));
                        }
                    }
                    if(args[0] === 'wordreact') {
                        if(args[1] === "on") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let wordreaction = onoffread.command.wordreaction
                            wordreaction.wordreact = true;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("wordreact" + lang.admin.config.seton)));
                        }
                        if(args[1] === "off") {
                            let onoffrawdata = fs.readFileSync('./config/onoff.json');
                            let onoffread = JSON.parse(onoffrawdata);
                            let wordreaction = onoffread.command.wordreaction
                            wordreaction.wordreact = false;
                            let dataconfig = JSON.stringify(onoffread, null, 2);
                            fs.writeFileSync('./config/onoff.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white("wordreact" + lang.admin.config.setoff)));
                        }
                    }
                    // console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.config.log)));
                } else {
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.config.errorperms)));
                }
            } else {
                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.config.errorchannel)));
            }
        }
    }
}
