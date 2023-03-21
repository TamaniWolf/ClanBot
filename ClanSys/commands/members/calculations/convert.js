
const Discord = require('discord.js');
const { SlashCommandBuilder } = Discord;
const math = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('convert')
        .setDescription('convert units to other units.')
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
                            { name: 'Milliard', value: 'milliard' },
                            { name: 'Billion', value: 'billion' },
                            { name: 'Billiard', value: 'billiard' },
                            { name: 'Trillion', value: 'trillion' },
                            { name: 'Trilliard', value: 'trilliard' },
                            { name: 'Quadrillion', value: 'quadrillion' },
                            { name: 'Quadrilliard', value: 'quadrilliard' },
                            { name: 'Quintilion', value: 'quintilion' },
                            { name: 'Quintilliard', value: 'quintilliard' },
                            { name: 'Sextillion', value: 'sextillion' },
                            { name: 'Septillion', value: 'septillion' },
                            { name: 'Octillion', value: 'octillion' },
                            { name: 'Nonillion', value: 'nonillion' },
                            { name: 'Decillion', value: 'decillion' },
                            { name: 'Undecillion', value: 'undecillion' },
                        )
                )
        )
        ,
    prefix: 'true',    // Prefix = 'true', No Prefix = 'false', Slash Command = '/'.
    nsfw: 'false',       // NSFW variable = 'true', No NSFW variable = 'false'.
    admin: 'false',      // Admin Command = 'true', No Admin Command = 'false'.
    async execute(interaction) {
        if (interaction != null || interaction.channel.id != null || interaction.guild.id != null) {
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
            if (dataCommandMember.Convert === 'true') {
                // Help
                if (interaction.options.getSubcommand() === 'help') {
                    let help;
                    help = `\`\`\`\nconvert - Commands relating to convert.\n    ⤷ length      - Convert one length unit to another length unit.\n    ⤷ temperature - Convert one temperature unit to another temperature unit.\n    ⤷ area        - Convert one area unit to another area unit.\n    ⤷ volume      - Convert one volume unit to another volume unit.\n    ⤷ weight      - Convert one weight unit to another weight unit.\n    ⤷ time        - Convert one time unit to another time unit.  ⤷ number      - convert Short and Long Scale with another.\nMore on our GitHub Wiki: https://github.com/TamaniWolf/ClanBot/wiki/Commands#convert\n\`\`\``;
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
                    if (stringFromToUnit === 'length00') { length = `${sgv} m is ` + sgv * 1 + ' m.' } else 
                    if (stringFromToUnit === 'length01') { length = `${sgv} m is ` + sgv / 1000 + ' km.' } else 
                    if (stringFromToUnit === 'length02') { length = `${sgv} m is ` + sgv * 100 + ' cm.' } else 
                    if (stringFromToUnit === 'length03') { length = `${sgv} m is ` + sgv * 1000 + ' mm.' } else 
                    if (stringFromToUnit === 'length04') { length = `${sgv} m is ` + sgv / 9.46073047258E+15 + ' ly.' } else 
                    if (stringFromToUnit === 'length05') { length = `${sgv} m is ` + sgv / 0.0254 + ' in.' } else 
                    if (stringFromToUnit === 'length06') { length = `${sgv} m is ` + sgv / 0.3048 + ' ft.' } else 
                    if (stringFromToUnit === 'length07') { length = `${sgv} m is ` + sgv / 0.9144 + ' yd.' } else 
                    if (stringFromToUnit === 'length08') { length = `${sgv} m is ` + sgv / 1609.344 + ' mi.'} else 
                    if (stringFromToUnit === 'length09') { length = `${sgv} m is ` + sgv / 1852 + ' nautical mile.' } else 
                    
                    if (stringFromToUnit === 'length10') { length = `${sgv} km is ` + sgv * 1000 + ' m.' } else 
                    if (stringFromToUnit === 'length11') { length = `${sgv} km is ` + sgv * 1 + ' km.' } else 
                    if (stringFromToUnit === 'length12') { length = `${sgv} km is ` + sgv * 100000 + ' cm.' } else 
                    if (stringFromToUnit === 'length13') { length = `${sgv} km is ` + sgv * 1000000 + ' mm.' } else 
                    if (stringFromToUnit === 'length14') { length = `${sgv} km is ` + sgv / 9460730472580 + ' ly.' } else 
                    if (stringFromToUnit === 'length15') { length = `${sgv} km is ` + sgv / 2.54E-5 + ' in.' } else 
                    if (stringFromToUnit === 'length16') { length = `${sgv} km is ` + sgv / 0.0003048 + ' ft.' } else 
                    if (stringFromToUnit === 'length17') { length = `${sgv} km is ` + sgv / 0.0009144 + ' yd.' } else 
                    if (stringFromToUnit === 'length18') { length = `${sgv} km is ` + sgv / 1.609344 + ' mi.' } else 
                    if (stringFromToUnit === 'length19') { length = `${sgv} km is ` + sgv / 1.852 + ' nautical mile.' } else 
                    
                    if (stringFromToUnit === 'length20') { length = `${sgv} cm is ` + sgv / 100 + ' m.' } else 
                    if (stringFromToUnit === 'length21') { length = `${sgv} cm is ` + sgv / 100000 + ' km.' } else 
                    if (stringFromToUnit === 'length22') { length = `${sgv} cm is ` + sgv * 1 + ' cm.' } else 
                    if (stringFromToUnit === 'length23') { length = `${sgv} cm is ` + sgv * 10 + ' mm.' } else 
                    if (stringFromToUnit === 'length24') { length = `${sgv} cm is ` + sgv / 9.46073047258E+17 + ' ly.' } else 
                    if (stringFromToUnit === 'length25') { length = `${sgv} cm is ` + sgv / 2.54 + ' in.' } else 
                    if (stringFromToUnit === 'length26') { length = `${sgv} cm is ` + sgv / 30.48 + ' ft.' } else 
                    if (stringFromToUnit === 'length27') { length = `${sgv} cm is ` + sgv / 91.44 + ' yd.' } else 
                    if (stringFromToUnit === 'length28') { length = `${sgv} cm is ` + sgv / 160934.4 + ' mi.' } else 
                    if (stringFromToUnit === 'length29') { length = `${sgv} cm is ` + sgv / 185200 + ' nautical mile.' } else 
                    
                    if (stringFromToUnit === 'length30') { length = `${sgv} mm is ` + sgv / 1000 + ' m.' } else 
                    if (stringFromToUnit === 'length31') { length = `${sgv} mm is ` + sgv / 1000000 + ' km.' } else 
                    if (stringFromToUnit === 'length32') { length = `${sgv} mm is ` + sgv / 10 + ' cm.' } else 
                    if (stringFromToUnit === 'length33') { length = `${sgv} mm is ` + sgv * 1 + ' mm.' } else 
                    if (stringFromToUnit === 'length34') { length = `${sgv} mm is ` + sgv / 9.46073047258E+18 + ' ly.' } else 
                    if (stringFromToUnit === 'length35') { length = `${sgv} mm is ` + sgv / 25.4 + ' in.' } else 
                    if (stringFromToUnit === 'length36') { length = `${sgv} mm is ` + sgv / 304.8 + ' ft.' } else 
                    if (stringFromToUnit === 'length37') { length = `${sgv} mm is ` + sgv / 914.4 + ' yd.' } else 
                    if (stringFromToUnit === 'length38') { length = `${sgv} mm is ` + sgv / 1609344 + ' mi.' } else 
                    if (stringFromToUnit === 'length39') { length = `${sgv} mm is ` + sgv / 1852000 + ' nautical mile.' } else 
                    
                    if (stringFromToUnit === 'length40') { length = `${sgv} ly is ` + sgv * 9.46073047258E+15 + ' m.' } else 
                    if (stringFromToUnit === 'length41') { length = `${sgv} ly is ` + sgv * 9460730472580 + ' km.' } else 
                    if (stringFromToUnit === 'length42') { length = `${sgv} ly is ` + sgv * 9.46073047258E+17 + ' cm.' } else 
                    if (stringFromToUnit === 'length43') { length = `${sgv} ly is ` + sgv * 9.46073047258E+18 + ' mm.' } else 
                    if (stringFromToUnit === 'length44') { length = `${sgv} ly is ` + sgv * 1 + ' ly.' } else 
                    if (stringFromToUnit === 'length45') { length = `${sgv} ly is ` + sgv * 3.7246970364488E+17 + ' in.' } else 
                    if (stringFromToUnit === 'length46') { length = `${sgv} ly is ` + sgv * 3.1039141970407E+16 + ' ft.' } else 
                    if (stringFromToUnit === 'length47') { length = `${sgv} ly is ` + sgv * 1.0346380656802E+16 + ' yd.' } else 
                    if (stringFromToUnit === 'length48') { length = `${sgv} ly is ` + sgv * 5878625373183.1 + ' mi.' } else 
                    if (stringFromToUnit === 'length49') { length = `${sgv} ly is ` + sgv * 5108385784330.5 + ' nautical mile.' } else 
                    
                    if (stringFromToUnit === 'length50') { length = `${sgv} in is ` + sgv * 0.0254 + ' m.' } else 
                    if (stringFromToUnit === 'length51') { length = `${sgv} in is ` + sgv * 2.54E-5 + ' km.' } else 
                    if (stringFromToUnit === 'length52') { length = `${sgv} in is ` + sgv * 2.54 + ' cm.' } else 
                    if (stringFromToUnit === 'length53') { length = `${sgv} in is ` + sgv * 25.4 + ' mm.' } else 
                    if (stringFromToUnit === 'length54') { length = `${sgv} in is ` + sgv / 3.7246970364488E+17 + ' ly.' } else 
                    if (stringFromToUnit === 'length55') { length = `${sgv} in is ` + sgv * 1 + ' in.' } else 
                    if (stringFromToUnit === 'length56') { length = `${sgv} in is ` + sgv / 12 + ' ft.' } else 
                    if (stringFromToUnit === 'length57') { length = `${sgv} in is ` + sgv / 36 + ' yd.' } else 
                    if (stringFromToUnit === 'length58') { length = `${sgv} in is ` + sgv / 63360 + ' mi.' } else 
                    if (stringFromToUnit === 'length59') { length = `${sgv} in is ` + sgv * 1.37149E-5 + ' nautical mile.' } else 
                    
                    if (stringFromToUnit === 'length60') { length = `${sgv} ft is ` + sgv * 0.3048 + ' m.' } else 
                    if (stringFromToUnit === 'length61') { length = `${sgv} ft is ` + sgv * 0.0003048 + ' km.' } else 
                    if (stringFromToUnit === 'length62') { length = `${sgv} ft is ` + sgv * 30.48 + ' cm.' } else 
                    if (stringFromToUnit === 'length63') { length = `${sgv} ft is ` + sgv * 304.8 + ' mm.' } else 
                    if (stringFromToUnit === 'length64') { length = `${sgv} ft is ` + sgv / 3.1039141970407E+16 + ' ly.' } else 
                    if (stringFromToUnit === 'length65') { length = `${sgv} ft is ` + sgv * 12 + ' in.' } else 
                    if (stringFromToUnit === 'length66') { length = `${sgv} ft is ` + sgv * 1 + ' ft.' } else 
                    if (stringFromToUnit === 'length67') { length = `${sgv} ft is ` + sgv / 3 + ' yd.' } else 
                    if (stringFromToUnit === 'length68') { length = `${sgv} ft is ` + sgv / 5280 + ' mi.' } else 
                    if (stringFromToUnit === 'length69') { length = `${sgv} ft is ` + sgv * 0.0001645788 + ' nautical mile.' } else 
                    
                    if (stringFromToUnit === 'length70') { length = `${sgv} yd is ` + sgv * 0.9144 + ' m.' } else 
                    if (stringFromToUnit === 'length71') { length = `${sgv} yd is ` + sgv * 0.0009144 + ' km.' } else 
                    if (stringFromToUnit === 'length72') { length = `${sgv} yd is ` + sgv * 91.44 + ' cm.' } else 
                    if (stringFromToUnit === 'length73') { length = `${sgv} yd is ` + sgv * 914.4 + ' mm.' } else 
                    if (stringFromToUnit === 'length74') { length = `${sgv} yd is ` + sgv / 1.0346380656802E+16 + ' ly.' } else 
                    if (stringFromToUnit === 'length75') { length = `${sgv} yd is ` + sgv * 36 + ' in.' } else 
                    if (stringFromToUnit === 'length76') { length = `${sgv} yd is ` + sgv * 3 + ' ft.' } else 
                    if (stringFromToUnit === 'length77') { length = `${sgv} yd is ` + sgv * 1 + ' yd.' } else 
                    if (stringFromToUnit === 'length78') { length = `${sgv} yd is ` + sgv / 1760 + ' mi.' } else 
                    if (stringFromToUnit === 'length79') { length = `${sgv} yd is ` + sgv / 2025.3718285214 + ' nautical mile.' } else 
                    
                    if (stringFromToUnit === 'length80') { length = `${sgv} mi is ` + sgv * 1609.344 + ' m.' } else 
                    if (stringFromToUnit === 'length81') { length = `${sgv} mi is ` + sgv * 1.609344 + ' km.' } else 
                    if (stringFromToUnit === 'length82') { length = `${sgv} mi is ` + sgv * 160934.4 + ' cm.' } else 
                    if (stringFromToUnit === 'length83') { length = `${sgv} mi is ` + sgv * 1609344 + ' mm.' } else 
                    if (stringFromToUnit === 'length84') { length = `${sgv} mi is ` + sgv / 5878625373183.1 + ' ly.' } else 
                    if (stringFromToUnit === 'length85') { length = `${sgv} mi is ` + sgv * 63360 + ' in.' } else 
                    if (stringFromToUnit === 'length86') { length = `${sgv} mi is ` + sgv * 5280 + ' ft.' } else 
                    if (stringFromToUnit === 'length87') { length = `${sgv} mi is ` + sgv * 1760 + ' yd.' } else 
                    if (stringFromToUnit === 'length88') { length = `${sgv} mi is ` + sgv * 1 + ' mi.' } else 
                    if (stringFromToUnit === 'length89') { length = `${sgv} mi is ` + sgv * 0.8689762419 + ' nautical mile.' } else 
                    
                    if (stringFromToUnit === 'length90') { length = `${sgv} nautical mile is ` + sgv * 1852 + ' m.' } else 
                    if (stringFromToUnit === 'length91') { length = `${sgv} nautical mile is ` + sgv * 1.852 + ' km.' } else 
                    if (stringFromToUnit === 'length92') { length = `${sgv} nautical mile is ` + sgv * 185200 + ' cm.' } else 
                    if (stringFromToUnit === 'length93') { length = `${sgv} nautical mile is ` + sgv * 1852000 + ' mm.' } else 
                    if (stringFromToUnit === 'length94') { length = `${sgv} nautical mile is ` + sgv / 5108385784330.5 + ' ly.' } else 
                    if (stringFromToUnit === 'length95') { length = `${sgv} nautical mile is ` + sgv / 1.37149E-5 + ' in.' } else 
                    if (stringFromToUnit === 'length96') { length = `${sgv} nautical mile is ` + sgv * 6076.1154855643 + ' ft.' } else 
                    if (stringFromToUnit === 'length97') { length = `${sgv} nautical mile is ` + sgv * 2025.3718285214 + ' yd.' } else 
                    if (stringFromToUnit === 'length98') { length = `${sgv} nautical mile is ` + sgv * 1.150779448 + ' mi.' } else 
                    if (stringFromToUnit === 'length99') { length = `${sgv} nautical mile is ` + sgv * 1 + ' nautical mile.' } else 
                    { length = 'There was an calculation error.\nIf this message continues to show up, please contect the developer.' };
                    if (length === undefined || length === null || length === '') {
                        length = 'There was an calculation error. Canging the input value might help here. \nIf this message continues to show up, please contect the developer.'
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
                    if (stringFromToUnit === 'temp00') { temp = `${sgv} K is ${sgv * 1} K` } else 
                    if (stringFromToUnit === 'temp01') { temp = `${sgv} K is ${sgv - 273.15} °C` } else 
                    if (stringFromToUnit === 'temp02') { temp = `${sgv} K is ${sgv * 9/5 - 459.67} °F` } else 
                    if (stringFromToUnit === 'temp03') { temp = `${sgv} K is ${sgv * 9/5} °R` } else 
                    if (stringFromToUnit === 'temp10') { temp = `${sgv} °C is ${(sgv + 273.15)} K` } else 
                    if (stringFromToUnit === 'temp11') { temp = `${sgv} °C is ${sgv * 1} °C` } else 
                    if (stringFromToUnit === 'temp12') { temp = `${sgv} °C is ${sgv * 9/5 + 32} °F` } else 
                    if (stringFromToUnit === 'temp13') { temp = `${sgv} °C is ${(sgv + 273.15) * 9/5} °R` } else 
                    if (stringFromToUnit === 'temp20') { temp = `${sgv} °F is ${(sgv + 459.67) * 5/9} K` } else 
                    if (stringFromToUnit === 'temp21') { temp = `${sgv} °F is ${(sgv - 32) * 5/9} °C` } else 
                    if (stringFromToUnit === 'temp22') { temp = `${sgv} °F is ${sgv * 1} °F` } else 
                    if (stringFromToUnit === 'temp23') { temp = `${sgv} °F is ${(sgv + 459.67)} °R` } else 
                    if (stringFromToUnit === 'temp30') { temp = `${sgv} °R is ${sgv * 5/9} K` } else 
                    if (stringFromToUnit === 'temp31') { temp = `${sgv} °R is ${(sgv - 491.67) * 5/9} °C` } else 
                    if (stringFromToUnit === 'temp32') { temp = `${sgv} °R is ${(sgv - 459.67)} °F`} else 
                    if (stringFromToUnit === 'temp33') { temp = `${sgv} °R is ${sgv * 1} °R` } else 
                    { temp = 'There was an calculation error.\nIf this message continues to show up, please contect the developer.' };
                    if (temp === undefined || temp === null || temp === '') {
                        temp = 'There was an calculation error. Canging the input value might help here. \nIf this message continues to show up, please contect the developer.'
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
                    if (stringFromToUnit === 'area00') { area = `${sgv} m² is ${sgv * 1} m².` } else 
                    if (stringFromToUnit === 'area01') { area = `${sgv} m² is ${sgv / 1000000} km².` } else 
                    if (stringFromToUnit === 'area02') { area = `${sgv} m² is ${sgv * 10000} cm².` } else 
                    if (stringFromToUnit === 'area03') { area = `${sgv} m² is ${sgv * 1000000} mm².` } else 
                    if (stringFromToUnit === 'area04') { area = `${sgv} m² is ${sgv / 0.00064516} in².` } else 
                    if (stringFromToUnit === 'area05') { area = `${sgv} m² is ${sgv / 0.09290304} ft².` } else 
                    if (stringFromToUnit === 'area06') { area = `${sgv} m² is ${sgv / 0.83612736} yd².` } else 
                    if (stringFromToUnit === 'area07') { area = `${sgv} m² is ${sgv / 2589988.110336} mi².` } else 
                    if (stringFromToUnit === 'area08') { area = `${sgv} m² is ${sgv / 4046.8564224} ac.` } else 
                    if (stringFromToUnit === 'area09') { area = `${sgv} m² is ${sgv / 10000} ha.` } else 

                    if (stringFromToUnit === 'area10') { area = `${sgv} km² is ${sgv * 1000000} m².` } else 
                    if (stringFromToUnit === 'area11') { area = `${sgv} km² is ${sgv * 1} km².` } else 
                    if (stringFromToUnit === 'area12') { area = `${sgv} km² is ${sgv * 10000000000} cm².` } else 
                    if (stringFromToUnit === 'area13') { area = `${sgv} km² is ${sgv * 1000000000000} mm².` } else 
                    if (stringFromToUnit === 'area14') { area = `${sgv} km² is ${sgv / 6.4516E-10} in².` } else 
                    if (stringFromToUnit === 'area15') { area = `${sgv} km² is ${sgv / 9.290304E-8} ft².` } else 
                    if (stringFromToUnit === 'area16') { area = `${sgv} km² is ${sgv / 8.3612736E-7} yd².` } else 
                    if (stringFromToUnit === 'area17') { area = `${sgv} km² is ${sgv / 2.5899881103} mi².` } else 
                    if (stringFromToUnit === 'area18') { area = `${sgv} km² is ${sgv * 247.1053814672} ac.` } else 
                    if (stringFromToUnit === 'area19') { area = `${sgv} km² is ${sgv * 100} ha.` } else 

                    if (stringFromToUnit === 'area20') { area = `${sgv} cm² is ${sgv * 10000} m².` } else 
                    if (stringFromToUnit === 'area21') { area = `${sgv} cm² is ${sgv / 10000000000} km².` } else 
                    if (stringFromToUnit === 'area22') { area = `${sgv} cm² is ${sgv * 1} cm².` } else 
                    if (stringFromToUnit === 'area23') { area = `${sgv} cm² is ${sgv * 100} mm².` } else 
                    if (stringFromToUnit === 'area24') { area = `${sgv} cm² is ${sgv / 6.4516} in².` } else 
                    if (stringFromToUnit === 'area25') { area = `${sgv} cm² is ${sgv / 929.0304} ft².` } else 
                    if (stringFromToUnit === 'area26') { area = `${sgv} cm² is ${sgv / 8361.2736} yd².` } else 
                    if (stringFromToUnit === 'area27') { area = `${sgv} cm² is ${sgv / 25899881103.36} mi².` } else 
                    if (stringFromToUnit === 'area28') { area = `${sgv} cm² is ${sgv / 40468564.224} ac.` } else 
                    if (stringFromToUnit === 'area29') { area = `${sgv} cm² is ${sgv / 100000000} ha.` } else 

                    if (stringFromToUnit === 'area30') { area = `${sgv} mm² is ${sgv / 1000000} m².` } else 
                    if (stringFromToUnit === 'area31') { area = `${sgv} mm² is ${sgv / 1000000000000} km².` } else 
                    if (stringFromToUnit === 'area32') { area = `${sgv} mm² is ${sgv / 100} cm².` } else 
                    if (stringFromToUnit === 'area33') { area = `${sgv} mm² is ${sgv * 1} mm².` } else 
                    if (stringFromToUnit === 'area34') { area = `${sgv} mm² is ${sgv / 645.16} in².` } else 
                    if (stringFromToUnit === 'area35') { area = `${sgv} mm² is ${sgv / 92903.04} ft².` } else 
                    if (stringFromToUnit === 'area36') { area = `${sgv} mm² is ${sgv / 836127.36} yd².` } else 
                    if (stringFromToUnit === 'area37') { area = `${sgv} mm² is ${sgv / 2589988110336} mi².` } else 
                    if (stringFromToUnit === 'area38') { area = `${sgv} mm² is ${sgv / 4046856422.4} ac.` } else 
                    if (stringFromToUnit === 'area39') { area = `${sgv} mm² is ${sgv / 10000000000} ha.` } else 

                    if (stringFromToUnit === 'area40') { area = `${sgv} in² is ${sgv * 0.00064516} m².` } else 
                    if (stringFromToUnit === 'area41') { area = `${sgv} in² is ${sgv * 6.4516E-10} km².` } else 
                    if (stringFromToUnit === 'area42') { area = `${sgv} in² is ${sgv * 6.4516} cm².` } else 
                    if (stringFromToUnit === 'area43') { area = `${sgv} in² is ${sgv * 645.16} mm².` } else 
                    if (stringFromToUnit === 'area44') { area = `${sgv} in² is ${sgv * 1} in².` } else 
                    if (stringFromToUnit === 'area45') { area = `${sgv} in² is ${sgv / 144} ft².` } else 
                    if (stringFromToUnit === 'area46') { area = `${sgv} in² is ${sgv / 1296} yd².` } else 
                    if (stringFromToUnit === 'area47') { area = `${sgv} in² is ${sgv / 4014489600} mi².` } else 
                    if (stringFromToUnit === 'area48') { area = `${sgv} in² is ${sgv / 6272640} ac.` } else 
                    if (stringFromToUnit === 'area49') { area = `${sgv} in² is ${sgv * 6.4516E-8} ha.` } else 

                    if (stringFromToUnit === 'area50') { area = `${sgv} ft² is ${sgv * 0.09290304} m².` } else 
                    if (stringFromToUnit === 'area51') { area = `${sgv} ft² is ${sgv * 9.290304E-8} km².` } else 
                    if (stringFromToUnit === 'area52') { area = `${sgv} ft² is ${sgv * 929.0304} cm².` } else 
                    if (stringFromToUnit === 'area53') { area = `${sgv} ft² is ${sgv * 92903.04} mm².` } else 
                    if (stringFromToUnit === 'area54') { area = `${sgv} ft² is ${sgv * 144} in².` } else 
                    if (stringFromToUnit === 'area55') { area = `${sgv} ft² is ${sgv * 1} ft².` } else 
                    if (stringFromToUnit === 'area56') { area = `${sgv} ft² is ${sgv / 9} yd².` } else 
                    if (stringFromToUnit === 'area57') { area = `${sgv} ft² is ${sgv / 27878400} mi².` } else 
                    if (stringFromToUnit === 'area58') { area = `${sgv} ft² is ${sgv / 43560} ac.` } else 
                    if (stringFromToUnit === 'area59') { area = `${sgv} ft² is ${sgv * 9.290304E-6} ha.` } else 

                    if (stringFromToUnit === 'area60') { area = `${sgv} yd² is ${sgv * 0.83612736} m².` } else 
                    if (stringFromToUnit === 'area61') { area = `${sgv} yd² is ${sgv * 8.3612736E-7} km².` } else 
                    if (stringFromToUnit === 'area62') { area = `${sgv} yd² is ${sgv * 8361.2736} cm².` } else 
                    if (stringFromToUnit === 'area63') { area = `${sgv} yd² is ${sgv * 836127.36} mm².` } else 
                    if (stringFromToUnit === 'area64') { area = `${sgv} yd² is ${sgv * 1296} in².` } else 
                    if (stringFromToUnit === 'area65') { area = `${sgv} yd² is ${sgv * 9} ft².` } else 
                    if (stringFromToUnit === 'area66') { area = `${sgv} yd² is ${sgv * 1} yd².` } else 
                    if (stringFromToUnit === 'area67') { area = `${sgv} yd² is ${sgv / 3097600} mi².` } else 
                    if (stringFromToUnit === 'area68') { area = `${sgv} yd² is ${sgv / 4840} ac.` } else 
                    if (stringFromToUnit === 'area69') { area = `${sgv} yd² is ${sgv * 8.36127E-5} ha.` } else 

                    if (stringFromToUnit === 'area70') { area = `${sgv} mi² is ${sgv * 2589988.110336} m².` } else 
                    if (stringFromToUnit === 'area71') { area = `${sgv} mi² is ${sgv * 2.5899881103} km².` } else 
                    if (stringFromToUnit === 'area72') { area = `${sgv} mi² is ${sgv * 25899881103.36} cm².` } else 
                    if (stringFromToUnit === 'area73') { area = `${sgv} mi² is ${sgv * 2589988110336} mm².` } else 
                    if (stringFromToUnit === 'area74') { area = `${sgv} mi² is ${sgv * 4014489600} in².` } else 
                    if (stringFromToUnit === 'area75') { area = `${sgv} mi² is ${sgv * 27878400} ft².` } else 
                    if (stringFromToUnit === 'area76') { area = `${sgv} mi² is ${sgv * 3097600} yd².` } else 
                    if (stringFromToUnit === 'area77') { area = `${sgv} mi² is ${sgv * 1} mi².` } else 
                    if (stringFromToUnit === 'area78') { area = `${sgv} mi² is ${sgv * 640} ac.` } else 
                    if (stringFromToUnit === 'area79') { area = `${sgv} mi² is ${sgv * 258.9988110336} ha.` } else 

                    if (stringFromToUnit === 'area80') { area = `${sgv} ac is ${sgv * 4046.8564224} m².` } else 
                    if (stringFromToUnit === 'area81') { area = `${sgv} ac is ${sgv / 247.1053814672} km².` } else 
                    if (stringFromToUnit === 'area82') { area = `${sgv} ac is ${sgv * 40468564.224} cm².` } else 
                    if (stringFromToUnit === 'area83') { area = `${sgv} ac is ${sgv * 4046856422.4} mm².` } else 
                    if (stringFromToUnit === 'area84') { area = `${sgv} ac is ${sgv * 6272640} in².` } else 
                    if (stringFromToUnit === 'area85') { area = `${sgv} ac is ${sgv * 43560} ft².` } else 
                    if (stringFromToUnit === 'area86') { area = `${sgv} ac is ${sgv * 4840} yd².` } else 
                    if (stringFromToUnit === 'area87') { area = `${sgv} ac is ${sgv / 640} mi².` } else 
                    if (stringFromToUnit === 'area88') { area = `${sgv} ac is ${sgv * 1} ac.` } else 
                    if (stringFromToUnit === 'area89') { area = `${sgv} ac is ${sgv / 2.4710538147} ha.` } else 

                    if (stringFromToUnit === 'area90') { area = `${sgv} ha is ${sgv * 10000} m².` } else 
                    if (stringFromToUnit === 'area91') { area = `${sgv} ha is ${sgv / 100} km².` } else 
                    if (stringFromToUnit === 'area92') { area = `${sgv} ha is ${sgv * 100000000} cm².` } else 
                    if (stringFromToUnit === 'area93') { area = `${sgv} ha is ${sgv * 10000000000} mm².` } else 
                    if (stringFromToUnit === 'area94') { area = `${sgv} ha is ${sgv / 6.4516E-8} in².` } else 
                    if (stringFromToUnit === 'area95') { area = `${sgv} ha is ${sgv / 9.290304E-6} ft².` } else 
                    if (stringFromToUnit === 'area96') { area = `${sgv} ha is ${sgv / 8.36127E-5} yd².` } else 
                    if (stringFromToUnit === 'area97') { area = `${sgv} ha is ${sgv / 258.9988110336} mi².` } else 
                    if (stringFromToUnit === 'area98') { area = `${sgv} ha is ${sgv * 2.4710538147} ac.` } else 
                    if (stringFromToUnit === 'area99') { area = `${sgv} ha is ${sgv * 1} ha.` } else 
                    { area = 'There was an calculation error.\nIf this message continues to show up, please contect the developer.' };
                    if (area === undefined || area === null || area === '') {
                        area = 'There was an calculation error. Canging the input value might help here. \nIf this message continues to show up, please contect the developer.'
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
                    let lengthUnitNumberArray = [00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16];
                    // From Unit
                    let resultFromUnit = lengthUnitNumberArray.filter(function(e, i) {
                        return lengthUnitNameArray[i] == stringGetFromUnit;
                    });
                    let stringFromUnit;
                    stringFromUnit = resultFromUnit.toString();
                    if (stringFromUnit.length != '2') {
                        stringFromUnit = `0${stringFromUnit}`;
                    }
                    // To Unit
                    let resultToUnit = lengthUnitNumberArray.filter(function(e, i) {
                        return lengthUnitNameArray[i] == stringGetToUnit;
                    });
                    let stringToUnit;
                    stringToUnit = resultToUnit.toString();
                    if (stringToUnit.length != '2') {
                        stringToUnit = `0${stringToUnit}`;
                    }
                    let stringFromToUnit = 'volume' + stringFromUnit + stringToUnit;
                    // liters L, milliliters ml, pints pt, cups , tablespoons, teaspoons, gallons gal, barrels bbl, fluidounces fl oz, 
                    //   0          1            2       3        4          5         6           7             8           
                    // cubicmeters m³, cubickilometers km³, cubiccentimeters cm³, cubicmillimeters mm³, cubicinches in³, cubicfoots ft³, cubicyards yd³, cubicmiles mi³
                    //     9                 10                   11                     12                  13              14              15              16
                    let volume;
                    let sgv = stringGetValue;
                    if (stringFromToUnit === 'volume0000') { volume = `${sgv} L is ${sgv * 1} L.` } else 
                    if (stringFromToUnit === 'volume0001') { volume = `${sgv} L is ${sgv * 1000} ml.` } else 
                    if (stringFromToUnit === 'volume0002') { volume = `${sgv} L is ${sgv * 2.1133764189} pt.` } else 
                    if (stringFromToUnit === 'volume0003') { volume = `${sgv} L is ${sgv * 4.2267528377} cups.` } else 
                    if (stringFromToUnit === 'volume0004') { volume = `${sgv} L is ${sgv * 67.6280454037} tablespoons.` } else 
                    if (stringFromToUnit === 'volume0005') { volume = `${sgv} L is ${sgv * 202.8841362111} teaspoons.` } else 
                    if (stringFromToUnit === 'volume0006') { volume = `${sgv} L is ${sgv / 3.785411784} gal.` } else 
                    if (stringFromToUnit === 'volume0007') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume0008') { volume = `${sgv} L is ${sgv * 33.8140227018} fl oz.` } else 
                    if (stringFromToUnit === 'volume0009') { volume = `${sgv} L is ${sgv / 1000} m³.` } else 
                    if (stringFromToUnit === 'volume0010') { volume = `${sgv} L is ${sgv / 1000000000000} km³.` } else 
                    if (stringFromToUnit === 'volume0011') { volume = `${sgv} L is ${sgv * 1000} cm³.` } else 
                    if (stringFromToUnit === 'volume0012') { volume = `${sgv} L is ${sgv * 1000000} mm³.` } else 
                    if (stringFromToUnit === 'volume0013') { volume = `${sgv} L is ${sgv * 61.0237440947} in³.` } else 
                    if (stringFromToUnit === 'volume0014') { volume = `${sgv} L is ${sgv / 28.316846592} ft³.` } else 
                    if (stringFromToUnit === 'volume0015') { volume = `${sgv} L is ${sgv / 764.554857984} yd³.` } else 
                    if (stringFromToUnit === 'volume0016') { volume = `${sgv} L is ${sgv / 4168181825440.6} mi³.` } else 

                    if (stringFromToUnit === 'volume0100') { volume = `${sgv} ml is ${sgv / 1000} L.` } else 
                    if (stringFromToUnit === 'volume0101') { volume = `${sgv} ml is ${sgv * 1} ml.` } else 
                    if (stringFromToUnit === 'volume0102') { volume = `${sgv} ml is ${sgv / 473.176473} pt.` } else 
                    if (stringFromToUnit === 'volume0103') { volume = `${sgv} ml is ${sgv / 236.5882365} cups.` } else 
                    if (stringFromToUnit === 'volume0104') { volume = `${sgv} ml is ${sgv / 14.7867647813} tablespoons.` } else 
                    if (stringFromToUnit === 'volume0105') { volume = `${sgv} ml is ${sgv / 4.9289215938} teaspoons.` } else 
                    if (stringFromToUnit === 'volume0106') { volume = `${sgv} ml is ${sgv / 3785.411784} gal.` } else 
                    if (stringFromToUnit === 'volume0107') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume0108') { volume = `${sgv} ml is ${sgv / 29.5735295625} fl oz.` } else 
                    if (stringFromToUnit === 'volume0109') { volume = `${sgv} ml is ${sgv / 1000000} m³.` } else 
                    if (stringFromToUnit === 'volume0110') { volume = `${sgv} ml is ${sgv / 1.0E+15} km³.` } else 
                    if (stringFromToUnit === 'volume0111') { volume = `${sgv} ml is ${sgv * 1} cm³.` } else 
                    if (stringFromToUnit === 'volume0112') { volume = `${sgv} ml is ${sgv * 1000} mm³.` } else 
                    if (stringFromToUnit === 'volume0113') { volume = `${sgv} ml is ${sgv / 16.387064} in³.` } else 
                    if (stringFromToUnit === 'volume0114') { volume = `${sgv} ml is ${sgv / 28316.846592} ft³.` } else 
                    if (stringFromToUnit === 'volume0115') { volume = `${sgv} ml is ${sgv / 764554.857984} yd³.` } else 
                    if (stringFromToUnit === 'volume0116') { volume = `${sgv} ml is ${sgv / 4.1681818254406E+15} mi³.` } else 

                    if (stringFromToUnit === 'volume0200') { volume = `${sgv} pt is ${sgv / 2.1133764189} L.` } else 
                    if (stringFromToUnit === 'volume0201') { volume = `${sgv} pt is ${sgv * 473.176473} ml.` } else 
                    if (stringFromToUnit === 'volume0202') { volume = `${sgv} pt is ${sgv * 1} pt.` } else 
                    if (stringFromToUnit === 'volume0203') { volume = `${sgv} pt is ${sgv * 2} cups.` } else 
                    if (stringFromToUnit === 'volume0204') { volume = `${sgv} pt is ${sgv * 32} tablespoons.` } else 
                    if (stringFromToUnit === 'volume0205') { volume = `${sgv} pt is ${sgv * 96} teaspoons.` } else 
                    if (stringFromToUnit === 'volume0206') { volume = `${sgv} pt is ${sgv / 8} gal.` } else 
                    if (stringFromToUnit === 'volume0207') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume0208') { volume = `${sgv} pt is ${sgv * 16} fl oz.` } else 
                    if (stringFromToUnit === 'volume0209') { volume = `${sgv} pt is ${sgv / 2113.3764188652} m³.` } else 
                    if (stringFromToUnit === 'volume0210') { volume = `${sgv} pt is ${sgv / 2113376418865.2} km³.` } else 
                    if (stringFromToUnit === 'volume0211') { volume = `${sgv} pt is ${sgv * 473.176473} cm³.` } else 
                    if (stringFromToUnit === 'volume0212') { volume = `${sgv} pt is ${sgv * 473176.473} mm³.` } else 
                    if (stringFromToUnit === 'volume0213') { volume = `${sgv} pt is ${sgv * 28.875} in³.` } else 
                    if (stringFromToUnit === 'volume0214') { volume = `${sgv} pt is ${sgv / 59.8441558442} ft³.` } else 
                    if (stringFromToUnit === 'volume0215') { volume = `${sgv} pt is ${sgv / 1615.7922077922} yd³.` } else 
                    if (stringFromToUnit === 'volume0216') { volume = `${sgv} pt is ${sgv / 8808937179428.6} mi³.` } else 

                    if (stringFromToUnit === 'volume0300') { volume = `${sgv} cups is ${sgv / 4.2267528377} L.` } else 
                    if (stringFromToUnit === 'volume0301') { volume = `${sgv} cups is ${sgv * 236.5882365} ml.` } else 
                    if (stringFromToUnit === 'volume0302') { volume = `${sgv} cups is ${sgv / 2} pt.` } else 
                    if (stringFromToUnit === 'volume0303') { volume = `${sgv} cups is ${sgv * 1} cups.` } else 
                    if (stringFromToUnit === 'volume0304') { volume = `${sgv} cups is ${sgv * 16} tablespoons.` } else 
                    if (stringFromToUnit === 'volume0305') { volume = `${sgv} cups is ${sgv * 48} teaspoons.` } else 
                    if (stringFromToUnit === 'volume0306') { volume = `${sgv} cups is ${sgv / 16} gal.` } else 
                    if (stringFromToUnit === 'volume0307') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume0308') { volume = `${sgv} cups is ${sgv * 8} fl oz.` } else 
                    if (stringFromToUnit === 'volume0309') { volume = `${sgv} cups is ${sgv / 4226.7528377304} m³.` } else 
                    if (stringFromToUnit === 'volume0310') { volume = `${sgv} cups is ${sgv / 4226752837730.4} km³.` } else 
                    if (stringFromToUnit === 'volume0311') { volume = `${sgv} cups is ${sgv * 236.5882365} cm³.` } else 
                    if (stringFromToUnit === 'volume0312') { volume = `${sgv} cups is ${sgv * 236588.2365} mm³.` } else 
                    if (stringFromToUnit === 'volume0313') { volume = `${sgv} cups is ${sgv * 14.4375} in³.` } else 
                    if (stringFromToUnit === 'volume0314') { volume = `${sgv} cups is ${sgv / 119.6883116883} ft³.` } else 
                    if (stringFromToUnit === 'volume0315') { volume = `${sgv} cups is ${sgv / 3231.5844155844} yd³.` } else 
                    if (stringFromToUnit === 'volume0316') { volume = `${sgv} cups is ${sgv / 17617874358857} mi³.` } else 

                    if (stringFromToUnit === 'volume0400') { volume = `${sgv} tablespoons is ${sgv / 67.6280454037} L.` } else 
                    if (stringFromToUnit === 'volume0401') { volume = `${sgv} tablespoons is ${sgv * 14.7867647813} ml.` } else 
                    if (stringFromToUnit === 'volume0402') { volume = `${sgv} tablespoons is ${sgv / 32} pt.` } else 
                    if (stringFromToUnit === 'volume0403') { volume = `${sgv} tablespoons is ${sgv / 16} cups.` } else 
                    if (stringFromToUnit === 'volume0404') { volume = `${sgv} tablespoons is ${sgv * 1} tablespoons.` } else 
                    if (stringFromToUnit === 'volume0405') { volume = `${sgv} tablespoons is ${sgv * 3} teaspoons.` } else 
                    if (stringFromToUnit === 'volume0406') { volume = `${sgv} tablespoons is ${sgv / 256} gal.` } else 
                    if (stringFromToUnit === 'volume0407') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume0408') { volume = `${sgv} tablespoons is ${sgv / 2} fl oz.` } else 
                    if (stringFromToUnit === 'volume0409') { volume = `${sgv} tablespoons is ${sgv * 1.47868E-5} m³.` } else 
                    if (stringFromToUnit === 'volume0410') { volume = `${sgv} tablespoons is ${sgv / 67628045403686} km³.` } else 
                    if (stringFromToUnit === 'volume0411') { volume = `${sgv} tablespoons is ${sgv * 14.7867647813} cm³.` } else 
                    if (stringFromToUnit === 'volume0412') { volume = `${sgv} tablespoons is ${sgv / 6.7628E-5} mm³.` } else 
                    if (stringFromToUnit === 'volume0413') { volume = `${sgv} tablespoons is ${sgv * 0.90234375} in³.` } else 
                    if (stringFromToUnit === 'volume0414') { volume = `${sgv} tablespoons is ${sgv * 0.0005221897} ft³.` } else 
                    if (stringFromToUnit === 'volume0415') { volume = `${sgv} tablespoons is ${sgv * 1.93404E-5} yd³.` } else 
                    if (stringFromToUnit === 'volume0416') { volume = `${sgv} tablespoons is ${sgv * 3.5475335291274E-15} mi³.` } else 

                    if (stringFromToUnit === 'volume0500') { volume = `${sgv} teaspoons is ${sgv / 202.8841362111} L.` } else 
                    if (stringFromToUnit === 'volume0501') { volume = `${sgv} teaspoons is ${sgv * 4.9289215938} ml.` } else 
                    if (stringFromToUnit === 'volume0502') { volume = `${sgv} teaspoons is ${sgv / 96} pt.` } else 
                    if (stringFromToUnit === 'volume0503') { volume = `${sgv} teaspoons is ${sgv / 48} cups.` } else 
                    if (stringFromToUnit === 'volume0504') { volume = `${sgv} teaspoons is ${sgv / 3} tablespoons.` } else 
                    if (stringFromToUnit === 'volume0505') { volume = `${sgv} teaspoons is ${sgv * 1} teaspoons.` } else 
                    if (stringFromToUnit === 'volume0506') { volume = `${sgv} teaspoons is ${sgv / 768} gal.` } else 
                    if (stringFromToUnit === 'volume0507') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume0508') { volume = `${sgv} teaspoons is ${sgv * 6} fl oz.` } else 
                    if (stringFromToUnit === 'volume0509') { volume = `${sgv} teaspoons is ${sgv / 202884.13621106} m³.` } else 
                    if (stringFromToUnit === 'volume0510') { volume = `${sgv} teaspoons is ${sgv * 4.92892159375E-15} km³.` } else 
                    if (stringFromToUnit === 'volume0511') { volume = `${sgv} teaspoons is ${sgv * 4.9289215938} cm³.` } else 
                    if (stringFromToUnit === 'volume0512') { volume = `${sgv} teaspoons is ${sgv * 4928.92159375} mm³.` } else 
                    if (stringFromToUnit === 'volume0513') { volume = `${sgv} teaspoons is ${sgv * 0.30078125} in³.` } else 
                    if (stringFromToUnit === 'volume0514') { volume = `${sgv} teaspoons is ${sgv * 0.0001740632} ft³.` } else 
                    if (stringFromToUnit === 'volume0515') { volume = `${sgv} teaspoons is ${sgv / 155116.05194805} yd³.` } else 
                    if (stringFromToUnit === 'volume0516') { volume = `${sgv} teaspoons is ${sgv * 1.1825111763758E-15} mi³.` } else 

                    if (stringFromToUnit === 'volume0600') { volume = `${sgv} gal is ${sgv * 3.785411784} L.` } else 
                    if (stringFromToUnit === 'volume0601') { volume = `${sgv} gal is ${sgv * 3785.411784} ml.` } else 
                    if (stringFromToUnit === 'volume0602') { volume = `${sgv} gal is ${sgv * 8} pt.` } else 
                    if (stringFromToUnit === 'volume0603') { volume = `${sgv} gal is ${sgv * 16} cups.` } else 
                    if (stringFromToUnit === 'volume0604') { volume = `${sgv} gal is ${sgv * 256} tablespoons.` } else 
                    if (stringFromToUnit === 'volume0605') { volume = `${sgv} gal is ${sgv * 768} teaspoons.` } else 
                    if (stringFromToUnit === 'volume0606') { volume = `${sgv} gal is ${sgv * 1} gal.` } else 
                    if (stringFromToUnit === 'volume0607') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume0608') { volume = `${sgv} gal is ${sgv * 128} fl oz.` } else 
                    if (stringFromToUnit === 'volume0609') { volume = `${sgv} gal is ${sgv * 0.0037854118} m³.` } else 
                    if (stringFromToUnit === 'volume0610') { volume = `${sgv} gal is ${sgv * 3.785411784E-12} km³.` } else 
                    if (stringFromToUnit === 'volume0611') { volume = `${sgv} gal is ${sgv * 3785.411784} cm³.` } else 
                    if (stringFromToUnit === 'volume0612') { volume = `${sgv} gal is ${sgv * 3785411.784} mm³.` } else 
                    if (stringFromToUnit === 'volume0613') { volume = `${sgv} gal is ${sgv * 231} in³.` } else 
                    if (stringFromToUnit === 'volume0614') { volume = `${sgv} gal is ${sgv * 0.1336805556} ft³.` } else 
                    if (stringFromToUnit === 'volume0615') { volume = `${sgv} gal is ${sgv * 0.0049511317} yd³.` } else 
                    if (stringFromToUnit === 'volume0616') { volume = `${sgv} gal is ${sgv * 9.0816858345662E-13} mi³.` } else 

                    if (stringFromToUnit === 'volume0700' || stringFromToUnit === 'volume0701' 
                    || stringFromToUnit === 'volume0702' || stringFromToUnit === 'volume0703' 
                    || stringFromToUnit === 'volume0704' || stringFromToUnit === 'volume0705' 
                    || stringFromToUnit === 'volume0706' || stringFromToUnit === 'volume0707' 
                    || stringFromToUnit === 'volume0708' || stringFromToUnit === 'volume0709' 
                    || stringFromToUnit === 'volume0710' || stringFromToUnit === 'volume0711' 
                    || stringFromToUnit === 'volume0712' || stringFromToUnit === 'volume0713' 
                    || stringFromToUnit === 'volume0714' || stringFromToUnit === 'volume0715' 
                    || stringFromToUnit === 'volume0716') { volume = `There are to many Barrel Units.` } else 

                    if (stringFromToUnit === 'volume0800') { volume = `${sgv} fl oz is ${sgv * 0.0295735296} L.` } else 
                    if (stringFromToUnit === 'volume0801') { volume = `${sgv} fl oz is ${sgv * 29.5735295625} ml.` } else 
                    if (stringFromToUnit === 'volume0802') { volume = `${sgv} fl oz is ${sgv * 0.0625} pt.` } else 
                    if (stringFromToUnit === 'volume0803') { volume = `${sgv} fl oz is ${sgv * 0.125} cups.` } else 
                    if (stringFromToUnit === 'volume0804') { volume = `${sgv} fl oz is ${sgv * 2} tablespoons.` } else 
                    if (stringFromToUnit === 'volume0805') { volume = `${sgv} fl oz is ${sgv * 6} teaspoons.` } else 
                    if (stringFromToUnit === 'volume0806') { volume = `${sgv} fl oz is ${sgv * 0.0078125} gal.` } else 
                    if (stringFromToUnit === 'volume0807') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume0808') { volume = `${sgv} fl oz is ${sgv * 1} fl oz.` } else 
                    if (stringFromToUnit === 'volume0809') { volume = `${sgv} fl oz is ${sgv * 2.95735E-5} m³.` } else 
                    if (stringFromToUnit === 'volume0810') { volume = `${sgv} fl oz is ${sgv * 2.95735295625E-14} km³.` } else 
                    if (stringFromToUnit === 'volume0811') { volume = `${sgv} fl oz is ${sgv * 29.5735295625} cm³.` } else 
                    if (stringFromToUnit === 'volume0812') { volume = `${sgv} fl oz is ${sgv * 29573.5295625} mm³.` } else 
                    if (stringFromToUnit === 'volume0813') { volume = `${sgv} fl oz is ${sgv * 1.8046875} in³.` } else 
                    if (stringFromToUnit === 'volume0814') { volume = `${sgv} fl oz is ${sgv * 0.0010443793} ft³.` } else 
                    if (stringFromToUnit === 'volume0815') { volume = `${sgv} fl oz is ${sgv * 3.86807E-5} yd³.` } else 
                    if (stringFromToUnit === 'volume0816') { volume = `${sgv} fl oz is ${sgv * 7.0950670582549E-15} mi³.` } else 

                    if (stringFromToUnit === 'volume0900') { volume = `${sgv} m³ is ${agv * 1000} L.` } else 
                    if (stringFromToUnit === 'volume0901') { volume = `${sgv} m³ is ${sgv * 1000000} ml.` } else 
                    if (stringFromToUnit === 'volume0902') { volume = `${sgv} m³ is ${sgv * 2113.3764188652} pt.` } else 
                    if (stringFromToUnit === 'volume0903') { volume = `${sgv} m³ is ${sgv * 4226.7528377304} cups.` } else 
                    if (stringFromToUnit === 'volume0904') { volume = `${sgv} m³ is ${sgv / 1.47868E-5} tablespoons.` } else 
                    if (stringFromToUnit === 'volume0905') { volume = `${sgv} m³ is ${sgv * 202884.13621106} teaspoons.` } else 
                    if (stringFromToUnit === 'volume0906') { volume = `${sgv} m³ is ${sgv * 264.1720523581} gal.` } else 
                    if (stringFromToUnit === 'volume0907') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume0908') { volume = `${sgv} m³ is ${sgv * 33814.022701843} fl oz.` } else 
                    if (stringFromToUnit === 'volume0909') { volume = `${sgv} m³ is ${sgv * 1} m³.` } else 
                    if (stringFromToUnit === 'volume0910') { volume = `${sgv} m³ is ${sgv * 1.0E-9} km³.` } else 
                    if (stringFromToUnit === 'volume0911') { volume = `${sgv} m³ is ${sgv * 1000000} cm³.` } else 
                    if (stringFromToUnit === 'volume0912') { volume = `${sgv} m³ is ${sgv * 1000000000} mm³.` } else 
                    if (stringFromToUnit === 'volume0913') { volume = `${sgv} m³ is ${sgv * 61023.744094732} in³.` } else 
                    if (stringFromToUnit === 'volume0914') { volume = `${sgv} m³ is ${sgv * 35.3146667215} ft³.` } else 
                    if (stringFromToUnit === 'volume0915') { volume = `${sgv} m³ is ${sgv * 1.3079506193} yd³.` } else 
                    if (stringFromToUnit === 'volume0916') { volume = `${sgv} m³ is ${sgv * 2.3991275857893E-10} mi³.` } else 

                    if (stringFromToUnit === 'volume1000') { volume = `${sgv} km³ is ${sgv * 1000000000000} L.` } else 
                    if (stringFromToUnit === 'volume1001') { volume = `${sgv} km³ is ${sgv * 1.0E+15} ml.` } else 
                    if (stringFromToUnit === 'volume1002') { volume = `${sgv} km³ is ${sgv * 2113376418865.2} pt.` } else 
                    if (stringFromToUnit === 'volume1003') { volume = `${sgv} km³ is ${sgv * 4226752837730.4} cups.` } else 
                    if (stringFromToUnit === 'volume1004') { volume = `${sgv} km³ is ${sgv * 67628045403686} tablespoonss.` } else 
                    if (stringFromToUnit === 'volume1005') { volume = `${sgv}  is ${sgv * 2.0288413621106E+14} teaspoons.` } else 
                    if (stringFromToUnit === 'volume1006') { volume = `${sgv} km³ is ${sgv * 264172052358.15} gal.` } else 
                    if (stringFromToUnit === 'volume1007') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume1008') { volume = `${sgv} km³ is ${sgv * 33814022701843} fl oz.` } else 
                    if (stringFromToUnit === 'volume1009') { volume = `${sgv} km³ is ${sgv * 1000000000} m³.` } else 
                    if (stringFromToUnit === 'volume1010') { volume = `${sgv} km³ is ${sgv * 1} km³.` } else 
                    if (stringFromToUnit === 'volume1011') { volume = `${sgv} km³ is ${sgv * 1.0E+15} cm³.` } else 
                    if (stringFromToUnit === 'volume1012') { volume = `${sgv} km³ is ${sgv * 1.0E+18} mm³.` } else 
                    if (stringFromToUnit === 'volume1013') { volume = `${sgv} km³ is ${sgv * 61023744094732} in³.` } else 
                    if (stringFromToUnit === 'volume1014') { volume = `${sgv} km³ is ${sgv * 35314666721.489} ft³.` } else 
                    if (stringFromToUnit === 'volume1015') { volume = `${sgv} km³ is ${sgv * 1307950619.3144} yd³.` } else 
                    if (stringFromToUnit === 'volume1016') { volume = `${sgv} km³ is ${sgv * 0.2399127586} mi³.` } else 

                    if (stringFromToUnit === 'volume1100') { volume = `${sgv} cm³ is ${sgv / 1000} L.` } else 
                    if (stringFromToUnit === 'volume1101') { volume = `${sgv} cm³ is ${sgv * 1} ml.` } else 
                    if (stringFromToUnit === 'volume1102') { volume = `${sgv} cm³ is ${sgv * 0.0021133764} pt.` } else 
                    if (stringFromToUnit === 'volume1103') { volume = `${sgv} cm³ is ${sgv * 0.0042267528} cups.` } else 
                    if (stringFromToUnit === 'volume1104') { volume = `${sgv} cm³ is ${sgv * 0.0676280454} tablespoons.` } else 
                    if (stringFromToUnit === 'volume1105') { volume = `${sgv} cm³ is ${sgv * 0.2028841362} teaspoons.` } else 
                    if (stringFromToUnit === 'volume1106') { volume = `${sgv} cm³ is ${sgv * 0.0002641721} gal.` } else 
                    if (stringFromToUnit === 'volume1107') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume1108') { volume = `${sgv} cm³ is ${sgv * 0.0338140227} fl oz.` } else 
                    if (stringFromToUnit === 'volume1109') { volume = `${sgv} cm³ is ${sgv * 1.0E-6} m³.` } else 
                    if (stringFromToUnit === 'volume1110') { volume = `${sgv} cm³ is ${sgv * 1.0E-15} km³.` } else 
                    if (stringFromToUnit === 'volume1111') { volume = `${sgv} cm³ is ${sgv * 1} cm³.` } else 
                    if (stringFromToUnit === 'volume1112') { volume = `${sgv} cm³ is ${sgv * 1000} mm³.` } else 
                    if (stringFromToUnit === 'volume1113') { volume = `${sgv} cm³ is ${sgv * 0.0610237441} in³.` } else 
                    if (stringFromToUnit === 'volume1114') { volume = `${sgv} cm³ is ${sgv * 3.53147E-5} ft³.` } else 
                    if (stringFromToUnit === 'volume1115') { volume = `${sgv} cm³ is ${sgv * 1.3079506193144E-6} yd³.` } else 
                    if (stringFromToUnit === 'volume1116') { volume = `${sgv} cm³ is ${sgv * 2.3991275857893E-16} mi³.` } else 

                    if (stringFromToUnit === 'volume1200') { volume = `${sgv} mm³ is ${sgv / 1000000} L.` } else 
                    if (stringFromToUnit === 'volume1201') { volume = `${sgv} mm³ is ${sgv / 1000} ml.` } else 
                    if (stringFromToUnit === 'volume1202') { volume = `${sgv} mm³ is ${sgv * 2.1133764188652E-6} pt.` } else 
                    if (stringFromToUnit === 'volume1203') { volume = `${sgv} mm³ is ${sgv * 4.2267528377304E-6} cups.` } else 
                    if (stringFromToUnit === 'volume1204') { volume = `${sgv} mm³ is ${sgv * 6.7628E-5} tablespoons.` } else 
                    if (stringFromToUnit === 'volume1205') { volume = `${sgv} mm³ is ${sgv * 0.0002028841} teaspoons.` } else 
                    if (stringFromToUnit === 'volume1206') { volume = `${sgv} mm³ is ${sgv * 2.6417205235815E-7} gal.` } else 
                    if (stringFromToUnit === 'volume1207') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume1208') { volume = `${sgv} mm³ is ${sgv * 3.3814E-5} fl oz.` } else 
                    if (stringFromToUnit === 'volume1209') { volume = `${sgv} mm³ is ${sgv * 1.0E-9} m³.` } else 
                    if (stringFromToUnit === 'volume1210') { volume = `${sgv} mm³ is ${sgv * 1.0E-18} km³.` } else 
                    if (stringFromToUnit === 'volume1211') { volume = `${sgv} mm³ is ${sgv * 0.001} cm³.` } else 
                    if (stringFromToUnit === 'volume1212') { volume = `${sgv} mm³ is ${sgv * 1} mm³.` } else 
                    if (stringFromToUnit === 'volume1213') { volume = `${sgv} mm³ is ${sgv * 6.10237E-5} in³.` } else 
                    if (stringFromToUnit === 'volume1214') { volume = `${sgv} mm³ is ${sgv * 3.5314666721489E-8} ft³.` } else 
                    if (stringFromToUnit === 'volume1215') { volume = `${sgv} mm³ is ${sgv * 1.3079506193144E-9} yd³.` } else 
                    if (stringFromToUnit === 'volume1216') { volume = `${sgv} mm³ is ${sgv * 2.3991275857893E-19} mi³.` } else 

                    if (stringFromToUnit === 'volume1300') { volume = `${sgv} in³ is ${sgv / 61.0237440947} L.` } else 
                    if (stringFromToUnit === 'volume1301') { volume = `${sgv} in³ is ${sgv * 16.387064} ml.` } else 
                    if (stringFromToUnit === 'volume1302') { volume = `${sgv} in³ is ${sgv * 0.0346320346} pt.` } else 
                    if (stringFromToUnit === 'volume1303') { volume = `${sgv} in³ is ${sgv * 0.0692640693} cups.` } else 
                    if (stringFromToUnit === 'volume1304') { volume = `${sgv} in³ is ${sgv * 1.1082251082} tablespoons.` } else 
                    if (stringFromToUnit === 'volume1305') { volume = `${sgv} in³ is ${sgv * 3.3246753247} teaspoons.` } else 
                    if (stringFromToUnit === 'volume1306') { volume = `${sgv} in³ is ${sgv * 0.0043290043} gal.` } else 
                    if (stringFromToUnit === 'volume1307') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume1308') { volume = `${sgv} in³ is ${sgv * 0.5541125541} fl oz.` } else 
                    if (stringFromToUnit === 'volume1309') { volume = `${sgv} in³ is ${sgv * 1.63871E-5} m³.` } else 
                    if (stringFromToUnit === 'volume1310') { volume = `${sgv} in³ is ${sgv * 1.6387064E-14} km³.` } else 
                    if (stringFromToUnit === 'volume1311') { volume = `${sgv} in³ is ${sgv * 16.387064} cm³.` } else 
                    if (stringFromToUnit === 'volume1312') { volume = `${sgv} in³ is ${sgv * 16387.064} mm³.` } else 
                    if (stringFromToUnit === 'volume1313') { volume = `${sgv} in³ is ${sgv * 1} in³.` } else 
                    if (stringFromToUnit === 'volume1314') { volume = `${sgv} in³ is ${sgv * 0.0005787037} ft³.` } else 
                    if (stringFromToUnit === 'volume1315') { volume = `${sgv} in³ is ${sgv * 2.14335E-5} yd³.` } else 
                    if (stringFromToUnit === 'volume1316') { volume = `${sgv} in³ is ${sgv * 3.9314657292494E-15} mi³.` } else 

                    if (stringFromToUnit === 'volume1400') { volume = `${sgv} ft³ is ${sgv * 28.316846592} L.` } else 
                    if (stringFromToUnit === 'volume1401') { volume = `${sgv} ft³ is ${sgv * 28316.846592} ml.` } else 
                    if (stringFromToUnit === 'volume1402') { volume = `${sgv} ft³ is ${sgv * 59.8441558442} pt.` } else 
                    if (stringFromToUnit === 'volume1403') { volume = `${sgv} ft³ is ${sgv * 119.6883116883} cups.` } else 
                    if (stringFromToUnit === 'volume1404') { volume = `${sgv} ft³ is ${sgv * 1915.012987013} tablespoons.` } else 
                    if (stringFromToUnit === 'volume1405') { volume = `${sgv} ft³ is ${sgv * 5745.038961039} teaspoons.` } else 
                    if (stringFromToUnit === 'volume1406') { volume = `${sgv} ft³ is ${sgv * 7.4805194805} gal.` } else 
                    if (stringFromToUnit === 'volume1407') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume1408') { volume = `${sgv} ft³ is ${sgv * 957.5064935065} fl oz.` } else 
                    if (stringFromToUnit === 'volume1409') { volume = `${sgv} ft³ is ${sgv * 0.0283168466} m³.` } else 
                    if (stringFromToUnit === 'volume1410') { volume = `${sgv} ft³ is ${sgv * 2.8316846592E-11} km³.` } else 
                    if (stringFromToUnit === 'volume1411') { volume = `${sgv} ft³ is ${sgv * 28316.846592} cm³.` } else 
                    if (stringFromToUnit === 'volume1412') { volume = `${sgv} ft³ is ${sgv * 28316846.592} mm³.` } else 
                    if (stringFromToUnit === 'volume1413') { volume = `${sgv} ft³ is ${sgv * 1728} in³.` } else 
                    if (stringFromToUnit === 'volume1414') { volume = `${sgv} ft³ is ${sgv * 1} ft³.` } else 
                    if (stringFromToUnit === 'volume1415') { volume = `${sgv} ft³ is ${sgv * 0.037037037} yd³.` } else 
                    if (stringFromToUnit === 'volume1416') { volume = `${sgv} ft³ is ${sgv * 6.793572780143E-12} mi³.` } else 

                    if (stringFromToUnit === 'volume1500') { volume = `${sgv} yd³ is ${sgv * 764.554857984} L.` } else 
                    if (stringFromToUnit === 'volume1501') { volume = `${sgv} yd³ is ${sgv * 764554.857984} ml.` } else 
                    if (stringFromToUnit === 'volume1502') { volume = `${sgv} yd³ is ${sgv * 1615.7922077922} pt.` } else 
                    if (stringFromToUnit === 'volume1503') { volume = `${sgv} yd³ is ${sgv * 3231.5844155844} cups.` } else 
                    if (stringFromToUnit === 'volume1504') { volume = `${sgv} yd³ is ${sgv * 51705.350649351} tablespoons.` } else 
                    if (stringFromToUnit === 'volume1505') { volume = `${sgv} yd³ is ${sgv * 155116.05194805} teaspoons.` } else 
                    if (stringFromToUnit === 'volume1506') { volume = `${sgv} yd³ is ${sgv * 201.974025974} gal.` } else 
                    if (stringFromToUnit === 'volume1507') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume1508') { volume = `${sgv} yd³ is ${sgv * 25852.675324675} fl oz.` } else 
                    if (stringFromToUnit === 'volume1509') { volume = `${sgv} yd³ is ${sgv * 0.764554858} m³.` } else 
                    if (stringFromToUnit === 'volume1510') { volume = `${sgv} yd³ is ${sgv * 7.64554857984E-10} km³.` } else 
                    if (stringFromToUnit === 'volume1511') { volume = `${sgv} yd³ is ${sgv * 764554.857984} cm³.` } else 
                    if (stringFromToUnit === 'volume1512') { volume = `${sgv} yd³ is ${sgv * 764554857.984} mm³.` } else 
                    if (stringFromToUnit === 'volume1513') { volume = `${sgv} yd³ is ${sgv * 46656} in³.` } else 
                    if (stringFromToUnit === 'volume1514') { volume = `${sgv} yd³ is ${sgv * 27} ft³.` } else 
                    if (stringFromToUnit === 'volume1515') { volume = `${sgv} yd³ is ${sgv * 1} yd³.` } else 
                    if (stringFromToUnit === 'volume1516') { volume = `${sgv} yd³ is ${sgv * 1.8342646506386E-10} mi³.` } else 

                    if (stringFromToUnit === 'volume1600') { volume = `${sgv} mi³ is ${sgv * 4168181825440.6} L.` } else 
                    if (stringFromToUnit === 'volume1601') { volume = `${sgv} mi³ is ${sgv * 4.1681818254406E+15} ml.` } else 
                    if (stringFromToUnit === 'volume1602') { volume = `${sgv} mi³ is ${sgv * 8808937179428.6} pt.` } else 
                    if (stringFromToUnit === 'volume1603') { volume = `${sgv} mi³ is ${sgv * 17617874358857} cups.` } else 
                    if (stringFromToUnit === 'volume1604') { volume = `${sgv} mi³ is ${sgv * 2.8188598974171E+14} tablespoons.` } else 
                    if (stringFromToUnit === 'volume1605') { volume = `${sgv} mi³ is ${sgv * 8.4565796922514E+14} teaspoons.` } else 
                    if (stringFromToUnit === 'volume1606') { volume = `${sgv} mi³ is ${sgv * 1101117147428.6} gal.` } else 
                    if (stringFromToUnit === 'volume1607') { volume = `There are to many Barrel Units.` } else 
                    if (stringFromToUnit === 'volume1608') { volume = `${sgv} mi³ is ${sgv * 1.4094299487086E+14} fl oz.` } else 
                    if (stringFromToUnit === 'volume1609') { volume = `${sgv} mi³ is ${sgv * 4168181825.4406} m³.` } else 
                    if (stringFromToUnit === 'volume1610') { volume = `${sgv} mi³ is ${sgv * 4.1681818254} km³.` } else 
                    if (stringFromToUnit === 'volume1611') { volume = `${sgv} mi³ is ${sgv * 4.1681818254406E+15} cm³.` } else 
                    if (stringFromToUnit === 'volume1612') { volume = `${sgv} mi³ is ${sgv * 4.1681818254406E+18} mm³.` } else 
                    if (stringFromToUnit === 'volume1613') { volume = `${sgv} mi³ is ${sgv * 2.54358061056E+14} in³.` } else 
                    if (stringFromToUnit === 'volume1614') { volume = `${sgv} mi³ is ${sgv * 147197952000} ft³.` } else 
                    if (stringFromToUnit === 'volume1615') { volume = `${sgv} mi³ is ${sgv * 5451776000} yd³.` } else 
                    if (stringFromToUnit === 'volume1616') { volume = `${sgv} mi³ is ${sgv * 1} mi³.` } else 
                    { volume = 'There was an calculation error.\nIf this message continues to show up, please contect the developer.' };
                    if (volume === undefined || volume === null || volume === '') {
                        volume = 'There was an calculation error. Canging the input value might help here. \nIf this message continues to show up, please contect the developer.'
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
                    if (stringFromToUnit === 'weight00') { weight = `${sgv} g is ${sgv * 1} g.` } else 
                    if (stringFromToUnit === 'weight01') { weight = `${sgv} g is ${sgv / 1000} kg.` } else 
                    if (stringFromToUnit === 'weight02') { weight = `${sgv} g is ${sgv * 1000} mg.` } else 
                    if (stringFromToUnit === 'weight03') { weight = `${sgv} g is ${sgv / 1000000} ton (metric).` } else 
                    if (stringFromToUnit === 'weight04') { weight = `${sgv} g is ${sgv / 907184,74} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight05') { weight = `${sgv} g is ${sgv / 453.59237} lbs.` } else 
                    if (stringFromToUnit === 'weight06') { weight = `${sgv} g is ${sgv / 453592.37} kip.` } else 
                    if (stringFromToUnit === 'weight07') { weight = `${sgv} g is ${sgv / 28.349523125} oz.` } else 
                    if (stringFromToUnit === 'weight08') { weight = `${sgv} g is ${sgv / 11339.80925} qr.` } else 
                    if (stringFromToUnit === 'weight09') { weight = `${sgv} g is ${sgv * 15.4323583529} gr.` } else 

                    if (stringFromToUnit === 'weight10') { weight = `${sgv} kg is ${sgv * 1000} g.` } else 
                    if (stringFromToUnit === 'weight11') { weight = `${sgv} kg is ${sgv * 1} kg.` } else 
                    if (stringFromToUnit === 'weight12') { weight = `${sgv} kg is ${sgv * 1000000} mg.` } else 
                    if (stringFromToUnit === 'weight13') { weight = `${sgv} kg is ${sgv / 1000} ton (metric).` } else 
                    if (stringFromToUnit === 'weight14') { weight = `${sgv} kg is ${sgv / 907.18474} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight15') { weight = `${sgv} kg is ${sgv * 2.2046226218} lbs.` } else 
                    if (stringFromToUnit === 'weight16') { weight = `${sgv} kg is ${sgv / 453.59237} kip.` } else 
                    if (stringFromToUnit === 'weight17') { weight = `${sgv} kg is ${sgv * 35.2739619496} oz.` } else 
                    if (stringFromToUnit === 'weight18') { weight = `${sgv} kg is ${sgv / 11.33980925} qr.` } else 
                    if (stringFromToUnit === 'weight19') { weight = `${sgv} kg is ${sgv * 15432.3583529} gr.` } else 

                    if (stringFromToUnit === 'weight20') { weight = `${sgv} mg is ${sgv / 1000} g.` } else 
                    if (stringFromToUnit === 'weight21') { weight = `${sgv} mg is ${sgv / 1000000} kg.` } else 
                    if (stringFromToUnit === 'weight22') { weight = `${sgv} mg is ${sgv * 1} mg.` } else 
                    if (stringFromToUnit === 'weight23') { weight = `${sgv} mg is ${sgv / 1000000000} ton (metric).` } else 
                    if (stringFromToUnit === 'weight24') { weight = `${sgv} mg is ${sgv / 907184740} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight25') { weight = `${sgv} mg is ${sgv / 453592.37} lbs.` } else 
                    if (stringFromToUnit === 'weight26') { weight = `${sgv} mg is ${sgv / 453592370} kip.` } else 
                    if (stringFromToUnit === 'weight27') { weight = `${sgv} mg is ${sgv / 28349.523125} oz.` } else 
                    if (stringFromToUnit === 'weight28') { weight = `${sgv} mg is ${sgv / 11339809.25} qr.` } else 
                    if (stringFromToUnit === 'weight29') { weight = `${sgv} mg is ${sgv / 64.7989100002} gr.` } else 

                    if (stringFromToUnit === 'weight30') { weight = `${sgv} ton (metric) is ${sgv * 1000000} g.` } else 
                    if (stringFromToUnit === 'weight31') { weight = `${sgv} ton (metric) is ${sgv * 1000} kg.` } else 
                    if (stringFromToUnit === 'weight32') { weight = `${sgv} ton (metric) is ${sgv * 1000000000} mg.` } else 
                    if (stringFromToUnit === 'weight33') { weight = `${sgv} ton (metric) is ${sgv * 1} ton (metric).` } else 
                    if (stringFromToUnit === 'weight34') { weight = `${sgv} ton (metric) is ${sgv * 1.1023113109} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight35') { weight = `${sgv} ton (metric) is ${sgv * 2204.6226218488} lbs.` } else 
                    if (stringFromToUnit === 'weight36') { weight = `${sgv} ton (metric) is ${sgv * 2.2046226218} kip.` } else 
                    if (stringFromToUnit === 'weight37') { weight = `${sgv} ton (metric) is ${sgv * 35273.96194958} oz.` } else 
                    if (stringFromToUnit === 'weight38') { weight = `${sgv} ton (metric) is ${sgv * 88.184904874} qr.` } else 
                    if (stringFromToUnit === 'weight39') { weight = `${sgv} ton (metric) is ${sgv * 15432358.3529} gr.` } else 

                    if (stringFromToUnit === 'weight40') { weight = `${sgv} ton (imperial) is ${sgv * 907184.74} g.` } else 
                    if (stringFromToUnit === 'weight41') { weight = `${sgv} ton (imperial) is ${sgv * 907.18474} kg.` } else 
                    if (stringFromToUnit === 'weight42') { weight = `${sgv} ton (imperial) is ${sgv * 907184740} mg.` } else 
                    if (stringFromToUnit === 'weight43') { weight = `${sgv} ton (imperial) is ${sgv / 1.1023113109} ton (metric).` } else 
                    if (stringFromToUnit === 'weight44') { weight = `${sgv} ton (imperial) is ${sgv * 1} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight45') { weight = `${sgv} ton (imperial) is ${sgv * 2000} lbs.` } else 
                    if (stringFromToUnit === 'weight46') { weight = `${sgv} ton (imperial) is ${sgv * 2} kip.` } else 
                    if (stringFromToUnit === 'weight47') { weight = `${sgv} ton (imperial) is ${sgv * 32000} oz.` } else 
                    if (stringFromToUnit === 'weight48') { weight = `${sgv} ton (imperial) is ${sgv * 80} qr.` } else 
                    if (stringFromToUnit === 'weight49') { weight = `${sgv} ton (imperial) is ${sgv * 13999999.999962} gr.` } else 

                    if (stringFromToUnit === 'weight50') { weight = `${sgv} lbs is ${sgv * 453.59237} g.` } else 
                    if (stringFromToUnit === 'weight51') { weight = `${sgv} lbs is ${sgv / 2.2046226218} kg.` } else 
                    if (stringFromToUnit === 'weight52') { weight = `${sgv} lbs is ${sgv * 453592.37} mg.` } else 
                    if (stringFromToUnit === 'weight53') { weight = `${sgv} lbs is ${sgv / 2204.6226218488} ton (metric).` } else 
                    if (stringFromToUnit === 'weight54') { weight = `${sgv} lbs is ${sgv / 2000} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight55') { weight = `${sgv} lbs is ${sgv * 1} lbs.` } else 
                    if (stringFromToUnit === 'weight56') { weight = `${sgv} lbs is ${sgv / 1000} kip.` } else 
                    if (stringFromToUnit === 'weight57') { weight = `${sgv} lbs is ${sgv * 16} oz.` } else 
                    if (stringFromToUnit === 'weight58') { weight = `${sgv} lbs is ${sgv / 25} qr.` } else 
                    if (stringFromToUnit === 'weight59') { weight = `${sgv} lbs is ${sgv * 6999.9999999812} gr.` } else 

                    if (stringFromToUnit === 'weight60') { weight = `${sgv} kip is ${sgv * 453592.37} g.` } else 
                    if (stringFromToUnit === 'weight61') { weight = `${sgv} kip is ${sgv * 453.59237} kg.` } else 
                    if (stringFromToUnit === 'weight62') { weight = `${sgv} kip is ${sgv * 453592370} mg.` } else 
                    if (stringFromToUnit === 'weight63') { weight = `${sgv} kip is ${sgv / 2.2046226218} ton (metric).` } else 
                    if (stringFromToUnit === 'weight64') { weight = `${sgv} kip is ${sgv / 2} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight65') { weight = `${sgv} kip is ${sgv * 1000} lbs.` } else 
                    if (stringFromToUnit === 'weight66') { weight = `${sgv} kip is ${sgv * 1} kip.` } else 
                    if (stringFromToUnit === 'weight67') { weight = `${sgv} kip is ${sgv * 16000} oz.` } else 
                    if (stringFromToUnit === 'weight68') { weight = `${sgv} kip is ${sgv * 40} qr.` } else 
                    if (stringFromToUnit === 'weight69') { weight = `${sgv} kip is ${sgv * 6999999.9999812} gr.` } else 

                    if (stringFromToUnit === 'weight70') { weight = `${sgv} oz is ${sgv * 28.349523125} g.` } else 
                    if (stringFromToUnit === 'weight71') { weight = `${sgv} oz is ${sgv / 35.2739619496} kg.` } else 
                    if (stringFromToUnit === 'weight72') { weight = `${sgv} oz is ${sgv * 28349.523125} mg.` } else 
                    if (stringFromToUnit === 'weight73') { weight = `${sgv} oz is ${sgv / 35273.96194958} ton (metric).` } else 
                    if (stringFromToUnit === 'weight74') { weight = `${sgv} oz is ${sgv / 32000} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight75') { weight = `${sgv} oz is ${sgv / 16} lbs.` } else 
                    if (stringFromToUnit === 'weight76') { weight = `${sgv} oz is ${sgv / 16000} kip.` } else 
                    if (stringFromToUnit === 'weight77') { weight = `${sgv} oz is ${sgv * 1} oz.` } else 
                    if (stringFromToUnit === 'weight78') { weight = `${sgv} oz is ${sgv / 400} qr.` } else 
                    if (stringFromToUnit === 'weight79') { weight = `${sgv} oz is ${sgv * 437.4999999988} gr.` } else 

                    if (stringFromToUnit === 'weight80') { weight = `${sgv} qr is ${sgv * 11339.80925} g.` } else 
                    if (stringFromToUnit === 'weight81') { weight = `${sgv} qr is ${sgv * 11.33980925} kg.` } else 
                    if (stringFromToUnit === 'weight82') { weight = `${sgv} qr is ${sgv * 11339809.25} mg.` } else 
                    if (stringFromToUnit === 'weight83') { weight = `${sgv} qr is ${sgv / 88.184904874} ton (metric).` } else 
                    if (stringFromToUnit === 'weight84') { weight = `${sgv} qr is ${sgv / 80} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight85') { weight = `${sgv} qr is ${sgv / 25} lbs.` } else 
                    if (stringFromToUnit === 'weight86') { weight = `${sgv} qr is ${sgv / 40} kip.` } else 
                    if (stringFromToUnit === 'weight87') { weight = `${sgv} qr is ${sgv * 400} oz.` } else 
                    if (stringFromToUnit === 'weight88') { weight = `${sgv} qr is ${sgv * 1} qr.` } else 
                    if (stringFromToUnit === 'weight89') { weight = `${sgv} qr is ${sgv * 174999.99999953} gr.` } else 

                    if (stringFromToUnit === 'weight90') { weight = `${sgv} gr is ${sgv / 15.4323583529} g.` } else 
                    if (stringFromToUnit === 'weight91') { weight = `${sgv} gr is ${sgv / 15432.3583529} kg.` } else 
                    if (stringFromToUnit === 'weight92') { weight = `${sgv} gr is ${sgv * 64.7989100002} mg.` } else 
                    if (stringFromToUnit === 'weight93') { weight = `${sgv} gr is ${sgv / 15432358.3529} ton (metric).` } else 
                    if (stringFromToUnit === 'weight94') { weight = `${sgv} gr is ${sgv / 13999999.999962} ton (imperial).` } else 
                    if (stringFromToUnit === 'weight95') { weight = `${sgv} gr is ${sgv / 6999.9999999812} lbs.` } else 
                    if (stringFromToUnit === 'weight96') { weight = `${sgv} gr is ${sgv / 6999999.9999812} kip.` } else 
                    if (stringFromToUnit === 'weight97') { weight = `${sgv} gr is ${sgv / 437.4999999988} oz.` } else 
                    if (stringFromToUnit === 'weight98') { weight = `${sgv} gr is ${sgv / 174999.99999953} qr.` } else 
                    if (stringFromToUnit === 'weight99') { weight = `${sgv} gr is ${sgv * 1} gr.` } else 
                    { weight = 'There was an calculation error.\nIf this message continues to show up, please contect the developer.' };
                    if (weight === undefined || weight === null || weight === '') {
                        weight = 'There was an calculation error. Canging the input value might help here. \nIf this message continues to show up, please contect the developer.'
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
                    if (stringFromToUnit === 'time00') { time = `${sgv} minutes is ${sgv * 1} minutes.` } else 
                    if (stringFromToUnit === 'time01') { time = `${sgv} minutes is ${sgv / 60} hours.` } else 
                    if (stringFromToUnit === 'time02') { time = `${sgv} minutes is ${sgv * 60} seconds.` } else 
                    if (stringFromToUnit === 'time03') { time = `${sgv} minutes is ${sgv * 60000} milliseconds.` } else 
                    if (stringFromToUnit === 'time04') { time = `${sgv} minutes is ${sgv / 60 / 24} days.` } else 
                    if (stringFromToUnit === 'time05') { time = `${sgv} minutes is ${sgv / 43800} months.` } else 
                    if (stringFromToUnit === 'time06') { time = `${sgv} minutes is ${sgv / 60 / 24 / 7} weeks.` } else 
                    if (stringFromToUnit === 'time07') { time = `${sgv} minutes is ${sgv / 60 / 24 / 365.25} years.` } else 
                    if (stringFromToUnit === 'time08') { time = `${sgv} minutes is ${sgv / 60 / 24 / 365.25 / 10} decades.` } else 
                    if (stringFromToUnit === 'time09') { time = `${sgv} minutes is ${sgv / 60 / 24 / 365.25 / 100} centurys.` } else 

                    if (stringFromToUnit === 'time10') { time = `${sgv} hours is ${sgv * 60} minutes.` } else 
                    if (stringFromToUnit === 'time11') { time = `${sgv} hours is ${sgv * 1} hours.` } else 
                    if (stringFromToUnit === 'time12') { time = `${sgv} hours is ${sgv * 60000} seconds.` } else 
                    if (stringFromToUnit === 'time13') { time = `${sgv} hours is ${sgv / 3600000} milliseconds.` } else 
                    if (stringFromToUnit === 'time14') { time = `${sgv} hours is ${sgv / 24} days.` } else 
                    if (stringFromToUnit === 'time15') { time = `${sgv} hours is ${sgv / 730} months.` } else 
                    if (stringFromToUnit === 'time16') { time = `${sgv} hours is ${sgv / 24 / 7} weeks.` } else 
                    if (stringFromToUnit === 'time17') { time = `${sgv} hours is ${sgv / 24 / 365.25} years.` } else 
                    if (stringFromToUnit === 'time18') { time = `${sgv} hours is ${sgv / 24 / 365.25 / 10} decades.` } else 
                    if (stringFromToUnit === 'time19') { time = `${sgv} hours is ${sgv / 24 / 365.25 / 100} centurys.` } else 

                    if (stringFromToUnit === 'time20') { time = `${sgv} seconds is ${sgv / 60} minutes.` } else 
                    if (stringFromToUnit === 'time21') { time = `${sgv} seconds is ${sgv / 3600} hours.` } else 
                    if (stringFromToUnit === 'time22') { time = `${sgv} seconds is ${sgv * 1} seconds.` } else 
                    if (stringFromToUnit === 'time23') { time = `${sgv} seconds is ${sgv * 1000} milliseconds.` } else 
                    if (stringFromToUnit === 'time24') { time = `${sgv} seconds is ${sgv / 60 / 60 / 24} days.` } else 
                    if (stringFromToUnit === 'time25') { time = `${sgv} seconds is ${sgv / 2628000} months.` } else 
                    if (stringFromToUnit === 'time26') { time = `${sgv} seconds is ${sgv / 60 / 60 / 24 / 7} weeks.` } else 
                    if (stringFromToUnit === 'time27') { time = `${sgv} seconds is ${sgv / 60 / 60 / 24 / 365.25} years.` } else 
                    if (stringFromToUnit === 'time28') { time = `${sgv} seconds is ${sgv / 60 / 60 / 24 / 365.25 / 10} decades.` } else 
                    if (stringFromToUnit === 'time29') { time = `${sgv} seconds is ${sgv / 60 / 60 / 24 / 365.25 / 100} centurys.` } else 

                    if (stringFromToUnit === 'time30') { time = `${sgv} milliseconds is ${sgv / 60000} minutes.` } else 
                    if (stringFromToUnit === 'time31') { time = `${sgv} milliseconds is ${sgv / 60000 / 60} hours.` } else 
                    if (stringFromToUnit === 'time32') { time = `${sgv} milliseconds is ${sgv / 1000} seconds.` } else 
                    if (stringFromToUnit === 'time33') { time = `${sgv} milliseconds is ${sgv * 1} milliseconds.` } else 
                    if (stringFromToUnit === 'time34') { time = `${sgv} milliseconds is ${sgv / 60000 / 60 / 24} days.` } else 
                    if (stringFromToUnit === 'time35') { time = `${sgv} milliseconds is ${sgv / 2628000000} months.` } else 
                    if (stringFromToUnit === 'time36') { time = `${sgv} milliseconds is ${sgv / 60000 / 60 / 24 / 7} weeks.` } else 
                    if (stringFromToUnit === 'time37') { time = `${sgv} milliseconds is ${sgv / 60000 / 60 / 24 / 365.25} years.` } else 
                    if (stringFromToUnit === 'time38') { time = `${sgv} milliseconds is ${sgv / 60000 / 60 / 24 / 365.25 / 10} decades.` } else 
                    if (stringFromToUnit === 'time39') { time = `${sgv} milliseconds is ${sgv / 60000 / 60 / 24 / 365.25 / 100} centurys.` } else 

                    if (stringFromToUnit === 'time40') { time = `${sgv} days is ${sgv * 24 * 60} minutes.` } else 
                    if (stringFromToUnit === 'time41') { time = `${sgv} days is ${sgv * 24} hours.` } else 
                    if (stringFromToUnit === 'time42') { time = `${sgv} days is ${sgv * 24 * 60 * 60} seconds.` } else 
                    if (stringFromToUnit === 'time43') { time = `${sgv} days is ${sgv * 24 * 60 * 60000} milliseconds.` } else 
                    if (stringFromToUnit === 'time44') { time = `${sgv} days is ${sgv * 1} days.` } else 
                    if (stringFromToUnit === 'time45') { time = `${sgv} days is ${sgv / 30.4166666667} months.` } else 
                    if (stringFromToUnit === 'time46') { time = `${sgv} days is ${sgv / 7} weeks.` } else 
                    if (stringFromToUnit === 'time47') { time = `${sgv} days is ${sgv / 365.25} years.` } else 
                    if (stringFromToUnit === 'time48') { time = `${sgv} days is ${sgv / 365.25 / 10} decades.` } else 
                    if (stringFromToUnit === 'time49') { time = `${sgv} days is ${sgv / 365.25 / 100} centurys.` } else 

                    if (stringFromToUnit === 'time50') { time = `${sgv} months is ${sgv * 43800} minutes.` } else 
                    if (stringFromToUnit === 'time51') { time = `${sgv} months is ${sgv * 730} hours.` } else 
                    if (stringFromToUnit === 'time52') { time = `${sgv} months is ${sgv * 2628000000} seconds.` } else 
                    if (stringFromToUnit === 'time53') { time = `${sgv} months is ${sgv * 2628000000} milliseconds.` } else 
                    if (stringFromToUnit === 'time54') { time = `${sgv} months is ${sgv * 30.4166666667} days.` } else 
                    if (stringFromToUnit === 'time55') { time = `${sgv} months is ${sgv * 1} months.` } else 
                    if (stringFromToUnit === 'time56') { time = `${sgv} months is ${sgv * 4.3452380952} weeks.` } else 
                    if (stringFromToUnit === 'time57') { time = `${sgv} months is ${sgv / 12.0082191781} years.` } else 
                    if (stringFromToUnit === 'time58') { time = `${sgv} months is ${sgv / 12.0082191781 / 10} decades.` } else 
                    if (stringFromToUnit === 'time59') { time = `${sgv} months is ${sgv / 12.0082191781 / 100} centurys.` } else 

                    if (stringFromToUnit === 'time60') { time = `${sgv} weeks is ${sgv * 7 * 24 * 60} minutes.` } else 
                    if (stringFromToUnit === 'time61') { time = `${sgv} weeks is ${sgv * 7 * 24} hours.` } else 
                    if (stringFromToUnit === 'time62') { time = `${sgv} weeks is ${sgv * 7 * 24 * 60 * 60} seconds.` } else 
                    if (stringFromToUnit === 'time63') { time = `${sgv} weeks is ${sgv * 7 * 24 * 60 * 60000} milliseconds.` } else 
                    if (stringFromToUnit === 'time64') { time = `${sgv} weeks is ${sgv * 7} days.` } else 
                    if (stringFromToUnit === 'time65') { time = `${sgv} weeks is ${sgv / 4.3452380952} months.` } else 
                    if (stringFromToUnit === 'time66') { time = `${sgv} weeks is ${sgv * 1} weeks.` } else 
                    if (stringFromToUnit === 'time67') { time = `${sgv} weeks is ${sgv / 52.1785714286} years.` } else 
                    if (stringFromToUnit === 'time68') { time = `${sgv} weeks is ${sgv / 52.1785714286 / 10} decades.` } else 
                    if (stringFromToUnit === 'time69') { time = `${sgv} weeks is ${sgv / 52.1785714286 / 100} centurys.` } else 

                    if (stringFromToUnit === 'time70') { time = `${sgv} years is ${sgv * 365.25 * 24 * 60} minutes.` } else 
                    if (stringFromToUnit === 'time71') { time = `${sgv} years is ${sgv * 365.25 * 24} hours.` } else 
                    if (stringFromToUnit === 'time72') { time = `${sgv} years is ${sgv * 365.25 * 24 * 60 * 60} seconds.` } else 
                    if (stringFromToUnit === 'time73') { time = `${sgv} years is ${sgv * 365.25 * 24 * 60 * 60000} milliseconds.` } else 
                    if (stringFromToUnit === 'time74') { time = `${sgv} years is ${sgv * 365.25} days.` } else 
                    if (stringFromToUnit === 'time75') { time = `${sgv} years is ${sgv * 12.0082191781} months.` } else 
                    if (stringFromToUnit === 'time76') { time = `${sgv} years is ${sgv * 52.1785714286} weeks.` } else 
                    if (stringFromToUnit === 'time77') { time = `${sgv} years is ${sgv * 1} years.` } else 
                    if (stringFromToUnit === 'time78') { time = `${sgv} years is ${sgv / 10} decades.` } else 
                    if (stringFromToUnit === 'time79') { time = `${sgv} years is ${sgv / 100} centurys.` } else 

                    if (stringFromToUnit === 'time80') { time = `${sgv} decades is ${sgv * 10 * 365.25 * 24 * 60} minutes.` } else 
                    if (stringFromToUnit === 'time81') { time = `${sgv} decades is ${sgv * 10 * 365.25 * 24} hours.` } else 
                    if (stringFromToUnit === 'time82') { time = `${sgv} decades is ${sgv * 10 * 365.25 * 24 * 60 * 60} seconds.` } else 
                    if (stringFromToUnit === 'time83') { time = `${sgv} decades is ${sgv * 10 * 365.25 * 24 * 60 * 60000} milliseconds.` } else 
                    if (stringFromToUnit === 'time84') { time = `${sgv} decades is ${sgv * 10 * 365.25} days.` } else 
                    if (stringFromToUnit === 'time85') { time = `${sgv} decades is ${sgv * 120.0821917808} months.` } else 
                    if (stringFromToUnit === 'time86') { time = `${sgv} decades is ${sgv * 521.7857142857} weeks.` } else 
                    if (stringFromToUnit === 'time87') { time = `${sgv} decades is ${sgv * 10} years.` } else 
                    if (stringFromToUnit === 'time88') { time = `${sgv} decades is ${sgv * 1} decades.` } else 
                    if (stringFromToUnit === 'time89') { time = `${sgv} decades is ${sgv / 10} centurys.` } else 

                    if (stringFromToUnit === 'time90') { time = `${sgv} centurys is ${sgv * 100 * 365.25 * 24 * 60} minutes.` } else 
                    if (stringFromToUnit === 'time91') { time = `${sgv} centurys is ${sgv * 100 * 365.25 * 24} hours.` } else 
                    if (stringFromToUnit === 'time92') { time = `${sgv} centurys is ${sgv * 100 * 365.25 * 24 * 60 * 60} seconds.` } else 
                    if (stringFromToUnit === 'time93') { time = `${sgv} centurys is ${sgv * 100 * 365.25 * 24 * 60 * 60000} milliseconds.` } else 
                    if (stringFromToUnit === 'time94') { time = `${sgv} centurys is ${sgv * 100 * 365.25} days.` } else 
                    if (stringFromToUnit === 'time95') { time = `${sgv} centurys is ${sgv * 1200.8219178082} months.` } else 
                    if (stringFromToUnit === 'time96') { time = `${sgv} centurys is ${sgv * 5217.8571428571} weeks.` } else 
                    if (stringFromToUnit === 'time97') { time = `${sgv} centurys is ${sgv * 100} years.` } else 
                    if (stringFromToUnit === 'time98') { time = `${sgv} centurys is ${sgv * 10} decades.` } else 
                    if (stringFromToUnit === 'time99') { time = `${sgv} centurys is ${sgv * 1} centurys.` } else 
                    { time = 'There was an calculation error.\nIf this message continues to show up, please contect the developer.' };
                    if (time == null || time === '') {
                        time = 'There was an calculation error. Canging the input value might help here. \nIf this message continues to show up, please contect the developer.'
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
                    let numberValueNumberArray = [00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16];
                    // From Unit
                    let stringFromScale;
                    if (stringGetFromScale === 'shortscale') { stringFromScale = '0' } else 
                    if (stringGetFromScale === 'longscale') { stringFromScale = '1' };
                    if (stringFromScale.length != '1') {
                        stringFromScale = `0`;
                    }
                    // Value
                    let resultValue = numberValueNumberArray.filter(function(e, i) {
                        return numberValueNameArray[i] == stringGetValue;
                    });
                    let stringValue;
                    stringValue = resultValue.toString();
                    if (stringValue.length != '2') {
                        stringValue = `0${stringValue}`;
                    }
                    if (stringFromScale === '0' && stringValue === '11' || stringValue === '12' || stringValue === '13' || stringValue === '14' || stringValue === '15' || stringValue === '16') {
                        stringFromScale = '1';
                    };
                    let stringFromScaleValue = 'number' + stringFromScale + stringValue;
                    // Million, Billion, Trillion, Quadrillion, Quintilion, Sextillion, Septillion, Octillion, Nonillion
                    //    0        1         2           3           4          5            6          7          8
                    // Decillion, Undecillion, Milliard, Billiard, Trilliard, Quadrilliard, Quintiliard, sextilliard
                    //     9           10         11        12         13          14            15           16
                    let number;
                    if (stringFromScaleValue === 'number000') { number = `\`Million\` is \`Million\` in both Scales.` } else 
                    if (stringFromScaleValue === 'number001') { number = `\`Billion\` in Short Scale is \`Milliard\` in Long Scale.` } else 
                    if (stringFromScaleValue === 'number002') { number = `\`Trillion\` in Short Scale is \`Billion\` in Long Scale.` } else 
                    if (stringFromScaleValue === 'number003') { number = `\`Quadrillion\` in Short Scale is \`Billiard\` in Long Scale.` } else 
                    if (stringFromScaleValue === 'number004') { number = `\`Quintilion\` in Short Scale is \`Trillion\` in Long Scale.` } else 
                    if (stringFromScaleValue === 'number005') { number = `\`Sextillion\` in Short Scale is \`Trilliard\` in Long Scale.` } else 
                    if (stringFromScaleValue === 'number006') { number = `\`Septillion\` in Short Scale is \`Quadrillion\` in Long Scale.` } else 
                    if (stringFromScaleValue === 'number007') { number = `\`Octillion\` in Short Scale is \`Quadrilliard\` in Long Scale.` } else 
                    if (stringFromScaleValue === 'number008') { number = `\`Nonillion\` in Short Scale is \`Quintilion\` in Long Scale.` } else 
                    if (stringFromScaleValue === 'number009') { number = `\`Decillion\` in Short Scale is \`Quintiliard\` in Long Scale.` } else 
                    if (stringFromScaleValue === 'number010') { number = `\`Undecillion\` in Short Scale is \`Sextillion\` in Long Scale.` } else 

                    if (stringFromScaleValue === 'number100') { number = `\`Million\` in Long Scale is \`Million\` in Short Scale.` } else 
                    if (stringFromScaleValue === 'number111') { number = `\`Milliard\` in Long Scale is \`Billion\` in Short Scale.` } else 
                    if (stringFromScaleValue === 'number101') { number = `\`Billion\` in Long Scale is \`Trillion\` in Short Scale.` } else 
                    if (stringFromScaleValue === 'number112') { number = `\`Billiard\` in Long Scale is \`Quadrillion\` in Short Scale.` } else 
                    if (stringFromScaleValue === 'number102') { number = `\`Trillion\` in Long Scale is \`Quintilion\` in Short Scale.` } else 
                    if (stringFromScaleValue === 'number113') { number = `\`Trilliard\` in Long Scale is \`Sextillion\` in Short Scale.` } else 
                    if (stringFromScaleValue === 'number103') { number = `\`Quadrillion\` in Long Scale is \`Septillion\` in Short Scale.` } else 
                    if (stringFromScaleValue === 'number114') { number = `\`Quadrilliard\` in Long Scale is \`Octillion\` in Short Scale.` } else 
                    if (stringFromScaleValue === 'number104') { number = `\`Quintilion\` in Long Scale is \`Nonillion\` in Short Scale.` } else 
                    if (stringFromScaleValue === 'number115') { number = `\`Quintiliard\` in Long Scale is \`Decillion\` in Short Scale.` } else 
                    if (stringFromScaleValue === 'number105') { number = `\`Sextillion\` in Long Scale is \`Undecillion\` in Short Scale.` } else 
                    { number = 'There was an error.\nIf this message continues to show up, please contect the developer.' };
                    if (number === undefined || number === null || number === '') {
                        number = 'There was an error. Canging the input value might help here. \nIf this message continues to show up, please contect the developer.'
                    };
                    let stringNumber = number;

                    await interaction.reply({ content: stringNumber });
                };
            } else {
                await interaction.reply({ content: 'This command is not available right now.', ephemeral: true });
            };
        } else {
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'convert\' returned \'null / undefined\'.`);
        };
    },
};