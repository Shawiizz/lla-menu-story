import fs from 'fs';
import {getIGClient} from "../Authentication.js";
import {errlog, log} from "../../util/Logger.js";

/*
This is needed because sometimes instagram api wants to verify the client isn't a robot, so we need to do the request again (10 times max)
 */
let storyPostAttempts = 0

async function postStory(filePath) {
    log("Publishing a story, please wait 20 seconds...");
    return await new Promise(resolve => {
        setTimeout(async () => {
            const file = fs.readFileSync(filePath);
            try {
                resolve(await getIGClient().publish.story({
                    file,
                }))
            } catch (e) {
                if (e.toString().includes('checkpoint_required')) {
                    storyPostAttempts++
                    errlog('Posting story failed, trying again... (attempt ' + storyPostAttempts + ")");
                    if (storyPostAttempts >= 10) {
                        resolve(undefined)
                    }
                    resolve(await postStory(filePath))
                } else console.error(e)
            }
        }, 20000)
    })
}

export {postStory}