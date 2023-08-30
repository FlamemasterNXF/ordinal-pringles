function settingsToggle(i){
    if (i === -1){
        data.offline = !data.offline
        DOM(`offlineProgressToggle`).innerHTML = `Toggle Offline Progress ${settingsColor(data.offline)}`
        return save()
    }

    data.sToggles[i] = !data.sToggles[i]
    if (i === 6) DOM(`progressBarContainer`).style.display = data.sToggles[i] ? `flex` : `none`

    DOM(`settingsToggle${i}`).innerHTML = `Toggle the ${SETTINGS_DESCS[i]} ${settingsColor(data.sToggles[i])}`
    save()
}
function settingsColor(bool){
    return bool
        ? `<span style="color: #2da000">[${boolToReadable(bool)}]</span>`
        : `<span style="color: #ce0b0b">[${boolToReadable(bool)}]</span>`
}

function loadSettings(){
    DOM(`offlineProgressToggle`).innerHTML = `Toggle Offline Progress ${settingsColor(data.offline)}`
    DOM(`changeOrdLength`).children[0].innerHTML = `[${data.ord.trim}]`
    for (let i = 0; i < SETTINGS_DESCS.length; i++) {
        DOM(`settingsToggle${i}`).innerHTML = `Toggle the ${SETTINGS_DESCS[i]} ${settingsColor(data.sToggles[i])}`
    }
}