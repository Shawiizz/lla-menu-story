import * as readline from "readline";

const commands = {
    "publishweek": {
        fn: publishWeek
    },
}


function initCommandHandler() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    function ask() {
        rl.question('', async (s) => {
            if (!s.startsWith('/')) {
                console.log('Si tu veux éxécuter une commande, tu dois ajouter un / devant.')
                ask()
                return
            }

            const args = s.split(' ')
            const name = args[0].replace('/', '')

            if (!commands.hasOwnProperty(name)) {
                console.log('Cette commande n\'existe pas !')
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

function publishWeek(args, string) {
    
}

export {initCommandHandler}