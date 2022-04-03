import captureWebsite from "capture-website";
import fs from 'fs';
import {parse} from "node-html-parser";
import {getDayName, getMonthName} from "./DateUtil.js";
import {getXLSXDate} from "./XLSXUtil.js";
import {log} from "./Logger.js";
import sharp from 'sharp'
import sizeOf from 'image-size'

function getHTMLFromMenu(dayMenu) {
    const dom = parse(fs.readFileSync('content/index.html'));
    dom.getElementById('date').innerHTML = `${getDayName(dayMenu.getDate().getDay())} ${dayMenu.getDate().getDate()} ${getMonthName(dayMenu.getDate().getMonth())}`
    const instaElem = dom.getElementById('insta')

    if(dayMenu.getRepasMidi().isAvailable()) {
        instaElem.insertAdjacentHTML('beforebegin', `<h3>----- ${dayMenu.getRepasMidi().getName()} -----</h3>`)
        dayMenu.getRepasMidi().getEntree() && instaElem.insertAdjacentHTML('beforebegin', dayMenu.getRepasMidi().getEntreeHTML())
        dayMenu.getRepasMidi().getFirstPlat() && instaElem.insertAdjacentHTML('beforebegin', dayMenu.getRepasMidi().getFirstPlatHTML())
        dayMenu.getRepasMidi().getSecondPlat() && instaElem.insertAdjacentHTML('beforebegin', dayMenu.getRepasMidi().getSecondPlatHTML())
        dayMenu.getRepasMidi().getFirstDessert() && instaElem.insertAdjacentHTML('beforebegin', dayMenu.getRepasMidi().getFirstDessertHTML())
        dayMenu.getRepasMidi().getSecondDessert() && instaElem.insertAdjacentHTML('beforebegin', dayMenu.getRepasMidi().getSecondDessertHTML())
    }

    if(dayMenu.getRepasSoir().isAvailable()) {
        instaElem.insertAdjacentHTML('beforebegin', `<h3>----- ${dayMenu.getRepasSoir().getName()} -----</h3>`)
        dayMenu.getRepasSoir().getEntree() && instaElem.insertAdjacentHTML('beforebegin', dayMenu.getRepasSoir().getEntreeHTML())
        dayMenu.getRepasSoir().getFirstPlat() && instaElem.insertAdjacentHTML('beforebegin', dayMenu.getRepasSoir().getFirstPlatHTML())
        dayMenu.getRepasSoir().getSecondPlat() && instaElem.insertAdjacentHTML('beforebegin', dayMenu.getRepasSoir().getSecondPlatHTML())
        dayMenu.getRepasSoir().getFirstDessert() && instaElem.insertAdjacentHTML('beforebegin', dayMenu.getRepasSoir().getFirstDessertHTML())
        dayMenu.getRepasSoir().getSecondDessert() && instaElem.insertAdjacentHTML('beforebegin', dayMenu.getRepasSoir().getSecondDessertHTML())
    }

    return dom.toString()
}

/*
Create an HTML capture of the html file and return it
 */
async function getHTMLCapture(day_menu) {
    const filePath = `screenshots/story-${getXLSXDate(day_menu.getDate().getTime()).replaceAll(' ', '-')}.jpg`

    log("Taking a screenshot, please wait 2 seconds...")
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
            type: 'jpeg',
            fullPage: true
        });

        //Get dimensions of screenshot
        const dimensions = await sizeOf(filePath);

        //Resize the full page screenshot with the 9:16 aspect ratio
        await resizeFile(filePath, Math.round(dimensions.height / 1.77777777), dimensions.height)

        log("Screenshot taken!")

        return filePath;
    } catch (e) {
        console.log('Une erreur est survenue lors de la capture !', e)
    }
}

async function resizeFile(path, width, height) {
    let buffer = await sharp(path)
        .resize(width, height)
        .toBuffer();
    return sharp(buffer).toFile(path);
}

export {getHTMLCapture, getHTMLFromMenu}