const { Listener } = require('discord-akairo');

class CommandFinishedListener extends Listener {
    constructor() {
        super('commandFinished', {
            event: 'commandFinished',
            emitter: 'commandHandler'
        });
    }

    exec(message, command, args, returnValue) {
        console.log(`${message.author.username} has used ${command} command succesfully!!!`);
    }
}

module.exports = CommandFinishedListener;
