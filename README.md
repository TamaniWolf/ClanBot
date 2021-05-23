# Royalbot
[![Discord Server](https://img.shields.io/discord/720746186788831323?color=%237289da&label=discord&logo=discord&style=flat-square)](https://discord.gg/6qcehmM)

**A simple, customizable Discord bot (plus a bunch of silly extras).**

## Features

 - Minecraft Server status ping as command and for display in bot status bar.
 - Command to start a minecraft server if pm2 is installend.
 - Admin commands to stop/restart the bot if run with pm2.
 - Monitor and announce Twitch channels going live with customizable `@mentions`.
 - Live stream card that is automatically updated with the stream status, current game and viewership statistics.

## Using the bot

You have two options:

1. Find another bot that you like more.

2. Or, run your own copy by following the instructions below, and customize it however you want.

## Installation and setup

### Prerequisites

This bot is built on Node.js. If you do not yet have Node installed, download and install the latest LTS version from the official website for your platform:

https://nodejs.org/en/download/

**I recommend Node v14+.**

### Installation

To set up Royalbot, download the latest repository ZIP by asking Tamni Wolf
    
Once installed, enter the directory and install the dependencies:

    cd RoyalBot
    npm install

I recommend to use pnpm for space efictionsy of the dependencies:

    cd RoyalBot
    npm i g- pnpm
    pnpm i -g <package>

And to get the dependencie packages in the bot:

    pnpm update

### Getting required tokens

Note that you will need to set up some external applications: 

#### Discord bot application
Your Discord bot needs to be registered as an application, and you will need a bot token  (`DISCORD_BOT_TOKEN` in .env).

Follow [this guide](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) for more information.

#### Twitch application
To connect to the Twitch API, you will need to register a new application in the [Twitch Developers Console](https://dev.twitch.tv/console/apps).

You will need to grab the Client ID (`TWITCH_CLIENT_ID` in Clanbot .env).

#### Twitch OAuth token
To make things more complicated, all requests  to the Twitch API need to be authenticated with an OAuth grant generated by your own application.

To begin the authorization flow, you'll need to complete the authorization prompt yourself:
 
```
https://id.twitch.tv/oauth2/authorize?client_id=<YOUR_CLIENT_ID_HERE>&response_type=token&redirect_uri=http://localhost
```

You can grab the `access_token` from the redirect URL in your browser, and store it as `TWITCH_OAUTH_TOKEN` in .env . 

### Configuration
 
To configure RoyalBot, use the included `config.json` and `.env` and enter or customize the values in the file.

```json
{
  "discord_mentions": {
    "twitch-name-1": "everyone",
    "twitch-name-2": "here"
  },
  "twitch_check_interval_ms": 60000,
  "twitch_use_boxart": false,
  "set": {
    "profilenewjoin": false,
    "profilenewcommand": false
  }
}
```    
```json
//For Settings in .env use (process.env.) and (config.) in Config.json
//-- Royal Bot --//
TOKEN = <replace me>
PREFIX = <replace me>
IP = <replace me>
MCSNAME = <replace me>

//-Twitch
TWITCH_CHANNELS = <replace me>
DISCORD_ANNOUNCE_CHANNEL = <replace me>
TWITCH_CLIENT_ID = <replace me>
TWITCH_OAUTH_TOKEN = <replace me>
TWITCH_USE_BOXART = false
```
Configuration options explained:

|Key|Required?|Description|
|---|---------|-----------|
| |.env| |
|`TOKEN`|☑|Your bot token, via Discord developer portal.|
|`PREFIX`|☑|Your bot prefix, to execute commands.|
|`IP`|☑|The IP of your or another Minecraft server.|
|`MCSNAME`|☑|Namne of the Minecraft server.|
|`TWITCH_CHANNELS`|☑|Comma-separated list of all channels you want to monitor and send live notifications for.|
|`DISCORD_ANNOUNCE_CHANNEL`|☑|Channel name to post stream announcements in. Make sure the bot has permissions to post here.|
|`TWITCH_CLIENT_ID`|☑|Client ID for your Twitch app, via developer portal.|
|`TWITCH_OAUTH_TOKEN`|☑|OAuth token that grants access to your Twitch app, via `id.twitch.tv` as explained above.|
| |config.json| |
|`discord_mentions`| |This maps channel names to the Discord @ you want to send, such as a role or `everyone`. If a channel is missing here, no @ is used. Note: once the message is updated, the @ is always removed to prevent spamming users with notifications.|
|`twitch_check_interval_ms`| |How often to poll the Twitch API and send or update live embeds.|
|`twitch_use_boxart`| |If true, use alternate Live Embed style that includes game boxart as a thumbnail image if available.|

### Starting RoyalBot

Once the application has been configured, start it using `node` from the installation directory:

    node .

Or with pm2.

    pm2 start royalbot.js
  
### Inviting RoyalBot

Send the following link to the admin of a Discord server to let them invite the Bot:

  `https://discordapp.com/oauth2/authorize?client_id=BOT_CLIENT_ID&scope=bot`
  
Swap `BOT_CLIENT_ID` in the URL above for your Discord app's client id, which you can find in the app details.
