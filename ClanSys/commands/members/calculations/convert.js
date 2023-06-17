
// Require and set
const Discord = require('discord.js');
const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = Discord;
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();
const math = require('mathjs');

module.exports = {
	cooldown: 5,
	admin: 'false',
	nsfw: 'false',
    data: new SlashCommandBuilder()
        .setName('convert')
        .setDescription('convert units to other units.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.SendMessages)
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Displaying an help text.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('length')
                .setDescription('length')
                .addStringOption(option =>
                    option
                        .setName('from')
                        .setDescription('From Unit')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Meter', value: 'meter' },
                            { name: 'Kilometer', value: 'kilometer' },
                            { name: 'Centimeter', value: 'centimeter' },
                            { name: 'Millimeter', value: 'millimeter' },
                            { name: 'Light Years', value: 'lightyears' },
                            { name: 'Inches', value: 'inches' },
                            { name: 'Feet', value: 'feet' },
                            { name: 'Yards', value: 'yards' },
                            { name: 'Miles', value: 'miles' },
                            { name: 'Nautical Miles', value: 'nauticalmiles' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('to')
                        .setDescription('To Unit')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Meter', value: 'meter' },
                            { name: 'Kilometer', value: 'kilometer' },
                            { name: 'Centimeter', value: 'centimeter' },
                            { name: 'Millimeter', value: 'millimeter' },
                            { name: 'Lightyears', value: 'lightyears' },
                            { name: 'Inches', value: 'inches' },
                            { name: 'Feet', value: 'feet' },
                            { name: 'Yards', value: 'yards' },
                            { name: 'Miles', value: 'miles' },
                            { name: 'Nautical Miles', value: 'nauticalmiles' },
                        )
                )
                .addNumberOption(option =>
                    option
                        .setName('value')
                        .setDescription('value')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('temperature')
                .setDescription('Temperature')
                .addStringOption(option =>
                    option
                        .setName('from')
                        .setDescription('From Unit')
                        .setRequired(true)
                        .addChoices(
                            { name: 'K | Kelvin', value: 'kelvin' },
                            { name: '°C | Celsius', value: 'celsius' },
                            { name: '°F | Fahrenheit', value: 'fahrenheit' },
                            { name: '°R | Rankine', value: 'rankine' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('to')
                        .setDescription('To Unit')
                        .setRequired(true)
                        .addChoices(
                            { name: 'K | Kelvin', value: 'kelvin' },
                            { name: '°C | Celsius', value: 'celsius' },
                            { name: '°F | Fahrenheit', value: 'fahrenheit' },
                            { name: '°R | Rankine', value: 'rankine' },
                        )
                )
                .addNumberOption(option =>
                    option
                        .setName('value')
                        .setDescription('value')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('area')
                .setDescription('Area')
                .addStringOption(option =>
                    option
                        .setName('from')
                        .setDescription('From')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Square Meter', value: 'squaremeters' },
                            { name: 'Square Kilometer', value: 'squarekilometers' },
                            { name: 'Square Centimeter', value: 'squarecentimeters' },
                            { name: 'Square Millimeter', value: 'squaremillimeters' },
                            { name: 'Square Inches', value: 'squareinches' },
                            { name: 'Square Foots', value: 'squarefoots' },
                            { name: 'Square Yards', value: 'squareyards' },
                            { name: 'Square Miles', value: 'squaremiles' },
                            { name: 'Acres', value: 'acres' },
                            { name: 'Hectares', value: 'hectares' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('to')
                        .setDescription('To')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Square Meter', value: 'squaremeters' },
                            { name: 'Square Kilometer', value: 'squarekilometers' },
                            { name: 'Square Centimeter', value: 'squarecentimeters' },
                            { name: 'Square Millimeter', value: 'squaremillimeters' },
                            { name: 'Square Inches', value: 'squareinches' },
                            { name: 'Square Foots', value: 'squarefoots' },
                            { name: 'Square Yards', value: 'squareyards' },
                            { name: 'Square Miles', value: 'squaremiles' },
                            { name: 'Acres', value: 'acres' },
                            { name: 'Hectares', value: 'hectares' },
                        )
                )
                .addNumberOption(option =>
                    option
                        .setName('value')
                        .setDescription('value')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('volume')
                .setDescription('Volume (Solid, Gas, Fluids)')
                .addStringOption(option =>
                    option
                        .setName('from')
                        .setDescription('From Unit')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Liter', value: 'liter' },
                            { name: 'Milliliter', value: 'milliliter' },
                            { name: 'Pints', value: 'pints' },
                            { name: 'Cups', value: 'cups' },
                            { name: 'Tablespoons', value: 'tablespoons' },
                            { name: 'Teaspoons', value: 'teaspoons' },
                            { name: 'Gallons', value: 'gallons'},
                            { name: 'Barrels', value: 'barrels' },
                            { name: 'Fluid Ounces', value: 'fluidounces' },
                            { name: 'Cubic Meters', value: 'cubicmeters' },
                            { name: 'Cubic Kilometers', value: 'cubickilometers' },
                            { name: 'Cubic Centimeters', value: 'cubiccentimeters' },
                            { name: 'Cubic Millimeters', value: 'cubicmillimeters' },
                            { name: 'Cubic Inches', value: 'cubicinches' },
                            { name: 'Cubic Foots', value: 'cubicfoots' },
                            { name: 'Cubic Yards', value: 'cubicyards' },
                            { name: 'Cubic Miles', value: 'cubicmiles' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('to')
                        .setDescription('To Unit')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Liter', value: 'liter' },
                            { name: 'Milliliter', value: 'milliliter' },
                            { name: 'Pints', value: 'pints' },
                            { name: 'Cups', value: 'cups' },
                            { name: 'Tablespoons', value: 'tablespoons' },
                            { name: 'Teaspoons', value: 'teaspoons' },
                            { name: 'Gallons', value: 'gallons'},
                            { name: 'Barrels', value: 'barrels' },
                            { name: 'Fluid Ounces', value: 'fluidounces' },
                            { name: 'Cubic Meters', value: 'cubicmeters' },
                            { name: 'Cubic Kilometers', value: 'cubickilometers' },
                            { name: 'Cubic Centimeters', value: 'cubiccentimeters' },
                            { name: 'Cubic Millimeters', value: 'cubicmillimeters' },
                            { name: 'Cubic Inches', value: 'cubicinches' },
                            { name: 'Cubic Foots', value: 'cubicfoots' },
                            { name: 'Cubic Yards', value: 'cubicyards' },
                            { name: 'Cubic Miles', value: 'cubicmiles' },
                        )
                )
                .addNumberOption(option =>
                    option
                        .setName('value')
                        .setDescription('Value')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('weight')
                .setDescription('Weight')
                .addStringOption(option =>
                    option
                        .setName('from')
                        .setDescription('From')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Grams', value: 'grams' },
                            { name: 'Kilograms', value: 'kilograms' },
                            { name: 'Milligrams', value: 'milligrams' },
                            { name: 'Metric Tons', value: 'metrictons' },
                            { name: 'Imperial Tons', value: 'imperialtons' },
                            { name: 'Pound/lbs', value: 'poundslbs' },
                            { name: 'Kilopounds', value: 'kilopounds' },
                            { name: 'Ounces', value: 'ounces' },
                            { name: 'Quarters', value: 'quarters' },
                            { name: 'Grains', value: 'grains' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('to')
                        .setDescription('To')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Grams', value: 'grams' },
                            { name: 'Kilograms', value: 'kilograms' },
                            { name: 'Milligrams', value: 'milligrams' },
                            { name: 'Metric Tons', value: 'metrictons' },
                            { name: 'Imperial Tons', value: 'imperialtons' },
                            { name: 'Pounds/lbs', value: 'poundslbs' },
                            { name: 'Kilopounds', value: 'kilopounds' },
                            { name: 'Ounces', value: 'ounces' },
                            { name: 'Quarters', value: 'quarters' },
                            { name: 'Grains', value: 'grains' },
                        )
                )
                .addNumberOption(option =>
                    option
                        .setName('value')
                        .setDescription('Value')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('time')
                .setDescription('Time')
                .addStringOption(option =>
                    option
                        .setName('from')
                        .setDescription('From')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Minutes', value: 'minutes' },
                            { name: 'Hours', value: 'hours' },
                            { name: 'Seconds', value: 'seconds' },
                            { name: 'Milliseconds', value: 'milliseconds' },
                            { name: 'Days', value: 'days' },
                            { name: 'Months', value: 'months' },
                            { name: 'Weeks', value: 'weeks' },
                            { name: 'Years', value: 'years' },
                            { name: 'Decades', value: 'decades' },
                            { name: 'Centurys', value: 'centurys' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('to')
                        .setDescription('To')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Minutes', value: 'minutes' },
                            { name: 'Hours', value: 'hours' },
                            { name: 'Seconds', value: 'seconds' },
                            { name: 'Milliseconds', value: 'milliseconds' },
                            { name: 'Days', value: 'days' },
                            { name: 'Months', value: 'months' },
                            { name: 'Weeks', value: 'weeks' },
                            { name: 'Years', value: 'years' },
                            { name: 'Decades', value: 'decades' },
                            { name: 'Centurys', value: 'centurys' },
                        )
                )
                .addNumberOption(option =>
                    option
                        .setName('value')
                        .setDescription('Value')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('number')
                .setDescription('Convert the Number in to Short and Long Scale.')
                .addStringOption(option =>
                    option
                        .setName('from')
                        .setDescription('From')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Short to Long Scale', value: 'shortscale' },
                            { name: 'Long to Short Scale', value: 'longscale' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('value')
                        .setDescription('Value')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Million', value: 'million' },
                            { name: 'Billion', value: 'billion' },
                            { name: 'Trillion', value: 'trillion' },
                            { name: 'Quadrillion', value: 'quadrillion' },
                            { name: 'Quintilion', value: 'quintilion' },
                            { name: 'Sextillion', value: 'sextillion' },
                            { name: 'Septillion', value: 'septillion' },
                            { name: 'Octillion', value: 'octillion' },
                            { name: 'Nonillion', value: 'nonillion' },
                            { name: 'Decillion', value: 'decillion' },
                            { name: 'Undecillion', value: 'undecillion' },
                            { name: 'Milliard', value: 'milliard' },
                            { name: 'Billiard', value: 'billiard' },
                            { name: 'Trilliard', value: 'trilliard' },
                            { name: 'Quadrilliard', value: 'quadrilliard' },
                            { name: 'Quintilliard', value: 'quintilliard' },
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('speed')
                .setDescription('Convert Speed Units.')
                .addStringOption(option =>
                    option
                        .setName('from')
                        .setDescription('From')
                        .setRequired(true)
                        .addChoices(
                            { name: 'm/s', value: 'meterpersecond' },
                            { name: 'km/h', value: 'kilometerperhour' },
                            { name: 'mph', value: 'mileperhour' },
                            { name: 'knot', value: 'knot' },
                            { name: 'ft/s', value: 'footpersecond' },
                            // { name: 'Mach', value: 'mach' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('to')
                        .setDescription('To')
                        .setRequired(true)
                        .addChoices(
                            { name: 'm/s', value: 'meterpersecond' },
                            { name: 'km/h', value: 'kilometerperhour' },
                            { name: 'mph', value: 'mileperhour' },
                            { name: 'knot', value: 'knot' },
                            { name: 'ft/s', value: 'footpersecond' },
                            // { name: 'Mach', value: 'mach' },
                        )
                )
                .addNumberOption(option =>
                    option
                        .setName('value')
                        .setDescription('Value')
                        .setRequired(true)
                )
        )
    ,
    async execute(interaction) {
        if (interaction != null || interaction.channel.id != null) {
            // SQLite
            const { Get } = require('../../../../ClanCore/Modules/functions/sqlite/prepare');
            // Data Null
            let dataLang;
            let dataCommandMember;
            // Data Get
            let getBotConfigID = `${interaction.guild.id}-${interaction.guild.shardId}`;
            dataLang = Get.botConfig(getBotConfigID);
            dataCommandMember = Get.onOffForCommandMember(getBotConfigID);
            // Data Check
            if (dataLang == null) { dataLang = { Lang: './Database/lang/en_US.json' }; };
            if (dataCommandMember == null) { dataCommandMember = { Convert: 'true' }; };
            // Context

            let lang = require(`../../../.${dataLang.Lang}`);
            if (dataCommandMember.Convert === 'true') {
                let convert = lang.default.convert;
                // Help
                if (interaction.options.getSubcommand() === 'help') {
                    let help;
                    help = `\`\`\`\n${convert.help}\n\`\`\``;
                    let stringHelp = help;

                    await interaction.reply({ content: stringHelp });
                };
                // const { Length, Temperature, Area, Volume, Weight, Time, Number } = require('../../../../ClanCore/Modules/functions/convert/unitConvert');
                // Length
                if (interaction.options.getSubcommand() === 'length') {
                    const stringGetValue = interaction.options.getNumber('value');
                    const stringGetFromUnit = interaction.options.getString('from');
                    const stringGetToUnit = interaction.options.getString('to');
                    let lengthUnitNameArray = ['meter','kilometer','centimeter','millimeter','lightyears','inches','feet','yards','miles','nauticalmiles'];
                    let lengthUnitNumberArray = [0,1,2,3,4,5,6,7,8,9];
                    // From Unit
                    let resultFromUnit = lengthUnitNumberArray.filter(function(e, i) {
                        return lengthUnitNameArray[i] == stringGetFromUnit;
                    });
                    let stringFromUnit = resultFromUnit.toString();
                    // To Unit
                    let resultToUnit = lengthUnitNumberArray.filter(function(e, i) {
                        return lengthUnitNameArray[i] == stringGetToUnit;
                    });
                    let stringToUnit = resultToUnit.toString();
                    let stringFromToUnit = 'length' + stringFromUnit + stringToUnit;
                    // meter, kilometer, centimeter, millimeter, lightyears, inches, feet, yards, miles, nauticalmiles
                    //   0        1          2           3           4        5      6     7     8        9
                    let length;
                    let sgv = stringGetValue;
                    if (stringFromToUnit === 'length00') { length = `${sgv} m ${convert.is} ` + sgv * 1 + ' m.' } else 
                    if (stringFromToUnit === 'length01') { length = `${sgv} m ${convert.is} ` + sgv / 1000 + ' km.' } else 
                    if (stringFromToUnit === 'length02') { length = `${sgv} m ${convert.is} ` + sgv * 100 + ' cm.' } else 
                    if (stringFromToUnit === 'length03') { length = `${sgv} m ${convert.is} ` + sgv * 1000 + ' mm.' } else 
                    if (stringFromToUnit === 'length04') { length = `${sgv} m ${convert.is} ` + sgv / 9.46073047258E+15 + ' ly.' } else 
                    if (stringFromToUnit === 'length05') { length = `${sgv} m ${convert.is} ` + sgv / 0.0254 + ' in.' } else 
                    if (stringFromToUnit === 'length06') { length = `${sgv} m ${convert.is} ` + sgv / 0.3048 + ' ft.' } else 
                    if (stringFromToUnit === 'length07') { length = `${sgv} m ${convert.is} ` + sgv / 0.9144 + ' yd.' } else 
                    if (stringFromToUnit === 'length08') { length = `${sgv} m ${convert.is} ` + sgv / 1609.344 + ' mi.'} else 
                    if (stringFromToUnit === 'length09') { length = `${sgv} m ${convert.is} ` + sgv / 1852 + ` ${convert.nmi}.` } else 
                    
                    if (stringFromToUnit === 'length10') { length = `${sgv} km ${convert.is} ` + sgv * 1000 + ' m.' } else 
                    if (stringFromToUnit === 'length11') { length = `${sgv} km ${convert.is} ` + sgv * 1 + ' km.' } else 
                    if (stringFromToUnit === 'length12') { length = `${sgv} km ${convert.is} ` + sgv * 100000 + ' cm.' } else 
                    if (stringFromToUnit === 'length13') { length = `${sgv} km ${convert.is} ` + sgv * 1000000 + ' mm.' } else 
                    if (stringFromToUnit === 'length14') { length = `${sgv} km ${convert.is} ` + sgv / 9460730472580 + ' ly.' } else 
                    if (stringFromToUnit === 'length15') { length = `${sgv} km ${convert.is} ` + sgv / 2.54E-5 + ' in.' } else 
                    if (stringFromToUnit === 'length16') { length = `${sgv} km ${convert.is} ` + sgv / 0.0003048 + ' ft.' } else 
                    if (stringFromToUnit === 'length17') { length = `${sgv} km ${convert.is} ` + sgv / 0.0009144 + ' yd.' } else 
                    if (stringFromToUnit === 'length18') { length = `${sgv} km ${convert.is} ` + sgv / 1.609344 + ' mi.' } else 
                    if (stringFromToUnit === 'length19') { length = `${sgv} km ${convert.is} ` + sgv / 1.852 + ` ${convert.nmi}.` } else 
                    
                    if (stringFromToUnit === 'length20') { length = `${sgv} cm ${convert.is} ` + sgv / 100 + ' m.' } else 
                    if (stringFromToUnit === 'length21') { length = `${sgv} cm ${convert.is} ` + sgv / 100000 + ' km.' } else 
                    if (stringFromToUnit === 'length22') { length = `${sgv} cm ${convert.is} ` + sgv * 1 + ' cm.' } else 
                    if (stringFromToUnit === 'length23') { length = `${sgv} cm ${convert.is} ` + sgv * 10 + ' mm.' } else 
                    if (stringFromToUnit === 'length24') { length = `${sgv} cm ${convert.is} ` + sgv / 9.46073047258E+17 + ' ly.' } else 
                    if (stringFromToUnit === 'length25') { length = `${sgv} cm ${convert.is} ` + sgv / 2.54 + ' in.' } else 
                    if (stringFromToUnit === 'length26') { length = `${sgv} cm ${convert.is} ` + sgv / 30.48 + ' ft.' } else 
                    if (stringFromToUnit === 'length27') { length = `${sgv} cm ${convert.is} ` + sgv / 91.44 + ' yd.' } else 
                    if (stringFromToUnit === 'length28') { length = `${sgv} cm ${convert.is} ` + sgv / 160934.4 + ' mi.' } else 
                    if (stringFromToUnit === 'length29') { length = `${sgv} cm ${convert.is} ` + sgv / 185200 + ` ${convert.nmi}.` } else 
                    
                    if (stringFromToUnit === 'length30') { length = `${sgv} mm ${convert.is} ` + sgv / 1000 + ' m.' } else 
                    if (stringFromToUnit === 'length31') { length = `${sgv} mm ${convert.is} ` + sgv / 1000000 + ' km.' } else 
                    if (stringFromToUnit === 'length32') { length = `${sgv} mm ${convert.is} ` + sgv / 10 + ' cm.' } else 
                    if (stringFromToUnit === 'length33') { length = `${sgv} mm ${convert.is} ` + sgv * 1 + ' mm.' } else 
                    if (stringFromToUnit === 'length34') { length = `${sgv} mm ${convert.is} ` + sgv / 9.46073047258E+18 + ' ly.' } else 
                    if (stringFromToUnit === 'length35') { length = `${sgv} mm ${convert.is} ` + sgv / 25.4 + ' in.' } else 
                    if (stringFromToUnit === 'length36') { length = `${sgv} mm ${convert.is} ` + sgv / 304.8 + ' ft.' } else 
                    if (stringFromToUnit === 'length37') { length = `${sgv} mm ${convert.is} ` + sgv / 914.4 + ' yd.' } else 
                    if (stringFromToUnit === 'length38') { length = `${sgv} mm ${convert.is} ` + sgv / 1609344 + ' mi.' } else 
                    if (stringFromToUnit === 'length39') { length = `${sgv} mm ${convert.is} ` + sgv / 1852000 + ` ${convert.nmi}.` } else 
                    
                    if (stringFromToUnit === 'length40') { length = `${sgv} ly ${convert.is} ` + sgv * 9.46073047258E+15 + ' m.' } else 
                    if (stringFromToUnit === 'length41') { length = `${sgv} ly ${convert.is} ` + sgv * 9460730472580 + ' km.' } else 
                    if (stringFromToUnit === 'length42') { length = `${sgv} ly ${convert.is} ` + sgv * 9.46073047258E+17 + ' cm.' } else 
                    if (stringFromToUnit === 'length43') { length = `${sgv} ly ${convert.is} ` + sgv * 9.46073047258E+18 + ' mm.' } else 
                    if (stringFromToUnit === 'length44') { length = `${sgv} ly ${convert.is} ` + sgv * 1 + ' ly.' } else 
                    if (stringFromToUnit === 'length45') { length = `${sgv} ly ${convert.is} ` + sgv * 3.7246970364488E+17 + ' in.' } else 
                    if (stringFromToUnit === 'length46') { length = `${sgv} ly ${convert.is} ` + sgv * 3.1039141970407E+16 + ' ft.' } else 
                    if (stringFromToUnit === 'length47') { length = `${sgv} ly ${convert.is} ` + sgv * 1.0346380656802E+16 + ' yd.' } else 
                    if (stringFromToUnit === 'length48') { length = `${sgv} ly ${convert.is} ` + sgv * 5878625373183.1 + ' mi.' } else 
                    if (stringFromToUnit === 'length49') { length = `${sgv} ly ${convert.is} ` + sgv * 5108385784330.5 + ` ${convert.nmi}.` } else 
                    
                    if (stringFromToUnit === 'length50') { length = `${sgv} in ${convert.is} ` + sgv * 0.0254 + ' m.' } else 
                    if (stringFromToUnit === 'length51') { length = `${sgv} in ${convert.is} ` + sgv * 2.54E-5 + ' km.' } else 
                    if (stringFromToUnit === 'length52') { length = `${sgv} in ${convert.is} ` + sgv * 2.54 + ' cm.' } else 
                    if (stringFromToUnit === 'length53') { length = `${sgv} in ${convert.is} ` + sgv * 25.4 + ' mm.' } else 
                    if (stringFromToUnit === 'length54') { length = `${sgv} in ${convert.is} ` + sgv / 3.7246970364488E+17 + ' ly.' } else 
                    if (stringFromToUnit === 'length55') { length = `${sgv} in ${convert.is} ` + sgv * 1 + ' in.' } else 
                    if (stringFromToUnit === 'length56') { length = `${sgv} in ${convert.is} ` + sgv / 12 + ' ft.' } else 
                    if (stringFromToUnit === 'length57') { length = `${sgv} in ${convert.is} ` + sgv / 36 + ' yd.' } else 
                    if (stringFromToUnit === 'length58') { length = `${sgv} in ${convert.is} ` + sgv / 63360 + ' mi.' } else 
                    if (stringFromToUnit === 'length59') { length = `${sgv} in ${convert.is} ` + sgv * 1.37149E-5 + ` ${convert.nmi}.` } else 
                    
                    if (stringFromToUnit === 'length60') { length = `${sgv} ft ${convert.is} ` + sgv * 0.3048 + ' m.' } else 
                    if (stringFromToUnit === 'length61') { length = `${sgv} ft ${convert.is} ` + sgv * 0.0003048 + ' km.' } else 
                    if (stringFromToUnit === 'length62') { length = `${sgv} ft ${convert.is} ` + sgv * 30.48 + ' cm.' } else 
                    if (stringFromToUnit === 'length63') { length = `${sgv} ft ${convert.is} ` + sgv * 304.8 + ' mm.' } else 
                    if (stringFromToUnit === 'length64') { length = `${sgv} ft ${convert.is} ` + sgv / 3.1039141970407E+16 + ' ly.' } else 
                    if (stringFromToUnit === 'length65') { length = `${sgv} ft ${convert.is} ` + sgv * 12 + ' in.' } else 
                    if (stringFromToUnit === 'length66') { length = `${sgv} ft ${convert.is} ` + sgv * 1 + ' ft.' } else 
                    if (stringFromToUnit === 'length67') { length = `${sgv} ft ${convert.is} ` + sgv / 3 + ' yd.' } else 
                    if (stringFromToUnit === 'length68') { length = `${sgv} ft ${convert.is} ` + sgv / 5280 + ' mi.' } else 
                    if (stringFromToUnit === 'length69') { length = `${sgv} ft ${convert.is} ` + sgv * 0.0001645788 + ` ${convert.nmi}.` } else 
                    
                    if (stringFromToUnit === 'length70') { length = `${sgv} yd ${convert.is} ` + sgv * 0.9144 + ' m.' } else 
                    if (stringFromToUnit === 'length71') { length = `${sgv} yd ${convert.is} ` + sgv * 0.0009144 + ' km.' } else 
                    if (stringFromToUnit === 'length72') { length = `${sgv} yd ${convert.is} ` + sgv * 91.44 + ' cm.' } else 
                    if (stringFromToUnit === 'length73') { length = `${sgv} yd ${convert.is} ` + sgv * 914.4 + ' mm.' } else 
                    if (stringFromToUnit === 'length74') { length = `${sgv} yd ${convert.is} ` + sgv / 1.0346380656802E+16 + ' ly.' } else 
                    if (stringFromToUnit === 'length75') { length = `${sgv} yd ${convert.is} ` + sgv * 36 + ' in.' } else 
                    if (stringFromToUnit === 'length76') { length = `${sgv} yd ${convert.is} ` + sgv * 3 + ' ft.' } else 
                    if (stringFromToUnit === 'length77') { length = `${sgv} yd ${convert.is} ` + sgv * 1 + ' yd.' } else 
                    if (stringFromToUnit === 'length78') { length = `${sgv} yd ${convert.is} ` + sgv / 1760 + ' mi.' } else 
                    if (stringFromToUnit === 'length79') { length = `${sgv} yd ${convert.is} ` + sgv / 2025.3718285214 + ` ${convert.nmi}.` } else 
                    
                    if (stringFromToUnit === 'length80') { length = `${sgv} mi ${convert.is} ` + sgv * 1609.344 + ' m.' } else 
                    if (stringFromToUnit === 'length81') { length = `${sgv} mi ${convert.is} ` + sgv * 1.609344 + ' km.' } else 
                    if (stringFromToUnit === 'length82') { length = `${sgv} mi ${convert.is} ` + sgv * 160934.4 + ' cm.' } else 
                    if (stringFromToUnit === 'length83') { length = `${sgv} mi ${convert.is} ` + sgv * 1609344 + ' mm.' } else 
                    if (stringFromToUnit === 'length84') { length = `${sgv} mi ${convert.is} ` + sgv / 5878625373183.1 + ' ly.' } else 
                    if (stringFromToUnit === 'length85') { length = `${sgv} mi ${convert.is} ` + sgv * 63360 + ' in.' } else 
                    if (stringFromToUnit === 'length86') { length = `${sgv} mi ${convert.is} ` + sgv * 5280 + ' ft.' } else 
                    if (stringFromToUnit === 'length87') { length = `${sgv} mi ${convert.is} ` + sgv * 1760 + ' yd.' } else 
                    if (stringFromToUnit === 'length88') { length = `${sgv} mi ${convert.is} ` + sgv * 1 + ' mi.' } else 
                    if (stringFromToUnit === 'length89') { length = `${sgv} mi ${convert.is} ` + sgv * 0.8689762419 + ` ${convert.nmi}.` } else 
                    
                    if (stringFromToUnit === 'length90') { length = `${sgv} ${convert.nmi} ${convert.is} ` + sgv * 1852 + ' m.' } else 
                    if (stringFromToUnit === 'length91') { length = `${sgv} ${convert.nmi} ${convert.is} ` + sgv * 1.852 + ' km.' } else 
                    if (stringFromToUnit === 'length92') { length = `${sgv} ${convert.nmi} ${convert.is} ` + sgv * 185200 + ' cm.' } else 
                    if (stringFromToUnit === 'length93') { length = `${sgv} ${convert.nmi} ${convert.is} ` + sgv * 1852000 + ' mm.' } else 
                    if (stringFromToUnit === 'length94') { length = `${sgv} ${convert.nmi} ${convert.is} ` + sgv / 5108385784330.5 + ' ly.' } else 
                    if (stringFromToUnit === 'length95') { length = `${sgv} ${convert.nmi} ${convert.is} ` + sgv / 1.37149E-5 + ' in.' } else 
                    if (stringFromToUnit === 'length96') { length = `${sgv} ${convert.nmi} ${convert.is} ` + sgv * 6076.1154855643 + ' ft.' } else 
                    if (stringFromToUnit === 'length97') { length = `${sgv} ${convert.nmi} ${convert.is} ` + sgv * 2025.3718285214 + ' yd.' } else 
                    if (stringFromToUnit === 'length98') { length = `${sgv} ${convert.nmi} ${convert.is} ` + sgv * 1.150779448 + ' mi.' } else 
                    if (stringFromToUnit === 'length99') { length = `${sgv} ${convert.nmi} ${convert.is} ` + sgv * 1 + ` ${convert.nmi}.` } else 
                    { length = `${convert.calcerrordev}` };
                    if (length === undefined || length === null || length === '') {
                        length = `${convert.calcerrorvalue}`;
                    };
                    let stringLength = length.toString();

                    await interaction.reply({ content: stringLength});
                };
                // Thermodynamic Temperature
                if (interaction.options.getSubcommand() === 'temperature') {
                    const stringGetValue = interaction.options.getNumber('value');
                    const stringGetFromUnit = interaction.options.getString('from');
                    const stringGetToUnit = interaction.options.getString('to');
                    let lengthUnitNameArray = ['kelvin','celsius','fahrenheit','rankine'];
                    let lengthUnitNumberArray = [0,1,2,3,4];
                    // From Unit
                    let resultFromUnit = lengthUnitNumberArray.filter(function(e, i) {
                        return lengthUnitNameArray[i] == stringGetFromUnit;
                    });
                    let stringFromUnit = resultFromUnit.toString();
                    // To Unit
                    let resultToUnit = lengthUnitNumberArray.filter(function(e, i) {
                        return lengthUnitNameArray[i] == stringGetToUnit;
                    });
                    let stringToUnit = resultToUnit.toString();
                    let stringFromToUnit = 'temp' + stringFromUnit + stringToUnit;
                    // kelvin, celsius, fahrenheit, rankine
                    //    0       1          2         3
                    let temp;
                    let sgv = stringGetValue;
                    // console.log(stringFromToUnit);
                    // console.log(sgv * 9/5 + 32);
                    if (stringFromToUnit === 'temp00') { temp = `${sgv} K ${convert.is} ${sgv * 1} K` } else 
                    if (stringFromToUnit === 'temp01') { temp = `${sgv} K ${convert.is} ${sgv - 273.15} °C` } else 
                    if (stringFromToUnit === 'temp02') { temp = `${sgv} K ${convert.is} ${sgv * 9/5 - 459.67} °F` } else 
                    if (stringFromToUnit === 'temp03') { temp = `${sgv} K ${convert.is} ${sgv * 9/5} °R` } else 
                    if (stringFromToUnit === 'temp10') { temp = `${sgv} °C ${convert.is} ${(sgv + 273.15)} K` } else 
                    if (stringFromToUnit === 'temp11') { temp = `${sgv} °C ${convert.is} ${sgv * 1} °C` } else 
                    if (stringFromToUnit === 'temp12') { temp = `${sgv} °C ${convert.is} ${sgv * 9/5 + 32} °F` } else 
                    if (stringFromToUnit === 'temp13') { temp = `${sgv} °C ${convert.is} ${(sgv + 273.15) * 9/5} °R` } else 
                    if (stringFromToUnit === 'temp20') { temp = `${sgv} °F ${convert.is} ${(sgv + 459.67) * 5/9} K` } else 
                    if (stringFromToUnit === 'temp21') { temp = `${sgv} °F ${convert.is} ${(sgv - 32) * 5/9} °C` } else 
                    if (stringFromToUnit === 'temp22') { temp = `${sgv} °F ${convert.is} ${sgv * 1} °F` } else 
                    if (stringFromToUnit === 'temp23') { temp = `${sgv} °F ${convert.is} ${(sgv + 459.67)} °R` } else 
                    if (stringFromToUnit === 'temp30') { temp = `${sgv} °R ${convert.is} ${sgv * 5/9} K` } else 
                    if (stringFromToUnit === 'temp31') { temp = `${sgv} °R ${convert.is} ${(sgv - 491.67) * 5/9} °C` } else 
                    if (stringFromToUnit === 'temp32') { temp = `${sgv} °R ${convert.is} ${(sgv - 459.67)} °F`} else 
                    if (stringFromToUnit === 'temp33') { temp = `${sgv} °R ${convert.is} ${sgv * 1} °R` } else 
                    { temp = `${convert.calcerrordev}` };
                    if (temp === undefined || temp === null || temp === '') {
                        temp = `${convert.calcerrorvalue}`;
                    };
                    let stringTemp = temp.toString();

                    await interaction.reply({ content: stringTemp });
                };
                // Area
                if (interaction.options.getSubcommand() === 'area') {
                    const stringGetValue = interaction.options.getNumber('value');
                    const stringGetFromUnit = interaction.options.getString('from');
                    const stringGetToUnit = interaction.options.getString('to');
                    let areaUnitNameArray = ['squaremeters','squarekilometers','squarecentimeters','squaremillimeters','squareinches','squarefoots','squareyards','squaremiles','acres','hectares'];
                    let areaUnitNumberArray = [0,1,2,3,4,5,6,7,8,9];
                    // From Unit
                    let resultFromUnit = areaUnitNumberArray.filter(function(e, i) {
                        return areaUnitNameArray[i] == stringGetFromUnit;
                    });
                    let stringFromUnit = resultFromUnit.toString();
                    // To Unit
                    let resultToUnit = areaUnitNumberArray.filter(function(e, i) {
                        return areaUnitNameArray[i] == stringGetToUnit;
                    });
                    let stringToUnit = resultToUnit.toString();
                    let stringFromToUnit = 'area' + stringFromUnit + stringToUnit;
                    // squaremeters m², squarekilometers km², squarecentimeters cm², squaremillimeters mm², squareinches in², squarefoots ft², squareyards yd², squaremiles mi², acres ac, 
                    //      0                 1                    2                     3                   4                5               6               7            8           
                    // hectares ha
                    //    9
                    let area;
                    let sgv = stringGetValue;
                    if (stringFromToUnit === 'area00') { area = `${sgv} m² ${convert.is} ${sgv * 1} m².` } else 
                    if (stringFromToUnit === 'area01') { area = `${sgv} m² ${convert.is} ${sgv / 1000000} km².` } else 
                    if (stringFromToUnit === 'area02') { area = `${sgv} m² ${convert.is} ${sgv * 10000} cm².` } else 
                    if (stringFromToUnit === 'area03') { area = `${sgv} m² ${convert.is} ${sgv * 1000000} mm².` } else 
                    if (stringFromToUnit === 'area04') { area = `${sgv} m² ${convert.is} ${sgv / 0.00064516} in².` } else 
                    if (stringFromToUnit === 'area05') { area = `${sgv} m² ${convert.is} ${sgv / 0.09290304} ft².` } else 
                    if (stringFromToUnit === 'area06') { area = `${sgv} m² ${convert.is} ${sgv / 0.83612736} yd².` } else 
                    if (stringFromToUnit === 'area07') { area = `${sgv} m² ${convert.is} ${sgv / 2589988.110336} mi².` } else 
                    if (stringFromToUnit === 'area08') { area = `${sgv} m² ${convert.is} ${sgv / 4046.8564224} ac.` } else 
                    if (stringFromToUnit === 'area09') { area = `${sgv} m² ${convert.is} ${sgv / 10000} ha.` } else 

                    if (stringFromToUnit === 'area10') { area = `${sgv} km² ${convert.is} ${sgv * 1000000} m².` } else 
                    if (stringFromToUnit === 'area11') { area = `${sgv} km² ${convert.is} ${sgv * 1} km².` } else 
                    if (stringFromToUnit === 'area12') { area = `${sgv} km² ${convert.is} ${sgv * 10000000000} cm².` } else 
                    if (stringFromToUnit === 'area13') { area = `${sgv} km² ${convert.is} ${sgv * 1000000000000} mm².` } else 
                    if (stringFromToUnit === 'area14') { area = `${sgv} km² ${convert.is} ${sgv / 6.4516E-10} in².` } else 
                    if (stringFromToUnit === 'area15') { area = `${sgv} km² ${convert.is} ${sgv / 9.290304E-8} ft².` } else 
                    if (stringFromToUnit === 'area16') { area = `${sgv} km² ${convert.is} ${sgv / 8.3612736E-7} yd².` } else 
                    if (stringFromToUnit === 'area17') { area = `${sgv} km² ${convert.is} ${sgv / 2.5899881103} mi².` } else 
                    if (stringFromToUnit === 'area18') { area = `${sgv} km² ${convert.is} ${sgv * 247.1053814672} ac.` } else 
                    if (stringFromToUnit === 'area19') { area = `${sgv} km² ${convert.is} ${sgv * 100} ha.` } else 

                    if (stringFromToUnit === 'area20') { area = `${sgv} cm² ${convert.is} ${sgv * 10000} m².` } else 
                    if (stringFromToUnit === 'area21') { area = `${sgv} cm² ${convert.is} ${sgv / 10000000000} km².` } else 
                    if (stringFromToUnit === 'area22') { area = `${sgv} cm² ${convert.is} ${sgv * 1} cm².` } else 
                    if (stringFromToUnit === 'area23') { area = `${sgv} cm² ${convert.is} ${sgv * 100} mm².` } else 
                    if (stringFromToUnit === 'area24') { area = `${sgv} cm² ${convert.is} ${sgv / 6.4516} in².` } else 
                    if (stringFromToUnit === 'area25') { area = `${sgv} cm² ${convert.is} ${sgv / 929.0304} ft².` } else 
                    if (stringFromToUnit === 'area26') { area = `${sgv} cm² ${convert.is} ${sgv / 8361.2736} yd².` } else 
                    if (stringFromToUnit === 'area27') { area = `${sgv} cm² ${convert.is} ${sgv / 25899881103.36} mi².` } else 
                    if (stringFromToUnit === 'area28') { area = `${sgv} cm² ${convert.is} ${sgv / 40468564.224} ac.` } else 
                    if (stringFromToUnit === 'area29') { area = `${sgv} cm² ${convert.is} ${sgv / 100000000} ha.` } else 

                    if (stringFromToUnit === 'area30') { area = `${sgv} mm² ${convert.is} ${sgv / 1000000} m².` } else 
                    if (stringFromToUnit === 'area31') { area = `${sgv} mm² ${convert.is} ${sgv / 1000000000000} km².` } else 
                    if (stringFromToUnit === 'area32') { area = `${sgv} mm² ${convert.is} ${sgv / 100} cm².` } else 
                    if (stringFromToUnit === 'area33') { area = `${sgv} mm² ${convert.is} ${sgv * 1} mm².` } else 
                    if (stringFromToUnit === 'area34') { area = `${sgv} mm² ${convert.is} ${sgv / 645.16} in².` } else 
                    if (stringFromToUnit === 'area35') { area = `${sgv} mm² ${convert.is} ${sgv / 92903.04} ft².` } else 
                    if (stringFromToUnit === 'area36') { area = `${sgv} mm² ${convert.is} ${sgv / 836127.36} yd².` } else 
                    if (stringFromToUnit === 'area37') { area = `${sgv} mm² ${convert.is} ${sgv / 2589988110336} mi².` } else 
                    if (stringFromToUnit === 'area38') { area = `${sgv} mm² ${convert.is} ${sgv / 4046856422.4} ac.` } else 
                    if (stringFromToUnit === 'area39') { area = `${sgv} mm² ${convert.is} ${sgv / 10000000000} ha.` } else 

                    if (stringFromToUnit === 'area40') { area = `${sgv} in² ${convert.is} ${sgv * 0.00064516} m².` } else 
                    if (stringFromToUnit === 'area41') { area = `${sgv} in² ${convert.is} ${sgv * 6.4516E-10} km².` } else 
                    if (stringFromToUnit === 'area42') { area = `${sgv} in² ${convert.is} ${sgv * 6.4516} cm².` } else 
                    if (stringFromToUnit === 'area43') { area = `${sgv} in² ${convert.is} ${sgv * 645.16} mm².` } else 
                    if (stringFromToUnit === 'area44') { area = `${sgv} in² ${convert.is} ${sgv * 1} in².` } else 
                    if (stringFromToUnit === 'area45') { area = `${sgv} in² ${convert.is} ${sgv / 144} ft².` } else 
                    if (stringFromToUnit === 'area46') { area = `${sgv} in² ${convert.is} ${sgv / 1296} yd².` } else 
                    if (stringFromToUnit === 'area47') { area = `${sgv} in² ${convert.is} ${sgv / 4014489600} mi².` } else 
                    if (stringFromToUnit === 'area48') { area = `${sgv} in² ${convert.is} ${sgv / 6272640} ac.` } else 
                    if (stringFromToUnit === 'area49') { area = `${sgv} in² ${convert.is} ${sgv * 6.4516E-8} ha.` } else 

                    if (stringFromToUnit === 'area50') { area = `${sgv} ft² ${convert.is} ${sgv * 0.09290304} m².` } else 
                    if (stringFromToUnit === 'area51') { area = `${sgv} ft² ${convert.is} ${sgv * 9.290304E-8} km².` } else 
                    if (stringFromToUnit === 'area52') { area = `${sgv} ft² ${convert.is} ${sgv * 929.0304} cm².` } else 
                    if (stringFromToUnit === 'area53') { area = `${sgv} ft² ${convert.is} ${sgv * 92903.04} mm².` } else 
                    if (stringFromToUnit === 'area54') { area = `${sgv} ft² ${convert.is} ${sgv * 144} in².` } else 
                    if (stringFromToUnit === 'area55') { area = `${sgv} ft² ${convert.is} ${sgv * 1} ft².` } else 
                    if (stringFromToUnit === 'area56') { area = `${sgv} ft² ${convert.is} ${sgv / 9} yd².` } else 
                    if (stringFromToUnit === 'area57') { area = `${sgv} ft² ${convert.is} ${sgv / 27878400} mi².` } else 
                    if (stringFromToUnit === 'area58') { area = `${sgv} ft² ${convert.is} ${sgv / 43560} ac.` } else 
                    if (stringFromToUnit === 'area59') { area = `${sgv} ft² ${convert.is} ${sgv * 9.290304E-6} ha.` } else 

                    if (stringFromToUnit === 'area60') { area = `${sgv} yd² ${convert.is} ${sgv * 0.83612736} m².` } else 
                    if (stringFromToUnit === 'area61') { area = `${sgv} yd² ${convert.is} ${sgv * 8.3612736E-7} km².` } else 
                    if (stringFromToUnit === 'area62') { area = `${sgv} yd² ${convert.is} ${sgv * 8361.2736} cm².` } else 
                    if (stringFromToUnit === 'area63') { area = `${sgv} yd² ${convert.is} ${sgv * 836127.36} mm².` } else 
                    if (stringFromToUnit === 'area64') { area = `${sgv} yd² ${convert.is} ${sgv * 1296} in².` } else 
                    if (stringFromToUnit === 'area65') { area = `${sgv} yd² ${convert.is} ${sgv * 9} ft².` } else 
                    if (stringFromToUnit === 'area66') { area = `${sgv} yd² ${convert.is} ${sgv * 1} yd².` } else 
                    if (stringFromToUnit === 'area67') { area = `${sgv} yd² ${convert.is} ${sgv / 3097600} mi².` } else 
                    if (stringFromToUnit === 'area68') { area = `${sgv} yd² ${convert.is} ${sgv / 4840} ac.` } else 
                    if (stringFromToUnit === 'area69') { area = `${sgv} yd² ${convert.is} ${sgv * 8.36127E-5} ha.` } else 

                    if (stringFromToUnit === 'area70') { area = `${sgv} mi² ${convert.is} ${sgv * 2589988.110336} m².` } else 
                    if (stringFromToUnit === 'area71') { area = `${sgv} mi² ${convert.is} ${sgv * 2.5899881103} km².` } else 
                    if (stringFromToUnit === 'area72') { area = `${sgv} mi² ${convert.is} ${sgv * 25899881103.36} cm².` } else 
                    if (stringFromToUnit === 'area73') { area = `${sgv} mi² ${convert.is} ${sgv * 2589988110336} mm².` } else 
                    if (stringFromToUnit === 'area74') { area = `${sgv} mi² ${convert.is} ${sgv * 4014489600} in².` } else 
                    if (stringFromToUnit === 'area75') { area = `${sgv} mi² ${convert.is} ${sgv * 27878400} ft².` } else 
                    if (stringFromToUnit === 'area76') { area = `${sgv} mi² ${convert.is} ${sgv * 3097600} yd².` } else 
                    if (stringFromToUnit === 'area77') { area = `${sgv} mi² ${convert.is} ${sgv * 1} mi².` } else 
                    if (stringFromToUnit === 'area78') { area = `${sgv} mi² ${convert.is} ${sgv * 640} ac.` } else 
                    if (stringFromToUnit === 'area79') { area = `${sgv} mi² ${convert.is} ${sgv * 258.9988110336} ha.` } else 

                    if (stringFromToUnit === 'area80') { area = `${sgv} ac ${convert.is} ${sgv * 4046.8564224} m².` } else 
                    if (stringFromToUnit === 'area81') { area = `${sgv} ac ${convert.is} ${sgv / 247.1053814672} km².` } else 
                    if (stringFromToUnit === 'area82') { area = `${sgv} ac ${convert.is} ${sgv * 40468564.224} cm².` } else 
                    if (stringFromToUnit === 'area83') { area = `${sgv} ac ${convert.is} ${sgv * 4046856422.4} mm².` } else 
                    if (stringFromToUnit === 'area84') { area = `${sgv} ac ${convert.is} ${sgv * 6272640} in².` } else 
                    if (stringFromToUnit === 'area85') { area = `${sgv} ac ${convert.is} ${sgv * 43560} ft².` } else 
                    if (stringFromToUnit === 'area86') { area = `${sgv} ac ${convert.is} ${sgv * 4840} yd².` } else 
                    if (stringFromToUnit === 'area87') { area = `${sgv} ac ${convert.is} ${sgv / 640} mi².` } else 
                    if (stringFromToUnit === 'area88') { area = `${sgv} ac ${convert.is} ${sgv * 1} ac.` } else 
                    if (stringFromToUnit === 'area89') { area = `${sgv} ac ${convert.is} ${sgv / 2.4710538147} ha.` } else 

                    if (stringFromToUnit === 'area90') { area = `${sgv} ha ${convert.is} ${sgv * 10000} m².` } else 
                    if (stringFromToUnit === 'area91') { area = `${sgv} ha ${convert.is} ${sgv / 100} km².` } else 
                    if (stringFromToUnit === 'area92') { area = `${sgv} ha ${convert.is} ${sgv * 100000000} cm².` } else 
                    if (stringFromToUnit === 'area93') { area = `${sgv} ha ${convert.is} ${sgv * 10000000000} mm².` } else 
                    if (stringFromToUnit === 'area94') { area = `${sgv} ha ${convert.is} ${sgv / 6.4516E-8} in².` } else 
                    if (stringFromToUnit === 'area95') { area = `${sgv} ha ${convert.is} ${sgv / 9.290304E-6} ft².` } else 
                    if (stringFromToUnit === 'area96') { area = `${sgv} ha ${convert.is} ${sgv / 8.36127E-5} yd².` } else 
                    if (stringFromToUnit === 'area97') { area = `${sgv} ha ${convert.is} ${sgv / 258.9988110336} mi².` } else 
                    if (stringFromToUnit === 'area98') { area = `${sgv} ha ${convert.is} ${sgv * 2.4710538147} ac.` } else 
                    if (stringFromToUnit === 'area99') { area = `${sgv} ha ${convert.is} ${sgv * 1} ha.` } else 
                    { area = `${convert.calcerrordev}` };
                    if (area === undefined || area === null || area === '') {
                        area = `${convert.calcerrorvalue}`;
                    };
                    let stringArea = area;

                    await interaction.reply({ content: stringArea });
                };
                // Volume
                if (interaction.options.getSubcommand() === 'volume') {
                    const stringGetValue = interaction.options.getNumber('value');
                    const stringGetFromUnit = interaction.options.getString('from');
                    const stringGetToUnit = interaction.options.getString('to');
                    let lengthUnitNameArray = ['liter','milliliter','pints','cups','tablespoons','teaspoons','gallons','barrels','fluidounces','cubicmeters','cubickilometers','cubiccentimeters','cubicmillimeters','cubicinches','cubicfoots','cubicyards','cubicmiles'];
                    let lengthUnitNumberArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
                    // From Unit
                    let resultFromUnit = lengthUnitNumberArray.filter(function(e, i) {
                        return lengthUnitNameArray[i] == stringGetFromUnit;
                    });
                    let stringFromUnit;
                    stringFromUnit = resultFromUnit.toString();
                    // if (stringFromUnit.length != '2') {
                    //     stringFromUnit = `0${stringFromUnit}`;
                    // }
                    // To Unit
                    let resultToUnit = lengthUnitNumberArray.filter(function(e, i) {
                        return lengthUnitNameArray[i] == stringGetToUnit;
                    });
                    let stringToUnit;
                    stringToUnit = resultToUnit.toString();
                    // if (stringToUnit.length != '2') {
                    //     stringToUnit = `0${stringToUnit}`;
                    // }
                    let stringFromToUnit = 'volume' + stringFromUnit + stringToUnit;
                    // liters L, milliliters ml, pints pt, cups , tablespoons, teaspoons, gallons gal, barrels bbl, fluidounces fl oz, 
                    //   0          1            2       3        4          5         6           7             8           
                    // cubicmeters m³, cubickilometers km³, cubiccentimeters cm³, cubicmillimeters mm³, cubicinches in³, cubicfoots ft³, cubicyards yd³, cubicmiles mi³
                    //     9                 10                   11                     12                  13              14              15              16
                    let volume;
                    let sgv = stringGetValue;
                    if (stringFromToUnit === 'volume00') { volume = `${sgv} L ${convert.is} ${sgv * 1} L.` } else 
                    if (stringFromToUnit === 'volume01') { volume = `${sgv} L ${convert.is} ${sgv * 1000} ml.` } else 
                    if (stringFromToUnit === 'volume02') { volume = `${sgv} L ${convert.is} ${sgv * 2.1133764189} pt.` } else 
                    if (stringFromToUnit === 'volume03') { volume = `${sgv} L ${convert.is} ${sgv * 4.2267528377} cups.` } else 
                    if (stringFromToUnit === 'volume04') { volume = `${sgv} L ${convert.is} ${sgv * 67.6280454037} tablespoons.` } else 
                    if (stringFromToUnit === 'volume05') { volume = `${sgv} L ${convert.is} ${sgv * 202.8841362111} teaspoons.` } else 
                    if (stringFromToUnit === 'volume06') { volume = `${sgv} L ${convert.is} ${sgv / 3.785411784} gal.` } else 
                    if (stringFromToUnit === 'volume07') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume08') { volume = `${sgv} L ${convert.is} ${sgv * 33.8140227018} fl oz.` } else 
                    if (stringFromToUnit === 'volume09') { volume = `${sgv} L ${convert.is} ${sgv / 1000} m³.` } else 
                    if (stringFromToUnit === 'volume010') { volume = `${sgv} L ${convert.is} ${sgv / 1000000000000} km³.` } else 
                    if (stringFromToUnit === 'volume011') { volume = `${sgv} L ${convert.is} ${sgv * 1000} cm³.` } else 
                    if (stringFromToUnit === 'volume012') { volume = `${sgv} L ${convert.is} ${sgv * 1000000} mm³.` } else 
                    if (stringFromToUnit === 'volume013') { volume = `${sgv} L ${convert.is} ${sgv * 61.0237440947} in³.` } else 
                    if (stringFromToUnit === 'volume014') { volume = `${sgv} L ${convert.is} ${sgv / 28.316846592} ft³.` } else 
                    if (stringFromToUnit === 'volume015') { volume = `${sgv} L ${convert.is} ${sgv / 764.554857984} yd³.` } else 
                    if (stringFromToUnit === 'volume016') { volume = `${sgv} L ${convert.is} ${sgv / 4168181825440.6} mi³.` } else 

                    if (stringFromToUnit === 'volume10') { volume = `${sgv} ml ${convert.is} ${sgv / 1000} L.` } else 
                    if (stringFromToUnit === 'volume11') { volume = `${sgv} ml ${convert.is} ${sgv * 1} ml.` } else 
                    if (stringFromToUnit === 'volume12') { volume = `${sgv} ml ${convert.is} ${sgv / 473.176473} pt.` } else 
                    if (stringFromToUnit === 'volume13') { volume = `${sgv} ml ${convert.is} ${sgv / 236.5882365} cups.` } else 
                    if (stringFromToUnit === 'volume14') { volume = `${sgv} ml ${convert.is} ${sgv / 14.7867647813} tablespoons.` } else 
                    if (stringFromToUnit === 'volume15') { volume = `${sgv} ml ${convert.is} ${sgv / 4.9289215938} teaspoons.` } else 
                    if (stringFromToUnit === 'volume16') { volume = `${sgv} ml ${convert.is} ${sgv / 3785.411784} gal.` } else 
                    if (stringFromToUnit === 'volume17') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume18') { volume = `${sgv} ml ${convert.is} ${sgv / 29.5735295625} fl oz.` } else 
                    if (stringFromToUnit === 'volume19') { volume = `${sgv} ml ${convert.is} ${sgv / 1000000} m³.` } else 
                    if (stringFromToUnit === 'volume110') { volume = `${sgv} ml ${convert.is} ${sgv / 1.0E+15} km³.` } else 
                    if (stringFromToUnit === 'volume111') { volume = `${sgv} ml ${convert.is} ${sgv * 1} cm³.` } else 
                    if (stringFromToUnit === 'volume112') { volume = `${sgv} ml ${convert.is} ${sgv * 1000} mm³.` } else 
                    if (stringFromToUnit === 'volume113') { volume = `${sgv} ml ${convert.is} ${sgv / 16.387064} in³.` } else 
                    if (stringFromToUnit === 'volume114') { volume = `${sgv} ml ${convert.is} ${sgv / 28316.846592} ft³.` } else 
                    if (stringFromToUnit === 'volume115') { volume = `${sgv} ml ${convert.is} ${sgv / 764554.857984} yd³.` } else 
                    if (stringFromToUnit === 'volume116') { volume = `${sgv} ml ${convert.is} ${sgv / 4.1681818254406E+15} mi³.` } else 

                    if (stringFromToUnit === 'volume20') { volume = `${sgv} pt ${convert.is} ${sgv / 2.1133764189} L.` } else 
                    if (stringFromToUnit === 'volume21') { volume = `${sgv} pt ${convert.is} ${sgv * 473.176473} ml.` } else 
                    if (stringFromToUnit === 'volume22') { volume = `${sgv} pt ${convert.is} ${sgv * 1} pt.` } else 
                    if (stringFromToUnit === 'volume23') { volume = `${sgv} pt ${convert.is} ${sgv * 2} cups.` } else 
                    if (stringFromToUnit === 'volume24') { volume = `${sgv} pt ${convert.is} ${sgv * 32} tablespoons.` } else 
                    if (stringFromToUnit === 'volume25') { volume = `${sgv} pt ${convert.is} ${sgv * 96} teaspoons.` } else 
                    if (stringFromToUnit === 'volume26') { volume = `${sgv} pt ${convert.is} ${sgv / 8} gal.` } else 
                    if (stringFromToUnit === 'volume27') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume28') { volume = `${sgv} pt ${convert.is} ${sgv * 16} fl oz.` } else 
                    if (stringFromToUnit === 'volume29') { volume = `${sgv} pt ${convert.is} ${sgv / 2113.3764188652} m³.` } else 
                    if (stringFromToUnit === 'volume210') { volume = `${sgv} pt ${convert.is} ${sgv / 2113376418865.2} km³.` } else 
                    if (stringFromToUnit === 'volume211') { volume = `${sgv} pt ${convert.is} ${sgv * 473.176473} cm³.` } else 
                    if (stringFromToUnit === 'volume212') { volume = `${sgv} pt ${convert.is} ${sgv * 473176.473} mm³.` } else 
                    if (stringFromToUnit === 'volume213') { volume = `${sgv} pt ${convert.is} ${sgv * 28.875} in³.` } else 
                    if (stringFromToUnit === 'volume214') { volume = `${sgv} pt ${convert.is} ${sgv / 59.8441558442} ft³.` } else 
                    if (stringFromToUnit === 'volume215') { volume = `${sgv} pt ${convert.is} ${sgv / 1615.7922077922} yd³.` } else 
                    if (stringFromToUnit === 'volume216') { volume = `${sgv} pt ${convert.is} ${sgv / 8808937179428.6} mi³.` } else 

                    if (stringFromToUnit === 'volume30') { volume = `${sgv} cups ${convert.is} ${sgv / 4.2267528377} L.` } else 
                    if (stringFromToUnit === 'volume31') { volume = `${sgv} cups ${convert.is} ${sgv * 236.5882365} ml.` } else 
                    if (stringFromToUnit === 'volume32') { volume = `${sgv} cups ${convert.is} ${sgv / 2} pt.` } else 
                    if (stringFromToUnit === 'volume33') { volume = `${sgv} cups ${convert.is} ${sgv * 1} cups.` } else 
                    if (stringFromToUnit === 'volume34') { volume = `${sgv} cups ${convert.is} ${sgv * 16} tablespoons.` } else 
                    if (stringFromToUnit === 'volume35') { volume = `${sgv} cups ${convert.is} ${sgv * 48} teaspoons.` } else 
                    if (stringFromToUnit === 'volume36') { volume = `${sgv} cups ${convert.is} ${sgv / 16} gal.` } else 
                    if (stringFromToUnit === 'volume37') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume38') { volume = `${sgv} cups ${convert.is} ${sgv * 8} fl oz.` } else 
                    if (stringFromToUnit === 'volume39') { volume = `${sgv} cups ${convert.is} ${sgv / 4226.7528377304} m³.` } else 
                    if (stringFromToUnit === 'volume310') { volume = `${sgv} cups ${convert.is} ${sgv / 4226752837730.4} km³.` } else 
                    if (stringFromToUnit === 'volume311') { volume = `${sgv} cups ${convert.is} ${sgv * 236.5882365} cm³.` } else 
                    if (stringFromToUnit === 'volume312') { volume = `${sgv} cups ${convert.is} ${sgv * 236588.2365} mm³.` } else 
                    if (stringFromToUnit === 'volume313') { volume = `${sgv} cups ${convert.is} ${sgv * 14.4375} in³.` } else 
                    if (stringFromToUnit === 'volume314') { volume = `${sgv} cups ${convert.is} ${sgv / 119.6883116883} ft³.` } else 
                    if (stringFromToUnit === 'volume315') { volume = `${sgv} cups ${convert.is} ${sgv / 3231.5844155844} yd³.` } else 
                    if (stringFromToUnit === 'volume316') { volume = `${sgv} cups ${convert.is} ${sgv / 17617874358857} mi³.` } else 

                    if (stringFromToUnit === 'volume40') { volume = `${sgv} tablespoons ${convert.is} ${sgv / 67.6280454037} L.` } else 
                    if (stringFromToUnit === 'volume41') { volume = `${sgv} tablespoons ${convert.is} ${sgv * 14.7867647813} ml.` } else 
                    if (stringFromToUnit === 'volume42') { volume = `${sgv} tablespoons ${convert.is} ${sgv / 32} pt.` } else 
                    if (stringFromToUnit === 'volume43') { volume = `${sgv} tablespoons ${convert.is} ${sgv / 16} cups.` } else 
                    if (stringFromToUnit === 'volume44') { volume = `${sgv} tablespoons ${convert.is} ${sgv * 1} tablespoons.` } else 
                    if (stringFromToUnit === 'volume45') { volume = `${sgv} tablespoons ${convert.is} ${sgv * 3} teaspoons.` } else 
                    if (stringFromToUnit === 'volume46') { volume = `${sgv} tablespoons ${convert.is} ${sgv / 256} gal.` } else 
                    if (stringFromToUnit === 'volume47') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume48') { volume = `${sgv} tablespoons ${convert.is} ${sgv / 2} fl oz.` } else 
                    if (stringFromToUnit === 'volume49') { volume = `${sgv} tablespoons ${convert.is} ${sgv * 1.47868E-5} m³.` } else 
                    if (stringFromToUnit === 'volume410') { volume = `${sgv} tablespoons ${convert.is} ${sgv / 67628045403686} km³.` } else 
                    if (stringFromToUnit === 'volume411') { volume = `${sgv} tablespoons ${convert.is} ${sgv * 14.7867647813} cm³.` } else 
                    if (stringFromToUnit === 'volume412') { volume = `${sgv} tablespoons ${convert.is} ${sgv / 6.7628E-5} mm³.` } else 
                    if (stringFromToUnit === 'volume413') { volume = `${sgv} tablespoons ${convert.is} ${sgv * 0.90234375} in³.` } else 
                    if (stringFromToUnit === 'volume414') { volume = `${sgv} tablespoons ${convert.is} ${sgv * 0.0005221897} ft³.` } else 
                    if (stringFromToUnit === 'volume415') { volume = `${sgv} tablespoons ${convert.is} ${sgv * 1.93404E-5} yd³.` } else 
                    if (stringFromToUnit === 'volume416') { volume = `${sgv} tablespoons ${convert.is} ${sgv * 3.5475335291274E-15} mi³.` } else 

                    if (stringFromToUnit === 'volume50') { volume = `${sgv} teaspoons ${convert.is} ${sgv / 202.8841362111} L.` } else 
                    if (stringFromToUnit === 'volume51') { volume = `${sgv} teaspoons ${convert.is} ${sgv * 4.9289215938} ml.` } else 
                    if (stringFromToUnit === 'volume52') { volume = `${sgv} teaspoons ${convert.is} ${sgv / 96} pt.` } else 
                    if (stringFromToUnit === 'volume53') { volume = `${sgv} teaspoons ${convert.is} ${sgv / 48} cups.` } else 
                    if (stringFromToUnit === 'volume54') { volume = `${sgv} teaspoons ${convert.is} ${sgv / 3} tablespoons.` } else 
                    if (stringFromToUnit === 'volume55') { volume = `${sgv} teaspoons ${convert.is} ${sgv * 1} teaspoons.` } else 
                    if (stringFromToUnit === 'volume56') { volume = `${sgv} teaspoons ${convert.is} ${sgv / 768} gal.` } else 
                    if (stringFromToUnit === 'volume57') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume58') { volume = `${sgv} teaspoons ${convert.is} ${sgv * 6} fl oz.` } else 
                    if (stringFromToUnit === 'volume59') { volume = `${sgv} teaspoons ${convert.is} ${sgv / 202884.13621106} m³.` } else 
                    if (stringFromToUnit === 'volume510') { volume = `${sgv} teaspoons ${convert.is} ${sgv * 4.92892159375E-15} km³.` } else 
                    if (stringFromToUnit === 'volume511') { volume = `${sgv} teaspoons ${convert.is} ${sgv * 4.9289215938} cm³.` } else 
                    if (stringFromToUnit === 'volume512') { volume = `${sgv} teaspoons ${convert.is} ${sgv * 4928.92159375} mm³.` } else 
                    if (stringFromToUnit === 'volume513') { volume = `${sgv} teaspoons ${convert.is} ${sgv * 0.30078125} in³.` } else 
                    if (stringFromToUnit === 'volume514') { volume = `${sgv} teaspoons ${convert.is} ${sgv * 0.0001740632} ft³.` } else 
                    if (stringFromToUnit === 'volume515') { volume = `${sgv} teaspoons ${convert.is} ${sgv / 155116.05194805} yd³.` } else 
                    if (stringFromToUnit === 'volume516') { volume = `${sgv} teaspoons ${convert.is} ${sgv * 1.1825111763758E-15} mi³.` } else 

                    if (stringFromToUnit === 'volume60') { volume = `${sgv} gal ${convert.is} ${sgv * 3.785411784} L.` } else 
                    if (stringFromToUnit === 'volume61') { volume = `${sgv} gal ${convert.is} ${sgv * 3785.411784} ml.` } else 
                    if (stringFromToUnit === 'volume62') { volume = `${sgv} gal ${convert.is} ${sgv * 8} pt.` } else 
                    if (stringFromToUnit === 'volume63') { volume = `${sgv} gal ${convert.is} ${sgv * 16} cups.` } else 
                    if (stringFromToUnit === 'volume64') { volume = `${sgv} gal ${convert.is} ${sgv * 256} tablespoons.` } else 
                    if (stringFromToUnit === 'volume65') { volume = `${sgv} gal ${convert.is} ${sgv * 768} teaspoons.` } else 
                    if (stringFromToUnit === 'volume66') { volume = `${sgv} gal ${convert.is} ${sgv * 1} gal.` } else 
                    if (stringFromToUnit === 'volume67') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume68') { volume = `${sgv} gal ${convert.is} ${sgv * 128} fl oz.` } else 
                    if (stringFromToUnit === 'volume69') { volume = `${sgv} gal ${convert.is} ${sgv * 0.0037854118} m³.` } else 
                    if (stringFromToUnit === 'volume610') { volume = `${sgv} gal ${convert.is} ${sgv * 3.785411784E-12} km³.` } else 
                    if (stringFromToUnit === 'volume611') { volume = `${sgv} gal ${convert.is} ${sgv * 3785.411784} cm³.` } else 
                    if (stringFromToUnit === 'volume612') { volume = `${sgv} gal ${convert.is} ${sgv * 3785411.784} mm³.` } else 
                    if (stringFromToUnit === 'volume613') { volume = `${sgv} gal ${convert.is} ${sgv * 231} in³.` } else 
                    if (stringFromToUnit === 'volume614') { volume = `${sgv} gal ${convert.is} ${sgv * 0.1336805556} ft³.` } else 
                    if (stringFromToUnit === 'volume615') { volume = `${sgv} gal ${convert.is} ${sgv * 0.0049511317} yd³.` } else 
                    if (stringFromToUnit === 'volume616') { volume = `${sgv} gal ${convert.is} ${sgv * 9.0816858345662E-13} mi³.` } else 

                    if (stringFromToUnit === 'volume70' || stringFromToUnit === 'volume71' 
                    || stringFromToUnit === 'volume72' || stringFromToUnit === 'volume73' 
                    || stringFromToUnit === 'volume74' || stringFromToUnit === 'volume75' 
                    || stringFromToUnit === 'volume76' || stringFromToUnit === 'volume77' 
                    || stringFromToUnit === 'volume78' || stringFromToUnit === 'volume79' 
                    || stringFromToUnit === 'volume710' || stringFromToUnit === 'volume711' 
                    || stringFromToUnit === 'volume712' || stringFromToUnit === 'volume713' 
                    || stringFromToUnit === 'volume714' || stringFromToUnit === 'volume715' 
                    || stringFromToUnit === 'volume716') { volume = `${convert.nobarrel}` } else 

                    if (stringFromToUnit === 'volume80') { volume = `${sgv} fl oz ${convert.is} ${sgv * 0.0295735296} L.` } else 
                    if (stringFromToUnit === 'volume81') { volume = `${sgv} fl oz ${convert.is} ${sgv * 29.5735295625} ml.` } else 
                    if (stringFromToUnit === 'volume82') { volume = `${sgv} fl oz ${convert.is} ${sgv * 0.0625} pt.` } else 
                    if (stringFromToUnit === 'volume83') { volume = `${sgv} fl oz ${convert.is} ${sgv * 0.125} cups.` } else 
                    if (stringFromToUnit === 'volume84') { volume = `${sgv} fl oz ${convert.is} ${sgv * 2} tablespoons.` } else 
                    if (stringFromToUnit === 'volume85') { volume = `${sgv} fl oz ${convert.is} ${sgv * 6} teaspoons.` } else 
                    if (stringFromToUnit === 'volume86') { volume = `${sgv} fl oz ${convert.is} ${sgv * 0.0078125} gal.` } else 
                    if (stringFromToUnit === 'volume87') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume88') { volume = `${sgv} fl oz ${convert.is} ${sgv * 1} fl oz.` } else 
                    if (stringFromToUnit === 'volume89') { volume = `${sgv} fl oz ${convert.is} ${sgv * 2.95735E-5} m³.` } else 
                    if (stringFromToUnit === 'volume810') { volume = `${sgv} fl oz ${convert.is} ${sgv * 2.95735295625E-14} km³.` } else 
                    if (stringFromToUnit === 'volume811') { volume = `${sgv} fl oz ${convert.is} ${sgv * 29.5735295625} cm³.` } else 
                    if (stringFromToUnit === 'volume812') { volume = `${sgv} fl oz ${convert.is} ${sgv * 29573.5295625} mm³.` } else 
                    if (stringFromToUnit === 'volume813') { volume = `${sgv} fl oz ${convert.is} ${sgv * 1.8046875} in³.` } else 
                    if (stringFromToUnit === 'volume814') { volume = `${sgv} fl oz ${convert.is} ${sgv * 0.0010443793} ft³.` } else 
                    if (stringFromToUnit === 'volume815') { volume = `${sgv} fl oz ${convert.is} ${sgv * 3.86807E-5} yd³.` } else 
                    if (stringFromToUnit === 'volume816') { volume = `${sgv} fl oz ${convert.is} ${sgv * 7.0950670582549E-15} mi³.` } else 

                    if (stringFromToUnit === 'volume90') { volume = `${sgv} m³ ${convert.is} ${agv * 1000} L.` } else 
                    if (stringFromToUnit === 'volume91') { volume = `${sgv} m³ ${convert.is} ${sgv * 1000000} ml.` } else 
                    if (stringFromToUnit === 'volume92') { volume = `${sgv} m³ ${convert.is} ${sgv * 2113.3764188652} pt.` } else 
                    if (stringFromToUnit === 'volume93') { volume = `${sgv} m³ ${convert.is} ${sgv * 4226.7528377304} cups.` } else 
                    if (stringFromToUnit === 'volume94') { volume = `${sgv} m³ ${convert.is} ${sgv / 1.47868E-5} tablespoons.` } else 
                    if (stringFromToUnit === 'volume95') { volume = `${sgv} m³ ${convert.is} ${sgv * 202884.13621106} teaspoons.` } else 
                    if (stringFromToUnit === 'volume96') { volume = `${sgv} m³ ${convert.is} ${sgv * 264.1720523581} gal.` } else 
                    if (stringFromToUnit === 'volume97') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume98') { volume = `${sgv} m³ ${convert.is} ${sgv * 33814.022701843} fl oz.` } else 
                    if (stringFromToUnit === 'volume99') { volume = `${sgv} m³ ${convert.is} ${sgv * 1} m³.` } else 
                    if (stringFromToUnit === 'volume910') { volume = `${sgv} m³ ${convert.is} ${sgv * 1.0E-9} km³.` } else 
                    if (stringFromToUnit === 'volume911') { volume = `${sgv} m³ ${convert.is} ${sgv * 1000000} cm³.` } else 
                    if (stringFromToUnit === 'volume912') { volume = `${sgv} m³ ${convert.is} ${sgv * 1000000000} mm³.` } else 
                    if (stringFromToUnit === 'volume913') { volume = `${sgv} m³ ${convert.is} ${sgv * 61023.744094732} in³.` } else 
                    if (stringFromToUnit === 'volume914') { volume = `${sgv} m³ ${convert.is} ${sgv * 35.3146667215} ft³.` } else 
                    if (stringFromToUnit === 'volume915') { volume = `${sgv} m³ ${convert.is} ${sgv * 1.3079506193} yd³.` } else 
                    if (stringFromToUnit === 'volume916') { volume = `${sgv} m³ ${convert.is} ${sgv * 2.3991275857893E-10} mi³.` } else 

                    if (stringFromToUnit === 'volume100') { volume = `${sgv} km³ ${convert.is} ${sgv * 1000000000000} L.` } else 
                    if (stringFromToUnit === 'volume101') { volume = `${sgv} km³ ${convert.is} ${sgv * 1.0E+15} ml.` } else 
                    if (stringFromToUnit === 'volume102') { volume = `${sgv} km³ ${convert.is} ${sgv * 2113376418865.2} pt.` } else 
                    if (stringFromToUnit === 'volume103') { volume = `${sgv} km³ ${convert.is} ${sgv * 4226752837730.4} cups.` } else 
                    if (stringFromToUnit === 'volume104') { volume = `${sgv} km³ ${convert.is} ${sgv * 67628045403686} tablespoonss.` } else 
                    if (stringFromToUnit === 'volume105') { volume = `${sgv}  ${convert.is} ${sgv * 2.0288413621106E+14} teaspoons.` } else 
                    if (stringFromToUnit === 'volume106') { volume = `${sgv} km³ ${convert.is} ${sgv * 264172052358.15} gal.` } else 
                    if (stringFromToUnit === 'volume107') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume108') { volume = `${sgv} km³ ${convert.is} ${sgv * 33814022701843} fl oz.` } else 
                    if (stringFromToUnit === 'volume109') { volume = `${sgv} km³ ${convert.is} ${sgv * 1000000000} m³.` } else 
                    if (stringFromToUnit === 'volume1010') { volume = `${sgv} km³ ${convert.is} ${sgv * 1} km³.` } else 
                    if (stringFromToUnit === 'volume1011') { volume = `${sgv} km³ ${convert.is} ${sgv * 1.0E+15} cm³.` } else 
                    if (stringFromToUnit === 'volume1012') { volume = `${sgv} km³ ${convert.is} ${sgv * 1.0E+18} mm³.` } else 
                    if (stringFromToUnit === 'volume1013') { volume = `${sgv} km³ ${convert.is} ${sgv * 61023744094732} in³.` } else 
                    if (stringFromToUnit === 'volume1014') { volume = `${sgv} km³ ${convert.is} ${sgv * 35314666721.489} ft³.` } else 
                    if (stringFromToUnit === 'volume1015') { volume = `${sgv} km³ ${convert.is} ${sgv * 1307950619.3144} yd³.` } else 
                    if (stringFromToUnit === 'volume1016') { volume = `${sgv} km³ ${convert.is} ${sgv * 0.2399127586} mi³.` } else 

                    if (stringFromToUnit === 'volume110') { volume = `${sgv} cm³ ${convert.is} ${sgv / 1000} L.` } else 
                    if (stringFromToUnit === 'volume111') { volume = `${sgv} cm³ ${convert.is} ${sgv * 1} ml.` } else 
                    if (stringFromToUnit === 'volume112') { volume = `${sgv} cm³ ${convert.is} ${sgv * 0.0021133764} pt.` } else 
                    if (stringFromToUnit === 'volume113') { volume = `${sgv} cm³ ${convert.is} ${sgv * 0.0042267528} cups.` } else 
                    if (stringFromToUnit === 'volume114') { volume = `${sgv} cm³ ${convert.is} ${sgv * 0.0676280454} tablespoons.` } else 
                    if (stringFromToUnit === 'volume115') { volume = `${sgv} cm³ ${convert.is} ${sgv * 0.2028841362} teaspoons.` } else 
                    if (stringFromToUnit === 'volume116') { volume = `${sgv} cm³ ${convert.is} ${sgv * 0.0002641721} gal.` } else 
                    if (stringFromToUnit === 'volume117') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume118') { volume = `${sgv} cm³ ${convert.is} ${sgv * 0.0338140227} fl oz.` } else 
                    if (stringFromToUnit === 'volume119') { volume = `${sgv} cm³ ${convert.is} ${sgv * 1.0E-6} m³.` } else 
                    if (stringFromToUnit === 'volume1110') { volume = `${sgv} cm³ ${convert.is} ${sgv * 1.0E-15} km³.` } else 
                    if (stringFromToUnit === 'volume1111') { volume = `${sgv} cm³ ${convert.is} ${sgv * 1} cm³.` } else 
                    if (stringFromToUnit === 'volume1112') { volume = `${sgv} cm³ ${convert.is} ${sgv * 1000} mm³.` } else 
                    if (stringFromToUnit === 'volume1113') { volume = `${sgv} cm³ ${convert.is} ${sgv * 0.0610237441} in³.` } else 
                    if (stringFromToUnit === 'volume1114') { volume = `${sgv} cm³ ${convert.is} ${sgv * 3.53147E-5} ft³.` } else 
                    if (stringFromToUnit === 'volume1115') { volume = `${sgv} cm³ ${convert.is} ${sgv * 1.3079506193144E-6} yd³.` } else 
                    if (stringFromToUnit === 'volume1116') { volume = `${sgv} cm³ ${convert.is} ${sgv * 2.3991275857893E-16} mi³.` } else 

                    if (stringFromToUnit === 'volume120') { volume = `${sgv} mm³ ${convert.is} ${sgv / 1000000} L.` } else 
                    if (stringFromToUnit === 'volume121') { volume = `${sgv} mm³ ${convert.is} ${sgv / 1000} ml.` } else 
                    if (stringFromToUnit === 'volume122') { volume = `${sgv} mm³ ${convert.is} ${sgv * 2.1133764188652E-6} pt.` } else 
                    if (stringFromToUnit === 'volume123') { volume = `${sgv} mm³ ${convert.is} ${sgv * 4.2267528377304E-6} cups.` } else 
                    if (stringFromToUnit === 'volume124') { volume = `${sgv} mm³ ${convert.is} ${sgv * 6.7628E-5} tablespoons.` } else 
                    if (stringFromToUnit === 'volume125') { volume = `${sgv} mm³ ${convert.is} ${sgv * 0.0002028841} teaspoons.` } else 
                    if (stringFromToUnit === 'volume126') { volume = `${sgv} mm³ ${convert.is} ${sgv * 2.6417205235815E-7} gal.` } else 
                    if (stringFromToUnit === 'volume127') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume128') { volume = `${sgv} mm³ ${convert.is} ${sgv * 3.3814E-5} fl oz.` } else 
                    if (stringFromToUnit === 'volume129') { volume = `${sgv} mm³ ${convert.is} ${sgv * 1.0E-9} m³.` } else 
                    if (stringFromToUnit === 'volume1210') { volume = `${sgv} mm³ ${convert.is} ${sgv * 1.0E-18} km³.` } else 
                    if (stringFromToUnit === 'volume1211') { volume = `${sgv} mm³ ${convert.is} ${sgv * 0.001} cm³.` } else 
                    if (stringFromToUnit === 'volume1212') { volume = `${sgv} mm³ ${convert.is} ${sgv * 1} mm³.` } else 
                    if (stringFromToUnit === 'volume1213') { volume = `${sgv} mm³ ${convert.is} ${sgv * 6.10237E-5} in³.` } else 
                    if (stringFromToUnit === 'volume1214') { volume = `${sgv} mm³ ${convert.is} ${sgv * 3.5314666721489E-8} ft³.` } else 
                    if (stringFromToUnit === 'volume1215') { volume = `${sgv} mm³ ${convert.is} ${sgv * 1.3079506193144E-9} yd³.` } else 
                    if (stringFromToUnit === 'volume1216') { volume = `${sgv} mm³ ${convert.is} ${sgv * 2.3991275857893E-19} mi³.` } else 

                    if (stringFromToUnit === 'volume130') { volume = `${sgv} in³ ${convert.is} ${sgv / 61.0237440947} L.` } else 
                    if (stringFromToUnit === 'volume131') { volume = `${sgv} in³ ${convert.is} ${sgv * 16.387064} ml.` } else 
                    if (stringFromToUnit === 'volume132') { volume = `${sgv} in³ ${convert.is} ${sgv * 0.0346320346} pt.` } else 
                    if (stringFromToUnit === 'volume133') { volume = `${sgv} in³ ${convert.is} ${sgv * 0.0692640693} cups.` } else 
                    if (stringFromToUnit === 'volume134') { volume = `${sgv} in³ ${convert.is} ${sgv * 1.1082251082} tablespoons.` } else 
                    if (stringFromToUnit === 'volume135') { volume = `${sgv} in³ ${convert.is} ${sgv * 3.3246753247} teaspoons.` } else 
                    if (stringFromToUnit === 'volume136') { volume = `${sgv} in³ ${convert.is} ${sgv * 0.0043290043} gal.` } else 
                    if (stringFromToUnit === 'volume137') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume138') { volume = `${sgv} in³ ${convert.is} ${sgv * 0.5541125541} fl oz.` } else 
                    if (stringFromToUnit === 'volume139') { volume = `${sgv} in³ ${convert.is} ${sgv * 1.63871E-5} m³.` } else 
                    if (stringFromToUnit === 'volume1310') { volume = `${sgv} in³ ${convert.is} ${sgv * 1.6387064E-14} km³.` } else 
                    if (stringFromToUnit === 'volume1311') { volume = `${sgv} in³ ${convert.is} ${sgv * 16.387064} cm³.` } else 
                    if (stringFromToUnit === 'volume1312') { volume = `${sgv} in³ ${convert.is} ${sgv * 16387.064} mm³.` } else 
                    if (stringFromToUnit === 'volume1313') { volume = `${sgv} in³ ${convert.is} ${sgv * 1} in³.` } else 
                    if (stringFromToUnit === 'volume1314') { volume = `${sgv} in³ ${convert.is} ${sgv * 0.0005787037} ft³.` } else 
                    if (stringFromToUnit === 'volume1315') { volume = `${sgv} in³ ${convert.is} ${sgv * 2.14335E-5} yd³.` } else 
                    if (stringFromToUnit === 'volume1316') { volume = `${sgv} in³ ${convert.is} ${sgv * 3.9314657292494E-15} mi³.` } else 

                    if (stringFromToUnit === 'volume140') { volume = `${sgv} ft³ ${convert.is} ${sgv * 28.316846592} L.` } else 
                    if (stringFromToUnit === 'volume141') { volume = `${sgv} ft³ ${convert.is} ${sgv * 28316.846592} ml.` } else 
                    if (stringFromToUnit === 'volume142') { volume = `${sgv} ft³ ${convert.is} ${sgv * 59.8441558442} pt.` } else 
                    if (stringFromToUnit === 'volume143') { volume = `${sgv} ft³ ${convert.is} ${sgv * 119.6883116883} cups.` } else 
                    if (stringFromToUnit === 'volume144') { volume = `${sgv} ft³ ${convert.is} ${sgv * 1915.012987013} tablespoons.` } else 
                    if (stringFromToUnit === 'volume145') { volume = `${sgv} ft³ ${convert.is} ${sgv * 5745.038961039} teaspoons.` } else 
                    if (stringFromToUnit === 'volume146') { volume = `${sgv} ft³ ${convert.is} ${sgv * 7.4805194805} gal.` } else 
                    if (stringFromToUnit === 'volume147') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume148') { volume = `${sgv} ft³ ${convert.is} ${sgv * 957.5064935065} fl oz.` } else 
                    if (stringFromToUnit === 'volume149') { volume = `${sgv} ft³ ${convert.is} ${sgv * 0.0283168466} m³.` } else 
                    if (stringFromToUnit === 'volume1410') { volume = `${sgv} ft³ ${convert.is} ${sgv * 2.8316846592E-11} km³.` } else 
                    if (stringFromToUnit === 'volume1411') { volume = `${sgv} ft³ ${convert.is} ${sgv * 28316.846592} cm³.` } else 
                    if (stringFromToUnit === 'volume1412') { volume = `${sgv} ft³ ${convert.is} ${sgv * 28316846.592} mm³.` } else 
                    if (stringFromToUnit === 'volume1413') { volume = `${sgv} ft³ ${convert.is} ${sgv * 1728} in³.` } else 
                    if (stringFromToUnit === 'volume1414') { volume = `${sgv} ft³ ${convert.is} ${sgv * 1} ft³.` } else 
                    if (stringFromToUnit === 'volume1415') { volume = `${sgv} ft³ ${convert.is} ${sgv * 0.037037037} yd³.` } else 
                    if (stringFromToUnit === 'volume1416') { volume = `${sgv} ft³ ${convert.is} ${sgv * 6.793572780143E-12} mi³.` } else 

                    if (stringFromToUnit === 'volume150') { volume = `${sgv} yd³ ${convert.is} ${sgv * 764.554857984} L.` } else 
                    if (stringFromToUnit === 'volume151') { volume = `${sgv} yd³ ${convert.is} ${sgv * 764554.857984} ml.` } else 
                    if (stringFromToUnit === 'volume152') { volume = `${sgv} yd³ ${convert.is} ${sgv * 1615.7922077922} pt.` } else 
                    if (stringFromToUnit === 'volume153') { volume = `${sgv} yd³ ${convert.is} ${sgv * 3231.5844155844} cups.` } else 
                    if (stringFromToUnit === 'volume154') { volume = `${sgv} yd³ ${convert.is} ${sgv * 51705.350649351} tablespoons.` } else 
                    if (stringFromToUnit === 'volume155') { volume = `${sgv} yd³ ${convert.is} ${sgv * 155116.05194805} teaspoons.` } else 
                    if (stringFromToUnit === 'volume156') { volume = `${sgv} yd³ ${convert.is} ${sgv * 201.974025974} gal.` } else 
                    if (stringFromToUnit === 'volume157') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume158') { volume = `${sgv} yd³ ${convert.is} ${sgv * 25852.675324675} fl oz.` } else 
                    if (stringFromToUnit === 'volume159') { volume = `${sgv} yd³ ${convert.is} ${sgv * 0.764554858} m³.` } else 
                    if (stringFromToUnit === 'volume1510') { volume = `${sgv} yd³ ${convert.is} ${sgv * 7.64554857984E-10} km³.` } else 
                    if (stringFromToUnit === 'volume1511') { volume = `${sgv} yd³ ${convert.is} ${sgv * 764554.857984} cm³.` } else 
                    if (stringFromToUnit === 'volume1512') { volume = `${sgv} yd³ ${convert.is} ${sgv * 764554857.984} mm³.` } else 
                    if (stringFromToUnit === 'volume1513') { volume = `${sgv} yd³ ${convert.is} ${sgv * 46656} in³.` } else 
                    if (stringFromToUnit === 'volume1514') { volume = `${sgv} yd³ ${convert.is} ${sgv * 27} ft³.` } else 
                    if (stringFromToUnit === 'volume1515') { volume = `${sgv} yd³ ${convert.is} ${sgv * 1} yd³.` } else 
                    if (stringFromToUnit === 'volume1516') { volume = `${sgv} yd³ ${convert.is} ${sgv * 1.8342646506386E-10} mi³.` } else 

                    if (stringFromToUnit === 'volume160') { volume = `${sgv} mi³ ${convert.is} ${sgv * 4168181825440.6} L.` } else 
                    if (stringFromToUnit === 'volume161') { volume = `${sgv} mi³ ${convert.is} ${sgv * 4.1681818254406E+15} ml.` } else 
                    if (stringFromToUnit === 'volume162') { volume = `${sgv} mi³ ${convert.is} ${sgv * 8808937179428.6} pt.` } else 
                    if (stringFromToUnit === 'volume163') { volume = `${sgv} mi³ ${convert.is} ${sgv * 17617874358857} cups.` } else 
                    if (stringFromToUnit === 'volume164') { volume = `${sgv} mi³ ${convert.is} ${sgv * 2.8188598974171E+14} tablespoons.` } else 
                    if (stringFromToUnit === 'volume165') { volume = `${sgv} mi³ ${convert.is} ${sgv * 8.4565796922514E+14} teaspoons.` } else 
                    if (stringFromToUnit === 'volume166') { volume = `${sgv} mi³ ${convert.is} ${sgv * 1101117147428.6} gal.` } else 
                    if (stringFromToUnit === 'volume167') { volume = `${convert.nobarrel}` } else 
                    if (stringFromToUnit === 'volume168') { volume = `${sgv} mi³ ${convert.is} ${sgv * 1.4094299487086E+14} fl oz.` } else 
                    if (stringFromToUnit === 'volume169') { volume = `${sgv} mi³ ${convert.is} ${sgv * 4168181825.4406} m³.` } else 
                    if (stringFromToUnit === 'volume1610') { volume = `${sgv} mi³ ${convert.is} ${sgv * 4.1681818254} km³.` } else 
                    if (stringFromToUnit === 'volume1611') { volume = `${sgv} mi³ ${convert.is} ${sgv * 4.1681818254406E+15} cm³.` } else 
                    if (stringFromToUnit === 'volume1612') { volume = `${sgv} mi³ ${convert.is} ${sgv * 4.1681818254406E+18} mm³.` } else 
                    if (stringFromToUnit === 'volume1613') { volume = `${sgv} mi³ ${convert.is} ${sgv * 2.54358061056E+14} in³.` } else 
                    if (stringFromToUnit === 'volume1614') { volume = `${sgv} mi³ ${convert.is} ${sgv * 147197952000} ft³.` } else 
                    if (stringFromToUnit === 'volume1615') { volume = `${sgv} mi³ ${convert.is} ${sgv * 5451776000} yd³.` } else 
                    if (stringFromToUnit === 'volume1616') { volume = `${sgv} mi³ ${convert.is} ${sgv * 1} mi³.` } else 
                    { volume = `${convert.calcerrordev}` };
                    if (volume === undefined || volume === null || volume === '') {
                        volume = `${convert.calcerrorvalue}`;
                    };
                    let stringVolume = volume;

                    await interaction.reply({ content: stringVolume });
                };
                // Weight
                if (interaction.options.getSubcommand() === 'weight') {
                    const stringGetValue = interaction.options.getNumber('value');
                    const stringGetFromUnit = interaction.options.getString('from');
                    const stringGetToUnit = interaction.options.getString('to');
                    let weightUnitNameArray = ['grams','kilograms','milligrams','metrictons','imperialtons','poundslbs','kilopounds','ounces','quarters','grains'];
                    let weightUnitNumberArray = [0,1,2,3,4,5,6,7,8,9];
                    // From Unit
                    let resultFromUnit = weightUnitNumberArray.filter(function(e, i) {
                        return weightUnitNameArray[i] == stringGetFromUnit;
                    });
                    let stringFromUnit = resultFromUnit.toString();
                    // To Unit
                    let resultToUnit = weightUnitNumberArray.filter(function(e, i) {
                        return weightUnitNameArray[i] == stringGetToUnit;
                    });
                    let stringToUnit = resultToUnit.toString();
                    let stringFromToUnit = 'weight' + stringFromUnit + stringToUnit;
                    // grams g, kilograms kg, milligrams mg, metrictons, imperialtons, poundslbs lbs, kilopounds kip, ounces oz, quarters qr, grains gr
                    //   0         1            2             3           4           5             6            7          8          9
                    let weight;
                    let sgv = stringGetValue;
                    if (stringFromToUnit === 'weight00') { weight = `${sgv} g ${convert.is} ${sgv * 1} g.` } else 
                    if (stringFromToUnit === 'weight01') { weight = `${sgv} g ${convert.is} ${sgv / 1000} kg.` } else 
                    if (stringFromToUnit === 'weight02') { weight = `${sgv} g ${convert.is} ${sgv * 1000} mg.` } else 
                    if (stringFromToUnit === 'weight03') { weight = `${sgv} g ${convert.is} ${sgv / 1000000} ton (metric).` } else 
                    if (stringFromToUnit === 'weight04') { weight = `${sgv} g ${convert.is} ${sgv / 907184,74} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight05') { weight = `${sgv} g ${convert.is} ${sgv / 453.59237} lbs.` } else 
                    if (stringFromToUnit === 'weight06') { weight = `${sgv} g ${convert.is} ${sgv / 453592.37} kip.` } else 
                    if (stringFromToUnit === 'weight07') { weight = `${sgv} g ${convert.is} ${sgv / 28.349523125} oz.` } else 
                    if (stringFromToUnit === 'weight08') { weight = `${sgv} g ${convert.is} ${sgv / 11339.80925} qr.` } else 
                    if (stringFromToUnit === 'weight09') { weight = `${sgv} g ${convert.is} ${sgv * 15.4323583529} gr.` } else 

                    if (stringFromToUnit === 'weight10') { weight = `${sgv} kg ${convert.is} ${sgv * 1000} g.` } else 
                    if (stringFromToUnit === 'weight11') { weight = `${sgv} kg ${convert.is} ${sgv * 1} kg.` } else 
                    if (stringFromToUnit === 'weight12') { weight = `${sgv} kg ${convert.is} ${sgv * 1000000} mg.` } else 
                    if (stringFromToUnit === 'weight13') { weight = `${sgv} kg ${convert.is} ${sgv / 1000} ton (metric).` } else 
                    if (stringFromToUnit === 'weight14') { weight = `${sgv} kg ${convert.is} ${sgv / 907.18474} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight15') { weight = `${sgv} kg ${convert.is} ${sgv * 2.2046226218} lbs.` } else 
                    if (stringFromToUnit === 'weight16') { weight = `${sgv} kg ${convert.is} ${sgv / 453.59237} kip.` } else 
                    if (stringFromToUnit === 'weight17') { weight = `${sgv} kg ${convert.is} ${sgv * 35.2739619496} oz.` } else 
                    if (stringFromToUnit === 'weight18') { weight = `${sgv} kg ${convert.is} ${sgv / 11.33980925} qr.` } else 
                    if (stringFromToUnit === 'weight19') { weight = `${sgv} kg ${convert.is} ${sgv * 15432.3583529} gr.` } else 

                    if (stringFromToUnit === 'weight20') { weight = `${sgv} mg ${convert.is} ${sgv / 1000} g.` } else 
                    if (stringFromToUnit === 'weight21') { weight = `${sgv} mg ${convert.is} ${sgv / 1000000} kg.` } else 
                    if (stringFromToUnit === 'weight22') { weight = `${sgv} mg ${convert.is} ${sgv * 1} mg.` } else 
                    if (stringFromToUnit === 'weight23') { weight = `${sgv} mg ${convert.is} ${sgv / 1000000000} ton (metric).` } else 
                    if (stringFromToUnit === 'weight24') { weight = `${sgv} mg ${convert.is} ${sgv / 907184740} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight25') { weight = `${sgv} mg ${convert.is} ${sgv / 453592.37} lbs.` } else 
                    if (stringFromToUnit === 'weight26') { weight = `${sgv} mg ${convert.is} ${sgv / 453592370} kip.` } else 
                    if (stringFromToUnit === 'weight27') { weight = `${sgv} mg ${convert.is} ${sgv / 28349.523125} oz.` } else 
                    if (stringFromToUnit === 'weight28') { weight = `${sgv} mg ${convert.is} ${sgv / 11339809.25} qr.` } else 
                    if (stringFromToUnit === 'weight29') { weight = `${sgv} mg ${convert.is} ${sgv / 64.7989100002} gr.` } else 

                    if (stringFromToUnit === 'weight30') { weight = `${sgv} ton (metric) ${convert.is} ${sgv * 1000000} g.` } else 
                    if (stringFromToUnit === 'weight31') { weight = `${sgv} ton (metric) ${convert.is} ${sgv * 1000} kg.` } else 
                    if (stringFromToUnit === 'weight32') { weight = `${sgv} ton (metric) ${convert.is} ${sgv * 1000000000} mg.` } else 
                    if (stringFromToUnit === 'weight33') { weight = `${sgv} ton (metric) ${convert.is} ${sgv * 1} ton (metric).` } else 
                    if (stringFromToUnit === 'weight34') { weight = `${sgv} ton (metric) ${convert.is} ${sgv * 1.1023113109} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight35') { weight = `${sgv} ton (metric) ${convert.is} ${sgv * 2204.6226218488} lbs.` } else 
                    if (stringFromToUnit === 'weight36') { weight = `${sgv} ton (metric) ${convert.is} ${sgv * 2.2046226218} kip.` } else 
                    if (stringFromToUnit === 'weight37') { weight = `${sgv} ton (metric) ${convert.is} ${sgv * 35273.96194958} oz.` } else 
                    if (stringFromToUnit === 'weight38') { weight = `${sgv} ton (metric) ${convert.is} ${sgv * 88.184904874} qr.` } else 
                    if (stringFromToUnit === 'weight39') { weight = `${sgv} ton (metric) ${convert.is} ${sgv * 15432358.3529} gr.` } else 

                    if (stringFromToUnit === 'weight40') { weight = `${sgv} ton (imperial) ${convert.is} ${sgv * 907184.74} g.` } else 
                    if (stringFromToUnit === 'weight41') { weight = `${sgv} ton (imperial) ${convert.is} ${sgv * 907.18474} kg.` } else 
                    if (stringFromToUnit === 'weight42') { weight = `${sgv} ton (imperial) ${convert.is} ${sgv * 907184740} mg.` } else 
                    if (stringFromToUnit === 'weight43') { weight = `${sgv} ton (imperial) ${convert.is} ${sgv / 1.1023113109} ton (metric).` } else 
                    if (stringFromToUnit === 'weight44') { weight = `${sgv} ton (imperial) ${convert.is} ${sgv * 1} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight45') { weight = `${sgv} ton (imperial) ${convert.is} ${sgv * 2000} lbs.` } else 
                    if (stringFromToUnit === 'weight46') { weight = `${sgv} ton (imperial) ${convert.is} ${sgv * 2} kip.` } else 
                    if (stringFromToUnit === 'weight47') { weight = `${sgv} ton (imperial) ${convert.is} ${sgv * 32000} oz.` } else 
                    if (stringFromToUnit === 'weight48') { weight = `${sgv} ton (imperial) ${convert.is} ${sgv * 80} qr.` } else 
                    if (stringFromToUnit === 'weight49') { weight = `${sgv} ton (imperial) ${convert.is} ${sgv * 13999999.999962} gr.` } else 

                    if (stringFromToUnit === 'weight50') { weight = `${sgv} lbs ${convert.is} ${sgv * 453.59237} g.` } else 
                    if (stringFromToUnit === 'weight51') { weight = `${sgv} lbs ${convert.is} ${sgv / 2.2046226218} kg.` } else 
                    if (stringFromToUnit === 'weight52') { weight = `${sgv} lbs ${convert.is} ${sgv * 453592.37} mg.` } else 
                    if (stringFromToUnit === 'weight53') { weight = `${sgv} lbs ${convert.is} ${sgv / 2204.6226218488} ton (metric).` } else 
                    if (stringFromToUnit === 'weight54') { weight = `${sgv} lbs ${convert.is} ${sgv / 2000} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight55') { weight = `${sgv} lbs ${convert.is} ${sgv * 1} lbs.` } else 
                    if (stringFromToUnit === 'weight56') { weight = `${sgv} lbs ${convert.is} ${sgv / 1000} kip.` } else 
                    if (stringFromToUnit === 'weight57') { weight = `${sgv} lbs ${convert.is} ${sgv * 16} oz.` } else 
                    if (stringFromToUnit === 'weight58') { weight = `${sgv} lbs ${convert.is} ${sgv / 25} qr.` } else 
                    if (stringFromToUnit === 'weight59') { weight = `${sgv} lbs ${convert.is} ${sgv * 6999.9999999812} gr.` } else 

                    if (stringFromToUnit === 'weight60') { weight = `${sgv} kip ${convert.is} ${sgv * 453592.37} g.` } else 
                    if (stringFromToUnit === 'weight61') { weight = `${sgv} kip ${convert.is} ${sgv * 453.59237} kg.` } else 
                    if (stringFromToUnit === 'weight62') { weight = `${sgv} kip ${convert.is} ${sgv * 453592370} mg.` } else 
                    if (stringFromToUnit === 'weight63') { weight = `${sgv} kip ${convert.is} ${sgv / 2.2046226218} ton (metric).` } else 
                    if (stringFromToUnit === 'weight64') { weight = `${sgv} kip ${convert.is} ${sgv / 2} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight65') { weight = `${sgv} kip ${convert.is} ${sgv * 1000} lbs.` } else 
                    if (stringFromToUnit === 'weight66') { weight = `${sgv} kip ${convert.is} ${sgv * 1} kip.` } else 
                    if (stringFromToUnit === 'weight67') { weight = `${sgv} kip ${convert.is} ${sgv * 16000} oz.` } else 
                    if (stringFromToUnit === 'weight68') { weight = `${sgv} kip ${convert.is} ${sgv * 40} qr.` } else 
                    if (stringFromToUnit === 'weight69') { weight = `${sgv} kip ${convert.is} ${sgv * 6999999.9999812} gr.` } else 

                    if (stringFromToUnit === 'weight70') { weight = `${sgv} oz ${convert.is} ${sgv * 28.349523125} g.` } else 
                    if (stringFromToUnit === 'weight71') { weight = `${sgv} oz ${convert.is} ${sgv / 35.2739619496} kg.` } else 
                    if (stringFromToUnit === 'weight72') { weight = `${sgv} oz ${convert.is} ${sgv * 28349.523125} mg.` } else 
                    if (stringFromToUnit === 'weight73') { weight = `${sgv} oz ${convert.is} ${sgv / 35273.96194958} ton (metric).` } else 
                    if (stringFromToUnit === 'weight74') { weight = `${sgv} oz ${convert.is} ${sgv / 32000} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight75') { weight = `${sgv} oz ${convert.is} ${sgv / 16} lbs.` } else 
                    if (stringFromToUnit === 'weight76') { weight = `${sgv} oz ${convert.is} ${sgv / 16000} kip.` } else 
                    if (stringFromToUnit === 'weight77') { weight = `${sgv} oz ${convert.is} ${sgv * 1} oz.` } else 
                    if (stringFromToUnit === 'weight78') { weight = `${sgv} oz ${convert.is} ${sgv / 400} qr.` } else 
                    if (stringFromToUnit === 'weight79') { weight = `${sgv} oz ${convert.is} ${sgv * 437.4999999988} gr.` } else 

                    if (stringFromToUnit === 'weight80') { weight = `${sgv} qr ${convert.is} ${sgv * 11339.80925} g.` } else 
                    if (stringFromToUnit === 'weight81') { weight = `${sgv} qr ${convert.is} ${sgv * 11.33980925} kg.` } else 
                    if (stringFromToUnit === 'weight82') { weight = `${sgv} qr ${convert.is} ${sgv * 11339809.25} mg.` } else 
                    if (stringFromToUnit === 'weight83') { weight = `${sgv} qr ${convert.is} ${sgv / 88.184904874} ton (metric).` } else 
                    if (stringFromToUnit === 'weight84') { weight = `${sgv} qr ${convert.is} ${sgv / 80} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight85') { weight = `${sgv} qr ${convert.is} ${sgv / 25} lbs.` } else 
                    if (stringFromToUnit === 'weight86') { weight = `${sgv} qr ${convert.is} ${sgv / 40} kip.` } else 
                    if (stringFromToUnit === 'weight87') { weight = `${sgv} qr ${convert.is} ${sgv * 400} oz.` } else 
                    if (stringFromToUnit === 'weight88') { weight = `${sgv} qr ${convert.is} ${sgv * 1} qr.` } else 
                    if (stringFromToUnit === 'weight89') { weight = `${sgv} qr ${convert.is} ${sgv * 174999.99999953} gr.` } else 

                    if (stringFromToUnit === 'weight90') { weight = `${sgv} gr ${convert.is} ${sgv / 15.4323583529} g.` } else 
                    if (stringFromToUnit === 'weight91') { weight = `${sgv} gr ${convert.is} ${sgv / 15432.3583529} kg.` } else 
                    if (stringFromToUnit === 'weight92') { weight = `${sgv} gr ${convert.is} ${sgv * 64.7989100002} mg.` } else 
                    if (stringFromToUnit === 'weight93') { weight = `${sgv} gr ${convert.is} ${sgv / 15432358.3529} ton (metric).` } else 
                    if (stringFromToUnit === 'weight94') { weight = `${sgv} gr ${convert.is} ${sgv / 13999999.999962} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight95') { weight = `${sgv} gr ${convert.is} ${sgv / 6999.9999999812} lbs.` } else 
                    if (stringFromToUnit === 'weight96') { weight = `${sgv} gr ${convert.is} ${sgv / 6999999.9999812} kip.` } else 
                    if (stringFromToUnit === 'weight97') { weight = `${sgv} gr ${convert.is} ${sgv / 437.4999999988} oz.` } else 
                    if (stringFromToUnit === 'weight98') { weight = `${sgv} gr ${convert.is} ${sgv / 174999.99999953} qr.` } else 
                    if (stringFromToUnit === 'weight99') { weight = `${sgv} gr ${convert.is} ${sgv * 1} gr.` } else 
                    { weight = `${convert.calcerrordev}` };
                    if (weight === undefined || weight === null || weight === '') {
                        weight = `${convert.calcerrorvalue}`;
                    };
                    let stringWeight = weight;

                    await interaction.reply({ content: stringWeight });
                };
                // Time
                if (interaction.options.getSubcommand() === 'time') {
                    const stringGetValue = interaction.options.getNumber('value');
                    const stringGetFromUnit = interaction.options.getString('from');
                    const stringGetToUnit = interaction.options.getString('to');
                    let timeUnitNameArray = ['minutes','hours','seconds','milliseconds','days','months','weeks','years','decades','centurys'];
                    let timeUnitNumberArray = [0,1,2,3,4,5,6,7,8,9];
                    // From Unit
                    let resultFromUnit = timeUnitNumberArray.filter(function(e, i) {
                        return timeUnitNameArray[i] == stringGetFromUnit;
                    });
                    let stringFromUnit = resultFromUnit.toString();
                    // To Unit
                    let resultToUnit = timeUnitNumberArray.filter(function(e, i) {
                        return timeUnitNameArray[i] == stringGetToUnit;
                    });
                    let stringToUnit = resultToUnit.toString();
                    let stringFromToUnit = 'time' + stringFromUnit + stringToUnit;
                    // minutes, hours, seconds, milliseconds, days, months, weeks, years, decades, centurys
                    //   0      1       2         3        4      5       6      7       8       9
                    let time;
                    let sgv = stringGetValue;
                    if (stringFromToUnit === 'time00') { time = `${sgv} ${convert.min} ${convert.is} ${sgv * 1} ${convert.min}.` } else 
                    if (stringFromToUnit === 'time01') { time = `${sgv} ${convert.min} ${convert.is} ${sgv / 60} ${convert.hh}.` } else 
                    if (stringFromToUnit === 'time02') { time = `${sgv} ${convert.min} ${convert.is} ${sgv * 60} ${convert.ss}.` } else 
                    if (stringFromToUnit === 'time03') { time = `${sgv} ${convert.min} ${convert.is} ${sgv * 60000} ${convert.ms}.` } else 
                    if (stringFromToUnit === 'time04') { time = `${sgv} ${convert.min} ${convert.is} ${sgv / 60 / 24} ${convert.dd}.` } else 
                    if (stringFromToUnit === 'time05') { time = `${sgv} ${convert.min} ${convert.is} ${sgv / 43800} ${convert.mm}.` } else 
                    if (stringFromToUnit === 'time06') { time = `${sgv} ${convert.min} ${convert.is} ${sgv / 60 / 24 / 7} ${convert.ww}.` } else 
                    if (stringFromToUnit === 'time07') { time = `${sgv} ${convert.min} ${convert.is} ${sgv / 60 / 24 / 365.25} ${convert.yy}.` } else 
                    if (stringFromToUnit === 'time08') { time = `${sgv} ${convert.min} ${convert.is} ${sgv / 60 / 24 / 365.25 / 10} ${convert.dec}.` } else 
                    if (stringFromToUnit === 'time09') { time = `${sgv} ${convert.min} ${convert.is} ${sgv / 60 / 24 / 365.25 / 100} ${convert.cc}.` } else 

                    if (stringFromToUnit === 'time10') { time = `${sgv} ${convert.hh} ${convert.is} ${sgv * 60} ${convert.min}.` } else 
                    if (stringFromToUnit === 'time11') { time = `${sgv} ${convert.hh} ${convert.is} ${sgv * 1} ${convert.hh}.` } else 
                    if (stringFromToUnit === 'time12') { time = `${sgv} ${convert.hh} ${convert.is} ${sgv * 60000} ${convert.ss}.` } else 
                    if (stringFromToUnit === 'time13') { time = `${sgv} ${convert.hh} ${convert.is} ${sgv / 3600000} ${convert.ms}.` } else 
                    if (stringFromToUnit === 'time14') { time = `${sgv} ${convert.hh} ${convert.is} ${sgv / 24} ${convert.dd}.` } else 
                    if (stringFromToUnit === 'time15') { time = `${sgv} ${convert.hh} ${convert.is} ${sgv / 730} ${convert.mm}.` } else 
                    if (stringFromToUnit === 'time16') { time = `${sgv} ${convert.hh} ${convert.is} ${sgv / 24 / 7} ${convert.ww}.` } else 
                    if (stringFromToUnit === 'time17') { time = `${sgv} ${convert.hh} ${convert.is} ${sgv / 24 / 365.25} ${convert.yy}.` } else 
                    if (stringFromToUnit === 'time18') { time = `${sgv} ${convert.hh} ${convert.is} ${sgv / 24 / 365.25 / 10} ${convert.dec}.` } else 
                    if (stringFromToUnit === 'time19') { time = `${sgv} ${convert.hh} ${convert.is} ${sgv / 24 / 365.25 / 100} ${convert.cc}.` } else 

                    if (stringFromToUnit === 'time20') { time = `${sgv} ${convert.ss} ${convert.is} ${sgv / 60} ${convert.min}.` } else 
                    if (stringFromToUnit === 'time21') { time = `${sgv} ${convert.ss} ${convert.is} ${sgv / 3600} ${convert.hh}.` } else 
                    if (stringFromToUnit === 'time22') { time = `${sgv} ${convert.ss} ${convert.is} ${sgv * 1} ${convert.ss}.` } else 
                    if (stringFromToUnit === 'time23') { time = `${sgv} ${convert.ss} ${convert.is} ${sgv * 1000} ${convert.ms}.` } else 
                    if (stringFromToUnit === 'time24') { time = `${sgv} ${convert.ss} ${convert.is} ${sgv / 60 / 60 / 24} ${convert.dd}.` } else 
                    if (stringFromToUnit === 'time25') { time = `${sgv} ${convert.ss} ${convert.is} ${sgv / 2628000} ${convert.mm}.` } else 
                    if (stringFromToUnit === 'time26') { time = `${sgv} ${convert.ss} ${convert.is} ${sgv / 60 / 60 / 24 / 7} ${convert.ww}.` } else 
                    if (stringFromToUnit === 'time27') { time = `${sgv} ${convert.ss} ${convert.is} ${sgv / 60 / 60 / 24 / 365.25} ${convert.yy}.` } else 
                    if (stringFromToUnit === 'time28') { time = `${sgv} ${convert.ss} ${convert.is} ${sgv / 60 / 60 / 24 / 365.25 / 10} ${convert.dec}.` } else 
                    if (stringFromToUnit === 'time29') { time = `${sgv} ${convert.ss} ${convert.is} ${sgv / 60 / 60 / 24 / 365.25 / 100} ${convert.cc}.` } else 

                    if (stringFromToUnit === 'time30') { time = `${sgv} ${convert.ms} ${convert.is} ${sgv / 60000} ${convert.min}.` } else 
                    if (stringFromToUnit === 'time31') { time = `${sgv} ${convert.ms} ${convert.is} ${sgv / 60000 / 60} ${convert.hh}.` } else 
                    if (stringFromToUnit === 'time32') { time = `${sgv} ${convert.ms} ${convert.is} ${sgv / 1000} ${convert.ss}.` } else 
                    if (stringFromToUnit === 'time33') { time = `${sgv} ${convert.ms} ${convert.is} ${sgv * 1} ${convert.ms}.` } else 
                    if (stringFromToUnit === 'time34') { time = `${sgv} ${convert.ms} ${convert.is} ${sgv / 60000 / 60 / 24} ${convert.dd}.` } else 
                    if (stringFromToUnit === 'time35') { time = `${sgv} ${convert.ms} ${convert.is} ${sgv / 2628000000} ${convert.mm}.` } else 
                    if (stringFromToUnit === 'time36') { time = `${sgv} ${convert.ms} ${convert.is} ${sgv / 60000 / 60 / 24 / 7} ${convert.ww}.` } else 
                    if (stringFromToUnit === 'time37') { time = `${sgv} ${convert.ms} ${convert.is} ${sgv / 60000 / 60 / 24 / 365.25} ${convert.yy}.` } else 
                    if (stringFromToUnit === 'time38') { time = `${sgv} ${convert.ms} ${convert.is} ${sgv / 60000 / 60 / 24 / 365.25 / 10} ${convert.dec}.` } else 
                    if (stringFromToUnit === 'time39') { time = `${sgv} ${convert.ms} ${convert.is} ${sgv / 60000 / 60 / 24 / 365.25 / 100} ${convert.cc}.` } else 

                    if (stringFromToUnit === 'time40') { time = `${sgv} ${convert.dd} ${convert.is} ${sgv * 24 * 60} ${convert.min}.` } else 
                    if (stringFromToUnit === 'time41') { time = `${sgv} ${convert.dd} ${convert.is} ${sgv * 24} ${convert.hh}.` } else 
                    if (stringFromToUnit === 'time42') { time = `${sgv} ${convert.dd} ${convert.is} ${sgv * 24 * 60 * 60} ${convert.ss}.` } else 
                    if (stringFromToUnit === 'time43') { time = `${sgv} ${convert.dd} ${convert.is} ${sgv * 24 * 60 * 60000} ${convert.ms}.` } else 
                    if (stringFromToUnit === 'time44') { time = `${sgv} ${convert.dd} ${convert.is} ${sgv * 1} ${convert.dd}.` } else 
                    if (stringFromToUnit === 'time45') { time = `${sgv} ${convert.dd} ${convert.is} ${sgv / 30.4166666667} ${convert.mm}.` } else 
                    if (stringFromToUnit === 'time46') { time = `${sgv} ${convert.dd} ${convert.is} ${sgv / 7} ${convert.ww}.` } else 
                    if (stringFromToUnit === 'time47') { time = `${sgv} ${convert.dd} ${convert.is} ${sgv / 365.25} ${convert.yy}.` } else 
                    if (stringFromToUnit === 'time48') { time = `${sgv} ${convert.dd} ${convert.is} ${sgv / 365.25 / 10} ${convert.dec}.` } else 
                    if (stringFromToUnit === 'time49') { time = `${sgv} ${convert.dd} ${convert.is} ${sgv / 365.25 / 100} ${convert.cc}.` } else 

                    if (stringFromToUnit === 'time50') { time = `${sgv} ${convert.mm} ${convert.is} ${sgv * 43800} ${convert.min}.` } else 
                    if (stringFromToUnit === 'time51') { time = `${sgv} ${convert.mm} ${convert.is} ${sgv * 730} ${convert.hh}.` } else 
                    if (stringFromToUnit === 'time52') { time = `${sgv} ${convert.mm} ${convert.is} ${sgv * 2628000000} ${convert.ss}.` } else 
                    if (stringFromToUnit === 'time53') { time = `${sgv} ${convert.mm} ${convert.is} ${sgv * 2628000000} ${convert.ms}.` } else 
                    if (stringFromToUnit === 'time54') { time = `${sgv} ${convert.mm} ${convert.is} ${sgv * 30.4166666667} ${convert.dd}.` } else 
                    if (stringFromToUnit === 'time55') { time = `${sgv} ${convert.mm} ${convert.is} ${sgv * 1} ${convert.mm}.` } else 
                    if (stringFromToUnit === 'time56') { time = `${sgv} ${convert.mm} ${convert.is} ${sgv * 4.3452380952} ${convert.ww}.` } else 
                    if (stringFromToUnit === 'time57') { time = `${sgv} ${convert.mm} ${convert.is} ${sgv / 12.0082191781} ${convert.yy}.` } else 
                    if (stringFromToUnit === 'time58') { time = `${sgv} ${convert.mm} ${convert.is} ${sgv / 12.0082191781 / 10} ${convert.dec}.` } else 
                    if (stringFromToUnit === 'time59') { time = `${sgv} ${convert.mm} ${convert.is} ${sgv / 12.0082191781 / 100} ${convert.cc}.` } else 

                    if (stringFromToUnit === 'time60') { time = `${sgv} ${convert.ww} ${convert.is} ${sgv * 7 * 24 * 60} ${convert.min}.` } else 
                    if (stringFromToUnit === 'time61') { time = `${sgv} ${convert.ww} ${convert.is} ${sgv * 7 * 24} ${convert.hh}.` } else 
                    if (stringFromToUnit === 'time62') { time = `${sgv} ${convert.ww} ${convert.is} ${sgv * 7 * 24 * 60 * 60} ${convert.ss}.` } else 
                    if (stringFromToUnit === 'time63') { time = `${sgv} ${convert.ww} ${convert.is} ${sgv * 7 * 24 * 60 * 60000} ${convert.ms}.` } else 
                    if (stringFromToUnit === 'time64') { time = `${sgv} ${convert.ww} ${convert.is} ${sgv * 7} ${convert.dd}.` } else 
                    if (stringFromToUnit === 'time65') { time = `${sgv} ${convert.ww} ${convert.is} ${sgv / 4.3452380952} ${convert.mm}.` } else 
                    if (stringFromToUnit === 'time66') { time = `${sgv} ${convert.ww} ${convert.is} ${sgv * 1} ${convert.ww}.` } else 
                    if (stringFromToUnit === 'time67') { time = `${sgv} ${convert.ww} ${convert.is} ${sgv / 52.1785714286} ${convert.yy}.` } else 
                    if (stringFromToUnit === 'time68') { time = `${sgv} ${convert.ww} ${convert.is} ${sgv / 52.1785714286 / 10} ${convert.dec}.` } else 
                    if (stringFromToUnit === 'time69') { time = `${sgv} ${convert.ww} ${convert.is} ${sgv / 52.1785714286 / 100} ${convert.cc}.` } else 

                    if (stringFromToUnit === 'time70') { time = `${sgv} ${convert.yy} ${convert.is} ${sgv * 365.25 * 24 * 60} ${convert.min}.` } else 
                    if (stringFromToUnit === 'time71') { time = `${sgv} ${convert.yy} ${convert.is} ${sgv * 365.25 * 24} ${convert.hh}.` } else 
                    if (stringFromToUnit === 'time72') { time = `${sgv} ${convert.yy} ${convert.is} ${sgv * 365.25 * 24 * 60 * 60} ${convert.ss}.` } else 
                    if (stringFromToUnit === 'time73') { time = `${sgv} ${convert.yy} ${convert.is} ${sgv * 365.25 * 24 * 60 * 60000} ${convert.ms}.` } else 
                    if (stringFromToUnit === 'time74') { time = `${sgv} ${convert.yy} ${convert.is} ${sgv * 365.25} ${convert.dd}.` } else 
                    if (stringFromToUnit === 'time75') { time = `${sgv} ${convert.yy} ${convert.is} ${sgv * 12.0082191781} ${convert.mm}.` } else 
                    if (stringFromToUnit === 'time76') { time = `${sgv} ${convert.yy} ${convert.is} ${sgv * 52.1785714286} ${convert.ww}.` } else 
                    if (stringFromToUnit === 'time77') { time = `${sgv} ${convert.yy} ${convert.is} ${sgv * 1} ${convert.yy}.` } else 
                    if (stringFromToUnit === 'time78') { time = `${sgv} ${convert.yy} ${convert.is} ${sgv / 10} ${convert.dec}.` } else 
                    if (stringFromToUnit === 'time79') { time = `${sgv} ${convert.yy} ${convert.is} ${sgv / 100} ${convert.cc}.` } else 

                    if (stringFromToUnit === 'time80') { time = `${sgv} ${convert.dec} ${convert.is} ${sgv * 10 * 365.25 * 24 * 60} ${convert.min}.` } else 
                    if (stringFromToUnit === 'time81') { time = `${sgv} ${convert.dec} ${convert.is} ${sgv * 10 * 365.25 * 24} ${convert.hh}.` } else 
                    if (stringFromToUnit === 'time82') { time = `${sgv} ${convert.dec} ${convert.is} ${sgv * 10 * 365.25 * 24 * 60 * 60} ${convert.ss}.` } else 
                    if (stringFromToUnit === 'time83') { time = `${sgv} ${convert.dec} ${convert.is} ${sgv * 10 * 365.25 * 24 * 60 * 60000} ${convert.ms}.` } else 
                    if (stringFromToUnit === 'time84') { time = `${sgv} ${convert.dec} ${convert.is} ${sgv * 10 * 365.25} ${convert.dd}.` } else 
                    if (stringFromToUnit === 'time85') { time = `${sgv} ${convert.dec} ${convert.is} ${sgv * 120.0821917808} ${convert.mm}.` } else 
                    if (stringFromToUnit === 'time86') { time = `${sgv} ${convert.dec} ${convert.is} ${sgv * 521.7857142857} ${convert.ww}.` } else 
                    if (stringFromToUnit === 'time87') { time = `${sgv} ${convert.dec} ${convert.is} ${sgv * 10} ${convert.yy}.` } else 
                    if (stringFromToUnit === 'time88') { time = `${sgv} ${convert.dec} ${convert.is} ${sgv * 1} ${convert.dec}.` } else 
                    if (stringFromToUnit === 'time89') { time = `${sgv} ${convert.dec} ${convert.is} ${sgv / 10} ${convert.cc}.` } else 

                    if (stringFromToUnit === 'time90') { time = `${sgv} ${convert.cc} ${convert.is} ${sgv * 100 * 365.25 * 24 * 60} ${convert.min}.` } else 
                    if (stringFromToUnit === 'time91') { time = `${sgv} ${convert.cc} ${convert.is} ${sgv * 100 * 365.25 * 24} ${convert.hh}.` } else 
                    if (stringFromToUnit === 'time92') { time = `${sgv} ${convert.cc} ${convert.is} ${sgv * 100 * 365.25 * 24 * 60 * 60} ${convert.ss}.` } else 
                    if (stringFromToUnit === 'time93') { time = `${sgv} ${convert.cc} ${convert.is} ${sgv * 100 * 365.25 * 24 * 60 * 60000} ${convert.ms}.` } else 
                    if (stringFromToUnit === 'time94') { time = `${sgv} ${convert.cc} ${convert.is} ${sgv * 100 * 365.25} ${convert.dd}.` } else 
                    if (stringFromToUnit === 'time95') { time = `${sgv} ${convert.cc} ${convert.is} ${sgv * 1200.8219178082} ${convert.mm}.` } else 
                    if (stringFromToUnit === 'time96') { time = `${sgv} ${convert.cc} ${convert.is} ${sgv * 5217.8571428571} ${convert.ww}.` } else 
                    if (stringFromToUnit === 'time97') { time = `${sgv} ${convert.cc} ${convert.is} ${sgv * 100} ${convert.yy}.` } else 
                    if (stringFromToUnit === 'time98') { time = `${sgv} ${convert.cc} ${convert.is} ${sgv * 10} ${convert.dec}.` } else 
                    if (stringFromToUnit === 'time99') { time = `${sgv} ${convert.cc} ${convert.is} ${sgv * 1} ${convert.cc}.` } else 
                    { time = `${convert.calcerrordev}` };
                    if (time == null || time === '') {
                        time = `${convert.calcerrorvalue}`;
                    };
                    let stringTime = time;

                    await interaction.reply({ content: stringTime });
                };
                // // TimeZone
                // if (interaction.options.getSubcommand() === 'zone') {
                //     const stringGetValue = interaction.options.getString('value');
                //     const stringGetFromZone = interaction.options.getString('from');
                // };
                // Number Names
                if (interaction.options.getSubcommand() === 'number') {
                    const stringGetValue = interaction.options.getString('value');
                    const stringGetFromScale = interaction.options.getString('from');
                    let numberValueNameArray = ['million','billion','trillion','quadrillion','quintilion','sextillion','septillion','octillion','nonillion','decillion','undecillion','milliard','billiard','trilliard','quadrilliard','quintiliard','sextilliard'];
                    let numberValueNumberArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
                    // From Unit
                    let stringFromScale;
                    if (stringGetFromScale === 'shortscale') { stringFromScale = '0' } else 
                    if (stringGetFromScale === 'longscale') { stringFromScale = '1' };
                    // if (stringFromScale.length != '1') {
                    //     stringFromScale = `0`;
                    // }
                    // Value
                    let resultValue = numberValueNumberArray.filter(function(e, i) {
                        return numberValueNameArray[i] == stringGetValue;
                    });
                    let stringValue;
                    stringValue = resultValue.toString();
                    // if (stringValue.length != '1') {
                    //     stringValue = `0${stringValue}`;
                    // }
                    if (stringFromScale === '0' && stringValue === '11' 
                    || stringFromScale === '0' && stringValue === '12' 
                    || stringFromScale === '0' && stringValue === '13' 
                    || stringFromScale === '0' && stringValue === '14' 
                    || stringFromScale === '0' && stringValue === '15' 
                    || stringFromScale === '0' && stringValue === '16') {
                        stringFromScale = '1';
                    };
                    let stringFromScaleValue = 'number' + stringFromScale + stringValue;
                    // Million, Billion, Trillion, Quadrillion, Quintilion, Sextillion, Septillion, Octillion, Nonillion
                    //    0        1         2           3           4          5            6          7          8
                    // Decillion, Undecillion, Milliard, Billiard, Trilliard, Quadrilliard, Quintiliard, sextilliard
                    //     9           10         11        12         13          14            15           16
                    let number;
                    if (stringFromScaleValue === 'number00') { number = `\`${convert.mil1}\` ${convert.is} \`${convert.mil1}\` ${convert.both}.` } else 
                    if (stringFromScaleValue === 'number01') { number = `\`${convert.bil1}\` ${convert.short} ${convert.is} \`${convert.mil2}\` ${convert.long}.` } else 
                    if (stringFromScaleValue === 'number02') { number = `\`${convert.tril1}\` ${convert.short} ${convert.is} \`${convert.bil1}\` ${convert.long}.` } else 
                    if (stringFromScaleValue === 'number03') { number = `\`${convert.quadril1}\` ${convert.short} ${convert.is} \`${convert.bil2}\` ${convert.long}.` } else 
                    if (stringFromScaleValue === 'number04') { number = `\`${convert.quintil1}\` ${convert.short} ${convert.is} \`${convert.tril1}\` ${convert.long}.` } else 
                    if (stringFromScaleValue === 'number05') { number = `\`${convert.sextil1}\` ${convert.short} ${convert.is} \`${convert.tril2}\` ${convert.long}.` } else 
                    if (stringFromScaleValue === 'number06') { number = `\`${convert.septil1}\` ${convert.short} ${convert.is} \`${convert.quadril1}\` ${convert.long}.` } else 
                    if (stringFromScaleValue === 'number07') { number = `\`${convert.octil1}\` ${convert.short} ${convert.is} \`${convert.quadril2}\` ${convert.long}.` } else 
                    if (stringFromScaleValue === 'number08') { number = `\`${convert.nontil1}\` ${convert.short} ${convert.is} \`${convert.quintil1}\` ${convert.long}.` } else 
                    if (stringFromScaleValue === 'number09') { number = `\`${convert.decil1}\` ${convert.short} ${convert.is} \`${convert.quintil2}\` ${convert.long}.` } else 
                    if (stringFromScaleValue === 'number010') { number = `\`${convert.undecil1}\` ${convert.short} ${convert.is} \`${convert.sextil1}\` ${convert.long}.` } else 

                    if (stringFromScaleValue === 'number10') { number = `\`${convert.mil1}\` ${convert.is} \`${convert.mil1}\` ${convert.both}.` } else 
                    if (stringFromScaleValue === 'number111') { number = `\`${convert.mil2}\` ${convert.long} ${convert.is} \`${convert.bil1}\` ${convert.short}.` } else 
                    if (stringFromScaleValue === 'number11') { number = `\`${convert.bil1}\` ${convert.long} ${convert.is} \`${convert.tril1}\` ${convert.short}.` } else 
                    if (stringFromScaleValue === 'number112') { number = `\`${convert.bil2}\` ${convert.long} ${convert.is} \`${convert.quadril1}\` ${convert.short}.` } else 
                    if (stringFromScaleValue === 'number12') { number = `\`${convert.tril1}\` ${convert.long} ${convert.is} \`${convert.quintil1}\` ${convert.short}.` } else 
                    if (stringFromScaleValue === 'number113') { number = `\`${convert.tril2}\` ${convert.long} ${convert.is} \`${convert.sextil1}\` ${convert.short}.` } else 
                    if (stringFromScaleValue === 'number13') { number = `\`${convert.quadril1}\` ${convert.long} ${convert.is} \`${convert.septil1}\` ${convert.short}.` } else 
                    if (stringFromScaleValue === 'number114') { number = `\`${convert.quadril2}\` ${convert.long} ${convert.is} \`${convert.octil1}\` ${convert.short}.` } else 
                    if (stringFromScaleValue === 'number14') { number = `\`${convert.quintil1}\` ${convert.long} ${convert.is} \`${convert.nontil1}\` ${convert.short}.` } else 
                    if (stringFromScaleValue === 'number115') { number = `\`${convert.quintil2}\` ${convert.long} ${convert.is} \`${convert.decil1}\` ${convert.short}.` } else 
                    if (stringFromScaleValue === 'number15') { number = `\`${convert.sextil1}\` ${convert.long} ${convert.is} \`${convert.undecil1}\` ${convert.short}.` } else 
                    { number = `${convert.calcerrordev}` };
                    if (number === undefined || number === null || number === '') {
                        number = `${convert.calcerrorvalue}`;
                    };
                    let stringNumber = number;

                    await interaction.reply({ content: stringNumber });
                };
                // Speed
                if (interaction.options.getSubcommand() === 'speed') {
                    const stringGetValue = interaction.options.getNumber('value');
                    const stringGetFromUnit = interaction.options.getString('from');
                    const stringGetToUnit = interaction.options.getString('to');
                    let lengthUnitNameArray = ['meterpersecond','kilometerperhour','mileperhour','knot','footpersecond','mach'];
                    let lengthUnitNumberArray = [0,1,2,3,4,5];
                    // From Unit
                    let resultFromUnit = lengthUnitNumberArray.filter(function(e, i) {
                        return lengthUnitNameArray[i] == stringGetFromUnit;
                    });
                    let stringFromUnit = resultFromUnit.toString();
                    // To Unit
                    let resultToUnit = lengthUnitNumberArray.filter(function(e, i) {
                        return lengthUnitNameArray[i] == stringGetToUnit;
                    });
                    let stringToUnit = resultToUnit.toString();
                    let stringFromToUnit = 'speed' + stringFromUnit + stringToUnit;
                    // meterpersecond, kilometerperhour, mileperhour, knot, footpersecond, mach
                    //        0               1               2         3         4          5
                    let speed;
                    let sgv = stringGetValue;
                    // Mach Calculations
                    let machsgv;
                    if (stringFromToUnit === 'speed05') {machsgv = 0.003 * sgv;};
                    if (stringFromToUnit === 'speed15') {machsgv = 0.003 * (sgv / 3.6);};
                    if (stringFromToUnit === 'speed25') {machsgv = 0.003 * (sgv * 0.44704);};
                    if (stringFromToUnit === 'speed35') {machsgv = 0.003 * (sgv * 0.5144444444);};
                    if (stringFromToUnit === 'speed45') {machsgv = 0.003 * (sgv * 0.3048);};
                    if (stringFromToUnit === 'speed50') {machsgv = 0.003 * sgv;};
                    if (stringFromToUnit === 'speed51') {machsgv = 0.003 / (sgv * 3.6);};
                    if (stringFromToUnit === 'speed52') {machsgv = 0.003 / (sgv / 0.44704);};
                    if (stringFromToUnit === 'speed53') {machsgv = 0.003 / (sgv / 0.5144444444);};
                    if (stringFromToUnit === 'speed54') {machsgv = 0.003 / (sgv / 0.3048);};
                    if (stringFromToUnit === 'speed55') {machsgv = sgv.toFixed(3);};
                    // if (stringFromToUnit === 'speed50') {machsgv = sgv.toFixed(3);};
                    // if (stringFromToUnit === 'speed51') {machsgv = sgv.toFixed(3);};
                    // if (stringFromToUnit === 'speed52') {machsgv = sgv.toFixed(3);};
                    // if (stringFromToUnit === 'speed53') {machsgv = sgv.toFixed(3);};
                    // if (stringFromToUnit === 'speed54') {machsgv = sgv.toFixed(3);};
                    // if (stringFromToUnit === 'speed55') {machsgv = sgv.toFixed(3);};
                    // Normal Caltulations
                    if (stringFromToUnit === 'speed00') { speed = `${sgv} m/s ${convert.is} ${sgv * 1} m/s` } else 
                    if (stringFromToUnit === 'speed01') { speed = `${sgv} m/s ${convert.is} ${sgv * 3.6} km/h` } else 
                    if (stringFromToUnit === 'speed02') { speed = `${sgv} m/s ${convert.is} ${sgv / 0.44704} mph` } else 
                    if (stringFromToUnit === 'speed03') { speed = `${sgv} m/s ${convert.is} ${sgv / 0.5144444444} knot` } else 
                    if (stringFromToUnit === 'speed04') { speed = `${sgv} m/s ${convert.is} ${sgv / 0.3048} ft/s` } else 
                    // if (stringFromToUnit === 'speed05') { speed = `${sgv} m/s ${convert.is} Mach ${machsgv.toFixed(3)}` } else 
                    if (stringFromToUnit === 'speed10') { speed = `${sgv} km/h ${convert.is} ${sgv / 3.6} m/s` } else 
                    if (stringFromToUnit === 'speed11') { speed = `${sgv} km/h ${convert.is} ${sgv * 1} km/h` } else 
                    if (stringFromToUnit === 'speed12') { speed = `${sgv} km/h ${convert.is} ${sgv / 1.609344} mph` } else 
                    if (stringFromToUnit === 'speed13') { speed = `${sgv} km/h ${convert.is} ${sgv / 1.852} knot` } else 
                    if (stringFromToUnit === 'speed14') { speed = `${sgv} km/h ${convert.is} ${sgv / 1.09728} ft/s` } else 
                    // if (stringFromToUnit === 'speed15') { speed = `${sgv} km/h ${convert.is} Mach ${machsgv}` } else 
                    // if (stringFromToUnit === 'speed15') { speed = `${sgv} km/h ${convert.is} Mach ${machsgv.toFixed(3)}` } else 
                    if (stringFromToUnit === 'speed20') { speed = `${sgv} mph ${convert.is} ${sgv * 0.44704} m/s` } else 
                    if (stringFromToUnit === 'speed21') { speed = `${sgv} mph ${convert.is} ${sgv * 1.609344} km/h` } else 
                    if (stringFromToUnit === 'speed22') { speed = `${sgv} mph ${convert.is} ${sgv * 1} mph`} else 
                    if (stringFromToUnit === 'speed23') { speed = `${sgv} mph ${convert.is} ${sgv / 1.150779448} knot` } else 
                    if (stringFromToUnit === 'speed24') { speed = `${sgv} mph ${convert.is} ${sgv * 1.4666666667} ft/s` } else 
                    // if (stringFromToUnit === 'speed25') { speed = `${sgv} mph ${convert.is} Mach ${machsgv.toFixed(3)}` } else 
                    if (stringFromToUnit === 'speed30') { speed = `${sgv} knot ${convert.is} ${sgv * 0.5144444444} m/s` } else 
                    if (stringFromToUnit === 'speed31') { speed = `${sgv} knot ${convert.is} ${sgv * 1.852} km/h` } else 
                    if (stringFromToUnit === 'speed32') { speed = `${sgv} knot ${convert.is} ${sgv * 1.150779448} mph` } else 
                    if (stringFromToUnit === 'speed33') { speed = `${sgv} knot ${convert.is} ${sgv * 1} knot` } else 
                    if (stringFromToUnit === 'speed34') { speed = `${sgv} knot ${convert.is} ${sgv * 1.6878098571} ft/s` } else 
                    // if (stringFromToUnit === 'speed35') { speed = `${sgv} knot ${convert.is} Mach ${machsgv.toFixed(3)}` } else 
                    if (stringFromToUnit === 'speed40') { speed = `${sgv} ft/s ${convert.is} ${sgv * 0.3048} m/s` } else 
                    if (stringFromToUnit === 'speed41') { speed = `${sgv} ft/s ${convert.is} ${sgv * 1.09728} km/h` } else 
                    if (stringFromToUnit === 'speed42') { speed = `${sgv} ft/s ${convert.is} ${sgv / 1.4666666667} mph` } else 
                    if (stringFromToUnit === 'speed43') { speed = `${sgv} ft/s ${convert.is} ${sgv / 1.6878098571} knot` } else 
                    if (stringFromToUnit === 'speed44') { speed = `${sgv} ft/s ${convert.is} ${sgv * 1} ft/s` } else 
                    // if (stringFromToUnit === 'speed45') { speed = `${sgv} ft/s ${convert.is} Mach ${machsgv.toFixed(3)}` } else 
                    // if (stringFromToUnit === 'speed50') { speed = `Mach ${sgv.toFixed(3)} ${convert.is} ${machsgv.toFixed(3)} m/s` } else 
                    // if (stringFromToUnit === 'speed51') { speed = `Mach ${sgv.toFixed(3)} ${convert.is} ${machsgv.toFixed(3)} km/h` } else 
                    // if (stringFromToUnit === 'speed52') { speed = `Mach ${sgv.toFixed(3)} ${convert.is} ${machsgv.toFixed(3)} mph` } else 
                    // if (stringFromToUnit === 'speed53') { speed = `Mach ${sgv.toFixed(3)} ${convert.is} ${machsgv.toFixed(3)} knot` } else 
                    // if (stringFromToUnit === 'speed54') { speed = `Mach ${sgv.toFixed(3)} ${convert.is} ${machsgv.toFixed(3)} ft/s` } else 
                    // if (stringFromToUnit === 'speed55') { speed = `Mach ${sgv.toFixed(3)} ${convert.is} Mach ${sgv.toFixed(3)}` } else 
                    { speed = `${convert.calcerrordev}` };
                    if (speed === undefined || speed === null || speed === '') {
                        speed = `${convert.calcerrorvalue}`;
                    };
                    let stringSpeed = speed.toString();

                    await interaction.reply({ content: stringSpeed });
                };
            } else {
                await interaction.reply({ content: `${lang.error.cmdoff}`, ephemeral: true });
            };
        } else {
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'convert\' returned \'null / undefined\'.`);
        };
    },
};