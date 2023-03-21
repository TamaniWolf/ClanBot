
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';

module.exports = (fs) => {
    // Filtering out .js files in to a string.
    const reactions_files = fs.readdirSync(`./ClanCore/Modules/reactions`).filter(file => file.endsWith('.js'));
    // Grabs files out of the string, one by one (for loop).
    for(const file of reactions_files){
        const reaction = require(`../../Modules/reactions/${file}`);
        // Calls files as an event once or on ON.
        if (reaction.call === 'once') {
            globalclient.once(reaction.name, (...args) => reaction.execute(...args));
        } else if (reaction.call === 'on') {
            globalclient.on(reaction.name, (...args) => reaction.execute(...args));
        } else if (!reaction.call) {
            continue;
        } else {
            console.error(`${reaction}\nUnknown Argument:\n Only \'once\' and \'on\' are passed to true.\n\n`);
            continue;
        };
    };

    console.log('[' + DateTime.utc().toFormat(timeFormat) + '][Discord]', 'Reaction Heandler loaded');
}