const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            args: [
                {
                    id: 'commandID'
                }
            ],
            description: "Show help"
        });
    }

    usage = '`help or help [command]`';
    example = '`help or help react`';

    exec(message, args) {
        let commandlist = this.handler.modules, command = '';
        for (let [key, value] of commandlist){
            command += '`' + key + '`' + '\n';
        }
        command = command.slice(0, -1);
        if (args.commandID == null){
            let embed = new MessageEmbed();
            embed = embed
                .setTitle('Simple Bot')
                .setColor('#0099ff')
                .setDescription('Some commands of Simple Bot')
                .addFields(
                    { name: 'prefix', value: '`ngfam!`'},
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Command', value: command}
                );
            return message.channel.send(embed);
        }
        for (let [key, value] of commandlist){
            if (key !== args.commandID) continue;
            let embed = new MessageEmbed();
            embed = embed
                .setTitle(key)
                .setColor('#0099ff')
                .setDescription(value.description)
                .addFields(
                    { name: 'Aliases', value: value.aliases, inline:true}
                );
            if (typeof value.usage !== 'undefined'){
                embed = embed
                    .addFields(
                        { name: 'Usage', value: value.usage, inline:true},
                        { name: 'Example', value: value.example, inline:true}
                    )
            }
            if (typeof value.note !== 'undefined'){
                embed = embed
                    .addFields(
                        { name: 'Note', value: value.note}
                    );
            }
            return message.channel.send(embed);
        }
        console.log('There is no such command');
        return message.channel.send('There is no such command');
    }
}

module.exports = HelpCommand;
