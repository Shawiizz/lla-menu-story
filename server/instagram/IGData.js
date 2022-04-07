import fs from "fs";
import {log} from "../util/Logger.js";

const ig_data_path = './files/igdata.json'

let IGData = {
    "highlight_id": "",
    "media_ids": [],
    "posted_menus": []
};

function saveIGData() {
    fs.writeFileSync(ig_data_path, JSON.stringify(IGData, null, 4))
}

function parseIGData() {
    IGData = JSON.parse(fs.readFileSync(ig_data_path))
}

function watchIGData() {
    fs.watchFile(ig_data_path, (curr, prev) => {
        log("Updating IG Data from file.")
        parseIGData()
    });
}

export {parseIGData, saveIGData, watchIGData, IGData}