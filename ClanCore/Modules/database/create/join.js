
require('dotenv').config();

module.exports = (guild) => {
    const { SQLiteTableData } = require('./data');
    SQLiteTableData.data(guild);
};
