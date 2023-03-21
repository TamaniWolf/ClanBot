
require('dotenv').config();

module.exports = () => {
    globalclient.guilds.cache.each(guild => {
        const { SQLiteTableData } = require('./data');
        SQLiteTableData.data(guild);
    });
};
