const configmain = require('../../config/config.json');
const configonoff = require('../../config/onoff.json');
const lang = require('../.' + configmain.lang);
const chalk = require('chalk');
const Math = require('mathjs');
const fs = require('fs');

var moment = require('moment');
// const zeroPad = (num, places) => String(num).padStart(places, '0')
var timeNow = moment.utc().format('MM/DD/YYYY-hh:mm:ss-a');
const zeroPad = (num, places) => String(num).padStart(places, '0')
require('dotenv').config();

console.log('1');
module.exports = (client, message, args, Discord) => {
    //const member = message.member
    // const profileData = `./db/cooldown/${member.id}.json`;
    var cooldowninterval
    client.on('ready', () => {
        cooldowninterval = setInterval(() => {
            try {
                // make Promise version of fs.readdir()
                fs.readdirAsync = function(dirname) {
                    return new Promise(function(resolve, reject) {
                        fs.readdir(dirname, function(err, filenames){
                            if (err) 
                                reject(err); 
                            else 
                                resolve(filenames);
                        });
                    });
                };
                // make Promise version of fs.readFile()
                fs.readFileAsync = function(filename, enc) {
                    return new Promise(function(resolve, reject) {
                        fs.readFile(`./db/cooldown/${filename}`, enc, function(err, data){
                            const profileData = `./db/economy/profiles/${filename}`;
                            let rawdata = fs.readFileSync(profileData);
                            let profiledataread = JSON.parse(rawdata);
                            if (err) 
                                reject(err); 
                            else
                                resolve(data);
                            switch (1) {
                                case 1:
                                    let cooldownnewjoinread = JSON.parse(data);
                                    let cooldownnewjoin = cooldownnewjoinread.cooldown.job;
                                    let newjoinmembername = cooldownnewjoinread.member.displayName
                                    if (timeNow < cooldownnewjoin) {
                                        let cooldownnewjoinwrite = {
                                            dbNumber: cooldownnewjoinread.dbNumber,
                                            version: cooldownnewjoinread.version,
                                            member: cooldownnewjoinread.member,
                                            cooldown: {
                                                newjoin: "01/01/2121-00:01:00-am",
                                                gamble: cooldownnewjoinread.cooldown.gamble,
                                                job: cooldownnewjoinread.cooldown.job,
                                            }
                                        };
                                        let datacooldownnewjoin = JSON.stringify(cooldownnewjoinwrite, null, 2);
                                        fs.writeFileSync(`./db/cooldown/${filename}`, datacooldownnewjoin, function (err){
                                            if (err) throw err;
                                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, err));
                                        });
                                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, `NewJoin Cooldown of '${newjoinmembername}' is resetted.`));
                                    } else {
                                        return;
                                    };
                            }
                        });
                    });
                };
                // utility function, return Promise
                function getFile(filename) {
                    return fs.readFileAsync(filename, 'utf8');
                }
                // a function specific to my project to filter out the files I need to read and process, you can pretty much ignore or write your own filter function.
                function isDataFile(filename) {
                    return (filename.split('.')[1] == 'json')
                }
                // read all json files in the directory, filter out those needed to process, and using Promise.all to time when all async readFiles has completed.
                fs.readdirAsync('./db/cooldown').then(function (filenames){
                    filenames = filenames.filter(isDataFile);
                    //console.log(filenames);
                    return Promise.all(filenames.map(getFile));
                })
            }catch(error){
                console.log(error)
            }
        }, 10000);
    })
}
