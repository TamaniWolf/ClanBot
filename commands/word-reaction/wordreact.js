const configmain = require('../../config/config.json')
const configonoff = require('../../config/onoff.json');
const lang = require('../.' + configmain.lang);
const chalk = require('chalk');
const ElizaHelper = require('../word-reaction/eliza-clan/eliza');
var moment = require('moment');
require('dotenv').config();

module.exports = (client, args, Discord) => {
    //Commands
    let lastTextReplyAt = 0;
    client.on('message', message => {
        if(configonoff.command.wordreaction.wordreact === true) {
            if (!message.content) {
                // Empty message
                return;
            }
            let txtPlain = message.content.toString().trim();
            let txtLower = txtPlain.toLowerCase();
            if (!txtLower.length) {
                // Whitespace or blank message
                return;
            }
            let txtNoPunct = txtLower;
            txtNoPunct = txtNoPunct.replace(",", " ");
            txtNoPunct = txtNoPunct.replace(".", " ");
            txtNoPunct = txtNoPunct.replace("?", " ");
            txtNoPunct = txtNoPunct.replace("!", " ");
            txtNoPunct = txtNoPunct.replace("'", "");
            txtNoPunct = txtNoPunct.replace(`"`, "");
            txtNoPunct = txtNoPunct.replace("  ", " ");
            txtNoPunct = txtNoPunct.trim();
            if (message.author.bot) {
                // Bot message
                // As a courtesy, we ignore all messages from bots (and, therefore, ourselves) to avoid any looping or spamming
                return;
            }
            let now = Date.now();
            try {
                // Determine individual words that were part of this message
                let txtWords = txtNoPunct.split(' ');
                // Determine the names of any users mentioned
                let mentionedUsernames = [];
                message.mentions.users.forEach((user) => {
                    mentionedUsernames.push(user.username);
                });
                if(configonoff.command.wordreaction.eliza === true) {
                    // Determine whether *we* were mentioned
                    let elizaWasMentioned = (txtWords.indexOf("eliza") >= 0);
                    let elizaWasOn = ElizaHelper.isActiveForUser(message.author);
                    let elizaModeOn = (elizaWasMentioned || elizaWasOn);
                    // Anti spam timer
                    let lastTextReply = lastTextReplyAt || 0;
                    let minutesSinceLastTextReply = Math.floor(((Date.now() - lastTextReply) / 1000) / 60);
                    let okayToTextReply = (minutesSinceLastTextReply >= 1);
                    let fnTextReply = function (txt, force, asNormal) {
                        if (okayToTextReply || force) {
                            try {
                                if (asNormal) {
                                    message.channel.send(txt);
                                } else {
                                    message.reply(txt);
                                }
                                lastTextReplyAt = now;
                            } catch (e) {
                            console.error(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Chat]', chalk.white('Reply error:', e)))
                            }
                        }
                        try {
                            message.channel.stopTyping();
                        } catch (e) { }
                        return true;
                    };
                    // Timbot mentions
                    if (elizaWasMentioned) {
                        // --- Eliza start ---
                        if (elizaModeOn) {
                            let isEnding = txtNoPunct.indexOf("goodbye") >= 0 || txtNoPunct.indexOf("good bye") >= 0;
                            let isStarting = !isEnding && !elizaWasOn;
                            message.channel.startTyping();
                            if (isEnding) {
                                ElizaHelper.end(message);
                            } else if (isStarting) {
                                ElizaHelper.start(message);
                            } else {
                                ElizaHelper.reply(message);
                            }
                            return;
                        }
                        // --- Eliza eof ---
                        let isNegative = (txtWords.indexOf("not") >= 0 || txtLower.indexOf("n't") >= 0 ||
                        txtWords.indexOf("bad") >= 0);
                        // General mention -----------------------------------------------------------------------------------------
                    }
                }
                // Gay
                let gayWords = ["gay", "queer", "homo", "pride", "rainbow", "prideflag"];
                for (let i = 0; i < gayWords.length; i++) {
                    let _gayWord = gayWords[i];
                    if (txtLower.indexOf(_gayWord) >= 0) {
                        message.react("🏳️‍🌈");
                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.log.word, 'gay, queer, homo, pride, rainbow, prideflag')));
                    }
                }
                // // Easter egg: timGuest420 reaction
                // if (txtWords.indexOf("grass") >= 0 || txtLower.indexOf("420") >= 0
                //     || txtWords.indexOf("kush") >= 0 || txtWords.indexOf("weed") >= 0
                //     || txtLower.indexOf("aunt mary") >= 0 || txtWords.indexOf("ganja") >= 0
                //     || txtWords.indexOf("herb") >= 0 || txtWords.indexOf("joint") >= 0
                //     || txtWords.indexOf("juja") >= 0 || txtLower.indexOf("mary jane") >= 0
                //     || txtWords.indexOf("reefer") >= 0 || txtWords.indexOf("doobie") >= 0
                //     || txtWords.indexOf("cannabis") >= 0 || txtLower.indexOf("magic brownie") >= 0
                //     || txtWords.indexOf("bong") >= 0 || txtNoPunct.indexOf("devils lettuce") >= 0
                //     || txtLower.indexOf("marijuana") >= 0 || txtLower.indexOf("dime bag") >= 0
                //     || txtWords.indexOf("dimebag") >= 0 || txtWords.indexOf("toke") >= 0
                //     || txtWords.indexOf("blaze") >= 0 || txtWords.indexOf("blunt") >= 0
                // ) {
                //     let fourtwentyEmoji = getServerEmoji("timGuest420", false);
                //     if (fourtwentyEmoji) {
                //         message.react(fourtwentyEmoji);
                //     }
                // }
                //Meep
                // if (txtWords.indexOf("meep") >= 0 ) {
                //     message.channel.send(lang.meep.text);
                //     console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.meep.log)));
                // }
                // haha
                let hahaWords = ["haha", "hehe"];
                for (let i = 0; i < hahaWords.length; i++) {
                    let _hahaWord = hahaWords[i];
                    if (txtLower.indexOf(_hahaWord) >= 0) {
                        message.react("😆");
                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.log.word, 'haha, hehe')));
                    }
                }
                // slap
                if (txtWords.indexOf('slap') >= 0) {
                    message.react("🗞️");
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.log.word, 'slap')));
                }
            } catch (e) {
                console.error(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Chat]', chalk.white('Message processing / dumb joke error:', e, `<<< ${e.toString()} >>>`)));
            }
        }
    });
}
