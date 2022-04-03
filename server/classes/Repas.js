class Repas {
    constructor() {
        this.entree = undefined;
        this.first_plat = undefined;
        this.second_plat = undefined;
        this.first_dessert = undefined;
        this.second_dessert = undefined;
        this.name = undefined;

        this.message = undefined //A custom message
    }

    isAvailable() {
        return this.getEntree() || this.getFirstPlat() || this.getSecondPlat() || this.getFirstDessert() || this.getSecondDessert()
    }

    setName(name) {
        this.name = name
        return this
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
    getEntreeHTML() { return `<p><strong>Entrée:</strong> ${this.getEntree().replaceAll('\n', '<br>')}</p>`}
    getFirstPlat() {return this.first_plat}
    getFirstPlatHTML() {return `<p><strong>Plat 1:</strong> ${this.getFirstPlat().replaceAll('\n', '<br>')}</p>`}
    getSecondPlat() {return this.second_plat}
    getSecondPlatHTML() {return `<p><strong>Plat 2:</strong> ${this.getSecondPlat().replaceAll('\n', '<br>')}</p>`}
    getFirstDessert() {return this.first_dessert}
    getFirstDessertHTML() {return `<p><strong>Dessert 1:</strong> ${this.getFirstDessert().replaceAll('\n', '<br>')}</p>`}
    getSecondDessert() {return this.second_dessert}
    getSecondDessertHTML() {return `<p><strong>Dessert 2:</strong> ${this.getSecondDessert().replaceAll('\n', '<br>')}</p>`}
    getMessage() {return this.message}
    getName() {return this.name}
}

export {Repas}