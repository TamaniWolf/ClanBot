
const { Events } = require('discord.js');
module.exports = {
    name: Events.GuildMemberAdd,
    description: 'Adding new Members to the Databases.',
    once: false,
    async execute(member) {
        const { SQLiteMemberData } = require('../../../Modules/database/create/data');
        let guild = member.guild;
        SQLiteMemberData.data(member, guild);
    },
};
