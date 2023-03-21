
const { SystemChannelFlagsBitField } = require('discord.js');
require('dotenv').config;

class SystemChannelFlagsConvert {
    static systemChannelFlagsBitField(bitfield) {
        return new Promise((resolve, reject) => {
            try {
                let sysChanFlaBitfield = '';
                let bitfields = new SystemChannelFlagsBitField(bitfield)
                if (bitfields.has(SystemChannelFlagsBitField.Flags.SuppressGuildReminderNotifications)) {
                    sysChanFlaBitfield += 'Suppress Guild Reminder Notifications\n';
                };
                if (bitfields.has(SystemChannelFlagsBitField.Flags.SuppressJoinNotificationReplies) === true) {
                    sysChanFlaBitfield += 'Suppress Join Notification Replies\n';
                };
                if (bitfields.has(SystemChannelFlagsBitField.Flags.SuppressJoinNotifications) === true) {
                    sysChanFlaBitfield += 'Suppress Join Notifications\n';
                };
                if (bitfields.has(SystemChannelFlagsBitField.Flags.SuppressPremiumSubscriptions) === true) {
                    sysChanFlaBitfield += 'Suppress Premium Subscriptions\n';
                };
                // if (bitfields.has(SystemChannelFlagsBitField.Flags.SuppressRoleSubscriptionPurchaseNotificationReplies) === true) {
                //     sysChanFlaBitfield += 'Suppress Role Subscription Purchase Notification Replies\n';
                // };
                // if (bitfields.has(SystemChannelFlagsBitField.Flags.SuppressRoleSubscriptionPurchaseNotifications) === true) {
                //     sysChanFlaBitfield += 'Suppress Role Subscription Purchase Notifications\n';
                // };
                const sysChanFlaNew = sysChanFlaBitfield;
                resolve(sysChanFlaNew || '');
            } catch(err) {
                reject(err);
            };
        });
    };
};

module.exports = SystemChannelFlagsConvert;

/**
    4  SuppressGuildReminderNotifications: 
    8  SuppressJoinNotificationReplies: 
    1  SuppressJoinNotifications: 
    2  SuppressPremiumSubscriptions: 
    32 SuppressRoleSubscriptionPurchaseNotificationReplies: 
    16 SuppressRoleSubscriptionPurchaseNotifications: 
 */