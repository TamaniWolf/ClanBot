#!/bin/sh
echo "Configuring ClanBot"
root=$(pwd)
choice=4

token=""
prefix=""

while [ "$choice" -eq 4 ]; do
    
    echo "Config - .ENV"
    echo "Enter the Bot's Token:"
    read -r token
    
    if [ ! "$token" ] || [ "$token" = "" ]; then
        echo "No Token, no start."
        rm -dr "ClanSys/config"
        exit 7
    else
        echo ""
    fi
    echo "Enter a command prefix:"
    read -r prefix
    if [ ! "$prefix" ] || [ "$prefix" = "" ]; then
        prefix="c."
    else
        echo ""
    fi
    envfile=".env"
    echo "//For Settings in .env use (process.env.) and (configmain) in config.json" > $envfile
    echo "//-- ClanBot --//" >> $envfile
    echo "TOKEN = $token" >> $envfile
    echo "PREFIX = $prefix" >> $envfile
    echo "" >> $envfile
    cat $envfile

    echo "."
    echo "Config - config.json"
    echo "Enter the Discord Server's Owner ID:"
    read -r guildowner
    if [ ! "$guildowner" ] || [ "$guildowner" = "" ]; then
        guildowner="100000000000000000"
    fi
    echo "Enter the Discord Server's ID:"
    read -r guildid
    if [ ! "$guildid" ] || [ "$guildid" = "" ]; then
        guildid="100000000000000000"
    fi
    echo "Enter the Bot's ID:"
    read -r clientid
    if [ ! "$clientid" ] || [ "$clientid" = "" ]; then
        clientid="100000000000000000"
    fi
    cd "ClanSys/config" || return;
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
    choice=3

done
cd "$root" || return;
exit 0
