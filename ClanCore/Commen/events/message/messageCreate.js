
// Require discord.js, fs, Luxon.
const Discord = require('discord.js');
const { Message, PermissionsBitField } = Discord;
// Require dotenv as config (.env).
require('dotenv').config();
const prefix = process.env.PREFIX;

module.exports = {
    name: 'messageCreate',
    /**
     * @param {Message} message
     */
    async execute(message) {
        // Check for Bot.
        if (!message.author || message.author.bot) {
            return;
        };

        // Get Arguments and Command Name from Message.
        // const args = message.content.slice(prefix.length).split(/ +/);
        const msgLower = message.content.replace(prefix, '').toLowerCase();
        const argsLower = msgLower.split(/ +/);
        const none = argsLower.shift();
        const args = message.content.replace(prefix, '').split(/ +/);
        const commandName = args.shift().toLowerCase();
        // console.log(msgLower);
        // console.log(argsLower);
        if (!commandName) {
            return;
        };

        // Admin
        let permissions = message.member.permissions;
        if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)){
            const getClientID = globalclient.user.id;
            const mentionIsClient = message.mentions.has(getClientID);
            const msgBot = message.content.toLowerCase();
            const argsBot = msgBot.split(/ +/);
            // Set Commands
            if (mentionIsClient === true && argsBot[1] === 'run' && argsBot[2] === 'command') {
                if (argsBot[3] === 'local') {
                    const rqir = require(`../../../../ClanSys/deployment/localadd.js`)(message, args, Discord);
                    rqir;
                };
                if (argsBot[3] === 'global') {
                    const rqir2 = require(`../../../../ClanSys/deployment/globaladd.js`)(message, args, Discord);
                    rqir2;
                };
            };
            // Delete Commands
            if (mentionIsClient === true && argsBot[1] === 'delete' && argsBot[2] === 'command') {
                if (argsBot[3] === 'local') {
                    const rqir3 = require(`../../../../ClanSys/deployment/localremove.js`)(message, args, Discord);
                    rqir3;
                };
                if (argsBot[3] === 'global') {
                    const rqir4 = require(`../../../../ClanSys/deployment/globalremove.js`)(message, args, Discord);
                    rqir4;
                };
            };
            // Emit
            if (mentionIsClient === true && argsBot[1] === 'run' && argsBot[2] === 'emit') {
                const rqir = require(`../../../../ClanSys/deployment/emit.js`)(message, argsBot, Discord);
                rqir;
            };
        };
    },
};
