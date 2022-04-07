import * as readline from "readline";
import {commandlog, warn} from "./Logger.js";

const commands = {
    "publish": {
        fn: publishCommand,
        usage: "/publish dd mm yyyy",
        description: "Commande pour manuellement poster le menu avec le programme."
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
                if(!commands[name].fn(args, s)) commandlog("Utilisation : "+commands[name].usage)
            } catch (err) {
                console.log(err.message)
            }
            ask()
        });
    }

    ask()
}

function publishCommand(args, string) {
    if(args.length !== 4) {
        commandlog("Tu dois spécifier le jour, le mois et l'année.")
        return
    }

    return true
}

export {initCommandHandler}