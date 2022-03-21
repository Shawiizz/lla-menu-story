import xlsx from "node-xlsx";

function getXLSXDate(time) {
    const date = new Date()
    time && date.setTime(time)
    let d = date.toISOString().slice(0, 10).split('-')
    return d[2] + " "+d[1]+" "+d[0]
}

/*
Check that the name of every sheet is different and that it's a monday.
 */
function checkXLSXFile() {
    const data = xlsx.parse(`files/menus.xlsx`);
    for(const {name} of data) {
        const n = name.split(' ')
        const monday = new Date(parseInt(n[2]), parseInt(n[1])-1, parseInt(n[0]), 6)
        if(isNaN(monday.getTime()) || monday.getDay() !== 1) {
            console.log("XLSX File isn't correct! The wrong sheet name is "+name+". Please fix it.");
            process.exit()
        }
    }
}

export {getXLSXDate, checkXLSXFile}