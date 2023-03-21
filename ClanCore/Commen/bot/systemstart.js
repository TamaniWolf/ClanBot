
const path = require('node:path');

module.exports = (fs) => {
    // Array of Packages/Dependencies.
    const botVersions = fs.readFileSync('./Database/updates/versions.json');
    let botVersionsJSON = JSON.parse(botVersions).update.dependencies;
    let packArray = botVersionsJSON.split(', ');
    // For loop throu the array.
    for (const pack of packArray) {
        // Checks if file exists and requires it if true.
        if (fs.existsSync(`./node_modules/${pack}`) === true) {
        } else {
            // If Above is false "emit" an self written Fatal error that some Dependencies are still not installed.
            process.exitCode = 5;
            let newPath = path.resolve('clanbot.js');
            let newDirPath = path.resolve(`node_modules/${pack}`);
            // console.error(`[${dateTimeFormat}]`);
            return process.stderr.write(`${newPath}\n\n\nFATAL ERROR: Dependencies not installed - Missing '${pack}': \nENOENT: no such file or directory, open '${pack}'.\n  errno: -2\n  code: 'ENOENT'\n  syscall: 'open'\n  path: '${newDirPath}\\'\n\n`).then(process.exit());
        };
    };
    // Database
    if (fs.existsSync('./Database/sqlite/calender/birthdays.sqlite') && fs.existsSync('./Database/sqlite/channelrole/channelRole.sqlite')
        && fs.existsSync('./Database/sqlite/config/config.sqlite') && fs.existsSync('./Database/sqlite/config/onOff.sqlite') 
        && fs.existsSync('./Database/sqlite/config/logs.sqlite') && fs.existsSync('./Database/sqlite/member/profile.sqlite')
        && fs.existsSync('./Database/sqlite/moderation/auditlog.sqlite') && fs.existsSync('./Database/sqlite/reaction/reaction.sqlite')
        && fs.existsSync('./Database/sqlite/twitch/twitch.sqlite')) {
        // Tables
        const tablesJS = require('../../Modules/database/create/tables')();
        tablesJS;
    } else {
        require('../../Modules/database/create/start.js')();
    };
};