//Easy Decimal Creation
const D = x => new Decimal(x)

//Important Constant Variables
const PSI_VALUE = 7625597484987
const GRAHAMS_VALUE = 109
const BHO_VALUE = 4*3**40

//Version Flags
const VERSION = "0.3.2"
const VERSION_NAME = "The World's Purest Pringle"
const VERSION_DATE = "December 17th, 2023"
const IS_BETA = false
const SAVE_PATH = () => IS_BETA ? "ordinalPRINGLESBETAsave" : "ordinalPRINGLESsave"

//create all the variables in a data object for saving
function getDefaultObject() {
    return {
        nav: {current:"ord", last:"ord"},
        ord: {ordinal:D(1), over:0, base:10, trim: 5, isPsi: false, color:false},
        markup: {powers:0, shifts:0},
        factors: Array(7).fill(0),
        dy: {level:1, gain:0, cap:40},
        autoLevels: Array(2).fill(0),
        boost: {amt:0, total:0, times:0, bottomRowCharges:0, hasBUP:Array(15).fill(false), isCharged:Array(15).fill(false), unlocks: Array(5).fill(false)},
        chal: {decrementy: D(1), html: -1, completions: Array(8).fill(0), active: Array(8).fill(false), totalCompletions: 0},
        incrementy: {amt:D(0), hasIUP:Array(12).fill(false), rebuyableAmt: Array(6).fill(0), charge:0, totalCharge:0},
        hierarchies: { ords:[ {ord:1, over:0, type:"f"}, {ord:1, over:0, type:"g"} ], rebuyableAmt: Array(6).fill(0), hasUpgrade: Array(10).fill(false)},
        overflow: {bp:1, oc:1, thirdEffect:true}, //for thirdEffect: true=normal, false=inverted
        collapse: {times:0, cardinals:0, bestCardinalsGained:0, alephs:Array(alephData.length).fill(0), hasCUP:Array(8).fill(false), hasSluggish:Array(5).fill(false), apEnabled:Array(2).fill(false)},
        darkness: {levels: Array(3).fill(0), negativeCharge:0, drains: Array(7).fill(0), sacrificedCharge:0, totalDrains: 0, chargeSpent:0, negativeChargeEnabled:false, darkened:false},
        sing: {highestLevel:0, level:0, tutorial:false, hasEverHadFunction: Array(singFunctions.length).fill(false)},
        baseless:{alephNull: 0, mode:0, baseless:false, shifts:0, bestOrdinalInMode: Array(3).fill(0), anRebuyables: Array(anRebuyableData.length).fill(0), tutorial: false},
        omega:{bestRemnants: 0, alephOmega:1, bestFBInPurification: Array(4).fill(0), purificationIsActive: Array(4).fill(false), whichPurification: -1, aoRebuyables:Array(8).fill(0), tutorial: false},
        autoStatus: {enabled: Array(7).fill(false)},
        sToggles: settingsDefaults,
        successorClicks: 0,
        lastTick: 0,
        achs: Array(achievements.length).fill(false),
        loadedVersion: VERSION,
        isBeta: IS_BETA,
        offline: true,
        gword: {unl: false, enabled: false},
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
    let extra = fixOldSaves()
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

    //Settings fix
    if(typeof data.sToggles === "number") data.sToggles = settingsDefaults
    if(typeof data.gword === 'boolean') data.gword = {unl: data.gword, enabled: data.gword}

    //Decimal Fix
    if(Number.isNaN(data.incrementy.amt.toNumber())) data.incrementy.amt = D(0)
    if(Number.isNaN(data.ord.ordinal.toNumber())) data.ord.ordinal = D(0)
    data.incrementy.amt = D(data.incrementy.amt)
    data.ord.ordinal = D(data.ord.ordinal)

    //v0.2.3 and v0.3b2 => v0.3
    if(data.loadedVersion === "0.2.3" || data.loadedVersion === "0.3b2"){
        for (let i = 0; i < data.hierarchies.rebuyableAmt.length; i++) {
            if(data.hierarchies.rebuyableAmt[i] > 3333) data.hierarchies.rebuyableAmt[i] = 3333
        }
        data.loadedVersion = "0.3"
    }

    //v0.2.3 => v0.3b2 (b1 was skipped)
    if(data.loadedVersion === "0.2.3"){
        if(data.omega.completions !== Array(5).fill(0)) data.omega.completions = Array(5).fill(0)
        data.loadedVersion = "0.3b2"
    }

    //v0.2.2 => v0.2.3
    if(data.loadedVersion === "0.2.2") extra = true

    //0.2.1 => v0.2.2
    if(data.loadedVersion === "0.2.1") data.loadedVersion = "0.2.2"

    //Any => v0.2.1
    if(data.loadedVersion < "0.2.1"){
        data.achs = Array(achievements.length).fill(false)
        data.loadedVersion = "0.2.1"
    }

    //v0.1.1 => v0.1.2
    if(data.loadedVersion < "0.1.2" || data.loadedVersion === "null") {
        data.hierarchies = data.hierachies;
        for (let i = 7; i >= 5; i--) data.hierarchies.hasUpgrade[i] = data.hierarchies.hasUpgrade[i-2];
        for (let i = 3; i < 5; i++) data.hierarchies.hasUpgrade[i] = false;
        for (let i = 13; i >= 10; i--) { data.boost.hasBUP[i] = data.boost.hasBUP[i-2]; data.boost.isCharged[i] = data.boost.isCharged[i-2]; }
        data.boost.hasBUP[9] = false; data.boost.isCharged[9] = false;
        for (let i = 8; i >= 5; i--) { data.boost.hasBUP[i] = data.boost.hasBUP[i-1]; data.boost.isCharged[i] = data.boost.isCharged[i-1]; }
        data.boost.hasBUP[4] = false; data.boost.isCharged[4] = false;
        if(data.collapse.hasSluggish.length === 6) data.collapse.hasSluggish.pop();
        if(data.collapse.hasSluggish[3]){
            data.collapse.hasSluggish[3] = false
            data.collapse.hasSluggish[4] = false
        }
        extra = true
    }
    //v0.1 => v0.1.1
    if(data.loadedVersion === "0.0.6") data.loadedVersion = "0.1" //Forgot to do this, thankfully I caught it in time
    if(data.loadedVersion === "0.1" && data.collapse.hasSluggish[1]) extra = true
    //v0.0.6 => v0.1+
    if(data.collapse.times === 0 && data.ord.ordinal.gt(BHO_VALUE)) data.ord.ordinal = D(BHO_VALUE)
    //v0.0.5 => v0.0.6+
    if (data.loadedVersion === "null"){
        if (data.chal.completions[6] > 0) data.chal.completions[6] = 0
        if (data.chal.completions[7] > 0) data.chal.completions[7] = 0
        extra = true
    }
    if (data.offline !== true && data.offline !== false) data.offline = true
    // v0.0.4 => v0.0.5+
    if (data.chal.completions[0] > 0 && data.chal.totalCompletions === 0){
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
    if(data.ord.isPsi && data.ord.ordinal.gt(GRAHAMS_VALUE) && data.boost.times === 0 && !data.collapse.hasSluggish[0]) data.ord.ordinal = D(GRAHAMS_VALUE)

    return extra
}
function fixOldSavesP2(){
    //v0.2.2 => v0.2.3
    if(data.loadedVersion === "0.2.2"){
        data.loadedVersion = "0.2.3"
        if(!data.boost.unlocks[4]) return
        data.baseless.baseless ? baselessControl() : collapse(false, true)
        data.baseless.alephNull = 0
    }
    //v0.1 => v0.1.1
    if(data.loadedVersion < "0.1.1" || data.loadedVersion === "null"){
        data.incrementy.charge += data.darkness.sacrificedCharge
        data.incrementy.totalCharge += data.darkness.sacrificedCharge
        resetDarkness(true)
        data.loadedVersion = "0.1.2"
    }

    //v0.0.5 => v0.0.6
    // Not very elegant, my first attempt at doing something like this
    if (data.loadedVersion === "null") {
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
    if(x === "gwa"){
        if(!data.gword.unl) createAlert('Secret!', 'You have unlocked the secret <img src=\'https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24\'> Ordinal Display! You can now enable or disable it in Settings :) If you\'re curious what those gwas mean check out the Info Box next to the <img src=\'https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24\'> Display Setting!', '<img src=\'https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24\'>!')
        data.gword.unl = true
        data.gword.enabled = true
        return closeModal('prompt')
    }
    try {
        if(x.length <= 0) {
            DOM('promptContainer').style.display = 'none'
            createAlert('Failure', 'No data found.', `Oops.`)
            return
        }
        data = Object.assign(getDefaultObject(), JSON.parse(atob(x)))
        if(data.isBeta && !IS_BETA) return createAlert('Beta Save detected!', 'You tried to load a Beta Save into the main version. This is not allowed, sorry :(', 'Dang it!')
        save()
        location.reload()
    }
    catch (e){
        closeModal('prompt')
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
