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

let logn = (num, logBase) => num === 0 ? 0 : Math.log10(num) / Math.log10(logBase);

let splitAt = (index, str) => [str.slice(0, index), str.slice(index)]

let checkArrayBetween = (arr, start, end, value) => arr.slice(start, end).some(x => x === value);

function formatEffect(effect, sign, doFormat = true){
    if(doFormat) return sign !== 'x' && sign !== 's' ? `${sign}${format(effect)}` : `${format(effect)}${sign}`
    return sign !== 'x' && sign !== 's' ? `${sign}${effect}` : `${effect}${sign}`
}

function countElements(arr, value) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            count++
        }
    }
    return count
}

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

function updateGwaHTML(){
    const color = data.gword.enabled
        ? getCSSVariable('setting-on-text-color')
        : getCSSVariable('setting-off-text-color')
    DOM(`gwaifyToggle`).innerHTML = `<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'> Display <span style="color: ${color}">${formatBool(data.gword.enabled)}</span>`
}
function gwaToggle() {
    data.gword.enabled = !data.gword.enabled
    updateGwaHTML()
}

function getScrollOffsets(element) {
    let x = 0;
    let y = 0;
    while (element) {
        x += element.scrollLeft || 0
        y += element.scrollTop || 0
        element = element.parentElement
    }
    return { x, y }
}

function hslToHex(h, s, l) {
    s /= 100
    l /= 100

    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l - c / 2
    let r = 0, g = 0, b = 0

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    }
    else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    }
    else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    }
    else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    }
    else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    }
    else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    const componentToHex = (c) => {
        const hex = c.toString(16)
        return hex.length === 1 ? "0" + hex : hex
    }

    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

function hexToHSL(hex) {
    hex = hex.replace("#", "");

    let r = parseInt(hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    let g = parseInt(hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    let b = parseInt(hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);

    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return { h, s, l };
}

function isDecimalExploding(decimal, name){
    if(decimal.layer > 1 || isNaN(decimal.layer)){
        console.error(`${name} TOO HIGH`)
        return true
    }
    return false
}

