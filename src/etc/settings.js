const SETTINGS_DESCS = [
    "Booster Refund Confirmation", "Challenge Confirmation", "Challenge Completion Popup", "Factor Shift confirmation",
    "Factor Boost confirmation", "Charge Refund Confirmation", "Boost Progress Bar", "ability to Bulk Boost",
    "Baselessness Confirmation", "Collapse Confirmation", "Booster Refund in C5 and C7", "Darkness Confirmation",
    "Charge Sacrifice Confirmation", "Hardy Value Display for Ordinals >= Ψ(Ω)",
    "<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'> Display"
]
const settingsDefaults = [true, true, true, true, true, true, true, true, true, true, true, true, false, false]
function settingsToggle(i){
    if (i === -1){
        data.offline = !data.offline
        DOM(`offlineProgressToggle`).innerHTML = `Toggle Offline Progress ${settingsColor(data.offline)}`
        return save()
    }

    i === 14 ? data.gword.enabled = !data.gword.enabled : data.sToggles[i] = !data.sToggles[i]
    if (i === 6) DOM(`progressBarContainer`).style.display = data.sToggles[i] ? `flex` : `none`

    let display = i === 14 ? data.gword.enabled : data.sToggles[i]
    DOM(`settingsToggle${i}`).innerHTML = `${i > 12 ? '' : 'Toggle the'} ${SETTINGS_DESCS[i]} ${settingsColor(display)}`
    save()
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

function toggleOrdDisplay(){
    let nextType = data.ord.displayType === "Buchholz" ? "Veblen" :
        data.ord.displayType === "Veblen" ? "BMS" : "Buchholz"

    data.ord.displayType = nextType
    DOM(`changeOrdDisplay`).children[0].innerHTML = `[${data.ord.displayType}]`
    DOM(`changeOrdDisplay`).children[0].style.color = data.ord.displayType === "Buchholz" ? '#2da000' :
        data.ord.displayType === "Veblen" ? '#00a09b' : '#a0009d'
}

function loadSettings(){
    DOM(`offlineProgressToggle`).innerHTML = `Toggle Offline Progress ${settingsColor(data.offline)}`
    DOM(`changeOrdLength`).children[0].innerHTML = `[${data.ord.trim}]`

    DOM(`changeOrdColor`).children[0].innerHTML = data.ord.color ? `[Shifting]` : `[Normal]`
    DOM(`changeOrdColor`).children[0].style.color = data.ord.color ? 'goldenrod' : '#2da000'

    DOM(`changeOrdDisplay`).children[0].innerHTML = `[${data.ord.displayType}]`
    DOM(`changeOrdDisplay`).children[0].style.color = data.ord.displayType === "Buchholz" ? '#2da000' :
        data.ord.displayType === "Veblen" ? '#0075a0' : '#a0009d'

    for (let i = 0; i < SETTINGS_DESCS.length; i++) {
        DOM(`settingsToggle${i}`).innerHTML = `${i > 12 ? '' : 'Toggle the'} ${SETTINGS_DESCS[i]} ${settingsColor(data.sToggles[i])}`
    }
}