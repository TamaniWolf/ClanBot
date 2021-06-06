const mcping = require('mc-ping-updated');
const configmain = require('../../config/config.json');
const configchannel = require('../../config/channels.json');
const configonoff = require('../../config/onoff.json');
const configrole = require('../../config/roles.json');
const lang = require('../.' + configmain.lang);
const chalk = require('chalk');
const escape = require('markdown-escape');
var moment = require('moment');
require('dotenv').config();
var hasIcon = 'yes';
embedColor = ("0x" + "#00ba3b");
embedColorOff = ("0x" + "#b51f49");

module.exports = {
    name: 'mcserver',
    aliases: ['mcs', 'mcstatus'],
    description: 'Checks the status of a Minecraft Server',
    guildOnly: true,
    async execute(client, message, args, Discord) {
        if(configonoff.command.user.mcserver === true) {
            if(configonoff.mcping === true) {
                //code to run when command is sent
                console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.mc.log)));
                mcping(process.env.IP, 25300, function (err, res) {
                    if (err) {
                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(err)));
                        message.channel.send(lang.mc.error);
                        return;
                    } else {
                        //console.log('RES:', res)
                        //console.log('players:', res.players)
                        //console.log('sample:', res.players.sample)

                        //console.log('DESC:', res.description)
                        //console.log('EXTRA:', res.description.extra)
                        try {
                            favicon = res.favicon.slice(22)
                            hasIcon = 'yes'
                        } catch (error) {
                            hasIcon = 'no'
                        }
                        let onlinePlayers = [];
                        if (typeof res.players.sample == 'undefined') {
                            serverStatus = lang.mc.noplayer;
                        } else {
                            for (var i = 0; i < res.players.sample.length; i++) {
                                onlinePlayers.push(res.players.sample[i].name);
                            };
                            onlinePlayers = escape(onlinePlayers.sort().join(', ')).replace(/\u00A7[0-9A-FK-OR]|\\n/ig,'');
                            serverStatus = '**' + res.players.online + '/' + res.players.max +
                                '**' + ` ${lang.mc.playeron}\n\n` + onlinePlayers;

                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][MC]' + chalk.white('Server Status', serverStatus)));
                        };
                        if (hasIcon === 'yes') {
                            const buffer = Buffer.from(favicon, 'base64')
                            const serverEmbedicon = new Discord.MessageEmbed().attachFiles({ attachment: buffer,
                                name: 'icon.png' }).setTitle(lang.mc.statusfor +
                                process.env.IP + ':').setColor(embedColor).setDescription(
                                serverStatus).setThumbnail('attachment://icon.png').addField(lang.mc.ip,
                                process.env.IP).addField(
                                lang.mc.version, res.version.name)
                            message.channel.send(serverEmbedicon);
                        } else if (hasIcon === 'no') {
                            const serverEmbedNoIcon = new Discord.MessageEmbed().setTitle(
                                lang.mc.statusfor + process.env.MCSNAME + ':').setColor(embedColor)
                                .setDescription(serverStatus).addField(lang.mc.ip,
                                    process.env.IP).addField(lang.mc.version,
                                    res.version.name)
                            message.channel.send(serverEmbedNoIcon);
                        }
                    }
                }, 3000);
                return;
            }
        }
    }
}
