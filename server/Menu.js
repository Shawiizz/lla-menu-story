import xlsx from "node-xlsx";
import * as fs from "fs";

/*
const midiIndexes = [3, 4, 5, 6, 7]
const soirIndexes = [10, 11, 12, 13, 14]
*/

function getMenu(monday) {
    const daysMenu = new Map()

    const data = xlsx.parse(`files/menus.xlsx`).find(value => value.name === monday)?.data;
    if(!data) return undefined

    let column = 1
    while (true) {
        try {
            const date = data[0][column]

            const entree_midi = data[3][column]
            const platchaud1_midi = data[4][column]
            const platchaud2_midi = data[5][column]
            const dessert1_midi = data[6][column]
            const dessert2_midi = data[7][column]

            const entree_soir = data[10][column]
            const platchaud1_soir = data[11][column]
            const platchaud2_soir = data[12][column]
            const dessert1_soir = data[13][column]
            const dessert2_soir = data[14][column]

            if (date === undefined) break

            daysMenu.set(date, {
                midi: {
                    entree: entree_midi,
                    platchaud1: platchaud1_midi,
                    platchaud2: platchaud2_midi,
                    dessert1: dessert1_midi,
                    dessert2: dessert2_midi
                },
                soir: {
                    entree: entree_soir,
                    platchaud1: platchaud1_soir,
                    platchaud2: platchaud2_soir,
                    dessert1: dessert1_soir,
                    dessert2: dessert2_soir
                }
            })
        } catch (e) {
            console.log("Excel file isn't complete! Please check it and try again.");
            break
        }
        column++
    }

    return daysMenu.size === 0 ? undefined : daysMenu
}

export {getMenu}