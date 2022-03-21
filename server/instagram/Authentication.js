import {IgApiClient} from "instagram-private-api";
import {getIGData} from "./IGData.js";
import {checkXLSXFile} from "../util/XLSXUtil.js";

const igClient = new IgApiClient();
let igUser;

/*
Before logging in to Instagram, check that the IG data is correctly set to the variable and that XLSX file is okay
Btw this login function should be used 1 time per week (the sunday)
 */
async function login(username, password) {
    getIGData()
    checkXLSXFile()

    igClient.state.generateDevice(username);
    await igClient.account.login(username, password);
    igUser = await igClient.account.currentUser()
}

function getIGUser() {
    return igUser
}

function getIGClient() {
    return igClient
}

export {login, getIGUser, getIGClient}