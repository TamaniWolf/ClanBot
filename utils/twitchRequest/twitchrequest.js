const request = require('request');
const lang = require('../../lang/en_US.json');
const configonoff = require('../../config/onoff.json');
const chalk = require('chalk');
const fs = require('fs');

var moment = require('moment');
var timeNow = moment.utc().format('MM/DD/YYYY-hh:mm:ss-a');
require('dotenv').config();

module.exports = (client, message, args, Discord) => {
    if(configonoff.twitch === true) {
        //const member = message.member
        // const profileData = `./db/cooldown/${member.id}.json`;
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
                                // moment.utc(member.joinedTimestamp).add(1, 'hours').format('MM/DD/YYYY-hh:mm:ss-a')
                                let requestcooldown = requestread.cooldown.twitch;
                                if (timeNow < requestcooldown) {
                                    //console.log('Cooldown is running.')
                                    return;
                                } else {
                                    // console.log('Time is over')
                                    
                                    const options = {
                                        url: 'https://id.twitch.tv/oauth2/token',
                                        json:true,
                                        body: {
                                            client_id: 'yvch0qyixp0dja4tcdrkb5mq3w5vpc',
                                            client_secret: 'zwxc2sy2rxrv7ilal21y3bxyu3yhk3',
                                            grant_type: 'client_credentials'
                                        }
                                    };
                                    
                                    request.post(options, (err,res,body)=>{
                                        if(err){
                                            return console.log(err);
                                        }
                                        //console.log('Status: ${res.statusCode}');
                                        //console.log(body.access_token);
                                        
                                    

                                    let timethen = moment.utc().add(50, 'days').format('MM/DD/YYYY-hh:mm:ss-a')
                                    let requestwrite = {
                                        twitchoauthtoken: res.body.access_token,
                                        cooldown: {
                                            twitch: timethen
                                        }
                                    };
                                    let datarequest = JSON.stringify(requestwrite, null, 2);
                                    fs.writeFileSync(`./utils/${filename}`, datarequest, function (err){
                                        if (err) throw err;
                                        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.annie, err));
                                    });

                                    // let gambletokenwrite = { 
                                    //     dbNumber: profiledataread.dbNumber,
                                    //     member: profiledataread.member,
                                    //     coins: profiledataread.coins,
                                    //     gambleToken: 5,
                                    //     gambleCooldown: profiledataread.gambleCooldown,
                                    //     hasjob: profiledataread.hasjob,
                                    //     jobs: profiledataread.jobs,
                                    //     inventory: profiledataread.inventory
                                    // };
                                    // let datacount = JSON.stringify(gambletokenwrite, null, 2);
                                    // fs.writeFileSync(profileData, datacount);
                                    console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.annie, `New Token for Twitch created, next request on '${timethen}'.`));
                                });
                            };
                        });
                    });
                };

                // utility function, return Promise
                function getFile(filename) {
                    return fs.readFileAsync(filename, 'utf8');
                }

                // example of using promised version of getFile
                // getFile(filename, 'utf8').then(function (data){
                // console.log(data);
                // });


                // a function specific to my project to filter out the files I need to read and process, you can pretty much ignore or write your own filter function.
                function isDataFile(filename) {
                    return (filename.split('.')[1] == 'json')
                }

                
                // start a blank fishes.json file
                // fs.writeFile('./fishes.json', '', function(){console.log('done')});


                // read all json files in the directory, filter out those needed to process, and using Promise.all to time when all async readFiles has completed.
                fs.readdirAsync('./utils').then(function (filenames){
                    filenames = filenames.filter(isDataFile);
                    //console.log(filenames);
                    return Promise.all(filenames.map(getFile));
                })
                // .then(function (files){
                //     var summaryFiles = [];
                //     files.forEach(function(file) {
                //     var json_file = JSON.parse(file);
                //     summaryFiles.push({ "name": json_file["name"],
                //                         "imageUrl": json_file["images"][0],
                //                         "id": json_file["id"]
                //                     });
                //     });
                //     fs.appendFile("./fishes.json", JSON.stringify(summaryFiles, null, 4), function(err) {
                //         if(err) {
                //         return console.log(err);
                //         }
                //         console.log("The file was appended!");
                //     });
                // });
            }catch(error){
                console.log(error)
            }
        // }, 1000);
        }, 86400000);
        })
    }
}
