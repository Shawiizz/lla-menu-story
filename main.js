import {getWeekMenu} from "./server/MenuParser.js";
import * as Authentication from "./server/instagram/Authentication.js";
import {getHTMLCapture} from "./server/util/HTMLUtil.js";

(async () => {
   // await Authentication.login('', '');

    const week_menu = getWeekMenu('21 03 2022')
    const monday_menu = week_menu[0] //example
    console.log(monday_menu.getDayName());
    await getHTMLCapture(monday_menu)

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
    console.log(getWeekMenu('21 03 2022'));

    console.log(new Date().getDay());

}