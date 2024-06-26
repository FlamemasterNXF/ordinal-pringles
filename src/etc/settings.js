// I'll refactor this eventually I swear

const SETTINGS_DESCS = [
    "Booster Refund Confirmation", "Challenge Confirmation", "Challenge Completion Popup", "Factor Shift confirmation",
    "Factor Boost confirmation", "Charge Refund Confirmation", "Boost Progress Bar", "ability to Bulk Boost",
    "Baselessness Confirmation", "Collapse Confirmation", "Booster Refund in C5 and C7", "Darkness Confirmation",
    "Charge Sacrifice Confirmation", "Hardy Value Display for Ordinals >= 1.8e308",
    "Use ExpantaNum in Extended Hardy Displays", "Toggle the Obliterate Confirmation",
    "Toggle the Energy Upgrades Respec Confirmation", "Toggle the Passive Energy Respec Confirmation",
    "Differentiate Pringles without Color", "Toggle all Instability Respec Confirmations"
]
const settingsDefaults = [
    true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, false, true
]
function settingsToggle(i){
    if (i === -1){
        data.offline = !data.offline
        DOM(`offlineProgressToggle`).innerHTML = `Toggle Offline Progress ${settingsColor(data.offline)}`
        return save()
    }

    if(i === -2){
        data.gword.enabled = !data.gword.enabled
        return DOM(`gwaifyToggle`).innerHTML = `<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'> Display ${settingsColor(data.gword.enabled)}`
    }

    data.sToggles[i] = !data.sToggles[i]
    if (i === 6) DOM(`progressBarContainer`).style.display = data.sToggles[i] ? `flex` : `none`

    DOM(`settingsToggle${i}`).innerHTML = `${i > 12 ? '' : 'Toggle the'} ${SETTINGS_DESCS[i]} ${settingsColor(data.sToggles[i])}`
    save()

    if(i === 18) location.reload()
}
function settingsColor(bool){
    return bool
        ? `<span style="color: #2da000">[${formatBool(bool)}]</span>`
        : `<span style="color: #ce0b0b">[${formatBool(bool)}]</span>`
}

function toggleOrdColor(){
    data.ord.color = !data.ord.color
    DOM(`changeOrdColor`).children[0].innerHTML = data.ord.color ? `[Shifting]` : `[Normal]`
    DOM(`changeOrdColor`).children[0].style.color = data.ord.color ? 'goldenrod' : '#2da000'
}

function changeOrdDisplayHTML(){
    DOM(`changeOrdDisplay`).children[0].innerHTML = `[${data.ord.displayType}]`
    DOM(`changeOrdDisplay`).children[0].style.color =
        data.ord.displayType === "Buchholz" ? '#2da000' :
        data.ord.displayType === "Veblen" ? '#02b9b4' :
        data.ord.displayType === "BMS" ? '#c203bf' : '#d76205'
}

function toggleOrdDisplay(){
    let nextType =
        data.ord.displayType === "Buchholz" ? "Veblen" :
        data.ord.displayType === "Veblen" ? "BMS" :
        data.ord.displayType === "BMS" ? "Y-Sequence" : "Buchholz"

    data.ord.displayType = nextType
    changeOrdDisplayHTML()
}

// Changes the Millisecond Interval
function changeMs(x){
    if (!x) return
    if (isNaN(Math.floor(x))) return createAlert('Failure', 'Invalid Input.', `Oops.`)
    data.ms = Math.min(Math.max(Math.floor(x),20),1000)
    DOM(`changeMsInterval`).children[0].innerHTML = `[${data.ms}ms]`
    save();
    location.reload();
}

function loadSettings(){
    DOM(`offlineProgressToggle`).innerHTML = `Toggle Offline Progress ${settingsColor(data.offline)}`
    DOM(`changeMsInterval`).children[0].innerHTML = `[${data.ms}ms]`
    DOM(`gwaifyToggle`).innerHTML = `<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'> Display ${settingsColor(data.gword.enabled)}`
    DOM(`changeOrdLength`).children[0].innerHTML = `[${data.ord.trim}]`

    DOM(`changeOrdColor`).children[0].innerHTML = data.ord.color ? `[Shifting]` : `[Normal]`
    DOM(`changeOrdColor`).children[0].style.color = data.ord.color ? 'goldenrod' : '#2da000'

    changeOrdDisplayHTML()

    for (let i = 0; i < SETTINGS_DESCS.length; i++) {
        DOM(`settingsToggle${i}`).innerHTML = `${i > 12 ? '' : 'Toggle the'} ${SETTINGS_DESCS[i]} ${settingsColor(data.sToggles[i])}`
    }
}
