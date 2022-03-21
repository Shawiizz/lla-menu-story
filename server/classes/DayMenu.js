import {getHTMLFromMenu} from "../util/HTMLUtil.js";
import {getDayName} from "../util/DateUtil.js";

class DayMenu {
    constructor() {
        this.repas_midi = undefined
        this.repas_soir = undefined
        this.date = undefined
    }

    setRepasMidi(repas_midi) {
        this.repas_midi = repas_midi
        return this
    }

    setRepasSoir(repas_soir) {
        this.repas_soir = repas_soir
        return this
    }

    setDate(date_obj) {
        this.date = date_obj
        return this
    }

    getRepasMidi() {return this.repas_midi}
    getRepasSoir() {return this.repas_soir}
    getDate() {return this.date}
    getDayName() {return getDayName(this.date.getDay())}

    getHTML() {
        return getHTMLFromMenu(this)
    }
}

export {DayMenu}