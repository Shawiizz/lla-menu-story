import xlsx from "node-xlsx";
import {getDayName, getDayNumber} from "./util/DateUtil.js";
import {DayMenu} from "./classes/DayMenu.js";
import {Repas} from "./classes/Repas.js";
import {getXLSXDate} from "./util/XLSXUtil.js";

/*
const midiIndexes = [3, 4, 5, 6, 7]
const soirIndexes = [10, 11, 12, 13, 14]
*/

function parseWeekMenu(monday_date_object) {
    const daysMenu = []

    if(!monday_date_object instanceof Date) {
        console.log('Wrong date object given');
        return
    }

    const data = xlsx.parse(`files/menus.xlsx`).find(value => value.name === getXLSXDate(monday_date_object.getTime()))?.data;
    if(!data) return undefined

    let column = 1
    while (true) {
        try {
            const day_name = data[0][column]
            if (day_name === undefined) break

            daysMenu.push(new DayMenu()
                .setDate(new Date(monday_date_object.getFullYear(), monday_date_object.getMonth(), monday_date_object.getDate()+getDayNumber(day_name)-1, 6 /* Set to 6 hours to make sure the getTime will return this day*/))
                .setRepasMidi(
                    new Repas()
                        .setEntree(data[3][column])
                        .setFirstPlat(data[4][column])
                        .setSecondPlat(data[5][column])
                        .setFirstDessert(data[6][column])
                        .setSecondDessert(data[7][column])
                )
                .setRepasSoir(
                    new Repas()
                        .setEntree(data[10][column])
                        .setFirstPlat(data[11][column])
                        .setSecondPlat(data[12][column])
                        .setFirstDessert(data[13][column])
                        .setSecondDessert(data[14][column])
                )
            )
        } catch (e) {
            console.log("Excel file isn't complete! Please check it and try again.");
            break
        }
        column++
    }

    return daysMenu.length === 0 ? undefined : daysMenu
}

export {parseWeekMenu}