
## Table of Content
- [Prerequisites](README.md#prerequisites)<br>
- [Installation](README.md#installation)<br>
- [Automatic](README.md#automatic)<br>
- [Manuel](README.md#manuel)<br>
- [Getting required tokens](README.md#getting-required-tokens)<br>
- [Discord bot application](README.md#discord-bot-application)<br>
- [Starting ClanBot](README.md#starting-clanbot)<br>
- [Inviting ClanBot](README.md#inviting-clanbot)<br>
***
### Prerequisites

This bot is built on NodeJS. If you do not yet have NodeJS installed, download and install the latest LTS version from the official website for your platform:

https://nodejs.org/en/download/

**I recommend Node v16+.**

### Installation
#### Automatic

To Automaticly setup ClanBot, clone the repository with git or download it as an ZIP file and unzip it.
Once done, enter the directory and execute the installer script:

    cd ClanBot
    ./clanbot-installer

First pnpm will be installed and configured, then the depending packages.
After this you will be asked to enter some needed data for the config.
- Discord Bot Token
- Prefix (optional)
- Server Owner ID
- Server ID
- Bot ID

#### Manuel

To set up ClanBot, clone the repository with git or download it as an ZIP file and unzip it.
Once done, enter the directory and install the dependencies:

    cd ClanBot
    npm install

I recommend to use pnpm for space efficiency of the dependencies:

    cd ClanBot
    npm i g- pnpm
    pnpm i -g <package>

To get the dependencie packages for the bot:

    pnpm update

### Getting required tokens

You will need:
`DISCORD_BOT_TOKEN`
Note that you will need to set up some external applications:

#### Discord bot application
Your Discord bot needs to be registered as an application, and you will need a bot token  (`DISCORD_BOT_TOKEN` in .env).     
Follow [this guide](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) for more information.

### Starting ClanBot

Once the application has been configured, start it using `node` from the installation directory:

    node .

Or with pm2.

    pm2 start clanbot.js
  
### Inviting ClanBot

Send the following link to the admin of a Discord server to let them invite the Bot:

  `https://discordapp.com/oauth2/authorize?client_id=BOT_CLIENT_ID&scope=bot`
  
Swap `BOT_CLIENT_ID` in the URL above for your Discord app's client id, which you can find in the app details.
