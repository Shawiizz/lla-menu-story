import {IgApiClient} from "instagram-private-api";
import {checkXLSXFile} from "../util/XLSXUtil.js";
import {parseIGData, watchIGData} from "./IGData.js";
import {log} from "../util/Logger.js";

const ig_client = new IgApiClient();
let ig_user;

/*
Before logging in to Instagram, check that the IG data is correctly set to the variable and that XLSX file is okay
Btw this login function should be used 1 time per week (the sunday)
 */
async function login(username, password) {
    parseIGData()
    watchIGData()
    checkXLSXFile()

    log("Logging in...");
    ig_client.state.generateDevice(username);
    await ig_client.account.login(username, password);
    ig_user = await ig_client.account.currentUser()
    log("Successfully logged to IG!");
}

function getIGUser() {
    return ig_user
}

function getIGClient() {
    return ig_client
}

export {login, getIGUser, getIGClient}