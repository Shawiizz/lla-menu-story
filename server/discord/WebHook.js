import {errlog, warn} from "../util/Logger.js";
import {Webhook} from "discord-webhook-node";

export async function sendToDiscord(name, message, file) {
    if(!process.env.webhook_url) {
        warn("No webhook url provided.")
        return
    }

    try {
        const hook = new Webhook(process.env.webhook_url);

        hook.setUsername(name);
        hook.setAvatar('https://cdn.discordapp.com/attachments/778536126570823711/961681881152254022/unknown.png');

        if(file) {
            await hook.sendFile(file)
            return
        }
        await hook.send(message);
    } catch (e) {
        errlog("Cannot send webhook.")
        errlog(e)
    }
}

