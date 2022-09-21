const D = x => new Decimal(x)
//create all the variables in a data object for saving
const VERSION = "0.0.1"
const PSI_VALUE = 7625597484987
const GRAHAMS_VALUE = 109
function getDefaultObject() {
    return {
        nav: {current:"ord", last:"ord"},
        ord: {ordinal:0, over:0, base:10, isPsi: false},
        markup: {powers:0, shifts:0},
        factors: Array(7).fill(0),
        autoLevels: Array(2).fill(0),
        offline: { timeActivated: Date.now(), time:0, toggled:true },
    }
}
let data = getDefaultObject()
//saving and loading
function save(){
    try{
        window.localStorage.setItem('ordinalPRINGLESsave', JSON.stringify(data))
    }
    catch (e) {
        createAlert('Error', `Save failed.\n${e}`, 'Dang.');
        console.error(e);
    }
}
function load() {
    let savedata = JSON.parse(window.localStorage.getItem('ordinalPRINGLESsave'))
    if (savedata !== undefined) fixSave(data, savedata)
    fixOldSaves()
    let off_time = (Date.now() - data.offline.timeActivated)/1000
    if (data.offline.toggled) data.offline.time += off_time
    createAlert('Welcome Back!', `You've loaded into Ordinal PRINGLES v${VERSION}\nEnjoy!`, 'Thanks!')
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
function beginImport(){
    createPrompt('Import Savedata', 0)
}
function importSave() {
    try {
        let importedData = DOM('promptInput').value
        if(importedData.length <= 0) {
            DOM('promptContainer').style.display = 'none'
            createAlert('Failure', 'No data found.', `Oops.`)
            return
        }
        data = Object.assign(getDefaultObject(), JSON.parse(atob(importedData)))
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
function beginFullReset(){
    createConfirmation(0, 'Are you sure?', 'Are you absolutely sure you want to do this?\nThis will export your save (just in case) but delete your save from LocalStorage.', 'No Way!', 'Yes, I understand the consequences.')
}
function fullReset(){
    exportSave()
    deleteSave()
}
function deleteSave(){
    window.localStorage.removeItem('ordinalPRINGLESsave')
    location.reload()
}