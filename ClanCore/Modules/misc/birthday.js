
require('dotenv').config();

module.exports = (client, message, args, Discord) => {
    const { DateTime } = require('luxon');
    const { Get, Set, DB } = require('../functions/sqlite/prepare');
    let firstDateTimeUTC = DateTime.utc();
    let firstDateTimeMonth = firstDateTimeUTC.toFormat('LL');
    let firstDateTimeDay = firstDateTimeUTC.toFormat('dd');
    // Min: 60000, Max: 31535940000
    let abc = DateTime.fromISO(`1970-${firstDateTimeMonth}-${firstDateTimeDay}T00:00:30.000Z`);
    let abc2 = DateTime.fromISO(`1970-${firstDateTimeMonth}-${firstDateTimeDay}T00:00:30.000Z`).plus({ minutes: 1 });
    // ...
    let dateTSMin = abc.ts;
    let dateTSMax = abc2.ts;
    // client area.
    globalclient.getConfig = DB.config().prepare("SELECT * FROM config WHERE BotID = ?");
    globalclient.getBirthday = DB.birthday().prepare("SELECT * FROM birthdays WHERE Month = ? AND Day = ? AND GuildID = ? AND Announcement = ? AND Announced = ?");
    globalclient.getBirthdayRange = DB.birthday().prepare(`SELECT * FROM birthdays WHERE Timestamp BETWEEN ${dateTSMin} AND ${dateTSMax} ORDER BY Timestamp ASC`);
    // 1y = 31536000000ms
    // 1m(31d) = 2678400000ms
    // 1m(30d) = 2592000000ms
    // 1m(29d) = 2505600000ms
    // 1m(28d) = 2419200000ms
    // 7d = 604800000ms
    // 24h = 86400000ms
    // 01h = 3600000ms
    // 30min = 1800000ms
    // 05min = 300000ms
    // 01min = 60000ms

    globalclient.on('ready', async () => {
        let dataDatabase;
        let dataConfig = globalclient.getConfig.get(globalclient.user.id);
        let guild = globalclient.guilds.cache.get(dataConfig.GuildID);
        let getBotConfigID = `${guild.id}-${guild.shardId}`;
        dataDatabase = Get.onOffForDatabase(getBotConfigID);
        if (dataDatabase.Birthdays === 'true') {
            setInterval(async() => {
                let dataBirthdayGet;
                let dataChannelBirthdayAnnouncement;
                let dataChannelBirthdayCommand;
                dataBirthdayGet = globalclient.getBirthdayRange.all();
                dataChannelBirthdayAnnouncement = Get.channelForBirthday(`${getBotConfigID}-announcement`);
                dataChannelBirthdayAnnouncement = Get.channelForBirthday(`${getBotConfigID}-command`);
                if (dataChannelBirthdayAnnouncement == null) return;
                if (dataChannelBirthdayCommand == null) {
                    dataChannelBirthdayCommand = dataChannelBirthdayAnnouncement;
                };
                // dataBirthdayGet = client.getBirthday.all(dateMonth, dateDay, getBotConfigID, 'true', 'false');
                if (dataBirthdayGet == null) return;
                // let guild = globalclient.guilds.cache.get(dataConfig.GuildID);
                let channel = guild.channels.cache.get(dataChannelBirthdayCommand.ChannelID);
                let dbt = [];
                dataBirthdayGet.forEach(dataBirthday => {
                    if (dataBirthday.Announcement === 'true' && dataBirthday.Announced === 'false') {
                        let member = guild.members.cache.get(dataBirthday.MemberID);
                        if (member == null) return;
                        dataBirthday.Announced = 'true';
                        Set.calenderForBirthdays(dataBirthday)
                        dbt.push(member);
                    };
                });
                let ebt = dbt.toString();
                if (ebt === undefined || ebt === null || ebt === '') {
                    return;
                } else if (dbt[1] != undefined || dbt[1] != null) {
                    let stringDbt = dbt.toString();
                    let replaceStringDbt = stringDbt.replace(/[,]/gi, `, `);
                    await channel.send({ content: `Please wish a happy birthday to our esteemed members: ${replaceStringDbt}` });
                } else if (dbt[1] === undefined || dbt[1] === null) {
                    let stringDbt = dbt.toString();
                    await channel.send({ content: `Please wish a happy birthday to ${stringDbt}` });
                };
            }, 60000);
        }
    });
};