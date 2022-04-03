import { initCommandHandler} from "./server/util/CommandUtil.js";
import {WeekMenu} from "./server/classes/WeekMenu.js";
import {IGData} from "./server/instagram/IGData.js";
import {getXLSXDate} from "./server/util/XLSXUtil.js";
import * as Authentication from "./server/instagram/Authentication.js";
import {askForCredentials, ig_password, ig_username} from "./server/instagram/Authentication.js";
import {log, warn} from "./server/util/Logger.js";

(async () => {
    await askForCredentials()
    initCommandHandler()

    /*Login into Instagram
    + Parse IG Data and check excel file
     */
    await Authentication.login(ig_username, ig_password);

    const intervalFunc = async () => {
        //if day is sunday
        log("Checking week day...")
        if(new Date().getDay() === 0) {
            log("It's sunday! Checking for next week menu...")
            const tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
            const xlsxDate = getXLSXDate(tomorrow.getTime())

            //Menu has been already posted
            if(IGData.posted_menus.includes(xlsxDate)) {
                log("Next week's menu has already been posted.")
                return
            }

            //Take the screenshots, post as story and save in highlight.
            const week_menu = new WeekMenu().setMondayDate(tomorrow.getDate(), tomorrow.getMonth()+1, tomorrow.getFullYear()).parseDaysMenu()
            if(!week_menu.isAvailable()) {
                warn("Next week's menu is not available in the excel file.")
                return
            }
            log("Found menu of week "+getXLSXDate(week_menu.monday_date.getTime()) + ", it will be posted now.")
            await week_menu.publishAllMenusToStory()
            await week_menu.moveToHighlight()
        }
    }

    await intervalFunc()
    setInterval(intervalFunc, 60000)
})()