
// Require and set
const Discord = require('discord.js');
const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = Discord;
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();
const { create, all } = require('mathjs');
const math = create(all);
const limitedEvaluate = math.evaluate;

module.exports = {
	cooldown: 5,
	admin: 'false',
	nsfw: 'false',
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Evaluates the given math equation.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.SendMessages)
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Displays a help text.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('equation')
                .setDescription('Evaluates the given math equation.')
                .addStringOption(option =>
                    option
                        .setName('value')
                        .setDescription('The Equation.')
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
            if (dataCommandMember == null) { dataCommandMember = { Eval: 'true' }; };
            // Context

            let lang = require(`../../../.${dataLang.Lang}`);
            if (dataCommandMember.Eval === 'true') {
                let eval = lang.default.eval;
                let matherror = 'matherror';
                math.import({
                    // 'import':     function () { matherror = 'Function import is disabled' },
                    // 'createUnit': function () { matherror = 'Function createUnit is disabled' },
                    // 'evaluate':   function () { matherror = 'Function evaluate is disabled' },
                    // 'parse':      function () { matherror = 'Function parse is disabled' },
                    // 'simplify':   function () { matherror = 'Function simplify is disabled' },
                    // 'derivative': function () { matherror = 'Function derivative is disabled' }
                    'import':     function () { matherror = eval.restricted },
                    'createUnit': function () { matherror = eval.restricted },
                    'evaluate':   function () { matherror = eval.restricted },
                    'parse':      function () { matherror = eval.restricted },
                    'simplify':   function () { matherror = eval.restricted },
                    'derivative': function () { matherror = eval.restricted }
                }, { override: true });
                // Help
                if (interaction.options.getSubcommand() === 'help') {
                    let help;
                    help = `\`\`\`\n${eval.help}\n\`\`\``;
                    let stringHelp = help;

                    await interaction.reply({ content: stringHelp });
                };
                // Equation
                if (interaction.options.getSubcommand() === 'equation') {
                    const stringGetValue = interaction.options.getString('value');
                    // 

                    let equation;
                    equation = limitedEvaluate(stringGetValue);
                    if (matherror !== 'matherror') {
                        equation = matherror;

                        await interaction.reply({ content: equation, ephemeral: true });
                    } else if (matherror === 'matherror') {
                        equation = equation.toString();

                        await interaction.reply({ content: equation});
                    };
                };
            } else {
                await interaction.reply({ content: `${lang.error.cmdoff}`, ephemeral: true });
            };
        } else {
            console.error(`[${DateTime.utc().toFormat(timeFormat)}][ClanBot] Interaction of Command \'eval\' returned \'null / undefined\'.`);
        };
    },
};