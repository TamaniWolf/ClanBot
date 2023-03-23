# ClanBot
[![Discord Server](https://img.shields.io/discord/720746186788831323?color=%237289da&label=discord&logo=discord&style=flat-square)](https://discord.gg/6qcehmM)

**A "simple", customizable Discord bot for Familly, Friends and Communitys with fun in minde.**

***
## How To Install
First of all, it is important to know this bot is intendet to be run on an Linux based server (Ubuntu, Debian, etc...) I have not tested it outside of Linux and Visual Studio Code. 

> NOTE: You will need at least `sudo` permissions to performe the installation. If you are loggin in as root you don't need to use sudo before commands.

#### With Install Script
Now that we are sure we want to use an Linux server to Install ClanBot with the Install Script, we log-in in to the server via the ssh login.<br>
Go to the directory you want the bot to be in to.<br>
I recommend `/home/discord/` for it's home.<br>
Now you need to get the install script, this is strate forward and simple. Copy the code below and past it in the command line.<br>

```
git clone https://github.com/TamaniWolf/clanbot-installer.git
``` 
Once the cloning has finished you will need to change the directorys and files permissions to make it executable.<br>
We use `chmod` for it as followed:<br>
```
sudo chmod -R +rwx clanbot-installer/
sudo chmod -R g+rwx clanbot-installer/
```
> : -R = recursive; + = adden; r = read; w = write; x = execute

All is ready to start the install script with the command below.
```
sudo ./clanbot-installer.sh
``` 
> NOTE: with `./` you can execute any shell script. Exemple: `./start.sh`.

Now we are in the Installer, you only need to follow thy instructions.<br>


#### Manuel Install
This one is a lot more Custom but also a lot more work. It is what it is, an Manuel Install.<br>

But good thing we already have a wiki page for it :-D<br>
**-> [To the Install Page!](https://github.com/TamaniWolf/ClanBot/wiki/installation-and-setup) <-**<br>



> A Product of the Eternal Clan <br> [Discord](https://discord.gg/6qcehmM) | [Twitter](https://twitter.com/RealTweetWolf) | [Mastodon](https://mastodon.social/@tamaniwolf) | [Tumblr](https://www.tumblr.com/eternalclan) | [Wiki](https://github.com/TamaniWolf/ClanBot/wiki)