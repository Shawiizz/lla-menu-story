import { readFile } from 'fs';
import { promisify } from 'util';
import {ig} from "../main.js";

const readFileAsync = promisify(readFile);
let storyPostAttemps = 0

async function postStory(filePath) {
    const file = await readFileAsync(filePath);
    try {
        return await ig.publish.story({
            file,
        })
    } catch (e) {
        if(e.toString().includes('checkpoint_required')) {
            storyPostAttemps++
            console.log('Posting story failed, trying again... (attempt '+storyPostAttemps+")");
            if(storyPostAttemps >= 10) {
                return undefined
            }
            return await postStory(filePath)
        }
    }
}

export {postStory}