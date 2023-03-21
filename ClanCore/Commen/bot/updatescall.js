
module.exports = async (fs) => {
    let date_time = new Date();
    let day = ("0" + date_time.getDate()).slice(-2);let month = ("0" + (date_time.getMonth() + 1)).slice(-2);let year = date_time.getFullYear();
    let hours = ("0" + date_time.getHours()).slice(-2);let minutes = ("0" + date_time.getMinutes()).slice(-2);let seconds = ("0" + date_time.getSeconds()).slice(-2);
    let ampm;
    if (hours >= '12' && minutes >= '00' && seconds >= '01') {ampm = 'PM';} else if (hours >= '00' && minutes >= '00' && seconds >= '01') {ampm = 'AM';} else if (seconds = '00') {ampm = 'PM';};
    let dateTimeFormat = `${month}/${day}/${year}-${hours}:${minutes}:${seconds}-${ampm}`;
    // Try code, catch errors.
    try {
        setInterval(async function () {
            const { Octokit } = require('octokit');
            // Check if newer update file is existing and require if so.
            // The Update filenames are composed of the <namespace> and the <versionnumber>, if the update is for Bot version 4.1.2 then the file will look alike this "update040102.js".
            const octokit = new Octokit()
            const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}{?ref}', {
                owner: 'TamaniWolf',
                repo: 'ClanBot',
                mediaType: {
                    format: "raw",
                },
                path: 'Database/updates/versions.json',
                ref: 'master'
            })
            const botVersions = fs.readFileSync('./Database/updates/versions.json');
            let newVersionJSON = JSON.parse(data).update;
            let currentVersionJSON = JSON.parse(botVersions).update;
            if (newVersionJSON.id = currentVersionJSON.id) { } else
            if (newVersionJSON.id > currentVersionJSON.id) {
                const { Get } = require('../../Modules/functions/sqlite/prepare');
                let jsonInfo = require('../../../ClanSys/config/config.json').config;
                let dataMisc;
                dataMisc = Get.onOffForMisc(jsonInfo.guildid);
                if (dataMisc == null) {};
                let updateJS = `update${newVersionJSON.id}`;
                if (fs.existsSync(`./Database/updates/${updateJS}.js`) === true) {
                    require(`../../../Database/updates/${updateJS}.js`)(newVersionJSON);
                } else {
                    const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}{?ref}', {
                        owner: 'TamaniWolf',
                        repo: 'ClanBot',
                        mediaType: {
                            format: "raw",
                        },
                        path: `Database/updates/${updateJS}.js`,
                        ref: 'master'
                    })
                    let newVersionJS = data;
                    fs.appendFile(`./Database/updates/${updateJS}.js`, newVersionJS, function (err){
                        if (err) throw err;
                    });
                    if(dataMisc.AutoUpdate === 'true') {
                        setTimeout(function () {
                            if (fs.existsSync(`./Database/updates/${updateJS}.js`) === true) {
                                require(`../../../Database/updates/${updateJS}.js`)(newVersionJSON);
                            }
                        },1000);
                    } else {
                        setTimeout(async function () {
                            const { Get } = require('../../Modules/functions/sqlite/prepare');
                            let dataConfig = Get.botConfig(globalclient.user.id);
                            if (dataConfig == null) { return; };
                            let dataChannelLog = Get.channelForLogByGuild(dataConfig.GuildID);
                            if (dataChannelLog == null) { return; };
                            let guild = await globalclient.guilds.fetch(dataConfig.GuildID);
                            let channel = await guild.channels.fetch(dataChannelLog.ChannelID);
                            channel.send(`\`\`\`\nAn Update is ready!\n\nAuto-Updates are OFF. You will need to use the commands for this.\nAll command for the updates can be found with '/update info'.\n\`\`\``);
                        },1000);
                    };
                };
            };
            if (newVersionJSON.id < currentVersionJSON.id) {  };
        },60000 * 60 * 24);
    } catch (error) {
        console.error(`[${dateTimeFormat}]\n-Error at 'updatescall'\n ${error.stack}`);
    };
};