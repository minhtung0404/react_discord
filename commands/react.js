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

class ReactCommand extends Command {
    constructor() {
        super('react', {
            aliases: ['react'],
            channel: 'guild',
            args: [
                {
                    id: 'messageID',
                },
                {
                    id: "message",
                }
            ],
            description: "`Add reaction like a given string`"
        });
    }

    usage = '`react [messageID = previous] [string]`';
    example = '`react previous ngfamvodich`';

    async exec(message, args) {
        if (args.messageID == null || args.message === null){
            console.log("Not enough agruments");
            return message.channel.send('Not enough arguments!!!');
        }

        let m;
        if (args.messageID === 'previous'){
            await message.channel.messages.fetch({limit: 2}).then(messages => {
                for (let [key, value] of messages) args.messageID = key;
            }).catch(err => {
                throw err;
                return message.channel.send('Can\'t find the last message!!!');
            });
        }
        m = await message.channel.messages.fetch(args.messageID).catch(err => {
            console.log('Can\'t find the message');
            message.channel.send('Can\'t find the message');
            throw err;
        });

        let str = await args.message.replace(/\s+/g, "");

        //check whether string is unique
        if (!checkForUnique(str)){
            console.log('Your string is not unique or contains characters that aren\'t letters or numbers');
            return message.channel.send('Your string is not unique or contains characters that aren\'t letters or numbers');
        }

        //check if reactions have been reacted or not
        let userReactions = m.reactions.cache;
        for (let i = 0; i < str.length; i++) {
            if (userReactions.get(mp[str[i]]) == null) continue;
            console.log(mp[str[i]] + ' has been reacted');
            return message.channel.send(mp[str[i]] + ' has been reacted');
        }

        //Reacting
        console.log("React " + str);
        for (let i = 0; i < str.length; i++) m.react(mp[str[i]]);

        return 0;
    }
}

module.exports = ReactCommand;
