
const fs = require('node:fs');
require('dotenv').config();

module.exports = async (newVersionJSON) => {
    // DateTime
    let date_time = new Date();
    let day = ("0" + date_time.getDate()).slice(-2);let month = ("0" + (date_time.getMonth() + 1)).slice(-2);let year = date_time.getFullYear();
    let hours = ("0" + date_time.getHours()).slice(-2);let minutes = ("0" + date_time.getMinutes()).slice(-2);let seconds = ("0" + date_time.getSeconds()).slice(-2);
    let ampm;
    if (hours >= '12' && minutes >= '00' && seconds >= '01') {ampm = 'PM';} else if (hours >= '00' && minutes >= '00' && seconds >= '01') {ampm = 'AM';} else if (seconds = '00') {ampm = 'PM';};
    let dateTimeFormat = `${month}/${day}/${year}-${hours}:${minutes}:${seconds}-${ampm}`;
    // Start
    let guild = await client.guilds.fetch(globalSystem.info.guild.id);
    let channel = await guild.channels.fetch(globalSystem.info.channel.log.id);
    channel.send(`\`\`\`\n          - Update Progress status -\n\n                Update Started\n                Please wait...\n\`\`\``);
    // Here goes the Update code if new Directorys/Files/Codes are needed.
    //

    // Replace the older version in versions.json with the newer version.
    let newVersion = newVersionJSON;
    let requestJsonRawData = fs.readFileSync(`./Database/updates/versions.json`);
    let requestJsonRead = JSON.parse(requestJsonRawData);
    requestJsonRead.updatebot = newVersion;
    let dataJsonRequest = JSON.stringify(requestJsonRead, null, 2);
    fs.writeFileSync(`./Database/updates/versions.json`, dataJsonRequest, function (err){
        if (err) throw err;
    });
    // End
    let pm2 = globalSystem.info.bot.start.pm2;
    let script = globalSystem.info.bot.start.script;
    let other = globalSystem.info.bot.start.other;
    if (pm2 === 'true') {
        process.exitCode = 0;
        channel.send(`\`\`\`\n          - Update Progress status -\n\n               Update Finished\n          Restarting. Please wait...\n\`\`\``);
        return process.stderr.write(`UPDATE: restarting after update. Update finished at '${dateTimeFormat}'`).then(process.exit());
    } else if (script === 'true' || other === 'true') {
        channel.send(`\`\`\`\n          - Update Progress status -\n\n               Update Finished\n               Please restart.\n\`\`\``);
        return console.log(`UPDATE: please restart. Update finished at '${dateTimeFormat}'`);
    };
};
