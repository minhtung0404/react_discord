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

class SendCommand extends Command {
    constructor() {
        super('send', {
            aliases: ['send'],
            channel: 'guild',
            args: [
                {
                    id: "message",
                }
            ],
            description: "`Send reactions from a given string`"
        });
    }

    usage = '`Send [string]`';
    example = '`Send ngfamvodich`';
    note = '`Put your string in double quotes if it has spaces`\n`It will remove your command if possible.`'

    async exec(message, args) {
        if (args.message === null){
            console.log("Not enough agruments");
            return message.channel.send('Not enough arguments!!!');
        }

        let botUser = this.handler.client.user;

        //delete message
        if (message.channel.permissionsFor(botUser).has('MANAGE_MESSAGES')){
            message.delete();
            console.log(`Message deleted!!!`);
        }
        
        //check whether string is valid and convert to lowercase
        let str = args.message.toLowerCase();
        if (!str.match(/[a-zA-z0-9#*!? ]/)) return false;

        // change letter to emoji message
        let newMessage = '';
        for (let i = 0; i < str.length; i++){
            if (str[i] === ' '){
                newMessage += '     ';
                continue;
            }
            newMessage += mp[str[i]] + ' ';
        }
        newMessage = newMessage.slice(0, -1);

        // send message
        message.channel.send(newMessage);

        return 0;
    }
}

module.exports = SendCommand;
