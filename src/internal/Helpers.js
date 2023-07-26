const DOMCache = new Map()
const DOM = (id) => {
    const cachedEl = DOMCache.get(id)
    if (cachedEl) return cachedEl
    const el = document.getElementById(id)
    if(el===null) throw `Element ${id} is null.`
    DOMCache.set(id, el)
    return el
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min
}

function boolToReadable (bool, mode='OF'){
    if(mode==='OF') return bool?'ON':'OFF'
    if(mode==='OFL') return bool?'On':'Off'
    if(mode==='ED') return bool?'ENABLED':'DISABLED'
    if(mode==='EDL') return bool?'Enabled':'Disabled'
    if(mode==='EDT') return bool?'Enable':'Disable'
    if(mode==='UL') return bool?'Unlocked':'Locked'
}

function numToRoman(num) {
    let digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman_num = "",
        i = 3
    while (i--)
        roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num
    return Array(+digits.join("") + 1).join("M") + roman_num
}

function checkAllIndexes(array, value) {
    let indexes = 0
    for(let i = 0; i < array.length; i++){ if (array[i] === value) indexes++ }
    return indexes
}

function settingsToggle(i){
    if (i == -1){
        data.offline = !data.offline
        DOM(`offlineProgressToggle`).innerText = `Toggle Offline Progress [${boolToReadable(data.offline)}]`
        return save()
    }

    data.sToggles[i] = !data.sToggles[i]
    if (i === 6) DOM(`progressBarContainer`).style.display = data.sToggles[i] ? `flex` : `none`

    DOM(`settingsToggle${i}`).innerText = `Toggle the ${SETTINGS_DESCS[i]} [${boolToReadable(data.sToggles[i])}]`
    save()
}

function allEqual(arr, i){
    return arr.every( v => v === i )
}

let boostersAtGivenFB = (i = data.boost.times) => i > 0 ? (i*(i+1))/2 : 0
