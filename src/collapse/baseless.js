const baselessRealmData = [
    {
        name: 'Baseless',
        multiplier: 2,
        lock: () => 10
    },
    {
        name: 'Obliterated',
        multiplier: 100,
        lock: () => 20
    },
    {
        name: 'Forgotten',
        multiplier: 1e4,
        lock: () => 100-getHyperchargeEffect(13)-getStableEnergyEffect(2, 0)
    },
]

const metaANBuyableData = [
    {
        desc: "Boost all Realm Enhancements",
        sign: '^',
        effect: () => D(1).plus(getANRLevel(0, 'meta')/100),
        baseEffect: () => D(1),
        freeLevels: () => getEUPEffect(1, 1, true),
        cost: () => 1e6**data.baseless.metaANR[0]*1e6,
    },
    {
        desc: "Total Baseless Boosters boost AutoClicker speed",
        sign: '^',
        effect: () => D(1).plus(Decimal.log10((data.baselessRealm.total+1)/100).times(getANRLevel(1, 'meta'))),
        baseEffect: () => D(1),
        cost: () => 1e5**data.baseless.metaANR[1]*1e5
    },
]

const normalANBuyableData = [
    {
        desc: "Increase the Decrementy gain exponent",
        sign: '+',
        effect: () => D(0.1*getANRLevel(0, 'normal')),
        cost: () => 1e4**data.baseless.normalANR[0]*1e4,
    },
    {
        desc: "Increase the RUP1 effect base",
        sign: '+',
        effect: () => D(getANRLevel(1, 'normal')),
        freeLevels: () => getPringleEffect(5, true),
        cost: () => 50**data.baseless.normalANR[1]
    },
    {
        desc: "Gain a free level of every Darkness Rebuyable",
        sign: '+',
        effect: () => D(getANRLevel(2, 'normal')),
        freeLevels: () => getPringleEffect(5, true),
        cost: () => 1e3**data.baseless.normalANR[2]*1e3
    },
    {
        desc: "Gain a free leve of the 1st, 3rd, 4th, and 5th ℵ<sub>&omega;</sub> Rebuyables",
        sign: '+',
        effect: () => D(getANRLevel(3, 'normal')),
        unlockReq: () => hasAOMilestone(4),
        cost: () => 2e6**data.baseless.normalANR[3]*2e6
    },
]

const alephNullEffectData = [
    {
        desc: 'increasing every other ℵ\'s amount by',
        sign: '+',
        effect: () => data.baseless.alephNull,
        baseEffect: () => 0,
    },
    {
        desc: 'multiplying every other ℵ\'s effect by',
        sign: 'x',
        effect: () => Math.sqrt(data.baseless.alephNull),
        baseEffect: () => 1,
    },
    {
        desc: 'multiplying both Hierarchy Successors by',
        sign: 'x',
        effect: () => customRoot(data.baseless.alephNull, 4),
        baseEffect: () => 1,
        unlockReq: () => hasAOMilestone(4)
    },
]

const realmEnhancementData = [
    {
        name: 'Total Charge',
        color: getCSSVariable('realm-enhancement-one-text-color'),
        amount: () => data.incrementy.totalCharge,
        effect: () => D(data.incrementy.totalCharge**2)
    },
    {
        name: 'Cardinals',
        color: getCSSVariable('realm-enhancement-two-text-color'),
        amount: () => data.collapse.cardinals,
        effect: () => Decimal.sqrt(data.collapse.cardinals)
    },
    {
        name: 'Total Fractal Energy',
        color: getCSSVariable('realm-enhancement-three-text-color'),
        amount: () => data.obliterate.times,
        effect: () => D(data.obliterate.times).pow(data.obliterate.times),
        unlockReq: () => getEUPEffect(1, 2)
    },
]

function initANRebuyables(){
    const metaContainer = DOM('metaANRROW')
    const normalContainer = DOM('normalANRROW')
    for (let i = 0; i < metaANBuyableData.length; i++) {
        let el = document.createElement('button')
        el.className = 'metaANR'
        el.id = `metaANR${i}`
        el.innerHTML = makeANRText(i, 'meta')
        el.addEventListener("click", ()=>buyANR(i, 'meta'))
        metaContainer.append(el)
    }
    for (let i = 0; i < normalANBuyableData.length; i++) {
        let el = document.createElement('button')
        el.className = 'normalANR'
        el.id = `normalANR${i}`
        el.innerHTML = makeANRText(i, 'normal')
        el.addEventListener("click", ()=>buyANR(i, 'normal'))
        normalContainer.append(el)
    }

    initBaselessRealm()
}

function updateAlephNullHTML(){
    DOM(`alephNull`).innerHTML = ``
}
function updateDynamicShiftHTML(){
    if(data.baseless.baseless){
        DOM(`dynamicShift`).innerHTML = data.baseless.shifts < 7
            ? `<span style="font-size: 1rem">Perform a <span style="color: ${getCSSVariable('baseless-shift-text-shift-color')}">Baseless Shift</span> (H)<br>Requires: &omega;<sup>&omega;</sup></span><br>This will unlock Factor ${data.baseless.shifts+1}, perform a Factor Shift reset, multiply your ℵ<sub>0</sub> gain multiplier by ${format(dynamicShiftMultipliers[0](data.baseless.shifts+1))}, multiply your Dynamic gain by ${format(dynamicShiftMultipliers[1](data.baseless.shifts+1))}, and <span style="color: ${getCSSVariable('baseless-shift-text-shift-color')}">double your Base</span>`
            : `Perform a <span style="color: ${getCSSVariable('baseless-shift-text-shift-color')}; font-size: 1rem"">Baseless Shift</span><br>The Future Remains Unknown`
    }
    else {
        DOM(`dynamicShift`).innerHTML = `<span style="font-size: 1rem">Perform a <span style="color: ${getCSSVariable('baseless-shift-text-shift-color')}">Baseless Shift</span> (H)<br><span style="font-size: 0.9rem">You must be in a Baseless Realm to perform a Baseless Shift</span><br>`
    }
}

function isAlephNullEffectLocked(i){
    if(alephNullEffectData[i].unlockReq === undefined) return false
    return !alephNullEffectData[i].unlockReq()
}
function makeAlephNullEffectText(){
    let text = ''
    for (let i = 0; i < alephNullEffectData.length; i++) {
        if(isAlephNullEffectLocked(i)) continue
        const isNextLocked = i + 1 === alephNullEffectData.length ? true : isAlephNullEffectLocked(i+1)
        const leader = isNextLocked ? ', and ' : ', '
        text += `${leader}${getAlephNullEffectText(i)} <span style="color: ${getCSSVariable('aleph-null-text-effect-color')}">${format(getAlephNullEffect(i))}</span>`
    }
    return text
}

function isRealmEnhancementLocked(i){
    if(realmEnhancementData[i].unlockReq === undefined) return false
    return !realmEnhancementData[i].unlockReq()
}
function makeRealmEnhancementText(){
    let text = ''
    for (let i = 0; i < realmEnhancementData.length; i++) {
        if(isRealmEnhancementLocked(i)) continue
        const color = realmEnhancementData[i].color
        text += `<br>Realm Enhancement ${i+1}: Your <span style="color: ${color}">${formatWhole(getRealmEnhancementAmount(i))} ${getRealmEnhancementText(i)}</span> is multiplying AutoClicker speed in the Realms by <span style="color: ${color}">${format(getRealmEnhancement(i))}x</span>`
    }
    return text
}

function makeANRText(i, type){
    return `<span style="color: ${getCSSVariable('aleph-null-buyable-description-text-color')}">${getANRText(i, type)} (${formatWhole(getANRLevel(i, type))})</span><br>Requires: ${format(getANRCost(i, type))} ℵ<sub>0</sub><br>Currently: ${formatSign(getANREffect(i, type), getANRSign(i, type))}`
}

function updateANRHTML(i, type){
    DOM(`${type}ANR${i}`).innerHTML = makeANRText(i, type)
}
function updateAllANRHTML(){
    for (let i = 0; i < metaANBuyableData.length; i++) {
        updateANRHTML(i, 'meta')
    }
    for (let i = 0; i < normalANBuyableData.length; i++) {
        updateANRHTML(i, 'normal')
    }
    checkANRUnlockHTML()
}
function checkANRUnlockHTML(){
    for (let i = 0; i < metaANBuyableData.length; i++) {
        if(metaANBuyableData[i].unlockReq === undefined) continue
        DOM(`metaANR${i}`).style.display = metaANBuyableData[i].unlockReq() ? `block` : `none`
    }
    for (let i = 0; i < normalANBuyableData.length; i++) {
        if(normalANBuyableData[i].unlockReq === undefined) continue
        DOM(`normalANR${i}`).style.display = normalANBuyableData[i].unlockReq() ? `block` : `none`
    }
}

function updateBaselessEnterHTML(id, load=false) {
    if(data.baseless.baseless && !load){
        DOM(`baseless`).children[1].selectedIndex = data.baseless.mode
        return showNotification('You cannot change the Realm you\'re already in!')
    }
    if(load){
        DOM(`baseless`).children[1].selectedIndex = data.baseless.mode
    }

    data.baseless.mode = id
    DOM(`baseless`).children[2].innerHTML = `<br><br>You will be trapped in <span style="color: ${getCSSVariable('baseless-realm-base-text-color')}">Base ${getBaselessLock(id)}</span>, but Baseless Shifts and Boosters will be accessible and Baseless Shifts will boost ℵ<sub>0</sub> gain by ${getBaselessMult(id)}x`
}

function baselessControl(){
    const gain = data.baseless.baseless ? getAlephNullGain() : 0

    if(!data.baseless.baseless){
        if(cardinalGain().gt(data.collapse.bestCardinalsGained)) data.collapse.bestCardinalsGained = cardinalGain()
        data.collapse.cardinals = data.collapse.cardinals.plus(cardinalGain())
    }
    collapseReset()

    data.baseless.tutorial = true
    data.baseless.baseless = !data.baseless.baseless

    DOM(`baseless`).children[0].innerHTML = `${data.baseless.baseless ? 'Exit' : 'Enter'}`

    if(data.baseless.baseless){
        data.ord.base = getBaselessLock(data.baseless.mode)
        data.dy.gain = D(0.002)
    }
    else {
        if(inAnyRealmChallenge()) controlRealmChallenge() // i defaults to current ID
        data.baseless.shifts = 0
        data.baseless.alephNull += gain
        data.ord.base = 10
        DOM(`baseless`).children[2].innerHTML = `<br><br>You will be trapped in <span style="color: ${getCSSVariable('baseless-realm-base-text-color')}">Base ${getBaselessLock(data.baseless.mode)}</span>, but Baseless Shifts and Boosters will be accessible and Baseless Shifts will boost ℵ<sub>0</sub> gain by ${getBaselessMult(data.baseless.mode)}x`
        switchTab('collapse')
    }

    updateRealmHTML()
    updateDynamicShiftHTML()
    updateAlephNullHTML()
    updateStatusHTML()
}

function canDynamicShift(){
    return data.baseless.baseless && data.ord.ordinal.gte(numberFromOrdinal('&omega;<sup>&omega;</sup>', data.ord.base)) && data.baseless.shifts < 7
}

function dynamicShift(){
    if(!data.baseless.baseless) return
    if(data.ord.ordinal.lt(numberFromOrdinal('&omega;<sup>&omega;</sup>', data.ord.base)) || data.baseless.shifts > 6) return
    ++data.baseless.shifts
    data.ord.base *= 2
    fsReset()
    updateDynamicShiftHTML()
}

function buyANR(i, type){
    if(data.baseless.alephNull < getANRCost(i, type)) return

    if(type === 'meta') ++data.baseless.metaANR[i]
    if(type === 'normal') ++data.baseless.normalANR[i]
    updateANRHTML(i, type)
    updateAlephNullHTML()
}

let dynamicShiftMultipliers = [
    (i = data.baseless.shifts) => Math.max(1, getBaselessMult(data.baseless.mode)**i),
    (i = data.baseless.shifts) => Math.max(1, 1000**(i+data.baseless.mode))
]

function getAlephNullGain(){
    if(inAnyRealmChallenge()) return 1
    const base = Decimal.log10(Decimal.max(data.ord.ordinal, 1)).toNumber()
    const multipliers = dynamicShiftMultipliers[0]()*getAOEffect(1)*getPringleEffect(4, true)
        *getHyperchargeEffect(10)*getRealmChallengeEffect(4)*getRealmChallengeOverallEffect()
    return Math.max(1, base*multipliers)
}

function getAlephNullEffect(i){
    const effectData = alephNullEffectData[i]
    if(effectData.unlockReq === undefined) return Math.max(effectData.baseEffect(), effectData.effect())
    return effectData.unlockReq() ? effectData.effect() : effectData.baseEffect()
}

function getRealmEnhancement(i){
    if(isRealmEnhancementLocked(i)) return D(1)
    return Decimal.max(1, realmEnhancementData[i].effect().pow(getMetaANREffect(0)))
}
function getTotalRealmEnhancement(){
    if(!isBaseless()) return D(1)

    let mult = D(1)
    for (let i = 0; i < realmEnhancementData.length; i++) {
        mult = mult.times(getRealmEnhancement(i))
    }
    return mult
}

let getBaselesssName = (i) => baselessRealmData[i].name
let getBaselessMult = (i) => baselessRealmData[i].multiplier
function getBaselessLock(i){
    if(inRealmChallenge(2) || inRealmChallenge(4)) return 31
    return baselessRealmData[i].lock()
}

function getANREffect(i, type, useNumber = true){
    if(useNumber) return getANREffect(i, type,false).toNumber()

    const anrData = type === 'meta' ? metaANBuyableData[i] : normalANBuyableData[i]
    const baseEffect = type === 'meta' ? anrData.baseEffect() : D(0)

    if(!isTabUnlocked('baseless')) return baseEffect
    return Decimal.max(baseEffect, anrData.effect());
}
function getANRLevel(i, type){
    if(type === 'meta'){
        const extraLevels = metaANBuyableData[i].freeLevels === undefined ? 0 : metaANBuyableData[i].freeLevels()
        return data.baseless.metaANR[i]+extraLevels
    }
    if(type === 'normal'){
        const extraLevels = normalANBuyableData[i].freeLevels === undefined ? 0 : normalANBuyableData[i].freeLevels()
        return data.baseless.normalANR[i]+extraLevels
    }
}
function getANRCost(i, type){
    if(type === 'meta') return metaANBuyableData[i].cost()
    if(type === 'normal') return normalANBuyableData[i].cost()
}

function getANRText(i, type){
    if(type === 'meta') return metaANBuyableData[i].desc
    if(type === 'normal') return normalANBuyableData[i].desc
}

function getANRSign(i, type){
    if(type === 'meta') return metaANBuyableData[i].sign
    if(type === 'normal') return normalANBuyableData[i].sign
}

let getMetaANREffect = (i, useNumber) => getANREffect(i, 'meta', useNumber)
let getNormalANREffect = (i, useNumber) => getANREffect(i, 'normal', useNumber)

let getAlephNullEffectText = (i) => alephNullEffectData[i].desc

let getRealmEnhancementText = (i) => realmEnhancementData[i].name
let getRealmEnhancementAmount = (i) => realmEnhancementData[i].amount()
