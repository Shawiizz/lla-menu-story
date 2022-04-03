import {getIGClient, getIGUser} from "../Authentication.js";
import {errlog, log} from "../../util/Logger.js";

/*
This is needed because sometimes instagram api wants to verify the client isn't a robot so we need to do the request again (10 times max)
 */
let highlightCreateAttempts = 0
let highlightGetAttempts = 0
let highlightDeleteAttempts = 0

async function createHighlight(name, media_ids) {
    try {
        log("Creating an highlight, please wait...");
        return await getIGClient().highlights.createReel({
            title: name,
            mediaIds: media_ids
        })
    } catch (e) {
        if(e.toString().includes('checkpoint_required')) {
            highlightCreateAttempts++
            errlog('Creating highlight failed, trying again... (attempt '+highlightCreateAttempts+")");
            if(highlightCreateAttempts >= 10) {
                return undefined
            }
            return await createHighlight()
        } else console.error(e)
    }
}

async function getHighlightByName(name) {
    try {
        return (await getIGClient().highlights.highlightsTray(getIGUser().pk)).tray.find(highlight => highlight.title === name)
    } catch (e) {
        if(e.toString().includes('checkpoint_required')) {
            highlightGetAttempts++
            errlog('Getting highlight by name has failed, trying again... (attempt '+highlightGetAttempts+")");
            if(highlightGetAttempts >= 10) {
                return undefined
            }
            return await getHighlightByName(name)
        } else console.error(e)
    }
}

async function deleteHighlightByID(id) {
    try {
        log("Deleting an highlight");
        return await getIGClient().highlights.deleteReel(id)
    } catch (e) {
        if(e.toString().includes('checkpoint_required')) {
            highlightDeleteAttempts++
            errlog('Deleting highlight has failed, trying again... (attempt '+highlightDeleteAttempts+")");
            if(highlightDeleteAttempts >= 10) {
                return undefined
            }
            return await deleteHighlightByID(id)
        } else console.error(e)
    }
}

export {createHighlight, getHighlightByName, deleteHighlightByID}