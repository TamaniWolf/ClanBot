
const { Events } = require('discord.js');
module.exports = {
    name: Events.GuildMemberRemove,
    description: 'Removing Members from the Databases.',
    once: false,
    async execute(member) {
        const { SQLiteMemberData } = require('../../../Modules/database/create/data');
        let guild = member.guild;
        SQLiteMemberData.data(member, guild);
    },
};
