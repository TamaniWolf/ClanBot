
const { Events } = require('discord.js');
const { DateTime } = require('luxon');
const fs = require('node:fs');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client){
        // Set Client (Bot) Activity.
        // client.user.setActivity('the Planning Office', {type: 'WATCHING'});
        console.log(`[${DateTime.utc().toFormat(timeFormat)}][Discord] logged in as ${client.user.tag}.`);
        global.globalclient = client;
        console.log(`[${DateTime.utc().toFormat(timeFormat)}] ▪ ▪ ▪  Module Start  ▪ ▪ ▪ `);
        
        ['system_handler'].forEach(systemHandler =>{
            require(`../../handlers_commen/${systemHandler}`)(fs);
        });
        let twitchready = false;
        global.globaltwitchready = twitchready;
        const handlerList = fs.readdirSync('./ClanCore/Commen/handlers_modules').filter(file=>file.endsWith('.js'))
        handlerList.forEach(modulesHandler =>{
            require(`../../handlers_modules/${modulesHandler}`)(fs);
        });

        console.log(`[Time] ${DateTime.utc().toFormat(timeFormat)} [UTC]`);
        console.log(`[NodeJS] ▪ ▪ ▪ ▪ ▪  DiscordBot Ready  ▪ ▪ ▪ ▪ ▪ `);
        twitchready = true;
        global.globaltwitchready = twitchready;
    },
};
/*
0   PLAYING     "Playing {name}"        
1   STREAMING   "Streaming {details}"   Only Twitch and YouTube urls work.
2   LISTENING   "Listening to {name}"   
3   WATCHING    "Watching {name}"       
4   CUSTOM      "{emoji} {name}"        
5   COMPETING   "Competing in {name}"   
*/