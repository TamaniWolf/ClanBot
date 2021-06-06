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
    name: 'language',
    aliases: ['lang'],
    description: 'editing lang',
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
                        message.channel.send(lang.admin.lang.noargs1 + `\`${prefix}lang list\`` + lang.admin.lang.noargs2);
                        //console.log('config');
                    }
                    if(args[0] === 'help' || args[0] === 'list') {
                        message.channel.send(lang.admin.lang.list);
                        //console.log('config list');
                    }
                    //lang Config
                    if(args[0] === 'default') {
                        let configrawdata = fs.readFileSync('./config/config.json');
                        let configread = JSON.parse(configrawdata);
                        configread.lang = './lang/en_US.json';
                        let dataconfig = JSON.stringify(configread, null, 2);
                        fs.writeFileSync('./config/config.json', dataconfig);
                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.lang.default)));
                        message.reply(lang.admin.lang.default)
                    }
                    if(args[0] === 'english') {
                        let configrawdata = fs.readFileSync('./config/config.json');
                        let configread = JSON.parse(configrawdata);
                        configread.lang = './lang/en_US.json';
                        let dataconfig = JSON.stringify(configread, null, 2);
                        fs.writeFileSync('./config/config.json', dataconfig);
                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.lang.en)));
                        message.reply(lang.admin.lang.en)
                    }
                    if(args[0] === 'german') {
                        if(configmain.lang === "./lang/de_DE.json") {
                            let configrawdata = fs.readFileSync('./config/config.json');
                            let configread = JSON.parse(configrawdata);
                            configread.lang = './lang/en_US.json';
                            let dataconfig = JSON.stringify(configread, null, 2);
                            fs.writeFileSync('./config/config.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.lang.default)));
                            message.reply(lang.admin.lang.default)
                        } else {
                        // if(configmain.lang === "./lang/de_DE.json") {
                            let configrawdata = fs.readFileSync('./config/config.json');
                            let configread = JSON.parse(configrawdata);
                            configread.lang = './lang/de_DE.json';
                            let dataconfig = JSON.stringify(configread, null, 2);
                            fs.writeFileSync('./config/config.json', dataconfig);
                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.lang.de)));
                            message.reply(lang.admin.lang.de)
                        }
                    }
                    // console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.ping.log)));
                } else {
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.lang.errorperms)));
                }
            } else {
                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.admin.lang.errorchannel)));
            }
        }
    }
}
