import fs from "fs";

let IGData = {
    "highlight_id": "",
    "media_ids": [],
    "posted_menus": []
};

function saveIGData() {
    fs.writeFileSync('./files/igdata.json', JSON.stringify(IGData, null, 4))
}

function parseIGData() {
    IGData = JSON.parse(fs.readFileSync('./files/igdata.json'))
}

export {parseIGData, saveIGData, IGData}