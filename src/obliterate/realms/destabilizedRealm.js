let destabBupData = [
    {
        desc: "Each Factor's effect is doubled",
        cost: 1,
        eff: () => 2,
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "OP provides free Factors",
        cost: 5,
        eff: () => 5,
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "Factors reduce the Base in Challenges",
        cost: 72,
        eff: () => 5,
        baseEff: () => data.ord.base,
        bottomRow: false
    },
    {
        desc: "AutoClicker Speed is multiplied by your Challenge completions in Challenges",
        cost: 53,
        eff: () => Math.max(Math.pow(2, data.chal.completions[4]), 1),
        baseEff: () => 1,
        bottomRow: false
    },

    {
        desc: "Automatically BuyMax AutoClickers and Factors",
        cost: 1,
        eff: () => 1,
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "Factors boost OP gain",
        cost: 4,
        eff: () => Math.max(Math.sqrt(data.boost.total)*getAOREffect(6), 1),
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "Boosters boost AutoClicker Speed",
        cost: 73,
        eff: () => 10,
        baseEff: () => 0,
        bottomRow: false
    },
    {
        desc: "The Ordinal Base boosts Factors (higher is better)",
        cost: 74,
        eff: () => Math.max(1,data.ord.base-2),
        baseEff: () => 1,
        bottomRow: false
    },

    {
        desc: "Baseless Shifts boost AutoClicker speed",
        cost: 1,
        eff: () => 1,
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "???",
        cost: 8,
        eff: () => 20*getOverflowEffect(1),
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "???",
        cost: 16,
        eff: () => 3,
        baseEff: () => 0,
        bottomRow: false
    },
    {
        desc: "ℵ<sub>0</sub> boosts AutoClicker speed",
        cost: 66,
        eff: () => Math.max(Math.log2(data.boost.amt), 1),
        baseEff: () => 1,
        bottomRow: false
    },
]
let destabUnlockData = [
    {
        desc: 'Unlock Challenges',
        unl: 'Challenges',
        req: Infinity
    },
    {
        desc: 'Unlock Incrementy',
        unl: 'Incrementy',
        req: Infinity
    },
    {
        desc: 'Unlock Hierarchies',
        unl: 'Hierarchies',
        req: Infinity
    },
    {
        desc: 'Unlock Shattering',
        unl: 'Challenges',
        req: Infinity
    },
]

function initDBUPs(){
    let rows = [DOM('dBupColumn0'), DOM('dBupColumn1'), DOM('dBupColumn2')]
    let total = 0
    for (let i = 0; i < rows.length; i++) {
        for (let n = 0; n < 4; n++) {
            let bup = document.createElement('button')
            bup.className = data.destab.isShattered[total] ? 'shatteredBUP' : 'dBup'
            bup.id = `dBup${total}`
            bup.innerHTML = `${getDBUPDesc(total)}`

            rows[i].append(bup)
            ++total
        }
    }
    for (let i = 0; i < data.destab.hasBUP.length; i++) {
        DOM(`bup${i}`).addEventListener('click', ()=>buyDestabBUP(i, true))
        DOM(`bup${i}`).addEventListener('mouseenter', ()=>showNextDestabBUPLevelEffect(i, true))
        DOM(`bup${i}`).addEventListener('mouseleave', ()=>showNextDestabBUPLevelEffect(i, false))
        DOM(`bup${i}`).style.backgroundColor = data.destab.isShattered[i] ? '#3b3100' : data.destab.hasBUP[i] ? '#800000' : 'black'
    }

    let unlockCol = DOM(`dBuColumn`)
    for (let i = 0; i < 4; i++){
        let bup = document.createElement('button')
        bup.className = 'dBup'
        bup.id = `dBu${i}`
        bup.innerText = `${destabUnlockData[i].desc}\nRequires: ${destabUnlockData[i].req} Unstable Boosters`
        unlockCol.append(bup)
    }

    for (let i = 0; i < data.boost.unlocks.length; i++) {
        DOM(`bu${i}`).style.backgroundColor = data.destab.unlocks[i] ? '#800000' : 'black'
    }
}

function destabilizationHTML(){
    DOM(`boostNav`).style.color = isDestabilizedRealm() ? '#ff8080' : '#8080FF'
    DOM(`boostNav`).style.borderColor = isDestabilizedRealm() ? '#bd5151' : '#1e47d0'
}

function updateDestabBoostersHTML() {
    DOM('dBoosterText').innerHTML = /*data.boost.unlocks[1] > 0 ?
        `You have <span style="color: #8080FF; font-family: DosisSemiBold">${(data.boost.amt)} Boosters</span> (${(data.boost.total)} total) and <span style="color: goldenrod; font-family: DosisSemiBold">${data.incrementy.charge} Charge</span> (${data.incrementy.totalCharge} total)`
        : */ `You have <span style="color: #ff8080; font-family: DosisSemiBold">${(data.destab.amt)} Unstable Boosters</span> (${(data.destab.total)} total)`
    DOM('dBoosterTimesText').innerHTML = `You have <span style="color: #ff8080">Boosted</span> ${data.destab.times} times`

    updateDestabUnlockHTML()
}

function updateDestabUnlockHTML(){
    for (let i = 0; i < data.destab.unlocks.length; i++) {
        DOM(`dBu${i}`).style.backgroundColor = data.destab.total > destabUnlockData[i].req ? '#800000' : 'black'
        DOM(`destab${destabUnlockData[i].unl}Tab`).innerText = isDBUUnlocked(i) ? destabUnlockData[i].unl : '???'
    }
}

function buyDestabBUP(i, shatter){

}

function showNextDestabBUPLevelEffect(i, show){

}


let isDestabilizedRealm = () => data.baseless.mode === 2 && getEUPEffect(4, 1) && data.baseless.baseless

let isDBUUnlocked = (i) => data.destab.total > destabUnlockData[i].unl

let getDBUPCost = (i) => destabBupData[i].cost
let getBaseDBUPDesc = (i) => `${destabBupData[i].desc}<br>${getDBUPCost(i)} Unstable Boosters`
function getDBUPDesc(i, showNextLevel = false){
    //if(data.destab.isShattered[i]) return chargedBUPData[i].desc
    if(data.destab.hasBUP[i]) return showNextLevel ? chargedBUPData[i].desc : getBaseDBUPDesc(i)
    return getBaseDBUPDesc(i)
}