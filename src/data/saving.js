//Version Flags
const VERSION = "0.4.3p3"
const VERSION_NAME = "The Pringle Update"
const VERSION_DATE = "February 16th, 2025"
const IS_BETA = false
const SAVE_PATH = () => IS_BETA ? "ordinalPRINGLESBETAsave" : "ordinalPRINGLESsave"

// Saving the game
let getSaveData = () => JSON.stringify(data)
function save(saveData = getSaveData()){
    try {
        window.localStorage.setItem(SAVE_PATH(), saveData)
    }
    catch (e) {
        showNotification(`Save failed.\n${e}`);
        console.error(e);
    }
}

function saveAndReload(saveData = getSaveData()){
    save(saveData)
    location.reload()
}

// Loading
function load(first = false) {
    let savedata = JSON.parse(window.localStorage.getItem(SAVE_PATH()))
    if (savedata !== undefined) unpackSave(data, savedata)
    let extra = fixOldSaves()
    if(first) showNotification(`You're playing Ordinal PRINGLES v${VERSION}: ${VERSION_NAME}, Enjoy!`)

    return extra
}

// Converting the strings back into their proper types
function unpackSave(main=getDefaultPlayer(), data) {
    if (typeof data === "object") {
        Object.keys(data).forEach(i => {
            if (main[i] instanceof Decimal) {
                main[i] = D(data[i]!==null?data[i]:main[i])
            } else if (typeof main[i]  == "object") {
                unpackSave(main[i], data[i])
            } else {
                main[i] = data[i]
            }
        })
        return main
    }
    else return getDefaultPlayer()
}

// Apply necessary fixes to old saves
function fixOldSaves(){
    let extra = false

    //Settings fix
    if(typeof data.sToggles === "number") data.sToggles = settingsDefaults
    if(typeof data.gword === 'boolean') data.gword = {unl: data.gword, enabled: data.gword}
    if(data.sToggles[14] === false) data.sToggles[14] = true

    //Decimal Fix
    if(Number.isNaN(data.incrementy.amt.toNumber())) data.incrementy.amt = D(0)
    if(Number.isNaN(data.ord.ordinal.toNumber())) data.ord.ordinal = D(0)
    if(Number.isNaN(data.markup.powers.toNumber())) data.markup.powers = D(0)
    data.incrementy.amt = D(data.incrementy.amt)
    data.ord.ordinal = D(data.ord.ordinal)
    data.ord.over = D(data.ord.over)
    data.markup.powers = D(data.markup.powers)
    data.dy.level = D(data.dy.level)
    data.dy.gain = D(data.dy.gain)
    for (let i = 0; i < data.hierarchies.ords.length; i++) {
        data.hierarchies.ords[i].ord = D(data.hierarchies.ords[i].ord)
        data.hierarchies.ords[i].over = D(data.hierarchies.ords[i].over)
    }

    //AutoShift Fix
    if(data.markup.shifts > 7) data.markup.shifts = 7

    if(data.loadedVersion === "0.4.3λ" || data.loadedVersion === "0.4.3γ") data.loadedVersion = "0.4.3"

    if(data.loadedVersion === "0.4b7"){
        data.obliterate.instability = data.obliterate.times
        data.loadedVersion = "0.4b7p2"
    }

    if(data.loadedVersion === "0.4b5"){
        data.obliterate.pringleAmount = Array(10).fill(0)
        data.purity.isAssigned = Array(10).fill(0)
        data.purity.assignment = Array(10).fill(false)

        delete data.instability
        delete data.boost.isDestab

        data.obliterate.instability = data.obliterate.times
        data.loadedVersion = "0.4b7p2"
    }

    if(data.loadedVersion === "0.3"){
        for (let i = 0; i < data.obliterate.pringleAmount.length; i++) {
            data.obliterate.pringleAmount[i] = 0
        }
        data.loadedVersion = "0.4b5"
    }

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
    if(data.collapse.times === 0 && data.obliterate.times === 0 && data.ord.ordinal.gt(BHO_VALUE)) data.ord.ordinal = D(BHO_VALUE)
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
    if(data.markup.shifts === 7 && data.dy.level.eq(1)){
        data.dy.level = D(4)
        data.dy.gain = D(0.002)
    }
    if(data.dy.level.gt(getDyCap())) data.dy.level = getDyCap()
    if(data.ord.isPsi && data.ord.ordinal.gt(GRAHAMS_VALUE) && data.boost.times === 0 && !data.collapse.hasSluggish[0]) data.ord.ordinal = D(GRAHAMS_VALUE)

    return extra
}

// Apply more fixes to old saves, specifically those that need the game to be fully loaded first
function fixOldSavesAfterLoad(){
    // Exploit Fix
    if(data.obliterate.passiveEnergy > getTotalEnergyInvested() || getTotalPassiveEnergyInvested() > getTotalEnergyInvested() || getTotalPassiveEnergyInvested() + data.obliterate.passiveEnergy > getTotalEnergyInvested()){
        respecPassiveUpgrades()
        data.obliterate.passiveEnergy = getTotalEnergyInvested()
    }

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

// Export the current save to the clipboard
function copySaveToClipboard(){
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
        showNotification('Your save has been copied to the clipboard!')
    }
    catch (e){
        showNotification(`Save export failed.\n${e}`)
        console.error(e);
    }
}

// Export the current save into an actual file
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
        showNotification('Your save has been successfully downloaded!')
    } catch (e) {
        showNotification(`Save download failed.\n${e}`)
        console.error(e);
        closeModal(1)
    }
}

// Import a save into the game
function importSave(x) {
    // Easter Egg
    if(x === "gwa"){
        if(!data.gword.unl) showNotification('You have unlocked the secret <img src=\'https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24\'> Ordinal Display! You can now enable or disable it in Settings :)')
        data.gword.unl = true
        data.gword.enabled = true
        return closeModal('prompt')
    }

    try {
        if(x.length <= 0) {
            DOM('promptContainer').style.display = 'none'
            showNotification('No data found.')
            return
        }
        data = Object.assign(getDefaultPlayer(), JSON.parse(atob(x)))
        if(data.isBeta && !IS_BETA) return showNotification('You tried to load a Beta Save into the main version. This is not allowed, sorry :(')
        saveAndReload()
    }
    catch (e){
        closeModal('prompt')
        showNotification(`Save import failed.\n${e}`);
        console.error(e);
    }
}

// Save every ten seconds
window.setInterval(function(){
    save()
}, 10000);


// Completely delete the save from LocalStorage
function deleteSave(){
    window.localStorage.removeItem(SAVE_PATH())
    location.reload()
}

// The actual user-facing save "reset" functionality
function fullReset(){
    copySaveToClipboard()
    deleteSave()
}