
const fs = require('node:fs');
require('dotenv').config();

module.exports = (newVersionJSON) => {
    // Here goes the Update code if new Directorys/Files are needed.
    //

    // Replace the older version in versions.json with the newer version.
    let newVersion = newVersionJSON;
    let requestJsonRawData = fs.readFileSync(`./Database/updates/versions.json`);
    let requestJsonRead = JSON.parse(requestJsonRawData);
    requestJsonRead.updatebot = newVersion;
    let dataJsonRequest = JSON.stringify(requestJsonRead, null, 2);
    fs.writeFileSync(`./Database/updates/versions.json`, dataJsonRequest, function (err){
        if (err) throw err;
    });
};
