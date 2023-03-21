
require('dotenv').config();

module.exports = async (message, argsBot, Discord) => {
    // Data Get
    let args = argsBot;
    let getGuildID = message.guild.id;
    let getClientID = globalclient.user.id;
    // Data Fetch
    let guild = await globalclient.guilds.fetch(getGuildID);
    let member = await guild.members.fetch(getClientID);
    // Context
    if (args[3] === 'applicationcommandpermissionsupdate' || args[3] === '-0' || args[3] === 'all') {
        let commands = await guild.commands.fetch();
        let command = commands.find((cmd => cmd));
        console.log('emit--0-bot');
        globalclient.emit('applicationCommandPermissionsUpdate', command);
    };
    if (args[3] === 'automoderationblockmessage' || args[3] === '0' || args[3] === 'all') {
        console.log('emit-0-bot');
        globalclient.emit('automoderationblockmessage');
    };
    if (args[3] === 'automoderationflagtochannel' || args[3] === '1' || args[3] === 'all') {
        console.log('emit-1-bot');
        globalclient.emit('automoderationflagtochannel');
    };
    if (args[3] === 'automoderationrulecreate' || args[3] === '2' || args[3] === 'all') {
        console.log('emit-2-bot');
        globalclient.emit('automoderationrulecreate');
    };
    if (args[3] === 'automoderationruledelete' || args[3] === '3' || args[3] === 'all') {
        console.log('emit-3-bot');
        globalclient.emit('automoderationruledelete');
    };
    if (args[3] === 'automoderationruleupdate' || args[3] === '4' || args[3] === 'all') {
        console.log('emit-4-bot');
        globalclient.emit('automoderationruleupdate');
    };
    if (args[3] === 'automoderationusercommunicationdisabled' || args[3] === '5') {
        console.log('emit-5-bot');
        globalclient.emit('automoderationusercommunicationdisabled');
    };
    if (args[3] === 'channelcreate' || args[3] === '6' || args[3] === 'all') {
        console.log('emit-6-bot');
        globalclient.emit('channelcreate');
    };
    if (args[3] === 'channeldelete' || args[3] === '7' || args[3] === 'all') {
        console.log('emit-7-bot');
        globalclient.emit('channeldelete');
    };
    if (args[3] === 'channeloverwritecreate' || args[3] === '8' || args[3] === 'all') {
        console.log('emit-8-bot');
        globalclient.emit('channeloverwritecreate');
    };
    if (args[3] === 'channeloverwritedelete' || args[3] === '9' || args[3] === 'all') {
        console.log('emit-9-bot');
        globalclient.emit('channeloverwritedelete');
    };
    if (args[3] === 'channeloverwriteupdate' || args[3] === '10' || args[3] === 'all') {
        console.log('emit-10-bot');
        globalclient.emit('channeloverwriteupdate');
    };
    if (args[3] === 'channelupdate' || args[3] === '11' || args[3] === 'all') {
        console.log('emit-11-bot');
        globalclient.emit('channelupdate');
    };
    if (args[3] === 'emojicreate' || args[3] === '12' || args[3] === 'all') {
        console.log('emit-12-bot');
        globalclient.emit('emojicreate');
    };
    if (args[3] === 'emojidelete' || args[3] === '13' || args[3] === 'all') {
        console.log('emit-13-bot');
        globalclient.emit('emojidelete');
    };
    if (args[3] === 'emojiupdate' || args[3] === '14' || args[3] === 'all') {
        console.log('emit-14-bot');
        globalclient.emit('emojiupdate');
    };
    if (args[3] === 'guildmemberadd' || args[3] === '15' || args[3] === 'all') {
        console.log('emit-15-meber');
        globalclient.emit('guildMemberAdd', member);
    };
    if (args[3] === 'guildmemberremove' || args[3] === '16' || args[3] === 'all') {
        console.log('emit-16-bot');
        globalclient.emit('guildMemberRemove');
    };
    if (args[3] === 'guildsbanremove' || args[3] === '17' || args[3] === 'all') {
        console.log('emit-17-bot');
        globalclient.emit('guildBanRemove');
    };
    if (args[3] === 'guildscheduledeventupdate' || args[3] === '18' || args[3] === 'all') {
        console.log('emit-18-bot');
        globalclient.emit('guildscheduledeventupdate');
    };
    if (args[3] === 'guildupdate' || args[3] === '19' || args[3] === 'all') {
        console.log('emit-19-bot');
        globalclient.emit('guildupdate');
    };
    if (args[3] === 'interactiondelete' || args[3] === '20' || args[3] === 'all') {
        console.log('emit-20-bot');
        globalclient.emit('interactiondelete');
    };
    if (args[3] === 'interactionupdate' || args[3] === '21' || args[3] === 'all') {
        console.log('emit-21-bot');
        globalclient.emit('interactionupdate');
    };
    if (args[3] === 'invitecreate' || args[3] === '22' || args[3] === 'all') {
        console.log('emit-22-bot');
        globalclient.emit('invitecreate');
    };
    if (args[3] === 'invitedelete' || args[3] === '23' || args[3] === 'all') {
        console.log('emit-23-bot');
        globalclient.emit('invitedelete');
    };
    if (args[3] === 'inviteupdate' || args[3] === '24' || args[3] === 'all') {
        console.log('emit-24-bot');
        globalclient.emit('inviteupdate');
    };
    if (args[3] === 'memberbanadd' || args[3] === '25' || args[3] === 'all') {
        console.log('emit-25-bot');
        globalclient.emit('memberbanadd');
    };
    if (args[3] === 'channelPinsUpdate' || args[3] === '26' || args[3] === 'all') {
        let guild = await globalclient.guilds.fetch(getGuildID);
        let channel = await guild.channels.fetch('846716632155816016');
        let message2 = await channel.messages.fetch('1053725325634314260');
        console.log('emit-26-bot');
        globalclient.emit('channelPinsUpdate', message2);
    };
    if (args[3] === 'messageunpin' || args[3] === '27' || args[3] === 'all') {
        let guild = await globalclient.guilds.fetch(getGuildID);
        let channel = await guild.channels.fetch('846716632155816016');
        let message2 = await channel.messages.fetch('1053725325634314260');
        console.log('emit-27-bot');
        globalclient.emit('messageUnpin', message2);
    };
    if (args[3] === '' || args[3] === '28' || args[3] === 'all') {
        console.log('emit-28-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '29' || args[3] === 'all') {
        console.log('emit-29-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '30' || args[3] === 'all') {
        console.log('emit-30-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '31' || args[3] === 'all') {
        console.log('emit-31-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '32' || args[3] === 'all') {
        console.log('emit-32-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '33' || args[3] === 'all') {
        console.log('emit-33-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '34' || args[3] === 'all') {
        console.log('emit-34-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '35' || args[3] === 'all') {
        console.log('emit-35-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '36' || args[3] === 'all') {
        console.log('emit-36-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '37' || args[3] === 'all') {
        console.log('emit-37-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '38' || args[3] === 'all') {
        console.log('emit-38-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '39' || args[3] === 'all') {
        console.log('emit-39-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '40' || args[3] === 'all') {
        console.log('emit-40-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '41' || args[3] === 'all') {
        console.log('emit-41-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '42' || args[3] === 'all') {
        console.log('emit-42-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '43' || args[3] === 'all') {
        console.log('emit-43-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '44' || args[3] === 'all') {
        console.log('emit-44-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '45' || args[3] === 'all') {
        console.log('emit-4-5bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '46' || args[3] === 'all') {
        console.log('emit-46-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '47' || args[3] === 'all') {
        console.log('emit-47-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '48' || args[3] === 'all') {
        console.log('emit-48-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '49' || args[3] === 'all') {
        console.log('emit-49-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '50' || args[3] === 'all') {
        console.log('emit-50-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '51' || args[3] === 'all') {
        console.log('emit-51-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '52' || args[3] === 'all') {
        console.log('emit-52-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '53' || args[3] === 'all') {
        console.log('emit-53-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '54' || args[3] === 'all') {
        console.log('emit-54-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '55' || args[3] === 'all') {
        console.log('emit-55-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '56' || args[3] === 'all') {
        console.log('emit-56-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '57' || args[3] === 'all') {
        console.log('emit-57-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '58' || args[3] === 'all') {
        console.log('emit-58-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '59' || args[3] === 'all') {
        console.log('emit-59-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '60' || args[3] === 'all') {
        console.log('emit-60-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '61' || args[3] === 'all') {
        console.log('emit-61-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '62' || args[3] === 'all') {
        console.log('emit-62-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '63' || args[3] === 'all') {
        console.log('emit-63-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '64' || args[3] === 'all') {
        console.log('emit-64-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '65' || args[3] === 'all') {
        console.log('emit-65-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '66' || args[3] === 'all') {
        console.log('emit-66-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '67' || args[3] === 'all') {
        console.log('emit-67-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '68' || args[3] === 'all') {
        console.log('emit-68-bot');
        globalclient.emit('');
    };
    if (args[3] === '' || args[3] === '69' || args[3] === 'all') {
        console.log('emit-69-bot');
        globalclient.emit('');
    };
};
