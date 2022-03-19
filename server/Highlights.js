import {currentUser, ig} from "../main.js";

let highlightCreateAttempts = 0
let highlightGetAttempts = 0
let highlightDeleteAttempts = 0

async function createHighlight(name, media_ids) {
    try {
        return await ig.highlights.createReel({
            title: name,
            mediaIds: media_ids
        })
    } catch (e) {
        if(e.toString().includes('checkpoint_required')) {
            highlightCreateAttempts++
            console.log('Creating highlight failed, trying again... (attempt '+highlightCreateAttempts+")");
            if(highlightCreateAttempts >= 10) {
                return undefined
            }
            return await createHighlight()
        }
    }
}

async function getHighlightByName(name) {
    try {
        return (await ig.highlights.highlightsTray(currentUser.pk)).tray.find(highlight => highlight.title === name)
    } catch (e) {
        if(e.toString().includes('checkpoint_required')) {
            highlightGetAttempts++
            console.log('Getting highlight by name has failed, trying again... (attempt '+highlightGetAttempts+")");
            if(highlightGetAttempts >= 10) {
                return undefined
            }
            return await getHighlightByName(name)
        }
    }
}

async function deleteHighlightByID(id) {
    try {
        return await ig.highlights.deleteReel(id)
    } catch (e) {
        if(e.toString().includes('checkpoint_required')) {
            highlightDeleteAttempts++
            console.log('Deleting highlight has failed, trying again... (attempt '+highlightDeleteAttempts+")");
            if(highlightDeleteAttempts >= 10) {
                return undefined
            }
            return await deleteHighlightByID(id)
        }
    }
}

export {createHighlight, getHighlightByName, deleteHighlightByID}