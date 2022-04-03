function getDayName(day) {
    return ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'][day]
}

function getDayNumber(day_name) {
    return ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].findIndex(value => value === day_name)
}

function getMonthName(month) {
    return ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'][month]
}

function getDateNow() {
    const dateNow = new Date()
    return `${dateNow.getDate()}/${dateNow.getMonth()}/${dateNow.getFullYear()} à ${dateNow.getHours()}:${dateNow.getMinutes()}`
}

export {getDayName, getMonthName, getDayNumber, getDateNow}