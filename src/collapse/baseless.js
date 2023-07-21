function updateAlephNullHTML(){
    DOM(`alephNull`).innerHTML = `Your have <span style="color: red; font-family: DosisSemiBold">${data.baseless.alephNull} ℵ<sub>0</sub></span>, increasing the Charge required for each cost jump by <span style="color: red; font-family: DosisSemiBold">0</span><br>Your <span style="color: #80ce0b; font-family: DosisSemiBold">Singularity</span> is multiplying AutoClicker Speed in the Baseless Realms by <span style="color: #80ce0b; font-family: DosisSemiBold">1x</span>`
}
function updateDynamicShiftHTML(){
    DOM(`dynamicShift`).style.display = `${data.baseless.baseless ? 'block' : 'none'}`
    DOM(`baselessMultiplierText`).style.display = `${data.baseless.baseless ? 'block' : 'none'}`
    DOM(`dynamicShift`).innerHTML = `<span style="font-size: 1rem">Perform a <span style="color: darkred">Dynamic Shift</span><br>Requires: ${ordinalDisplay('H', numberFromOrdinal('&omega;<sup>&omega;</sup>', data.ord.base), 0 , data.ord.base, data.ord.trim, false)}</span><br>This will unlock Factor ${data.baseless.shifts+1}, perform a Factor Shift reset, multiply your ℵ<sub>0</sub> gain multiplier by ${format(dynamicShiftMultipliers[0](data.baseless.shifts+1))}, multiply your Dynamic gain by ${format(dynamicShiftMultipliers[1](data.baseless.shifts+1))}, and <span style="color: darkred">double your Base</span>`
    DOM(`baselessMultiplierText`).innerHTML = `Your ℵ<sub>0</sub> gain multiplier is ${format(baselessMultipliers[data.baseless.mode]*dynamicShiftMultipliers[0]())}`
}

function updateBaselessEnterHTML(id, load=false) {
    if(load){
        DOM(`baseless`).children[1].selectedIndex = data.baseless.mode
        updateBaselessEnterHTML(data.baseless.mode)
    }

    data.baseless.mode = id
    DOM(`baseless`).children[2].innerHTML = `<br><br>You will be trapped in <span style="color: darkred">Base ${baselessLocks[id]}</span> with a ${baselessMultipliers[id]}x multiplier to ℵ<sub>0</sub> gain<br>Your highest Ordinal in the <span style="color: darkred">${baselessNames[id]} Realm</span> is <b>${ordinalDisplay('H', data.baseless.bestOrdinalInMode[id], 0, baselessLocks[id], 5, false)}</b>`
}

const baselessMultipliers = [1, 10, 1000]
const baselessLocks = [10, 20, 100]
const baselessNames = ['Baseless', 'Obliterated', 'Forgotten']

function baselessControl(){
    if(!data.baseless.tutorial) createAlert('Welcome!', 'This popup will not be shown again!\nYou cannot respec Booster Upgrades while in this Realm. However, Dynamic Factor is unlocked immediately and the Max All AutoBuyer works all the time! I\'d recommend checking the Dynamic Factor tab, there are some things there that only exist in this realm.', 'Thanks?')
    data.baseless.tutorial = true
    data.baseless.baseless = !data.baseless.baseless
    collapseReset()

    DOM(`baseless`).children[0].innerHTML = `${data.baseless.baseless ? 'Exit' : 'Enter'}`

    if(data.baseless.baseless){
        data.ord.base = baselessLocks[data.baseless.mode]
        data.dy.gain = 0.002
    }
    else{
        data.baseless.shifts = 0
    }

    updateDynamicShiftHTML()
}

function dynamicShift(){
    if(data.ord.ordinal < numberFromOrdinal('&omega;<sup>&omega;</sup>', data.ord.base)) return
    ++data.baseless.shifts
    data.ord.base *= 2
    fsReset()
}

let dynamicShiftMultipliers = [
    (i = data.baseless.shifts) => Math.max(1, 2**i),
    (i = data.baseless.shifts) => Math.max(1, 1000**i)
]