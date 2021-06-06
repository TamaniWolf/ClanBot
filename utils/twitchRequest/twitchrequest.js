const configmain = require('../../config/config.json');
const configonoff = require('../../config/onoff.json');
const lang = require('../../lang/en_US.json');
const chalk = require('chalk');
const request = require('request');
const fs = require('fs');

var moment = require('moment');
var timeNow = moment.utc().format('MM/DD/YYYY-hh:mm:ss-a');
require('dotenv').config();

module.exports = (client, message, args, Discord) => {
    if(configonoff.twitch === true) {
        var requestinterval
        client.on('ready', () => {
            requestinterval = setInterval(() => {
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
                            fs.readFile(`./utils/${filename}`, enc, function(err, data){
                                if (err) 
                                    reject(err); 
                                else
                                    resolve(data);
                                    let requestread = JSON.parse(data);
                                    let requestcooldown = requestread.cooldown.twitch;
                                    if (timeNow < requestcooldown) {
                                        return;
                                    } else {
                                        const options = {
                                            url: 'https://id.twitch.tv/oauth2/token',
                                            json:true,
                                            body: {
                                                client_id: process.env(TWITCH_CLIENT_ID),
                                                client_secret: process.env(TWITCH_CLIENT_SECRET),
                                                grant_type: 'client_credentials'
                                            }
                                        };
                                    request.post(options, (err,res,body)=>{
                                            if(err){
                                                return console.log(err);
                                            }
                                        let timethen = moment.utc().add(50, 'days').format('MM/DD/YYYY-hh:mm:ss-a')
                                        requestread.twitch_oauth_token = res.body.access_token;
                                        requestread.twitch_oauth_cooldown = timethen;
                                        let datarequest = JSON.stringify(requestread, null, 2);
                                        fs.writeFileSync(`./utils/${filename}`, datarequest, function (err){
                                            if (err) throw err;
                                            console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, err));
                                        });
                                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, `New Token for Twitch created, next request on '${timethen}'.`));
                                    });
                                };
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
                    fs.readdirAsync('./utils').then(function (filenames){
                        filenames = filenames.filter(isDataFile);
                        return Promise.all(filenames.map(getFile));
                    })
                }catch(error){
                    console.log(error)
                }
            }, 86400000);
        })
    }
}
