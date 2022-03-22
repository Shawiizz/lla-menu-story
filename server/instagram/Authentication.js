import {IgApiClient} from "instagram-private-api";
import {checkXLSXFile} from "../util/XLSXUtil.js";
import {parseIGData} from "./IGData.js";

const igClient = new IgApiClient();
let igUser;

/*
Before logging in to Instagram, check that the IG data is correctly set to the variable and that XLSX file is okay
Btw this login function should be used 1 time per week (the sunday)
 */
async function login(username, password) {
    parseIGData()
    checkXLSXFile()

    console.log("Logging in...");
    igClient.state.generateDevice(username);
    await igClient.account.login(username, password);
    igUser = await igClient.account.currentUser()
    console.log("Successfully logged to IG!");
}

function getIGUser() {
    return igUser
}

function getIGClient() {
    return igClient
}

export {login, getIGUser, getIGClient}