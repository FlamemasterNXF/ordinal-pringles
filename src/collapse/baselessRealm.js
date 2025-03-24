let realmBupData = [
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
        eff: () => Math.floor(Decimal.pow(Decimal.log10(data.markup.powers+1), 1/2).toNumber()),
        baseEff: () => 0,
        isDecimal: false
    },
    {
        desc: "Factors boost their own effect",
        cost: 14,
        eff: () => totalFactorEffect(false),
        baseEff: () => 1,
        isDecimal: false
    },
    {
        desc: "AutoClicker Speed is multiplied by your Challenge completions in Challenges",
        cost: 53,
        eff: () => Math.pow(getTotalRealmChallengeCompletions(), 10),
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
        eff: () => Decimal.log2((data.markup.powers).plus(1)),
        baseEff: () => D(1),
        isDecimal: true
    },
    {
        desc: "Baseless Boosters boost AutoClicker Speed",
        cost: 73,
        eff: () => Math.pow(data.baselessRealm.total, 2),
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
        eff: () => Math.pow(data.baseless.shifts, data.baseless.shifts*10),
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
let realmUnlockData = [
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
        desc: 'Unlock the N-Growing Hierarchy',
        unl: 'Hierarchies',
        req: 0
    },
    {
        desc: '???',
        unl: 'Hierarchies',
        req: 0
    },
]

let realmChallengeData = [
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
        desc: 'Baseless Booster Upgrades increase the Challenge Goal',
        effectDesc: 'Reward: Factors boost Negative Charge gain EVERYWHERE',
        sign: 'x',
        eff: () => totalFactorEffect(),
        effectBase: () => 1,
        effectIsIndex: false,
        effectIsDecimal: false,

        hasInnerEffect: true,
        innerEffect: () => 1+getTotalRealmBUPs()*0.1
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
        eff: () => getTotalRealmChallengeCompletions()*getRealmChallengeCompletions(5),
        effectBase: () => 0,
        effectIsIndex: false,
        effectIsDecimal: false,

        hasInnerEffect: true,
        innerEffect: () => 1
    },
]

let realmIUPData = [
    {
        desc: 'Double Baseless Incrementy Gain',
        sign: 'x',

        cost: () => 1e3**Math.sqrt(data.baselessRealm.rupLevels[0]+1),
        effect: () => 2**data.baselessRealm.rupLevels[0],
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: true,
    },
    {
        desc: 'Triple Dynamic Gain',
        sign: 'x',

        cost: () => 1e3**(Math.sqrt(data.baselessRealm.rupLevels[1]+1)),
        effect: () => 3**(data.baselessRealm.rupLevels[1]+getRealmIUPEffect(8))*getRealmHUPEffect(2),
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: true,
    },
    {
        desc: 'Baseless Incrementy boosts Dynamic Gain',
        sign: 'x',

        cost: () => 1e5**(Math.sqrt(data.baselessRealm.rupLevels[2]+1)),
        effect: () => (Math.log10(data.baselessRealm.incrementy)*data.baselessRealm.rupLevels[2])*getRealmIUPEffect(5),
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: true,
    },

    {
        desc: 'Baseless boosts boost Baseless Incrementy gain',
        sign: 'x',

        cost: () => 1e5,
        effect: () => data.baselessRealm.times+1,
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: false,
    },
    {
        desc: 'Your Base boosts Baseless Incrementy Gain',
        sign: 'x',

        cost: () => 5e7,
        effect: () => data.ord.base,
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: false,
    },
    {
        desc: 'Total Rebuyables boost the third Rebuyable',
        sign: 'x',

        cost: () => 1e9,
        effect: () => getTotalRealmRUPLevels(),
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: false,
    },
    {
        desc: 'Challenge Completions boost Dynamic Gain',
        sign: 'x',

        cost: () => 1e11,
        effect: () => getTotalRealmChallengeCompletions(),
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: false,
    },
    {
        desc: 'Baseless Shifts boost the Ordinal to Baseless Incrementy conversion',
        sign: '+',

        cost: () => 5e13,
        effect: () => data.baseless.shifts/100,
        effectBase: () => 0,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: false,
    },
    {
        desc: 'Each Challenge Completion provides a free level of the second Rebuyable',
        sign: '+',

        cost: () => 1e16,
        effect: () => getTotalRealmChallengeCompletions(),
        effectBase: () => 0,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: false,
    },
    {
        desc: 'Factors multiply Baseless Incrementy gain at a reduced rate',
        sign: 'x',

        cost: () => 1e20,
        effect: () => Math.sqrt(totalFactorEffect()),
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: false,
        upgradeIsRebuyable: false,
    },
    {
        desc: 'Challenge Completions boost their respective Factors',
        sign: 'x',

        cost: () => 1e30,
        effect: (i) => data.baselessRealm.completions[i]+1,
        effectBase: () => 1,

        effectIsDecimal: false,
        effectIsIndex: true,
        upgradeIsRebuyable: false,
    },
]

let growthUpgradeData = [
    {
        desc: 'Boost AutoClicker speed',
        sign: 'x',
        effect: () => Math.sqrt(data.baselessRealm.hierarchy.ord*getFunctionalGUPPercentage(0)),
        baseEffect: () => 1,
        effectIsDecimal: false,
    },
    {
        desc: 'Boost Baseless Incrementy gain',
        sign: 'x',
        effect: () => safeLog(data.baselessRealm.hierarchy.ord*getFunctionalGUPPercentage(1), 10),
        baseEffect: () => 1,
        effectIsDecimal: false,
    },
    {
        desc: 'Increase the post-4e256 OP gain exponent',
        sign: '+',
        effect: () => customRoot(data.baselessRealm.hierarchy.ord*getFunctionalGUPPercentage(2), 8),
        baseEffect: () => 0,
        effectIsDecimal: false,
    },
]
let realmHUPData = [
    {
        desc: 'Boost NGH gain based on Challenge Completions',
        effect: () => getTotalRealmChallengeCompletions(),
        baseEffect: () => 1,
    },
    {
        desc: 'Boost NGH gain based on Total Baseless Boosters',
        effect: () => data.baselessRealm.total,
        baseEffect: () => 1,
    },
    {
        desc: 'NGH boosts the 2nd Incrementy Upgrade',
        effect: () => safeLog(data.baselessRealm.hierarchy.ord*data.baselessRealm.hupLevels[2], 10),
        baseEffect: () => 1,
    }
]

function initBaselessRealm(){
    initRealmBUPs()
    initRealmChallenges()
    initRealmIncrementy()
    initRealmHierarchies()
    updateRealmHTML()
}
function initRealmBUPs(){
    let rows = [DOM('rBupColumn0'), DOM('rBupColumn1'), DOM('rBupColumn2')]
    let total = 0
    for (let i = 0; i < rows.length; i++) {
        for (let n = 0; n < 4; n++) {
            let bup = document.createElement('button')
            bup.className = 'rBup'
            bup.id = `rBup${total}`
            bup.innerHTML = `${getRealmBUPDesc(total)}`

            rows[i].append(bup)
            ++total
        }
    }
    for (let i = 0; i < data.baselessRealm.hasBUP.length; i++) {
        DOM(`rBup${i}`).addEventListener('click', ()=>buyRealmBUP(i))
        DOM(`rBup${i}`).style.backgroundColor = hasRealmBUP(i) ? '#250505' : 'black'
    }

    let unlockCol = DOM(`rBuColumn`)
    for (let i = 0; i < 4; i++){
        let bup = document.createElement('button')
        bup.className = 'rBu'
        bup.id = `rBu${i}`
        bup.innerText = `${realmUnlockData[i].desc}\nRequires: ${realmUnlockData[i].req} Baseless Boosters`
        unlockCol.append(bup)
    }

    for (let i = 0; i < data.boost.unlocks.length; i++) {
        DOM(`bu${i}`).style.backgroundColor = data.baselessRealm.unlocks[i] ? '#250505' : 'black'
    }
}
function initRealmChallenges(){
    let container = DOM(`rChallengeContainer`)
    for (let i = 0; i < 2; i++) {
        let row = document.createElement('div')
        row.className = 'flexBox row'
        row.id = `rChallengeRow${i}`

        for (let j = 0; j < 3; j++) {
            let id = j+i*3
            let chal = document.createElement('button')
            chal.className =  isRealmChallengeMax(id) ? 'completedRealmChallenge'
                : inRealmChallenge(id) ? 'inRealmChallenge' : 'realmChallenge'
            chal.id = `rChallenge${id}`
            chal.innerHTML = `Challenge ${id+1}<br><br>${getRealmChallengeDesc(id)}`
            chal.addEventListener('click', () => controlRealmChallenge(id))

            row.append(chal)
        }
        container.append(row)
    }
}
function initRealmIncrementy(){
    let container = DOM(`rIncrementyContainer`)
    for (let i = 0; i < realmIUPData.length/3; i++) {
        let row = document.createElement('div')
        row.className = 'flexBox row'
        row.id = `rIUPRow${i}`

        for (let j = 0; j < 3; j++) {
            let id = j+i*3
            if(id > realmIUPData.length-1) break
            let iup = document.createElement('button')
            iup.className = 'rIUP'
            iup.id = `rIUP${id}`
            iup.innerText = `${getRealmIUPDesc(id)}`
            iup.addEventListener('click', () => buyRealmIUP(id))

            if(!isRealmIUPRebuyable(id) && hasRealmIUP(id)) iup.style.color = `#9e5324`

            row.append(iup)
        }
        container.append(row)
    }
}
function initRealmHierarchies(){
    let growthContainer = DOM(`growingUpgradesContainer`)
    let upgradeContainer = DOM(`rHUPContainer`)
    for (let i = 0; i < 3; i++) {
        // Growth
        let growth = document.createElement('button')
        growth.className = 'growthUpgrade'
        growth.id = `growthUpgrade${i}`

        let text = document.createElement('span')
        text.id = `gupText${i}`
        text.innerText = getGUPDesc(i)

        let label = document.createElement('label')
        let input = document.createElement('input')
        input.type = 'number'
        input.max = '100'
        input.min = '0'
        input.defaultValue = `${data.baselessRealm.gupPercentage[i]}`
        input.className = `growthInput`
        input.id = `growthInput${i}`
        input.addEventListener('change', () => changeGrowthPercent(i, true))
        input.addEventListener('input', () => changeGrowthPercent(i, false))

        label.append(input)
        growth.append(text)
        growth.append(label)
        growthContainer.append(growth)

        // Upgrades
        let upgrade = document.createElement('button')
        upgrade.className = 'rHUP'
        upgrade.id = `rHUP${i}`
        upgrade.innerHTML = `${getRealmHUPDesc(i)}`
        upgrade.addEventListener('click', () => buyRealmHUP(i))

        upgradeContainer.append(upgrade)
    }
}

function updateRealmHTML(){
    DOM(`boostNav`).style.color = isBaseless() ? '#ff8080' : '#8080FF'
}

function updateRealmBoostersHTML() {
    DOM('rBoosterText').innerHTML = `You have <span style="color: #ff8080; font-family: DosisSemiBold, serif">${(data.baselessRealm.amt)} Baseless Boosters</span> (${(data.baselessRealm.total)} total)`
    DOM('rBoosterTimesText').innerHTML = `You have <span style="color: #ff8080">Boosted</span> ${data.baselessRealm.times} times`

    DOM(getAdaptiveButton('factorBoostButton')).innerHTML = `Perform a Baseless Boost [+${getRealmBoosterGain()}] (B)<br>Requires ${displayRealmBoostReq()}`
    DOM(getAdaptiveButton('factorBoostButton')).style.color = alephNullGain() > realmBoostReq() ? '#fff480' : '#ff8080'

    if(getSubtab('realm') === 'realmIncrementy') updateRealmIncrementyHTML()
    if(getSubtab('realm') === 'realmHierarchies') updateRealmHierarchiesHTML()

    updateRealmUnlockHTML()
    updateStatusHTML()
}

function updateRealmUnlockHTML(){
    for (let i = 0; i < data.baselessRealm.unlocks.length; i++) {
        DOM(`rBu${i}`).style.backgroundColor = hasRealmUnlock(i) ? '#250505' : 'black'
        DOM(`realm${realmUnlockData[i].unl}Tab`).innerText = hasRealmUnlock(i) ? realmUnlockData[i].unl : '???'
    }
}

function updateRealmChalHTML(i){
    DOM(`rChallenge${i}`).className =  isRealmChallengeMax(i) ? 'completedRealmChallenge'
        : inRealmChallenge(i) ? 'inRealmChallenge' : 'realmChallenge'
    DOM(`rChallenge${i}`).innerHTML = `Challenge ${i+1}<br><br>${getRealmChallengeDesc(i)}`
}

function updateRealmIncrementyHTML(){
    DOM(`rIncrementyText`).innerText = `You have ${format(data.baselessRealm.incrementy)} Baseless Incrementy [+${format(getRealmIncrementyGain())}/s], multiplying your AutoClicker speed by ${format(getRealmIncrementyEffect())}x`
    DOM(`rDynamicText2`).innerText = `Your Dynamic Factor is ${format(data.dy.level)} [+${format(dyGain())}/s], it caps at ${format(getDyCap())}`
}

function updateRealmIUPHTML(i){
    DOM(`rIUP${i}`).innerText = getRealmIUPDesc(i)
    if(!isRealmIUPRebuyable(i) && hasRealmIUP(i)) DOM(`rIUP${i}`).style.color = `#9e5324`
}

function updateRealmHierarchiesHTML(){
    DOM(`rhText`).innerHTML = `${ordinalDisplay('n', data.baselessRealm.hierarchy.ord, data.baselessRealm.hierarchy.over,  10, ordinalDisplayTrim(3), false)} (10)`
    DOM(`rhGain`).innerText = `(+${format(getRealmHierarchyGain())}/s)`
}

function updateGUPHTML(i){
    DOM(`gupText${i}`).innerText = getGUPDesc(i)
}

function updateRealmHUPHTML(i){
    DOM(`rHUP${i}`).innerHTML = getRealmHUPDesc(i)
}

function buyRealmBUP(n){
    if(n % 4 !== 0 && !data.baselessRealm.hasBUP[n-1]){
        for (let i = 0; i < n % 4; i++) {
            let index = (i % 4) + (4 * Math.floor(n / 4))
            buyRealmBUP(index)
        }
    }

    if (data.baselessRealm.amt < getRealmBUPCost(n)) return
    data.baselessRealm.amt -= getRealmBUPCost(n)
    data.baselessRealm.hasBUP[n] = true

    if(inRealmChallenge(3)) updateRealmChalHTML(3)
    if(inRealmChallenge(4)) updateRealmChalHTML(4)

    DOM(`rBup${n}`).style.backgroundColor = '#250505'
}

function realmBoosterRefund(){
    for (let i = 0; i < data.baselessRealm.hasBUP.length; i++) {
        data.baselessRealm.hasBUP[i] = false
        DOM(`rBup${i}`).style.backgroundColor = 'black'
    }
    data.baselessRealm.amt = data.baselessRealm.total
    if(isInAnyRealmChallenge()) controlRealmChallenge()
    else realmBoosterReset()
}

function controlRealmChallenge(i = data.baselessRealm.chalActive){
    if(isRealmChallengeMax(i)) return
    if(inRealmChallenge(i)){
        data.baselessRealm.chalActive = -1
        realmBoosterReset()
        updateRealmChalHTML(i)
        updateStatusHTML()
        return
    }

    let temp = data.baselessRealm.chalActive
    data.baselessRealm.chalActive = i
    updateRealmChalHTML(i)
    if(temp !== -1) updateRealmChalHTML(temp)
    realmBoosterReset()

    data.baseless.shifts = getRealmChallengeLock(i)
    data.ord.base = getBaselessLock(2)*2**data.baseless.shifts
    updateDynamicShiftHTML()
    updateStatusHTML()
}

function completeRealmChallenge(){
    if(!isInAnyRealmChallenge()) return
    if(data.ord.ordinal.gte(getRealmChallengeGoal())){
        let temp = data.baselessRealm.chalActive
        controlRealmChallenge()
        ++data.baselessRealm.completions[temp]
        updateRealmChalHTML(temp)
        /*if(data.sToggles[2])*/ createAlert("Baseless Challenge Complete!", `You have Completed Baseless Challenge ${temp+1}x${getRealmChallengeCompletions(temp)}!`, 'Awesome!')
    }
}

function buyRealmIUP(i){
    if(data.baselessRealm.incrementy < getRealmIUPCost(i)) return

    data.baselessRealm.incrementy -= getRealmIUPCost(i)
    if(isRealmIUPRebuyable(i)){
        ++data.baselessRealm.rupLevels[i]
        updateRealmIUPHTML(i)
        return
    }

    data.baselessRealm.hasUpgrade[i] = true
    updateRealmIUPHTML(i)
}

function checkGrowthPercent(value, n, getMaxPossible = false, forceMaxPossible = false){
    let current = 0
    for (let i = 0; i < data.baselessRealm.gupPercentage.length; i++) {
        if(i !== n) current += data.baselessRealm.gupPercentage[i]
    }
    let isSafe = current + value <= 100
    if(getMaxPossible && (!isSafe || forceMaxPossible) ) return 100 - current
    return isSafe
}
function changeGrowthPercent(i, onChange){
    let value = parseInt(DOM(`growthInput${i}`).value)
    if(isNaN(value)){
        if(onChange){
            value = 0
            DOM(`growthInput${i}`).value = '0'
        }
        else return
    }
    if(value < 0){
        value = 0
        DOM(`growthInput${i}`).value = '0'
    }
    if(value > 100){
        value = 100
        DOM(`growthInput${i}`).value = '100'
    }

    if(!checkGrowthPercent(value, i)){
        data.baselessRealm.gupPercentage[i] = checkGrowthPercent(value, i, true)
        DOM(`growthInput${i}`).value = `${checkGrowthPercent(value, i, true, true)}`
    }
    else data.baselessRealm.gupPercentage[i] = value

    updateGUPHTML(i)
}
function buyRealmHUP(i){
    if(data.baselessRealm.hierarchy.ord < getRealmHUPCost(i)) return
    data.baselessRealm.hierarchy.ord -= getRealmHUPCost(i)
    ++data.baselessRealm.hupLevels[i]
    updateRealmHUPHTML(i)
}

function realmBoost(){
    if(alephNullGain() < realmBoostReq()) return
    if(isInAnyRealmChallenge()) controlRealmChallenge()

    data.baselessRealm.amt += getRealmBoosterGain()
    data.baselessRealm.total += getRealmBoosterGain()
    ++data.baselessRealm.times

    realmBoosterReset()
    updateDynamicShiftHTML()
}

function getRealmBoosterGain(){
    return data.baselessRealm.times+1
}

function displayRealmBoostReq(){
    return `${format(realmBoostReq())} theoretical ℵ<sub>0</sub> gain`
}
function realmBoostReq(){
    return 9.6e96
}

function realmBoosterReset(){
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

let isBaseless = () => data.baseless.baseless

let hasRealmUnlock = (i) => data.baselessRealm.total >= realmUnlockData[i].req
let hasRealmBUP = (i) => data.baselessRealm.hasBUP[i]

function getRealmBUPEffect(i){
    if(isBaseless() && hasRealmBUP(i)){
        return realmBupData[i].isDecimal
            ? Decimal.max(realmBupData[i].eff(), realmBupData[i].baseEff())
            : Math.max(realmBupData[i].eff(), realmBupData[i].baseEff())
    }
    return realmBupData[i].baseEff()
}
let getRealmBUPCost = (i) => realmBupData[i].cost
let getBaseRealmBUPDesc = (i) => `${realmBupData[i].desc}<br>${getRealmBUPCost(i)} Baseless Boosters`
let getRealmBUPDesc = (i) => getBaseRealmBUPDesc(i)

function getTotalRealmBUPs(){
    let total = 0
    for (let i = 0; i < data.baselessRealm.hasBUP.length; i++) {
        if (data.baselessRealm.hasBUP[i]) ++total
    }
    return total
}

let getRealmChallengeDesc = (i) => `${getRealmChallengeDescBase(i)}<br><br>${getRealmChallengeGoalDesc(i)}</sup><br>${getRealmChallengeRewardDesc(i)}<br>${getRealmChallengeFactorRewardDesc(i)}<br>${getRealmChallengeCompDesc(i)}`
let getRealmChallengeDescBase = (i) => `You will be in a Realm with ${getRealmChallengeLock(i)} Baseless Shifts<br>${realmChallengeData[i].desc}`
let getRealmChallengeGoalDesc = () => `Goal: ${ordinalDisplay('', getRealmChallengeGoal(), 0, data.ord.base, ordinalDisplayTrim(1), false)}`
let getRealmChallengeRewardDesc = (i) => realmChallengeData[i].effectDesc
let getRealmChallengeFactorRewardDesc = (i) => `On your final completion, Cascade Factor ${6-i}`
let getRealmChallengeCompDesc = (i) => `Completions: ${getRealmChallengeCompletions(i)}/3`

let getRealmChallengeInnerEffect = (i) => inRealmChallenge(i) && realmChallengeData[i].hasInnerEffect || inRealmChallenge((4)) && i === 3  ? realmChallengeData[i].innerEffect() : 1

let getRealmChallengeCompletions  = (i) => data.baselessRealm.completions[i]
function getTotalRealmChallengeCompletions(){
    let total = 0
    for (let i = 0; i < data.baselessRealm.completions.length; i++) {
        total += data.baselessRealm.completions[i]
    }
    return total
}

let getRealmChallengeGoal = () => numberFromOrdinal('&omega;<sup>&omega;</sup>', data.ord.base).pow(getRealmChallengeInnerEffect(3))
let getRealmChallengeLock = (i) => 5+data.baselessRealm.completions[i]
let isInAnyRealmChallenge = () => data.baselessRealm.chalActive !== -1
let inRealmChallenge = (i) => data.baselessRealm.chalActive === i
let isRealmChallengeMax = (i) => data.baselessRealm.completions[i] > 2

function getRealmChallengeEffect(i, j = null){
    if(getRealmChallengeCompletions(i) === 0) return realmChallengeData[i].effectBase()
    let divisor = 0.5**getRealmChallengeCompletions(i)*8

    if(realmChallengeData[i].effectIsDecimal){
        return Decimal.max(realmChallengeData[i].effectBase(), realmChallengeData[i].effectIsIndex ? realmChallengeData[i].eff(j).div(divisor) : realmChallengeData[i].eff().div(divisor))
    }
    return Math.max(realmChallengeData[i].effectBase(), realmChallengeData[i].effectIsIndex ? realmChallengeData[i].eff(j) / divisor : realmChallengeData[i].eff() / divisor)
}

let getRealmIUPDesc = (i) => `${getRealmIUPDescBase(i)}${getRealmIUPLevelsDesc(i)}\n${getRealmIUPEffectDesc(i)}\n${getRealmIUPCostDesc(i)}`
let getRealmIUPDescBase = (i) => realmIUPData[i].desc
let getRealmIUPLevels = (i) => data.baselessRealm.rupLevels[i]
let getRealmIUPLevelsDesc = (i) => isRealmIUPRebuyable(i) ? ` (${getRealmIUPLevels(i)})` : ''
let getRealmIUPCost = (i) => realmIUPData[i].cost()
let getRealmIUPCostDesc = (i) => isRealmIUPRebuyable(i) || !hasRealmIUP(i) ? `Cost: ${format(getRealmIUPCost(i))} Baseless Incrementy` : ''
let isRealmIUPMultiplier = (i) => realmIUPData[i].sign === 'x'
let getRealmIUPEffectDesc = (i) => `Currently: ${!isRealmIUPMultiplier(i) ? realmIUPData[i].sign : ''}${format(getRealmIUPEffect(i))}${isRealmIUPMultiplier(i) ? realmIUPData[i].sign : ''}`
let hasRealmIUP = (i) => isRealmIUPRebuyable(i) ? data.baselessRealm.rupLevels[i] > 0 : data.baselessRealm.hasUpgrade[i]
let isRealmIUPRebuyable = (i) => realmIUPData[i].upgradeIsRebuyable

function getRealmIUPEffect(i, j = null){
    if(!hasRealmIUP(i) || !isBaseless()) return realmIUPData[i].effectBase()
    if(realmIUPData[i].effectIsIndex && j === null) j = 0

    if(realmIUPData[i].effectIsDecimal){
        return Decimal.max(realmIUPData[i].effectBase(), realmIUPData[i].effectIsIndex ? realmIUPData[i].effect(j) : realmIUPData[i].effect())
    }
    return Math.max(realmIUPData[i].effectBase(), realmIUPData[i].effectIsIndex ? realmIUPData[i].effect(j) : realmIUPData[i].effect())
}

function getTotalRealmRUPLevels(){
    let total = 0
    for (let i = 0; i < data.baselessRealm.rupLevels; i++) {
        total += data.baselessRealm.rupLevels[i]
    }
    return total
}

let getRealmIncrementyGain = () => isBaseless() ? (data.ord.ordinal.pow(0.001+getRealmIUPEffect(7)).toNumber())*getRealmIUPEffect(0)*getRealmIUPEffect(3)*getRealmIUPEffect(4)*getRealmIUPEffect(9)*getGUPEffect(1) : 0
let getRealmIncrementyEffect = () => isBaseless() ? Math.max(1, Math.sqrt(data.baselessRealm.incrementy)) : 1

let getGUPDesc = (i) => `${getGUPDescBase(i)}\n${getGUPEffectDesc(i)}\nHierarchy percent to allocate: `
let getGUPDescBase = (i) => growthUpgradeData[i].desc
let getGUPEffect = (i) => isBaseless() && getGUPPercentage(i) > 0 ? Math.max(growthUpgradeData[i].baseEffect(), growthUpgradeData[i].effect()) : growthUpgradeData[i].baseEffect()
let isGUPMultiplier = (i) => growthUpgradeData[i].sign === 'x'
let getGUPEffectDesc = (i) => `Currently: ${!isGUPMultiplier(i) ? growthUpgradeData[i].sign : ''}${format(getGUPEffect(i))}${isGUPMultiplier(i) ? growthUpgradeData[i].sign : ''}`
let getGUPPercentage = (i) => data.baselessRealm.gupPercentage[i]
let getFunctionalGUPPercentage = (i) => data.baselessRealm.gupPercentage[i]/100

let getRealmHUPDesc = (i) => `${getRealmHUPDescBase(i)} ${getRealmHUPLevelsDesc(i)}<br>${getRealmHUPEffectDesc(i)}<br>${getRealmHUPCostDesc(i)}`
let getRealmHUPDescBase = (i) => realmHUPData[i].desc
let getRealmHUPLevels = (i) => data.baselessRealm.hupLevels[i]
let getRealmHUPLevelsDesc = (i) => `(${getRealmHUPLevels(i)})`
let getRealmHUPCost = (i) => (data.baselessRealm.hupLevels[i] + 10)**(1 + data.baselessRealm.hupLevels[i])
let getRealmHUPCostDesc = (i) => `Cost: ${ordinalDisplay('', getRealmHUPCost(i), 0, 10, ordinalDisplayTrim(1), false)} NGH`
let isRealmHUPActive = (i) => getRealmHUPLevels(i) > 0 && isBaseless()
let getRealmHUPEffect = (i) => isRealmHUPActive(i) ? Math.max(realmHUPData[i].baseEffect(), realmHUPData[i].effect()) : realmHUPData[i].baseEffect()
let getRealmHUPEffectDesc = (i) => `Currently: ${format(getRealmHUPEffect(i))}x`

let getRealmHierarchyGain = () => data.ord.base*getRealmHUPEffect(0)*getRealmHUPEffect(1)