const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const {prefix} = require('../config.json');

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
    example = '`help or help upload`';

    exec(message, args) {
        // get the command list
        let commandlist = this.handler.modules;

        // handle help
        if (args.commandID == null || args.commandID === 'help'){
            // get list command as a string
            let command = '';
            for (let [key, value] of commandlist){
                command += '`' + key + '`' + '\n';
            }
            command = command.slice(0, -1);

            let embed = new MessageEmbed(), value = commandlist.get('help');
            embed = embed
                .setTitle('Simple Bot')
                .setColor('#0099ff')
                .setDescription('Some commands of Simple Bot\n' + value.description)
                .addFields(
                    { name: 'prefix', value: `\`${prefix}\``},
                    { name: 'Aliases', value: value.aliases, inline:true},
                    { name: 'Usage', value: value.usage, inline:true},
                    { name: 'Example', value: value.example, inline:true},
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Command', value: command}
                );
            return message.channel.send(embed);
        }

        // handle help [command]
        let value = commandlist.get(args.commandID);
        if (value == undefined){
            console.log("There is no such command!!!");
            return message.channel.send("There is no such command!!!");
        }
        let embed = new MessageEmbed();
        embed = embed
            .setTitle(args.commandID)
            .setColor('#0099ff')
            .setDescription(value.description)
            .addFields(
                { name: 'Aliases', value: value.aliases, inline:true}
            );

        // check if command has usage and example
        if (typeof value.usage !== 'undefined'){
            embed = embed
                .addFields(
                    { name: 'Usage', value: value.usage, inline:true},
                    { name: 'Example', value: value.example, inline:true}
                )
        }

        // check if command has note
        if (typeof value.note !== 'undefined'){
            embed = embed
                .addFields(
                    { name: 'Note', value: value.note}
                );
        }
        message.channel.send(embed);
    }
}

module.exports = HelpCommand;
