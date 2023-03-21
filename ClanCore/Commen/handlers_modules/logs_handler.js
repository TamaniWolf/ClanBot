
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';

module.exports = (fs) =>{
    // Filtering out .js files in to a string.
    const logs_files = fs.readdirSync(`./ClanCore/Modules/logs`).filter(file => file.endsWith('.js'));
    // Grabs files out of the string, one by one (for loop).
    for(const file of logs_files){
        const log = require(`../../Modules/logs/${file}`);
        // Calls files as an event once or on ON.
        if (log.call === 'once') {
            globalclient.once(log.name, (...args) => log.execute(...args));
        } else if (log.call === 'on') {
            globalclient.on(log.name, (...args) => log.execute(...args));
        } else if (!log.call) {
            continue;
        } else {
            console.error(`${log}\nUnknown Argument:\n Only \'once\' and \'on\' are passed to true.\n\n`);
            continue;
        };
    };

    console.log('[' + DateTime.utc().toFormat(timeFormat) + '][Discord]', 'Logs Heandler loaded');
};