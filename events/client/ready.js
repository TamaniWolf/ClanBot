const lang = require('../../lang/en_US.json');
const chalk = require('chalk');
var moment = require('moment');

module.exports = () =>{
    //console.log(lang.prefix.discord, `Royalbot is ready; logged in as ${client.user.tag}.`)
    console.log(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + ']' + lang.prefix.royal, chalk.white('Im ready!')));
}
