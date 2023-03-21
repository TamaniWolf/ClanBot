
const { ChannelType } = require('discord.js');
require('dotenv').config;

class ChannelTypeConvert {
    static channelTypeNumber(number) {
        return new Promise((resolve, reject) => {
            try {
                let chanTypeNumber = '';
                if (number == ChannelType.GuildText) {
                    chanTypeNumber = 'Text Channel'; // 0
                };
                if (number == ChannelType.DM) {
                    chanTypeNumber = 'DM'; // 1
                };
                if (number == ChannelType.GuildVoice) {
                    chanTypeNumber = 'Voice Channel'; // 2
                };
                if (number == ChannelType.GroupDM) {
                    chanTypeNumber = 'Group DM'; // 3
                };
                if (number == ChannelType.GuildCategory) {
                    chanTypeNumber = 'Category'; // 4
                };
                if (number == ChannelType.GuildAnnouncement) {
                    chanTypeNumber = 'Announcement Channel'; // 5
                };
                if (number == ChannelType.AnnouncementThread) {
                    chanTypeNumber = 'Announcement Thread'; // 10
                };
                if (number == ChannelType.PublicThread) {
                    chanTypeNumber = 'Public Thread'; // 11
                };
                if (number == ChannelType.PrivateThread) {
                    chanTypeNumber = 'Private Thread'; // 12
                };
                if (number == ChannelType.GuildStageVoice) {
                    chanTypeNumber = 'Stage'; // 13
                };
                if (number == ChannelType.GuildDirectory) {
                    chanTypeNumber = 'Server Directory'; // 14
                };
                if (number == ChannelType.GuildForum) {
                    chanTypeNumber = 'Forum'; // 15
                };
                const sysChanFlaNew = chanTypeNumber;
                resolve(sysChanFlaNew || '');
            } catch(err) {
                reject(err);
            };
        });
    };
};

module.exports = ChannelTypeConvert;

/**
    4  SuppressGuildReminderNotifications: 
    8  SuppressJoinNotificationReplies: 
    1  SuppressJoinNotifications: 
    2  SuppressPremiumSubscriptions: 
 */