const configmain = require('../../config/config.json')
const lang = require('../.' + configmain.lang);
const chalk = require('chalk');
var moment = require('moment');

module.exports = () =>{
    //console.log(lang.prefix.discord, `Royalbot is ready; logged in as ${client.user.tag}.`)
    console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.clan, chalk.white(lang.log.ready)));
}
