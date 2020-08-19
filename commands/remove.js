const { Command } = require('discord-akairo');
const { MessageAttachment } = require('discord.js');

const mp = {
    a: '🇦', b: '🇧', c: '🇨', d: '🇩',
    e: '🇪', f: '🇫', g: '🇬', h: '🇭',
    i: '🇮', j: '🇯', k: '🇰', l: '🇱',
    m: '🇲', n: '🇳', o: '🇴', p: '🇵',
    q: '🇶', r: '🇷', s: '🇸', t: '🇹',
    u: '🇺', v: '🇻', w: '🇼', x: '🇽',
    y: '🇾', z: '🇿', 0: '0⃣', 1: '1⃣',
    2: '2⃣', 3: '3⃣', 4: '4⃣', 5: '5⃣',
    6: '6⃣', 7: '7⃣', 8: '8⃣', 9: '9⃣',
    10: '🔟', '#': '#⃣', '*': '*⃣',
    '!': '❗', '?': '❓',
};

function checkForUnique(str){
    var hashtable = {};
    if (!str.match(/[a-zA-z0-9#*!?]/)) return false;
    for(var i=0,len=str.length;i<len;i++){
        if (hashtable[str[i]] != null){
            hashtable[str[i]] = 1;
            return false;
        }else{
            hashtable[str[i]] = 0;
        }
    }
    return true;
}

class RemoveCommand extends Command {
    constructor() {
        super('remove', {
            aliases: ['remove'],
            channel: 'guild',
            args: [
                {
                    id: 'messageID',
                },
                {
                    id: "message",
                }
            ],
            description: "`Remove reactions to a message from a given string`"
        });
    }

    usage = '`remove [messageID = previous] [string]`';
    example = '`remove previous ngfamvodich`';

    async exec(message, args) {
        if (args.messageID == null || args.message === null){
            console.log("Not enough agruments");
            return message.channel.send('Not enough arguments!!!');
        }

        let botUser = this.handler.client.user;

        // convert previous to message ID
        let m, ok = false;
        if (args.messageID === 'previous'){
            await message.channel.messages.fetch({limit: 2}).then(messages => {
                for (let [key, value] of messages) args.messageID = key;
            }).catch(err => {
                message.channel.send('Can\'t find the last message!!!');
                throw err;
            });
        }

        //delete message
        if (message.channel.permissionsFor(botUser).has('MANAGE_MESSAGE')){
            message.delete();
            console.log(`Message deleted!!!`);
        }
        else{
            console.log(`Do not have permission!`);
            return message.channel.send(`This bot does not have 'MANAGE_MESSAGE' permission`)
        }
        
        //listed all channel that this member can access
        const listedChannels = message.guild.channels.cache.filter(channel => 
            channel.permissionsFor(this.handler.client.user).has('VIEW_CHANNEL') 
            && channel.type == 'text'
        );
        
        //find the channel the message is on
        for (let [ID, channel] of listedChannels){
            m = await channel.messages.fetch(args.messageID).catch(err => {
                m = undefined;
            });
            if (m == undefined) continue;
            console.log(`Name of channel: ${channel.name}`);
            ok = true;
            break;
        }
        if (ok === false){
            console.log(`Can\'t find the message`);
            return message.channel.send(`Can\'t find the message`);
        }

        //remove all space and convert string to lowercase
        let str = await args.message.replace(/\s+/g, "");
        str = str.toLowerCase();

        //check whether string is unique
        if (!checkForUnique(str)){
            console.log('Your string is not unique or contains characters that aren\'t letters or numbers');
            return message.channel.send('Your string is not unique or contains characters that aren\'t letters or numbers');
        }

        //Removing reactions
        let userReactions = m.reactions.cache;
        for (let i = 0; i < str.length; i++) {
            if (userReactions.get(mp[str[i]]) == null) continue;
            m.reactions.cache.get(mp[str[i]]).remove().catch(err => {
                console.log(`Fail to delete ${mp[str[i]]} reaction`);
                return message.channel.send(`Fail to delete ${mp[str[i]]} reaction`);
            });
        }

        console.log("Remove " + str);

        return 0;
    }
}

module.exports = RemoveCommand;
