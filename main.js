import {parseWeekMenu} from "./server/MenuParser.js";
import * as Authentication from "./server/instagram/Authentication.js";
import {initCommandHandler} from "./server/util/CommandUtil.js";
import {WeekMenu} from "./server/classes/WeekMenu.js";

(async () => {
    initCommandHandler()

    await Authentication.login('', '');

    const week_menu = new WeekMenu().setMondayDate('21', '03', '2022').parseDaysMenu()
    await week_menu.publishDays(['Lundi'])
    await week_menu.moveToHighlight()


    /*setInterval(() => {
        //if day is sunday
        if(new Date().getDay() === 0) {
            const tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
            const xlxsDate = getXLSXDate(tomorrow.getTime())

            if(IGData.posted_menus.includes(xlxsDate)) return

            IGData.posted_menus.push(xlxsDate)
            saveIGData()

            //Take the screenshots, post as story and save in highlight.
        }
    }, 60000)*/

    //await test()
})()

async function test() {
    console.log(parseWeekMenu('21 03 2022'));

    console.log(new Date().getDay());

}