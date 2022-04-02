import {IgApiClient} from "instagram-private-api";
import {checkXLSXFile} from "../util/XLSXUtil.js";
import {parseIGData} from "./IGData.js";
import {ask, askHidden} from "../util/CommandUtil.js";

const ig_client = new IgApiClient();
let ig_username;
let ig_password;
let ig_user;

/*
Before logging in to Instagram, check that the IG data is correctly set to the variable and that XLSX file is okay
Btw this login function should be used 1 time per week (the sunday)
 */
async function login(username, password) {
    parseIGData()
    checkXLSXFile()

    console.log("Logging in...");
    ig_client.state.generateDevice(username);
    await ig_client.account.login(username, password);
    ig_user = await ig_client.account.currentUser()
    console.log("Successfully logged to IG!");
}

async function askForCredentials() {
    ig_username = await ask("Enter IG username: ")
    ig_password = await askHidden("Enter IG password: ")
}

function getIGUser() {
    return ig_user
}

function getIGClient() {
    return ig_client
}

export {login, getIGUser, getIGClient, ig_username, ig_password, askForCredentials}