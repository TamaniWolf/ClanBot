
// Require and set
const Discord = require('discord.js');
const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = Discord;
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();

module.exports = {
	cooldown: 5,
	admin: 'false',
	nsfw: 'false',
    data: new SlashCommandBuilder()
        .setName('birthday')
        .setDescription('Command for the Birthday Calendar.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.SendMessages)
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('List of subcommands and command infos.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('next')
                .setDescription('Next birthdays.')
        )
        .addSubcommandGroup(subcommandgroup =>
            subcommandgroup
                .setName('set')
                .setDescription('Setting birthday infos.')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('date')
                        .setDescription('Set Date.')
                        .addStringOption(option =>
                            option
                                .setName('date')
                                .setDescription('The date of the birthday. ( MMM-DD )')
                                .setRequired(true)
                        )
                        .addStringOption(option => 
                            option
                                .setName('timezone')
                                .setDescription('Timezone')
                                .setRequired(true)
                        )
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('announce')
                        .setDescription('Set if to announce.')
                        .addStringOption(option =>
                            option
                                .setName('announce')
                                .setDescription('To be Announce.')
                                .setRequired(true)
                                .addChoices(
                                    { name: 'Yes', value: 'true' },
                                    { name: 'No', value: 'false' },
                                )
                        )
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('timezone')
                        .setDescription('Set your Timezone.')
                        .addStringOption(option =>
                            option
                                .setName('timezone')
                                .setDescription('timezone.')
                                .setRequired(true)
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove your Birthday.')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('The User.')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('get')
                .setDescription('Get info to your or anothers birthday.')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('The User.')
                        .setRequired(true)
                )
        )
    ,
    async execute(interaction) {
        if (interaction != null || interaction.channel.id != null || interaction.guild.id != null) {
            // SQLite
            const { Get, Set, Del, DB } = require('../../../../ClanCore/Modules/functions/sqlite/prepare');
            // Month + Day + Timestamp DateTime
            let dateUTC = DateTime.utc();
            let dateMonth = dateUTC.toFormat('LL');
            let dateDay = dateUTC.toFormat('dd');
            let dateFromISOMinus7 = DateTime.fromISO(`1970-${dateMonth}-${dateDay}T00:00:00.000Z`).minus({ days: 7 });
            let dateFromISOPlus14 = DateTime.fromISO(`1970-${dateMonth}-${dateDay}T00:00:00.000Z`).plus({ days: 14 });
            let dateFromUTCMinus7 = dateFromISOMinus7.setZone('utc');
            let dateFromUTCPlus14 = dateFromISOPlus14.setZone('utc');
            let dateToMillisMinus7 = dateFromUTCMinus7.toMillis().toString();
            let dateToMillisPlus14 = dateFromUTCPlus14.toMillis().toString();
            // Get
            interaction.client.getAllBirthdays = DB.birthday().prepare(`SELECT * FROM birthdays WHERE Timestamp BETWEEN ${dateToMillisMinus7} AND ${dateToMillisPlus14} ORDER BY Timestamp ASC`);
            // Data Null
            let dataLang;
            let dataCommandMember;
            let dataChannelBirthday;
            let dataChannelBirthdayCmd;
            // Data Get
            let getGuildID = `${interaction.guild.id}`;
            let getBotConfigID = `${interaction.guild.id}-${interaction.guild.shardId}`;
            let getBirthdayID = `${getBotConfigID}-${interaction.user.id}`;
            dataLang = Get.botConfig(getBotConfigID);
            dataCommandMember = Get.onOffForCommandMember(getBotConfigID);
            dataChannelBirthday = Get.channelForBirthday(`${getBotConfigID}-announcement`);
            dataChannelBirthdayCmd = Get.channelForBirthday(`${getBotConfigID}-command`);
            // Data Check
            if (dataLang == null) { dataLang = { Lang: './Database/lang/en_US.json' }; };
            if (dataCommandMember == null) { dataCommandMember = { Birthday: 'true' }; };
            if (dataChannelBirthday == null) {  };
            if (dataChannelBirthdayCmd == null) { dataChannelBirthdayCmd = dataChannelBirthday; };
            let lang = require(`../../../.${dataLang.Lang}`);
            if (dataChannelBirthdayCmd == null) { await interaction.reply({ content: `${lang.default.birthday.nosetup}`, ephemeral: true }); };
            // Context

            if (dataCommandMember.Birthday === 'true') {
                if (interaction.channel.id === dataChannelBirthdayCmd.ChannelID) {
                    const configembed = new EmbedBuilder()
                    .setColor('Purple')
                    if(!interaction.options.getSubcommand()) {
                        configembed.setTitle('Birthdays')
                        await interaction.reply({embeds: [configembed]});
                    };
                    if(interaction.options.getSubcommand() === 'help') {
                        let permissions = interaction.member.permissions;
                        if (permissions.has(PermissionsBitField.Flags.ViewAuditLog) || permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                            // \nbirthday set <date|announce> <Month-Day|yes|no>
                            configembed.setTitle(`${lang.default.birthday.helptitle}`)
                            .addFields([
                                { name: `${lang.default.birthday.helpfiled1}`, value: `${lang.default.birthday.helpvalue1}`, inline: false },
                                { name: `${lang.default.birthday.helpfiled2}`, value: `${lang.default.birthday.helpvalue2}`, inline: false },
                            ]);
                            await interaction.reply({embeds: [configembed]});
                        } else {
                            // \nbirthday set <date|announce> <Month-Day|yes|no>
                            configembed.setTitle(`${lang.default.birthday.helptitle}`)
                            .addFields([
                                { name: `${lang.default.birthday.helpfiled1}`, value: `${lang.default.birthday.helpvalue1}`, inline: false },
                            ]);
                            await interaction.reply({embeds: [configembed]});
                        };
                    };
                    if (interaction.options.getSubcommand() === 'next') {
                        // Getting Database
                        let dataBirthdayToday;
                        dataBirthdayToday = interaction.client.getAllBirthdays.all();
                        // Return if Data is 'undefined' or 'null'.
                        if (dataBirthdayToday === undefined || dataBirthdayToday === null) {

                            dataBirthdayToday = { BirthdayID: `${getBotConfigID}-200000000000000000` , GuildID: `200000000000000000ㅤ`, MemberID: `200000000000000000`, Date: `1970-01-01T00:00:00.000Z`, Timestamp: `0`, Month: `01`, Day: `01`, DatePublic: `false`, Announce: `false`, Age: `false` }
                        };

                        let dbt = [];
                        dataBirthdayToday.forEach(obj => {
                            let guild = interaction.client.guilds.cache.get(getGuildID);
                            let memberObj = guild.members.cache.get(obj.MemberID);
                            dbt.push(`● \`${obj.Date}\` **${memberObj.user.username}**#${memberObj.user.discriminator}`)
                        });
                        let stringDbt = dbt.toString();
                        if (stringDbt === '' || stringDbt === undefined || stringDbt == null) {
                            await interaction.reply(`${lang.default.birthday.nobdayahead}`)
                        };
                        let replaceStringDbt = stringDbt.replace(/[,]/gi, `\n`);
                        await interaction.reply(`${lang.default.birthday.bdayahead}\n\n${replaceStringDbt}`);
                    };
                    // Add Birthday.
                    if (interaction.options.getSubcommandGroup() === 'set') {
                        if (interaction.options.getSubcommand() === 'date') {
                            const stringSetDateDate = interaction.options.getString('date');
                            const stringSetDateTimezone = interaction.options.getString('timezone');
                            let splitMonthDay = stringSetDateDate.split(/-+/);
                            let monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            let monthsNumber = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
                            let days;
                            let smd = splitMonthDay;
                            if (smd[0] === 'Jan' || smd[0] === 'Mar' || smd[0] === 'May' || smd[0] === 'Jul' || smd[0] === 'Aug' || smd[0] === 'Oct' || smd[0] === 'Dec') {
                                days = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
                            } else if (smd[0] === 'Apr' || smd[0] === 'Jun' || smd[0] === 'Sep' || smd[0] === 'Nov') {
                                days = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
                            } else if (smd[0] === 'Feb') {
                                days = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
                            };
                            let resultMonthName = monthsName.filter(checkMonthName);
                            function checkMonthName(month) {
                                return month == splitMonthDay[0];
                            };
                            let stringMonthName = resultMonthName.toString();
                            if (stringSetDateDate.startsWith(`${stringMonthName}`) && stringMonthName != '') {
                                let resultMonthNumber = monthsNumber.filter(function(e, i) {
                                    return monthsName[i] == stringMonthName;
                                })
                                let stringMonthNumber;
                                stringMonthNumber = resultMonthNumber.toString();
                                if (stringMonthNumber.length != '2') {
                                    stringMonthNumber = `0${stringMonthNumber}`;
                                }
                                let intDay = parseInt(splitMonthDay[1]);
                                let resultDay = days.filter(checkDay);
                                function checkDay(day) {
                                    return day == intDay;
                                };
                                let stringDay;
                                stringDay = resultDay.toString();
                                if (stringDay === ''/* || stringDay.length != '1'*/) {
                                    await interaction.reply({ content: `${lang.default.birthday.notaday}` })
                                } else
                                if (stringDay.length != '2') {
                                    stringDay = `0${stringDay}`;
                                }
                                let abc;
                                abc = DateTime.fromISO(`1970-${stringMonthNumber}-${stringDay}T00:00:00.000`, { zone: `${stringSetDateTimezone}`});
                                if (abc.invalid != null || abc.invalid != undefined) {
                                    abc = DateTime.fromISO(`1970-${stringMonthNumber}-${stringDay}T00:00:00.000`, { zone: `UTC`});
                                }
                                let timestamp = abc.ts.toString();
                                if (stringSetDateDate.endsWith(stringDay) && stringDay != '') {
                                    let set;
                                    let dataBirthday;
                                    dataBirthday = Get.calenderForBirthdays(`${getBirthdayID}`);
                                    if (dataBirthday === undefined || dataBirthday === null) {
                                        dataBirthday = { BirthdayID: `${getBirthdayID}`, GuildID: getGuildID, MemberID: interaction.user.id, Date: stringSetDateDate, Timestamp: timestamp, Month: stringMonthNumber, Day: stringDay, TimeZone: stringSetDateTimezone, DatePublic: 'true', Announcement: 'true', Announced: 'false' };
                                        set = `:white_check_mark: ${lang.default.birthday.bdayadded}`;
                                    } else if (dataBirthday.BirthdayID === `${getBirthdayID}`) {
                                        dataBirthday = { BirthdayID: dataBirthday.BirthdayID, GuildID: dataBirthday.GuildID, MemberID: dataBirthday.MemberID, Date: stringSetDateDate, Timestamp: timestamp, Month: stringMonthNumber, Day: stringDay, TimeZone: stringSetDateTimezone, DatePublic: dataBirthday.DatePublic, Announcement: dataBirthday.Announcement, Announced: dataBirthday.Announced };
                                        set = `:white_check_mark: ${lang.default.birthday.bdayupdated}`;
                                    };
                                    Set.calenderForBirthdays(dataBirthday);
                                    await interaction.reply(set);
                                };
                            } else if (stringMonthName === '') {
                                await interaction.reply({ content: 'Nope.', ephemeral: true })
                            };
                        } else if (interaction.options.getSubcommand() === 'announce') {
                            const stringSetAnnounce = interaction.options.getString('announce');
                            if (stringSetAnnounce === 'true') {
                                let announceYes;
                                let dataBirthday;
                                dataBirthday = Get.calenderForBirthdays(`${getBirthdayID}`);
                                if (dataBirthday === undefined || dataBirthday === null) {
                                    return;
                                };
                                if (dataBirthday.Announce === 'false') {
                                    dataBirthday = { BirthdayID: dataBirthday.BirthdayID, GuildID: dataBirthday.GuildID, MemberID: dataBirthday.MemberID, Date: dataBirthday.Date, Timestamp: dataBirthday.Timestamp, Month: dataBirthday.Month, Day: dataBirthday.Day, TimeZone: dataBirthday.TimeZone, DatePublic: dataBirthday.DatePublic, Announce: 'true', Age: dataBirthday.Age };
                                    announceYes = `:white_check_mark: ${lang.default.birthday.announceyes}`;
                                } else if (dataBirthday.Announce === 'true') {
                                    announceYes = `:x: ${lang.default.birthday.announceis}`;
                                };
                                Set.calenderForBirthdays(dataBirthday);
                                await interaction.reply(announceYes);
                            } else if (stringSetAnnounce === 'false') {
                                let announceNo;
                                let dataBirthday;
                                dataBirthday = Get.calenderForBirthdays(`${getBirthdayID}`);
                                if (dataBirthday === undefined || dataBirthday === null) {
                                    return;
                                };
                                if (dataBirthday.Announce === 'false') {
                                    dataBirthday = { BirthdayID: dataBirthday.BirthdayID, GuildID: dataBirthday.GuildID, MemberID: dataBirthday.MemberID, Date: dataBirthday.Date, Timestamp: dataBirthday.Timestamp, Month: dataBirthday.Month, Day: dataBirthday.Day, TimeZone: dataBirthday.TimeZone, DatePublic: dataBirthday.DatePublic, Announce: 'false', Age: dataBirthday.Age };
                                    announceNo = `:white_check_mark: ${lang.default.birthday.noannounceyes}`;
                                } else if (dataBirthday.Announce === 'true') {
                                    announceNo = `:x: ${lang.default.birthday.noannounceis}`;
                                };
                                Set.calenderForBirthdays(dataBirthday);
                                await interaction.reply(announceNo);
                            };
                        } else if (interaction.options.getSubcommand() === 'timezone') {
                            const stringSetTimezone = interaction.options.getString('timezone');
                            let set;
                            let dataBirthday;
                            dataBirthday = Get.calenderForBirthdays(`${getBirthdayID}`);
                            if (dataBirthday === undefined || dataBirthday === null) {
                                set = `:x: ${lang.default.birthday.bdaynotset}`;
                            } else if (dataBirthday.BirthdayID === `${getBirthdayID}`) {
                                let abc;
                                abc = DateTime.fromISO(`1970-${dataBirthday.Month}-${dataBirthday.Day}T00:00:00.000`, { zone: `${stringSetTimezone}`});
                                if (abc.invalid != null || abc.invalid != undefined) {
                                    abc = DateTime.fromISO(`1970-${stringMonthNumber}-${stringDay}T00:00:00.000`, { zone: `UTC`});
                                }
                                let timestamp = abc.ts.toString();
                                dataBirthday = { BirthdayID: dataBirthday.BirthdayID, GuildID: dataBirthday.GuildID, MemberID: dataBirthday.MemberID, Date: dataBirthday.Date, Timestamp: timestamp, Month: dataBirthday.Month, Day: dataBirthday.Day, TimeZone: stringSetTimezone, DatePublic: dataBirthday.DatePublic, Announcement: dataBirthday.Announcement, Announced: dataBirthday.Announced };
                                set = `:white_check_mark: ${lang.default.birthday.bdayupdated}\n\` ${dataBirthday.Date} \` \` ${dataBirthday.TimeZone} \``;
                                Set.calenderForBirthdays(dataBirthday);
                            };
                            await interaction.reply(set);
                        };
                    };
                    // Remove Birthday.
                    if (interaction.options.getSubcommand() === 'remove') {
                        let permissions = interaction.member.permissions;
                        if (!permissions.has(Discord.PermissionsBitField.Flags.ViewAuditLog) || !permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
                            let remove;
                            let dataBirthday;
                            dataBirthday = Get.calenderForBirthdays(`${getBirthdayID}`);
                            if (dataBirthday == undefined || dataBirthday == null) {
                                remove = `:x: ${lang.default.birthday.bdaynotset}`;
                            } else {
                                remove = `:white_check_mark: ${lang.default.birthday.bdayremoved}`;
                            };
                            Del.calenderForBirthdays(dataBirthday.BirthdayID);
                            await interaction.reply(remove);
                        } else {
                            const stringGetUser = interaction.options.getUser('user');

                            if (stringGetUser === undefined || stringGetUser === null) {
                                let remove;
                                let dataBirthday;
                                dataBirthday = Get.calenderForBirthdays(`${getBirthdayID}`);
                                if (dataBirthday == undefined || dataBirthday == null) {
                                    remove = `:x: ${lang.default.birthday.bdaynotset}`;
                                } else {
                                    remove = `:white_check_mark: ${lang.default.birthday.bdayremoved}`;
                                };
                                Del.calenderForBirthdays(dataBirthday.BirthdayID);
                                await interaction.reply(remove);
                            } else if (stringGetUser) {
                                let remove2;
                                let dataBirthday2;
                                dataBirthday2 = Get.calenderForBirthdays(`${getBirthdayID}`);
                                if (dataBirthday2 == undefined || dataBirthday2 == null) {
                                    remove2 = `:x: ${lang.default.birthday.membernobday}`;
                                } else {
                                    remove2 = `:white_check_mark: ${lang.default.birthday.abdayremoved}`;
                                };
                                Del.calenderForBirthdays(dataBirthday2.BirthdayID);
                                await interaction.reply(remove2);
                            };
                        };
                    };
                    // Birthday info
                    if (interaction.options.getSubcommand() === 'get') {
                        const stringGetUser = interaction.options.getUser('user');
                        let guild = interaction.client.guilds.cache.get(getGuildID);
                        let member = guild.members.cache.get(stringGetUser.id);
                        if (member === undefined || member === null) {
                            return;
                        };
                        let info;
                        let dataBirthday;
                        dataBirthday = Get.calenderForBirthdays(`${getBirthdayID}`);
                        if (member.nickname === null || member.nickname === undefined) {
                            if (dataBirthday === undefined || dataBirthday === null) {
                                info = `:x: ${lang.default.birthday.nobdayinfo}`;
                            } else {
                                info = `**${member.user.username}**#${member.user.discriminator}:\` ${dataBirthday.Date} \``;
                            };
                        } else if (member.nickname != null || member.nickname != undefined) {
                            if (dataBirthday === undefined || dataBirthday === null) {
                                info = `:x: ${lang.default.birthday.nobdayinfo}`;
                            } else {
                                info = `**${member.nickname}** (${member.user.username}#${member.user.discriminator}):\` ${dataBirthday.Date} \``;
                            };
                        };
                        await interaction.reply(info);
                    };
                    // Error Messages
                } else {
                    await interaction.reply({ content: `${lang.error.wrongchnannel} <#${dataChannelBirthdayCmd.ChannelID}>`, ephemeral: true });
                };
            } else {
                await interaction.reply({ content: `${lang.error.cmdoff}`, ephemeral: true });
            };
        } else {
            console.log(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'birthday\' returned \'null / undefined\'.`);
        };
    },
};