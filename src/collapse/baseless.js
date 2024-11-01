function initANRebuyables(){
    const container = DOM('anRebuyableContainer')
    for (let i = 0; i < data.baseless.anRebuyables.length/5; i++) {
        let row = document.createElement('div')
        row.className = `aoRow`
        row.id = `anRRow${i}`
        for (let j = 0; j < 5; j++ ){
            let id = i*5+j
            let el = document.createElement('button')
            el.className = 'anRebuyable'
            el.id = `anR${id}`
            el.addEventListener("click", ()=>buyANR(id))
            row.append(el)
        }
        container.append(row)
    }
    for (let i = 0; i < data.baseless.anRebuyables.length; i++) {
        updateANRHTML(i)
    }
}

function updateAlephNullHTML(){
    DOM(`alephNull`).innerHTML = `You have <span style="color: red; font-family: DosisSemiBold">${format(data.baseless.alephNull)} ℵ<sub>0</sub></span>, increasing the RUP1 effect base by <span style="color: red; font-family: DosisSemiBold">${format(alephNullEffects[0]())}</span> and providing <span style="color: red; font-family: DosisSemiBold">${format(alephNullEffects[1]())}</span> free levels of the last Darkness Buyable</span><br>Your <span style="color: goldenrod; font-family: DosisSemiBold">Total Charge</span> is multiplying AutoClicker Speed in the Baseless Realms by <span style="color: goldenrod; font-family: DosisSemiBold">${format(chargeBoostToBaseless(true))}x</span>`
}
function updateDynamicShiftHTML(){
    if(data.baseless.baseless){
        if(isInAnyDChallenge()) return DOM(`dynamicShift`).innerHTML = `Perform a <span style="color: darkred; font-size: 1rem"">Baseless Shift</span><br>The Instability of your Realm prevents this`
        DOM(`dynamicShift`).innerHTML = data.baseless.shifts < 7
            ? `<span style="font-size: 1rem">Perform a <span style="color: darkred">Baseless Shift</span> (H)<br>Requires: &omega;<sup>&omega;</sup></span><br>This will unlock Factor ${data.baseless.shifts+1}, perform a Factor Shift reset, multiply your ℵ<sub>0</sub> gain multiplier by ${format(dynamicShiftMultipliers[0](data.baseless.shifts+1))}, multiply your Dynamic gain by ${format(dynamicShiftMultipliers[1](data.baseless.shifts+1))}, and <span style="color: darkred">double your Base</span>`
            : `Perform a <span style="color: darkred; font-size: 1rem"">Baseless Shift</span><br>The Future Remains Unknown`
    }
    else {
        DOM(`dynamicShift`).innerHTML = `<span style="font-size: 1rem">Perform a <span style="color: darkred">Baseless Shift</span> (H)<br><span style="font-size: 0.9rem">You must be in a Baseless Realm to perform a Baseless Shift</span><br>`
    }
    updateHeaderHTML()
}
function updateANRHTML(i){
    DOM(`anR${i}`).innerHTML = `<span style="color: #ce5c0b">${anRebuyableData[i].desc} (${formatWhole(getANRLevels(i))})</span><br>Requires: ${format(getANRCost(i))} ℵ<sub>0</sub><br>Currently: ${anRebuyableData[i].symbol !== 'x' ? anRebuyableData[i].symbol : ''}${format(i==0?getANREffect(i, false):getANREffect(i))}${anRebuyableData[i].symbol === 'x' ? anRebuyableData[i].symbol : ''}`
}
function updateAllANRHTML(){
    for (let i = 0; i < data.baseless.anRebuyables.length; i++) {
        updateANRHTML(i)
    }
    checkANRUnlockHTML()
}
function checkANRUnlockHTML(){
    for (let i = 0; i < data.baseless.anRebuyables.length; i++) {
        DOM(`anR${i}`).style.display = anRebuyableData[i].unl() ? `block` : `none`
    }
}

function updateBaselessEnterHTML(id, load=false) {
    if(data.baseless.baseless && !load){
        DOM(`baseless`).children[1].selectedIndex = data.baseless.mode
        DOM(`baseless`).children[1].style.color = getBaselessColor(data.baseless.mode)
        return createAlert('Illegal Move!', 'You cannot change the Realm you\'re already in!', 'Dang it!')
    }
    if(load){
        DOM(`baseless`).children[1].selectedIndex = data.baseless.mode
    }

    data.baseless.mode = id
    updateBaselessSelectHTML()
    DOM(`baseless`).children[2].innerHTML = `<br><br>You will be trapped in <span style="color: darkred">Base ${getBaselessLock(id)}</span> with Baseless Shifts providing a ${getBaselessMult(id)}x multiplier to ℵ<sub>0</sub> gain`
}

function updateBaselessSelectHTML(){
    for (let i = 0; i < DOM(`baseless`).children[1].children.length; i++){
        DOM(`baseless`).children[1].children[i].style.color = getBaselessColor(i)
    }
    DOM(`baseless`).children[1].style.color = getBaselessColor(data.baseless.mode)
}

let baselessData = [
    {
        name: 'Baseless',
        altName: '',
        altUnlock: () => false,
        altColor: '#000000',
        multiplier: () => 2,
        lock: () => 10,
    },
    {
        name: 'Obliterated',
        altName: '',
        altUnlock: () => false,
        altColor: '#000000',
        multiplier: () => 100,
        lock: () => 20,
    },
    {
        name: 'Forgotten',
        altName: 'Destabilized',
        altUnlock: () => getEUPEffect(4, 1),
        altColor: '#ff8080',
        multiplier: () => 10000,
        lock: () => inDChallenge(2) || inDChallenge(4) ? 31 : 100-(hasSingFunction(8) ? getSingFunctionEffect(8) : 0)-getInstabilityConstantEffect(0),
    },
]

const anRebuyableData = [
    {
        desc: "Cardinals boost AutoClickers while in a Baseless Realm",
        eff: () => (data.collapse.cardinals.pow(2)).times(getANRLevels(0)),
        costBase: 1e3,
        symbol: 'x',
        unl: () => true,
        freeLevels: () => getEUPEffect(1, 0, true)
    },
    {
        desc: "Boost the Total Charge boost to Baseless Realms",
        eff: () => Math.max(1, (getANRLevels(1))),
        costBase: 1e6,
        symbol: '^',
        unl: () => true,
        freeLevels: () => 0
    },
    {
        desc: "Increase the Decrementy gain exponent",
        eff: () => (0.1*getANRLevels(2))+(getPringleEffect(5, true))+(getEUPEffect(1, 2, true)),
        costBase: 1e4,
        symbol: '+',
        unl: () => true,
        freeLevels: () => 0
    },

    // Unlocked by a Remnant / Beth Omega Milestone
    {
        desc: "ℵ<sub>0</sub> boosts both Hierarchy Successors",
        eff: () => Math.sqrt(data.baseless.alephNull)*getANRLevels(3),
        costBase: 1e9,
        symbol: 'x',
        unl: () => hasAOMilestone(4),
        freeLevels: () => 0
    },
    {
        desc: "Provide a free level of the 1st, 3rd, 4th, and 5th ℵ<sub>&omega;</sub> Rebuyables",
        eff: () => getANRLevels(4) > 0 ? getANRLevels(4) : 0,
        costBase: 1e11,
        symbol: '+',
        unl: () => hasAOMilestone(4),
        freeLevels: () => 0
    },
]

function baselessControl(){
    if(!data.baseless.tutorial) createAlert('Welcome!', 'This popup will not be shown again!\nYou cannot respec Booster Upgrades while in this Realm. However, Dynamic Factor is unlocked immediately and the Max All AutoBuyer works all the time!', 'Thanks?')
    const gain = data.baseless.baseless ? alephNullGain() : 0

    if(!data.baseless.baseless){
        if(cardinalGain().gt(data.collapse.bestCardinalsGained)) data.collapse.bestCardinalsGained = cardinalGain()
        data.collapse.cardinals = data.collapse.cardinals.plus(cardinalGain())
    }
    collapseReset()

    data.baseless.tutorial = true
    data.baseless.baseless = !data.baseless.baseless

    if(data.baseless.mode === 2 && getEUPEffect(4, 1)){
        destabilizationHTML()
    }

    DOM(`baseless`).children[0].innerHTML = `${data.baseless.baseless ? 'Exit' : 'Enter'}`

    if(data.baseless.baseless){
        data.ord.base = getBaselessLock(data.baseless.mode)
        data.dy.gain = D(0.002)
    }
    else{
        data.baseless.shifts = 0
        data.baseless.alephNull += gain
        data.ord.base = 10
        DOM(`baseless`).children[2].innerHTML = `<br><br>You will be trapped in <span style="color: darkred">Base ${getBaselessLock(data.baseless.mode)}</span> with Baseless Shifts providing a ${getBaselessMult(data.baseless.mode)}x multiplier to ℵ<sub>0</sub> gain`
    }

    updateDynamicShiftHTML()
    updateAlephNullHTML()
    updateHeaderHTML()
}

function dynamicShift(){
    if(!data.baseless.baseless || isInAnyDChallenge()) return
    if(data.ord.ordinal.lt(numberFromOrdinal('&omega;<sup>&omega;</sup>', data.ord.base)) || data.baseless.shifts > 6) return
    ++data.baseless.shifts
    data.ord.base *= 2
    fsReset()
    updateDynamicShiftHTML()
}

function buyANR(i){
    if(data.baseless.alephNull < getANRCost(i)) return
    ++data.baseless.anRebuyables[i]
    updateANRHTML(i)
    updateAlephNullHTML()
}

let dynamicShiftMultipliers = [
    (i = data.baseless.shifts) => Math.max(1, getBaselessMult(data.baseless.mode)**i),
    (i = data.baseless.shifts) => Math.max(1, 1000**(i+data.baseless.mode))
]

let alephNullGain = () =>  Math.max(1, Decimal.log10(Decimal.max(data.ord.ordinal,1)).toNumber()*dynamicShiftMultipliers[0]()*getAOEffect(1)*getPringleEffect(4, true))
let alephNullEffects = [
    () => Math.max(0, Math.log10(data.baseless.alephNull)/10)*(Math.max(1, getPringleEffect(5, true))),
    () => Math.max(0, Math.floor(softcap(Math.log10(data.baseless.alephNull), 30, 0.5)))
]

let getBaselessName = (i) => baselessData[i].altUnlock() ? baselessData[i].altName : baselessData[i].name
let getBaselessColor = (i) => baselessData[i].altUnlock() ? baselessData[i].altColor : 'darkred'
let getBaselessMult = (i) => baselessData[i].multiplier()
let getBaselessLock = (i) => baselessData[i].lock()
let chargeBoostToBaseless = (display = false) => data.baseless.baseless || display
    ? Math.max(1, ((data.incrementy.totalCharge**10)*getEUPEffect(1, 1, true))**getANREffect(1))
    : 1
let getANRCost = (i) => ((anRebuyableData[i].costBase/100+1)**data.baseless.anRebuyables[i])*anRebuyableData[i].costBase
let getANREffect = (i, number = true) => {
    if(number) return getANREffect(i, false).toNumber()

    if(i === 2) return getANRLevels(2) > 0 && isTabUnlocked('baseless') ? D(anRebuyableData[i].eff()) : D(0)

    if(!isTabUnlocked('baseless')) return D(1)
    return Decimal.max(1, anRebuyableData[i].eff());
}
let getANRLevels = (i) => data.baseless.anRebuyables[i] + anRebuyableData[i].freeLevels()
