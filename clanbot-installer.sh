#!/bin/sh
echo ""
echo ""
echo "Configuring ClanBot"
root=$(pwd)
choice=4

token=""
prefix=""

while [ "$choice" -eq 4 ]; do
    
    echo ""
    echo "Config - .env"
    echo "Enter the Bot's Token:"
    read -r token
    if [ ! "$token" ] || [ "$token" = "" ]; then
        echo "No Token, no start."
        echo "Read the Install Guide in the README file for help"
        echo "or on Github https://github.com/TamaniWolf/ClanBot/wiki/installation-and-setup"
        echo "exit code 0"
        echo ""
        exit 7
    else
        echo ""
    fi
    echo "Enter a command prefix:"
    echo "(In case we need it.)"
    read -r prefix
    if [ ! "$prefix" ] || [ "$prefix" = "" ]; then
        prefix="c."
        echo "Set to default."
        echo ""
    else
        echo ""
    fi
    echo ".env file:"
    echo "''"
    envfile=".env"
    echo "//For Settings in .env use (process.env.) and (configmain) in config.json" > $envfile
    echo "//-- ClanBot --//" >> $envfile
    echo "TOKEN = $token" >> $envfile
    echo "PREFIX = $prefix" >> $envfile
    echo "" >> $envfile
    cat $envfile
    chmod ug+rwx .env;
    chmod o+rx .env;
    echo "''"

    echo ""
    echo ""
    echo "Config - config.json"
    echo "Enter the Discord Server's Owner ID:"
    read -r guildowner
    if [ ! "$guildowner" ] || [ "$guildowner" = "" ]; then
        guildowner="100000000000000000"
        echo "Set to default."
        echo ""
    else
        echo ""
    fi
    echo "Enter the Discord Server's ID:"
    read -r guildid
    if [ ! "$guildid" ] || [ "$guildid" = "" ]; then
        guildid="100000000000000000"
        echo "Set to default."
        echo ""
    else
        echo ""
    fi
    echo "Enter the Bot's ID:"
    read -r clientid
    if [ ! "$clientid" ] || [ "$clientid" = "" ]; then
        clientid="100000000000000000"
        echo "Set to default."
        echo ""
    else
        echo ""
    fi
    cd "ClanSys" || return;
    mkdir "config"
    cd "config" || return;
    echo "config.json file:"
    echo "''"
    conffile="config.json"
    echo "{" > $conffile
    echo "    "config": {" >> $conffile
    echo "        "guildid": "$guildid"," >> $conffile
    echo "        "guildowner": "$guildowner"," >> $conffile
    echo "        "botid": "$clientid"" >> $conffile
    echo "    }," >> $conffile
    echo "    "external": {" >> $conffile
    echo "        "commands": ["megaboop","megahug","boop","hug"]" >> $conffile
    echo "    }" >> $conffile
    echo "}" >> $conffile
    cat $conffile
    chmod ug+rwx config.json;
    chmod o+rx config.json;
    echo "''"
    choice=3
    echo ""
    echo ""

done
echo "Setup is completed."
echo ""
echo "Please check if your files have the correct information!"
echo ""
echo ""
cd "$root" || return;
echo "exit code 0"
echo ""
exit 0