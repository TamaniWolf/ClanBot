
require('dotenv').config();

module.exports = (guild) => {
    const { SQLiteTableData } = require('./startData');
    SQLiteTableData.data(guild);
};
