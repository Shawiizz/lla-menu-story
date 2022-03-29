import captureWebsite from "capture-website";
import fs from 'fs';
import {parse} from "node-html-parser";
import {getDayName, getMonthName} from "./DateUtil.js";
import {getXLSXDate} from "./XLSXUtil.js";

function getHTMLFromMenu(dayMenu) {
    const dom = parse(fs.readFileSync('content/index.html'));
    dom.getElementById('date').innerHTML = `${getDayName(dayMenu.getDate().getDay())} ${dayMenu.getDate().getDate()} ${getMonthName(dayMenu.getDate().getMonth())}`
    dom.getElementById('entree_midi').innerHTML = '<strong>Entrée:</strong> '+dayMenu.getRepasMidi().getEntree()
    dom.getElementById('plat1_midi').innerHTML = '<strong>Plat 1:</strong> '+dayMenu.getRepasMidi().getFirstPlat()
    dom.getElementById('plat2_midi').innerHTML = '<strong>Plat 2:</strong> '+dayMenu.getRepasMidi().getSecondPlat()
    dom.getElementById('dessert1_midi').innerHTML = '<strong>Dessert 1:</strong> '+dayMenu.getRepasMidi().getFirstDessert()
    dom.getElementById('dessert2_midi').innerHTML = '<strong>Dessert 2:</strong> '+dayMenu.getRepasMidi().getSecondDessert()
    dom.getElementById('entree_soir').innerHTML = '<strong>Entrée:</strong> '+dayMenu.getRepasSoir().getEntree()
    dom.getElementById('plat1_soir').innerHTML = '<strong>Plat 1:</strong> '+dayMenu.getRepasSoir().getFirstPlat()
    dom.getElementById('plat2_soir').innerHTML = '<strong>Plat 2:</strong> '+dayMenu.getRepasSoir().getSecondPlat()
    dom.getElementById('dessert1_soir').innerHTML = '<strong>Dessert 1:</strong> '+dayMenu.getRepasSoir().getFirstDessert()
    dom.getElementById('dessert2_soir').innerHTML = '<strong>Dessert 2:</strong> '+dayMenu.getRepasSoir().getSecondDessert()

    if(!dayMenu.getRepasMidi().isAvailable()) {
        dom.getElementById('entree_midi').remove()
        dom.getElementById('plat1_midi').remove()
        dom.getElementById('plat2_midi').remove()
        dom.getElementById('dessert1_midi').remove()
        dom.getElementById('dessert2_midi').remove()
    }
    if(!dayMenu.getRepasSoir().isAvailable()) {
        dom.getElementById('entree_soir').remove()
        dom.getElementById('plat1_soir').remove()
        dom.getElementById('plat2_soir').remove()
        dom.getElementById('dessert1_soir').remove()
        dom.getElementById('dessert2_soir').remove()
    }
    return dom.toString()
}

/*
Create an HTML capture of the html file and return it
 */
async function getHTMLCapture(day_menu) {
    const filePath = `screenshots/story-${getXLSXDate(day_menu.getDate().getTime()).replaceAll(' ', '-')}.jpg`

    console.log("Taking a screenshot, please wait 2 seconds...")
    try {
        await captureWebsite.file(day_menu.getHTML(), filePath, {
            launchOptions: {
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ]
            },
            inputType: 'html',
            delay: 2, //We need to wait for fonts to be loaded before taking the screenshot, i think 2 seconds is enough
            overwrite: true,
            width: 410,
            height: 730,
            type: 'jpeg'
        });

        console.log("Screenshot taken!")

        return filePath;
    } catch (e) {
        console.log('Une erreur est survenue lors de la capture !', e)
    }
}

export {getHTMLCapture, getHTMLFromMenu}