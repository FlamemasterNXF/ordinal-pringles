//Easy Decimal Creation
const D = x => new Decimal(x)

//Important Constant Variables
const PSI_VALUE = 7625597484987
const GRAHAMS_VALUE = 109
const BHO_VALUE = 4*3**40

//Version Flags
const VERSION = "0.1b4"
const VERSION_NAME = "Pringle Collapsing Functions"
const VERSION_DATE = "May 28th, 2023"
const IS_BETA = true
const SAVE_PATH = () => IS_BETA ? "ordinalPRINGLESBETAsave" : "ordinalPRINGLESsave"

//create all the variables in a data object for saving
function getDefaultObject() {
    return {
        nav: {current:"ord", last:"ord"},
        ord: {ordinal:1, over:0, base:10, trim: 5, isPsi: false},
        markup: {powers:0, shifts:0},
        factors: Array(7).fill(0),
        dy: {level:1, gain:0, cap:40},
        autoLevels: Array(2).fill(0),
        boost: {amt:0, total:0, times:0, hasBUP:Array(12).fill(false), isCharged:Array(12).fill(false), unlocks: Array(4).fill(false)},
        chal: {decrementy: D(1), html: -1, completions: Array(8).fill(0), active: Array(8).fill(false), totalCompletions: 0},
        incrementy: {amt:0, hasIUP:Array(9).fill(false), rebuyableAmt: Array(3).fill(0), rebuyableCosts: [20, 1000, 100], charge:0, totalCharge:0},
        hierachies: { ords:[ {ord:1, over:0, base:10, type:"f"}, {ord:1, over:0, base:10, type:"g"} ], rebuyableAmt: Array(6).fill(0), hasUpgrade: Array(6).fill(false)},
        overflow: {bp:1, oc:1},
        collapse: {times:0, cardinals:0, bestCardinalsGained:0, alephs:Array(8).fill(0), hasCUP:Array(8).fill(false), hasSluggish:Array(6).fill(false)},
        darkness: {levels: Array(3).fill(0), negativeCharge:0, drains: Array(7).fill(0), sacrificedCharge:0, totalDrains: 0, negativeChargeEnabled:false, darkened:false},
        autoStatus: {enabled: Array(4).fill(false)},
        sToggles: Array(7).fill(true),
        successorClicks: 0,
        lastTick: 0,
        achs: [],
        loadedVersion: "0.1",
        offline: true,
        gword: false,
        isBeta: IS_BETA,
    }
}
let data = getDefaultObject()

//saving and loading
function save(){
    try{ window.localStorage.setItem(SAVE_PATH(), JSON.stringify(data)) }
    catch (e) {
        createAlert('Error', `Save failed.\n${e}`, 'Dang.');
        console.error(e);
    }
}
function load() {
    let savedata = JSON.parse(window.localStorage.getItem(SAVE_PATH()))
    if (savedata !== undefined) fixSave(data, savedata)
    const extra = fixOldSaves()
    createAlert('Welcome Back!', `You've loaded into Ordinal PRINGLES v${VERSION}: ${VERSION_NAME}\nEnjoy!`, 'Thanks!')

    return extra
}

//fix saves
function fixSave(main=getDefaultObject(), data) {
    if (typeof data === "object") {
        Object.keys(data).forEach(i => {
            if (main[i] instanceof Decimal) {
                main[i] = D(data[i]!==null?data[i]:main[i])
            } else if (typeof main[i]  == "object") {
                fixSave(main[i], data[i])
            } else {
                main[i] = data[i]
            }
        })
        return main
    }
    else return getDefaultObject()
}
function fixOldSaves(){
    let extra = false

    //v0.0.6 => v0.1+
    if(data.collapse.times == 0 && data.ord.ordinal > BHO_VALUE) data.ord.ordinal = BHO_VALUE
    //v0.0.5 => v0.0.6+
    if (data.loadedVersion == "null"){
        if (data.chal.completions[6] > 0) data.chal.completions[6] = 0
        if (data.chal.completions[7] > 0) data.chal.completions[7] = 0
        extra = true
    }
    if (data.offline != true && data.offline != false) data.offline = true
    // v0.0.4 => v0.0.5+
    if (data.chal.completions[0] > 0 && data.chal.totalCompletions == 0){
        for (let i = 0; i < data.chal.completions.length; i++) {
            data.chal.totalCompletions += data.chal.completions[i]
        }
    } 
    //Old
    if(data.markup.shifts === 7 && data.dy.level === 1){
        data.dy.level = 4
        data.dy.gain = 0.002
    }
    if(data.dy.level > data.dy.cap) data.dy.level = data.dy.cap
    if(data.ord.isPsi && data.ord.ordinal > GRAHAMS_VALUE && data.boost.times === 0) data.ord.ordinal = GRAHAMS_VALUE

    return extra
}
function fixOldSavesP2(){
    //v0.0.5 => v0.0.6+
    if (data.loadedVersion == "null"){
        data.loadedVersion = "0.0.6"

        if (data.boost.times > 30) {
            boosterRefund()
            data.boost.times = 30
            data.boost.total = 465
            data.boost.amt = 465
        } 
    } 
}
function exportSave(){
    try {
        save()
        let exportedData = btoa(JSON.stringify(data))
        const exportedDataText = document.createElement("textarea");
        exportedDataText.value = exportedData;
        document.body.appendChild(exportedDataText);
        exportedDataText.select();
        exportedDataText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        document.body.removeChild(exportedDataText);
        createAlert('Export Successful', 'Your Data has been copied to the clipboard!', 'Thanks!')
    }
    catch (e){
        createAlert('Error', `Save export failed.\n${e}`, 'Dang.');
        console.error(e);
    }
}
async function downloadSave() {
    try {
        const file = new Blob([btoa(JSON.stringify(data))], {type: "text/plain"});
        window.URL = window.URL || window.webkitURL;
        const a = document.createElement("a")
        let date = new Date()
        date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
        a.href = window.URL.createObjectURL(file)
        a.download = `Ordinal-Pringles-save-${VERSION}-${date}.txt`
        a.click()
        createAlert("Success!", 'Your save has been successfully downloaded!', 'Thanks!');
    } catch (e) {
        createAlert('Error', `Save download failed.\n${e}`, 'Dang.');
        console.error(e);
        closeModal(1)
    }
}
function importSave(x) {
    if(x == "gwa") return data.gword = true
    if(x == "ungwa") return data.gword = false
    try {
        if(x.length <= 0) {
            DOM('promptContainer').style.display = 'none'
            createAlert('Failure', 'No data found.', `Oops.`)
            return
        }
        data = Object.assign(getDefaultObject(), JSON.parse(atob(x)))
        save()
        location.reload()
    }
    catch (e){
        createAlert('Error', `Save import failed.\n${e}`, 'Dang.');
        console.error(e);
    }
}
window.setInterval(function(){
    save()
}, 10000);
//full reset
function fullReset(){
    exportSave()
    deleteSave()
}
function deleteSave(){
    window.localStorage.removeItem(SAVE_PATH())
    location.reload()
}