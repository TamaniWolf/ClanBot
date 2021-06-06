const configonoff = require('../config/onoff.json');
const chalk = require('chalk');
const fs = require('fs');
var moment = require('moment');

if(configonoff.twitch === true){
  class MiniDb {
    constructor(name) {
      this.basePath = `${__dirname}/data/${name}`;

      if (!fs.existsSync(this.basePath)){
        console.log(chalk.cyan('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][MiniDb]', chalk.white('Create base directory:', this.basePath)));
        fs.mkdirSync(this.basePath);
      }
    }

    get(id) {
      const filePath = `${this.basePath}/${id}.json`;

      try {
        if (fs.existsSync(filePath)) {
          const raw = fs.readFileSync(filePath, {
            encoding: 'utf8',
            flag: 'r'
          });
          return JSON.parse(raw) || null;
        }
      } catch (e) {
        console.error(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][MiniDb]', chalk.white('Write error:', filePath, e)));
      }
      return null;
    }

    put(id, value) {
      const filePath = `${this.basePath}/${id}.json`;

      try {
        const raw = JSON.stringify(value);
        fs.writeFileSync(filePath, raw, {
          encoding: 'utf8',
          mode: '666',
          flag: 'w'
        });
        return true;
      } catch (e) {
        console.error(chalk.yellow('[' + moment.utc().format('MM/DD/YYYY-h:mm:ss-A') + '][MiniDb]', chalk.white('Write error:', filePath, e)));
        return false;
      }
    }
  }

  module.exports = MiniDb;
};
