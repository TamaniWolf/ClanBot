
const { readdirSync } = require('fs');
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';

module.exports = (client) =>{
    // Grabs folders and files out of the strings, one by one (for loop).
    const eventFolders = readdirSync('./ClanCore/Commen/events');
    for (const folder of eventFolders) {
        const eventFiles = readdirSync(`./ClanCore/Commen/events/${folder}`).filter(files => files.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);
            // Calls files as an event once or on ON.
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            };
        };
    };
    console.log('[' + DateTime.utc().toFormat(timeFormat) + '][Discord]', 'Event Heandler loaded');
};