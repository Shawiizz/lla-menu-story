import {parseWeekMenu} from "../MenuParser.js";
import {IGData, saveIGData} from "../instagram/IGData.js";
import {getXLSXDate} from "../util/XLSXUtil.js";
import {createHighlight, deleteHighlightByID} from "../instagram/api/Highlights.js";

class WeekMenu {
    constructor() {
        this.daysMenu = []
        this.media_ids = []
        this.monday_date = undefined
    }

    setMondayDate(d, m, y) {
        this.monday_date = new Date(parseInt(y), parseInt(m)-1 /*Don't forget this is an index so remove 1*/, parseInt(d), 6)
        return this
    }

    parseDaysMenu() {
        this.daysMenu = parseWeekMenu(this.monday_date)
        return this
    }

    async publishAllMenusToStory() {
        for(const dayMenu of this.daysMenu) {
            const req = await dayMenu.publishToStory()
            if(!req || !req?.media?.id) {
                console.log("A STORY CANNOT BE UPLOADED!!")
                return
            }
            this.media_ids.push(req.media.id)
        }
    }

    async publishDays(day_names) {
        for(const day_name of day_names) {
            const dayMenu = this.daysMenu.find(menu => menu.getDayName() === day_name)
            if(!dayMenu) continue
            const req = await dayMenu.publishToStory()
            if(!req || !req?.media?.id) {
                console.log("A STORY CANNOT BE UPLOADED!!")
                return
            }
            this.media_ids.push(req.media.id)
        }
    }

    async moveToHighlight() {
        //Make sure the former highlight is deleted before creating a new one
        IGData.highlight_id.length > 0 && await deleteHighlightByID(IGData.highlight_id)

        const res = await createHighlight('Menu du self', this.media_ids)
        if(!res || !res.reel.id) {
            console.log("Error when creating an highlight!")
            return
        }

        IGData.highlight_id = res.reel.id
        IGData.media_ids = this.media_ids
        this.makeAsDid()

        console.log("Done!");
    }

    makeAsDid() {
        IGData.posted_menus.push(getXLSXDate(this.monday_date.getTime()))
        saveIGData()
    }
}

export {WeekMenu}