
// DiscordJS
const Discord = require('discord.js');
const { Client, GatewayIntentBits, Partials, Collection } = Discord;
require('dotenv').config();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution
    ], 
    partials: [
        Partials.User,                  // The partial to receive uncached users.
        Partials.Channel,               // The partial to receive uncached channels. This is required to receive direct messages.
        Partials.GuildMember,           // The partial to receive uncached guild members.
        Partials.Message,               // The partial to receive uncached messages.
        Partials.Reaction,              // The partial to receive uncached reactions.
        Partials.GuildScheduledEvent,   // The partial to receive uncached guild scheduled events.
        Partials.ThreadMember           // The partial to receive uncached thread members.
    ]
});
//Discord const
const fs = require('node:fs');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
const { DateTime } = require('luxon');
console.log(`[Time] ${DateTime.utc().toFormat(timeFormat)} [UTC]`);

//Start
console.log(`[NodeJS] ▪ ▪ ▪ ▪ ▪  DiscordBot Start  ▪ ▪ ▪ ▪ ▪ `);

    //Command Event Database handler
    client.cooldowns = new Collection();
    client.slashCommands = new Collection();
    ['command_handler', 'event_handler'].forEach(commenHandler =>{
        require(`./ClanCore/Commen/handlers_commen/${commenHandler}.js`)(client, Discord, fs);
    });
    // Login
    // client.on('debug', console.log);
    client.login(process.env.TOKEN);

//Error listener
process.on('uncaughtException', error => {
    console.error(`[${DateTime.utc().toFormat(timeFormat)}][ERROR] There was uncaught errors: \n${error.stack}`);
    // process.exit(1) //mandatory (as per the Node.js docs)
});
process.on('unhandledRejection', error => {
    console.error(`[${DateTime.utc().toFormat(timeFormat)}][ERROR] Unhandled promise rejections: \n${error.stack}`);
});
process.on('shardError', error => {
    console.error(`[${DateTime.utc().toFormat(timeFormat)}][ERROR] A Websocket connection encountered errors: \n${error.stack}`);
});
// //--------END--------//