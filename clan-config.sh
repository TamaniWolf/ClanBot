#!/bin/sh
echo "Installing ClanBot"
root=$(pwd)
choice=4
name="ClanBot"
DIRECTORY="ClanBot"

token="0"
prefix="c."

cd "$root/$DIRECTORY"
while [ $choice -eq 4 ]; do
    
    echo "Config - .ENV"
    echo "Enter the Bot's Token:"
    read token
    if [[ $token -eq "" ]]; then
        exit 1
    fi
    echo "Enter a command prefix:"
    read prefix
    if [[ $prefix -eq "" ]]; then
        prefix="c."
    elif [[ $prefix -eq / ]]; then
        prefix="c."
    fi
cat > .env << EOF
//For Settings in .env use (process.env.) and (configmain) in config.json
//-- ClanBot --//
TOKEN = ${token}
PREFIX = ${prefix}

EOF
    echo "."
    echo "Config - config.json"
    echo "Enter the Discord Server's Owner ID:"
    read guildowner
    if [[ $guildowner -eq "" ]]; then
        guildowner="100000000000000000"
    fi
    echo "Enter the Discord Server's ID:"
    read guildid
    if [[ $guildid -eq "" ]]; then
        guildid="100000000000000000"
    fi
    echo "Enter the Bot's ID:"
    read clientid
    if [[ $clientid -eq "" ]]; then
        clientid="100000000000000000"
    fi
cd "$root/$DIRECTORY/ClanSys/config"
cat > config.json << EOF
{
  "config": {
    "guildid": "${guildid}",
    "guildowner": "${ownerid}",
    "botid": "${clientid}"
  },
  "external": {
    "commands": ["megaboop","megahug","boop","hug"]
  }
}
EOF

done
exit 0
