function updateAlephNullHTML(){
    DOM(`alephNull`).innerHTML = `Your have <span style="color: red; font-family: DosisSemiBold">${data.baseless.alephNull} ℵ<sub>0</sub></span>, increasing the Charge required for each cost jump by <span style="color: red; font-family: DosisSemiBold">0</span><br>Your <span style="color: #80ce0b; font-family: DosisSemiBold">Singularity</span> is multiplying AutoClicker Speed in the Baseless Realms by <span style="color: #80ce0b; font-family: DosisSemiBold">1x</span>`
}

const baselessMultipliers = [1, 10, 1000]
const baselessLocks = [10, 20, 100]
const baselessNames = ['Baseless', 'Obliterated', 'Forgotten']
function updateBaselessEnterHTML(id, load=false) {
    if(load){
        DOM(`baseless`).children[0].selectedIndex = data.baseless.mode
        updateBaselessEnterHTML(data.baseless.mode)
    }

    data.baseless.mode = id
    DOM(`baseless`).children[1].innerHTML = `<br><br>You will be trapped in <span style="color: darkred">Base ${baselessLocks[id]}</span> with a ${baselessMultipliers[id]}x multiplier to ℵ<sub>0</sub> gain<br>Your highest Ordinal in the <span style="color: darkred">${baselessNames[id]} Realm</span> is <b>${ordinalDisplay('H', data.baseless.bestOrdinalInMode[id], 0, baselessLocks[id], 5, false)}</b>`
}