import * as readline from "readline";
import {warn} from "./Logger.js";

const commands = {
    "publishweek": {
        fn: publishWeekCommand
    },
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function ask(question) {
    return new Promise((resolve => {
        rl.question(question, async (s) => {
            resolve(s)
        });
    }))
}

const askHidden = question => new Promise((resolve, reject) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.stdoutMuted = true;

    rl.question(question, function(s) {
        resolve(s)
        rl.close();
    });

    rl._writeToOutput = function _writeToOutput(stringToWrite) {
        if (rl.stdoutMuted)
            rl.output.write("\x1B[2K\x1B[200D["+((rl.line.length%2===1)?"=-":"-=")+"]");
        else
            rl.output.write(stringToWrite);
    };
});

function initCommandHandler() {
    function ask() {
        rl.question('', async (s) => {
            if (!s.startsWith('/')) {
                warn('Si tu veux éxécuter une commande, tu dois ajouter un / devant.')
                ask()
                return
            }

            const args = s.split(' ')
            const name = args[0].replace('/', '')

            if (!commands.hasOwnProperty(name)) {
                warn('Cette commande n\'existe pas !')
                ask()
                return
            }

            try {
                commands[name].fn(args, s)
            } catch (err) {
                console.log(err.message)
            }
            ask()
        });
    }

    ask()
}

function publishWeekCommand(args, string) {

}

export {initCommandHandler, ask, askHidden}