let destabBupData = [
    {
        desc: "Each Factor's effect is doubled",
        cost: 1,
        eff: () => 2,
        baseEff: () => 1,
        isDecimal: false
    },
    {
        desc: "OP provides free Factors",
        cost: 5,
        eff: () => Math.floor(Decimal.pow(Decimal.log10(data.markup.powers+1), 1/4).toNumber()),
        baseEff: () => 0,
        isDecimal: false
    },
    {
        desc: "Factors boost their own effect",
        cost: 14,
        eff: () => totalFactorEffect(),
        baseEff: () => 1,
        isDecimal: false
    },
    {
        desc: "AutoClicker Speed is multiplied by your Challenge completions in Challenges",
        cost: 53,
        eff: () => Math.pow(getTotalDestabChallengeCompletions(), 10),
        baseEff: () => 1,
        isDecimal: false
    },

    {
        desc: "Automatically BuyMax AutoClickers and Factors",
        cost: 1,
        eff: () => 1,
        baseEff: () => 1,
        isDecimal: false
    },
    {
        desc: "OP boosts AutoClickers",
        cost: 4,
        eff: () => Decimal.log2(Decimal.sqrt(data.markup.powers).plus(1)),
        baseEff: () => D(1),
        isDecimal: true
    },
    {
        desc: "Unstable Boosters boost AutoClicker Speed",
        cost: 73,
        eff: () => Math.pow(data.destab.total, 2),
        baseEff: () => 1,
        isDecimal: false
    },
    {
        desc: "The Ordinal Base boosts Factors (higher is better)",
        cost: 74,
        eff: () => Math.floor(data.ord.base/2),
        baseEff: () => 1,
        isDecimal: false
    },

    {
        desc: "Automatically Markup without resetting anything and uncap OP",
        cost: 1,
        eff: () => 1,
        baseEff: () => 1,
        isDecimal: false
    },
    {
        desc: "Baseless Shifts boost AutoClicker speed",
        cost: 8,
        eff: () => Math.pow(data.baseless.shifts, 10),
        baseEff: () => 1,
        isDecimal: false
    },
    {
        desc: "ℶ<sub>&omega;</sub> boosts AutoClicker speed",
        cost: 16,
        eff: () => Math.pow(alephOmegaCap(), 2),
        baseEff: () => 1,
        isDecimal: false
    },
    {
        desc: "ℵ<sub>0</sub> boosts AutoClicker speed",
        cost: 66,
        eff: () => data.baseless.alephNull,
        baseEff: () => 1,
        isDecimal: false
    },
]
let destabUnlockData = [
    {
        desc: 'Unlock Challenges',
        unl: 'Challenges',
        req: 0
    },
    {
        desc: 'Unlock Incrementy and increase the Dynamic Gain base',
        unl: 'Incrementy',
        req: 0
    },
    {
        desc: 'Unlock Hierarchies',
        unl: 'Hierarchies',
        req: Infinity
    },
    {
        desc: 'Unlock Shattering',
        unl: 'Shattering',
        req: Infinity
    },
]

let destabChallengeData = [
    {
        desc: 'You can only buy 1 of each AutoClicker and you cannot buy Factors',
        effectDesc: 'Reward: Factors Boost their respective Alephs EVERYWHERE',
        sign: 'x',
        eff: (i) => Math.pow(factorEffect(i), 2),
        effectBase: () => 1,
        effectIsIndex: true,
        effectIsDecimal: false,

        hasInnerEffect: false,
    },
    {
        desc: 'All boosts from outside of Baseless Realms are useless',
        effectDesc: 'Reward: Factors boost Dynamic Factor gain EVERYWHERE',
        sign: 'x',
        eff: () => Math.pow(totalFactorEffect(), 2),
        effectBase: () => 1,
        effectIsIndex: false,
        effectIsDecimal: false,

        hasInnerEffect: false,
    },
    {
        desc: 'Your Base starts at 31',
        effectDesc: 'Reward: Factors boost the last Cardinal Upgrade\'s effect EVERYWHERE',
        sign: '+',
        eff: () => getTotalFactors()/10,
        effectBase: () => 0,
        effectIsIndex: false,
        effectIsDecimal: false,

        hasInnerEffect: false,
    },
    {
        desc: 'Unstable Booster Upgrades increase the Challenge Goal',
        effectDesc: 'Reward: Factors boost Negative Charge gain EVERYWHERE',
        sign: 'x',
        eff: () => totalFactorEffect(),
        effectBase: () => 1,
        effectIsIndex: false,
        effectIsDecimal: false,

        hasInnerEffect: true,
        innerEffect: () => 1+getTotalDBUPs()*0.1
    },
    {
        desc: 'All previous Baseless Challenges at once',
        effectDesc: 'Reward: Factors boost Aleph Null gain',
        sign: 'x',
        eff: () => totalFactorEffect(),
        effectBase: () => 1,
        effectIsIndex: false,
        effectIsDecimal: false,

        hasInnerEffect: false,
    },
    {
        desc: 'Your AutoClicker speed is equal to your Dynamic Factor',
        effectDesc: 'Reward: Gain free Factor Levels EVERYWHERE',
        sign: '+',
        eff: () => getTotalDestabChallengeCompletions()*getDChallengeCompletions(5),
        effectBase: () => 0,
        effectIsIndex: false,
        effectIsDecimal: false,

        hasInnerEffect: true,
        innerEffect: () => 1
    },
]

let destabIUPData = [
    {
        desc: 'Double ?Incrementy? Gain',
        sign: 'x',

        cost: () => 1e3*(data.destab.rupLevels[0]+1),
        effect: () => 2**data.destab.rupLevels[0],
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: true,
    },
    {
        desc: 'Triple Dynamic Gain',
        sign: 'x',

        cost: () => 1e3**(Math.sqrt(data.destab.rupLevels[1]+1)),
        effect: () => 3**data.destab.rupLevels[1],
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: true,
    },
    {
        desc: '?Incrementy? boosts Dynamic Gain',
        sign: 'x',

        cost: () => 1e5**(Math.sqrt(data.destab.rupLevels[2]+1)),
        effect: () => Math.log10(data.destab.incrementy)*data.destab.rupLevels[2],
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: true,
    },

    {
        desc: 'Unstable boosts boost ?Incrementy? gain',
        sign: 'x',

        cost: () => 1e5,
        effect: () => 1,
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: false,
    },
    {
        desc: 'Your Base boost ?Incrementy? Gain',
        sign: 'x',

        cost: () => 5e7,
        effect: () => 1,
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: false,
    },
    {
        desc: 'Total Rebuyables boost the third Rebuyable',
        sign: 'x',

        cost: () => 1e9,
        effect: () => 1,
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: false,
    },
    {
        desc: 'Challenge Completions boost Dynamic Gain',
        sign: 'x',

        cost: () => 1e11,
        effect: () => 1,
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: false,
    },
    {
        desc: 'Baseless Shifts boost the Ordinal to ?Incrementy? conversion',
        sign: 'x',

        cost: () => 5e13,
        effect: () => 1,
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: false,
    },
    {
        desc: 'Each Challenge Completion provides a free level of the second Rebuyable',
        sign: 'x',

        cost: () => 1e16,
        effect: () => 1,
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: false,
    },
    {
        desc: 'Factors multiply Unstable Incrementy gain at a reduced rate',
        sign: 'x',

        cost: () => 1e20,
        effect: () => 1,
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: false,
    },
    {
        desc: 'Challenge Completions boost their respective Factors',
        sign: 'x',

        cost: () => 1e30,
        effect: (i) => data.destab.completions[i],
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: true,
        upgradeIsRebuyable: false,
    },
]

function initDestabilizedRealm(){
    initDBUPs()
    initDChallenges()
    initDIncrementy()
}
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
function initDChallenges(){
    let container = DOM(`dChallengeContainer`)
    for (let i = 0; i < 2; i++) {
        let row = document.createElement('div')
        row.className = 'flexBox row'
        row.id = `dChallengeRow${i}`

        for (let j = 0; j < 3; j++) {
            let id = j+i*3
            let chal = document.createElement('button')
            chal.className =  isDChallengeMax(id) ? 'completedDestabChallenge'
                : inDChallenge(id) ? 'inDestabChallenge' : 'destabChallenge'
            chal.id = `dChallenge${id}`
            chal.innerHTML = `Challenge ${id+1}<br><br>${getDChallengeDesc(id)}`
            chal.addEventListener('click', () => controlDChallenge(id))

            row.append(chal)
        }
        container.append(row)
    }
}
function initDIncrementy(){
    let container = DOM(`dIncrementyContainer`)
    for (let i = 0; i < destabIUPData.length/3; i++) {
        let row = document.createElement('div')
        row.className = 'flexBox row'
        row.id = `dIUPRow${i}`

        for (let j = 0; j < 3; j++) {
            let id = j+i*3
            if(id > destabIUPData.length-1) break
            let iup = document.createElement('button')
            iup.className = 'dIUP'
            iup.id = `dIUP${id}`
            iup.innerText = `${getDIUPDesc(id)}`
            iup.addEventListener('click', () => buyDIUP(id))

            if(!isDIUPRebuyable(id) && hasDIUP(id)) iup.style.color = `#da3131`

            row.append(iup)
        }
        container.append(row)
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

    if(destabBoostTab === 'dIncrementy') updateDIncrementyHTML()

    updateDestabUnlockHTML()
}

function updateDestabUnlockHTML(){
    for (let i = 0; i < data.destab.unlocks.length; i++) {
        DOM(`dBu${i}`).style.backgroundColor = isDBUUnlocked(i) ? '#250505' : 'black'
        DOM(`destab${destabUnlockData[i].unl}Tab`).innerText = isDBUUnlocked(i) ? destabUnlockData[i].unl : '???'
    }
}

function updateDChalHTML(i){
    DOM(`dChallenge${i}`).className =  isDChallengeMax(i) ? 'completedDestabChallenge'
        : inDChallenge(i) ? 'inDestabChallenge' : 'destabChallenge'
    DOM(`dChallenge${i}`).innerHTML = `Challenge ${i+1}<br><br>${getDChallengeDesc(i)}`
}

let dIncrementyNames = ['Unstable', 'Broken', 'False']
function updateDIncrementyHTML(){
    DOM(`dIncrementyText`).innerText = `You have ${format(data.destab.incrementy)} ${wordCycle(dIncrementyNames)} Incrementy [+${format(getDIncrementyGain())}/s], multiplying your AutoClicker speed by ${format(getDIncrementyEffect())}`
    DOM(`dDynamicText2`).innerText = `Your Dynamic Factor is ${format(data.dy.level)} [+${format(dyGain())}/s], it caps at ${format(getDyCap())}`
}

function updateDIUPHTML(i){
    DOM(`dIUP${i}`).innerText = getDIUPDesc(i)
    if(!isDIUPRebuyable(i) && hasDIUP(i)) DOM(`dIUP${i}`).style.color = `#da3131`
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

    if(inDChallenge(3)) updateDChalHTML(3)
    if(inDChallenge(4)) updateDChalHTML(4)

    DOM(`dBup${n}`).style.backgroundColor = '#250505'
}

function showNextDestabBUPLevelEffect(i, show){

}

function dBoosterRefund(){
    for (let i = 0; i < data.destab.hasBUP.length; i++) {
        data.destab.hasBUP[i] = false
        DOM(`dBup${i}`).style.backgroundColor = 'black'
    }
    data.destab.amt = data.destab.total
    if(isInAnyDChallenge()) controlDChallenge()
    else dBoosterReset()
}

function controlDChallenge(i = data.destab.chalActive){
    if(isDChallengeMax(i)) return
    if(inDChallenge(i)){
        data.destab.chalActive = -1
        dBoosterReset()
        updateDChalHTML(i)
        return
    }

    let temp = data.destab.chalActive
    data.destab.chalActive = i
    updateDChalHTML(i)
    if(temp !== -1) updateDChalHTML(temp)
    dBoosterReset()

    data.baseless.shifts = getDChallengeLock(i)
    data.ord.base = getBaselessLock(2)*2**data.baseless.shifts
    updateDynamicShiftHTML()
    updateHeaderHTML()
}

function completeDChallenge(){
    if(!isInAnyDChallenge()) return
    if(data.ord.ordinal.gte(getDChallengeGoal())){
        let temp = data.destab.chalActive
        controlDChallenge()
        ++data.destab.completions[temp]
        updateDChalHTML(temp)
        /*if(data.sToggles[2])*/ createAlert("Unstable Challenge Complete!", `You have Completed Unstable Challenge ${temp+1}x${getDChallengeCompletions(temp)}!`, 'Awesome!')
    }
}

function buyDIUP(i){
    if(data.destab.incrementy < getDIUPCost(i)) return

    data.destab.incrementy -= getDIUPCost(i)
    if(isDIUPRebuyable(i)){
        ++data.destab.rupLevels[i]
        updateDIUPHTML(i)
        return
    }

    data.destab.hasUpgrade[i] = true
    updateDIUPHTML(i)
}

function dBoost(){
    if(data.ord.ordinal.lt(dBoostReq())) return
    if(isInAnyDChallenge()) controlDChallenge()

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

let isDestabilizedRealm = () => data.baseless.mode === 2 && getEUPEffect(4, 1) && data.baseless.baseless

let isDBUUnlocked = (i) => data.destab.total >= destabUnlockData[i].req
let hasDBUP = (i) => data.destab.hasBUP[i]

function getDBUPEffect(i){
    if(isDestabilizedRealm() && hasDBUP(i)){
        return destabBupData[i].isDecimal
            ? Decimal.max(destabBupData[i].eff(), destabBupData[i].baseEff())
            : Math.max(destabBupData[i].eff(), destabBupData[i].baseEff())
    }
    return destabBupData[i].baseEff()
}
let getDBUPCost = (i) => destabBupData[i].cost
let getBaseDBUPDesc = (i) => `${destabBupData[i].desc}<br>${getDBUPCost(i)} Unstable Boosters`
function getDBUPDesc(i, showNextLevel = false){
    //if(data.destab.isShattered[i]) return chargedBUPData[i].desc
    if(data.destab.hasBUP[i]) return showNextLevel ? chargedBUPData[i].desc : getBaseDBUPDesc(i)
    return getBaseDBUPDesc(i)
}

function getTotalDBUPs(){
    let total = 0
    for (let i = 0; i < data.destab.hasBUP.length; i++) {
        if (data.destab.hasBUP[i]) ++total
    }
    return total
}

let getDChallengeDesc = (i) => `${getDChallengeDescBase(i)}<br><br>${getDChallengeGoalDesc(i)}</sup><br>${getDChallengeRewardDesc(i)}<br>${getDChallengeFactorRewardDesc(i)}<br>${getDChallengeCompDesc(i)}`
let getDChallengeDescBase = (i) => `You will be in a Realm with ${getDChallengeLock(i)} Baseless Shifts<br>${destabChallengeData[i].desc}`
let getDChallengeGoalDesc = () => `Goal: ${ordinalDisplay('', getDChallengeGoal(), 0, data.ord.base, ordinalDisplayTrim(1), false)}`
let getDChallengeRewardDesc = (i) => destabChallengeData[i].effectDesc
let getDChallengeFactorRewardDesc = (i) => `On your final completion, Cascade Factor ${6-i}`
let getDChallengeCompDesc = (i) => `Completions: ${getDChallengeCompletions(i)}/3`

let getDChallengeInnerEffect = (i) => inDChallenge(i) && destabChallengeData[i].hasInnerEffect || inDChallenge((4)) && i === 3  ? destabChallengeData[i].innerEffect() : 1

let getDChallengeCompletions  = (i) => data.destab.completions[i]
function getTotalDestabChallengeCompletions(){
    let total = 0
    for (let i = 0; i < data.destab.completions.length; i++) {
        total += data.destab.completions[i]
    }
    return total
}

let getDChallengeGoal = () => numberFromOrdinal('&omega;<sup>&omega;</sup>', data.ord.base).pow(getDChallengeInnerEffect(3))
let getDChallengeLock = (i) => 5+data.destab.completions[i]
let isInAnyDChallenge = () => data.destab.chalActive !== -1
let inDChallenge = (i) => data.destab.chalActive === i
let isDChallengeMax = (i) => data.destab.completions[i] > 2

function getTotalDChallengeCompletions(){
    let total = 0
    for (let i = 0; i < data.destab.completions; i++) {
        total += data.destab.completions
    }
    return total
}

function getDChallengeEffect(i, j = null){
    if(getDChallengeCompletions(i) === 0) return destabChallengeData[i].effectBase()
    let divisor = 0.5**getDChallengeCompletions(i)*8

    if(destabChallengeData[i].effectIsDecimal){
        return Decimal.max(destabChallengeData[i].effectBase(), destabChallengeData[i].effectIsIndex ? destabChallengeData[i].eff(j).div(divisor) : destabChallengeData[i].eff().div(divisor))
    }
    return Math.max(destabChallengeData[i].effectBase(), destabChallengeData[i].effectIsIndex ? destabChallengeData[i].eff(j) / divisor : destabChallengeData[i].eff() / divisor)
}

let getDIUPDesc = (i) => `${getDIUPDescBase(i)}${getDIUPLevelsDesc(i)}\n${getDIUPEffectDesc(i)}\n${getDIUPCostDesc(i)}`
let getDIUPDescBase = (i) => destabIUPData[i].desc
let getDIUPLevels = (i) => data.destab.rupLevels[i]
let getDIUPLevelsDesc = (i) => isDIUPRebuyable(i) ? ` (${getDIUPLevels(i)})` : ''
let getDIUPCost = (i) => destabIUPData[i].cost()
let getDIUPCostDesc = (i) => `Cost: ${format(getDIUPCost(i))} ?Incrementy?`
let getDIUPEffectDesc = (i) => `Currently: ${format(getDIUPEffect(i))}x`
let hasDIUP = (i) => isDIUPRebuyable(i) ? data.destab.rupLevels[i] > 0 : data.destab.hasUpgrade[i]
let isDIUPRebuyable = (i) => destabIUPData[i].upgradeIsRebuyable

function getDIUPEffect(i, j = null){
    if(!hasDIUP(i)) return destabIUPData[i].effectBase()
    if(destabIUPData[i].effectIsIndex && j === null) j = 0

    if(destabIUPData[i].effectIsDecimal){
        return Decimal.max(destabIUPData[i].effectBase(), destabIUPData[i].effectIsIndex ? destabIUPData[i].effect(j) : destabIUPData[i].effect())
    }
    return Math.max(destabIUPData[i].effectBase(), destabIUPData[i].effectIsIndex ? destabIUPData[i].effect(j) : destabIUPData[i].effect())
}

let getDIncrementyGain = () => isDestabilizedRealm() ? data.ord.ordinal.pow(0.001).toNumber() : 0
let getDIncrementyEffect = () => isDestabilizedRealm() ? Math.sqrt(data.destab.incrementy) : 1