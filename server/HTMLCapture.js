import captureWebsite from "capture-website";
import { readFile } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

/*
Create an HTML capture of the html file and return it
 */
async function getHTMLCapture() {
    const time = Date.now()
    const filePath = `screenshots/story-${time}.jpg`

    try {
        await captureWebsite.file('content/index.html', filePath, {
            launchOptions: {
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ]
            }
        });

        return await readFileAsync(filePath);
    } catch (e) {
        console.log('Une erreur est survenue lors de la capture !', e)
    }
}

getHTMLCapture()