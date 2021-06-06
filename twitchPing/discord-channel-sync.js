const configonoff = require('../config/onoff.json');
const chalk = require('chalk');
var moment = require('moment');

if(configonoff.twitch === true) {
    /**
     * Helper class for syncing discord target channels.
     */
    class DiscordChannelSync {
        /**
         * @param {Client} client Discord.js client.
         * @param {string} channelName Name of the Discord channel we are looking for on each server (e.g. `config.discord_announce_channel`).
         * @param {boolean} verbose If true, log guild membership info to stdout (debug / info purposes).
         * @return {Channel[]} List of Discord.js channels
         */
        static getChannelList(client, channelName, verbose) {
            let nextTargetChannels = [];

            client.guilds.cache.forEach((guild) => {
                let targetChannel = guild.channels.cache.find(g => g.name === channelName);

                if (!targetChannel) {
                    if (verbose) {
                        console.warn(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]', chalk.white('Configuration problem /!\\', `Guild ${guild.name} does not have a #${channelName} channel!`)));
                    }
                } else {
                    let permissions = targetChannel.permissionsFor(guild.me);

                    if (verbose) {
                        console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]', chalk.white(' --> ', `Member of server ${guild.name}, target channel is #${targetChannel.name}`)));
                    }

                    if (!permissions.has("SEND_MESSAGES")) {
                        if (verbose) {
                            console.warn(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]', chalk.white('Permission problem /!\\', `I do not have SEND_MESSAGES permission on channel #${targetChannel.name} on ${guild.name}: announcement sends will fail.`)));
                        }
                    }

                    nextTargetChannels.push(targetChannel);
                }
            });

            if (verbose) {
                console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][Discord]', chalk.white(`Discovered ${nextTargetChannels.length} channels to announce to for ${channelName}.`)));
            }

            return nextTargetChannels;
        }
    }

    module.exports = DiscordChannelSync;
}
