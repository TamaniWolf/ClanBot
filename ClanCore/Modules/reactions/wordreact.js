
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();

module.exports = {
    name: 'messageCreate',
    description: 'Loggin bot\'s beeing added to the server.',
    call: 'on', // client.once = 'once', client.on = 'on'
    async execute(message) {
        if (message != null || message.content != null) {
            // SQLite
            const { Get } = require('../functions/sqlite/prepare');
            // Data Null
            let dataReaction;
            // Data Get
            let getBotConfigID = `${message.guild.id}-${message.guild.shardId}`;
            dataReaction = Get.onOffForReaction(getBotConfigID);
            // Data Check
            if (dataReaction == null) { dataReaction = { Words_True: 'true', Words_Gay: 'true', Words_Easteregg: 'true', Words_Haha: 'true', Words_Meep: 'true', Words_Slap: 'true', Words_Butt: 'true' }; };
            // console.log(dataReaction);
            // Context
            let prefix = process.env.PREFIX;
            if (dataReaction.Words_True === 'true' && !message.content.startsWith(`${prefix}`)) {
                let txtPlain = message.content.toString().trim();
                let txtLower = txtPlain.toLowerCase();
                if (!txtLower.length) { return; };
                let txtNoPunct = txtLower;
                txtNoPunct = txtNoPunct.replace(/[,/./?/!]/gi, ' ');
                txtNoPunct = txtNoPunct.replace(/[/'/"/~]/gi, '');
                txtNoPunct = txtNoPunct.replaceAll('  ', ' ');
                txtNoPunct = txtNoPunct.trim();
                if (message.author.bot) { return; };
                try {
                    // Determine individual words that were part of this message
                    let txtWords = txtNoPunct.split(' ');
                    // Gay
                    if (dataReaction.Words_Gay === 'true') {
                        let gayWords = ["gay", "queer", "homo", "pride", "rainbow", "prideflag"];
                        for (let i = 0; i < gayWords.length; i++) {
                            let _gayWord = gayWords[i];
                            if (txtLower.indexOf(_gayWord) >= 0) {
                                message.react("🏳️‍🌈");
                                console.log(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] gay, queer, homo, pride, rainbow, prideflag`);
                            };
                        };
                    };
                    // // Easter egg: timGuest420 reaction
                    // if (dataReaction.Words_Easteregg === 'true') {
                    //     if (txtWords.indexOf("grass") >= 0 || txtLower.indexOf("420") >= 0
                    //         || txtWords.indexOf("kush") >= 0 || txtWords.indexOf("weed") >= 0
                    //         || txtLower.indexOf("aunt mary") >= 0 || txtWords.indexOf("ganja") >= 0
                    //         || txtWords.indexOf("herb") >= 0 || txtWords.indexOf("joint") >= 0
                    //         || txtWords.indexOf("juja") >= 0 || txtLower.indexOf("mary jane") >= 0
                    //         || txtWords.indexOf("reefer") >= 0 || txtWords.indexOf("doobie") >= 0
                    //         || txtWords.indexOf("cannabis") >= 0 || txtLower.indexOf("magic brownie") >= 0
                    //         || txtWords.indexOf("bong") >= 0 || txtNoPunct.indexOf("devils lettuce") >= 0
                    //         || txtLower.indexOf("marijuana") >= 0 || txtLower.indexOf("dime bag") >= 0
                    //         || txtWords.indexOf("dimebag") >= 0 || txtWords.indexOf("toke") >= 0
                    //         || txtWords.indexOf("blaze") >= 0 || txtWords.indexOf("blunt") >= 0) {
                    //         let fourtwentyEmoji = getServerEmoji("confusedwolf", false);
                    //         if (fourtwentyEmoji) {
                    //             message.react(fourtwentyEmoji);
                    //         };
                    //     };
                    // };
                    // haha
                    if (dataReaction.Words_Haha === 'true') {
                        let hahaWords = ["haha", "hehe"];
                        for (let i = 0; i < hahaWords.length; i++) {
                            let _hahaWord = hahaWords[i];
                            if (txtLower.indexOf(_hahaWord) >= 0) {
                                message.react("😆");
                                console.log(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot]  haha, hehe`);
                            };
                        };
                    };
                    // meep
                    if (dataReaction.Words_Meep === 'true') { // :ME::EP:
                        if (txtWords.indexOf('meep') >= 0) {
                            message.reply('Meep!');
                            console.log(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot]  `);
                        };
                    };
                    // slap
                    if (dataReaction.Words_Slap === 'true') {
                        if (txtWords.indexOf('slap') >= 0) {
                            message.react("🗞️");
                            console.log(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot]  slap`);
                        };
                    };
                    // butt
                    if (dataReaction.Words_Butt === 'true') {
                        if (txtWords.indexOf('butt') >= 0 || txtWords.indexOf('butts') >= 0) {
                            message.reply('Hehe, Butts~ >:3');
                            console.log(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot]  butt`);
                        };
                    };
                } catch (e) {
                    console.error(`[${DateTime.utc().toFormat(timeFormat)}][Chat] Message processing / dumb joke error:\n`, e);
                };
            } else {
                return;
            };
        } else {
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Message of Wordreaction returned \'null / undefined\'.`);
        };
    },
};