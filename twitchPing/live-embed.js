const Discord = require('discord.js');
const configmain = require('../config/config.json');
const configonoff = require('../config/onoff.json');
const lang = require('../lang/en_US.json');
const humanizeDuration = require("humanize-duration");
const moment = require('moment');

if(configonoff.twitch === true) {
  class LiveEmbed {
    static createForStream(streamData) {
      const isLive = streamData.type === "live";
      const allowBoxArt = configmain.twitch_use_boxart;

      let msgEmbed = new Discord.MessageEmbed();
      msgEmbed.setColor(isLive ? "#9146ff" : "GREY");
      msgEmbed.setURL(`https://twitch.tv/${(streamData.login || streamData.user_name).toLowerCase()}`);

      // Thumbnail
      let thumbUrl = streamData.profile_image_url;

      if (allowBoxArt && streamData.game && streamData.game.box_art_url) {
        thumbUrl = streamData.game.box_art_url;
        thumbUrl = thumbUrl.replace("{width}", "288");
        thumbUrl = thumbUrl.replace("{height}", "384");
      }

      msgEmbed.setThumbnail(thumbUrl);

      if (isLive) {
        // Title
        msgEmbed.setTitle(`:red_circle: **${streamData.user_name} ${lang.twitch.islivetitle}**`);
        msgEmbed.addField(lang.twitch.title, streamData.title, false);
      } else {
        msgEmbed.setTitle(`:white_circle:`, streamData.user_name, lang.twitch.waslivetitle);
        msgEmbed.setDescription(lang.twitch.waslivedesc);

        msgEmbed.addField(lang.twitch.title, streamData.title, true);
      }

      // Add game
      if (streamData.game) {
        msgEmbed.addField(lang.twitch.game, streamData.game.name, false);
      }

      if (isLive) {
        // Add status
        msgEmbed.addField(lang.twitch.status, isLive ? `${lang.twitch.livewith} ${streamData.viewer_count} ${lang.twitch.viewers}` : `${lang.twitch.ended}`, true);

        // Set main image (stream preview)
        let imageUrl = streamData.thumbnail_url;
        imageUrl = imageUrl.replace("{width}", "1280");
        imageUrl = imageUrl.replace("{height}", "720");
        let thumbnailBuster = (Date.now() / 1000).toFixed(0);
        imageUrl += `?t=${thumbnailBuster}`;
        msgEmbed.setImage(imageUrl);

        // Add uptime
        let now = moment();
        let startedAt = moment(streamData.started_at);

        msgEmbed.addField(lang.twitch.uptime, humanizeDuration(now - startedAt, {
          delimiter: ", ",
          largest: 2,
          round: true,
          units: ["y", "mo", "w", "d", "h", "m"]
        }), true);
      }

      return msgEmbed;
    }
  }

  module.exports = LiveEmbed;
}
