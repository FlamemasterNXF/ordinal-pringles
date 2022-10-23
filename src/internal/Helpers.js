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
    return D(indexes)
}

function switchTab(tab){
    data.nav.last = data.nav.current
    data.nav.current = tab
    DOM(`${data.nav.last}Page`).style.display = 'none'
    DOM(`${tab}Page`).style.display = 'flex'
}

function settingsToggle(i){
    data.sToggles[i] = !data.sToggles[i]
    save()
    location.reload()
}

function allEqual(arr, i){
    return arr.every( v => v === i )
}
