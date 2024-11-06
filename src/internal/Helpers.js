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

function formatBool (bool, mode='OF'){
    if(mode==='OF') return bool?'ON':'OFF'
    if(mode==='OFL') return bool?'On':'Off'
    if(mode==='ED') return bool?'ENABLED':'DISABLED'
    if(mode==='EDL') return bool?'Enabled':'Disabled'
    if(mode==='EDT') return bool?'Enable':'Disable'
    if(mode==='UL') return bool?'Unlocked':'Locked'
    if(mode==='AU') return bool?'Active':'Inactive'
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

function allEqual(arr, i){
    return arr.every( v => v === i )
}

function softcap(value, cap, scPow, isDecimal = false){
    if(isDecimal){
        if(value.lte(cap)) return value
        return value.pow(scPow).times(cap.pow(D(1).sub(scPow)))
    }

    if(value <= cap) return value
    return (value ** scPow) * (cap ** (1 - scPow))
}

let boostersAtGivenFB = (i = data.boost.times) => i > 0 ? (i*(i+1))/2 : 0

let logn = (num, logBase) => num === 0 ? 0 : Math.log10(num) / Math.log10(logBase)

let splitAt = (index, str) => [str.slice(0, index), str.slice(index)]

function safeLog(num, logBase, minValue = 1){
    let val = logn(num, logBase)
    if(val === -Infinity || val === Infinity || isNaN(val) || val < minValue) return minValue
    return val
}

function customRoot(num, root, minValue = 1){
    let val = num**(1/root)
    if(val < minValue) return minValue
    return val
}