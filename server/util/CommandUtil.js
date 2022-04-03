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

export {initCommandHandler}