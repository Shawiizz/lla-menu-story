import fs from 'fs';
import {getIGClient} from "./Authentication.js";

/*
This is needed because sometimes instagram api wants to verify the client isn't a robot, so we need to do the request again (10 times max)
 */
let storyPostAttempts = 0

async function postStory(filePath) {
    const file = fs.readFileSync(filePath);
    try {
        return await getIGClient().publish.story({
            file,
        })
    } catch (e) {
        if(e.toString().includes('checkpoint_required')) {
            storyPostAttempts++
            console.log('Posting story failed, trying again... (attempt '+storyPostAttempts+")");
            if(storyPostAttempts >= 10) {
                return undefined
            }
            return await postStory(filePath)
        }
    }
}

export {postStory}