//Discord const
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
const fs = require('fs');
require('dotenv').config();
const configmain = require('./config/config.json');
const configchannel = require('./config/channels.json');
const configonoff = require('./config/onoff.json');
const configrole = require('./config/roles.json');
const lang = require(configmain.lang);
const chalk = require('chalk');
//MC Ping const
const mcping = require('mc-ping-updated');
pingFrequency = (60 * 1000);
embedColor = ("0x" + "#00ba3b");
embedColorOff = ("0x" + "#b51f49");
//Twitch const
global.discordJsClient = client;
const TwitchMonitor = require("./twitchPing/twitch-monitor");
const FooduseMonitor = require("./twitchPing/fooduse-monitor");
const DiscordChannelSync = require("./twitchPing/discord-channel-sync");
const LiveEmbed = require('./twitchPing/live-embed');
const MiniDb = require('./twitchPing/minidb');
//Time
var moment = require('moment-timezone');
console.log('[Time]', moment.utc().format('MM/DD/YYYY, h:mm:ss a'), '[UTC]');
//Start
console.log(chalk.yellow(lang.prefix.clan + chalk.white(' ▪ ▪ ▪ ▪ ▪ ', 'Clan Start', ' ▪ ▪ ▪ ▪ ▪ ')));

//try {
    //MC Ping Handler
    if(configonoff.mcping === true) {
        function getServerStatus() {
            mcping(process.env.IP, 25100, function(err, res) {
            if (!(typeof err === 'undefined' || err === null)) {
                client.user.setStatus('dnd');
                serverStatus = lang.mc.off;
                //client.user.setActivity(serverStatus, { type: 'PLAYING' });
                client.user.setActivity(lang.admin.clan.os, { type: 'PLAYING' });
                console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][MC] Ping:', chalk.white(
                lang.mc.error)));
                console.error(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][MC] Ping:', chalk.white(err)));
                return;
            }
            if (typeof res.players.sample === 'undefined') { client.user.setStatus('idle') }
            if (!(typeof res.players.sample === 'undefined')) { client.user.setStatus('online') }
            serverStatus = res.players.online + ' / ' + res.players.max;
            //client.user.setActivity(serverStatus, { type: 'PLAYING' }).then(presence => console.log(
            client.user.setActivity(lang.admin.clan.os, { type: 'PLAYING' }).then(presence => console.log(
            chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][MC] Ping:'), chalk.white(serverStatus)
            )).catch(console.error);
            })
        }
        client.on('ready', () => {
            console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]'), chalk.white(`logged in as ${client.user.tag}.`));
            //const botChannel = configchannel.admin.admin1
            //client.channels.cache.get(botChannel).send(lang.log.login)
            //if(configonoff.minecraftping === true) {
                getServerStatus()
                client.setInterval(getServerStatus, pingFrequency);
            //}
        });
    }
    //Command Event Database handler
    client.commands = new Discord.Collection();
    client.events = new Discord.Collection();
    ['admin_command_handler', 'command_handler', 'event_handler'].forEach(handler =>{
        require(`./handlers/${handler}`)(client, Discord);
    })
    client.reaction = new Discord.Collection();
    //['wordreact', 'reactionrole'].forEach(wordreaction =>{
    ['wordreact'].forEach(wordreaction =>{
        require(`./commands/word-reaction/${wordreaction}.js`)(client, Discord);
    })
    if(configonoff.cooldown === true) {
        client.cooldown = new Discord.Collection();
        ['gamble', 'job'].forEach(cooldowns =>{
            require(`./utils/cooldowns/${cooldowns}.js`)(client, Discord);
        })
    }
    if(configonoff.twitch === true) {
        client.twitchrequest = new Discord.Collection();
        require(`./utils/twitchRequest/twitchrequest.js`)(client, Discord);
    }
    client.on("guildMemberAdd", member => {
        if (configmain.set.profilenewjoin === true) {
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
                let tempprofilewrawdata = fs.readFileSync('./db/template/profile.json');
                let tempprofileread = JSON.parse(tempprofilewrawdata);
                let tempcooldownrawdata = fs.readFileSync('./db/template/cooldown.json');
                let tempcooldownread = JSON.parse(tempcooldownrawdata);

                let dbnumbercount = dbnumberread.count + 1
                dbnumberread.count = dbnumbercount;
                let datacount = JSON.stringify(dbnumberwrite, null, 2);
                fs.writeFileSync('./db/count/dbnumber.json', datacount);
                // Create new Profile if not exists
                tempprofileread.dbNumber = dbnumbercount
                tempprofileread.member = member
                let dataprofile = JSON.stringify(tempprofileread, null, 2);
                fs.appendFile(`./db/economy/profiles/${member.id}.json`, dataprofile, function (err){
                    if (err) throw err;
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, `Profile file '${member.id}.json' is creacted.`));
                });
                let newjointime = moment.utc(member.joinedTimestamp).add(4, 'days').format('MM/DD/YYYY-hh:mm:ss-a')
                tempcooldownread.dbNumber = dbnumbercount
                tempcooldownread.member = member
                tempcooldownread.cooldown.newjoin = newjointime
                let datacooldown = JSON.stringify(tempcooldownread, null, 2);
                fs.appendFile(`./db/cooldown/${member.id}.json`, datacooldown, function (err){
                    if (err) throw err;
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, `Cooldown file '${member.id}.json' is creacted.`));
                });
            }
        }
    });
    //Discord
    let emojiCache = { };
    let getServerEmoji = (emojiName, asText) => {
        if (typeof emojiCache[emojiName] !== "undefined") {
            return emojiCache[emojiName];
        }
        try {
            let emoji = client.emojis.cache.find(e => e.name === emojiName);
            if (emoji) {
                emojiCache[emojiName] = emoji;
                if (asText) {
                    return emoji.toString();
                } else {
                    return emoji.id;
                }
            }
        } catch (e) {
            console.error(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Error]'), chalk.white(e));
        }
        return null;
    };
    global.getServerEmoji = getServerEmoji;
    //login
    if(configonoff.twitch === false) {
        client.on('ping', () => {
            console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]'), chalk.white(`logged in as ${client.user.tag}.`));
            //const botChannel = configchannel.admin.admin1
            //client.channels.cache.get(botChannel).send(lang.log.login)
            //if(configonoff.minecraftping === true) {
            //     getServerStatus()
            //     client.setInterval(getServerStatus, pingFrequency);
            //}
        });

        client.on("guildJoin", guild => {
            console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]'), chalk.white(`Joined new server: ${guild.name}`));
            // syncServerList(false);
        });

        client.on("guildLeave", guild => {
            console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]'), chalk.white(`Removed from a server: ${guild.name}`));
            // syncServerList(false);
        });

        console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]'), chalk.white('Logging in...'));
        client.login(process.env.TOKEN);
    }

    if(configonoff.twitch === true) {
        client.on('ready', () => {
            console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]'), chalk.white(`logged in as ${client.user.tag}.`));
            //const botChannel = configchannel.admin.admin1
            //client.channels.cache.get(botChannel).send(lang.log.login)
            if(configonoff.minecraftping === true) {
                getServerStatus()
                client.setInterval(getServerStatus, pingFrequency);
            }
            
                // Init list of connected servers, and determine which channels we are announcing to
                syncServerList(true);

                // Keep our activity in the user list in sync
                StreamActivity.init(client);

                // Begin Twitch API polling
                TwitchMonitor.start();

                // Activate Food Use integration
                FooduseMonitor.start();
            
        });

        let syncServerList = (logMembership) => {
            targetChannels = DiscordChannelSync.getChannelList(client, process.env.DISCORD_ANNOUNCE_CHANNEL, logMembership);
        };

        client.on("guildJoin", guild => {
            console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]'), chalk.white(`Joined new server: ${guild.name}`));
            // syncServerList(false);
        });

        client.on("guildLeave", guild => {
            console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]'), chalk.white(`Removed from a server: ${guild.name}`));
            // syncServerList(false);
        });

        console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]'), chalk.white('Logging in...'));
        client.login(process.env.TOKEN);

        //Twitch
        // Activity updater
        class StreamActivity {
            /**
             * Registers a channel that has come online, and updates the user activity.
             */
            static setChannelOnline(stream) {
                this.onlineChannels[stream.user_name] = stream;
                this.updateActivity();
            }
            /**
             * Marks a channel has having gone offline, and updates the user activity if needed.
             */
            static setChannelOffline(stream) {
                delete this.onlineChannels[stream.user_name];
                this.updateActivity();
            }
            /**
             * Fetches the channel that went online most recently, and is still currently online.
             */
            static getMostRecentStreamInfo() {
                let lastChannel = null;
                for (let channelName in this.onlineChannels) {
                    if (typeof channelName !== "undefined" && channelName) {
                        lastChannel = this.onlineChannels[channelName];
                    }
                }
                return lastChannel;
            }
            /**
             * Updates the user activity on Discord.
             * Either clears the activity if no channels are online, or sets it to "watching" if a stream is up.
             */
            static updateActivity() {
                let streamInfo = this.getMostRecentStreamInfo();
                if (streamInfo) {
                    this.discordClient.user.setActivity(streamInfo.user_name, {
                        "url": `https://twitch.tv/${streamInfo.user_name.toLowerCase()}`,
                        "type": "STREAMING"
                    });
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][StreamActivity]'), chalk.white(`Update current activity: watching ${streamInfo.user_name}.`));
                } else {
                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][StreamActivity]'), chalk.white('Cleared current activity.'));
                    this.discordClient.user.setActivity(null);
                }
            }
            static init(discordClient) {
                this.discordClient = discordClient;
                this.onlineChannels = { };
                this.updateActivity();
                // Continue to update current stream activity every 5 minutes or so
                // We need to do this b/c Discord sometimes refuses to update for some reason
                // ...maybe this will help, hopefully
                setInterval(this.updateActivity.bind(this), 5 * 60 * 1000);
            }
        }


        // ---------------------------------------------------------------------------------------------------------------------
        // Live events
        let liveMessageDb = new MiniDb('live-messages');
        let messageHistory = liveMessageDb.get("history") || { };
        TwitchMonitor.onChannelLiveUpdate((streamData) => {
            if(configonoff.twitch === true) {
                const isLive = streamData.type === "live";
                // Refresh channel list
                try {
                    syncServerList(false);
                } catch (e) { }
                // Update activity
                StreamActivity.setChannelOnline(streamData);
                // Generate message
                const msgFormatted = `${streamData.user_name}${lang.twitch.wentlive}`;
                const msgEmbed = LiveEmbed.createForStream(streamData);
                // Broadcast to all target channels
                let anySent = false;
                for (let i = 0; i < targetChannels.length; i++) {
                    const discordChannel = targetChannels[i];
                    const liveMsgDiscrim = `${discordChannel.guild.id}_${discordChannel.name}_${streamData.id}`;
                    if (discordChannel) {
                        try {
                            // Either send a new message, or update an old one
                            let existingMsgId = messageHistory[liveMsgDiscrim] || null;
                            if (existingMsgId) {
                                // Fetch existing message
                                discordChannel.messages.fetch(existingMsgId)
                                .then((existingMsg) => {
                                    existingMsg.edit(msgFormatted, {
                                        embed: msgEmbed
                                    }).then((message) => {
                                        // Clean up entry if no longer live
                                        if (!isLive) {
                                            delete messageHistory[liveMsgDiscrim];
                                            liveMessageDb.put('history', messageHistory);
                                        }
                                    });
                                })
                                .catch((e) => {
                                    // Unable to retrieve message object for editing
                                    if (e.message === "Unknown Message") {
                                        // Specific error: the message does not exist, most likely deleted.
                                        delete messageHistory[liveMsgDiscrim];
                                        liveMessageDb.put('history', messageHistory);
                                        // This will cause the message to be posted as new in the next update if needed.
                                    }
                                });
                            } else {
                                // Sending a new message
                                if (!isLive) {
                                    // We do not post "new" notifications for channels going/being offline
                                    continue;
                                }
                                // Expand the message with a @mention for "here" or "everyone"
                                // We don't do this in updates because it causes some people to get spammed
                                let mentionMode = (configmain.discord_mentions && configmain.discord_mentions[streamData.user_name.toLowerCase()]) || null;
                                if (mentionMode) {
                                    mentionMode = mentionMode.toLowerCase();
                                    if (mentionMode === "everyone" || mentionMode === "here") {
                                        // Reserved @ keywords for discord that can be mentioned directly as text
                                        mentionMode = `@${mentionMode}`;
                                    } else {
                                        // Most likely a role that needs to be translated to <@&id> format
                                        let roleData = discordChannel.guild.roles.cache.find((role) => {
                                            return (role.name.toLowerCase() === mentionMode);
                                        });
                                        if (roleData) {
                                            mentionMode = `<@&${roleData.id}>`;
                                        } else {
                                        console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]'), chalk.white(`Cannot mention role: ${mentionMode}`,
                                        `(does not exist on server ${discordChannel.guild.name})`));
                                        mentionMode = null;
                                        }
                                    }
                                }
                                let msgToSend = msgFormatted;
                                if (mentionMode) {
                                    msgToSend = msgFormatted + ` ${mentionMode}`
                                }
                                let msgOptions = {
                                    embed: msgEmbed
                                };
                                discordChannel.send(msgToSend, msgOptions)
                                .then((message) => {
                                    console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]'), chalk.white(`Sent announce msg to #${discordChannel.name} on ${discordChannel.guild.name}`));
                                    messageHistory[liveMsgDiscrim] = message.id;
                                    liveMessageDb.put('history', messageHistory);
                                })
                                .catch((err) => {
                                    console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]'), chalk.white(`Could not send announce msg to #${discordChannel.name} on ${discordChannel.guild.name}:`, error));
                                });
                            }
                            anySent = true;
                        } catch (e) {
                        console.warn(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]'), chalk.white('Message send problem:', e));
                        }
                    }
                }
                liveMessageDb.put('history', messageHistory);
                return anySent;
            }
        });

        TwitchMonitor.onChannelOffline((streamData) => {
        // Update activity
        StreamActivity.setChannelOffline(streamData);
        });
    }

    // --- Common functions ------------------------------------------------------------------------------------------------
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };
    String.prototype.spacifyCamels = function () {
        let target = this;
        try {
            return target.replace(/([a-z](?=[A-Z]))/g, '$1 ');
        } catch (e) {
            return target;
        }
    };
    Array.prototype.joinEnglishList = function () {
        let a = this;
        try {
            return [a.slice(0, -1).join(', '), a.slice(-1)[0]].join(a.length < 2 ? '' : ' and ');
        } catch (e) {
            return a.join(', ');
        }
    };
    String.prototype.lowercaseFirstChar = function () {
        let string = this;
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    Array.prototype.hasEqualValues = function (b) {
        let a = this;
        if (a.length !== b.length) {
            return false;
        }
        a.sort();
        b.sort();
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
//} catch(error) {
//    console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A'), ']', chalk.white(error.message)));
//};
//Error listener
client.on('unhandledRejection', error => {
    console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A'), ']' + lang.error.unhandled), chalk.white(error));
});
client.on('shardError', error => {
    console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A'), ']' + lang.error.websocket), chalk.white(error));
});

//--------END--------//
