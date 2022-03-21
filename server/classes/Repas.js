class Repas {
    constructor() {
        this.entree = undefined;
        this.first_plat = undefined;
        this.second_plat = undefined;
        this.first_dessert = undefined;
        this.second_dessert = undefined;

        this.message = undefined //A custom message
    }

    isAvailable() {
        return this.getEntree() || this.getFirstPlat() || this.getSecondPlat() || this.getFirstDessert() || this.getSecondDessert()
    }

    setEntree(entree) {
        this.entree = entree
        return this
    }

    setFirstPlat(plat1) {
        this.first_plat = plat1
        return this
    }

    setSecondPlat(plat2) {
        this.second_plat = plat2;
        return this
    }

    setFirstDessert(dessert1) {
        this.first_dessert = dessert1
        return this
    }

    setSecondDessert(dessert2) {
        this.second_dessert = dessert2
        return this
    }

    setMessage(message) {
        this.message = message
        return this
    }

    getEntree() { return this.entree}
    getFirstPlat() {return this.first_plat}
    getSecondPlat() {return this.second_plat}
    getFirstDessert() {return this.first_dessert}
    getSecondDessert() {return this.second_dessert}
    getMessage() {return this.message}
}

export {Repas}