import { initCommandHandler} from "./server/util/CommandUtil.js";
import {WeekMenu} from "./server/classes/WeekMenu.js";
import {IGData} from "./server/instagram/IGData.js";
import {getXLSXDate} from "./server/util/XLSXUtil.js";
import * as Authentication from "./server/instagram/Authentication.js";
import {askForCredentials, ig_password, ig_username} from "./server/instagram/Authentication.js";

(async () => {
    await askForCredentials()
    initCommandHandler()

    /*Login into Instagram
    + Parse IG Data and check excel file
     */
    await Authentication.login(ig_username, ig_password);

    setInterval(async () => {
         //if day is sunday
         if(new Date().getDay() === 0) {
             const tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
             const xlsxDate = getXLSXDate(tomorrow.getTime())

             //Menu has been already posted
             if(IGData.posted_menus.includes(xlsxDate)) return

             //Take the screenshots, post as story and save in highlight.
             const week_menu = new WeekMenu().setMondayDate(tomorrow.getDate(), tomorrow.getMonth()+1, tomorrow.getFullYear()).parseDaysMenu()
             await week_menu.publishAllMenusToStory()
             await week_menu.moveToHighlight()
         }
     }, 60000)
})()