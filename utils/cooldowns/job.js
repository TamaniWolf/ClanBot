const configmain = require('../../config/config.json');
const configonoff = require('../../config/onoff.json');
const lang = require('../.' + configmain.lang);
const chalk = require('chalk');
const Math = require('mathjs');
const fs = require('fs');

var moment = require('moment');
var timeNow = moment.utc().format('MM/DD/YYYY-hh:mm:ss-a');
require('dotenv').config();

module.exports = (client, message, args, Discord) => {
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
                                    let cooldownjobread = JSON.parse(data);
                                    let cooldownjob = cooldownjobread.cooldown.job;
                                    let jobmembername = cooldownjobread.member.displayName
                                    if (timeNow < cooldownjob) {
                                        cooldownjobread.cooldown.job = "01/01/2121-00:01:00-am";
                                        let datacooldownjob = JSON.stringify(cooldownjobread, null, 2);
                                        fs.writeFileSync(`./db/cooldown/${filename}`, datacooldownjob, function (err){
                                            if (err) throw err;
                                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, err));
                                        });
                                        profiledataread.job.jobworked = 5;
                                        let datacount = JSON.stringify(worktokenwrite, null, 2);
                                        fs.writeFileSync(profileData, datacount);
                                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, `Job Cooldown of '${jobmembername}' is resetted.`));
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
