import {IgApiClient} from 'instagram-private-api';
import fs from 'fs';
import {deleteHighlightByID, getHighlightByName} from "./server/Highlights.js";
import {getMenu} from "./server/Menu.js";
import {getXLSXDate} from "./server/Util.js";

const username = 'sauc_issonsauvage'
const password = ''
const ig = new IgApiClient();
let currentUser;
let IGData = {
    "highlight_id": "",
    "media_ids": [],
    "posted_menus": []
};

async function login() {
    ig.state.generateDevice(username);
    await ig.account.login(username, password);
    currentUser = await ig.account.currentUser()
}

function saveIGData() {
    fs.writeFileSync('./files/igdata.json', JSON.stringify(IGData, null, 4))
}

function getIGData() {
    IGData = JSON.parse(fs.readFileSync('./files/igdata.json'))
    return IGData
}

(async () => {
    getIGData()
    //await login();

    await test()
})()

async function test() {
    console.log(getMenu('21 03 2022'));

    console.log(new Date().getDay());

    if(new Date().getDay() === 0) {
        const tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
        const xlxsDate = getXLSXDate(tomorrow.getTime())

        if(IGData.posted_menus.includes(xlxsDate)) return

        //Take the screenshots, post as story and save in highlight.
    }
    setInterval(() => {

    }, 30000)

    //ig.account.currentUser().then(value => console.log(value.pk))

    /*
      const res = await postStory('./story.jpg')
        const res2 = await postStory('./story2.jpg')

        if(res?.media?.id && res2?.media?.id) {
          const s = await createHighlight('Test', [res?.media?.id, res2?.media?.id])
      }*/
/*
    const hightlight = await getHighlightByName('Test')
    await deleteHighlightByID(hightlight.id)*/

    /*
      await ig.highlights.createReel({
          title: "Coucou",
          mediaIds: ['2797544611573360415_52611353396']
      })*/

    /*const result = await ig.publish.story({
      file,
    });

      console.log(result);*/


    //console.log(getPostedMenus());
}

export {ig, currentUser}