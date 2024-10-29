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
        eff: () => Math.max(0, Math.floor(Decimal.pow(Decimal.log10(data.markup.powers+1), 1/4))),
        baseEff: () => 0,
        bottomRow: false
    },
    {
        desc: "Factors boost their own effect",
        cost: 14,
        eff: () => totalFactorEffect(),
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "AutoClicker Speed is multiplied by your Challenge completions in Challenges",
        cost: 53,
        eff: () => Math.max(Math.pow(getTotalDestabChallengeCompletions(), 10), 1),
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
        desc: "OP boosts AutoClickers",
        cost: 4,
        eff: () => Decimal.max(Decimal.log2(Decimal.sqrt(data.markup.powers)), 1),
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "Boosters boost AutoClicker Speed",
        cost: 73,
        eff: () => Math.max(Math.pow(data.destab.total, 2), 1),
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "The Ordinal Base boosts Factors (higher is better)",
        cost: 74,
        eff: () => Math.max(1, Math.floor(data.ord.base/2)),
        baseEff: () => 1,
        bottomRow: false
    },

    {
        desc: "Baseless Shifts boost AutoClicker speed",
        cost: 1,
        eff: () => Math.max(Math.pow(data.baseless.shifts, 10), 1),
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "???",
        cost: 8,
        eff: () => 1,
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "???",
        cost: 16,
        eff: () => 1,
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "ℵ<sub>0</sub> boosts AutoClicker speed",
        cost: 66,
        eff: () => Math.max(data.baseless.alephNull, 1),
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
        DOM(`dBup${i}`).addEventListener('click', ()=>buyDestabBUP(i, true))
        DOM(`dBup${i}`).addEventListener('mouseenter', ()=>showNextDestabBUPLevelEffect(i, true))
        DOM(`dBup${i}`).addEventListener('mouseleave', ()=>showNextDestabBUPLevelEffect(i, false))
        DOM(`dBup${i}`).style.backgroundColor = data.destab.isShattered[i] ? '#3b3100' : data.destab.hasBUP[i] ? '#250505' : 'black'
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
        DOM(`bu${i}`).style.backgroundColor = data.destab.unlocks[i] ? '#250505' : 'black'
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

    if(data.nav.current === 'markup') DOM(`dFactorBoostButton`).innerHTML = `Perform an Unstable Boost [+${getDBoosterGain()}] (B)<br>Requires ${displayDBoostReq()}`
    if(data.nav.current === 'markup') DOM("dFactorBoostButton").style.color = data.ord.ordinal.gte(dBoostReq()) ? '#fff480' : '#ff8080'

    updateDestabUnlockHTML()
}

function updateDestabUnlockHTML(){
    for (let i = 0; i < data.destab.unlocks.length; i++) {
        DOM(`dBu${i}`).style.backgroundColor = data.destab.total > destabUnlockData[i].req ? '#250505' : 'black'
        DOM(`destab${destabUnlockData[i].unl}Tab`).innerText = isDBUUnlocked(i) ? destabUnlockData[i].unl : '???'
    }
}

function buyDestabBUP(n, shatter){
    if(n % 4 !== 0 && !data.destab.hasBUP[n-1]){
        for (let i = 0; i < n % 4; i++) {
            let index = (i % 4) + (4 * Math.floor(n / 4))
            buyDestabBUP(index, false)
        }
    }

    if (data.destab.amt < getDBUPCost(n)) return
    data.destab.amt -= getDBUPCost(n)
    data.destab.hasBUP[n] = true

    DOM(`dBup${n}`).style.backgroundColor = '#250505'
}

function showNextDestabBUPLevelEffect(i, show){

}

let isDestabilizedRealm = () => data.baseless.mode === 2 && getEUPEffect(4, 1) && data.baseless.baseless

function dBoost(){
    if(data.ord.ordinal.lt(dBoostReq())) return
    data.destab.amt += getDBoosterGain()
    data.destab.total += getDBoosterGain()
    ++data.destab.times

    dBoosterReset()
    updateDynamicShiftHTML()
}

function getDBoosterGain(){
    return data.destab.times+1
}

function displayDBoostReq(){
    return ordinalDisplay('', dBoostReq(), 0, data.ord.base, 3, false)
}
function dBoostReq(){
    return D(`1e1500`).times(D(1e100).pow(data.destab.times+1))
}

function dBoosterReset(){
    data.ord.ordinal = D(0)
    data.ord.over = D(0)
    data.ord.base = getBaselessLock(data.baseless.mode)
    data.markup.powers = D(0)
    data.baseless.shifts = 0
    data.dy.level = D(1)
    data.dy.gain = D(0)
    for (let i = 0; i < data.factors.length; i++) {
        data.factors[i] = 0
    }
    for (let i = 0; i < data.autoLevels.length; i++) {
        data.autoLevels[i] = 0
    }
    data.chal.decrementy = D(1)
}
let isDBUUnlocked = (i) => data.destab.total > destabUnlockData[i].unl
let hasDBUP = (i) => data.destab.hasBUP[i]

let getDBUPEffect =  (i) => isDestabilizedRealm() && hasDBUP(i) ? destabBupData[i].eff() : destabBupData[i].baseEff()
let getDBUPCost = (i) => destabBupData[i].cost
let getBaseDBUPDesc = (i) => `${destabBupData[i].desc}<br>${getDBUPCost(i)} Unstable Boosters`
function getDBUPDesc(i, showNextLevel = false){
    //if(data.destab.isShattered[i]) return chargedBUPData[i].desc
    if(data.destab.hasBUP[i]) return showNextLevel ? chargedBUPData[i].desc : getBaseDBUPDesc(i)
    return getBaseDBUPDesc(i)
}

function getTotalDestabChallengeCompletions(){
    let total = 0
    for (let i = 0; i < data.destab.completions.length; i++) {
        total += data.destab.completions[i]
    }
    return total
}