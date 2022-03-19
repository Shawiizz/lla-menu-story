function getXLSXDate(time) {
    const date = new Date()
    time && date.setTime(time)
    let d = date.toISOString().slice(0, 10).split('-')
    return d[2] + " "+d[1]+" "+d[0]
}

export {getXLSXDate}